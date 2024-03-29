import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

import * as argon2 from "argon2";
import {
    mapAttractionReviewToDto,
    mapAttractionToDto,
    mapRestaurantReviewToDto,
    mapRestaurantToDto,
    mapUserToDto,
} from "src/helpers/MappingDtos";
import { RegisterBody } from "src/types/dto/auth/RegisterBody";

import { SectionItemDto } from "src/types/dto/common/SectionItemDto";
import { LikedItem } from "src/types/dto/likes/LikedItemDto";
import { ReviewDto } from "src/types/dto/reviews/ReviewDto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(registerBody: RegisterBody) {
        const hashedPass = await argon2.hash(registerBody.password);
        return this.prisma.user.create({
            data: {
                email: registerBody.email.toLowerCase(),
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
                Attraction: true,
            },
        });

        const restaurantReviews = await this.prisma.restaurant_review.findMany({
            where: {
                user_id: userId,
            },
            include: {
                user: true,
                restaurant: true,
            },
        });
        const attractionReviewsItems: ReviewDto[] = attractionReviews.map(review => {
            return {
                review: mapAttractionReviewToDto(
                    review,
                    mapUserToDto(review.user),
                    review.Attraction?.id
                ),
                type: "attractionReview",
            };
        });

        const restaurantReviewsItems: ReviewDto[] = restaurantReviews.map(review => {
            return {
                review: mapRestaurantReviewToDto(
                    review,
                    mapUserToDto(review.user),
                    review.restaurant.id
                ),
                type: "restaurantReview",
            };
        });

        return [...attractionReviewsItems, ...restaurantReviewsItems];
    }
    async findUserFavorites(userId: number) {
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
        const attractionsItems: SectionItemDto[] = attractions.map(attraction => {
            return {
                value: mapAttractionToDto(attraction, attraction.directus_files),
                type: "attraction",
            };
        });
        const restaurantsItems: SectionItemDto[] = restaurants.map(restaurant => {
            return {
                value: mapRestaurantToDto(restaurant, restaurant.directus_files),
                type: "restaurant",
            };
        });
        return [...attractionsItems, ...restaurantsItems];
    }
    async like(likedItem: LikedItem): Promise<LikedItem> {
        if (likedItem.type === "attraction") {
            await this.prisma.user_attraction.create({
                data: {
                    attraction_id: likedItem.item.id,
                    user_id: likedItem.userId,
                },
            });
        } else if (likedItem.type === "restaurants") {
            await this.prisma.user_restaurant.create({
                data: {
                    restaurant_id: likedItem.item.id,
                    user_id: likedItem.userId,
                },
            });
        }
        return likedItem;
    }

    async dislike(likedItem: LikedItem): Promise<void> {
        if (likedItem.type === "attraction") {
            await this.prisma.user_attraction.deleteMany({
                where: {
                    user_id: likedItem.userId,
                    attraction_id: likedItem.item.id,
                },
            });
        } else if (likedItem.type === "restaurants") {
            await this.prisma.user_restaurant.deleteMany({
                where: {
                    user_id: likedItem.userId,
                    restaurant_id: likedItem.item.id,
                },
            });
        }
    }
    async writeReview(item: ReviewDto): Promise<ReviewDto> {
        if (item.type === "attractionReview") {
            await this.prisma.attraction_review.create({
                data: {
                    attraction_id: item.review.itemId,
                    body: item.review.body,
                    title: item.review.title,
                    rating: item.review.rating,
                    user_id: item.review.user.id,
                },
            });
        } else if (item.type === "restaurantReview") {
            await this.prisma.restaurant_review.create({
                data: {
                    restaurant_id: item.review.itemId,
                    body: item.review.body,
                    title: item.review.title,
                    rating: item.review.rating,
                    user_id: item.review.user.id,
                },
            });
        }
        return item;
    }
}
