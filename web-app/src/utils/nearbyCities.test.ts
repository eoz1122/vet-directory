import { describe, expect, it } from 'vitest';

import vetsData from '../data/vets.json';
import type { Vet } from '../types/vet';
import { filterDisplayableVets } from './activeVets';
import { buildNearbyCityMap, getNearbyCities } from './nearbyCities';

const makeVet = (
    id: string,
    city: string,
    lat: number,
    lng: number,
    overrides: Partial<Vet> = {},
): Vet => ({
    id,
    practice_name: `${city} Practice`,
    city,
    district: 'Unknown',
    address: `${city} 1`,
    coordinates: { lat, lng },
    contact: { website: 'https://example.org', phone: null },
    verification: {
        status: 'Verified',
        last_scanned: '2026-07-25',
        english_signals: ['English service confirmed'],
    },
    community_status: 'Verified',
    ...overrides,
});

describe('getNearbyCities', () => {
    it('returns the nearest verified city centers in deterministic distance order', () => {
        const records = [
            makeVet('alpha-1', 'Alpha', 50, 8),
            makeVet('alpha-2', 'Alpha', 50, 8),
            makeVet('beta-1', 'Beta', 50.1, 8),
            makeVet('beta-2', 'Beta', 50.1, 8),
            makeVet('gamma-1', 'Gamma', 51, 8),
            makeVet('unverified-1', 'Unverified', 50.01, 8, {
                community_status: 'Community Sourced',
                verification: {
                    status: 'Community Sourced',
                    last_scanned: '2026-07-25',
                    english_signals: [],
                },
            }),
            makeVet('invalid-1', 'Invalid', 0, 0),
            makeVet('closed-1', 'Closed', 50.02, 8, {
                verification: {
                    status: 'Permanently Closed',
                    last_scanned: '2026-07-25',
                    english_signals: [],
                },
            }),
        ];

        expect(getNearbyCities('Alpha', records, 2)).toEqual([
            { city: 'Beta', practiceCount: 2, distanceKm: 11 },
            { city: 'Gamma', practiceCount: 1, distanceKm: 111 },
        ]);
    });

    it('returns no destinations when the current city has no valid verified center', () => {
        expect(getNearbyCities('Missing', [
            makeVet('beta-1', 'Beta', 50.1, 8),
        ])).toEqual([]);
    });

    it('connects every verified directory city to four other verified cities', () => {
        const nearbyByCity = buildNearbyCityMap(
            filterDisplayableVets(vetsData as Vet[]),
        );

        expect(nearbyByCity.size).toBe(65);
        for (const [city, nearby] of nearbyByCity) {
            expect(nearby).toHaveLength(4);
            expect(nearby.some((destination) => destination.city === city)).toBe(false);
            expect(new Set(nearby.map((destination) => destination.city)).size).toBe(4);
        }
    });
});
