import { useState, useEffect, useCallback, useId } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
    const titleId = useId();
    const [isVisible, setIsVisible] = useState(
        () => localStorage.getItem('cookie-consent') === null
    );

    const enableGA = useCallback(() => {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }, []);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (consent === 'accepted') {
            enableGA();
        }
    }, [enableGA]);

    useEffect(() => {
        const openSettings = () => setIsVisible(true);
        window.addEventListener('open-cookie-settings', openSettings);
        return () => window.removeEventListener('open-cookie-settings', openSettings);
    }, []);

    const handleAccept = () => {
        const wasAlreadyAccepted = localStorage.getItem('cookie-consent') === 'accepted';
        localStorage.setItem('cookie-consent', 'accepted');
        enableGA();
        if (!wasAlreadyAccepted) {
            window.dispatchEvent(new Event('analytics-consent-granted'));
        }
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            role="region"
            aria-labelledby={titleId}
            className="fixed bottom-0 left-0 right-0 z-[100] max-h-[45vh] overflow-y-auto p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-10 duration-500"
        >
            <div className="max-w-4xl mx-auto bg-primary/95 backdrop-blur-md text-secondary p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                    <h3 id={titleId} className="text-xl font-bold text-accent mb-2 flex items-center gap-2">
                        <span aria-hidden="true">🍪</span> Cookie Settings
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                        Analytics cookies help us understand how visitors use the directory. They are optional, and advertising storage remains disabled.
                        View our <Link to="/privacy" className="underline hover:text-accent transition-colors">Privacy Policy</Link> for more details.
                    </p>
                </div>

                <div className="flex gap-3 w-full lg:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 lg:flex-none min-h-11 px-4 sm:px-6 py-3 text-sm font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all active:scale-95"
                    >
                        Decline analytics
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 lg:flex-none min-h-11 px-5 sm:px-8 py-3 text-sm font-bold rounded-xl bg-accent-ink text-white hover:bg-white hover:text-primary transition-all shadow-lg hover:shadow-accent/20 active:scale-95"
                    >
                        Accept analytics
                    </button>
                </div>
            </div>
        </div>
    );
}
