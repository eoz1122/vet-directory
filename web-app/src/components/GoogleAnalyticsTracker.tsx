import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GoogleAnalyticsTracker() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        // Defer until route metadata has updated and cancel the first StrictMode pass.
        const timer = window.setTimeout(() => {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'page_view', {
                    page_path: pathname + search,
                    page_title: document.title,
                });
            }
        }, 0);

        return () => window.clearTimeout(timer);
    }, [pathname, search]);

    return null;
}
