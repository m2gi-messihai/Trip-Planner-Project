import Axios from "axios";
import { TChatbotFlow } from "../types/TChatbot";
import { GetAttractionResponseDto } from "../types/dto/attractions/GetAttractionResponseDto";
import { GetCityResponseDto } from "../types/dto/cities/GetCityResponseDto";
import { GetDashboardResponseDto } from "../types/dto/dashboard/GetDashboardResponse";
import { GetDestinationNameDto } from "../types/dto/destination/GetDestinationsDto";
import { GetHotelResponseDto } from "../types/dto/hotel/GetHotelResponseDto";
import { GetRestaurantResponseDto } from "../types/dto/restaurants/GetRestaurantResponseDto";

import { SearchQuery, SearchResult } from "../types/Search";
import { SectionItemDto } from "../types/dto/common/SectionItemDto";
import { TripDto } from "../types/dto/common/TripDto";
import { UserDto } from "../types/dto/common/UserDto";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";
import { GetMyTripsResponseDto } from "../types/dto/trips/GetMyTripsResponseDto";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export class FetchData {
    public async getAttraction(id: string) {
        const response = await Axios.get<GetAttractionResponseDto>(
            `${API_BASE_URL}/attractions/${id}`
        );
        return response.data;
    }

    public async getRestaurant(id: string) {
        const response = await Axios.get<GetRestaurantResponseDto>(
            `${API_BASE_URL}/restaurants/${id}`
        );
        return response.data;
    }
    public async getHotel(id: string) {
        const response = await Axios.get<GetHotelResponseDto>(`${API_BASE_URL}/hotels/${id}`);
        return response.data;
    }

    public async getDashboard() {
        const response = await Axios.get<GetDashboardResponseDto>(`${API_BASE_URL}/dashboard`);
        return response.data;
    }
    public async getDestinations() {
        const response = await Axios.get<GetDestinationNameDto>(
            `${API_BASE_URL}/trip/destinations`
        );
        return response.data;
    }

    public async getUsers() {
        const response = await Axios.get(`${API_BASE_URL}/users`);
        return response.data;
    }

    public async search(searchQuery: SearchQuery) {
        const res = await Axios.get<SearchResult[]>(`${API_BASE_URL}/search`, {
            params: { q: searchQuery.label, filter: searchQuery.type },
        });
        return res.data;
    }

    public async getCity(id: string) {
        const response = await Axios.get<GetCityResponseDto>(`${API_BASE_URL}/cities/${id}`);
        return response.data;
    }
    public async getChatbotFlow() {
        const response = await Axios.get<TChatbotFlow>(`${API_BASE_URL}/trip/chatbotFlow`);
        return response.data;
    }
    public async getMe(token: string) {
        const response = await Axios.get<UserDto>(`${API_BASE_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    public async getProfileReviews(id: number, token: string) {
        const response = await Axios.get<ReviewDto[]>(`${API_BASE_URL}/api/users/${id}/reviews`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
    public async getProfileFavorites(id: number, token: string) {
        const response = await Axios.get<SectionItemDto[]>(
            `${API_BASE_URL}/api/users/${id}/favorites`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    public async getMyTrips() {
        const token = localStorage.getItem("accessToken");
        const response = await Axios.get<GetMyTripsResponseDto>(
            `${API_BASE_URL}/trip/get-my-trips`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }

    public async getTrip(id: number) {
        const token = localStorage.getItem("accessToken");
        const response = await Axios.get<TripDto>(`${API_BASE_URL}/trip/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    }
}
export const fetchData = new FetchData();
