import type { Vet } from '../types/vet';
import { filterDisplayableVets } from './activeVets';

export interface VetDirectoryCounts {
    mapped: number;
    communityVerified: number;
    cities: number;
}

export function getVetDirectoryCounts(vets: Vet[]): VetDirectoryCounts {
    const displayableVets = filterDisplayableVets(vets);

    return {
        mapped: displayableVets.length,
        communityVerified: displayableVets.filter(
            (vet) => vet.community_status === 'Verified',
        ).length,
        cities: new Set(displayableVets.map((vet) => vet.city)).size,
    };
}
