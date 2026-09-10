import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendGAEvent } from '../utils/analytics';

type NewsletterSource = 'site_footer' | 'dog_food_guide';

interface NewsletterSignupProps {
    source?: NewsletterSource;
    compact?: boolean;
    tone?: 'light' | 'dark';
}

export default function NewsletterSignup({
    source = 'site_footer',
    compact = false,
    tone = 'light',
}: NewsletterSignupProps) {
    const inputId = useId();
    const resultRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (status !== 'idle') resultRef.current?.focus();
    }, [status]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    source,
                    consent: true,
                    company: '',
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Please try again.');

            setEmail('');
            setStatus('success');
            sendGAEvent('newsletter_signup_success', {
                form_name: 'newsletter_signup',
                source,
                event_category: 'engagement',
            });
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Please try again.');
            sendGAEvent('newsletter_signup_error', {
                form_name: 'newsletter_signup',
                source,
                event_category: 'engagement',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDark = tone === 'dark';
    const sectionClass = isDark ? 'border-secondary/20 bg-secondary/5' : 'border-accent/20 bg-accent/5';
    const headingClass = isDark ? 'text-secondary' : 'text-primary';
    const bodyClass = isDark ? 'text-secondary/80' : 'text-primary/75';
    const finePrintClass = isDark ? 'text-secondary/70' : 'text-primary/60';
    const buttonClass = isDark ? 'bg-accent-ink text-white hover:bg-accent-dark' : 'bg-primary text-secondary hover:bg-black';

    return (
        <section
            aria-labelledby={`${inputId}-title`}
            className={`not-prose rounded-2xl border ${sectionClass} ${compact ? 'p-5' : 'p-6 md:p-8'}`}
        >
            <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">Periodic updates</p>
            <h2 id={`${inputId}-title`} className={`mt-2 text-xl font-bold ${headingClass}`}>
                Practical pet updates for Germany
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${bodyClass}`}>
                Get occasional English-language updates on vet access, pet care and rule changes. No spam. Reply to unsubscribe.
            </p>

            {status === 'success' ? (
                <div ref={resultRef} role="status" tabIndex={-1} className="mt-5 rounded-xl bg-white p-4 text-sm font-bold text-green-800">
                    You are subscribed. We will send occasional pet-care updates. Contact us if you want to unsubscribe.
                </div>
            ) : (
                <form className="mt-5" onSubmit={handleSubmit}>
                    <label htmlFor={inputId} className="sr-only">Email address</label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            id={inputId}
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="min-h-12 min-w-0 flex-1 rounded-xl border border-primary/15 bg-white px-4 py-3 text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`min-h-12 rounded-xl px-5 py-3 font-bold transition-colors disabled:cursor-wait disabled:opacity-60 ${buttonClass}`}
                        >
                            {isSubmitting ? 'Joining...' : 'Get periodic updates'}
                        </button>
                    </div>
                    <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                        Company
                        <input name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                    <p className={`mt-3 text-xs leading-relaxed ${finePrintClass}`}>
                        By subscribing, you agree to receive these updates. See our <Link to="/privacy" className="font-bold underline">Privacy Policy</Link>.
                    </p>
                    {status === 'error' && (
                        <div ref={resultRef} role="alert" tabIndex={-1} className="mt-3 text-sm font-medium text-red-700">
                            {errorMessage}
                        </div>
                    )}
                </form>
            )}
        </section>
    );
}
