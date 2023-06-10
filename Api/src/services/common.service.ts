import { Injectable } from "@nestjs/common";
import { flow } from "src/data/ChatbotFlow";
import {
    getFieldFilters,
    replaceDynamicValueInFilter,
    toAttractionsFilter,
    toRestaurantsFilter,
} from "src/helpers/filtersHelper";
import { MappingDtos } from "src/helpers/mappingDtos";
import { PrismaService } from "src/prisma.service";

import {
    TChatbotFilter,
    TChatbotFlow,
    TChatbotQuestion,
    TChatbotSubmission,
} from "src/types/TChatbot";
import { AttractionDto } from "src/types/dto/common/AttractionDto";

import { GetDashboardResponseDto } from "src/types/dto/dashboard/GetDashboardResponseDto";
import { GetDestinationNameDto } from "src/types/dto/destination/GetDestinationNameDto";
import { GetFilteredAttractionAndRestaurantsDto as GetFilteredAttractionAndRestaurantsDto } from "src/types/dto/trips/GetFilteredAttractionAndRestaurantsDto";
import { RestaurantDto } from "src/types/dto/common/RestaurantDto";
import { TripDto } from "src/types/dto/common/TripDto";
import { TripItemDto } from "src/types/dto/common/TripItemDto";
import { find, has, hasIn, pickBy, slice } from "lodash";

@Injectable()
export class CommonService {
    dayjs = require("dayjs");
    constructor(private prisma: PrismaService, private mappingDtos: MappingDtos) {}
    async findDashboardContent(): Promise<GetDashboardResponseDto> {
        const cities = await this.prisma.city.findMany({
            include: {
                country: true,
                directus_files: true,
            },
        });
        const attractions = await this.prisma.attraction.findMany({
            where: {
                type: {
                    equals: "beach",
                    mode: "insensitive",
                },
            },
            include: {
                city: true,
                directus_files: true,
                attraction_tag: true,
            },
        });

        return {
            sections: [
                {
                    title: "Where to go right now",
                    subtitle: "Spots at the top of travelers'must-go lists",
                    items: cities.map(city => {
                        return {
                            type: "city",
                            value: this.mappingDtos.mapCityToDto(
                                city,
                                city.directus_files,
                                this.mappingDtos.mapCountryToDto(city.country)
                            ),
                        };
                    }),
                },
                {
                    title: "Top activities for beach lovers",
                    subtitle: "Recommended based on your activity",
                    items: attractions.map(attraction => {
                        return {
                            type: "attraction",
                            value: this.mappingDtos.mapAttractionToDto(
                                attraction,
                                attraction.directus_files
                            ),
                        };
                    }),
                },
            ],
        };
    }
    async findDestinations(): Promise<GetDestinationNameDto> {
        const cities = await this.prisma.city.findMany();
        const countries = await this.prisma.country.findMany();
        return {
            citiesName: cities.map(city => {
                return city.label;
            }),
            countriesName: countries.map(country => {
                return country.label;
            }),
        };
    }

    findChatbotFlow(): TChatbotFlow {
        return flow;
    }

    deduceFiltersFromSubmissions(submissions: TChatbotSubmission[]) {
        return submissions.map(submission => {
            const question = flow.questions.find(
                question => question.code === submission.questionCode
            );

            if (question.type === "text") {
                return replaceDynamicValueInFilter(question.filter || {}, submission.value);
            }
            if (question.answers) {
                const selectedAnswer = question.answers.find(
                    answer => answer.code === submission.value || answer.text === submission.value
                );
                if (selectedAnswer.filter) {
                    return selectedAnswer.filter;
                }
            }
        });
    }
    async findFilteredAttractionAndRestaurants(
        filters: TChatbotFilter[]
    ): Promise<GetFilteredAttractionAndRestaurantsDto> {
        const fieldFilters: TChatbotFilter[] = getFieldFilters(filters);
        const attractions = await this.prisma.attraction.findMany({
            where: {
                AND: toAttractionsFilter(fieldFilters),
            },
            include: {
                directus_files: true,
            },
        });
        const restaurants = await this.prisma.restaurant.findMany({
            where: {
                AND: toRestaurantsFilter(fieldFilters),
            },
            include: {
                directus_files: true,
            },
        });
        console.log(fieldFilters);
        return {
            attractions: attractions.map(attraction => {
                return this.mappingDtos.mapAttractionToDto(attraction, attraction.directus_files);
            }),
            restaurants: restaurants.map(restaurant => {
                return this.mappingDtos.mapRestaurantToDto(restaurant, restaurant.directus_files);
            }),
        };
    }
    async createTrip(
        attractionAndRestaurant: Promise<GetFilteredAttractionAndRestaurantsDto>,
        globalFilters: TChatbotFilter[]
    ): Promise<TripDto> {
        const attractions: AttractionDto[] = (await attractionAndRestaurant).attractions;
        const restaurants: RestaurantDto[] = (await attractionAndRestaurant).restaurants;
        const budget = this.calculateBudget(globalFilters);
        let trip: TripDto = null;

        const swap = (i: number) => {
            let sum: number = 0;
            const tripRestaurants: RestaurantDto[] = slice(restaurants, i, i + 3);
            const tripAttractions: AttractionDto[] = slice(attractions, i, i + 4);
            tripRestaurants.map(r => {
                sum += r.avgMealPerPerson;
            });
            tripAttractions.map(a => {
                sum += a.entryFee;
            });

            if (sum > budget + 10) {
                console.log("true");
                swap(i + 1);
            } else {
                trip = this.orderOneDayActivities(tripRestaurants, tripAttractions);
            }
        };
        swap(0);
        return trip;
    }
    //ex: camp nou datetime=18:00 and his opening hours to is 17
    //if after breakfast attractions' time surpasses lunch time
    // if i don't have enough restaurants (less than 3) tripItem is created with undefined restaurants
    // we don't know arrival and departure date of the trip
    // based on departure an arrival time we put the datetime of the tripItem
    orderOneDayActivities(restaurants: RestaurantDto[], attractions: AttractionDto[]): TripDto {
        const tripItems: TripItemDto[] = [];
        tripItems.push({
            dateTime: "7:00",
            item: {
                type: "restaurant",
                value: restaurants[0],
            },
        });
        attractions.slice(0, 2).map((attraction, i) => {
            tripItems.push({
                dateTime: attractions[i - 1]
                    ? `${9 + attractions[i - 1].suggestedDuration}:00`
                    : "9:00",
                item: {
                    type: "attraction",
                    value: attraction,
                },
            });
        });
        tripItems.push({
            dateTime: "14:00",
            item: {
                type: "restaurant",
                value: restaurants[1],
            },
        });
        attractions.slice(2, 4).map((attraction, i) => {
            tripItems.push({
                dateTime: attractions[i - 1]
                    ? `${16 + attractions[i - 1].suggestedDuration}:00`
                    : "16:00",
                item: {
                    type: "attraction",
                    value: attraction,
                },
            });
        });
        tripItems.push({
            dateTime: "21:00",
            item: {
                type: "restaurant",
                value: restaurants[2],
            },
        });

        return {
            arrivalDate: "",
            departureDate: "",
            label: "",
            tripItems: tripItems,
        };
    }

    calculateBudget(globalFilters: TChatbotFilter[]) {
        let budget: number = 0;
        let avg: number = 0;
        globalFilters.map(filter => {});
        const globalBudget = find(globalFilters, "globalBudget");
        if (globalBudget) {
            if (hasIn(globalBudget, "gte")) {
                avg = parseInt(globalBudget.globalBudget.gte);
            } else {
                avg = parseInt(globalBudget.globalBudget.lte);
            }
        }
        const globalTripDuration = find(globalFilters, "globalTripDuration");
        if (globalTripDuration) {
            budget = avg / (parseInt(globalTripDuration.globalTripDuration.equals) * 7);
        }
        return budget;
    }
}