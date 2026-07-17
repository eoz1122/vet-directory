import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackAffiliateClick } from '../utils/analytics';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "Your Puppy's First Year in Germany: Timeline & Costs";
const DESCRIPTION = "A month-by-month first-year plan for raising a puppy in Germany as an expat: registrations, vaccinations, insurance, dog school, and a realistic total budget from 8 weeks to 12 months.";
const URL = "https://englishspeakinggermany.online/blog/puppy-first-year-germany";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does a puppy's first year cost in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Budget roughly 1,500 to 3,000 EUR for the first year excluding the purchase or adoption itself: vaccinations and vet care (300-500 EUR), neutering if chosen (150-600 EUR), dog tax (50-200 EUR depending on the city), liability insurance (40-150 EUR), equipment (200-400 EUR), food (300-800 EUR), and dog school (100-300 EUR)."
            }
        },
        {
            "@type": "Question",
            "name": "What is legally required when you get a dog in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Register for dog tax (Hundesteuer) at your municipality, usually within 2 to 4 weeks. Liability insurance is mandatory in several states including Berlin, Hamburg, Lower Saxony, Thuringia, and Saxony-Anhalt. Some states also require microchipping and, for certain breeds, extra requirements."
            }
        },
        {
            "@type": "Question",
            "name": "Is dog school (Hundeschule) mandatory in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Generally no, but it is close to a social norm, and in Lower Saxony new dog owners must pass a Sachkundenachweis (competence test). Puppy classes (Welpenspielstunde) cost roughly 10 to 25 EUR per session and are the easiest way to socialize a puppy properly."
            }
        },
        {
            "@type": "Question",
            "name": "When should a puppy first see a vet in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Within the first week of bringing it home, even if the breeder or shelter provided a health check. The visit establishes a patient record, verifies the chip and vaccination status, and sets the schedule for the remaining puppy jabs."
            }
        }
    ]
};

export default function PuppyFirstYearGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="puppy first year Germany, getting a puppy Germany expat, puppy costs Germany, Hundeschule, puppy vaccinations Germany, dog registration Germany" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(TITLE, DESCRIPTION, URL, "2026-07-11"))}
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
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">New Pet Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            🐶 Your Puppy's First Year in Germany
                        </h1>

                        <TableOfContents items={[
                            { id: 'first-week', label: 'The First Week: Paperwork Sprint' },
                            { id: 'timeline', label: 'The Month-by-Month Timeline' },
                            { id: 'budget', label: 'The First-Year Budget' },
                            { id: 'hundeschule', label: 'Dog School: The German Way' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                Raising a puppy in Germany comes with a uniquely German twist: alongside the chewed shoes and 6am walks, there is a tax office that wants to know about your dog. This is the full first-year map, from the week-one paperwork sprint to the 15-month booster.
                            </p>

                            <h2 id="first-week" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">The First Week: Paperwork Sprint</h2>
                            <div className="space-y-4 my-8 not-prose">
                                {[
                                    ['🏛️', 'Register for Hundesteuer', 'The dog tax, at your city or town hall, usually due within 2-4 weeks of getting the dog. 50-200 EUR per year depending on the city. You get a tag (Hundemarke) for the collar.'],
                                    ['🛡️', 'Get liability insurance', 'Hundehaftpflicht is legally required in Berlin, Hamburg, Lower Saxony, Thuringia, and Saxony-Anhalt, and a very good idea everywhere else. 40-150 EUR per year.'],
                                    ['📡', 'Register the microchip with TASSO', 'Free, takes 5 minutes online, and is what actually reunites you with a lost dog. The chip alone does nothing without registration.'],
                                    ['🩺', 'Book the first vet visit', 'Within the first week. Chip check, vaccination status, weight baseline, and your questions answered.'],
                                ].map(([emoji, title, desc]) => (
                                    <div key={title as string} className="p-5 bg-white rounded-xl border border-primary/5 shadow-sm flex items-start gap-4">
                                        <span className="text-2xl shrink-0">{emoji}</span>
                                        <div>
                                            <p className="font-bold text-primary leading-tight">{title}</p>
                                            <p className="text-sm text-primary/60 mt-1">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p>
                                Deep dives: <Link to="/blog/hundesteuer-dog-tax-germany" className="text-accent-ink font-bold hover:underline">Hundesteuer guide</Link>, <Link to="/blog/pet-insurance-germany" className="text-accent-ink font-bold hover:underline">insurance guide</Link>, and <Link to="/blog/first-vet-visit-germany" className="text-accent-ink font-bold hover:underline">what the first vet visit looks like</Link>.
                            </p>
                            <div className="bg-white border-l-4 border-accent p-6 rounded-xl shadow-sm my-8 not-prose">
                                <h3 className="text-lg font-bold text-primary mb-2">🛡️ Need Hundehaftpflicht?</h3>
                                <p className="text-sm text-primary/70 mb-4">It is item two on the week-one list, and puppies are precisely when accidents happen. Coverage from around 5 EUR/month; the site is in German, but sign-up is a short digital form.</p>
                                <a
                                    href="https://www.awin1.com/cread.php?awinmid=14361&awinaffid=2707844&ued=https%3A%2F%2Fhelden.de%2Fprodukte%2Ftierversicherung%2Fhundehaftpflicht%2F"
                                    onClick={() => trackAffiliateClick('Helden', 'PuppyFirstYear_Week1')}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="inline-block bg-accent-ink text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all text-sm shadow-md"
                                >
                                    Compare Dog Liability Cover at helden.de →
                                </a>
                                <p className="text-xs text-primary/40 mt-3 italic">*Affiliate link. We may earn a commission at no extra cost to you.</p>
                            </div>


                            <h2 id="timeline" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Month-by-Month Timeline</h2>
                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Age</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">What happens</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr><td className="p-4 font-bold text-primary">8-9 weeks</td><td className="p-4 text-primary/70">Puppy arrives; first combo vaccination if not done; paperwork sprint (above)</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">12 weeks</td><td className="p-4 text-primary/70">Second vaccination round; rabies if you plan EU travel; puppy class starts</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">16 weeks</td><td className="p-4 text-primary/70">Third vaccination round; socialization window closing, prioritize experiences</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">6-9 months</td><td className="p-4 text-primary/70">Adolescence; discuss neutering timing with your vet (breed and size dependent)</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">12 months</td><td className="p-4 text-primary/70">Switch to adult food gradually; first annual check-up cycle begins</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">15 months</td><td className="p-4 text-primary/70">Final booster completes the primary immunization</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                The vaccination details (what is in each combo jab and why) are in our <Link to="/blog/pet-vaccination-costs-germany" className="text-accent-ink font-bold hover:underline">vaccination schedule guide</Link>; neutering timing and prices in the <Link to="/blog/neutering-cost-germany" className="text-accent-ink font-bold hover:underline">Kastration guide</Link>.
                            </p>

                            <h2 id="budget" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The First-Year Budget</h2>
                            <p>Realistic ranges, excluding the purchase price or <Link to="/blog/adopting-pet-tierheim-germany" className="text-accent-ink font-bold hover:underline">adoption fee</Link>:</p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Item</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">First-year cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr><td className="p-4 font-bold text-primary">Vet care (vaccination series + check-ups)</td><td className="p-4 text-accent font-bold">300-500 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Neutering (if chosen this year)</td><td className="p-4 text-accent font-bold">150-600 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Hundesteuer (city dependent)</td><td className="p-4 text-accent font-bold">50-200 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Liability insurance</td><td className="p-4 text-accent font-bold">40-150 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Food (size dependent)</td><td className="p-4 text-accent font-bold">300-800 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Equipment (bed, leads, crate, toys)</td><td className="p-4 text-accent font-bold">200-400 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Dog school</td><td className="p-4 text-accent font-bold">100-300 EUR</td></tr>
                                        <tr className="bg-accent/5"><td className="p-4 font-black text-primary">Realistic total</td><td className="p-4 text-accent font-black">1,500-3,000 EUR</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                Choosing food is its own rabbit hole; our <Link to="/blog/best-dog-food-germany" className="text-accent-ink font-bold hover:underline">dog food buyer's guide</Link> decodes German labels and where to buy.
                            </p>

                            <h2 id="hundeschule" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Dog School: The German Way</h2>
                            <p>
                                Germany takes dog training seriously. A <strong>Welpenspielstunde</strong> (puppy social hour, from about 12 weeks) followed by basic obedience classes is the standard path, roughly 10-25 EUR per session. In <strong>Lower Saxony</strong>, first-time owners must pass a competence test (Sachkundenachweis); in Berlin, passing an exam can earn leash-freedom privileges. Beyond rules, a well-socialized dog simply has a better life in a country where dogs ride the U-Bahn and sit under restaurant tables; our <Link to="/blog/german-dog-etiquette-rules" className="text-accent-ink font-bold hover:underline">dog etiquette guide</Link> explains the unwritten rules.
                            </p>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">FAQ: Puppies in Germany</h2>
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
                                <h3 className="text-2xl font-bold text-primary mb-4">A first year full of questions deserves a vet who speaks your language</h3>
                                <p className="mb-8 text-primary/80">
                                    From "is this poop normal?" to neutering timing, you will call your vet a lot this year. Make sure you can understand the answers.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/puppy-first-year-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
