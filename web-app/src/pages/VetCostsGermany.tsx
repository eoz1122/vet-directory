import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "Vet Costs in Germany: The GOT Fee Schedule Explained";
const DESCRIPTION = "How much does a vet visit cost in Germany? The GOT fee schedule explained for expats: consultation prices, the 1x-4x multiplier system, emergency surcharges, and how to keep bills manageable.";
const URL = "https://englishspeakinggermany.online/blog/vet-costs-germany";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does a standard vet visit cost in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A general examination with consultation is 23.62 EUR net (about 28 EUR with VAT) at the 1x GOT rate. Most practices bill routine visits at 1x to 2x, so expect roughly 30 to 60 EUR for the exam alone, plus any treatments, medication, or lab work."
            }
        },
        {
            "@type": "Question",
            "name": "Can I negotiate vet prices in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. The GOT (Gebuehrenordnung fuer Tieraerzte) is a legally binding fee schedule. Vets must charge at least the 1x rate and may go up to 3x (4x in emergencies). Charging less than 1x is actually not permitted, so 'shopping around' only moves you within that band."
            }
        },
        {
            "@type": "Question",
            "name": "Why was my emergency vet bill so high?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Outside regular hours (nights, weekends, holidays), German law requires a flat emergency fee of 50 EUR net plus a minimum of 2x GOT rates, and up to 4x. A visit that costs 60 EUR on a Tuesday morning can legitimately cost 200 EUR or more on a Sunday night."
            }
        },
        {
            "@type": "Question",
            "name": "Are vet prices the same everywhere in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The fee schedule is national, but practices choose their multiplier within the 1x-3x band based on complexity, time, and local costs. Big-city practices often bill closer to 2x while rural ones may stay near 1x, so the same treatment can differ, just within a regulated range."
            }
        },
        {
            "@type": "Question",
            "name": "Does German pet insurance cover GOT rates?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Good policies reimburse up to 3x or 4x GOT rates. Cheaper policies may only cover up to 2x, which leaves a gap in emergencies where 3x-4x rates apply. Always check the maximum GOT multiplier a policy reimburses before signing."
            }
        }
    ]
};

export default function VetCostsGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="vet costs Germany, how much does a vet cost in Germany, GOT fee schedule, Tierarzt Kosten, vet prices Germany expats, emergency vet cost Germany" />
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
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Money & Bureaucracy Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            💶 Vet Costs in Germany: <br />The GOT Explained
                        </h1>

                        <TableOfContents items={[
                            { id: 'what-is-got', label: 'What Is the GOT?' },
                            { id: 'multipliers', label: 'The 1x to 4x Multiplier System' },
                            { id: 'price-table', label: 'What Common Treatments Cost' },
                            { id: 'emergency', label: 'Why Emergencies Cost So Much' },
                            { id: 'no-haggling', label: 'Why You Cannot Negotiate' },
                            { id: 'saving', label: '6 Legitimate Ways to Save' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                The first German vet bill surprises almost every expat, in one of two ways. Either it is far cheaper than back home (Americans, this means you), or the weekend emergency invoice is triple what Tuesday would have cost and nobody warned you. Both experiences come from the same document: the GOT.
                            </p>

                            <h2 id="what-is-got" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">What Is the GOT?</h2>
                            <p>
                                The <strong>Gebührenordnung für Tierärzte (GOT)</strong> is Germany's legally binding veterinary fee schedule. It lists over 1,000 individual services, each with a fixed base price. Every vet in Germany must bill from this list; it is a federal regulation, not a suggestion.
                            </p>
                            <p>
                                The current version took effect in <strong>November 2022</strong>, the first major overhaul in 20 years. Prices rose noticeably then (a standard cat exam went from about 9 EUR to 23.62 EUR base), which is why older forum posts about "cheap German vets" no longer match reality.
                            </p>
                            <p className="bg-primary/5 p-6 rounded-xl border border-primary/10 not-prose text-sm">
                                <strong>Two things to know when reading any German vet quote:</strong> GOT prices are <em>net</em> (add 19% VAT to everything), and the listed price is only the <em>starting point</em>. The multiplier decides what you actually pay.
                            </p>

                            <h2 id="multipliers" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The 1x to 4x Multiplier System</h2>
                            <p>
                                For every service, the vet chooses a multiplier between <strong>1x and 3x</strong> of the base price, based on difficulty, time spent, and the practice's local costs. In out-of-hours emergencies the law sets a <strong>minimum of 2x</strong> and allows <strong>up to 4x</strong>.
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Rate</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">When it applies</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Exam example (gross)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">1x</td>
                                            <td className="p-4 text-primary/70">Simple routine cases, the legal minimum</td>
                                            <td className="p-4 text-accent font-bold">~28 EUR</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">2x</td>
                                            <td className="p-4 text-primary/70">The everyday default at many urban practices</td>
                                            <td className="p-4 text-accent font-bold">~56 EUR</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">3x</td>
                                            <td className="p-4 text-primary/70">Complex or time-intensive cases</td>
                                            <td className="p-4 text-accent font-bold">~84 EUR</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">2x-4x + 50 EUR</td>
                                            <td className="p-4 text-primary/70">Nights (6pm-8am), weekends, public holidays</td>
                                            <td className="p-4 text-accent font-bold">~116-172 EUR</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-primary/60 italic">
                                Based on the GOT base price of 23.62 EUR net for a general examination with consultation, plus 19% VAT. The emergency row includes the mandatory 50 EUR net out-of-hours fee.
                            </p>

                            <h2 id="price-table" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">What Common Treatments Actually Cost</h2>
                            <p>
                                Realistic all-in ranges (gross, including typical multipliers, materials, and VAT) for dogs and cats:
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Treatment</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Typical range</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr><td className="p-4 font-bold text-primary">General exam + consultation</td><td className="p-4 text-accent font-bold">30-60 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Annual check-up + vaccination</td><td className="p-4 text-accent font-bold">50-100 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Blood panel</td><td className="p-4 text-accent font-bold">50-150 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">X-ray (first image)</td><td className="p-4 text-accent font-bold">60-150 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Dental cleaning (under anesthesia)</td><td className="p-4 text-accent font-bold">150-450 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Neutering (see our dedicated guide)</td><td className="p-4 text-accent font-bold">60-600 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Cruciate ligament (ACL) surgery</td><td className="p-4 text-accent font-bold">1,500-3,500 EUR</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Poisoning emergency</td><td className="p-4 text-accent font-bold">500-1,200 EUR</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                For neutering specifics, see our <Link to="/blog/neutering-cost-germany" className="text-accent font-bold hover:underline">neutering cost guide</Link>; for the full jab-by-jab breakdown, the <Link to="/blog/pet-vaccination-costs-germany" className="text-accent font-bold hover:underline">vaccination schedule and costs guide</Link>.
                            </p>

                            <h2 id="emergency" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Why Emergencies Cost So Much</h2>
                            <p>
                                Three separate rules stack on an out-of-hours visit: the flat <strong>50 EUR net emergency fee</strong>, the <strong>2x minimum multiplier</strong>, and the vet's right to go to <strong>4x</strong>. That is the law working as intended, to keep night services staffed, not a clinic ripping you off.
                            </p>
                            <p>
                                If your pet has a genuine emergency, go. But for a "is this urgent?" situation at 10pm, a video-vet triage call first can save you the surcharge entirely. Know where your nearest 24/7 clinic is <em>before</em> you need it: we keep verified emergency guides for{' '}
                                <Link to="/guides/emergency-vets-berlin" className="text-accent font-bold hover:underline">Berlin</Link>,{' '}
                                <Link to="/guides/emergency-vets-munich" className="text-accent font-bold hover:underline">Munich</Link>,{' '}
                                <Link to="/guides/emergency-vets-hamburg" className="text-accent font-bold hover:underline">Hamburg</Link> and{' '}
                                <Link to="/guides/emergency-vets-frankfurt" className="text-accent font-bold hover:underline">Frankfurt</Link>.
                            </p>

                            <h2 id="no-haggling" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Why You Cannot Negotiate (And What You Can Do Instead)</h2>
                            <p>
                                Because the GOT is a legal regulation, a vet who charges below 1x is breaking professional rules. There are no coupons and no "cash discount". What you <em>can</em> do:
                            </p>
                            <ul className="space-y-3">
                                <li><strong>Ask for a Kostenvoranschlag (written estimate)</strong> before any planned procedure. Reputable practices provide one without fuss.</li>
                                <li><strong>Ask which multiplier they bill at</strong> for routine care. It is a fair question and the answer is allowed to influence which practice you choose.</li>
                                <li><strong>Ask about Ratenzahlung (installments)</strong> for large bills. Many clinics offer payment plans; some partner with financing services.</li>
                            </ul>

                            <h2 id="saving" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">6 Legitimate Ways to Keep Vet Costs Down</h2>
                            <div className="space-y-4 my-8 not-prose">
                                {[
                                    ['🛡️', 'Insure early, while your pet is young and healthy', 'Premiums lock in lower and pre-existing conditions are not yet excluded. Our pet insurance guide compares expat-friendly providers.'],
                                    ['🗓️', 'Do not skip the annual check-up', 'A 60 EUR yearly visit catches the 2,000 EUR problem while it is still a 200 EUR problem.'],
                                    ['🦷', 'Take dental care seriously', 'Dental disease is one of the most common (and most avoidable) 300+ EUR bills for cats and small dogs.'],
                                    ['📞', 'Use video vets for triage, not Google', 'A 20-30 EUR video consult on a Sunday beats a 150+ EUR unnecessary emergency room visit.'],
                                    ['⚖️', 'Keep your pet at a healthy weight', 'Obesity drives diabetes, joint surgery, and heart problems. The cheapest prevention there is.'],
                                    ['📄', 'Get estimates for planned procedures', 'For anything scheduled (dental, neutering, lump removal), a written Kostenvoranschlag lets you compare practices fairly.'],
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
                                The single biggest lever is insurance: read our full <Link to="/blog/pet-insurance-germany" className="text-accent font-bold hover:underline">pet insurance guide for expats</Link> to understand OP-Versicherung vs full coverage and which providers offer English policies.
                            </p>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">FAQ: Vet Costs in Germany</h2>
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
                                <h3 className="text-2xl font-bold text-primary mb-4">A fair bill starts with a vet you can actually talk to</h3>
                                <p className="mb-8 text-primary/80">
                                    Misunderstandings cost money. Every practice in our directory is community-verified as English-speaking, so you always know what you are paying for and why.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/vet-costs-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
