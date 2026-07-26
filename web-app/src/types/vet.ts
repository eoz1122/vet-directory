export interface Vet {
    id: string;
    canonical_listing_id?: string;
    practice_name: string;
    city: string;
    district: string;
    address: string;
    practice_focus?: string;
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
        source_urls?: string[];
        evidence_type?: "official_website" | "government_source" | "community";
        emergency_services?: string;
    };
    community_status?: "Verified" | "Community Sourced" | "Pending" | "Unverified";
    pending_community_confirmations?: Array<{
        date: string;
        source: "site_button";
    }>;
}

export interface VetWithDistance extends Vet {
    distance?: number;
}
