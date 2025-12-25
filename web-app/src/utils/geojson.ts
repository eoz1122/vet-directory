import { Vet } from './types/vet';

export const vetsToGeoJson = (vets: Vet[]) => {
    return {
        type: "FeatureCollection",
        features: vets
            .filter(vet => vet.coordinates && vet.coordinates.lat !== 0)
            .map(vet => ({
                type: "Feature",
                id: vet.id,
                geometry: {
                    type: "Point",
                    coordinates: [vet.coordinates.lng, vet.coordinates.lat]
                },
                properties: {
                    name: vet.practice_name,
                    city: vet.city,
                    address: vet.address,
                    phone: vet.contact?.phone,
                    website: vet.contact?.website,
                    status: vet.community_status,
                    verified: vet.verification?.english_signals?.length > 0
                }
            }))
    };
};
