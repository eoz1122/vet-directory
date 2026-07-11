import { describe, it, expect } from 'vitest';
import { filterDisplayableVets } from './activeVets';
import type { Vet } from '../types/vet';

function makeVet(id: string, status: string): Vet {
    return {
        id,
        practice_name: `Practice ${id}`,
        city: 'Berlin',
        district: 'Mitte',
        address: 'Teststr. 1, 10115 Berlin',
        coordinates: { lat: 52.5, lng: 13.4 },
        contact: { phone: '030 1234567', website: 'https://example.org', google_maps: null },
        verification: {
            status,
            last_scanned: '2026-01-01',
            english_signals: ['English website'],
            emergency_services: false,
        },
        community_status: 'Verified',
    } as unknown as Vet;
}

describe('filterDisplayableVets', () => {
    it('excludes permanently closed practices', () => {
        const vets = [makeVet('a', 'Verified'), makeVet('b', 'Permanently Closed'), makeVet('c', 'Verified')];
        const result = filterDisplayableVets(vets);
        expect(result.map((v) => v.id)).toEqual(['a', 'c']);
    });

    it('keeps vets with other statuses, including "Verified but No Website Found"', () => {
        const vets = [makeVet('a', 'Verified but No Website Found'), makeVet('b', 'Verified')];
        expect(filterDisplayableVets(vets)).toHaveLength(2);
    });

    it('returns an empty array for an empty input', () => {
        expect(filterDisplayableVets([])).toEqual([]);
    });

    it('does not mutate the input array', () => {
        const vets = [makeVet('a', 'Permanently Closed')];
        filterDisplayableVets(vets);
        expect(vets).toHaveLength(1);
    });
});
