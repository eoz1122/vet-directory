import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GoogleAnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        if (typeof window.gtag === 'function') {
            window.gtag('config', 'G-J6ZEGYZGVV', {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
}
