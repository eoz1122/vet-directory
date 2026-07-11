import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "Neutering & Spaying Costs in Germany (Kastration Guide)";
const DESCRIPTION = "What neutering or spaying really costs in Germany: realistic price ranges for cats and dogs under the GOT fee schedule, what is included, mandatory cat neutering rules, and how to budget for it.";
const URL = "https://englishspeakinggermany.online/blog/neutering-cost-germany";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does it cost to neuter a cat in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Neutering a male cat typically costs 60 to 150 EUR all-in. Spaying a female cat is more invasive surgery and typically runs 120 to 250 EUR, with complex cases or higher GOT multipliers pushing it toward 300 EUR or more."
            }
        },
        {
            "@type": "Question",
            "name": "How much does it cost to neuter a dog in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Castrating a male dog typically costs 150 to 350 EUR. Spaying a female dog is a bigger operation and usually costs 300 to 600 EUR, depending on the dog's size, the clinic's GOT multiplier, and pre-op diagnostics."
            }
        },
        {
            "@type": "Question",
            "name": "Is neutering mandatory in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Not nationally. But hundreds of German municipalities have a Kastrationspflicht (mandatory neutering rule) for outdoor cats, and animal shelters normally neuter every animal before adoption or require you to do it. For dogs there is no general legal requirement."
            }
        },
        {
            "@type": "Question",
            "name": "Why did I get quoted such different prices by two vets?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The GOT surgical fee is fixed, but each practice picks a multiplier from 1x to 3x and adds anesthesia, materials, pain medication, and aftercare, which are billed as separate GOT items. Ask both practices for a written Kostenvoranschlag listing what is included, then compare like for like."
            }
        },
        {
            "@type": "Question",
            "name": "Does pet insurance cover neutering in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Usually not. Neutering is an elective procedure, so standard health and surgery policies exclude it. Some premium policies contribute a fixed yearly budget for preventive care that can be used toward it. Check the policy wording for 'Kastration' before assuming coverage."
            }
        }
    ]
};

export default function NeuteringCostsGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="neutering cost Germany, spaying cost Germany, Kastration Kosten, cat neutering Germany, dog neutering price Germany, Kastrationspflicht" />
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
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Money & Health Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            ✂️ Neutering & Spaying Costs <br />in Germany
                        </h1>

                        <TableOfContents items={[
                            { id: 'prices', label: 'The Price Table' },
                            { id: 'whats-included', label: 'What the Quote Includes (and What It Does Not)' },
                            { id: 'mandatory', label: 'Is It Mandatory? The Kastrationspflicht' },
                            { id: 'kastration-vs', label: 'Kastration vs Sterilisation: A Language Trap' },
                            { id: 'budgeting', label: 'How to Budget and Compare Quotes' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                Neutering is usually the first big planned vet bill an expat pet owner faces in Germany, and the quotes can vary confusingly between practices. Here is what the surgery really costs, why the numbers differ, and the one German word mix-up that trips up almost every English speaker.
                            </p>

                            <h2 id="prices" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">The Price Table</h2>
                            <p>
                                All German vets bill from the <Link to="/blog/vet-costs-germany" className="text-accent font-bold hover:underline">GOT fee schedule</Link>, so prices move within a regulated band rather than being freely set. Realistic all-in ranges (surgery, anesthesia, materials, VAT):
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Procedure</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Typical all-in cost</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Why the spread</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Male cat (Kater)</td>
                                            <td className="p-4 text-accent font-bold">60-150 EUR</td>
                                            <td className="p-4 text-primary/70 text-sm">Quick routine surgery; spread is mostly the multiplier</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Female cat (Kätzin)</td>
                                            <td className="p-4 text-accent font-bold">120-250 EUR</td>
                                            <td className="p-4 text-primary/70 text-sm">Abdominal surgery, longer anesthesia</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Male dog (Rüde)</td>
                                            <td className="p-4 text-accent font-bold">150-350 EUR</td>
                                            <td className="p-4 text-primary/70 text-sm">Size-dependent anesthesia dose and time</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Female dog (Hündin)</td>
                                            <td className="p-4 text-accent font-bold">300-600 EUR</td>
                                            <td className="p-4 text-primary/70 text-sm">The most involved of the four; big dogs cost more</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-primary/60 italic">
                                Ranges reflect common 1x-2x GOT billing in 2026. Pre-op blood work (recommended for older animals) adds roughly 50-100 EUR and is worth saying yes to.
                            </p>

                            <h2 id="whats-included" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">What the Quote Includes (and What It Does Not)</h2>
                            <p>A "Kastration" quote is not one GOT line item; it stacks several. When comparing practices, check whether the quote covers:</p>
                            <ul className="space-y-2">
                                <li>✅ The surgery itself (the headline GOT item)</li>
                                <li>✅ Anesthesia (billed separately, size-dependent)</li>
                                <li>✅ Materials, consumables, and medication</li>
                                <li>❓ Pre-op examination (sometimes a separate visit)</li>
                                <li>❓ Pain medication to take home</li>
                                <li>❓ The follow-up check and stitch removal</li>
                                <li>❓ A protective collar or body suit</li>
                            </ul>
                            <p>
                                Two quotes that differ by 80 EUR often just differ in how many of those boxes are in the printed price. Ask for a written <strong>Kostenvoranschlag</strong> that lists the items.
                            </p>

                            <h2 id="mandatory" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Is It Mandatory? The Kastrationspflicht</h2>
                            <p>
                                There is no national neutering law, but <strong>hundreds of German municipalities require outdoor cats to be neutered and registered</strong> (a Kastrationspflicht, often combined with microchip and registration duties). Berlin, many NRW cities, and much of Lower Saxony have such rules. If your cat goes outside, check your city's regulations; fines apply.
                            </p>
                            <p>
                                Adopting from a shelter? The Tierheim will almost always have neutered the animal already (it is baked into the <Link to="/blog/adopting-pet-tierheim-germany" className="text-accent font-bold hover:underline">Schutzgebühr adoption fee</Link>) or will contractually require you to do it, which makes adoption one of the cheapest routes to a neutered pet.
                            </p>

                            <h2 id="kastration-vs" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Kastration vs Sterilisation: A Language Trap</h2>
                            <div className="bg-white border border-primary/10 rounded-2xl p-6 my-8 not-prose">
                                <p className="text-primary/80 text-sm leading-relaxed">
                                    In English, "neutering" is for males and "spaying" for females. German splits differently: <strong>Kastration</strong> means removing the gonads (testicles OR ovaries, so it applies to both sexes), while <strong>Sterilisation</strong> means only cutting the ducts, leaving hormones intact, and is rarely performed. When a German vet says your female cat needs a Kastration, that is the normal spay, not a mistranslation.
                                </p>
                            </div>

                            <h2 id="budgeting" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">How to Budget and Compare Quotes</h2>
                            <ul className="space-y-3">
                                <li><strong>Get two written estimates</strong> for a planned neutering; it is normal and no vet will be offended.</li>
                                <li><strong>Do not chase the absolute cheapest quote.</strong> Below-1x billing is not legal, so an implausibly low number usually means items were left out of the estimate.</li>
                                <li><strong>Insurance will not pay for it</strong> in most policies (elective procedure), so plan it as an out-of-pocket cost. Some premium policies contribute a preventive-care budget; see our <Link to="/blog/pet-insurance-germany" className="text-accent font-bold hover:underline">insurance guide</Link>.</li>
                                <li><strong>Time it sensibly:</strong> it is a routine weekday procedure. Never book anything elective at emergency rates.</li>
                            </ul>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">FAQ: Neutering in Germany</h2>
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
                                <h3 className="text-2xl font-bold text-primary mb-4">Discuss it in English, decide with confidence</h3>
                                <p className="mb-8 text-primary/80">
                                    Timing, risks, aftercare: neutering raises real questions. Find a vet who can answer them in English near you.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/neutering-cost-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
