import locationHistory from "../assets/location-history.json";
import allCountries from "../assets/all-countries.json";
import type { LocationData, LocationHistoryRecord } from "../types";

type LocationCounts = Record<string, { cciso: string; count: number; last: number }>

const LOCATION_DEFAULTS: LocationData = {
    pos: { lat: null, lng: null },
    countryIso: 'Unknown',
    currentUtcOffsetHours: null,
    tz: {
        name: 'Unknown'
    }
}


export const locationCounts: LocationCounts = (locationHistory as LocationHistoryRecord[]).reduce((acc, trip) => {
    if (!(trip.cciso in acc)) acc[trip.cciso] = { cciso: trip.cciso, count: 0, last: 0 }
    acc[trip.cciso].count++;
    acc[trip.cciso].last = Math.max(acc[trip.cciso].last, (new Date(trip.date)).getTime());
    return acc;
}, {});

export const locationsContent = Object.values(locationCounts)
    .sort((a, b) => b.count > a.count ? 1 : -1)
    .map(rec => {
        const isoKey = rec.cciso.toLowerCase();
        const name = (isoKey in allCountries) ? allCountries[isoKey].name : rec.cciso;
        return { ...rec, name, last: new Date(rec.last) };
    })
    ;

export const getCurrentLocation = async (): Promise<LocationData> => {
    try {
        const response = await fetch('https://triblondon-tribtvlocationmeta.web.val.run/trib-tv');
        return await response.json();
    } catch (e) {
        return LOCATION_DEFAULTS;
    }
}
