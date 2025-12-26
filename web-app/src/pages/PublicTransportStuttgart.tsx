import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function PublicTransportStuttgart() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Public Transport with Dogs in Stuttgart (2025 VVS Guide) | EnglishSpeakingVets</title>
                <meta name="description" content="Guide to taking dogs on public transport in Stuttgart (VVS). 2025 rules for U-Bahn, S-Bahn, trams & buses. Ticket prices, muzzles, and Deutschlandticket info." />
                <meta name="keywords" content="dogs on public transport Stuttgart, VVS dog rules, Stuttgart U-Bahn with dog, Stuttgart dog ticket cost, Deutschlandticket dog Stuttgart" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/public-transport-with-dogs-stuttgart-2025" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            🚇 Public Transport with Dogs in Stuttgart: The 2025 VVS Guide
                        </h1>

                        <TableOfContents items={[
                            { id: 'ticket-rules', label: 'The Ticket: Dogs Need Children\'s Tickets' },
                            { id: 'ticket-prices', label: 'Ticket Prices (2025)' },
                            { id: 'deutschlandticket', label: 'Deutschlandticket: The Stuttgart Bonus' },
                            { id: 'leash-muzzle', label: 'Leash & Muzzle Requirements' },
                            { id: 'small-pets', label: 'Cats & Small Pets' },
                            { id: 'practical-tips', label: 'Practical Tips' },
                            { id: 'summary-table', label: 'Quick Summary Table (2025)' },
                            { id: 'faq', label: 'Common Questions' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Stuttgart is a green, dog-friendly city where seeing a well-behaved German Shepherd on the U-Bahn or a Dachshund riding the bus is completely normal. The VVS (Verkehrs- und Tarifverbund Stuttgart) makes traveling with dogs straightforward—but there's one key difference from other German cities that catches many expats off guard.
                            </p>

                            <h2 id="ticket-rules" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">The Ticket: Dogs Need Children's Tickets</h2>
                            <p>Unlike Munich (where the first dog travels free) or Hamburg (where all dogs travel free), <strong>Stuttgart requires a children's ticket for every dog</strong> traveling on public transport.</p>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 my-6 not-prose">
                                <h3 className="text-lg font-bold text-primary mt-0">Children's Ticket (Kinderfahrkarte):</h3>
                                <ul className="list-disc pl-5 mt-2 mb-0 text-primary/80">
                                    <li>Costs roughly half the price of an adult ticket</li>
                                    <li>Required for all dogs, regardless of size (unless they're in a carrier)</li>
                                    <li>Valid on all VVS transport: U-Bahn, S-Bahn, trams, and buses</li>
                                </ul>
                            </div>

                            <h3 className="text-lg font-bold mt-6 mb-2">Special Cases:</h3>

                            <div className="grid md:grid-cols-2 gap-6 mb-8 not-prose">
                                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                                    <h4 className="font-bold text-primary mt-0">Small Pets in Carriers: FREE</h4>
                                    <p className="text-sm text-primary/80 mb-0">
                                        Small pets (cats, rabbits, small dogs) in closed carriers or bags are considered "hand luggage" and travel for free.
                                    </p>
                                </div>
                                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                                    <h4 className="font-bold text-primary mt-0">Service Dogs: FREE</h4>
                                    <p className="text-sm text-primary/80 mb-0">
                                        Guide dogs for the blind, police dogs, and official service dogs travel free and are exempt from ticket/muzzle rules.
                                    </p>
                                </div>
                            </div>

                            <p className="bg-accent/10 p-4 rounded-lg text-sm mb-8 text-primary/80 not-prose">
                                <strong>Group Day Ticket Perk:</strong> If you're traveling with a Group Day Ticket (Gruppentageskarte), your dog counts as one of the five passengers allowed. This is a great deal for groups!
                            </p>

                            <h2 id="ticket-prices" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Ticket Prices (Updated for 2025)</h2>
                            <p>Prices were adjusted in January 2025. Here is the breakdown for <strong>Zone 1 (Stuttgart City Center)</strong>:</p>

                            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-primary/10 p-4 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-primary/10">
                                            <th className="p-3 font-bold text-primary bg-primary/5">Ticket Type</th>
                                            <th className="p-3 font-bold text-primary bg-primary/5">Adult Price</th>
                                            <th className="p-3 font-bold text-primary bg-primary/5">Dog (Child) Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                            <td className="p-3 font-medium text-primary/80">Single Trip (Einzelfahrkarte)</td>
                                            <td className="p-3 text-primary/70">€3.50</td>
                                            <td className="p-3 font-bold text-accent">€1.70</td>
                                        </tr>
                                        <tr className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                            <td className="p-3 font-medium text-primary/80">Short Trip (Kurzstrecke)</td>
                                            <td className="p-3 text-primary/70">€1.90</td>
                                            <td className="p-3 font-bold text-accent">€1.40</td>
                                        </tr>
                                        <tr className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                            <td className="p-3 font-medium text-primary/80">4-Trip Ticket (4er-Karte)</td>
                                            <td className="p-3 text-primary/70">€13.40</td>
                                            <td className="p-3 font-bold text-accent">€6.40</td>
                                        </tr>
                                        <tr className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                            <td className="p-3 font-medium text-primary/80">Single Day Ticket</td>
                                            <td className="p-3 text-primary/70">€7.70</td>
                                            <td className="p-3 font-bold text-accent">€3.80</td>
                                        </tr>
                                        <tr className="hover:bg-primary/5 transition-colors">
                                            <td className="p-3 font-medium text-primary/80">Group Day Ticket</td>
                                            <td className="p-3 text-primary/70">€14.30*</td>
                                            <td className="p-3 font-bold text-accent">*Dog counts as 1 person</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-primary/60 mt-2 italic not-prose">
                                *Note: The Group Day Ticket is cheaper (€13.40) if purchased via the VVS or SSB app.
                            </p>

                            <h2 id="deutschlandticket" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Deutschlandticket: The Stuttgart Bonus</h2>

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <h3 className="text-xl font-bold text-primary mt-0 mb-3">Important: The local exemption</h3>
                                <p className="mb-4 text-primary/80">
                                    If you have a <strong>Deutschlandticket</strong> (€58/month in 2025), traveling with your dog in Stuttgart has a very specific "local vs. visitor" rule:
                                </p>
                                <ul className="list-disc pl-5 mb-4 text-primary/80">
                                    <li><strong>Within VVS Network:</strong> You can take <strong>one dog free of charge</strong>. No extra ticket needed.</li>
                                    <li><strong>Outside VVS Network:</strong> If you travel to Ulm, Karlsruhe, or other regions, local rules apply. You may need to buy a ticket once you cross the network boundary.</li>
                                </ul>
                            </div>

                            <h2 id="leash-muzzle" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Leash & Muzzle Requirements</h2>

                            <div className="space-y-4 not-prose">
                                <div className="bg-white p-6 rounded-xl border-l-4 border-accent">
                                    <h3 className="text-lg font-bold mt-0 mb-2 text-primary">Leash: Mandatory</h3>
                                    <p className="mb-0 text-primary/80">
                                        Mandatory at all times in vehicles and stations. No exceptions. Even the calmest dog must be on a leash.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border-l-4 border-primary">
                                    <h3 className="text-lg font-bold mt-0 mb-2 text-primary">Muzzle: "Risk-Based"</h3>
                                    <p className="mb-2 text-primary/80">Stuttgart does not have a blanket muzzle requirement, but they are mandatory for:</p>
                                    <ul className="list-disc pl-5 text-sm mb-0 text-primary/80">
                                        <li><strong>Dangerous Breeds:</strong> Pit Bull, AmStaff, Bull Terrier, etc.</li>
                                        <li><strong>Aggressive Dogs:</strong> Any dog with a history of aggression.</li>
                                        <li><strong>On Request:</strong> If staff or passengers ask you to use one.</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 id="small-pets" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Cats and Other Small Pets</h2>
                            <p>
                                Cats, rabbits, guinea pigs, and birds travel <strong>free of charge</strong> in closed carriers or bags.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-primary/80">
                                <li>Use a sturdy, well-ventilated carrier</li>
                                <li>Keep it on your lap or at your feet—never on a seat</li>
                                <li>Line with absorbent pads for accidents</li>
                            </ul>

                            <h2 id="practical-tips" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Practical Tips</h2>

                            <div className="grid md:grid-cols-2 gap-6 not-prose">
                                <div className="bg-white p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-primary mb-2">1. Avoid Rush Hour</h4>
                                    <p className="text-sm mb-0 text-primary/80">Trains between 7-9am and 5-7pm are packed. It stresses everyone out.</p>
                                </div>
                                <div className="bg-white p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-primary mb-2">2. Use the Apps</h4>
                                    <p className="text-sm mb-0 text-primary/80">Use VVS Mobil or SSB Move to buy tickets. It's cheaper and easier than machines.</p>
                                </div>
                                <div className="bg-white p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-primary mb-2">3. Monthly Dog Pass</h4>
                                    <p className="text-sm mb-0 text-primary/80">If you commute daily, buy a monthly children's ticket (~€60). It saves a fortune.</p>
                                </div>
                                <div className="bg-white p-5 rounded-lg shadow-sm">
                                    <h4 className="font-bold text-primary mb-2">4. Bring Water</h4>
                                    <p className="text-sm mb-0 text-primary/80">Stuttgart summers are hot. Always bring a collapsible bowl and water.</p>
                                </div>
                            </div>

                            <h2 id="summary-table" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🐾 Quick Summary Table (2025)</h2>
                            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-primary/10 p-4 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-primary/10">
                                            <th className="p-3 font-bold text-primary">Category</th>
                                            <th className="p-3 font-bold text-primary">Rule</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Dog Ticket</td>
                                            <td className="p-3 text-sm text-primary/80">Children's ticket required (unless in carrier/Deutschlandticket)</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Small Pets</td>
                                            <td className="p-3 text-sm text-green-700 font-bold">FREE (in carrier)</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Service Dogs</td>
                                            <td className="p-3 text-sm text-green-700 font-bold">FREE</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Leash</td>
                                            <td className="p-3 text-sm text-primary/80">Mandatory</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Muzzle</td>
                                            <td className="p-3 text-sm text-primary/80">Required for "dangerous" breeds; carry one just in case</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 text-sm font-semibold text-primary/80">Deutschlandticket</td>
                                            <td className="p-3 text-sm text-green-700 font-bold">One dog free (VVS network only)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 id="faq" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Common Questions</h2>
                            <div className="space-y-6 not-prose">
                                <div>
                                    <h3 className="text-lg font-bold text-primary mb-2">Can I take my dog on the bus?</h3>
                                    <p className="text-primary/80">Yes! Same rules as trains. You need a children's ticket and a leash.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-primary mb-2">Can I take my dog on the Zacke (cog railway)?</h3>
                                    <p className="text-primary/80">Yes! The Zacke allows dogs with a children's ticket.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-primary mb-2">What about the Seilbahn?</h3>
                                    <p className="text-primary/80">Yes, on a leash and with a ticket.</p>
                                </div>
                            </div>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-16 relative overflow-hidden not-prose">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold text-accent mb-4 mt-0">The Bottom Line</h2>
                                    <p className="text-lg leading-relaxed opacity-90">
                                        Stuttgart is wonderfully dog-friendly, though you'll need to budget for those tickets. Pro tip: Always use the app to buy tickets—it's cheaper and easier!
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-white/20">
                                        <p className="font-bold mb-2">Need a vet in Stuttgart?</p>
                                        <Link to="/vets/stuttgart" className="inline-block px-6 py-2 bg-accent text-primary font-bold rounded-lg hover:bg-secondary hover:text-accent transition-colors">
                                            Browse Stuttgart Vets
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/public-transport-with-dogs-stuttgart-2025" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
