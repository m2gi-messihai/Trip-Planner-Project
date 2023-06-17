import { TripDto } from "./types/dto/common/TripDto";

export const mockTrip: TripDto = {
    id: 3,
    label: "Your recommended trip",
    startDate: "2023-06-24T14:30:12.078Z",
    endDate: "2023-06-28T14:30:12.078Z",
    tripItems: [
        {
            dateTime: "2023-06-24T06:00:00.078Z",
            type: "restaurant",
            value: {
                id: 39,
                label: "Kalos",
                address: "11 rue Bonaparte, 06300 Nice France",
                phone: "33489971796",
                imageUrl: "http://localhost:8055/assets/81d818ca-7c61-4ec1-8ccb-b5318fda3ac7.jfif",
                website: "https://kalosnice.com/",
                rating: 5,
                email: null,
                mapLocation: {
                    lat: 43.7008,
                    long: 7.2825,
                },
                code: "Kalos",
                avgMealPerPerson: 5,
                food: "Vegan, Vegetarian ",
            },
        },
        {
            dateTime: "2023-06-24T08:00:00.078Z",
            type: "attraction",
            value: {
                id: 163,
                label: "Phoenix Park",
                about: "Phoenix Park is a large recreational park located near Nice Airport. It features beautiful gardens, a lake, playgrounds, picnic areas, and an animal park. Visitors can enjoy leisurely walks, rent paddleboats, observe wildlife, and explore various themed gardens within the park.",
                address: "405 Prom. des Anglais, 06200 Nice, France",
                phone: "33492297700",
                suggestedDuration: 3,
                entryFee: 4,
                imageUrl: "http://localhost:8055/assets/34bc43da-febd-45cb-bbc0-154ec590f38f.jpg",
                website: "https://www.phoenixpark.ie/",
                type: "Recreational",
                rating: 4,
                reservationLink: null,
                minAge: 0,
                email: null,
                mapLocation: {
                    long: 7.21949,
                    lat: 43.66884,
                },
                openingHours: {
                    from: "1970-01-01T09:00:00.000Z",
                    to: "1970-01-01T18:00:00.000Z",
                },
            },
        },
        {
            dateTime: "2023-06-24T11:00:00.078Z",
            type: "attraction",
            value: {
                id: 149,
                label: "Castle Hill",
                about: "Castle Hill offers breathtaking panoramic views of Nice and the Mediterranean Sea. It is a historic site with ruins of an ancient castle, beautiful gardens, and several viewpoints. Visitors can enjoy a leisurely walk, relax in the park, and take stunning photographs of the city and coastline.",
                address: "Colline du Château, 06300 Nice, France",
                phone: null,
                suggestedDuration: 3,
                entryFee: 0,
                imageUrl: "http://localhost:8055/assets/9e2a36ec-5871-45e2-b259-93472ea00f69.jpg",
                website: "https://frenchriviera.travel/castle-hill-nice/",
                type: "scenic",
                rating: 5,
                reservationLink: null,
                minAge: 0,
                email: null,
                mapLocation: {
                    long: 7.2778,
                    lat: 43.6964,
                },
                openingHours: {
                    from: null,
                    to: null,
                },
            },
        },
        {
            dateTime: "2023-06-24T14:00:00.078Z",
            type: "attraction",
            value: {
                id: 169,
                label: "Promenade du Paillon",
                about: "Promenade du Paillon is a beautiful urban park that stretches through the center of Nice. It features gardens, fountains, water mirrors, and recreational areas. The park provides a serene escape from the city bustle and offers a pleasant place for a leisurely stroll, picnics, or relaxation.",
                address: " Plassa Carlou Aubert, 06300 Nice, France",
                phone: "33497254900",
                suggestedDuration: 2,
                entryFee: 0,
                imageUrl: "http://localhost:8055/assets/49e089db-eeeb-42bb-b6f7-dfc3109f1b3a.jpg",
                website: "https://www.nice.fr/fr/parcs-et-jardins/la-promenade-du-paillon",
                type: "scenic",
                rating: 5,
                reservationLink: null,
                minAge: 0,
                email: null,
                mapLocation: {
                    long: 7.2814,
                    lat: 43.7012,
                },
                openingHours: {
                    from: "1970-01-01T07:00:00.000Z",
                    to: "1970-01-01T22:00:00.000Z",
                },
            },
        },
        {
            dateTime: "2023-06-24T16:00:00.078Z",
            type: "restaurant",
            value: {
                id: 1,
                label: "La Favola",
                address: "13 cours Saleya, 06300 Nice France",
                phone: "33493044523",
                imageUrl: "http://localhost:8055/assets/9e0e1535-8a77-4f42-bfe8-7ba6262038eb.jpg",
                website: "https://www.la-favola.com/carte/",
                rating: 5,
                email: null,
                mapLocation: {
                    lat: 43.695,
                    long: 7.27386,
                },
                code: "LaFavola",
                avgMealPerPerson: 25.43,
                food: "italian",
            },
        },
        {
            dateTime: "2023-06-25T06:00:00.078Z",
            type: "restaurant",
            value: {
                id: 34,
                label: " La Petite Maison",
                address: " 11 Rue Saint-François de Paule, 06300 Nice, France",
                phone: "33493925959",
                imageUrl: "http://localhost:8055/assets/b0e0e453-cc9e-43b7-aafd-0128a0dfd2c0.jpg",
                website: "https://fr.gaultmillau.com/restaurants/la-petite-maison",
                rating: 4,
                email: null,
                mapLocation: {
                    lat: 43.69659,
                    long: 7.27049,
                },
                code: " LaPetiteMaison",
                avgMealPerPerson: 60,
                food: "Mediterranean, French",
            },
        },
        {
            dateTime: "2023-06-25T08:00:00.078Z",
            type: "restaurant",
            value: {
                id: 39,
                label: "Kalos",
                address: "11 rue Bonaparte, 06300 Nice France",
                phone: "33489971796",
                imageUrl: "http://localhost:8055/assets/81d818ca-7c61-4ec1-8ccb-b5318fda3ac7.jfif",
                website: "https://kalosnice.com/",
                rating: 5,
                email: null,
                mapLocation: {
                    lat: 43.7008,
                    long: 7.2825,
                },
                code: "Kalos",
                avgMealPerPerson: 5,
                food: "Vegan, Vegetarian ",
            },
        },
        {
            dateTime: "2023-06-26T06:00:00.078Z",
            type: "restaurant",
            value: {
                id: 36,
                label: "La Merenda",
                address: "4 Rue Raoul Bosio, 06300 Nice, France",
                phone: "33493855116",
                imageUrl: "http://localhost:8055/assets/a2bf555a-5be8-4d16-8fd2-f7a2ea589fe5.jpg",
                website: "https://lamerenda.net/",
                rating: 4,
                email: null,
                mapLocation: {
                    lat: 43.69662,
                    long: 7.27315,
                },
                code: "LaMerenda",
                avgMealPerPerson: 5,
                food: " Niçoise, French",
            },
        },
        {
            dateTime: "2023-06-26T08:00:00.078Z",
            type: "restaurant",
            value: {
                id: 34,
                label: " La Petite Maison",
                address: " 11 Rue Saint-François de Paule, 06300 Nice, France",
                phone: "33493925959",
                imageUrl: "http://localhost:8055/assets/b0e0e453-cc9e-43b7-aafd-0128a0dfd2c0.jpg",
                website: "https://fr.gaultmillau.com/restaurants/la-petite-maison",
                rating: 4,
                email: null,
                mapLocation: {
                    lat: 43.69659,
                    long: 7.27049,
                },
                code: " LaPetiteMaison",
                avgMealPerPerson: 60,
                food: "Mediterranean, French",
            },
        },
        {
            dateTime: "2023-06-27T06:00:00.078Z",
            type: "restaurant",
            value: {
                id: 37,
                label: "Chez Pipo",
                address: "13 Rue Bavastro, 06300 Nice, France",
                phone: "33493558882",
                imageUrl: "http://localhost:8055/assets/4295e6ee-e52e-42e2-bd84-1f6fd0c824a5.jpg",
                website: "https://www.chezpipo.fr/",
                rating: 4,
                email: null,
                mapLocation: {
                    lat: 43.7059,
                    long: 7.27772,
                },
                code: "ChezPipo",
                avgMealPerPerson: 7,
                food: "Niçoise, French",
            },
        },
        {
            dateTime: "2023-06-27T08:00:00.078Z",
            type: "restaurant",
            value: {
                id: 35,
                label: "Jan",
                address: "12 Rue Lascaris, 06300 Nice, France",
                phone: "33497193223",
                imageUrl: "http://localhost:8055/assets/05ba2542-8516-410c-9625-4ed0fdb50ee2.jpg",
                website: "https://janonline.com/restaurantjan/",
                rating: 5,
                email: "reservation@restaurantjan.com",
                mapLocation: {
                    lat: 43.69999,
                    long: 7.28481,
                },
                code: "Jan",
                avgMealPerPerson: 80,
                food: " Mediterranean, Fusion",
            },
        },
        {
            dateTime: "2023-06-28T06:00:00.078Z",
            type: "restaurant",
            value: {
                id: 41,
                label: "Palais de la Méditerranée",
                address: "13 Promenade des Anglais, 06000 Nice, France",
                phone: "33492147700",
                imageUrl: null,
                website: null,
                rating: null,
                email: null,
                mapLocation: {
                    lat: 43.6955,
                    long: 7.2639,
                },
                code: "PalaisDeLaMéditerranée",
                avgMealPerPerson: 50,
                food: " Mediterranean",
            },
        },
        {
            dateTime: "2023-06-28T08:00:00.078Z",
            type: "restaurant",
            value: {
                id: 36,
                label: "La Merenda",
                address: "4 Rue Raoul Bosio, 06300 Nice, France",
                phone: "33493855116",
                imageUrl: "http://localhost:8055/assets/a2bf555a-5be8-4d16-8fd2-f7a2ea589fe5.jpg",
                website: "https://lamerenda.net/",
                rating: 4,
                email: null,
                mapLocation: {
                    lat: 43.69662,
                    long: 7.27315,
                },
                code: "LaMerenda",
                avgMealPerPerson: 5,
                food: " Niçoise, French",
            },
        },
    ],
};
