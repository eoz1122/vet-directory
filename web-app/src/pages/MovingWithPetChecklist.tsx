import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function MovingWithPetChecklist() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            <Helmet>
                <title>Moving to Germany with a Pet: The 2025 Survival Checklist | EnglishSpeakingVets</title>
                <meta name="description" content="Moving to Germany with a dog or cat in 2025? Follow this essential 6-step checklist covering microchips, rabies vaccines, the 15-week rule, and EU health certificates to avoid quarantine." />
                <meta name="keywords" content="moving to Germany with pet, bringing dog to Germany, bringing cat to Germany, pet relocation Germany, Germany pet import regulations 2025, EU animal health certificate Germany, Germany dangerous dog breed restrictions" />
                <meta property="og:title" content="Moving to Germany with a Pet: The 2025 Survival Checklist" />
                <meta property="og:description" content="Don't get stuck at customs. Essential guide for expats bringing pets to Germany in 2025: Microchips, vaccines, and the critical 15-week rule." />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/moving-to-germany-with-pet-2025" />
            </Helmet>

            {/* Header / Nav */}
            <header className="sticky top-0 z-50 bg-[#F5EBE0]/90 backdrop-blur-md border-b border-primary/10 p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center flex-wrap gap-4">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <img src="/logo.png" alt="EnglishSpeakingVets Logo" className="h-16 w-auto" />
                        <span>EnglishSpeaking<span className="text-accent">Vets</span></span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex gap-4 text-sm font-semibold text-primary/70">
                        <Link to="/about" className="hover:text-accent transition-colors">About Our Pack</Link>
                        <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality Promise</Link>
                        <Link to="/" className="hover:text-accent transition-colors">Directory</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    </div>

                    {/* Mobile Back Link */}
                    <div className="md:hidden">
                        <Link to="/" className="text-sm font-semibold hover:text-accent transition-colors flex items-center gap-1">
                            <span className="text-xl">🐾</span> Directory
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6 md:p-12 relative z-10">
                <article className="prose prose-stone prose-lg max-w-none text-primary/90">
                    <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                        Moving to Germany with a Pet: <br />The 2025 Survival Checklist
                    </h1>

                    <p className="lead text-xl italic text-primary/70 mb-8 border-l-4 border-accent pl-4">
                        So, you’re making the big move to Germany. Between visa paperwork and apartment hunting, your biggest worry isn’t the furniture — it’s the four-legged family member coming with you.
                    </p>

                    <p>
                        I’ve been through the expat pet panic myself. German bureaucracy has its reputation for a reason, and when it comes to animal health, they don’t mess around. To save you from a nightmare at the airport, here’s the essential, human-to-human checklist for relocating your pet to Germany in 2025.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-sm my-8 border border-primary/5">
                        <h2 className="text-2xl font-bold text-accent mb-4 mt-0">1. The “Golden Rule”: Microchip FIRST, Vaccine SECOND</h2>
                        <p><strong>This is the mistake that breaks hearts — and drains bank accounts.</strong></p>
                        <p>In the eyes of German customs (Zoll), a rabies vaccination does not exist unless it is linked to a microchip.</p>

                        <ul className="space-y-2">
                            <li>Check <strong>The law:</strong> Your pet must have an ISO-compliant, 15-digit microchip (ISO 11784/11785) implanted before receiving a rabies vaccination.¹²</li>
                            <li>Warning <strong>The trap:</strong> If your vet gives the rabies shot on Monday and implants the microchip on Tuesday, Germany considers that vaccination invalid. You’ll have to re-vaccinate and restart the waiting period from zero.</li>
                            <li>Star <strong>Pro tip:</strong> Ask your vet to scan the microchip and record the number on the vaccination certificate immediately.</li>
                        </ul>
                    </div>

                    <h2 className="text-2xl font-bold text-primary mt-12 mb-4">2. The 21-Day Waiting Period</h2>
                    <p>You can’t just jab and go.</p>
                    <p>After the rabies vaccine is administered (and only after the microchip is in place), you must wait at least <strong>21 full days</strong> before entering Germany.¹</p>
                    <p className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 text-sm">
                        This waiting period is non-negotiable. Arrive even one day early, and your pet may face quarantine or be sent back at your expense.³⁶
                    </p>

                    <h2 className="text-2xl font-bold text-primary mt-12 mb-4">3. The “15-Week Rule” (The Puppy & Kitten Barrier)</h2>
                    <p>This rule catches many new pet owners off guard.</p>
                    <p>Germany <strong>does not allow puppies or kittens under 15 weeks old</strong> to enter from countries such as the US, UK, Canada, and other EU-listed (low-rabies-risk) countries.¹⁴⁷</p>

                    <div className="bg-primary/5 p-6 rounded-xl my-6">
                        <h3 className="text-lg font-bold mb-2 mt-0">The Math:</h3>
                        <ul className="list-none pl-0 space-y-2 mb-0">
                            <li>💉 Minimum rabies vaccination age: <strong>12 weeks</strong></li>
                            <li>⏳ Mandatory waiting period: <strong>21 days</strong></li>
                            <li><strong>= 15 weeks minimum age at travel</strong></li>
                        </ul>
                    </div>

                    <p>There are no exceptions for young animals — not for adoption cases, emotional reasons, or “too cute to stay behind.” If you’re moving with a puppy or kitten, your travel date must be planned around that 15-week birthday.</p>

                    <h3 className="text-lg font-bold mt-6 mb-2">Important note on high-risk rabies countries:</h3>
                    <p>Pets entering Germany from non-listed (high-risk) countries must complete additional steps:</p>
                    <ul className="list-disc pl-5">
                        <li>Rabies vaccination</li>
                        <li>Rabies antibody blood test (≥30 days later)</li>
                        <li>A 3-month waiting period after the blood draw</li>
                    </ul>
                    <p>In practice, this usually means pets cannot enter Germany until they are around 7 months old or older.⁴⁷</p>

                    <h2 className="text-2xl font-bold text-primary mt-12 mb-4">4. Paperwork: The EU Health Certificate (Annex IV)</h2>
                    <p>If you’re arriving from a non-EU country (such as the US, UK, or Canada), you’ll need an <strong>EU Annex IV Animal Health Certificate</strong>.¹³</p>
                    <p>This certificate must:</p>
                    <ul className="list-disc pl-5">
                        <li>Be issued by your private veterinarian</li>
                        <li>Be endorsed by an official government veterinarian (USDA in the US, CFIA in Canada, APHA in the UK)</li>
                        <li>Be signed within <strong>10 days</strong> of entry into Germany</li>
                    </ul>
                    <p>It feels like a race against time — so book your international health certificate appointment well in advance.</p>

                    <h2 className="text-2xl font-bold text-primary mt-12 mb-4">5. “Non-Commercial” vs. “Commercial” Travel</h2>
                    <p>To keep the process simple (and affordable), your pet must travel <strong>within 5 days before or after your own flight</strong>.¹</p>
                    <p>This classifies the move as non-commercial. If the gap is longer, the transport is legally considered commercial, triggering significantly more paperwork, higher costs, and stricter controls.</p>

                    <div className="bg-red-50 border border-red-100 p-8 rounded-2xl my-12">
                        <h2 className="text-2xl font-bold text-red-800 mb-4 mt-0">6. Important Additional Restrictions</h2>
                        <h3 className="text-lg font-bold text-red-700 mt-4 mb-2">Breed restrictions</h3>
                        <p className="text-red-900/80">Germany enforces strict dog-breed regulations under both federal and state-level (Bundesland) laws.</p>
                        <p className="text-red-900/80">Commonly restricted or banned breeds include:</p>
                        <ul className="list-disc pl-5 text-red-900/80 mb-4">
                            <li>Pit Bull Terrier</li>
                            <li>American Staffordshire Terrier</li>
                            <li>Staffordshire Bull Terrier</li>
                            <li>Bull Terrier</li>
                        </ul>
                        <p className="text-sm italic text-red-700">Rules vary by state, and some German states prohibit import entirely. Each state (Bundesland) has its own "List of Dangerous Dogs". Always check the specific laws of your destination state before traveling.⁵⁸</p>

                        <h3 className="text-lg font-bold text-red-700 mt-6 mb-2">Maximum number of pets</h3>
                        <p className="text-red-900/80 mb-0">For non-commercial travel, you may bring up to <strong>five pets per person</strong>.¹</p>
                    </div>

                    <div className="bg-[#1B4332] text-[#F5EBE0] p-8 rounded-2xl my-16 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-accent mb-4 mt-0">🏠 A Note from the Sofa</h2>
                            <p className="text-lg leading-relaxed opacity-90">
                                I know this feels like a lot. I spent my own move staring at these rules until my eyes blurred. But once you clear the airport and see your dog sniffing grass in a <Link to="/vets/berlin" className="text-accent hover:text-white underline">Berlin park</Link> — or your cat curling up in a sunbeam in a <Link to="/vets/frankfurt" className="text-accent hover:text-white underline">Frankfurt apartment</Link> — it will be worth it.
                            </p>
                            <p className="text-lg leading-relaxed opacity-90 mt-4">
                                Germany is an incredibly pet-friendly country once you're inside the fortress. We're here to help you get through the gates.
                            </p>
                            <div className="mt-8 pt-6 border-t border-[#F5EBE0]/20">
                                <p className="font-bold mb-2">Moving soon?</p>
                                <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors font-bold text-lg">
                                    Check our Directory of English-Speaking Vets
                                    <span>→</span>
                                </Link>
                                <p className="text-sm opacity-60 mt-1">Find a friendly face for your pet’s first check-up after arrival.</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Link to="/vets/berlin" className="text-sm px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-full transition-colors">
                                        Vets in Berlin
                                    </Link>
                                    <Link to="/vets/hamburg" className="text-sm px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-full transition-colors">
                                        Vets in Hamburg
                                    </Link>
                                    <Link to="/vets/frankfurt" className="text-sm px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-full transition-colors">
                                        Vets in Frankfurt
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element could go here */}
                    </div>

                    <hr className="my-12 border-primary/10" />

                    <section className="text-sm text-primary/60">
                        <h3 className="font-bold text-primary mb-4 text-base">📚 Official EU & German Sources (Footnotes)</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><a href="https://food.ec.europa.eu/animals/movement-pets_en" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">European Commission – Travelling with Pets (Non-Commercial Movement)</a></li>
                            <li><a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R0576" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">Regulation (EU) No 576/2013 – Core EU pet movement law</a></li>
                            <li><a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32013R0577" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">Regulation (EU) No 577/2013 – Technical implementation rules</a></li>
                            <li><a href="https://food.ec.europa.eu/animals/movement-pets/eu-legislation/entry-union_en" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">European Commission – Rabies & Entry Requirements</a></li>
                            <li><a href="https://www.bmel.de/EN/topics/animals/pets-and-zoo-animals/pets-entry-regulation.html" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">German Federal Ministry of Food and Agriculture (BMEL)</a></li>
                            <li><a href="https://www.zoll.de/EN/Private-individuals/Travel/Entering-Germany/Restrictions/Animals/animals_node.html" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">German Customs (Zoll) – Importing Animals</a></li>
                            <li><a href="https://food.ec.europa.eu/animals/movement-pets/approved-non-eu-countries_en" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">European Commission – Approved (Low-Risk) & Non-Approved Countries</a></li>
                            <li><a href="https://www.gesetze-im-internet.de/tierschtzv/" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">German Breed-Specific Legislation (State-Level Overview)</a></li>
                        </ol>
                    </section>
                </article>
            </main>

            <footer className="bg-primary text-secondary py-12 text-center text-sm relative z-10 mt-12">
                <div className="max-w-4xl mx-auto px-4 space-y-6">
                    <div className="flex justify-center gap-6 font-semibold flex-wrap">
                        <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                        <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality Promise</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                        <Link to="/impressum" className="hover:text-accent transition-colors">Impressum</Link>
                        <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
                    </div>
                    <p className="opacity-60">© 2025 englishspeakinggermany.online • Made with ❤️ for pets.</p>
                </div>
            </footer>
        </div>
    );
}
