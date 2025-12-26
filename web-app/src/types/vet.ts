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
    };
    verification: {
        ai_score: number;
        last_scanned: string;
        english_signals: string[];
        emergency?: string;
    };
    community_status?: "Verified" | "Community Sourced";
}

export interface VetWithDistance extends Vet {
    distance?: number;
}
