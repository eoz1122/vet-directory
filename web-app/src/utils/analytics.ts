export const sendGAEvent = (
    eventName: string,
    eventParams?: Record<string, unknown>
) => {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParams);
    } else {
        console.warn('Google Analytics not initialized', { eventName, eventParams });
    }
};

export const trackAffiliateClick = (providerName: string, location: string) => {
    sendGAEvent('affiliate_click', {
        provider: providerName,
        location: location,
        event_category: 'outbound',
        event_label: providerName,
    });
};

// Outbound clicks to a listed practice's own website. This is the directory's
// core value metric ("we sent your practice N visitors") - keep it firing.
export const trackVetWebsiteClick = (vetId: string, city: string, location: string) => {
    sendGAEvent('vet_website_click', {
        vet_id: vetId,
        city: city,
        location: location,
        event_category: 'outbound',
        event_label: vetId,
    });
};

// Direct call intent is a core directory conversion. Do not include the phone
// number in analytics because the listing ID is sufficient for attribution.
export const trackVetPhoneClick = (vetId: string, city: string, location: string) => {
    sendGAEvent('vet_phone_click', {
        vet_id: vetId,
        city: city,
        location: location,
        event_category: 'contact',
        event_label: vetId,
    });
};

// Map engagement: answers "does anyone actually use the map?" for the
// keep-vs-demote decision on the landing page.
export const trackMapPinClick = (vetId: string, city: string) => {
    sendGAEvent('map_pin_click', {
        vet_id: vetId,
        city: city,
        event_category: 'map',
        event_label: vetId,
    });
};

export type DirectoryFilterName = 'city' | 'verified' | 'emergency' | 'mobile' | 'radius';

export const trackDirectoryFilterChange = (
    filterName: DirectoryFilterName,
    filterValue: string | number | boolean,
) => {
    sendGAEvent('directory_filter_change', {
        filter_name: filterName,
        filter_value: filterValue,
        event_category: 'directory',
    });
};

interface DirectoryNoResultsContext {
    city: string;
    searchLength: number;
    verifiedOnly: boolean;
    emergencyOnly: boolean;
    mobileOnly: boolean;
    radius: number | null;
}

function searchLengthBucket(length: number) {
    if (length === 0) return 'none';
    if (length <= 3) return '1_to_3';
    if (length <= 7) return '4_to_7';
    return '8_plus';
}

export const trackDirectoryNoResults = (context: DirectoryNoResultsContext) => {
    sendGAEvent('directory_no_results', {
        city: context.city,
        search_length_bucket: searchLengthBucket(context.searchLength),
        verified_only: context.verifiedOnly,
        emergency_only: context.emergencyOnly,
        mobile_only: context.mobileOnly,
        radius_km: context.radius ?? 'any',
        event_category: 'directory',
    });
};

export const trackGuideDiscoveryClick = (guidePath: string, location: string) => {
    sendGAEvent('guide_discovery_click', {
        guide_path: guidePath,
        location,
        event_category: 'content',
    });
};
