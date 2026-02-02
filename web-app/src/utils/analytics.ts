export const sendGAEvent = (
    eventName: string,
    eventParams?: Record<string, any>
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
