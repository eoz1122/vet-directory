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
