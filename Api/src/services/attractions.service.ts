import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { GetAttractionResponseDto } from "src/types/dto/attractions/GetAttractionResponseDto";
import { MappingDtos, mapUserToDto } from "src/helpers/mappingDtos";

@Injectable()
export class AttractionsService {
    constructor(private prisma: PrismaService, private mappingDto: MappingDtos) {}

    async findAttraction(id: number): Promise<GetAttractionResponseDto> {
        const attraction = await this.prisma.attraction.findUnique({
            where: {
                id: id,
            },
            include: {
                directus_files: true,
                city: true,
            },
        });
        const city = await this.prisma.city.findUnique({
            where: {
                id: attraction.city_id,
            },
            include: {
                directus_files: true,
                country: true,
            },
        });
        const reviews = await this.prisma.attraction_review.findMany({
            where: {
                attraction_id: id,
            },
            include: {
                user: true,
            },
        });
        return {
            attraction: this.mappingDto.mapAttractionToDto(attraction, attraction.directus_files),
            reviews: reviews.map(review => {
                return this.mappingDto.mapReviewToDto(review, mapUserToDto(review.user));
            }),
            city: this.mappingDto.mapCityToDto(
                city,
                city.directus_files,
                this.mappingDto.mapCountryToDto(city.country)
            ),
        };
    }

    /** Private */
}