import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
    const [searchParams] = useSearchParams();
    const initialTopic = searchParams.get('topic') || 'general';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: initialTopic,
        message: '',
        // Structured data for Vet Submission
        vetName: '',
        vetCity: '',
        otherCity: '',
        vetAddress: '',
        vetWebsite: ''
    });


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Pre-fill form if coming from a report link
    useEffect(() => {
        const topic = searchParams.get('topic');
        const vetId = searchParams.get('vetId');
        const vetName = searchParams.get('vetName');
        const reason = searchParams.get('reason');

        if (topic === 'report_issue' && vetName && reason) {
            setFormData(prev => ({
                ...prev,
                topic: 'report_issue',
                message: `[REPORT] ${reason}\nPractice: ${vetName}\nID: ${vetId}\n\nDetails: `
            }));
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const finalData = {
            ...formData,
            _subject: `[The Pack] ${formData.topic.toUpperCase()} - ${formData.name}`,
            submittedAt: new Date().toISOString()
        };

        try {
            // Send to our custom Python Backend
            // In development, this points to localhost:5000 via proxy or direct
            // In production, Nginx will route /api/contact to the Flask app
            const API_URL = import.meta.env.DEV ? 'http://localhost:5000/api/contact' : '/api/contact';

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message.');
            }

            setSubmitted(true);
            setFormData({
                name: '', email: '', topic: 'general', message: '',
                vetName: '', vetCity: '', otherCity: '', vetAddress: '', vetWebsite: ''
            });
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Contact Us | The Pack</title>
                <meta name="description" content="Get in touch with The Pack. Submit a vet recommendation, report an issue, or ask a question." />
                <link rel="canonical" href="https://englishspeakinggermany.online/contact" />
            </Helmet>
            {/* Header / Nav */}
            <Header />

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
                    {submitError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                            {submitError}
                        </div>
                    )}
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
                                    className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary"
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
                                        className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
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
                                        className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Fields for Vet Submission */}
                            {formData.topic === 'submit_vet' && (
                                <div className="p-6 bg-primary/5 rounded-xl space-y-4 border border-primary/5 animate-fade-in">
                                    <h4 className="font-bold text-accent text-sm uppercase tracking-wider mb-2">Practice Details</h4>

                                    <div>
                                        <label htmlFor="vetName" className="block text-sm font-bold text-primary mb-2">Practice Name</label>
                                        <input
                                            type="text"
                                            id="vetName"
                                            name="vetName"
                                            required={formData.topic === 'submit_vet'}
                                            value={formData.vetName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            placeholder="e.g. Tierarztpraxis Berlin Mitte"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="vetCity" className="block text-sm font-bold text-primary mb-2">City</label>
                                            <select
                                                id="vetCity"
                                                name="vetCity"
                                                required={formData.topic === 'submit_vet'}
                                                value={formData.vetCity}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            >
                                                <option value="">Select City...</option>
                                                <option value="Berlin">Berlin</option>
                                                <option value="Hamburg">Hamburg</option>
                                                <option value="Frankfurt">Frankfurt</option>
                                                <option value="Munich">Munich</option>
                                                <option value="Other">Other (Type Below)</option>
                                            </select>
                                        </div>
                                        {formData.vetCity === 'Other' ? (
                                            <div>
                                                <label htmlFor="otherCity" className="block text-sm font-bold text-primary mb-2">Specify City Name</label>
                                                <input
                                                    type="text"
                                                    id="otherCity"
                                                    name="otherCity"
                                                    required={formData.vetCity === 'Other'}
                                                    value={formData.otherCity}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                                    placeholder="e.g. Düsseldorf"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label htmlFor="vetAddress" className="block text-sm font-bold text-primary mb-2">Address (Street/District)</label>
                                                <input
                                                    type="text"
                                                    id="vetAddress"
                                                    name="vetAddress"
                                                    value={formData.vetAddress}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                                    placeholder="e.g. Prenzlauer Allee 123"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {formData.vetCity === 'Other' && (
                                        <div>
                                            <label htmlFor="vetAddress" className="block text-sm font-bold text-primary mb-2">Address (Street/District)</label>
                                            <input
                                                type="text"
                                                id="vetAddress"
                                                name="vetAddress"
                                                value={formData.vetAddress}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                                placeholder="e.g. Königsallee 1"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="vetWebsite" className="block text-sm font-bold text-primary mb-2">Website (Optional)</label>
                                        <input
                                            type="url"
                                            id="vetWebsite"
                                            name="vetWebsite"
                                            value={formData.vetWebsite}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-white border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-primary mb-2">
                                    {formData.topic === 'submit_vet' ? "Why do you recommend them?" : "Message"}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-primary/5 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                                    placeholder={
                                        formData.topic === 'submit_vet' ? "Tell us about your experience! Did they speak clear English? Were they kind to your pet?" :
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

            <Footer />
        </div>
    );
}
