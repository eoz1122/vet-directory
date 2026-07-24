import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "New Pet in Germany: The First 30 Days Checklist";
const DESCRIPTION = "Everything to register, insure, and organize in the first 30 days with a new dog or cat in Germany: TASSO, Hundesteuer, liability insurance, the first vet visit, and the deadlines expats miss.";
const URL = "https://englishspeakinggermany.online/blog/new-pet-checklist-germany";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What do I have to register when I get a pet in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For a dog: dog tax (Hundesteuer) at your municipality, the microchip with TASSO, and liability insurance where mandatory. For a cat: TASSO registration always, plus microchip and neutering where your city has a Kastrationspflicht for outdoor cats. Cats pay no tax."
            }
        },
        {
            "@type": "Question",
            "name": "What happens if I forget to register my dog for Hundesteuer?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Late registration can trigger back taxes and fines that vary by city, and inspectors do check dogs for the tax tag in parks. Registration is usually a simple online or paper form, so it is not worth the risk. Deadlines are typically 2 to 4 weeks after getting the dog."
            }
        },
        {
            "@type": "Question",
            "name": "Is TASSO registration really necessary if my pet is microchipped?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The microchip is just a number; it contains no contact details. Only registering that number in a database like TASSO (free) or FINDEFIX links it to you. An unregistered chip does nothing when your pet is found."
            }
        },
        {
            "@type": "Question",
            "name": "How soon should a new pet see a vet in Germany?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Within the first one to two weeks, even for a healthy animal from a shelter or breeder. The visit creates a patient record, verifies chip and vaccinations, and means you are already a known client when something urgent happens later."
            }
        }
    ]
};

const CHECKLIST = [
    {
        phase: 'Day 1-7',
        items: [
            ['📡', 'Register the microchip with TASSO', 'Free, online, 5 minutes. The single highest-value item on this list.', '/blog/cat-registration-germany'],
            ['🏛️', 'Dogs: start the Hundesteuer registration', 'City deadlines are typically 2-4 weeks. Cats pay no tax.', '/blog/hundesteuer-dog-tax-germany'],
            ['🛡️', 'Dogs: arrange liability insurance', 'Check the state rule and the policy terms before choosing cover.', '/blog/dog-liability-insurance-germany'],
            ['🩺', 'Book the first vet visit', 'Within 1-2 weeks, even for a healthy pet. Establish the record before you need it.', '/blog/first-vet-visit-germany'],
        ],
    },
    {
        phase: 'Day 8-14',
        items: [
            ['💉', 'Verify the vaccination status', 'Check the Impfpass against the StIKo Vet schedule and book any missing jabs.', '/blog/pet-vaccination-costs-germany'],
            ['🏥', 'Decide on health insurance', 'Premiums are lowest while the animal is young and healthy; waiting periods apply.', '/blog/pet-insurance-germany'],
            ['🍽️', 'Settle the food question', 'Keep the previous food for 1-2 weeks, then transition gradually if changing.', '/blog/best-dog-food-germany'],
        ],
    },
    {
        phase: 'Day 15-30',
        items: [
            ['🚨', 'Save your emergency vet info', 'Find the nearest 24/7 clinic NOW and put the number in your phone.', '/guides/pet-emergency-germany'],
            ['✂️', 'Outdoor cat? Check your city\'s neutering rules', 'Hundreds of municipalities have a Kastrationspflicht for outdoor cats.', '/blog/neutering-cost-germany'],
            ['🛂', 'Planning EU travel? Start the pet passport', 'Rabies vaccination must be at least 21 days old before crossing a border.', '/blog/eu-pet-passport-germany'],
            ['🐕', 'Dogs: book a training class', 'Puppy hour or basic obedience; in Lower Saxony a competence test is required.', '/blog/puppy-first-year-germany'],
        ],
    },
];

export default function NewPetChecklistGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="new pet checklist Germany, register dog Germany, register cat Germany, TASSO registration, new dog Germany expat, pet registration deadlines Germany" />
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
                            ✅ New Pet in Germany: <br />The First 30 Days
                        </h1>

                        <TableOfContents items={[
                            { id: 'checklist', label: 'The 30-Day Checklist' },
                            { id: 'dog-vs-cat', label: 'Dog vs Cat: What Differs' },
                            { id: 'mistakes', label: 'The 3 Deadlines Expats Miss' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                Germany welcomes your new pet with love, and forms. Some registrations have real deadlines and real fines, others are free five-minute wins that people skip and regret. This checklist puts everything in order, with links to the deep-dive guide for each step.
                            </p>

                            <h2 id="checklist" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">The 30-Day Checklist</h2>

                            {CHECKLIST.map((block) => (
                                <div key={block.phase} className="not-prose my-8">
                                    <h3 className="text-lg font-black text-accent uppercase tracking-widest mb-4">{block.phase}</h3>
                                    <div className="space-y-3">
                                        {block.items.map(([emoji, title, desc, link]) => (
                                            <Link
                                                key={title}
                                                to={link}
                                                aria-label={link === '/blog/dog-liability-insurance-germany'
                                                    ? 'Dog liability insurance guide'
                                                    : undefined}
                                                className="p-5 bg-white rounded-xl border border-primary/5 shadow-sm flex items-start gap-4 hover:border-accent/40 transition-all group block"
                                            >
                                                <span className="text-2xl shrink-0">{emoji}</span>
                                                <div className="flex-1">
                                                    <p className="font-bold text-primary leading-tight group-hover:text-accent transition-colors">{title}</p>
                                                    <p className="text-sm text-primary/60 mt-1">{desc}</p>
                                                </div>
                                                <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">→</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <h2 id="dog-vs-cat" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Dog vs Cat: What Differs</h2>
                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Obligation</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Dog</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Cat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr><td className="p-4 font-bold text-primary">Tax (Hundesteuer)</td><td className="p-4 text-primary/70">Yes, 50-200 EUR/year</td><td className="p-4 text-primary/70">No tax</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Liability insurance</td><td className="p-4 text-primary/70">Mandatory in 5+ states</td><td className="p-4 text-primary/70">Covered by private liability</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Chip registration (TASSO)</td><td className="p-4 text-primary/70">Strongly recommended</td><td className="p-4 text-primary/70">Strongly recommended</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Neutering</td><td className="p-4 text-primary/70">Owner's choice</td><td className="p-4 text-primary/70">Required for outdoor cats in many cities</td></tr>
                                        <tr><td className="p-4 font-bold text-primary">Public transport</td><td className="p-4 text-primary/70">City-specific ticket/muzzle rules</td><td className="p-4 text-primary/70">Free in a carrier</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 id="mistakes" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">The 3 Deadlines Expats Miss</h2>
                            <ul className="space-y-3">
                                <li><strong>The Hundesteuer window (2-4 weeks).</strong> Park inspectors do ask for the tax tag; late registration means back taxes plus a possible fine.</li>
                                <li><strong>The insurance waiting period.</strong> Health policies typically have a 1-3 month waiting period. Sign up while your pet is healthy, not after the first symptom, when it becomes a pre-existing condition.</li>
                                <li><strong>The 21-day rabies rule.</strong> For any cross-border trip, the rabies vaccination must be at least 21 days old. Booking Christmas travel in December with an unvaccinated pet does not work.</li>
                            </ul>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">FAQ: New Pets in Germany</h2>
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
                                <h3 className="text-2xl font-bold text-primary mb-4">Item #4 on the list: find your vet</h3>
                                <p className="mb-8 text-primary/80">
                                    The first vet visit matters most, and it goes a lot smoother when you can ask every question in English.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/new-pet-checklist-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
