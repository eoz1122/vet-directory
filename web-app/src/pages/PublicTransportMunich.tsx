import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function PublicTransportMunich() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            <Helmet>
                <title>Public Transport with Dogs in Munich (2025 MVV Rules) | EnglishSpeakingVets</title>
                <meta name="description" content="Guide to taking dogs on public transport in Munich (MVV). 2025 rules for U-Bahn, S-Bahn, trams & buses. Ticket prices, muzzles, and Deutschlandticket info." />
                <meta name="keywords" content="dogs on public transport Munich, MVV dog rules, Munich U-Bahn with dog, Munich dog ticket cost, Deutschlandticket dog Munich" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/public-transport-with-dogs-munich-2025" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            🚇 Public Transport with Dogs in Munich: The 2025 MVV Guide
                        </h1>

                        <TableOfContents items={[
                            { id: 'ticket-rules', label: 'The Ticket: When to Pay?' },
                            { id: 'leash-muzzle', label: 'Leash & Muzzle Rules' },
                            { id: 'isarcard', label: 'IsarCard Perks' },
                            { id: 'deutschlandticket', label: 'Deutschlandticket: Dogs Ride Free' },
                            { id: 'cats-small-pets', label: 'Cats & Small Pets' },
                            { id: 'service-dogs', label: 'Service Dogs' },
                            { id: 'summary-table', label: 'Quick Summary Table (2025)' },
                            { id: 'faq', label: 'Common Questions' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Munich is the city of the "Dackel" (Dachshund), and it shows. It's arguably one of the most dog-friendly transit networks in Germany, but the "Ticket vs. Free" rules are a bit more nuanced than in the north.
                            </p>

                            <h2 id="ticket-rules" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">The Ticket: When to Pay?</h2>

                            <p>In the MVV (Munich Transport and Tariff Association) area, the rules depend on how many passengers—and dogs—you have:</p>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 my-6 space-y-4 not-prose">
                                <div>
                                    <h3 className="text-lg font-bold text-green-700 mt-0">The First Dog: FREE</h3>
                                    <p className="mb-0 text-primary/80">
                                        If you have a valid MVV ticket (single, day ticket, weekly or monthly pass, or Deutschlandticket), <strong>one dog travels for free</strong>. No additional ticket required. This applies to all U-Bahn, S-Bahn, trams, and buses within the MVV network.
                                    </p>
                                </div>
                                <div className="border-t border-gray-100 pt-4">
                                    <h3 className="text-lg font-bold text-primary mt-0">Additional Dogs: Children's Ticket</h3>
                                    <p className="mb-0 text-primary/80">
                                        If you're traveling with more than one dog, every extra dog requires a <strong>children's ticket</strong> (Kinderfahrkarte). This is roughly half the price of an adult ticket.
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mt-6 mb-2">Quick Breakdown:</h3>
                            <div className="overflow-x-auto not-prose">
                                <table className="w-full text-left border-collapse bg-white rounded-lg shadow-sm border border-primary/10">
                                    <thead>
                                        <tr className="bg-primary/5">
                                            <th className="p-3 border border-primary/10">Situation</th>
                                            <th className="p-3 border border-primary/10">Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr>
                                            <td className="p-3 border border-primary/10 text-primary/80">You + 1 dog</td>
                                            <td className="p-3 border border-primary/10 font-bold text-green-700">FREE (with your ticket)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-primary/10 text-primary/80">You + 2 dogs</td>
                                            <td className="p-3 border border-primary/10 text-primary/80">1 children's ticket</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-primary/10 text-primary/80">You + 3 dogs</td>
                                            <td className="p-3 border border-primary/10 text-primary/80">2 children's tickets</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-primary/10 text-primary/80">Small pet in carrier</td>
                                            <td className="p-3 border border-primary/10 font-bold text-green-700">FREE</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="bg-accent/10 p-4 rounded-lg text-sm mt-4 text-primary/80 not-prose">
                                <strong>Pro tip:</strong> If you're traveling with multiple dogs regularly, consider a monthly or weekly pass. Your first dog always rides free, and you only need children's tickets for additional dogs.
                            </p>

                            <h2 id="leash-muzzle" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Leash & Muzzle: A "Risk-Based" Rule</h2>

                            <p>In Munich, the rule is technically "risk-based." While small, calm dogs are rarely bothered, MVV regulations state that dogs must wear a muzzle in vehicles and stations if they pose a potential risk.</p>

                            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                                <div className="bg-white p-6 rounded-xl border-l-4 border-yellow-500">
                                    <h3 className="text-lg font-bold mt-0 mb-2 text-primary">The Muzzle Rule</h3>
                                    <ul className="list-disc pl-5 text-sm space-y-2 mb-0 text-primary/80">
                                        <li><strong>Large dogs:</strong> Generally expected to wear muzzles (Shepherds, Rottweilers, etc.)</li>
                                        <li><strong>Rush hour:</strong> Inspectors may ask for muzzles on crowded trains</li>
                                        <li><strong>Small/Calm dogs:</strong> Rarely asked, but you should still carry one</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl border-l-4 border-red-500">
                                    <h3 className="text-lg font-bold mt-0 mb-2 text-primary">Strict Requirements</h3>
                                    <ul className="list-disc pl-5 text-sm space-y-2 mb-0 text-primary/80">
                                        <li><strong>Leash:</strong> Mandatory at all times in stations and vehicles. No exceptions.</li>
                                        <li><strong>Dangerous Breeds:</strong> "Attack dogs" (Kampfhunde) are <strong>not allowed</strong> on public transport at all.</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="bg-primary/5 p-4 rounded-lg text-sm text-primary/80 not-prose">
                                <strong>Bottom line:</strong> Always carry a muzzle with you. If an inspector or driver asks, you must put it on immediately. Refusal can result in being asked to leave the vehicle.
                            </p>

                            <h2 id="isarcard" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">The "IsarCard" Perk</h2>

                            <p>If you have a weekly or monthly <strong>IsarCard</strong> (MVV's subscription ticket), you get an extra bonus: <strong>one dog travels free at any time</strong>.</p>

                            <ul className="list-disc pl-5 space-y-2 text-primary/80">
                                <li><strong>IsarCard (weekly/monthly):</strong> Unlimited travel in your zones.</li>
                                <li><strong>IsarCard9Uhr:</strong> Discounted option. <strong>Important:</strong> Dog is only free after 9am on weekdays (anytime weekends).</li>
                                <li><strong>IsarCardJob:</strong> Annual subscription for commuters.</li>
                            </ul>

                            <h2 id="deutschlandticket" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Deutschlandticket: Dogs Ride Free Too</h2>

                            <div className="bg-secondary/20 p-6 rounded-2xl border border-secondary my-6 not-prose">
                                <h3 className="text-xl font-bold text-primary mt-0">The Deutschlandticket Deal</h3>
                                <p className="mb-4 text-primary/80">
                                    If you have the <strong>Deutschlandticket</strong> (€58/month as of Dec 2025, rising to €63 in 2026), your dog travels free throughout the entire MVV network.
                                </p>
                                <p className="text-sm italic mb-0 text-primary/70">
                                    <strong>Note:</strong> While the MVV allows one dog free with the Deutschlandticket, this is a local Munich rule. If you travel to Hamburg or Berlin, their local rules may differ (often requiring a ticket for the dog).
                                </p>
                            </div>

                            <h2 id="cats-small-pets" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Cats and Other Small Pets</h2>
                            <p>
                                Cats, rabbits, guinea pigs, and birds travel <strong>free of charge</strong> as long as they are in a closed carrier or bag. They are considered "hand luggage."
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-primary/80">
                                <li>Use a sturdy, well-ventilated carrier</li>
                                <li>Keep the carrier on your lap or at your feet—never on a seat</li>
                                <li>Cover with a light blanket to reduce stress</li>
                            </ul>

                            <h2 id="service-dogs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">What About Service Dogs?</h2>
                            <p>
                                Service dogs and guide dogs for the blind are <strong>always allowed</strong> free of charge, with no muzzle or ticket requirements. You may be asked to show documentation.
                            </p>

                            <h2 id="summary-table" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🐾 Quick Summary Table (2025)</h2>
                            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-primary/10 p-4 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-primary/10">
                                            <th className="p-3 font-bold text-primary">Category</th>
                                            <th className="p-3 font-bold text-primary">Rule</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">First Dog</td>
                                            <td className="p-3 text-sm text-primary/80">FREE (with any valid ticket)</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Additional Dogs</td>
                                            <td className="p-3 text-sm text-primary/80">Children's Ticket (Kinderkarte)</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Small Pets</td>
                                            <td className="p-3 text-sm text-green-700 font-bold">FREE (in carrier)</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Leash</td>
                                            <td className="p-3 text-sm text-primary/80">Mandatory for all dogs at all times</td>
                                        </tr>
                                        <tr className="border-b border-primary/5">
                                            <td className="p-3 text-sm font-semibold text-primary/80">Muzzle</td>
                                            <td className="p-3 text-sm text-primary/80">Mandatory for "risk" dogs; always carry one</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 text-sm font-semibold text-primary/80">Deutschlandticket</td>
                                            <td className="p-3 text-sm text-primary/80">One dog free within MVV network</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 id="faq" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Common Questions</h2>
                            <div className="space-y-6 not-prose">
                                <div>
                                    <h3 className="text-lg font-bold text-primary mb-2">Can I take my dog on the bus?</h3>
                                    <p className="text-primary/80">Yes! The same rules apply as for U-Bahn and S-Bahn. One dog free with your ticket.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-primary mb-2">Can I take my dog on the MVV Bergbus?</h3>
                                    <p className="text-primary/80">Yes! The Bergbus allows dogs. If you have a Deutschlandticket, they travel free.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-primary mb-2">What about night buses?</h3>
                                    <p className="text-primary/80">Same rules. Your first dog travels free with your valid ticket.</p>
                                </div>
                            </div>

                            <div className="bg-[#1B4332] text-[#F5EBE0] p-8 rounded-2xl my-16 relative overflow-hidden not-prose">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold text-accent mb-4 mt-0">The Bottom Line</h2>
                                    <p className="text-lg leading-relaxed opacity-90">
                                        Munich is incredibly dog-friendly. With your first dog riding free on any valid ticket and relaxed enforcement for calm dogs, getting around is stress-free. Just remember to always carry a muzzle and avoid rush hour when you can!
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-[#F5EBE0]/20">
                                        <p className="font-bold mb-2">Need a vet in Munich?</p>
                                        <Link to="/vets/munich" className="inline-block px-6 py-2 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-colors">
                                            Browse Munich Vets
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <section className="text-sm text-primary/60 mt-12 not-prose">
                                <h3 className="font-bold text-primary mb-4 text-base">📚 Official Sources</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><a href="https://www.mvv-muenchen.de/en" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">MVV Munich Official Website</a></li>
                                    <li><a href="https://www.muenchen.de" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">Muenchen.de - City Portal</a></li>
                                </ul>
                            </section>
                        </div>

                        <RelatedPosts currentPath="/blog/public-transport-with-dogs-munich-2025" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
