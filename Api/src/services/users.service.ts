import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import * as argon2 from "argon2";
import {
    mapAttractionReviewToDto,
    mapAttractionToDto,
    mapHotelReviewToDto,
    mapRestaurantReviewToDto,
    mapRestaurantToDto,
    mapUserToDto,
} from "src/helpers/MappingDtos";
import { RegisterBody } from "src/types/dto/auth/RegisterBody";

import { ReviewDto } from "src/types/dto/common/ReviewDto";

import { FavoriteItem } from "src/types/dto/common/FavouriteItemDto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(registerBody: RegisterBody) {
        const hashedPass = await argon2.hash(registerBody.password);
        return this.prisma.user.create({
            data: {
                email: registerBody.email,
                firstname: registerBody.firstName,
                lastname: registerBody.lastName,
                password: hashedPass,
            },
        });
    }

    async findUserByMail(email: string) {
        return this.prisma.user.findFirst({
            where: { email: email.toLowerCase() },
        });
    }

    async findUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async findUserReviews(userId: number): Promise<ReviewDto[]> {
        const attractionReviews = await this.prisma.attraction_review.findMany({
            where: {
                user_id: userId,
            },
            include: {
                user: true,
            },
        });
        const hotelReviews = await this.prisma.hotel_review.findMany({
            where: {
                user_id: userId,
            },
            include: {
                user: true,
            },
        });
        const restaurantReviews = await this.prisma.restaurant_review.findMany({
            where: {
                user_id: userId,
            },
            include: {
                user: true,
            },
        });
        const attractionReviewsItems: ReviewDto[] = attractionReviews.map(review => {
            return mapAttractionReviewToDto(review, mapUserToDto(review.user));
        });
        const hotelReviewsItems: ReviewDto[] = hotelReviews.map(review => {
            return mapHotelReviewToDto(review, mapUserToDto(review.user));
        });
        const restaurantReviewsItems: ReviewDto[] = restaurantReviews.map(review => {
            return mapRestaurantReviewToDto(review, mapUserToDto(review.user));
        });

        return [...attractionReviewsItems, ...hotelReviewsItems, ...restaurantReviewsItems];
    }
    async findUserFavorites(userId: number): Promise<FavoriteItem[]> {
        const attractions = await this.prisma.attraction.findMany({
            where: {
                user_attraction: {
                    some: {
                        user_id: userId,
                    },
                },
            },
            include: {
                directus_files: true,
            },
        });
        const restaurants = await this.prisma.restaurant.findMany({
            where: {
                user_restaurant: {
                    some: {
                        user_id: userId,
                    },
                },
            },
            include: {
                directus_files: true,
            },
        });
        const attractionsItems: FavoriteItem[] = attractions.map(attraction => {
            return {
                item: mapAttractionToDto(attraction, attraction.directus_files),
                type: "attraction",
            };
        });
        const restaurantsItems: FavoriteItem[] = restaurants.map(restaurant => {
            return {
                item: mapRestaurantToDto(restaurant, restaurant.directus_files),
                type: "restaurant",
            };
        });
        return [...attractionsItems, ...restaurantsItems];
    }
}
