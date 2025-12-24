import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Contact() {
    const [searchParams] = useSearchParams();
    const initialTopic = searchParams.get('topic') || 'general';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: initialTopic,
        message: ''
    });

    // Update form topic if URL param changes (e.g. valid re-navigation)
    useEffect(() => {
        const topic = searchParams.get('topic');
        if (topic) {
            setFormData(prev => ({ ...prev, topic }));
        }
    }, [searchParams]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', topic: 'general', message: '' });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            {/* Header / Nav */}
            <header className="sticky top-0 z-10 bg-[#F5EBE0]/90 backdrop-blur-md border-b border-primary/10 p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <img src="/logo.png" alt="EnglishSpeakingVets Logo" className="h-16 w-auto" />
                        <span>EnglishSpeaking<span className="text-accent">Vets</span></span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex gap-4 text-sm font-semibold text-primary/70">
                        <Link to="/about" className="hover:text-accent transition-colors">About Our Pack</Link>
                        <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality Promise</Link>
                        <Link to="/" className="hover:text-accent transition-colors">Directory</Link>
                    </div>

                    {/* Mobile Back Link */}
                    <div className="md:hidden">
                        <Link to="/" className="text-sm font-semibold hover:text-accent transition-colors">
                            ← Directory
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-6 md:p-12 space-y-8">

                <section className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-primary/70 font-serif italic">
                        "Whether you have a correction, a new vet to suggest, or just want to say hello."
                    </p>
                </section>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
                    {submitted ? (
                        <div className="text-center py-12 space-y-4">
                            <span className="text-6xl">💌</span>
                            <h3 className="text-2xl font-bold text-primary">Message Sent!</h3>
                            <p className="text-primary/70">
                                Thank you for reaching out. We'll get back to you as soon as possible.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-4 px-6 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label htmlFor="topic" className="block text-sm font-bold text-primary mb-2">I want to...</label>
                                <select
                                    id="topic"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary"
                                >
                                    <option value="general">Ask a General Question</option>
                                    <option value="submit_vet">Submit a New Vet Recommendation</option>
                                    <option value="report_issue">Report an Issue / Correction</option>
                                    <option value="vet_owner">Claim/Update My Practice (Vet Owner)</option>
                                </select>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-primary mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-primary mb-2">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-primary mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                    placeholder={
                                        formData.topic === 'submit_vet' ? "Please include the Vet Name, Address, and why you recommend them!" :
                                            formData.topic === 'report_issue' ? "Let us know which clinic needs updating and what the correct info is." :
                                                "How can we help?"
                                    }
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.01] ${isSubmitting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-secondary hover:shadow-lg'}`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>

            </main>

            <footer className="bg-primary text-secondary py-12 text-center text-sm">
                <div className="max-w-4xl mx-auto px-4 space-y-6">
                    <p className="opacity-60">© 2025 EnglishSpeakingVets.online • Made with ❤️ for pets.</p>
                </div>
            </footer>
        </div>
    );
}
