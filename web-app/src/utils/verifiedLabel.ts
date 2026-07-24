import type { Vet } from '../types/vet';

/**
 * Card "Last Verified" label. Recent scans show month + year; older ones soften
 * to year-only so cards do not advertise their own staleness to visitors.
 */
const SIX_MONTHS_MS = 183 * 24 * 60 * 60 * 1000;

export function formatVerifiedLabel(lastScanned: string | undefined, now: Date = new Date()): string {
    const d = lastScanned ? new Date(lastScanned) : null;
    if (!d || isNaN(d.getTime())) return '2025';
    if (now.getTime() - d.getTime() > SIX_MONTHS_MS) return String(d.getFullYear());
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export interface VerificationPresentation {
    badge: 'Official Website' | 'Community Confirmed' | 'Community Listed';
    title: 'Official Website Confirmed' | 'Community Confirmed' | 'Confirmation Needed';
    description: string;
    verified: boolean;
}

export function isOfficialWebsiteConfirmed(vet: Vet): boolean {
    return vet.verification?.evidence_type === 'official_website';
}

export function isVetVerified(vet: Vet): boolean {
    return isOfficialWebsiteConfirmed(vet) ||
        vet.community_status === 'Verified' ||
        vet.verification?.status === 'Verified';
}

export function getVerificationPresentation(vet: Vet): VerificationPresentation {
    if (isOfficialWebsiteConfirmed(vet)) {
        return {
            badge: 'Official Website',
            title: 'Official Website Confirmed',
            description: 'The practice explicitly advertises English-language service on its own website. Confirm which English-speaking clinician will be available when booking.',
            verified: true,
        };
    }

    if (isVetVerified(vet)) {
        return {
            badge: 'Community Confirmed',
            title: 'Community Confirmed',
            description: 'Community members have confirmed English availability. Confirm again when booking because staff availability can change.',
            verified: true,
        };
    }

    return {
        badge: 'Community Listed',
        title: 'Confirmation Needed',
        description: 'This is a community-sourced listing. English availability has not yet been confirmed through our community process.',
        verified: false,
    };
}
