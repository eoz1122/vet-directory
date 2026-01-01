import { useState } from 'react';

export default function EmailCourseSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // TODO: Integrate with actual email service (Mailchimp/ConvertKit)
        // For now, simulate success
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="bg-accent/10 p-6 rounded-2xl border border-accent/20 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="font-bold text-primary mb-2">You're in!</h3>
                <p className="text-sm opacity-80 mb-4">
                    Day 1 of your <strong>Pet Survival Kit</strong> is on its way to your inbox.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-accent text-xs font-bold uppercase tracking-widest hover:underline"
                >
                    Send to another email
                </button>
            </div>
        );
    }

    return (
        <div className="bg-primary text-secondary p-6 rounded-2xl relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
                <div className="inline-block bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded mb-4">
                    Free 5-Day Email Course
                </div>

                <h3 className="text-xl font-bold mb-2 leading-tight">
                    New to Germany with a Pet? 🇩🇪
                </h3>

                <p className="text-sm opacity-80 mb-6 font-light">
                    Don't learn the hard way. Get our <strong>"Expat Pet Survival Kit"</strong> delivered to your inbox.
                </p>

                <ul className="space-y-2 mb-6 text-sm opacity-90">
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Bureaucracy Checklist</li>
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Insurance Demystified</li>
                    <li className="flex gap-2 items-center"><span className="text-accent">✓</span> Emergency Contacts</li>
                </ul>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder-white/50 focus:outline-none focus:border-accent transition-colors text-white"
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        className="w-full bg-accent hover:bg-white hover:text-accent text-primary font-bold py-3 px-4 rounded-lg transition-all shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Sending...' : 'Send Me The Guide →'}
                    </button>
                    <p className="text-[10px] text-center opacity-40">
                        No spam. Unsubscribe anytime.
                    </p>
                </form>
            </div>
        </div>
    );
}
