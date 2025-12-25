import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedPosts from '../components/RelatedPosts';

export default function QualityPromise() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            {/* Header / Nav */}
            {/* Header / Nav */}
            <Header />

            <main className="max-w-3xl mx-auto p-6 md:p-12 space-y-12">

                {/* Hero Section */}
                <section className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                        Our Quality Promise
                    </h1>
                    <p className="text-xl text-primary/70 max-w-2xl mx-auto italic">
                        Keeping the Connection Strong
                    </p>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-2xl mx-auto border-8 border-white group">
                        <img
                            src="/images/cat-hero.png"
                            alt="A calm, happy cat sitting on a sofa"
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white text-left">
                            <p className="text-sm font-bold uppercase tracking-widest opacity-80">Our Inspiration</p>
                            <p className="text-2xl font-serif italic italic font-medium">"For the love of our little friends."</p>
                        </div>
                    </div>
                </section>

                {/* Our Heart */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                        Our Heart
                    </h2>
                    <p className="text-lg leading-relaxed text-primary/80">
                        <span className="inline-flex items-center gap-1.5 align-baseline">
                            <img src="/logo.png" alt="" className="h-5 w-auto self-center" />
                            <span className="font-bold tracking-tight">
                                <span className="text-primary">EnglishSpeaking</span>
                                <span className="text-accent">Vets</span>
                            </span>
                        </span> was born out of a simple need: to help expats and their pets feel at home. We know that in a medical emergency, every second counts and clear communication is a lifeline. We see ourselves as a bridge—connecting you with the people who speak your language when it matters most.
                    </p>
                </section>

                {/* How We Care */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                        How We Care For This Service
                    </h2>
                    <p className="text-primary/80">
                        A directory is only as good as its last update. To ensure you never call a disconnected number or walk into a clinic that no longer offers English support, we perform a Monthly Freshness Check:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-white/50 p-6 rounded-xl border border-primary/10">
                            <h3 className="font-bold text-lg mb-2">Staying Current</h3>
                            <p className="text-sm text-primary/70">
                                Every 30 days, we check in on our listings. If a practice moves, changes its hours, or updates its team, we make sure those changes are reflected here immediately.
                            </p>
                        </div>

                        <div className="bg-white/50 p-6 rounded-xl border border-primary/10">
                            <h3 className="font-bold text-lg mb-2">The "Warm Outreach" Protocol</h3>
                            <p className="text-sm text-primary/70">
                                Before we ever hide a listing, we look for "English Signals." If a practice appears to have shifted focus away from international services, we move them to a "verification queue" while we gather more information.
                            </p>
                        </div>

                        <div className="bg-white/50 p-6 rounded-xl border border-primary/10">
                            <h3 className="font-bold text-lg mb-2">Technical Wellness</h3>
                            <p className="text-sm text-primary/70">
                                We work behind the scenes to ensure the site is lightning-fast and secure. Whether you're in the middle of a park in Berlin or a busy street in Frankfurt, our mobile experience is built to be your reliable companion.
                            </p>
                        </div>

                        <div className="bg-white/50 p-6 rounded-xl border border-primary/10">
                            <h3 className="font-bold text-lg mb-2">Community-Led Growth</h3>
                            <p className="text-sm text-primary/70">
                                We don't just rely on AI. We listen to you. Your "Report" clicks and "New Vet" submissions are what make this site human and truly accurate.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Be a Part of the Story */}
                <section className="bg-[#1B4332]/5 p-8 rounded-2xl border border-dashed border-primary/20 space-y-4">
                    <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                        Be a Part of the Story
                    </h2>
                    <p className="text-primary/80">
                        This site belongs to the community. You are our "eyes and ears" on the ground:
                    </p>
                    <ul className="space-y-4 list-disc list-inside text-primary/80">
                        <li>
                            <strong>Share a Success:</strong> Found a vet who was incredibly patient with your English? <Link to="/contact?topic=submit_vet" className="text-accent hover:underline">Tell us about them</Link>.
                        </li>
                        <li>
                            <strong>Help Us Stay Sharp:</strong> Notice a typo or an old address? Tap the "Update Info" icon on any card.
                        </li>
                        <li>
                            <strong>Request a Change:</strong> Are you a vet owner who wants to update your details? <Link to="/contact?topic=vet_owner" className="text-accent hover:underline">Contact our team</Link>.
                        </li>
                    </ul>
                </section>

                {/* Transparency Note */}
                <section className="border-t border-primary/10 pt-8 space-y-2">
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                        Transparency Note
                    </h2>
                    <p className="text-sm text-primary/60 max-w-2xl">
                        We are a community resource focused on language accessibility. While we work hard to verify English services, we are not medical experts. Please always confirm details directly with the practice before your visit.
                    </p>
                </section>

                <RelatedPosts currentPath="/quality-promise" />
            </main>

            <Footer />
        </div>
    );
}
