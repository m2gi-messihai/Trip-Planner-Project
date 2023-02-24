export const flow: ChatbotFlow = {
    questions: [
        {
            code: "travelingWith",
            sort: 1,
            text: "Who are you traveling with?",
            type: "single-choice",
            answers: [
                {
                    code: "myself",
                    text: "Myself",
                    filter: {
                        tags: { $in: ["solo", "myself"] },
                    },
                },
                {
                    code: "family",
                    text: "My family",
                    filter: {
                        tags: { $in: ["family", "kids", "baby"] },
                    },
                },
                {
                    code: "friends",
                    text: "My friends",
                    filter: {
                        tags: { $in: ["friends"] },
                    },
                },
                {
                    code: "colleagues",
                    text: "My colleagues",
                    filter: {
                        tags: { $in: ["colleagues", "business", "work", "formal"] },
                    },
                },
                {
                    code: "couple",
                    text: "As a couple",
                    filter: {
                        tags: { $in: ["couple", "romantic"] },
                    },
                },
            ],
        },
        {
            code: "minAge",
            sort: 2,
            text: "What is the minimum age of your group ?",
            type: "text",
            shouldAskIf: {
                travelingWith: { $in: ["family", "friends"] },
            },
            filter: {
                minAge: { $lte: "$value" },
            },
        },
        {
            code: "estimatedBudget",
            sort: 3,
            text: "What is you estimated budget for this trip, excluding accommodation ?",
            type: "single-choice",
            answers: [
                {
                    code: "lessThan1000",
                    text: "Less than $1000",
                    filter: {
                        tags: { $in: ["budget", "cheap", "low-cost"] },
                        budget: { $lte: "1000" },
                    },
                },
                {
                    code: "1000-2000",
                    text: "$1000 - $2000",
                    filter: {
                        budget: { $gte: "1000", $lte: "2000" },
                    },
                },
                {
                    code: "2000-3000",
                    text: "$2000 - $3000",
                    filter: {
                        budget: { $gte: "2000", $lte: "3000" },
                    },
                },
                {
                    code: "moreThan3000",
                    text: "more than $3000",
                    filter: {
                        tags: { $in: ["luxury", "expensive", "high-end", "premium"] },
                        budget: { $gte: "3000" },
                    },
                },
                {
                    code: "notSure",
                    text: "I don't know yet",
                    filter: {},
                },
            ],
        },
        {
            code: "tripDuration",
            sort: 4,
            text: "How long are you planning to stay ?",
            type: "text",
            filter: {
                tripDuration: { $lte: "$value" },
            },
        },
        {
            code: "preferredDestination",
            sort: 5,
            text: "What is your preferred destination (country, city) ? type 'any' if you don't have a preference",
            type: "text",
            validation: {
                type: "existing-destination",
                onError: {
                    text: "We do not support this destination yet. Please try another one.",
                    action: "retry",
                },
            },
            filter: {
                preferredDestination: { $eq: "$value" },
            },
        },
        {
            code: "preferredThemes",
            sort: 6,
            text: "Choose a theme for your trip.",
            type: "multiple-choices",
            filterAggregation: "or",
            answers: [
                {
                    code: "physicalActivity",
                    text: "Physical activity",
                    filter: {
                        tags: {
                            $in: [
                                "adventure",
                                "adrenaline",
                                "extreme",
                                "sports",
                                "physical-activity",
                            ],
                        },
                    },
                },
                {
                    code: "culture",
                    text: "Culture",
                    filter: {
                        tags: { $in: ["culture", "history", "heritage"] },
                    },
                },
                {
                    code: "nature",
                    text: "Nature",
                    filter: {
                        tags: { $in: ["nature", "wildlife", "animals", "beach", "camping"] },
                    },
                },
                {
                    code: "relaxation",
                    text: "Relaxation and wellness",
                    filter: {
                        tags: { $in: ["relaxation", "spa", "massage"] },
                    },
                },
                {
                    code: "shopping",
                    text: "Shopping",
                    filter: {
                        tags: { $in: ["shopping", "boutiques"] },
                    },
                },
            ],
        },
        {
            code: "preferredPhysicalActivity",
            sort: 7,
            text: "What kind of physical activity do you prefer ?",
            type: "multiple-choices",
            filterAggregation: "or",
            shouldAskIf: {
                preferredThemes: { $in: ["physicalActivity"] },
            },
            answers: [
                {
                    code: "hiking",
                    text: "Hiking",
                    filter: {
                        tags: { $in: ["hiking", "trekking"] },
                    },
                },
                {
                    code: "cycling",
                    text: "Cycling",
                    filter: {
                        tags: { $in: ["cycling", "biking"] },
                    },
                },
                {
                    code: "waterSports",
                    text: "Water sports",
                    filter: {
                        tags: { $in: ["water-sports", "surfing", "kayaking", "snorkeling"] },
                    },
                },
                {
                    code: "skiing",
                    text: "Skiing",
                    filter: {
                        tags: { $in: ["skiing", "snowboarding"] },
                    },
                },
                {
                    code: "nothingSpecific",
                    text: "Nothing specific",
                    filter: {},
                },
            ],
        },
        {
            code: "foodPreferences",
            sort: 8,
            text: "What are your food preferences ?",
            type: "multiple-choices",
            filterAggregation: "and",
            answers: [
                {
                    code: "vegan",
                    text: "Vegan",
                    filter: {
                        tags: { $in: ["vegan"] },
                    },
                },
                {
                    code: "halal",
                    text: "Halal",
                    filter: {
                        tags: { $in: ["halal"] },
                    },
                },
                {
                    code: "healthy",
                    text: "Healthy",
                    filter: {
                        tags: { $in: ["healthy"] },
                    },
                },
                {
                    code: "nothingSpecific",
                    text: "Nothing specific",
                    filter: {},
                },
            ],
        },
    ],
};

type ChatbotFlow = {
    questions: ChatbotFlowQuestion[];
};
type ChatbotFlowQuestion = {
    code: string;
    sort: number;
    text: string;
    type: "text" | "multiple-choices" | "single-choice";
    answers?: ChatbotFlowAnswer[];
    filter?: ChatbotFlowFilter;
    filterAggregation?: "and" | "or";
    shouldAskIf?: ChatbotFlowFilter;
    validation?: ChatbotFlowValidation;
};

type ChatbotFlowAnswer = {
    code: string;
    text: string;
    filter: ChatbotFlowFilter;
};

type ChatbotFlowFilter = {
    [key: string]: {
        $eq?: string;
        $in?: string[];
        $gte?: string;
        $lte?: string;
    };
};

type ChatbotFlowValidation = {
    type: string;
    onError: {
        text: string;
        action: "retry" | "skip";
    };
};

// Example of filter built from the flow above
// const filter = {
//     tags: {
//         $and: [{ $in: ["family", "kids", "baby"] }, { $in: ["budget", "cheap", "low-cost"] }],
//     },
//     minAge: {
//         $lte: "10",
//     },
//     budget: { $lte: "1000" },
//     tripDuration: { $lte: "$value" },
// };