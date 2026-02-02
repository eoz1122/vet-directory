export interface Vet {
    id: string;
    practice_name: string;
    city: string;
    district: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    contact: {
        website: string | null;
        phone: string | null;
        google_maps?: string | null;
    };
    verification: {
        status: string;
        last_scanned: string;
        english_signals: string[];
        emergency_services?: string;
    };
    community_status?: "Verified" | "Community Sourced" | "Pending" | "Unverified";
}

export interface VetWithDistance extends Vet {
    distance?: number;
}
