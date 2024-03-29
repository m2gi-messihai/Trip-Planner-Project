import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationTopAttraction } from "../Components/widgets/LocationTopAtrraction";
import { fetchData } from "../api/FetchData";
import { useAuthContext } from "../context/authContext";
import { CityDto } from "../types/dto/common/CityDto";
import { SectionDto } from "../types/dto/common/SectionDto";
import { SectionItemDto } from "../types/dto/common/SectionItemDto";
import styles from "./CityPage.module.css";
import { LocationTravelAdvice } from "../Components/core/LocationTravelAdvice";

export const CityPage = () => {
    const [city, setCity] = useState<CityDto | undefined>(undefined);
    const [sections, setSections] = useState<SectionDto[] | undefined>(undefined);
    const [userFavs, setUserFavs] = useState<SectionItemDto[]>([]);
    const { loggedInUser } = useAuthContext();
    const { id } = useParams();
    React.useEffect(() => {
        const onMount = async () => {
            if (id) {
                const _city = await fetchData.getCity(id);
                setCity(_city.city);
                setSections(_city.sections);
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

    if (!city) {
        return null;
    }

    return (
        <Container className={styles.container}>
            <Typography variant="h3"> {city.label}</Typography>
            <LocationTravelAdvice />
            {sections && <LocationTopAttraction sections={sections} userFavs={userFavs} />}
        </Container>
    );
};
