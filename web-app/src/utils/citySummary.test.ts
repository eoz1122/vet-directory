import { describe, it, expect } from 'vitest';
import { generateCitySummary } from './citySummary';
import type { Vet } from '../types/vet';

const mk = (over: Partial<Vet>): Vet => ({
    id: 'x', practice_name: 'Test Clinic', city: 'Hofheim', district: 'Unknown',
    address: 'Somewhere 1', coordinates: { lat: 50.09, lng: 8.44 },
    contact: { website: 'https://example.org', phone: '06192 1234' },
    verification: { status: 'Verified', last_scanned: '2026-06-01', english_signals: ['English website'] },
    community_status: 'Verified', ...over,
});

const hofheim = [
    mk({ id: 'a', practice_name: 'Tierarzt Hofheim Mitte' }),
    mk({ id: 'b', practice_name: 'Kleintierpraxis Nord', community_status: 'Community Sourced', verification: { status: 'Community Sourced', last_scanned: '2026-05-01', english_signals: ['Review mention'] }, contact: { website: null, phone: '06192 999' } }),
];

const frankfurt = Array.from({ length: 8 }, (_, i) =>
    mk({ id: `f${i}`, practice_name: `Frankfurt Vet ${i}`, city: 'Frankfurt', district: 'Nordend', coordinates: { lat: 50.11, lng: 8.68 }, verification: { status: 'Verified', last_scanned: '2026-06-01', english_signals: [], emergency_services: i === 0 ? '24/7' : '' } }),
);

describe('generateCitySummary', () => {
    it('produces city-specific prose naming real practices and counts', () => {
        const s = generateCitySummary('Hofheim', hofheim, [...hofheim, ...frankfurt]);
        expect(s.content).toContain('Hofheim');
        expect(s.content).toContain('Tierarzt Hofheim Mitte');
        expect(s.content).toContain('2');
        expect(s.content.split(/\s+/).length).toBeGreaterThan(120);
    });

    it('distinguishes verified from community-sourced honestly', () => {
        const s = generateCitySummary('Hofheim', hofheim, hofheim);
        expect(s.content.toLowerCase()).toContain('community');
        expect(s.content).not.toMatch(/top-rated/i); // no unearned superlatives
    });

    it('differs meaningfully between two cities (no shared boilerplate)', () => {
        const a = generateCitySummary('Hofheim', hofheim, [...hofheim, ...frankfurt]).content;
        const b = generateCitySummary('Frankfurt', frankfurt, [...hofheim, ...frankfurt]).content;
        const aSent = new Set(a.split('. '));
        const shared = b.split('. ').filter((s) => aSent.has(s));
        expect(shared.length).toBeLessThanOrEqual(1);
    });

    it('points small cities to the nearest bigger hub with distance', () => {
        const s = generateCitySummary('Hofheim', hofheim, [...hofheim, ...frankfurt]);
        expect(s.nearestHub).not.toBeNull();
        expect(s.nearestHub!.city).toBe('Frankfurt');
        expect(s.nearestHub!.count).toBe(8);
        expect(s.nearestHub!.distanceKm).toBeGreaterThan(5);
        expect(s.nearestHub!.distanceKm).toBeLessThan(40);
    });

    it('returns no hub for a city that IS the hub', () => {
        const s = generateCitySummary('Frankfurt', frankfurt, [...hofheim, ...frankfurt]);
        expect(s.nearestHub).toBeNull();
    });

    it('mentions emergency availability only when the data supports it', () => {
        const f = generateCitySummary('Frankfurt', frankfurt, frankfurt);
        expect(f.content.toLowerCase()).toContain('emergency');
        const h = generateCitySummary('Hofheim', hofheim, hofheim);
        expect(h.content.toLowerCase()).not.toContain('24/7');
    });

    it('never emits em dashes, undefined, or NaN', () => {
        for (const cityVets of [hofheim, frankfurt]) {
            const s = generateCitySummary(cityVets[0].city, cityVets, [...hofheim, ...frankfurt]);
            expect(s.content).not.toMatch(/—|undefined|NaN/);
        }
    });
});
