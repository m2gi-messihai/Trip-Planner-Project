import { Prisma } from "@prisma/client";
import { mapValues } from "lodash";
import { TChatbotFilter } from "src/types/TChatbot";

export const replaceDynamicValueInFilter = (
    filter: TChatbotFilter,
    value: string
): TChatbotFilter => {
    return mapValues(filter, rule =>
        mapValues(rule, val => {
            if (typeof val === "string") {
                const realValue = val.replace("$value", `${value}`);
                return realValue === "any" && filter.preferredDestination
                    ? realValue.replace("any", "nice")
                    : realValue;
            } else {
                return val.map(v => v.replace("$value", `${value}`));
            }
        })
    ) as TChatbotFilter;
};

export const toAttractionsFilter = (filters: TChatbotFilter[]): Prisma.attractionWhereInput[] => {
    return filters.map(filter => ({
        min_age: mapPrismaNumberFilter(filter.minAge),
        city: mapPrismaCity(filter.preferredDestination),
        attraction_tag: mapPrismaAttractionTagsFilter(filter.tags),
    }));
};
export const toRestaurantsFilter = (filters: TChatbotFilter[]): Prisma.restaurantWhereInput[] => {
    return filters.map(filter => ({
        city: mapPrismaCity(filter.preferredDestination),
        restaurant_tag: mapPrismaAttractionTagsFilter(filter.tags),
    }));
};
export const mapPrismaCity = (rule: TChatbotFilter[string]): Prisma.cityWhereInput => {
    if (!rule) {
        return undefined;
    }
    return {
        OR: [
            {
                label: {
                    equals: rule?.equals ? rule.equals : undefined,
                    not: rule?.not ? rule.not : undefined,
                    in: rule?.in ? rule.in.map(v => v) : undefined,
                    notIn: rule?.notIn ? rule.notIn.map(v => v) : undefined,
                    mode: "insensitive",
                },
            },
            {
                city_code: {
                    equals: rule?.equals ? rule.equals : undefined,
                    not: rule?.not ? rule.not : undefined,
                    in: rule?.in ? rule.in.map(v => v) : undefined,
                    notIn: rule?.notIn ? rule.notIn.map(v => v) : undefined,
                    mode: "insensitive",
                },
            },
            {
                country: {
                    label: {
                        equals: rule?.equals ? rule.equals : undefined,
                        not: rule?.not ? rule.not : undefined,
                        in: rule?.in ? rule.in.map(v => v) : undefined,
                        notIn: rule?.notIn ? rule.notIn.map(v => v) : undefined,
                        mode: "insensitive",
                    },
                },
            },
        ],
    };
};

export const mapPrismaNumberFilter = (rule: TChatbotFilter[string]): Prisma.IntNullableFilter => {
    if (!rule) {
        return undefined;
    }
    return {
        equals: rule?.equals ? parseInt(rule.equals, 10) : undefined,
        not: rule?.not ? parseInt(rule.not, 10) : undefined,
        gt: rule?.gt ? parseInt(rule.gt, 10) : undefined,
        gte: rule?.gte ? parseInt(rule.gte, 10) : undefined,
        lt: rule?.lt ? parseInt(rule.lt, 10) : undefined,
        lte: rule?.lte ? parseInt(rule.lte, 10) : undefined,
        in: rule?.in ? rule.in.map(v => parseInt(v, 10)) : undefined,
        notIn: rule?.notIn ? rule.notIn.map(v => parseInt(v, 10)) : undefined,
    };
};

export const mapPrismaAttractionTagsFilter = (
    rule: TChatbotFilter[string] | undefined
): Prisma.Attraction_tagListRelationFilter => {
    if (!rule) {
        return undefined;
    }
    return {
        some: {
            tag: {
                OR: [
                    { code: { ...rule, mode: "insensitive" } },
                    { label: { ...rule, mode: "insensitive" } },
                ],
            },
        },
    };
};
export const mapRestaurantPrismaTagsFilter = (
    rule: TChatbotFilter[string] | undefined
): Prisma.Restaurant_tagListRelationFilter => {
    return {
        some: {
            tag: {
                OR: [
                    { code: { ...rule, mode: "insensitive" } },
                    { label: { ...rule, mode: "insensitive" } },
                ],
            },
        },
    };
};
