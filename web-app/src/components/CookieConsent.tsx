import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    const enableGA = useCallback(() => {
        // @ts-expect-error - gtag is from external script
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }, []);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        } else if (consent === 'accepted') {
            enableGA();
        }
    }, [enableGA]);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        enableGA();
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        // @ts-expect-error - gtag is from external script
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="max-w-4xl mx-auto bg-primary/95 backdrop-blur-md text-secondary p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-accent mb-2 flex items-center gap-2">
                        <span>🍪</span> Cookie Settings
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                        We use cookies to understand how you find our vets and to improve your experience.
                        By clicking "Accept", you agree to our use of analytics cookies.
                        View our <Link to="/privacy" className="underline hover:text-accent transition-colors">Privacy Policy</Link> for more details.
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-6 py-3 text-sm font-semibold rounded-xl border border-white/20 hover:bg-white/10 transition-all active:scale-95"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-8 py-3 text-sm font-bold rounded-xl bg-accent text-primary hover:bg-white transition-all shadow-lg hover:shadow-accent/20 active:scale-95"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
