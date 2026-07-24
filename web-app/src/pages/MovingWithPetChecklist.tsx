import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = 'Moving to Germany With a Dog or Cat: 2026 Entry Rules';
const ARTICLE_DESCRIPTION = 'Bringing a dog or cat to Germany? Check microchip and rabies timing, EU passport or health certificate, blood-test rules, owner travel and breed restrictions.';
const ARTICLE_URL = 'https://englishspeakinggermany.online/blog/moving-to-germany-with-pet';
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2026-07-24';

const EU_TRAVEL_RULES_URL = 'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm';
const NON_EU_ENTRY_URL = 'https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/bringing-pet-eu-non-eu-country_en';
const NON_EU_COUNTRY_LIST_URL = 'https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/listing-territories-and-non-eu-countries_en';
const GERMAN_ENTRY_GUIDANCE_URL = 'https://www.bmel.de/EN/topics/animals/pets-and-zoo-animals/pets-entry-regulation.html';
const TRAVELLERS_POINTS_OF_ENTRY_URL = 'https://food.ec.europa.eu/animals/movement-pets/travellers-points-entry_en';

const articleSchema = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const tableOfContents = [
    { id: 'choose-route', label: '1. Choose the Correct Route' },
    { id: 'identity-rabies', label: '2. Microchip and Rabies Timing' },
    { id: 'documents', label: '3. Passport or Health Certificate' },
    { id: 'titration', label: '4. Rabies Blood-Test Route' },
    { id: 'owner-number', label: '5. Owner Travel and Pet Numbers' },
    { id: 'germany-checks', label: '6. Germany-Specific Checks' },
];

const routeCards = [
    {
        title: 'EU country or Northern Ireland',
        tone: 'bg-green-50 border-green-200',
        badge: 'EU ROUTE',
        badgeClass: 'bg-green-200 text-green-900',
        points: [
            'Use a valid European pet passport for a dog, cat or ferret.',
            'The passport must identify the animal and document a valid rabies vaccination.',
            'If an authorised person travels with the pet, the owner’s movement must remain within the permitted five-day window.',
        ],
    },
    {
        title: 'Listed non-EU country or territory',
        tone: 'bg-blue-50 border-blue-200',
        badge: 'NO TITRATION ROUTE',
        badgeClass: 'bg-blue-200 text-blue-900',
        points: [
            'Check the current European Commission list before relying on this route.',
            'A compliant animal health certificate is normally required, unless a specific passport exception applies.',
            'A rabies antibody titration test is not required solely because the journey starts in a currently listed country or territory.',
        ],
    },
    {
        title: 'Other non-EU country or territory',
        tone: 'bg-orange-50 border-orange-200',
        badge: 'TITRATION ROUTE',
        badgeClass: 'bg-orange-200 text-orange-900',
        points: [
            'The pet needs the identification, rabies vaccination and certificate requirements that apply to non-EU entry.',
            'A rabies antibody titration test from a designated laboratory is also required.',
            'The blood-sample and waiting timetable must be completed before the certificate is issued and before travel.',
        ],
    },
];

const officialSources = [
    { href: EU_TRAVEL_RULES_URL, label: 'Official EU pet travel rules' },
    { href: NON_EU_ENTRY_URL, label: 'European Commission non-EU entry guide' },
    { href: NON_EU_COUNTRY_LIST_URL, label: 'Official non-EU country list' },
    { href: GERMAN_ENTRY_GUIDANCE_URL, label: 'German federal entry guidance' },
];

const checklist = [
    {
        title: 'Confirm the journey type',
        text: 'Record the origin country, any transit countries, the German entry point, who accompanies the pet, and whether ownership will change.',
    },
    {
        title: 'Scan the identification',
        text: 'Have the veterinarian scan the microchip and verify that its number matches every passport, vaccination record, laboratory report and certificate.',
    },
    {
        title: 'Audit the rabies timeline',
        text: 'Confirm whether the vaccination is primary or a continuous booster, whether 21 days are required, and whether a titration test and 90-day interval apply.',
    },
    {
        title: 'Use the current certificate route',
        text: 'Ask the competent authority or official veterinarian which certificate model applies on the planned issue and entry dates.',
    },
    {
        title: 'Check German restrictions',
        text: 'Verify the traveller point of entry, dangerous-dog rules, and any destination-state requirements before transport is booked.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Must a dog or cat be microchipped before its rabies vaccination?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'For the rabies vaccination to support EU pet travel, the vaccination date must not precede the microchip implantation or reading date. A clearly readable tattoo applied before 3 July 2011 can qualify under the legacy exception.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can a puppy or kitten younger than 15 weeks enter Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Germany does not accept a young dog, cat or ferret that is not vaccinated against rabies or is not yet fully immune. A primary rabies vaccination can be given from 12 weeks and normally requires at least 21 days before travel, which produces an approximate 15-week earliest date.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do pets entering from every non-EU country need a rabies blood test?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. The European Commission maintains a list of non-EU countries and territories whose pet movements do not require a rabies antibody titration test. Other origins normally require the test and its timing conditions.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does a pet have to travel on the same flight as its owner?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Not necessarily. An authorised person may accompany the pet, but the owner must travel within five days before or after the pet and the required written declaration must accompany the documents.',
            },
        },
    ],
};

export default function MovingWithPetChecklist() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta name="keywords" content="moving to Germany with pet, bringing dog to Germany, bringing cat to Germany, pet relocation Germany, Germany pet entry rules 2026, EU animal health certificate Germany" />
                <meta property="og:title" content={ARTICLE_TITLE} />
                <meta property="og:description" content={ARTICLE_DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={ARTICLE_URL} />
                <link rel="canonical" href={ARTICLE_URL} />
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
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
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            2026 Pet Entry Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            Moving to Germany With a Dog or Cat: 2026 Entry Rules
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-primary/60 mb-8">
                            <span>Last verified: 24 July 2026</span>
                            <span className="hidden sm:inline" aria-hidden="true">·</span>
                            <span className="italic">Rules below cover non-commercial movement of dogs, cats and ferrets.</span>
                        </div>

                        <TableOfContents items={tableOfContents} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-3 bg-accent/5 rounded-r-lg text-xl">
                                The correct checklist depends on where the journey starts. An EU passport route, a listed non-EU route and a rabies-titration route are not interchangeable.
                            </p>

                            <div className="bg-white p-5 rounded-xl border border-primary/10 my-6 not-prose">
                                <p className="font-bold text-primary mb-3">Current official guidance</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {officialSources.map((source) => (
                                        <a
                                            key={source.href}
                                            href={source.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center text-accent-ink font-bold underline underline-offset-4"
                                        >
                                            {source.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <h2 id="choose-route" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                1. Start with the country your journey begins in
                            </h2>
                            <p>
                                These routes apply to private movement without a sale or transfer of ownership. Adoption, rehoming, sale, unaccompanied transport, or movement that does not meet the owner-travel conditions can fall under different animal-health rules.
                            </p>

                            <div className="space-y-5 my-6 not-prose">
                                {routeCards.map((route) => (
                                    <section key={route.title} className={`p-5 md:p-6 rounded-xl border ${route.tone}`}>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                            <h3 className="font-bold text-xl text-primary">{route.title}</h3>
                                            <span className={`self-start text-xs font-bold px-2 py-1 rounded-full ${route.badgeClass}`}>
                                                {route.badge}
                                            </span>
                                        </div>
                                        <ul className="space-y-2 text-sm text-primary/80">
                                            {route.points.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>

                            <h2 id="identity-rabies" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                2. Microchip and rabies timing
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-white border border-primary/10 p-6 rounded-xl">
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent-ink mb-2">Identification first</p>
                                    <h3 className="font-bold text-primary mb-2">Match the vaccine to the pet</h3>
                                    <p className="text-sm text-primary/75">
                                        The rabies vaccination date must not precede the microchip implantation or reading date. A clearly readable tattoo applied before 3 July 2011 is the limited legacy alternative.
                                    </p>
                                </div>
                                <div className="bg-white border border-primary/10 p-6 rounded-xl">
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent-ink mb-2">Primary vaccination</p>
                                    <h3 className="font-bold text-primary mb-2">Allow at least 21 days</h3>
                                    <p className="text-sm text-primary/75">
                                        The pet must be at least 12 weeks old for its primary rabies vaccination. At least 21 days must then pass before travel. A booster given before the previous vaccination expires maintains continuity and does not restart that primary-vaccination wait.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-200 p-5 rounded-xl my-6 not-prose">
                                <p className="font-bold text-red-900 mb-2">Germany’s young-animal rule</p>
                                <p className="text-sm text-red-900/80">
                                    Germany does not accept a young dog, cat or ferret that is not yet fully protected against rabies. The 12-week vaccination age plus the primary 21-day wait produces an approximate earliest travel age of 15 weeks, but the exact record and vaccine validity still need to be checked.
                                </p>
                            </div>

                            <h2 id="documents" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                3. Use the correct passport or health certificate
                            </h2>
                            <div className="overflow-x-auto my-6 not-prose rounded-xl border border-primary/10 bg-white">
                                <table className="min-w-[640px] w-full text-sm">
                                    <thead>
                                        <tr className="bg-primary text-secondary">
                                            <th className="text-left p-3 font-bold">Journey</th>
                                            <th className="text-left p-3 font-bold">Main document</th>
                                            <th className="text-left p-3 font-bold">Key check</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border-b border-primary/10 font-bold">EU or Northern Ireland</td>
                                            <td className="p-3 border-b border-primary/10">European pet passport</td>
                                            <td className="p-3 border-b border-primary/10">Identity and rabies entries remain valid</td>
                                        </tr>
                                        <tr className="bg-secondary/40">
                                            <td className="p-3 border-b border-primary/10 font-bold">Most non-EU origins</td>
                                            <td className="p-3 border-b border-primary/10">EU animal health certificate plus declaration</td>
                                            <td className="p-3 border-b border-primary/10">Issued or endorsed by the competent authority and used within its entry-validity window</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold">Specific passport exceptions</td>
                                            <td className="p-3">Qualifying passport</td>
                                            <td className="p-3">Country, passport model and health entries satisfy the current exception</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p>
                                Under the current 2026 rules, the non-EU animal health certificate uses the model linked by the European Commission and is generally valid for 10 days from official issue to the entry identity and document check. Sea travel can extend that period by the voyage duration.
                            </p>
                            <p>
                                There is a live certificate transition: Annex IV certificates issued before 1 October 2026 remain valid for non-commercial entry under the Commission’s transition rule. Use the model supplied by the competent authority on the actual issue date rather than downloading an old form from an article.
                            </p>

                            <h2 id="titration" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                4. When the rabies antibody test is required
                            </h2>
                            <p>
                                Check the current official non-EU country list. If the origin is not covered by the listed-country exemption, the rabies antibody titration route normally requires:
                            </p>
                            <ul>
                                <li>a blood sample collected by an authorised veterinarian at least 30 days after the primary rabies vaccination, or during a continuously valid vaccination series;</li>
                                <li>a result of at least 0.5 IU/ml from a designated laboratory;</li>
                                <li>the official laboratory report attached to the animal health certificate; and</li>
                                <li>the sample collected no less than 90 days before the certificate is issued.</li>
                            </ul>
                            <p>
                                A satisfactory test generally does not need repeating when every later rabies booster is administered before the previous vaccination expires. A specific re-entry exception can also remove the 90-day wait when the test was completed and recorded before an EU-resident pet left the EU.
                            </p>

                            <h2 id="owner-number" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                5. Owner travel, authorised persons and pet numbers
                            </h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-4">
                                <div>
                                    <h3 className="font-bold text-primary mb-1">The owner can travel separately within five days</h3>
                                    <p className="text-sm text-primary/75">
                                        An authorised person can accompany the pet when the owner travels within five days before or after the pet and the required written declaration is carried.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-1">Missing the five-day condition changes the rule set</h3>
                                    <p className="text-sm text-primary/75">
                                        A longer gap does not automatically make the movement commercial. It means the simplified non-commercial owner-linked route no longer applies, so the competent authority must identify the animal-health conditions for that movement.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-1">The ordinary maximum is five pets</h3>
                                    <p className="text-sm text-primary/75">
                                        More than five dogs, cats or ferrets can use the event exception only when they are over six months old and documented for a competition, exhibition, sporting event, or training for such an event. Otherwise, a different entry rule set applies.
                                    </p>
                                </div>
                            </div>

                            <h2 id="germany-checks" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                6. Germany-specific checks before booking
                            </h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-5">
                                {checklist.map((step, index) => (
                                    <div key={step.title} className="flex items-start gap-4">
                                        <span className="bg-accent text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="font-bold text-primary">{step.title}</p>
                                            <p className="text-primary/70 text-sm mt-1">{step.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 my-8 not-prose">
                                <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-primary mb-2">Travellers’ point of entry</h3>
                                    <p className="text-sm text-primary/75 mb-3">
                                        A pet arriving from a non-EU origin generally needs the designated entry and identity-check route, subject to defined country exceptions.
                                    </p>
                                    <a
                                        href={TRAVELLERS_POINTS_OF_ENTRY_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-11 items-center font-bold text-accent-ink underline underline-offset-4"
                                    >
                                        EU travellers’ points of entry
                                    </a>
                                </div>
                                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-primary mb-2">Dangerous-dog restrictions</h3>
                                    <p className="text-sm text-primary/75 mb-3">
                                        Germany has a separate federal import restriction for specific breeds and crosses, plus destination-state keeping rules.
                                    </p>
                                    <Link
                                        to="/blog/breed-restrictions-germany"
                                        className="inline-flex min-h-11 items-center font-bold text-accent-ink underline underline-offset-4"
                                    >
                                        Germany breed-restriction guide
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">Birds, rabbits, reptiles and other pets</h3>
                                <p className="text-sm text-primary/80">
                                    The passport and rabies workflow above is specific to dogs, cats and ferrets. Other species follow national and species-specific conditions, so check Germany’s current rules and any transit-country requirements separately.
                                </p>
                            </div>

                            <div className="bg-white border-l-4 border-primary/30 p-6 rounded-xl my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">Entry-information notice</h3>
                                <p className="text-sm text-primary/70">
                                    This guide is general information, not an entry clearance. Origin, transit, ownership transfer, animal count, vaccination history and species can change the applicable route. Confirm the final checklist with the competent authority and official veterinarian before travel.
                                </p>
                            </div>

                            <div className="not-prose">
                                <Link
                                    to="/"
                                    className="inline-flex min-h-11 items-center justify-center bg-accent text-white px-6 py-3 rounded-lg font-bold hover:bg-primary transition-colors"
                                >
                                    Find an English-speaking vet in Germany
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-primary mt-16 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4 my-8 not-prose">
                            {faqSchema.mainEntity.map((question) => (
                                <details key={question.name} className="bg-white rounded-xl border border-primary/5 shadow-sm p-5 group">
                                    <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                                        {question.name}
                                        <span className="text-accent transition-transform group-open:rotate-45 shrink-0" aria-hidden="true">+</span>
                                    </summary>
                                    <p className="text-primary/70 text-sm mt-3 leading-relaxed">
                                        {question.acceptedAnswer.text}
                                    </p>
                                </details>
                            ))}
                        </div>

                        <RelatedPosts currentPath="/blog/moving-to-germany-with-pet" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
