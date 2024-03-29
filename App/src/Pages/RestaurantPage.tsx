import { Button, Container, IconButton, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../api/FetchData";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import styles from "./RestaurantPage.module.css";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { postData } from "../api/PostData";
import { RestaurantInfo } from "../Components/core/RestaurantInfo";
import { ReviewForm } from "../Components/widgets/ReviewForm";
import { ReviewList } from "../Components/widgets/ReviewList";
import { SharePopup } from "../Components/widgets/SharePopup";
import { useAuthContext } from "../context/authContext";
import { RestaurantDto } from "../types/dto/common/RestaurantDto";
import { SectionItemDto } from "../types/dto/common/SectionItemDto";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";

const ShareButton = styled(IconButton)({
    color: "black",
});
const FavoriteButton = styled(IconButton)({
    color: "black",
});

export const RestaurantPage = () => {
    const [sharePopupState, setSharePopupState] = React.useState(false);
    const [formState, setFormState] = useState(false);
    const { t } = useTranslation();
    const [restaurant, setRestaurant] = React.useState<RestaurantDto | null>(null);
    const [reviews, setReviews] = useState<ReviewDto[] | undefined>(undefined);
    const [userFavs, setUserFavs] = useState<SectionItemDto[]>([]);
    const [likedLoc, setLikedLoc] = useState<boolean>(false);
    const { id } = useParams();
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();

    const like = (restaurant: RestaurantDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.like(
                {
                    item: restaurant,
                    type: "restaurants",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(true);
        } else {
            navigate("/auth/login");
        }
    };
    const dislike = (restaurant: RestaurantDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.dislike(
                {
                    item: restaurant,
                    type: "restaurants",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(false);
        } else {
            navigate("/auth/login");
        }
    };

    useEffect(() => {
        const onMount = async () => {
            if (id) {
                const response = await fetchData.getRestaurant(id);
                setRestaurant(response.restaurant);
                setReviews(response.reviews);
            }
        };
        onMount();
    }, [id]);

    useEffect(() => {
        const getUserLikes = async (id: number, token: string) => {
            const userFavs = await fetchData.getProfileFavorites(id, token);
            setUserFavs(userFavs);
        };
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            getUserLikes(loggedInUser.id, token);
        } else {
            setUserFavs([]);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (restaurant) {
            const isLocationLiked = userFavs?.some(
                favorite => favorite.value.id === restaurant.id && favorite.type === "restaurant"
            );

            setLikedLoc(isLocationLiked);
        }
    }, [restaurant, userFavs]);

    const handleClickOpen = () => {
        setSharePopupState(true);
    };
    const handleClose = () => {
        setSharePopupState(false);
    };
    const openForm = () => {
        setFormState(true);
    };
    const closeForm = () => {
        setFormState(false);
    };

    if (!restaurant) {
        return null;
    }
    return (
        <Container className={styles.container}>
            <Typography variant="h3">{restaurant.label}</Typography>
            <div className={styles.header}>
                {restaurant.website && (
                    <a href={restaurant.website}>
                        <Typography variant="h6" className={styles.headerButtons}>
                            {t("attractions.visitWebsite")}
                        </Typography>
                    </a>
                )}
                {restaurant.phone && (
                    <a href={`tel:${restaurant.phone}`}>
                        <Typography variant="h6" className={styles.headerButtons}>
                            {t("attractions.call")}
                        </Typography>
                    </a>
                )}
                {restaurant.email && (
                    <a href={`mailto:${restaurant.email}`}>
                        <Typography variant="h6" className={styles.headerButtons}>
                            {t("common.email")}
                        </Typography>
                    </a>
                )}

                <div>
                    <ShareButton className={styles.shareButton} onClick={handleClickOpen}>
                        <IosShareIcon />
                    </ShareButton>
                    <SharePopup
                        url={window.location.href}
                        open={sharePopupState}
                        onClose={handleClose}
                    />
                    <FavoriteButton
                        onClick={() => {
                            if (likedLoc) {
                                dislike(restaurant);
                            } else {
                                like(restaurant);
                            }
                        }}
                    >
                        {likedLoc ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </FavoriteButton>
                </div>
            </div>
            <div className={styles.imageAndDescription}>
                <RestaurantInfo restaurant={restaurant} />
                {restaurant.imageUrl && (
                    <div className={styles.imageContainer}>
                        <img
                            src={restaurant.imageUrl}
                            className={styles.image}
                            alt={restaurant.label}
                        />
                    </div>
                )}
            </div>
            <Typography variant="h4" className={styles.reviewsTitle}>
                {t("common.reviews")}:
            </Typography>
            {!formState ? (
                <Button
                    variant="text"
                    startIcon={<EditIcon className={styles.icon} />}
                    sx={{ color: "black" }}
                    onClick={() => {
                        loggedInUser ? openForm() : navigate("/auth/login");
                    }}
                >
                    {t("common.writeReview")}
                </Button>
            ) : (
                <IconButton onClick={closeForm} sx={{ color: "red" }}>
                    <CloseIcon />
                </IconButton>
            )}
            <div className={styles.reviewsContainer}>
                {formState && (
                    <ReviewForm
                        type="restaurantReview"
                        itemId={restaurant.id}
                        onSuccess={(review: ReviewDto) => {
                            setReviews(reviews => [...(reviews || []), review]);
                            setFormState(false);
                        }}
                    />
                )}
                {reviews && <ReviewList reviews={reviews} />}
            </div>
        </Container>
    );
};
