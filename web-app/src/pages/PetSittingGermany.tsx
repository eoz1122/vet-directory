import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';

export default function PetSittingGermany() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            <Helmet>
                <title>Pet Sitting in Germany (2025): Finding Safe Care | EnglishSpeakingVets</title>
                <meta name="description" content="The 2025 Expat Guide to Pet Sitting in Germany. Comparing platforms like Pawshake vs. Pensions vs. Community Swaps. Costs, insurance, and legal rules." />
                <meta name="keywords" content="pet sitting Germany, dog boarding Germany, cat sitting Berlin Munich Frankfurt, Pawshake Germany, Rover Germany reviews, dog hotel prices Germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/pet-sitting-germany-2025" />
            </Helmet>

            <Header />

            <main className="max-w-3xl mx-auto p-6 md:p-12">
                <article className="prose prose-stone prose-lg max-w-none text-primary/90">
                    <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                        🏠 Pet Sitting in Germany (2025): Finding a Safe Home for Your Little Friends
                    </h1>

                    <TableOfContents items={[
                        { id: 'options', label: '1. The Three Ways to Settle Your Pet' },
                        { id: 'costs', label: '2. What Does Pet Sitting Cost?' },
                        { id: 'legal', label: '3. Legal & Insurance (Don\'t Skip)' },
                        { id: 'choosing', label: '4. How to Choose the Right Sitter' },
                        { id: 'checklist', label: '5. The Ultimate Checklist' },
                        { id: 'cities', label: '6. City-Specific Realities' },
                        { id: 'emotional', label: '7. Preparing Your Pet Emotionally' }
                    ]} />

                    <p className="lead text-xl italic text-primary/70 mb-8 border-l-4 border-accent pl-4">
                        You’ve finally booked that long-awaited trip home. Or maybe a spontaneous weekend in the Alps. The suitcase is out, the to-do list is shrinking… and then you feel it. Those big eyes. Watching you from the sofa. Judging you. Just a little.
                    </p>

                    <p>
                        For expats in Germany, finding trustworthy pet care is often more stressful than booking the trip itself. You’re not just leaving a pet — you’re leaving your routine, your language safety net, and your peace of mind behind.
                    </p>

                    <p>
                        The good news? Germany has one of the strongest, most structured pet-sitting ecosystems in Europe. Whether you want a professional setup, a vetted platform, or a community-based exchange, there is a safe solution for your little friend.
                    </p>

                    <h2 id="options" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">1. The Three Ways to Settle Your Pet</h2>
                    <p>There’s no single “best” option — only the one that fits your pet’s personality.</p>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 my-6">
                        <h3 className="text-lg font-bold text-green-700 mt-0">🟢 Option A: Digital Platforms (Best for Reliability & Reviews)</h3>
                        <p>In 2025, several platforms dominate the German pet-sitting market. Their biggest advantage: structure. Profiles, reviews, identity checks, messaging, and often insurance.</p>

                        <h4 className="font-bold text-sm uppercase text-primary/60 mt-4">The Big, International Names</h4>
                        <ul className="list-disc pl-5 mt-2">
                            <li><strong>Pawshake</strong></li>
                            <li><strong>Rover</strong></li>
                        </ul>
                        <p className="text-sm">Widely used by expats and locals. Good for dog boarding, house sitting, and drop-in visits.</p>

                        <h4 className="font-bold text-sm uppercase text-primary/60 mt-4">German-First Platforms</h4>
                        <ul className="list-disc pl-5 mt-2">
                            <li><strong>Tierio</strong></li>
                            <li><strong>Tiersitter24</strong></li>
                        </ul>
                        <p className="text-sm">Higher density in smaller cities, but often prefer German communication.</p>

                        <p className="bg-yellow-50 p-4 rounded-lg text-sm mt-4 border border-yellow-100">
                            <strong>💡 Reality check:</strong> Even on platforms, always do a meet-and-greet. Germans expect this — skipping it is a red flag.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 my-6">
                        <h3 className="text-lg font-bold text-yellow-600 mt-0">🟡 Option B: Professional Pet Pensions (Best for Social Dogs)</h3>
                        <p>A <em>Hundepension</em> (dog hotel) or <em>Tierpension</em> is a licensed business where animals stay overnight.</p>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <h4 className="font-bold text-sm">Pros</h4>
                                <ul className="text-sm list-disc pl-5">
                                    <li>Professional staff</li>
                                    <li>Clear rules</li>
                                    <li>Insured business</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Cons</h4>
                                <ul className="text-sm list-disc pl-5">
                                    <li>Can be noisy</li>
                                    <li>Less one-on-one time</li>
                                    <li>Unsuitable for anxious pets</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-sm mt-4"><strong>Typical prices (2025):</strong> €30–€50 per night.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 my-6">
                        <h3 className="text-lg font-bold text-blue-600 mt-0">🔵 Option C: Community Swaps (The Heart of Our Site)</h3>
                        <p>You watch someone’s cat in June. They watch yours in August. No money changes hands. Just trust.</p>
                        <p>This works well in Germany due to strong neighborhood culture and housing stability. Look for swaps in expat WhatsApp groups, building notice boards, or dog parks.</p>
                    </div>

                    <h2 id="costs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">2. What Does Pet Sitting Cost in Germany (2025)?</h2>
                    <p>Prices vary by city, but these are realistic national benchmarks.</p>

                    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-primary/10 p-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-primary/10">
                                    <th className="p-3 font-bold text-primary bg-primary/5">Service</th>
                                    <th className="p-3 font-bold text-primary bg-primary/5">Est. Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-primary/5"><td className="p-3 font-bold text-primary/80" colSpan={2}>🐕 Dogs</td></tr>
                                <tr className="border-b border-primary/5">
                                    <td className="p-3">Dog walking (60 min)</td>
                                    <td className="p-3 font-bold text-accent">€15–€25</td>
                                </tr>
                                <tr className="border-b border-primary/5">
                                    <td className="p-3">Day care</td>
                                    <td className="p-3 font-bold text-accent">€20–€35</td>
                                </tr>
                                <tr className="border-b border-primary/5">
                                    <td className="p-3">Overnight boarding</td>
                                    <td className="p-3 font-bold text-accent">€30–€50</td>
                                </tr>
                                <tr className="border-b border-primary/5"><td className="p-3 font-bold text-primary/80" colSpan={2}>🐈 Cats</td></tr>
                                <tr className="border-b border-primary/5">
                                    <td className="p-3">Drop-in visit (once daily)</td>
                                    <td className="p-3 font-bold text-accent">€15–€22</td>
                                </tr>
                                <tr className="border-b border-primary/5">
                                    <td className="p-3">Holiday care (twice daily)</td>
                                    <td className="p-3 font-bold text-accent">€20–€30</td>
                                </tr>
                                <tr className="border-b border-primary/5"><td className="p-3 font-bold text-primary/80" colSpan={2}>🏠 House Sitting</td></tr>
                                <tr>
                                    <td className="p-3">Overnight house sitting</td>
                                    <td className="p-3 font-bold text-accent">€30–€60</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm mt-3 italic text-primary/60">💡 German quirk: Prices are usually per visit, not per task. Asking for "just one more thing" is fine — but communicate clearly upfront.</p>

                    <h2 id="legal" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">3. The Legal & Insurance Side (Don’t Skip This)</h2>

                    <div className="space-y-4">
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <h3 className="text-lg font-bold text-red-900 mt-0">🛡️ Liability Insurance (Haftpflicht)</h3>
                            <p className="text-red-900/80 mb-2">This is non-negotiable. Most platforms include it, but for private sitters, verify:</p>
                            <ul className="list-disc pl-5 text-sm text-red-900/80">
                                <li>Does their insurance cover animals?</li>
                                <li>Does <em>your</em> Hundehaftpflicht allow "Fremdhüter" (third-party handlers)?</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="text-lg font-bold text-blue-900 mt-0">🧾 The "Mini-Job" Awareness</h3>
                            <p className="text-blue-900/80 text-sm">
                                Use a platform to avoid complexity. If you hire someone directly for regular work (e.g. daily walker) and pay &gt;€556/month, you theoretically need to register it as a Mini-Job. Casual holiday sitting is usually exempt.
                            </p>
                        </div>
                    </div>

                    <h2 id="choosing" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">4. How to Choose the Right Sitter</h2>
                    <p>German culture values reliability over charm.</p>

                    <div className="grid md:grid-cols-2 gap-6 my-6">
                        <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                            <h4 className="font-bold text-green-800 mb-2">✅ Ask These Questions</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>Have you cared for this breed before?</li>
                                <li>Do you have other animals?</li>
                                <li>How do you handle emergencies?</li>
                                <li>Are you comfortable visiting the vet?</li>
                            </ul>
                        </div>
                        <div className="bg-red-50 p-5 rounded-lg border border-red-100">
                            <h4 className="font-bold text-red-800 mb-2">🚩 Red Flags</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>Refuses a meet-and-greet</li>
                                <li>Won’t share ID or insurance info</li>
                                <li>Overbooks multiple pets</li>
                                <li>Downplays your routine</li>
                            </ul>
                        </div>
                    </div>

                    <h2 id="checklist" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">5. The Ultimate Checklist</h2>
                    <p>Think of this as a "Pet Passport for the Week."</p>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">📞</span>
                            <div>
                                <strong>Emergency & Admin:</strong> Your contact, backup contact, and <Link to="/" className="text-accent underline">Your Vet's Number</Link>.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">🍽️</span>
                            <div>
                                <strong>Food & Routine:</strong> Exact amounts (grams matter!), treat rules, walk schedule.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">📄</span>
                            <div>
                                <strong>Documents:</strong> <Link to="/blog/eu-pet-passport-germany-2025" className="text-accent underline">EU Pet Passport</Link>, insurance info, microchip number.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">🐾</span>
                            <div>
                                <strong>Personality:</strong> Fear triggers, doorbell reactions, hiding spots, comfort items.
                            </div>
                        </li>
                    </ul>

                    <h2 id="cities" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">6. City-Specific Pet Sitting Realities</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-primary/5">
                            <h4 className="font-bold mb-2">🐕 Berlin</h4>
                            <ul className="text-sm list-disc pl-4">
                                <li>Huge supply of sitters</li>
                                <li>High holiday competition</li>
                                <li>Dog parks = networking</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-primary/5">
                            <h4 className="font-bold mb-2">🐈 Munich</h4>
                            <ul className="text-sm list-disc pl-4">
                                <li>More expensive</li>
                                <li>Preference for pros</li>
                                <li>Great cat-only options</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-primary/5">
                            <h4 className="font-bold mb-2">🐕 Frankfurt</h4>
                            <ul className="text-sm list-disc pl-4">
                                <li>Commuters → house sitting</li>
                                <li>Short trips common</li>
                                <li>Reliability valued</li>
                            </ul>
                        </div>
                    </div>

                    <h2 id="emotional" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">7. Preparing Your Pet Emotionally</h2>
                    <p>A sitter isn’t just logistics — it’s a routine disruption.</p>
                    <ul className="list-disc pl-5">
                        <li><strong>Before:</strong> Do a trial visit. Leave worn clothing (smell matters). Don't over-dramatize the goodbye.</li>
                        <li><strong>During:</strong> Ask for photo updates. Avoid micromanaging. A calm owner = calmer pet.</li>
                    </ul>

                    <div className="bg-[#1B4332] text-[#F5EBE0] p-8 rounded-2xl my-16 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-accent mb-4 mt-0">A Note from the Sofa</h2>
                            <p className="text-lg leading-relaxed opacity-90">
                                Leaving your pet is never easy. But finding the right sitter changes everything. Germany is full of people who take animal care seriously. A happy sitter equals a happy pet. And a happy pet means you can finally enjoy that coffee on the mountain without guilt.
                            </p>
                            <div className="mt-8 pt-6 border-t border-[#F5EBE0]/20">
                                <p className="font-bold mb-2">Need a vet while you're away?</p>
                                <Link to="/" className="inline-block px-6 py-2 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-colors">
                                    Find a Vet Near You
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                <RelatedPosts currentPath="/blog/pet-sitting-germany-2025" />
            </main>

            <Footer />
        </div>
    );
}
