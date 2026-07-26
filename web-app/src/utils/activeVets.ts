import type { Vet } from '../types/vet';

/**
 * Single source of truth for which vets are shown to users.
 * Closed practices and canonical aliases stay in vets.json as an audit trail,
 * but must never render as separate public listings.
 */
export function filterDisplayableVets(vets: Vet[]): Vet[] {
    return vets
        .filter(
            (vet) => vet.verification?.status !== 'Permanently Closed'
                && !vet.canonical_listing_id,
        )
        .map((vet) => vet.verification.evidence_type ? vet : ({
            ...vet,
            verification: {
                ...vet.verification,
                evidence_type: 'community',
            },
        }));
}
