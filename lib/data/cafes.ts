import { Cafe } from "../types";

export const cafes: Cafe[] = [
    {
        id: 1,
        name: 'Login Lounge',
        slug: "login-lounge",
        location: "Camberley",
        address: "1 High St, Camberley, GU15 3SY",
        image: "/img/cafe-img-1.jpg",
        ratings: {
            overall: undefined,
            flatWhite: 1,
            cappuccino: 2,
            americano: 3,
            doubleEspresso: 3,
            icedLatte: 2
        },
        comments: [
            {  
                id: 1,
                author: "Jules",
                title: "Lovely flat white",
                content: "Cozy spot with friendly staff. Perfect for an afternoon work session.",
                date: "Jan 7, 2026 14:32"
            },
            { 
                id: 2,
                author: "Mike",
                title: "Great service",
                content: "The staff were very attentive and the coffee was top-notch.",
                date: "Jan 4, 2026 09:15"
            },
        ]
    },
    {
        id: 2,
        name: 'Mullans',
        slug: "mullans",
        location: "Camberley",
        address: "34 High St, Camberley, GU15 3SY",
        image: "/img/cafe-img-1.jpg",
        ratings: {
            overall: undefined,
            flatWhite: 4,
            cappuccino: 5,
            americano: 4,
            doubleEspresso: 5,
            icedLatte: 3
        },
        comments: [
            {  
                id: 1,
                author: "Andy",
                title: "Iced Coffee Too Big",
                content: "The iced coffee was great but the cup was way too large for one person!",
                date: "Jan 6, 2026 16:15"
            },
            { 
                id: 2,
                author: "Tasha",
                title: "Average Flat White",
                content: "Lovely spot but I prefer a creamier flat white.",
                date: "Jan 4, 2026 12:15"
            },
        ]
    },
        {
        id: 3,
        name: 'The Bear',
        slug: "the-bear",
        location: "Camberley",
        address: "10 High St, Camberley, GU15 3SY",
        image: "/img/cafe-img-1.jpg",
        ratings: {
            overall: undefined,
            flatWhite: 4,
            cappuccino: 3,
            americano: 4,
            doubleEspresso: 5,
            icedLatte: 5
        },
        comments: [
            {
                id: 1,
                author: "Sam",
                title: "Best espresso in town",
                content:
                "Hands down the strongest and most balanced double espresso I've had locally. Definitely coming back.",
                date: "Jan 5, 2026 08:45",
            },
            {
                id: 2,
                author: "Lucy",
                title: "Great vibe, busy weekends",
                content:
                "Lovely atmosphere and great coffee, but it does get very busy on weekends. Worth the wait though.",
                date: "Jan 3, 2026 11:20",
            },
        ]
    }
];