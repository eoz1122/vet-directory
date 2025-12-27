import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function PetEmergencyGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Pet Emergency in Germany: 24/7 Vet Care Guide | EnglishSpeakingVets</title>
                <meta name="description" content="Complete guide to pet emergencies in Germany: Find 24/7 emergency vets, understand costs, learn when to go, and get emergency numbers. Berlin, Hamburg, Munich, Frankfurt, Stuttgart." />
                <meta name="keywords" content="emergency vet Germany, 24/7 veterinary care, pet emergency Berlin, Hamburg emergency vet, Munich emergency clinic, pet poison control Germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online/guides/pet-emergency-germany" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl prose prose-lg prose-forest text-primary/80">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Emergency Survival Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            🚨 What to Do in a Pet Emergency: <br />The Germany Survival Guide
                        </h1>

                        <TableOfContents items={[
                            { id: 'emergency-check', label: 'Is It REALLY an Emergency?' },
                            { id: 'find-clinic', label: 'Find Your Nearest 24h Tierklinik' },
                            { id: 'call-ahead', label: 'Call Before You Go' },
                            { id: 'costs', label: 'The €50 Emergency Fee & Costs' },
                            { id: 'resources', label: 'Emergency Numbers & Resources' },
                            { id: 'checklist', label: 'Quick Emergency Checklist' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="text-xl text-primary/70 mb-8 italic">
                                It's 11pm on a Sunday. Your dog just ate something toxic. Or your cat is choking. Or your pet is bleeding, vomiting, or clearly in distress. You're panicking, your German is non-existent, and you have no idea where to go or who to call.
                            </p>

                            <p className="mb-8">
                                This is the nightmare scenario every pet owner dreads. But in Germany, emergency veterinary care is available 24/7 in every major city—if you know where to look and what to expect.
                            </p>

                            <p className="mb-8">
                                This is your third-grade-simple checklist for when things go wrong after hours. Save this guide. Screenshot the emergency numbers. Know where your nearest 24-hour Tierklinik is <em>before</em> you need it.
                            </p>

                            <h2 id="emergency-check" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Step 1: Is It REALLY an Emergency?</h2>

                            <p className="mb-6">
                                Before you rush to the emergency vet at 2am, ask yourself: does your pet need immediate life-saving care, or can this wait until morning?
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
                                <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                                    <h4 className="font-black text-red-700 mb-4 uppercase tracking-tighter text-sm flex items-center gap-2">
                                        🚨 GO NOW (Emergency)
                                    </h4>
                                    <ul className="space-y-3 text-sm font-bold text-red-800/70">
                                        <li>❌ Difficulty breathing / Choking</li>
                                        <li>❌ Severe uncontrolled bleeding</li>
                                        <li>❌ Seizures lasting &gt;2 minutes</li>
                                        <li>❌ Unconsciousness or collapse</li>
                                        <li>❌ Suspected poisoning</li>
                                        <li>❌ Trauma (Hit by car, dog fight)</li>
                                        <li>❌ Bloat (hard/swollen abdomen)</li>
                                    </ul>
                                </div>
                                <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                                    <h4 className="font-black text-amber-700 mb-4 uppercase tracking-tighter text-sm flex items-center gap-2">
                                        ⏰ CAN WAIT (Call in Morning)
                                    </h4>
                                    <ul className="space-y-3 text-sm font-bold text-amber-800/70">
                                        <li>✅ Mild vomiting (still drinking)</li>
                                        <li>✅ Limping but can walk</li>
                                        <li>✅ Ear infections</li>
                                        <li>✅ Hot spots or minor rashes</li>
                                        <li>✅ Minor cough or sneezing</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-accent/10 border-l-4 border-accent p-6 my-8">
                                <p className="text-lg font-bold text-primary">
                                    <strong>When in doubt, CALL the emergency vet first.</strong> They'll tell you if your pet needs to come in immediately or if it can wait.
                                </p>
                            </div>

                            <h2 id="find-clinic" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Step 2: Find Your Nearest 24-Hour Tierklinik</h2>

                            <p className="mb-6">
                                Don't wait until there's an emergency to figure out where to go. Look up your nearest 24-hour veterinary clinic (Tierklinik) right now and save the address and phone number.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                                <Link to="/guides/emergency-vets-berlin" className="block p-6 bg-white border border-primary/5 rounded-2xl hover:border-accent transition hover:shadow-lg">
                                    <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">🏥 Berlin Emergency Vets</h3>
                                    <p className="text-sm text-primary/60">5 verified 24/7 clinics with English support in the capital.</p>
                                    <span className="text-accent text-[10px] font-black uppercase tracking-widest mt-4 block">View Berlin List →</span>
                                </Link>

                                <div className="block p-6 bg-primary/5 border border-primary/5 rounded-2xl opacity-60">
                                    <h3 className="text-xl font-bold text-primary mb-2">🏥 Other Major Cities</h3>
                                    <p className="text-sm text-primary/60">Hamburg, Munich, and Frankfurt guides are being verified and updated.</p>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-primary mt-12 mb-6">📲 Online Search Tools:</h3>

                            <div className="space-y-4 my-6 not-prose">
                                <a href="http://www.tierarzt-notdienst.de" target="_blank" rel="noopener" className="flex items-center gap-4 bg-white p-4 rounded-xl border border-primary/5 hover:bg-secondary transition-colors">
                                    <span className="text-2xl">🌐</span>
                                    <div>
                                        <p className="font-bold text-primary">Tierarzt-Notdienst.de</p>
                                        <p className="text-xs text-primary/50">National directory searchable by postcode</p>
                                    </div>
                                </a>
                                <a href="http://www.vetfinder.de" target="_blank" rel="noopener" className="flex items-center gap-4 bg-white p-4 rounded-xl border border-primary/5 hover:bg-secondary transition-colors">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <p className="font-bold text-primary">VetFinder App</p>
                                        <p className="text-xs text-primary/50">Available for iOS and Android</p>
                                    </div>
                                </a>
                            </div>

                            <h2 id="call-ahead" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Step 3: Call Before You Go</h2>

                            <p className="mb-6">
                                <strong>ALWAYS call the emergency vet before you arrive.</strong> This confirms they are open, allows them to prepare for your arrival, and lets them give you crucial transport safety instructions.
                            </p>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-10 not-prose">
                                <h3 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                                    <span className="text-2xl">🗣️</span> Emergency Phrases
                                </h3>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-accent pl-4 italic">
                                        <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-1">English:</p>
                                        <p className="text-lg">"Hello, I have an emergency. My dog/cat is [symptoms]. Can I bring them in now?"</p>
                                    </div>
                                    <div className="border-l-2 border-accent pl-4 italic">
                                        <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-1">German:</p>
                                        <p className="text-lg">"Hallo, ich habe einen Notfall. Mein Hund/meine Katze [symptoms]. Kann ich sofort vorbeikommen?"</p>
                                        <p className="text-[10px] mt-2 opacity-50 font-normal not-italic uppercase tracking-widest">HAH-loh, ikh HAH-buh EYE-nen NOHT-fall...</p>
                                    </div>
                                </div>
                            </div>

                            <h2 id="costs" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Step 4: The €50 Emergency Fee & Costs</h2>

                            <div className="bg-white border-2 border-red-100 p-8 rounded-2xl mb-12 not-prose">
                                <h4 className="text-red-600 font-bold mb-3 uppercase tracking-widest text-xs">
                                    ⚠️ MANDATORY EMERGENCY FEE
                                </h4>
                                <p className="text-lg font-bold text-primary mb-4">
                                    Every emergency visit costs a minimum of €50 on top of treatment costs.
                                </p>
                                <p className="text-sm opacity-70 mb-4">
                                    This fee is regulated by the <strong>GOT (Gebührenordnung für Tierärzte)</strong> and applies on weeknights (6pm-8am), weekends, and public holidays.
                                </p>
                                <div className="bg-primary/5 p-4 rounded-xl text-sm font-medium">
                                    💡 <strong>Total Minimum:</strong> Between the €50 fee and the mandatory 2x-4x emergency multiplier, expect to pay <strong>€100–€150 just for the initial consultation</strong>.
                                </div>
                            </div>

                            <p className="mb-6">
                                Most emergency vets require <strong>immediate payment</strong> via EC-Card, Credit Card, or Cash. If you have pet insurance, you will usually pay upfront and get reimbursed later.
                            </p>

                            <h2 id="resources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Emergency Numbers & Resources</h2>

                            <div className="grid gap-4 my-8 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-1">Poison Control (Göttingen)</p>
                                        <p className="text-2xl font-bold text-red-600 tracking-tighter">0551 / 19 240</p>
                                    </div>
                                    <a href="tel:+4955119240" className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm">CALL NOW</a>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-1">TASSO (Lost & Found Pet)</p>
                                        <p className="text-2xl font-bold text-primary tracking-tighter">06190 / 93 73 00</p>
                                    </div>
                                    <a href="tel:+496190937300" className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm">CALL NOW</a>
                                </div>
                            </div>

                            <h2 id="checklist" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Quick Emergency Checklist</h2>
                            <div className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm my-8 not-prose">
                                <ul className="space-y-4 font-medium text-primary/70">
                                    <li className="flex gap-4"><span>✅</span> <span>Find your nearest 24h clinic <strong>today</strong>.</span></li>
                                    <li className="flex gap-4"><span>✅</span> <span>Save the emergency phone numbers in your phone now.</span></li>
                                    <li className="flex gap-4"><span>✅</span> <span>Keep a secure carrier or leash by the door.</span></li>
                                    <li className="flex gap-4"><span>✅</span> <span>Ensure you have at least €500 available on a card.</span></li>
                                    <li className="flex gap-4"><span>✅</span> <span>Keep your pet insurance number/card in your wallet.</span></li>
                                </ul>
                            </div>

                            <div className="bg-accent/10 p-8 rounded-2xl my-16 text-center shadow-lg border border-accent/20 not-prose">
                                <h3 className="text-2xl font-bold text-primary mb-4">Is it a non-emergency?</h3>
                                <p className="mb-8 text-primary/80 italic font-medium">
                                    If your pet needs a checkup or has a minor issue, find a verified English-speaking vet for a regular appointment to avoid the €50 emergency fee.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Find a Regular Vet →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/guides/pet-emergency-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
