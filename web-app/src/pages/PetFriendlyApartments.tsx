import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Pet-Friendly Apartments Berlin & Germany: 2026 Guide';
const DESCRIPTION = 'Find pet-friendly apartments in Berlin and Germany. Learn rental rights, landlord rules, pet resume tips, and the best districts for dog and cat owners.';
const URL = 'https://englishspeakinggermany.online/blog/pet-friendly-apartments-germany';
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2026-07-24';

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How do I find a pet-friendly apartment in Berlin?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use several search channels, keep a complete application file ready, respond quickly, and ask about the specific animal instead of relying only on a pet-friendly filter. A short factual pet profile can help a landlord assess the request.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can a German landlord ban every dog and cat?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Federal Court of Justice held in VIII ZR 168/12 that a pre-formulated lease clause categorically banning dogs and cats was invalid. The judgment does not create an automatic right to keep any animal. The lease, the animal, the property, affected neighbours, and the interests of both parties still matter.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do I need landlord consent for a dog or cat?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Read the exact lease clause and any individually negotiated agreement. If the lease requires consent, request it for the specific animal and get the answer in writing before relying on it. A tenant-advice service or lawyer can assess a disputed clause.',
            },
        },
        {
            '@type': 'Question',
            name: 'What belongs in a pet resume for a rental application?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Keep it short and factual: species, age, size, number of animals, a clear photo, training or routine information, any relevant liability-insurance evidence, and a previous landlord reference if one is genuinely available.',
            },
        },
        {
            '@type': 'Question',
            name: 'Which Berlin districts are most pet-friendly?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'There is no official district ranking for landlord acceptance. Compare each listing and lease individually, and choose a location based on your budget, commute, the animal, nearby green space, veterinary access, and applicable local dog rules.',
            },
        },
    ],
};

const TABLE_OF_CONTENTS = [
    { id: 'quick-answer', label: 'Quick answer' },
    { id: 'berlin-search', label: 'How to search in Berlin' },
    { id: 'legal-rights', label: 'What the BGH ruling means' },
    { id: 'consent', label: 'Lease and consent checklist' },
    { id: 'pet-resume', label: 'Build a pet resume' },
    { id: 'location', label: 'Choose a practical location' },
    { id: 'sources', label: 'Official sources' },
];

const SEARCH_STEPS = [
    {
        title: 'Prepare the standard housing file',
        text: 'Keep your identification, income evidence, tenant self-disclosure, SCHUFA document where applicable, and any rent-payment reference ready. Share sensitive documents only through a channel you trust.',
    },
    {
        title: 'Use several channels at once',
        text: 'Check state-owned housing companies, cooperatives, private portals, neighbourhood networks, and personal contacts. Set alerts and respond quickly, but verify the advertiser before sending money or identity documents.',
    },
    {
        title: 'Ask about the exact animal',
        text: 'A generic pet filter is not a legal decision. State the species, number, size, and relevant routine clearly, then ask whether the lease or landlord requires consent for that specific animal.',
    },
    {
        title: 'Keep the answer with the lease',
        text: 'If consent is needed, get the answer in writing. Keep the listing, application, consent, lease, and handover report together so later conversations start from the same record.',
    },
];

const PET_RESUME_ITEMS = [
    'Species, breed or type, age, size, and number of animals.',
    'A recent photo and a short description of the animal\'s normal home routine.',
    'Training information that is true and relevant, without promising that an animal can never make noise or cause damage.',
    'Applicable liability-insurance evidence, with the policy scope checked rather than assumed.',
    'A previous landlord reference only when the landlord actually provided one.',
    'A contact method and an offer to discuss reasonable, written conditions.',
];

const OFFICIAL_SOURCES = [
    {
        name: 'Federal Court judgment VIII ZR 168/12',
        href: 'https://juris.bundesgerichtshof.de/cgi-bin/bgh_notp/document.py?Art=en&Datum=2013-3-20&Gericht=bgh&Sort=3&anz=14&nr=28367&pos=6',
        note: 'The official judgment on a categorical dog-and-cat ban in a pre-formulated residential lease.',
    },
    {
        name: 'German Civil Code section 535',
        href: 'https://www.gesetze-im-internet.de/bgb/__535.html',
        note: 'The statutory starting point for contractual use of rented property.',
    },
    {
        name: 'Official Berlin apartment-search guidance',
        href: 'https://willkommenszentrum.berlin.de/wohnen/wohnungssuche',
        note: 'Current Berlin guidance on search channels, preparation, application documents, and the difficult housing market.',
    },
    {
        name: 'Official Berlin rental-contract guidance',
        href: 'https://willkommenszentrum.berlin.de/en/housing/rental-contract',
        note: 'English guidance on leases, deposits, contract types, and tenant counselling.',
    },
];

export default function PetFriendlyApartments() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="pet-friendly apartments Berlin, pet friendly apartments Germany, renting with pets Germany, German lease pets, landlord consent dog cat, pet resume apartment"
                />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 min-w-0 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Housing guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-5 leading-tight">
                            Finding Pet-Friendly Apartments in Berlin and Germany (2026)
                        </h1>
                        <p className="text-sm text-primary/55 mb-8">
                            Published 1 January 2025 · Reviewed 24 July 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-3 bg-accent/5 rounded-r-xl text-xl mb-8">
                                Berlin&apos;s official welcome centre describes the housing search as difficult and often lengthy. A pet adds another question, but the practical answer is not to hunt for a supposedly pet-friendly district. Build a complete application, read the lease, describe the specific animal, and put any required consent in writing.
                            </p>

                            <aside className="bg-white border border-primary/10 rounded-2xl p-6 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">Important legal limit</p>
                                <p className="text-sm leading-relaxed text-primary/70">
                                    This guide explains general German and Berlin sources. It is not individualized legal advice. Lease wording and facts matter. Use a tenant-advice service or qualified lawyer before acting on a disputed clause, refusal, warning, surcharge, or termination notice.
                                </p>
                            </aside>

                            <h2 id="quick-answer" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">
                                The quick answer
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
                                <section className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">Search</p>
                                    <h3 className="text-lg font-bold text-primary mb-3">Do not rely on one filter</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        Search widely and ask about the exact animal. Listings that say nothing about pets still need a lease-level answer.
                                    </p>
                                </section>
                                <section className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">Law</p>
                                    <h3 className="text-lg font-bold text-primary mb-3">No automatic yes or no</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        The BGH rejected a categorical standard dog-and-cat ban. It did not approve every animal in every home.
                                    </p>
                                </section>
                                <section className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">Record</p>
                                    <h3 className="text-lg font-bold text-primary mb-3">Put consent in writing</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        If the lease requires consent, identify the animal and keep the written answer with your contract.
                                    </p>
                                </section>
                            </div>

                            <h2 id="berlin-search" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                How to find a pet-friendly apartment in Berlin
                            </h2>
                            <p>
                                The{' '}
                                <a
                                    href="https://willkommenszentrum.berlin.de/wohnen/wohnungssuche"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    Official Berlin apartment-search guidance
                                </a>{' '}
                                recommends complete application documents, a short introduction, several search channels, alerts, quick responses, and realistic location criteria. It also says the search can take weeks or months because affordable supply is limited.
                            </p>
                            <div className="grid md:grid-cols-2 gap-5 my-8 not-prose">
                                {SEARCH_STEPS.map((step, index) => (
                                    <section key={step.title} className="bg-white border border-primary/10 rounded-2xl p-6">
                                        <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">
                                            Step {index + 1}
                                        </p>
                                        <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                                        <p className="text-sm leading-relaxed text-primary/70">{step.text}</p>
                                    </section>
                                ))}
                            </div>

                            <h2 id="legal-rights" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                What the German Federal Court ruling actually means
                            </h2>
                            <p>
                                In{' '}
                                <a
                                    href="https://juris.bundesgerichtshof.de/cgi-bin/bgh_notp/document.py?Art=en&Datum=2013-3-20&Gericht=bgh&Sort=3&anz=14&nr=28367&pos=6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    Federal Court judgment VIII ZR 168/12
                                </a>
                                , the Bundesgerichtshof held that a pre-formulated residential lease clause categorically banning dogs and cats unfairly disadvantaged the tenant and was invalid.
                            </p>
                            <div className="bg-primary text-secondary rounded-2xl p-7 my-8 not-prose">
                                <h3 className="text-xl font-bold text-accent mb-3">The limit matters</h3>
                                <p className="text-sm leading-relaxed text-secondary/85 mb-4">
                                    The ruling does not create an automatic right to keep any dog or cat. The court required an individual balancing of the relevant circumstances and interests.
                                </p>
                                <ul className="space-y-2 text-sm text-secondary/85">
                                    <li>The exact lease wording and whether a clause is standard or individually negotiated.</li>
                                    <li>The species, number, size, and behaviour of the animals.</li>
                                    <li>The apartment, building, neighbours, and legitimate interests of both parties.</li>
                                    <li>Any concrete disturbance, damage, safety issue, or special personal circumstance.</li>
                                </ul>
                            </div>
                            <p>
                                The statutory starting point is{' '}
                                <a
                                    href="https://www.gesetze-im-internet.de/bgb/__535.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    German Civil Code section 535
                                </a>
                                , which concerns the contractually agreed use of the rented property. A short article cannot determine how that rule and the judgment apply to a particular lease.
                            </p>

                            <h2 id="consent" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Lease and landlord-consent checklist
                            </h2>
                            <ol>
                                <li><strong>Read the exact lease clause.</strong> Do not rely on a portal label, agent comment, or summary.</li>
                                <li><strong>Identify the specific animal.</strong> A request should state species, number, size, and any relevant facts.</li>
                                <li><strong>Ask what document is required.</strong> The contract may distinguish consent, notification, ordinary small animals, and other animals.</li>
                                <li><strong>Get the answer in writing.</strong> Keep it with the lease instead of relying on a verbal promise.</li>
                                <li><strong>Do not accept extra terms blindly.</strong> Have an unclear pet surcharge, deposit, broad liability clause, or revocable consent reviewed before signing.</li>
                                <li><strong>Get advice before a dispute escalates.</strong> A warning or termination notice needs case-specific help, not a generic web answer.</li>
                            </ol>
                            <p>
                                Berlin&apos;s{' '}
                                <a
                                    href="https://willkommenszentrum.berlin.de/en/housing/rental-contract"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    Official Berlin rental-contract guidance
                                </a>{' '}
                                recommends written contracts and explains that the normal residential security deposit cannot exceed three months&apos; rent excluding service charges. It also points readers to multilingual counselling.
                            </p>

                            <h2 id="pet-resume" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Build a factual pet resume
                            </h2>
                            <p>
                                A pet resume is not a legal requirement and does not guarantee approval. Its purpose is narrower: help the landlord assess the actual request instead of imagining an unknown risk.
                            </p>
                            <div className="bg-white border border-primary/10 rounded-2xl p-7 my-8 not-prose">
                                <h3 className="text-xl font-bold text-primary mb-4">Keep it to one page</h3>
                                <ul className="space-y-3 text-sm leading-relaxed text-primary/70">
                                    {PET_RESUME_ITEMS.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span aria-hidden="true" className="text-accent-ink font-bold">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p>
                                Avoid absolute promises such as “never barks,” “cannot damage anything,” or “insurance covers everything.” Accurate, limited evidence is more credible and less likely to conflict with the lease or policy later.
                            </p>

                            <h2 id="location" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Choose a practical location, not a pet-friendly label
                            </h2>
                            <p>
                                No official source ranks Berlin districts by landlord acceptance of pets. Treat claims that a neighbourhood is automatically pet-friendly as marketing, not permission.
                            </p>
                            <ul>
                                <li>Set a realistic rent, commute, size, and search radius before adding pet needs.</li>
                                <li>Check nearby walking space and the rules that apply to your dog, rather than assuming every green area is off-leash.</li>
                                <li>Map routine veterinary care and an emergency option before signing.</li>
                                <li>Assess stairs, lifts, flooring, noise transmission, balconies, and shared areas for the specific animal.</li>
                                <li>Read the listing and lease individually even when another tenant in the building has a pet.</li>
                            </ul>

                            <div className="bg-primary text-secondary rounded-2xl p-8 my-12 not-prose">
                                <h3 className="text-2xl font-bold text-accent mb-3">Planning veterinary access in Berlin?</h3>
                                <p className="text-secondary/80 mb-6">
                                    Compare community-listed practices by district and confirm English availability when booking.
                                </p>
                                <Link
                                    to="/vets/berlin"
                                    className="inline-flex min-h-12 items-center justify-center px-6 py-3 bg-accent text-primary rounded-xl font-bold hover:bg-white transition-colors"
                                >
                                    Browse English-speaking vets in Berlin
                                </Link>
                            </div>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official sources
                            </h2>
                            <div className="space-y-4 not-prose">
                                {OFFICIAL_SOURCES.map((source) => (
                                    <a
                                        key={source.href}
                                        href={source.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block bg-white border border-primary/10 rounded-2xl p-6 hover:border-accent/40 transition-colors"
                                    >
                                        <span className="font-bold text-accent-ink">{source.name}</span>
                                        <span className="block text-sm text-primary/65 mt-2">{source.note}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-primary mt-16 mb-6">
                            FAQ: Pet-friendly renting in Germany
                        </h2>
                        <div className="space-y-4 my-8 not-prose">
                            {FAQ_SCHEMA.mainEntity.map((question) => (
                                <details key={question.name} className="bg-white rounded-xl border border-primary/5 shadow-sm p-5 group">
                                    <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                                        {question.name}
                                        <span className="text-accent transition-transform group-open:rotate-45 shrink-0">+</span>
                                    </summary>
                                    <p className="text-primary/70 text-sm mt-3 leading-relaxed">
                                        {question.acceptedAnswer.text}
                                    </p>
                                </details>
                            ))}
                        </div>

                        <RelatedPosts currentPath="/blog/pet-friendly-apartments-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
