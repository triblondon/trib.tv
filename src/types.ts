import type { ReadTimeResults } from "reading-time";

export type ReadTimeResultsExt = ReadTimeResults & {
    wordsFormatted: string;
}

export type PostMetadata = {
    layout: string;
    title: string;
    pubDate: string;
    description: string;
    author: string;
    tags: string[];
    readingTime?: ReadTimeResultsExt;
    status?: "published" | "draft" | "unlisted";
}

export type ContentItem = {
    title: string;
    url: string;
    pubDate: string;
    wordCount: number;
    description: string;
    isDraft: boolean;
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