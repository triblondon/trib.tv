/** Location metadata and country visit counts for the homepage. */

import locationHistory from "../assets/location-history.json";
import allCountries from "../assets/all-countries.json";
import type { LocationData, LocationHistoryRecord } from "../types";

type LocationCounts = Record<string, { cciso: string; count: number; last: number }>

const LOCATION_URL = 'https://gw.home.trib.tv/api/services/script/get_andrew_location?return_response';

type LocationResponse = Omit<LocationData, 'history'> & { history: LocationHistoryRecord[] };

/** Check whether a value has object properties. */
const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/** Check the location fields consumed by the homepage. */
const isLocationResponse = (value: unknown): value is LocationResponse => {
    return isRecord(value)
        && isRecord(value.pos)
        && typeof value.pos.lat === 'number' && Number.isFinite(value.pos.lat)
        && Math.abs(value.pos.lat) <= 90
        && typeof value.pos.lng === 'number' && Number.isFinite(value.pos.lng)
        && Math.abs(value.pos.lng) <= 180
        && typeof value.countryIso === 'string' && /^[A-Z]{2}$/.test(value.countryIso)
        && typeof value.currentUtcOffsetHours === 'number' && Number.isFinite(value.currentUtcOffsetHours)
        && isRecord(value.tz) && typeof value.tz.name === 'string' && value.tz.name.length > 0
        && Array.isArray(value.history)
        && value.history.every(rec => isRecord(rec)
            && typeof rec.cciso === 'string' && /^[A-Z]{2}$/.test(rec.cciso)
            && typeof rec.date === 'string' && Number.isFinite(Date.parse(rec.date)));
};

/** Fetch location metadata from Home Assistant during the site build. */
const fetchData = async (): Promise<LocationResponse> => {
    const token = import.meta.env.HA_TOKEN;
    if (!token) throw new Error('HA_TOKEN is required to build the homepage.');

    const response = await fetch(LOCATION_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: '{}',
        signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error(`Home Assistant location request failed: HTTP ${response.status}.`);

    const data: unknown = await response.json();
    if (!isRecord(data) || !isLocationResponse(data.service_response)) {
        throw new Error('Home Assistant returned invalid location data.');
    }
    return data.service_response;
};

/** Combine location metadata with historical country visit counts. */
export const getLocationData = async (): Promise<LocationData> => {
    const data = await fetchData();
    const locations: LocationHistoryRecord[] = [...locationHistory, ...data.history];
    const locationCounts: LocationCounts = locations.reduce((acc, trip) => {
        if (!(trip.cciso in acc)) acc[trip.cciso] = { cciso: trip.cciso, count: 0, last: 0 }
        acc[trip.cciso].count++;
        acc[trip.cciso].last = Math.max(acc[trip.cciso].last, (new Date(trip.date)).getTime());
        return acc;
    }, {});

    const locationsHistoryContent = Object.values(locationCounts)
        .sort((a, b) => b.count > a.count ? 1 : -1)
        .map(rec => {
            const isoKey = rec.cciso.toLowerCase();
            const name = (isoKey in allCountries) ? allCountries[isoKey].name : rec.cciso;
            return { ...rec, name, last: new Date(rec.last) };
        })
    ;
    return { ...data, history: locationsHistoryContent };
}
