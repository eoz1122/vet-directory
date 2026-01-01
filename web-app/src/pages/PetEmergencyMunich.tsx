import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import RelatedPosts from '../components/RelatedPosts';
import GuideDisclaimer from '../components/GuideDisclaimer';

export default function PetEmergencyMunich() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>24/7 Emergency Vets in Munich | English-Speaking Emergency Care | EnglishSpeakingVets</title>
                <meta name="description" content="Complete guide to 24/7 emergency veterinary clinics in Munich (München) with English-speaking staff. Verified addresses, LMU clinic details, and phone numbers." />
                <meta name="keywords" content="emergency vet Munich, 24/7 veterinary Munich, Tierklinik LMU emergency, Tiernotdienst München, English vet emergency Munich" />
                <link rel="canonical" href="https://englishspeakinggermany.online/guides/emergency-vets-munich" />
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
                            🚨 Emergency Vets in Munich: <br />24/7 Care When You Need It
                        </h1>

                        <p className="text-xl text-primary/70 mb-8 italic">
                            For pet owners in Munich, the university clinic (LMU) is the primary hub for serious emergencies. Here is the verified 24/7 contact information.
                        </p>

                        <h2 className="text-3xl font-bold text-primary mt-12 mb-8 text-center">Verified 24/7 Emergency Clinics in Munich</h2>

                        <div className="space-y-8 not-prose">
                            {/* LMU Munich */}
                            <div className="bg-white border border-primary/5 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-2xl font-bold text-primary mb-4">Medizinische Kleintierklinik LMU München</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📍</span>
                                            <span className="text-sm font-medium">Veterinärstraße 13, 80539 München (Schwabing)</span>
                                        </p>
                                        <p className="flex items-start gap-3">
                                            <span className="text-accent">📞</span>
                                            <a href="tel:+498921802650" className="text-sm font-bold text-primary hover:text-accent transition-colors">089 2180 2650</a>
                                        </p>
                                        <p className="flex items-start gap-4 mt-4">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-100">24/7 Emergency</span>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">University Clinic</span>
                                        </p>
                                    </div>
                                    <div className="bg-primary/5 p-4 rounded-xl">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Clinic Services</h4>
                                        <ul className="text-xs space-y-1 font-medium text-primary/70">
                                            <li>• Highest level of trauma care</li>
                                            <li>• Specialists on call 24/7</li>
                                            <li>• Full diagnostic imaging (MRI/CT)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-red-100 p-8 rounded-2xl my-12 not-prose">
                            <h4 className="text-red-600 font-bold mb-3 uppercase tracking-widest text-xs">💰 Emergency Costs</h4>
                            <p className="text-sm opacity-70 mb-4 font-medium leading-relaxed">
                                Emergency visits in Germany incur a mandatory <strong>€50 "Notdienstgebühr"</strong> plus higher billing rates (up to 4x).
                            </p>
                            <Link to="/blog/pet-insurance-germany-2025" className="text-accent hover:underline text-xs font-bold uppercase tracking-widest">Learn about Insurance Coverage →</Link>
                        </div>

                        <div className="bg-accent/10 p-8 rounded-2xl my-16 text-center shadow-lg border border-accent/20 not-prose">
                            <h3 className="text-2xl font-bold text-primary mb-4">View All Munich Vets</h3>
                            <p className="mb-8 text-primary/80 italic font-medium">
                                For non-emergencies, vaccinations, or routine checkups, browse our complete list of verified English-speaking vets in Munich.
                            </p>
                            <Link
                                to="/vets/munich"
                                className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                            >
                                Find a Munich Vet →
                            </Link>
                        </div>

                        <GuideDisclaimer />

                        <RelatedPosts currentPath="/guides/emergency-vets-munich" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
