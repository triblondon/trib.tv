import type { ReadTimeResults } from "reading-time";

export type PostMetadata = {
    layout: string;
    title: string;
    pubDate: string;
    description: string;
    author: string;
    tags: string[];
    readingTime?: ReadTimeResults;
}

export type LocationData = {
    pos: {
        lat: number;
        lng: number;
    }
    countryIso: string;
    tz: {
        utcOffset: number;
        name: string;
    }
}

export type LocationHistoryRecord = {
    title: string;
    loc: string;
    cciso: string;
    date: string;
}