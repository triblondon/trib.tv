import type { ReadTimeResults } from "reading-time";

export type ReadTimeResultsExt = ReadTimeResults & {
    wordsFormatted: string;
}

export type ContentItem = {
    title: string;
    url: string;
    pubDate: Date;
    wordCount: number;
    wordCountString: string;
    readingTime: string;
    description: string;
    isDraft: boolean;
    tags: string[];
}

export type LocationData = {
    pos: {
        lat: number;
        lng: number;
    }
    countryIso: string;
    currentUtcOffsetHours: number;
    tz: {
        name: string;
    }
}

export type LocationHistoryRecord = {
    title: string;
    loc: string;
    cciso: string;
    date: string;
}