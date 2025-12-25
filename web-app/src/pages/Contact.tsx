import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalData = {
            ...formData,
            submittedAt: new Date().toISOString()
        };

        // For now, log the structured JSON. This can be sent to a backend later.
        console.log("Form Submission:", JSON.stringify(finalData, null, 2));

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({
                name: '', email: '', topic: 'general', message: '',
                vetName: '', vetCity: '', otherCity: '', vetAddress: '', vetWebsite: ''
            });
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

                            {/* Dynamic Fields for Vet Submission */}
                            {formData.topic === 'submit_vet' && (
                                <div className="p-6 bg-secondary/20 rounded-xl space-y-4 border border-primary/5 animate-fade-in">
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
                                    className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
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
