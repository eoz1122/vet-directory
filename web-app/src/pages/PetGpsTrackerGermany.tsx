import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { trackAffiliateClick } from '../utils/analytics';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "GPS Trackers for Cats & Dogs in Germany: An Honest Comparison";
const DESCRIPTION = "Tractive vs Kippy vs AirTag for pets in Germany: real subscription costs, battery life, what works for outdoor cats, and the safety rules (breakaway collars, weight limits) nobody mentions.";
const URL = "https://englishspeakinggermany.online/blog/pet-gps-tracker-germany";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do pet GPS trackers need a subscription in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Real GPS trackers do: they contain a SIM card and use the mobile network, so Tractive and Kippy both charge roughly 3.50 to 10 EUR per month depending on plan length. An Apple AirTag has no subscription because it is not GPS - it relies on passing iPhones, which works in a city center and fails in a field."
            }
        },
        {
            "@type": "Question",
            "name": "Is an AirTag good enough for a cat?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "As a cheap backup in a dense city, it helps. As a primary tracker, no: there is no live tracking, updates depend entirely on strangers' iPhones passing nearby, and Apple itself says AirTags are not designed for pets. If your cat roams gardens, parks, or anywhere semi-rural, a real GPS tracker is the tool for the job."
            }
        },
        {
            "@type": "Question",
            "name": "Are GPS trackers safe for cats to wear?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Only with a breakaway (Sicherheitsverschluss) collar that opens under force, so the cat cannot get snagged on a branch. Keep total collar weight low - trackers around 25 to 40 grams are the practical range for cats. And a tracker never replaces the microchip plus TASSO registration; it complements them."
            }
        },
        {
            "@type": "Question",
            "name": "Is it legal to GPS-track my pet in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Tracking your own animal is unproblematic under German law. The privacy rules that apply to tracking people do not apply to your cat. Just avoid trackers with an always-on microphone if you take data protection seriously, since recording third parties can raise legal issues."
            }
        }
    ]
};

export default function PetGpsTrackerGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="GPS tracker cat Germany, GPS tracker dog Germany, Tractive vs Kippy, AirTag cat, pet tracker subscription Germany, outdoor cat tracker" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(TITLE, DESCRIPTION, URL, "2026-07-16"))}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">Safety Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            📡 GPS Trackers for Pets in Germany
                        </h1>

                        <TableOfContents items={[
                            { id: 'why', label: 'Why Expat Pets Get Lost More' },
                            { id: 'how-they-work', label: 'GPS vs AirTag: Know the Difference' },
                            { id: 'comparison', label: 'The Comparison Table' },
                            { id: 'cats', label: 'The Outdoor Cat Question' },
                            { id: 'safety', label: 'Safety Rules Nobody Mentions' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                A pet that just moved to Germany does not know the neighborhood, the smells, or the way home yet. The first months after a relocation are statistically when cats and dogs go missing, which makes a tracker most valuable exactly when everything else about your move is also chaos.
                            </p>

                            <h2 id="why" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">Why Expat Pets Get Lost More</h2>
                            <p>
                                Relocated pets lack the mental map local animals build over years. A startled cat in a new Kiez bolts without knowing how to return; a dog slips a leash in an unfamiliar park. Before any gadget, two non-negotiables: the <strong>microchip must be registered with TASSO</strong> (free, and what actually gets a found pet home; our <Link to="/blog/cat-registration-germany" className="text-accent-ink font-bold hover:underline">registration guide</Link> explains it) and new arrivals should see our <Link to="/blog/new-pet-checklist-germany" className="text-accent-ink font-bold hover:underline">first-30-days checklist</Link>. A tracker is the third layer, the only one that works <em>before</em> someone else finds your pet.
                            </p>

                            <h2 id="how-they-work" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">GPS vs AirTag: Know the Difference</h2>
                            <p>
                                Real GPS trackers (Tractive, Kippy) contain a SIM card, report live position over the mobile network, and therefore cost a monthly subscription. An <strong>AirTag is not a GPS tracker</strong>: it has no live tracking and only reports position when a stranger's iPhone happens to pass within Bluetooth range. In central Berlin that can work surprisingly well; in a Brandenburg field it is silence. Apple itself states AirTags are not designed for pets.
                            </p>

                            <h2 id="comparison" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Comparison Table</h2>
                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Tracker</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Device / monthly</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Battery</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Best for</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Tractive Dog 6</td>
                                            <td className="p-4 text-primary/70">~70 EUR / from ~5 EUR</td>
                                            <td className="p-4 text-primary/70">up to 14 days</td>
                                            <td className="p-4 text-primary/70 text-sm">Dogs; the German-market leader with the most mature app</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Tractive Cat Mini</td>
                                            <td className="p-4 text-primary/70">~60 EUR / from ~5 EUR</td>
                                            <td className="p-4 text-primary/70">up to 7 days</td>
                                            <td className="p-4 text-primary/70 text-sm">Cats; at ~25g the lightest full-GPS option</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Kippy EVO</td>
                                            <td className="p-4 text-primary/70">~50 EUR / from ~3.30 EUR</td>
                                            <td className="p-4 text-primary/70">~10 days</td>
                                            <td className="p-4 text-primary/70 text-sm">Cats and dogs over 4kg; waterproof, adds activity tracking, cheapest subscription</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Apple AirTag</td>
                                            <td className="p-4 text-primary/70">~35 EUR / none</td>
                                            <td className="p-4 text-primary/70">~1 year (coin cell)</td>
                                            <td className="p-4 text-primary/70 text-sm">Cheap city backup only; no live tracking, not pet-designed</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-primary/60 italic">
                                Prices are typical 2026 street prices and entry subscription tiers (longer commitments are cheaper; Kippy requires a 4-month minimum). Check current offers before buying.
                            </p>

                            <h2 id="cats" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Outdoor Cat Question</h2>
                            <p>
                                Germany is an outdoor-cat country, and many municipalities pair that freedom with obligations: registration, microchipping, and <Link to="/blog/neutering-cost-germany" className="text-accent-ink font-bold hover:underline">mandatory neutering rules</Link> for free-roaming cats. A tracker adds the missing piece: knowing your cat's actual territory. Most owners are surprised (a typical city cat roams far less than feared, but crosses more roads than hoped). For cats, weight decides everything: the <a href="https://tractive.com" target="_blank" rel="noopener noreferrer" className="text-accent-ink font-bold hover:underline">Tractive Cat Mini</a> (~25g) and the <a href="https://www.kippy.eu" onClick={() => trackAffiliateClick('Kippy', 'GpsTracker_Page')} target="_blank" rel="noopener noreferrer" className="text-accent-ink font-bold hover:underline">Kippy EVO</a> (~38g, for cats over 4kg) are the two practical choices.
                            </p>

                            <h2 id="safety" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Safety Rules Nobody Mentions</h2>
                            <ul className="space-y-3">
                                <li><strong>Breakaway collar or nothing (cats).</strong> The collar must have a Sicherheitsverschluss that opens under force so a snagged cat can free itself. Kippy's cat collar releases automatically under load; with any tracker, never use a rigid collar on a cat.</li>
                                <li><strong>Respect the weight.</strong> A tracker plus collar should stay well under 5% of the animal's body weight. For a 4kg cat, that budget is tight; it is why the sub-40g devices matter.</li>
                                <li><strong>A tracker is not a fence.</strong> Escape alerts tell you a pet HAS left the safe zone, minutes after the fact. It finds pets; it does not stop them leaving.</li>
                                <li><strong>Chip first, gadget second.</strong> Batteries die and collars come off. The microchip + TASSO registration is the permanent layer; the tracker is the fast layer. You want both.</li>
                            </ul>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">FAQ: Pet GPS Trackers in Germany</h2>
                            <div className="space-y-4 my-8 not-prose">
                                {faqSchema.mainEntity.map((q) => (
                                    <details key={q.name} className="bg-white rounded-xl border border-primary/5 shadow-sm p-5 group">
                                        <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                                            {q.name}
                                            <span className="text-accent transition-transform group-open:rotate-45 shrink-0">+</span>
                                        </summary>
                                        <p className="text-primary/70 text-sm mt-3 leading-relaxed">{q.acceptedAnswer.text}</p>
                                    </details>
                                ))}
                            </div>

                            <div className="bg-accent/10 p-8 rounded-2xl my-16 text-center shadow-lg border border-accent/20 not-prose">
                                <h3 className="text-2xl font-bold text-primary mb-4">Lost-pet prevention starts at the vet</h3>
                                <p className="mb-8 text-primary/80">
                                    Chip implantation and registration take one short visit. Find a practice where you can discuss it in English.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/pet-gps-tracker-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
