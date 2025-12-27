import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import RelatedPosts from '../components/RelatedPosts';
import GuideDisclaimer from '../components/GuideDisclaimer';

export default function EmergencyVetsBerlin() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>24/7 Emergency Vets in Berlin | English-Speaking Emergency Care | EnglishSpeakingVets</title>
                <meta name="description" content="Complete guide to 24/7 emergency veterinary clinics in Berlin with English-speaking staff. Verified addresses, phone numbers, and what to expect." />
                <meta name="keywords" content="emergency vet Berlin, 24/7 veterinary Berlin, pet emergency Zehlendorf, Tiernotdienst Berlin, English vet emergency" />
                <link rel="canonical" href="https://englishspeakinggermany.online/guides/emergency-vets-berlin" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl prose prose-lg prose-forest text-primary/80">
                        <nav className="text-sm text-accent font-bold mb-6 flex items-center gap-2">
                            <Link to="/guides/pet-emergency-germany" className="hover:text-primary transition-colors">← EMERGENCY GUIDE</Link>
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            🚨 Emergency Vets in Berlin: <br />24/7 Care When You Need It
                        </h1>

                        <p className="text-xl text-primary/70 mb-8 italic">
                            When your pet needs emergency care in Berlin, every second counts. This guide lists all verified 24/7 emergency veterinary clinics in Berlin with English-speaking staff.
                        </p>

                        <h2 className="text-3xl font-bold text-primary mt-12 mb-8 text-center">Verified 24/7 Emergency Clinics in Berlin</h2>

                        <div className="space-y-8 not-prose">
                            {/* Valera */}
                            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-primary mb-4">Valera Veterinary Clinic</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📍</span>
                                            <span className="text-sm font-medium">Potsdamer Str. 23/24, 14163 Berlin (Zehlendorf)</span>
                                        </p>
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📞</span>
                                            <a href="tel:+493020180575" className="text-sm font-bold text-primary hover:text-accent transition-colors">030 20 1805 750</a>
                                        </p>
                                        <p className="flex items-start gap-4 mt-4">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-100">24/7 Emergency</span>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">English Verified</span>
                                        </p>
                                    </div>
                                    <div className="bg-primary/5 p-4 rounded-xl">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Clinic Services</h4>
                                        <ul className="text-xs space-y-1 font-medium text-primary/70">
                                            <li>• Emergency surgery & Intensive care</li>
                                            <li>• Advanced diagnostics (CT/X-ray)</li>
                                            <li>• Specialized surgical team</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Bärenwiese */}
                            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-primary mb-4">Tierarzt Bärenwiese</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📍</span>
                                            <span className="text-sm font-medium">Uhlandstraße 151, 10719 Berlin (Wilmersdorf)</span>
                                        </p>
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📞</span>
                                            <a href="tel:+491741601606" className="text-sm font-bold text-primary hover:text-accent transition-colors">0174 160 160 6</a>
                                        </p>
                                        <p className="flex items-start gap-4 mt-4">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-100">24/7 Mobile/Stationary</span>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">English Support</span>
                                        </p>
                                    </div>
                                    <div className="bg-primary/5 p-4 rounded-xl">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Clinic Services</h4>
                                        <ul className="text-xs space-y-1 font-medium text-primary/70">
                                            <li>• Urgent care consultations</li>
                                            <li>• After-hours emergency service</li>
                                            <li>• English-speaking veterinarians</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Rödiger */}
                            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-primary mb-4">The Berlin Veterinary Center</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📍</span>
                                            <span className="text-sm font-medium">Scharnweberstraße 136, 13405 Berlin (Reinickendorf)</span>
                                        </p>
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📞</span>
                                            <a href="tel:+493040939990" className="text-sm font-bold text-primary hover:text-accent transition-colors">030 409 399 90</a>
                                        </p>
                                        <p className="flex items-start gap-4 mt-4">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-100">24/7 Availability</span>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">International Team</span>
                                        </p>
                                    </div>
                                    <div className="bg-primary/5 p-4 rounded-xl">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Clinic Services</h4>
                                        <ul className="text-xs space-y-1 font-medium text-primary/70">
                                            <li>❌ Seizures lasting &gt; 2 minutes</li>
                                            <li>• Internal medicine & Diagnostics</li>
                                            <li>• High-tech intensive care</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 p-8 rounded-2xl my-12 not-prose">
                            <h4 className="text-red-600 font-bold mb-3 uppercase tracking-widest text-xs">💰 Emergency Costs in Berlin</h4>
                            <p className="text-sm opacity-70 mb-4 font-medium leading-relaxed">
                                All emergency visits follow the German GOT fee schedule. In Berlin, this means a mandatory <strong>€50 fee</strong> plus 2x-4x treatment multipliers.
                            </p>
                            <Link to="/blog/pet-insurance-germany-2025" className="text-accent hover:underline text-xs font-bold uppercase tracking-widest">Learn about Insurance Coverage →</Link>
                        </div>

                        <div className="bg-accent/10 p-8 rounded-2xl my-16 text-center shadow-lg border border-accent/20 not-prose">
                            <h3 className="text-2xl font-bold text-primary mb-4">View All Berlin Vets</h3>
                            <p className="mb-8 text-primary/80 italic font-medium">
                                Looking for a regular checkup or a specific specialist in your district? Browse our full directory of verified English-speaking vets in Berlin.
                            </p>
                            <Link
                                to="/"
                                className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                            >
                                Find a Berlin Vet →
                            </Link>
                        </div>

                        <GuideDisclaimer />

                        <RelatedPosts currentPath="/guides/emergency-vets-berlin" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
