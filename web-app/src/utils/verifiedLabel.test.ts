import { describe, it, expect } from 'vitest';
import { formatVerifiedLabel } from './verifiedLabel';

describe('formatVerifiedLabel', () => {
    const NOW = new Date('2026-07-17');

    it('shows month + year for recent verifications (under 6 months)', () => {
        expect(formatVerifiedLabel('2026-07-03', NOW)).toBe('Jul 2026');
        expect(formatVerifiedLabel('2026-03-15', NOW)).toBe('Mar 2026');
    });

    it('softens to year-only when older than 6 months (avoids advertising staleness)', () => {
        expect(formatVerifiedLabel('2025-12-26', NOW)).toBe('2025');
        expect(formatVerifiedLabel('2025-01-01', NOW)).toBe('2025');
    });

    it('falls back gracefully on missing/invalid dates', () => {
        expect(formatVerifiedLabel(undefined, NOW)).toBe('2025');
        expect(formatVerifiedLabel('garbage', NOW)).toBe('2025');
    });
});
