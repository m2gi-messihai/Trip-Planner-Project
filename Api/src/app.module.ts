import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AttractionsController } from "./controllers/attractions.controller";
import { RestaurantsController } from "./controllers/restaurants.controller";
import { HotelsController } from "./controllers/hotels.controllers";
import { CitiesController } from "./controllers/cities.controller";
import { CommonController } from "./controllers/common.controller";
import { ReviewsController } from "./controllers/reviews.controller";
import { UsersController } from "./controllers/users.controller";
import { MappingDtos } from "./helpers/MappingDtos";
import { PrismaService } from "./prisma.service";
import { AttractionsService } from "./services/attractions.service";
import { RestaurantsService } from "./services/restaurants.service";
import { HotelsService } from "./services/hotels.service";
import { CityService } from "./services/cities.service";
import { CommonService } from "./services/common.service";
import { CountriesService } from "./services/countries.service";
import { ReviewsService } from "./services/reviews.service";

import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { SearchController } from "./controllers/search.controller";
import { SearchService } from "./services/search.service";
import { UsersService } from "./services/users.service";
import { TripController } from "./controllers/trip.controller";
import { TripService } from "./services/trip.service";

import { AutoCompleteController } from "./controllers/autocomplete.controller";
import { AutoCompleteService } from "./services/autocomplete.service";

@Module({
    controllers: [
        AttractionsController,
        CitiesController,
        ReviewsController,
        UsersController,
        CommonController,
        SearchController,
        AuthController,
        RestaurantsController,
        HotelsController,
        TripController,
        AutoCompleteController,
    ],
    providers: [
        AttractionsService,
        MappingDtos,
        CityService,
        ReviewsService,
        CountriesService,
        PrismaService,
        CommonService,
        SearchService,
        UsersService,
        RestaurantsService,
        HotelsService,
        TripService,
        AutoCompleteService,
    ],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
        }),
        ConfigModule.forRoot(),
        // Authentication.
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get("AUTH_JWT_SECRET"),
                    signOptions: {
                        expiresIn: parseInt(configService.get("AUTH_JWT_EXPIRES_IN"), 10),
                    },
                };
            },
        }),
    ],
})
export class AppModule {}
