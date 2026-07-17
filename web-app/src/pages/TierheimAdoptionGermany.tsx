import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "Adopting a Pet from a German Tierheim: The Expat Guide";
const DESCRIPTION = "How Tierheim adoption works in Germany for expats: the Schutzgebühr fee, the interview and home-check process, what documents you need (Anmeldung, landlord permission), and what happens after adoption.";
const URL = "https://englishspeakinggermany.online/blog/adopting-pet-tierheim-germany";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does it cost to adopt from a Tierheim in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Schutzgebühr (protection fee) typically runs 150 to 400 EUR for dogs (puppies can be more) and 70 to 200 EUR for cats. It usually includes microchipping, vaccinations, a health check, and neutering, which together would cost more at a vet."
            }
        },
        {
            "@type": "Question",
            "name": "Can I adopt from a German Tierheim as a foreigner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. There is no citizenship requirement. You need to be 18 or older, show ID and proof of registration in Germany (Anmeldung or Meldebescheinigung), and if you rent, written landlord permission for the pet. Shelters care about a stable, suitable home, not your passport."
            }
        },
        {
            "@type": "Question",
            "name": "What is a Vorkontrolle?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A pre-adoption home visit. A shelter volunteer checks that your home matches what you described: enough space, secure windows or balcony for cats, and that everyone in the household is on board. It is normal, friendly, and usually takes 20 to 30 minutes."
            }
        },
        {
            "@type": "Question",
            "name": "Why did the Tierheim reject my application?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most common reasons are full-time absence with no pet care plan, a rental with no written pet permission, or a mismatch between the specific animal's needs and your living situation (for example a high-energy dog in a small flat with no yard). A rejection for one animal does not blacklist you; ask what would need to change."
            }
        },
        {
            "@type": "Question",
            "name": "What language barrier should I expect at a Tierheim?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Adoption paperwork (the Schutzvertrag) is in German, and volunteers may or may not speak English. Bring a German-speaking friend or a translation app for the contract, and take your time. In bigger cities, many shelters are used to international adopters."
            }
        }
    ]
};

export default function TierheimAdoptionGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="Tierheim adoption Germany, adopt a dog Germany, adopt a cat Germany expat, Schutzgebühr, animal shelter Germany English, dog adoption requirements Germany" />
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
                            🏠 Adopting from a German Tierheim: <br />The Expat Guide
                        </h1>

                        <TableOfContents items={[
                            { id: 'why-tierheim', label: 'Why the Tierheim Route' },
                            { id: 'schutzgebuehr', label: 'The Schutzgebühr (What You Pay)' },
                            { id: 'process', label: 'The Process, Step by Step' },
                            { id: 'documents', label: 'Documents Expats Need' },
                            { id: 'after', label: 'After You Adopt' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                German animal shelters take rehoming seriously: expect an application, an interview, and possibly a home visit before you take anyone home. It can feel bureaucratic, but it exists so animals do not bounce back. Here is exactly what to expect as an international adopter.
                            </p>

                            <h2 id="why-tierheim" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">Why the Tierheim Route</h2>
                            <p>
                                Germany has one of Europe's densest shelter networks, largely run by the Deutscher Tierschutzbund and local associations. Tierheim animals come <strong>vet-checked, vaccinated, microchipped, and usually neutered</strong>, with honest notes about temperament. Compare that with online classifieds, where none of it is guaranteed, and the shelter's process starts to look like a feature rather than friction.
                            </p>

                            <h2 id="schutzgebuehr" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Schutzgebühr (What You Pay)</h2>
                            <p>
                                The adoption fee is called the <strong>Schutzgebühr</strong>, literally "protection fee". It partially covers the shelter's costs and deliberately signals that an animal is a commitment, not a free impulse.
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Animal</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Typical fee</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Usually includes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Adult dog</td>
                                            <td className="p-4 text-accent font-bold">150-400 EUR</td>
                                            <td className="p-4 text-primary/70 text-sm" rowSpan={3}>Microchip, vaccinations, health check, deworming, and neutering (or a contractual neutering obligation for young animals)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Puppy</td>
                                            <td className="p-4 text-accent font-bold">300-500 EUR</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Cat / kitten</td>
                                            <td className="p-4 text-accent font-bold">70-200 EUR</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-primary/60 italic">
                                Fees vary by shelter and city; big-city shelters trend higher. Bought separately, the included vet work alone would exceed the fee (see our <Link to="/blog/vet-costs-germany" className="text-accent hover:underline">vet cost guide</Link> and <Link to="/blog/neutering-cost-germany" className="text-accent hover:underline">neutering price guide</Link>).
                            </p>

                            <h2 id="process" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Process, Step by Step</h2>
                            <div className="space-y-4 my-8 not-prose">
                                {[
                                    ['1', 'Browse and visit', 'Check the shelter website, then visit during opening hours. Tell staff honestly about your home, schedule, and experience; they match animals to households.'],
                                    ['2', 'Meet the animal (more than once)', 'For dogs, several walks together are standard before any decision. For cats, repeat visits show the shelter you are serious.'],
                                    ['3', 'The questionnaire and interview', 'Expect questions about working hours, home size, other pets, children, and what happens to the pet when you travel. This is normal for everyone, not expat-specific.'],
                                    ['4', 'The Vorkontrolle (home check)', 'Many shelters visit your home before handover: secure windows for cats, a quick reality check of what you described. Friendly, not forensic.'],
                                    ['5', 'The Schutzvertrag and handover', 'You sign an adoption contract (German), pay the Schutzgebühr, and receive the vaccination booklet (Impfpass) and chip documents. Some contracts include a follow-up visit clause.'],
                                ].map(([n, title, desc]) => (
                                    <div key={n as string} className="p-5 bg-white rounded-xl border border-primary/5 shadow-sm flex items-start gap-4">
                                        <div className="w-8 h-8 bg-accent/15 text-accent font-black rounded-full flex items-center justify-center shrink-0">{n}</div>
                                        <div>
                                            <p className="font-bold text-primary leading-tight">{title}</p>
                                            <p className="text-sm text-primary/60 mt-1">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 id="documents" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Documents Expats Need</h2>
                            <ul className="space-y-3">
                                <li><strong>Photo ID</strong> (passport or residence card) and proof you live in Germany: your <strong>Anmeldung / Meldebescheinigung</strong>.</li>
                                <li><strong>Written landlord permission</strong> if you rent and want a dog (and for many cats too). German landlords cannot blanket-ban all pets, but dogs generally need explicit consent; see our <Link to="/blog/pet-friendly-apartments-germany" className="text-accent-ink font-bold hover:underline">pet-friendly apartment guide</Link>.</li>
                                <li><strong>For dogs:</strong> be ready to arrange <strong>liability insurance (Hundehaftpflicht)</strong> and <strong>dog tax (Hundesteuer)</strong> registration right after adoption; some shelters ask for proof. Details in our <Link to="/blog/hundesteuer-dog-tax-germany" className="text-accent-ink font-bold hover:underline">dog tax guide</Link> and <Link to="/blog/pet-insurance-germany" className="text-accent-ink font-bold hover:underline">insurance guide</Link>.</li>
                                <li><strong>A rough pet-care plan</strong> for your working hours and travel. You will be asked.</li>
                            </ul>

                            <h2 id="after" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">After You Adopt</h2>
                            <p>Four things to do in the first two weeks:</p>
                            <ul className="space-y-3">
                                <li><strong>Register the chip</strong> with TASSO (free): our <Link to="/blog/cat-registration-germany" className="text-accent-ink font-bold hover:underline">registration guide</Link> explains how.</li>
                                <li><strong>Dogs: register for Hundesteuer</strong> at your city within the deadline (often 2-4 weeks).</li>
                                <li><strong>Book a get-to-know visit</strong> with a local vet, even though the shelter vet-checked the animal. Having a practice that knows your pet BEFORE an emergency is half the value; here is <Link to="/blog/first-vet-visit-germany" className="text-accent-ink font-bold hover:underline">what a first German vet visit looks like</Link>.</li>
                                <li><strong>Give it time.</strong> German shelters talk about the 3-3-3 rule: 3 days to decompress, 3 weeks to settle, 3 months to feel at home.</li>
                            </ul>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">FAQ: Tierheim Adoption</h2>
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
                                <h3 className="text-2xl font-bold text-primary mb-4">Adopted? Line up your English-speaking vet now</h3>
                                <p className="mb-8 text-primary/80">
                                    The best time to find a vet you can talk to is before the first hairball, limp, or 2am worry.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/adopting-pet-tierheim-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
