import { describe, it, expect } from 'vitest';
import { calculateDistance } from './distance';

describe('calculateDistance', () => {
    it('calculates the exact distance between two identical points as 0', () => {
        expect(calculateDistance(52.5200, 13.4050, 52.5200, 13.4050)).toBe(0);
    });

    it('calculates distance between Berlin and Munich correctly (~504.6 km)', () => {
        const berlinLat = 52.5200;
        const berlinLng = 13.4050;
        const munichLat = 48.1351;
        const munichLng = 11.5820;
        
        const dist = calculateDistance(berlinLat, berlinLng, munichLat, munichLng);
        // Using approximate threshold due to Haversine rounding variations
        expect(dist).toBeGreaterThan(500);
        expect(dist).toBeLessThan(510);
    });

    it('calculates short distances correctly (e.g., across a city ~2.4km)', () => {
        const pointALat = 52.5200;
        const pointALng = 13.4050; // Alexanderplatz, Berlin
        const pointBLat = 52.5163;
        const pointBLng = 13.3777; // Brandenburg Gate, Berlin
        
        const dist = calculateDistance(pointALat, pointALng, pointBLat, pointBLng);
        // ~2.2 - 2.5km depending on exact coordinates
        expect(dist).toBeGreaterThan(1.5);
        expect(dist).toBeLessThan(3.0);
    });
});
