import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function MovingWithPetChecklist() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Moving to Germany with a Pet: The 2025 Survival Checklist</title>
                <meta name="description" content="Moving to Germany with a dog or cat in 2025? Follow this essential 6-step checklist covering microchips, rabies vaccines, the 15-week rule, and EU health certificates to avoid quarantine." />
                <meta name="keywords" content="moving to Germany with pet, bringing dog to Germany, bringing cat to Germany, pet relocation Germany, Germany pet import regulations 2025, EU animal health certificate Germany, Germany dangerous dog breed restrictions" />
                <meta property="og:title" content="Moving to Germany with a Pet: The 2025 Survival Checklist" />
                <meta property="og:description" content="Don't get stuck at customs. Essential guide for expats bringing pets to Germany in 2025: Microchips, vaccines, and the critical 15-week rule." />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/moving-to-germany-with-pet-2025" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            Moving to Germany with a Pet: <br />The 2025 Survival Checklist
                        </h1>

                        <TableOfContents items={[
                            { id: 'golden-rule', label: '1. The "Golden Rule": Microchip FIRST' },
                            { id: 'waiting-period', label: '2. The 21-Day Waiting Period' },
                            { id: 'puppy-barrier', label: '3. The "15-Week Rule" (Puppies/Kittens)' },
                            { id: 'paperwork', label: '4. Paperwork: EU Health Certificate' },
                            { id: 'travel-type', label: '5. Commercial vs. Non-Commercial' },
                            { id: 'restrictions', label: '6. Breed & Quantity Restrictions' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                So, you’re making the big move to Germany. Between visa paperwork and apartment hunting, your biggest worry isn’t the furniture — it’s the four-legged family member coming with you.
                            </p>

                            <p className="mt-8">
                                I’ve been through the expat pet panic myself. German bureaucracy has its reputation for a reason, and when it comes to animal health, they don’t mess around. To save you from a nightmare at the airport, here’s the essential, human-to-human checklist for relocating your pet to Germany in 2025.
                            </p>

                            <div className="bg-white p-8 rounded-2xl shadow-sm my-8 border border-primary/10 not-prose">
                                <h2 id="golden-rule" className="text-2xl font-bold text-accent mb-4 mt-0 scroll-mt-24">1. The “Golden Rule”: Microchip FIRST, Vaccine SECOND</h2>
                                <p className="mb-4"><strong>This is the mistake that breaks hearts — and drains bank accounts.</strong></p>
                                <p className="mb-4">In the eyes of German customs (Zoll), a rabies vaccination does not exist unless it is linked to a microchip.</p>

                                <ul className="space-y-2">
                                    <li>Check <strong>The law:</strong> Your pet must have an ISO-compliant, 15-digit microchip (ISO 11784/11785) implanted before receiving a rabies vaccination.¹²</li>
                                    <li>Warning <strong>The trap:</strong> If your vet gives the rabies shot on Monday and implants the microchip on Tuesday, Germany considers that vaccination invalid. You’ll have to re-vaccinate and restart the waiting period from zero.</li>
                                    <li>Star <strong>Pro tip:</strong> Ask your vet to scan the microchip and record the number on the vaccination certificate immediately.</li>
                                </ul>
                            </div>

                            <h2 id="waiting-period" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">2. The 21-Day Waiting Period</h2>
                            <p>You can’t just jab and go.</p>
                            <p>After the rabies vaccine is administered (and only after the microchip is in place), you must wait at least <strong>21 full days</strong> before entering Germany.¹</p>
                            <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent text-sm text-primary/80">
                                <p className="m-0 font-bold text-primary">This waiting period is non-negotiable.</p>
                                <p className="m-0 text-primary/80">Arrive even one day early, and your pet may face quarantine or be sent back at your expense.³⁶</p>
                            </div>

                            <h2 id="puppy-barrier" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">3. The “15-Week Rule”</h2>
                            <p>This rule catches many new pet owners off guard.</p>
                            <p>Germany <strong>does not allow puppies or kittens under 15 weeks old</strong> to enter from countries such as the US, UK, Canada, and other EU-listed (low-rabies-risk) countries.¹⁴⁷</p>

                            <div className="bg-primary/5 p-6 rounded-xl my-6 not-prose border border-primary/10">
                                <h3 className="text-lg font-bold mb-2 mt-0 text-primary">The Math:</h3>
                                <ul className="list-none pl-0 space-y-2 mb-0 text-primary/80">
                                    <li>💉 Minimum rabies vaccination age: <strong>12 weeks</strong></li>
                                    <li>⏳ Mandatory waiting period: <strong>21 days</strong></li>
                                    <li><strong>= 15 weeks minimum age at travel</strong></li>
                                </ul>
                            </div>

                            <p>There are no exceptions for young animals — not for adoption cases, emotional reasons, or “too cute to stay behind.” If you’re moving with a puppy or kitten, your travel date must be planned around that 15-week birthday.</p>

                            <h3 className="text-2xl font-bold mt-8 mb-4">Important note on high-risk rabies countries:</h3>
                            <p>Pets entering Germany from non-listed (high-risk) countries must complete additional steps:</p>
                            <ul className="list-disc pl-5">
                                <li>Rabies vaccination</li>
                                <li>Rabies antibody blood test (≥30 days later)</li>
                                <li>A 3-month waiting period after the blood draw</li>
                            </ul>
                            <p>In practice, this usually means pets cannot enter Germany until they are around 7 months old or older.⁴⁷</p>

                            <h2 id="paperwork" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">4. Paperwork: The EU Health Certificate (Annex IV)</h2>
                            <p>If you’re arriving from a non-EU country (such as the US, UK, or Canada), you’ll need an <strong>EU Annex IV Animal Health Certificate</strong>.¹³</p>
                            <p>This certificate must:</p>
                            <ul className="list-disc pl-5">
                                <li>Be issued by your private veterinarian</li>
                                <li>Be endorsed by an official government veterinarian (USDA in the US, CFIA in Canada, APHA in the UK)</li>
                                <li>Be signed within <strong>10 days</strong> of entry into Germany</li>
                            </ul>
                            <p>It feels like a race against time — so book your international health certificate appointment well in advance.</p>

                            <h2 id="travel-type" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">5. “Non-Commercial” vs. “Commercial” Travel</h2>
                            <p>To keep the process simple (and affordable), your pet must travel <strong>within 5 days before or after your own flight</strong>.¹</p>
                            <p>This classifies the move as non-commercial. If the gap is longer, the transport is legally considered commercial, triggering significantly more paperwork, higher costs, and stricter controls.</p>

                            <div className="bg-accent/10 border border-accent/20 p-8 rounded-2xl my-12 not-prose">
                                <h2 id="restrictions" className="text-2xl font-bold text-accent mb-4 mt-0 scroll-mt-24">6. Important Additional Restrictions</h2>
                                <h3 className="text-lg font-bold text-primary mt-4 mb-2">Breed restrictions</h3>
                                <p className="text-primary/80">Germany enforces strict dog-breed regulations under both federal and state-level (Bundesland) laws.</p>
                                <p className="text-primary/80">Commonly restricted or banned breeds include:</p>
                                <ul className="list-disc pl-5 text-primary/80 mb-4">
                                    <li>Pit Bull Terrier</li>
                                    <li>American Staffordshire Terrier</li>
                                    <li>Staffordshire Bull Terrier</li>
                                    <li>Bull Terrier</li>
                                </ul>
                                <p className="text-sm italic text-primary/70">Rules vary by state, and some German states prohibit import entirely. Each state (Bundesland) has its own "List of Dangerous Dogs". Always check the specific laws of your destination state before traveling.⁵⁸</p>

                                <h3 className="text-lg font-bold text-primary mt-6 mb-2">Maximum number of pets</h3>
                                <p className="text-primary/80 mb-0">For non-commercial travel, you may bring up to <strong>five pets per person</strong>.¹</p>
                            </div>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-16 relative overflow-hidden not-prose">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold text-accent mb-4 mt-0">🏠 A Note from the Sofa</h2>
                                    <p className="text-lg leading-relaxed opacity-90">
                                        I know this feels like a lot. I spent my own move staring at these rules until my eyes blurred. But once you clear the airport and see your dog sniffing grass in a <Link to="/vets/berlin" className="text-accent hover:text-white underline">Berlin park</Link> — or your cat curling up in a sunbeam in a <Link to="/vets/frankfurt" className="text-accent hover:text-white underline">Frankfurt apartment</Link> — it will be worth it.
                                    </p>
                                    <p className="text-lg leading-relaxed opacity-90 mt-4">
                                        Germany is an incredibly pet-friendly country once you're inside the fortress. We're here to help you get through the gates.
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-white/20">
                                        <p className="font-bold mb-2">Moving soon?</p>
                                        <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors font-bold text-lg">
                                            Check our Directory of English-Speaking Vets
                                            <span>→</span>
                                        </Link>
                                    </div>
                                </div>
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
                        </div>

                        <RelatedPosts currentPath="/blog/moving-to-germany-with-pet-2025" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
