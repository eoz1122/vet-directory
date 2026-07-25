import type { Vet } from '../types/vet';
import { calculateDistance } from './distance';
import { isVetVerified } from './verifiedLabel';

export interface NearbyCity {
    city: string;
    practiceCount: number;
    distanceKm: number;
}

interface CityCenter {
    city: string;
    lat: number;
    lng: number;
    practiceCount: number;
}

interface CityAccumulator {
    latTotal: number;
    lngTotal: number;
    practiceCount: number;
}

function hasUsableCoordinates(vet: Vet): boolean {
    const lat = vet.coordinates?.lat;
    const lng = vet.coordinates?.lng;

    return Number.isFinite(lat)
        && Number.isFinite(lng)
        && lat !== 0
        && lng !== 0
        && Math.abs(lat) <= 90
        && Math.abs(lng) <= 180;
}

function buildCityCenters(records: Vet[]): CityCenter[] {
    const cityTotals = new Map<string, CityAccumulator>();

    for (const vet of records) {
        if (vet.verification?.status === 'Permanently Closed') continue;
        if (!isVetVerified(vet) || !hasUsableCoordinates(vet)) continue;

        const current = cityTotals.get(vet.city) ?? {
            latTotal: 0,
            lngTotal: 0,
            practiceCount: 0,
        };
        current.latTotal += vet.coordinates.lat;
        current.lngTotal += vet.coordinates.lng;
        current.practiceCount += 1;
        cityTotals.set(vet.city, current);
    }

    return Array.from(cityTotals, ([city, totals]) => ({
        city,
        lat: totals.latTotal / totals.practiceCount,
        lng: totals.lngTotal / totals.practiceCount,
        practiceCount: totals.practiceCount,
    }));
}

export function buildNearbyCityMap(
    records: Vet[],
    limit = 4,
): Map<string, NearbyCity[]> {
    const cityCenters = buildCityCenters(records);
    const nearbyByCity = new Map<string, NearbyCity[]>();

    for (const source of cityCenters) {
        const nearby = cityCenters
            .filter((candidate) => candidate.city !== source.city)
            .map((candidate) => {
                const distance = calculateDistance(
                    source.lat,
                    source.lng,
                    candidate.lat,
                    candidate.lng,
                );

                return {
                    city: candidate.city,
                    practiceCount: candidate.practiceCount,
                    distanceKm: Math.max(1, Math.round(distance)),
                    sortDistance: distance,
                };
            })
            .sort((left, right) =>
                left.sortDistance - right.sortDistance
                || left.city.localeCompare(right.city, 'en'),
            )
            .slice(0, Math.max(0, limit))
            .map(({ city, practiceCount, distanceKm }) => ({
                city,
                practiceCount,
                distanceKm,
            }));

        nearbyByCity.set(source.city, nearby);
    }

    return nearbyByCity;
}

export function getNearbyCities(
    currentCity: string,
    records: Vet[],
    limit = 4,
): NearbyCity[] {
    return buildNearbyCityMap(records, limit).get(currentCity) ?? [];
}
