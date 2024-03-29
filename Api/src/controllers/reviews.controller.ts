import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ReviewsService } from "src/services/reviews.service";

@Controller("/reviews")
export class ReviewsController {
    constructor(private reviewService: ReviewsService) {}

    @Get("/:id")
    getReviewById(@Param("id") id: string) {
        return this.reviewService.findReviewById(id);
    }
}
