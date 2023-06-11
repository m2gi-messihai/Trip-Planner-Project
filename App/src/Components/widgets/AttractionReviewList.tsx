import { Divider, Typography } from "@mui/material";
import { FC } from "react";

import { ReviewPost } from "../core/ReviewPost";

import styles from "./AttractionReviewList.module.css";
import { useTranslation } from "react-i18next";

import { AttractionReviewDto } from "../../types/dto/common/AttractionReviewDto";
import { ReviewDto } from "../../types/dto/common/ReviewDto";
import { HotelReviewDto } from "../../types/dto/common/HotelReviewDto";
import { RestaurantReviewDto } from "../../types/dto/common/RestaurantReviewDto";

interface AttractionReviewListProps {
    reviews: AttractionReviewDto[];
}
export const AttractionReviewList: FC<AttractionReviewListProps> = ({ reviews }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Typography variant="h4" className={styles.reviewsTitle}>
                {t("common.reviews")}:
            </Typography>
            {reviews?.map(review => (
                <div key={review.id}>
                    <ReviewPost review={review} />
                    <Divider />
                </div>
            ))}
        </div>
    );
};
