export type DrinkKey = "flatWhite" | "cappuccino" | "americano" | "doubleEspresso" | "icedLatte";

export type RatingsSummary = {
    overall: number;
} & Record<DrinkKey, number>;

export type CafeComment = {
    id: number;
    author: string;
    title: string;
    content: string;
    date: string;
}

export type Cafe = {
    id: number;
    name: string;
    slug: string;
    location: string;
    address: string;
    image: string;
    ratings: RatingsSummary;
    comments: CafeComment[];
}