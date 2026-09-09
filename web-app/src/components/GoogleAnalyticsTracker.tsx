import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendGAEvent } from '../utils/analytics';

export default function GoogleAnalyticsTracker() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        const sendPageView = () => {
            sendGAEvent('page_view', {
                page_path: pathname + search,
                page_title: document.title,
            });
        };

        // Defer route navigation until metadata has updated and cancel the first StrictMode pass.
        const timer = window.setTimeout(sendPageView, 0);
        window.addEventListener('analytics-consent-granted', sendPageView);

        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('analytics-consent-granted', sendPageView);
        };
    }, [pathname, search]);

    return null;
}
