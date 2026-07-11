import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "Dog & Cat Vaccinations in Germany: Schedule and Costs";
const DESCRIPTION = "Which vaccinations dogs and cats actually need in Germany, the StIKo Vet puppy and kitten schedules, what each jab costs under the GOT, and why rabies is now a travel vaccine rather than a core one.";
const URL = "https://englishspeakinggermany.online/blog/pet-vaccination-costs-germany";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does a dog vaccination cost in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A single vaccination visit typically costs 50 to 90 EUR: the GOT examination fee plus the injection fee plus the vaccine itself. A puppy's full primary series across three to four visits adds up to roughly 150 to 300 EUR."
            }
        },
        {
            "@type": "Question",
            "name": "Are any vaccinations legally required in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No vaccination is legally mandatory for pets living in Germany. Rabies becomes mandatory the moment you cross a border with your pet, since a valid rabies vaccination is a condition of the EU pet passport. Some dog schools, boarding kennels, and dog parks require proof of core vaccinations."
            }
        },
        {
            "@type": "Question",
            "name": "Is the rabies vaccine still recommended for pets in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Germany has been free of terrestrial rabies since 2008, and the StIKo Vet no longer lists rabies as a core vaccine for pets that stay inside the country. It is required for any cross-border travel. Most owners who ever plan to travel keep it current."
            }
        },
        {
            "@type": "Question",
            "name": "What are the core vaccines for dogs in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The StIKo Vet core vaccines for dogs are distemper (Staupe), parvovirus (Parvovirose), infectious canine hepatitis (HCC), and leptospirosis. For cats they are feline panleukopenia (Katzenseuche) and the cat flu complex of herpesvirus and calicivirus (Katzenschnupfen)."
            }
        },
        {
            "@type": "Question",
            "name": "How often do adult pets need boosters in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "It depends on the component: leptospirosis needs a yearly booster, while distemper, parvo, and HCC are typically boosted every three years after the primary series. Vets combine components so most adult dogs still have one vaccination appointment per year, usually 50 to 90 EUR."
            }
        }
    ]
};

export default function VaccinationCostsGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="dog vaccinations Germany, cat vaccinations Germany, puppy vaccination schedule Germany, vaccination cost Germany, StIKo Vet, rabies vaccine Germany, Impfung Hund Katze Kosten" />
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
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Health & Prevention Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            💉 Vaccinations in Germany: <br />Schedule & Costs
                        </h1>

                        <TableOfContents items={[
                            { id: 'who-decides', label: 'Who Decides? Meet the StIKo Vet' },
                            { id: 'dog-schedule', label: 'The Dog Schedule (Puppy to Adult)' },
                            { id: 'cat-schedule', label: 'The Cat Schedule (Kitten to Adult)' },
                            { id: 'rabies', label: 'The Rabies Surprise' },
                            { id: 'costs', label: 'What It All Costs' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                German vaccination advice may differ from what you knew at home, starting with the fact that rabies is no longer considered a core vaccine here. This guide covers what dogs and cats in Germany actually need, when, and what each visit will cost you.
                            </p>

                            <h2 id="who-decides" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">Who Decides? Meet the StIKo Vet</h2>
                            <p>
                                German vets follow the recommendations of the <strong>StIKo Vet</strong> (Standing Committee on Veterinary Vaccination at the Friedrich-Loeffler-Institut). Its guidance splits vaccines into <strong>core</strong> (every animal, always) and <strong>non-core</strong> (depends on lifestyle and risk). Nothing is legally mandatory for pets that stay in Germany, but the core set is treated as standard care by every practice.
                            </p>

                            <h2 id="dog-schedule" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Dog Schedule (Puppy to Adult)</h2>
                            <p>Core for dogs: <strong>distemper (Staupe), parvovirus, hepatitis (HCC), leptospirosis</strong>. The standard puppy series:</p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Age</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">What is given</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr><td className="p-4 font-bold text-primary">8 weeks</td><td className="p-4 text-primary/70">First combo jab (distemper, parvo, HCC, lepto)</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">12 weeks</td><td className="p-4 text-primary/70">Second combo; rabies possible from now if travel is planned</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">16 weeks</td><td className="p-4 text-primary/70">Third combo round</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">15 months</td><td className="p-4 text-primary/70">Final primary booster; the puppy series is complete</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Adult</td><td className="p-4 text-primary/70">Lepto yearly; distemper/parvo/HCC every 3 years</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                Non-core options your vet may suggest depending on lifestyle: kennel cough (Zwingerhusten, sensible before boarding or dog school), Lyme borreliosis, and leishmaniasis for southern-Europe travel. See also our <Link to="/blog/tick-season-germany-pets" className="text-accent font-bold hover:underline">tick season guide</Link> for why parasite prevention matters as much as jabs here.
                            </p>

                            <h2 id="cat-schedule" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Cat Schedule (Kitten to Adult)</h2>
                            <p>Core for cats: <strong>panleukopenia (Katzenseuche)</strong> and the <strong>cat flu complex (Katzenschnupfen: herpesvirus + calicivirus)</strong>. Outdoor cats usually add feline leukemia (FeLV).</p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Age</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">What is given</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr><td className="p-4 font-bold text-primary">8 weeks</td><td className="p-4 text-primary/70">First RCP combo (flu + panleukopenia)</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">12 weeks</td><td className="p-4 text-primary/70">Second RCP; FeLV first dose for future outdoor cats</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">16 weeks</td><td className="p-4 text-primary/70">Third round where recommended</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">15 months</td><td className="p-4 text-primary/70">Final primary booster</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Adult</td><td className="p-4 text-primary/70">Flu components yearly to every 2 years; panleukopenia every 3 years</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                Indoor-only cat? It still needs the core set: panleukopenia virus is tough enough to arrive on your shoes. Your vet can stretch booster intervals based on risk, which is exactly the conversation that is easier with an <Link to="/" className="text-accent font-bold hover:underline">English-speaking vet</Link>.
                            </p>

                            <h2 id="rabies" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The Rabies Surprise</h2>
                            <div className="bg-white border border-primary/10 rounded-2xl p-6 my-8 not-prose">
                                <p className="text-primary/80 text-sm leading-relaxed">
                                    Germany has been officially free of terrestrial rabies since 2008, so the StIKo Vet <strong>no longer lists rabies as a core vaccine</strong> for pets that never leave the country. But the moment you cross any border with your pet, a valid rabies vaccination is legally required as part of the <Link to="/blog/eu-pet-passport-germany" className="text-accent font-bold hover:underline">EU pet passport</Link>. Since the first dose must be given at least 21 days before travel, most expats (who travel by definition) simply keep it current. One jab, roughly 50-70 EUR all-in, renewed per the vaccine's licensed interval.
                                </p>
                            </div>

                            <h2 id="costs" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">What It All Costs</h2>
                            <p>
                                Every vaccination visit is billed as GOT items: the examination (23.62 EUR net base), the injection (11.50 EUR net base), and the vaccine itself, all times the practice's multiplier, plus VAT. In practice:
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                                {[
                                    ['Single vaccination visit', '50-90 EUR', 'Exam + jab + vaccine at typical 1x-2x rates'],
                                    ['Puppy primary series (3-4 visits)', '150-300 EUR', 'Spread over the first 16 weeks plus the 15-month booster'],
                                    ['Kitten primary series', '150-250 EUR', 'RCP series; add FeLV for outdoor cats'],
                                    ['Adult yearly booster visit', '50-100 EUR', 'Combined components, one appointment per year'],
                                ].map(([label, price, note]) => (
                                    <div key={label as string} className="bg-white p-5 rounded-xl border border-primary/5 shadow-sm">
                                        <div className="flex justify-between items-center mb-1 gap-3">
                                            <span className="font-bold text-primary text-sm">{label}</span>
                                            <span className="text-accent font-bold whitespace-nowrap">{price}</span>
                                        </div>
                                        <p className="text-xs text-primary/50">{note}</p>
                                    </div>
                                ))}
                            </div>
                            <p>
                                How those numbers come about is covered in our <Link to="/blog/vet-costs-germany" className="text-accent font-bold hover:underline">GOT fee schedule guide</Link>. Note that most standard health insurance policies treat vaccinations as preventive care and exclude them; premium policies often contribute a yearly preventive budget instead (details in the <Link to="/blog/pet-insurance-germany" className="text-accent font-bold hover:underline">insurance guide</Link>).
                            </p>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">FAQ: Pet Vaccinations in Germany</h2>
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
                                <h3 className="text-2xl font-bold text-primary mb-4">Get the schedule right, in a language you understand</h3>
                                <p className="mb-8 text-primary/80">
                                    Which non-core vaccines make sense for YOUR pet is a judgment call. Have that conversation with a vet who speaks English.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/pet-vaccination-costs-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
