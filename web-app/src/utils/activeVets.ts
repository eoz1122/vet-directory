import type { Vet } from '../types/vet';
import reviewedAliases from '../data/listingAliases.json';

/**
 * Single source of truth for which vets are shown to users.
 * Closed practices and canonical aliases stay in vets.json as an audit trail,
 * but must never render as separate public listings.
 */
export function filterDisplayableVets(vets: Vet[]): Vet[] {
    const aliases: Record<string, string> = reviewedAliases;
    const activeIds = new Set(vets.filter(vet => vet.verification?.status !== 'Permanently Closed').map(vet => vet.id));
    const target = (vet: Vet) => vet.canonical_listing_id ?? aliases[vet.id];
    return vets
        .filter(
            (vet) => vet.verification?.status !== 'Permanently Closed'
                && !(target(vet) && activeIds.has(target(vet))),
        )
        .map((vet) => vet.verification.evidence_type ? vet : ({
            ...vet,
            verification: {
                ...vet.verification,
                evidence_type: 'community' as const,
            },
        }))
        .map(vet => {
            const olderRecords = vets.filter(older => target(older) === vet.id);
            if (!olderRecords.length) return vet;
            const records = [vet, ...olderRecords];
            const rank = { community: 0, official_website: 1, government_source: 2, practice_confirmed: 3 };
            const strongest = records.reduce((best, candidate) =>
                rank[candidate.verification.evidence_type ?? 'community'] > rank[best.verification.evidence_type ?? 'community'] ? candidate : best, vet);
            return {
                ...vet,
                verification: {
                    ...vet.verification,
                    evidence_type: strongest.verification.evidence_type ?? 'community',
                    english_signals: [...new Set(records.flatMap(record => record.verification.english_signals))],
                    source_urls: [...new Set(records.flatMap(record => record.verification.source_urls ?? []))],
                },
                pending_community_confirmations: records.flatMap(record => record.pending_community_confirmations ?? []),
            };
        });
}
