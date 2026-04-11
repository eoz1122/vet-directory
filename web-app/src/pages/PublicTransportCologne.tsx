import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

export default function PublicTransportCologne() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Public Transport with Dogs in Cologne: The KVB Guide | EnglishSpeakingVets</title>
                <meta name="description" content="Taking your dog on the U-Bahn, tram, or bus in Cologne? Here's the full KVB rules: tickets, muzzles, peak hours, and what the inspectors actually check." />
                <meta name="keywords" content="public transport dogs cologne, kvb dogs cologne, hund ubahn koln, dogs cologne tram, pet transport cologne germany" />
                <meta property="og:title" content="Public Transport with Dogs in Cologne: The KVB Guide" />
                <meta property="og:description" content="Tickets, muzzle rules, peak hours, and the best dog-friendly routes in Cologne. Everything you need to take your dog on the KVB." />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content="https://englishspeakinggermany.online/blog/public-transport-with-dogs-cologne" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/public-transport-with-dogs-cologne" />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(
                        "Public Transport with Dogs in Cologne: The KVB Guide",
                        "Taking your dog on the U-Bahn, tram, or bus in Cologne? Here's the full KVB rules: tickets, muzzles, peak hours, and what the inspectors actually check.",
                        "https://englishspeakinggermany.online/blog/public-transport-with-dogs-cologne",
                        "2026-05-05"
                    ))}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Transport Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            🚋 Public Transport with Dogs in Cologne: The KVB Guide
                        </h1>

                        <TableOfContents items={[
                            { id: 'at-a-glance', label: '1. KVB Dog Rules at a Glance' },
                            { id: 'tickets', label: '2. Tickets' },
                            { id: 'leash-muzzle', label: '3. Leash and Muzzle Rules' },
                            { id: 'timing', label: '4. When and Where to Travel' },
                            { id: 'small-dogs', label: '5. Small Dogs and Carriers' },
                            { id: 'inspectors', label: '6. KVB Inspectors and Fines' },
                            { id: 'destinations', label: '7. Dog-Friendly Destinations' },
                            { id: 'vet-trips', label: '8. Getting to the Vet' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Cologne is genuinely one of the most dog-friendly cities in Germany. The Rhine promenade, the Stadtwald, the Grungurtel parks. But getting there? That means the KVB.
                            </p>
                            <p>
                                Here's everything you need to know to take your dog on Cologne's trams, Stadtbahn, and buses. No stress, no fines, no accidentally breaking rules you didn't know existed.
                            </p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="at-a-glance" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🐶 KVB Dog Rules at a Glance</h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { icon: '✅', text: 'Dogs allowed on all KVB trams, Stadtbahn, and buses' },
                                        { icon: '🎫', text: 'Dogs need a Kinderticket or Kurzstrecke ticket' },
                                        { icon: '🦮', text: 'Dogs must be on a leash at all times' },
                                        { icon: '😷', text: 'Muzzle required for large and restricted breeds' },
                                        { icon: '🪑', text: 'Dogs cannot occupy seats - floor only' },
                                        { icon: '🆓', text: 'Small dogs in enclosed carriers travel free' },
                                    ].map(item => (
                                        <div key={item.text} className="flex items-start gap-2 bg-secondary/50 p-3 rounded-lg">
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="text-sm text-primary/80">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 id="tickets" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🎟️ 2. Tickets: What Your Dog Needs</h2>
                            <p>
                                <strong>The standard dog ticket is a <em>Kinderticket</em> (child's ticket) or a <em>Kurzstrecke</em> (short trip ticket).</strong> In practice, most KVB riders buy a short trip ticket for their dog for journeys within the inner zones.
                            </p>
                            <div className="my-6 not-prose overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-primary text-secondary">
                                            <th className="text-left p-3 font-bold rounded-tl-lg">Ticket type</th>
                                            <th className="text-left p-3 font-bold">Coverage</th>
                                            <th className="text-right p-3 font-bold rounded-tr-lg">Price (approx.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ['Kurzstrecke (short trip)', 'Up to 4 stops on U-Bahn, or short bus/tram journey', '~€2.20'],
                                            ['Kinderticket (single)', 'All zones for one journey', '~€2.10'],
                                            ['Tageskarte (day ticket)', 'Companion dogs often covered - check current tariff', '~€8.40'],
                                            ['Small dog in carrier', 'Free (counts as luggage)', 'Free'],
                                        ].map(([type, coverage, price], i) => (
                                            <tr key={type} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/50'}>
                                                <td className="p-3 border-b border-primary/5 font-bold text-primary">{type}</td>
                                                <td className="p-3 border-b border-primary/5 text-primary/70">{coverage}</td>
                                                <td className="p-3 border-b border-primary/5 text-right font-bold text-accent">{price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h2 id="leash-muzzle" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">👏 3. Leash and Muzzle Rules</h2>
                            <div className="space-y-4 not-prose">
                                <div className="bg-white p-5 rounded-xl border border-primary/10">
                                    <h3 className="font-bold text-primary mb-2">🦮 Leash</h3>
                                    <p className="text-sm text-primary/80">Required at all times. Short leash, not a long retractable lead that your dog can use to explore the carriage.</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-primary/10">
                                    <h3 className="font-bold text-primary mb-2">😷 Muzzle</h3>
                                    <p className="text-sm text-primary/80">The KVB's own rules don't mandate muzzles for all dogs, but <strong>large dogs classified as "Grohunde"</strong> (generally over 50cm at the shoulder) may be required to wear one. In practice, inspectors rarely enforce this for well-behaved dogs. If your dog is large, reactive, or anxious around other passengers, carrying a muzzle is wise and avoids any confrontation.</p>
                                    <p className="text-sm text-primary/80 mt-2">Dogs classified as <strong>restricted breeds</strong> are required to wear a muzzle in all public spaces in most German states, including public transport. See our <Link to="/blog/breed-restrictions-germany" className="text-accent underline hover:text-primary">breed restrictions guide</Link>.</p>
                                </div>
                            </div>

                            <h2 id="timing" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">⏰ 4. When and Where to Travel</h2>
                            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl my-6 not-prose">
                                <h3 className="font-bold text-yellow-800 mb-2">⏰ Rush hour: avoid 7-9am and 4-7pm</h3>
                                <p className="text-sm text-yellow-800">KVB carriages get crowded during peak commuting times, and a dog in a packed U-Bahn is uncomfortable for everyone. The U-Bahn lines under the city centre (especially the Dom/Hauptbahnhof interchange) get particularly dense.</p>
                            </div>
                            <p><strong>Best KVB options for dogs:</strong></p>
                            <div className="space-y-3 my-4 not-prose">
                                {[
                                    { route: 'Tram lines (Straenbahn)', tip: 'Generally roomier than the underground sections of the Stadtbahn and easier to board with a dog.' },
                                    { route: 'Line 16/18 towards Bonn', tip: 'Runs largely overground after leaving the city centre: spacious and dog-friendly.' },
                                    { route: 'Buses (middle or rear doors)', tip: 'Tend to have more floor space near the doors. Avoid the front door; the area near the driver is where inspectors tend to be fussier about dogs.' },
                                ].map(item => (
                                    <div key={item.route} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-primary/10">
                                        <span className="text-accent font-bold text-lg mt-0.5">✓</span>
                                        <div>
                                            <p className="font-bold text-primary text-sm">{item.route}</p>
                                            <p className="text-primary/70 text-sm">{item.tip}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 id="small-dogs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🐾 5. Small Dogs and Carriers</h2>
                            <p>
                                Small dogs that fit in a carrier travel for free and don't need their own ticket; they're treated the same as luggage. The carrier must be fully enclosed (no dog sticking their head out in a way that would alarm other passengers).
                            </p>
                            <p>
                                <strong>No carrier?</strong> Small dogs on a leash are fine, but they still need a ticket like any other dog.
                            </p>

                            <h2 id="inspectors" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🚫 6. KVB Inspectors and Fines</h2>
                            <div className="bg-red-50 border border-red-200 p-5 rounded-xl my-6 not-prose">
                                <p className="text-sm text-red-800">
                                    KVB inspectors (<em>Kontrolleure</em>) do check dog tickets, particularly on the busy inner-city lines. The fine for travelling without a valid dog ticket is the same as for a person: currently <strong>€60</strong>.
                                </p>
                                <p className="text-sm text-red-800 mt-2 font-bold">Don't chance it. A Kurzstrecke ticket is €2.20.</p>
                            </div>

                            <h2 id="destinations" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🌳 7. Dog-Friendly Destinations by KVB</h2>
                            <div className="space-y-4 my-6 not-prose">
                                {[
                                    { icon: '🌳', name: 'Stadtwald', how: 'Tram towards Mungersdorf', desc: "Cologne's largest urban forest, with off-leash meadows and forest trails. Perfect for a weekend morning." },
                                    { icon: '🌊', name: 'Rheinpark', how: 'U-Bahn to Deutz/Messe or Koln-Messe/Deutz, short walk to river', desc: 'Dogs are welcome on the grass areas along the Rhine promenade.' },
                                    { icon: '🏡', name: 'Grungurtel', how: "Multiple tram stops around the city's green belt", desc: "Cologne's famous green belt circles the city. Multiple tram stops give access to different sections, all well-suited for dogs." },
                                    { icon: '🐾', name: 'Fuhlinger See', how: 'Bus or tram plus a short walk', desc: 'Lake complex with areas where dogs can swim. Leash rules apply in some designated sections.' },
                                ].map(item => (
                                    <div key={item.name} className="bg-white p-5 rounded-xl border border-primary/10 flex items-start gap-4">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div>
                                            <h3 className="font-bold text-primary">{item.name}</h3>
                                            <p className="text-xs text-accent font-bold mt-0.5">🚋 {item.how}</p>
                                            <p className="text-sm text-primary/70 mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 id="vet-trips" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">👼 8. Getting to the Vet by Public Transport</h2>
                            <p>
                                Getting to a vet appointment by public transport in Cologne is completely doable; most practices in our <Link to="/vets/cologne" className="text-accent underline hover:text-primary">Cologne vet directory</Link> are within easy reach of KVB lines.
                            </p>
                            <div className="space-y-2 my-4 not-prose">
                                {[
                                    'Bring a carrier if your cat or small dog is stressed: enclosed carriers significantly reduce anxiety on public transport',
                                    'For post-surgery or unwell animals, a taxi is kinder than the U-Bahn, even if the dog technically can travel',
                                    'For larger dogs after surgery: support them on the floor; don\'t lift them onto seats',
                                ].map(tip => (
                                    <div key={tip} className="flex items-start gap-2 text-sm text-primary/80">
                                        <span className="text-accent mt-0.5">→</span>
                                        <span>{tip}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/vets/cologne" className="inline-flex items-center gap-2 mt-2 bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                Find a verified English-speaking vet in Cologne →
                            </Link>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-12 not-prose">
                                <h2 className="text-xl font-bold text-accent mb-3 mt-0">KVB Quick Reference</h2>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {[
                                        ['Dogs allowed', 'Yes, all trams, Stadtbahn, buses'],
                                        ['Ticket required', 'Yes, Kinderticket or Kurzstrecke'],
                                        ['Free travel', 'Only in enclosed carrier (small animals)'],
                                        ['Leash required', 'Always'],
                                        ['Muzzle required', 'Large and restricted breeds'],
                                        ['Seats', 'Dogs must stay on the floor'],
                                        ['Peak hours', 'Avoid 7-9am and 4-7pm if possible'],
                                        ['Fine for no ticket', '€60'],
                                    ].map(([label, value]) => (
                                        <div key={label} className="bg-white/10 p-3 rounded-lg">
                                            <p className="text-white/60 text-xs uppercase tracking-wider">{label}</p>
                                            <p className="font-bold text-white text-sm mt-0.5">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 not-prose mt-8">
                                <span className="text-sm text-primary/60">Other city transport guides:</span>
                                {[
                                    { city: 'Berlin', path: '/blog/public-transport-with-dogs-berlin' },
                                    { city: 'Hamburg', path: '/blog/public-transport-dogs-hamburg' },
                                    { city: 'Munich', path: '/blog/public-transport-dogs-munich-mvv' },
                                    { city: 'Frankfurt', path: '/blog/public-transport-dogs-frankfurt-rmv' },
                                    { city: 'Stuttgart', path: '/blog/public-transport-dogs-stuttgart' },
                                ].map(({ city, path }) => (
                                    <Link key={city} to={path} className="text-sm text-accent underline hover:text-primary">{city}</Link>
                                ))}
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/public-transport-with-dogs-cologne" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
