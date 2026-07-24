import { describe, it, expect } from 'vitest';
import type { Vet } from '../types/vet';
import {
    formatVerifiedLabel,
    getVerificationPresentation,
    isVetVerified,
} from './verifiedLabel';

const makeVet = (
    communityStatus: Vet['community_status'],
    evidenceType?: 'official_website' | 'community',
): Vet => ({
    id: 'test-vet',
    practice_name: 'Test Vet',
    city: 'Leipzig',
    district: 'Leutzsch',
    address: 'Example 1, Leipzig',
    coordinates: { lat: 51.3, lng: 12.3 },
    contact: { website: 'https://example.test', phone: null },
    verification: {
        status: communityStatus === 'Verified' ? 'Verified' : 'Community Sourced',
        last_scanned: '2026-07-25',
        english_signals: ['English evidence'],
        evidence_type: evidenceType,
    },
    community_status: communityStatus,
});

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

describe('getVerificationPresentation', () => {
    it('identifies explicit first-party website evidence without calling it community verified', () => {
        const vet = makeVet('Verified', 'official_website');

        expect(isVetVerified(vet)).toBe(true);
        expect(getVerificationPresentation(vet)).toEqual({
            badge: 'Official Website',
            title: 'Official Website Confirmed',
            description: 'The practice explicitly advertises English-language service on its own website. Confirm which English-speaking clinician will be available when booking.',
            verified: true,
        });
    });

    it('keeps genuine community confirmations distinct', () => {
        const presentation = getVerificationPresentation(makeVet('Verified', 'community'));

        expect(presentation.badge).toBe('Community Confirmed');
        expect(presentation.title).toBe('Community Confirmed');
        expect(presentation.description).toContain('Community members');
        expect(presentation.description).not.toContain('practice explicitly');
    });

    it('does not upgrade a community-sourced lead', () => {
        const vet = makeVet('Community Sourced');

        expect(isVetVerified(vet)).toBe(false);
        expect(getVerificationPresentation(vet).badge).toBe('Community Listed');
        expect(getVerificationPresentation(vet).title).toBe('Confirmation Needed');
    });
});
