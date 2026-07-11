import type { Vet } from '../types/vet';

/**
 * Single source of truth for which vets are shown to users.
 * Practices marked "Permanently Closed" stay in vets.json as an audit trail
 * (community reports mark them closed) but must never render in the directory.
 */
export function filterDisplayableVets(vets: Vet[]): Vet[] {
    return vets.filter((v) => v.verification?.status !== 'Permanently Closed');
}
