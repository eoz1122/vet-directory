import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = 'Banned Dog Breeds in Germany: State Rules (2026)';
const ARTICLE_DESCRIPTION = 'Which dog breeds are banned or restricted in Germany? Compare state rules, permits, muzzle requirements, and the Wesenstest before moving with your dog.';
const ARTICLE_URL = 'https://englishspeakinggermany.online/blog/breed-restrictions-germany';
const DATE_PUBLISHED = '2026-04-28';
const DATE_MODIFIED = '2026-07-24';

const FEDERAL_IMPORT_LAW_URL = 'https://www.gesetze-im-internet.de/hundverbreinfg/__2.html';
const FEDERAL_EXCEPTIONS_URL = 'https://www.gesetze-im-internet.de/hundverbreinfvo/__2.html';
const CUSTOMS_GUIDANCE_URL = 'https://www.zoll.de/DE/Privatpersonen/Reisen/Rueckkehr-aus-einem-Nicht-EU-Staat/Einschraenkungen/Gefaehrliche-Hunde/gefaehrliche_hunde.html';
const CUSTOMS_STATE_RULES_URL = 'https://www.zoll.de/DE/Privatpersonen/Reisen/Reisen-nach-Deutschland-aus-einem-nicht-eu-Staat/Einschraenkungen/Gefaehrliche-Hunde/regelungen_bundeslaender.html';
const BERLIN_RULES_URL = 'https://www.berlin.de/sen/verbraucherschutz/aufgaben/hundehaltung/artikel.1485419.php';
const HAMBURG_PERMIT_URL = 'https://www.hamburg.de/service/info/11256423/n0/';
const HAMBURG_RULES_URL = 'https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/themen/verbraucherschutz/tiere/hundegesetz/hundegesetz-53038';
const BAVARIA_BREED_RULES_URL = 'https://www.gesetze-bayern.de/Content/Document/BayHundAgressV/True';
const BAVARIA_PERMIT_LAW_URL = 'https://www.gesetze-bayern.de/Content/Document/BayLStVG-37';

const articleSchema = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const federalImportBreeds = [
    'Pitbull Terrier',
    'American Staffordshire Terrier',
    'Staffordshire Bull Terrier',
    'Bull Terrier',
];

const tableOfContents = [
    { id: 'two-rule-layers', label: '1. Federal and State Rules' },
    { id: 'federal-import-rule', label: '2. Federal Import Restriction' },
    { id: 'limited-exceptions', label: '3. Limited Federal Exceptions' },
    { id: 'state-examples', label: '4. Berlin, Hamburg and Bavaria' },
    { id: 'moving-checklist', label: '5. Before You Travel' },
];

const officialSources = [
    { href: FEDERAL_IMPORT_LAW_URL, label: 'Federal import restriction law' },
    { href: FEDERAL_EXCEPTIONS_URL, label: 'Federal exceptions regulation' },
    { href: CUSTOMS_GUIDANCE_URL, label: 'German Customs guidance' },
    { href: CUSTOMS_STATE_RULES_URL, label: 'German Customs state overview' },
];

const destinationRules = [
    {
        name: 'Berlin',
        label: 'REGULATED',
        panelClass: 'bg-yellow-50 border-yellow-200',
        badgeClass: 'bg-yellow-200 text-yellow-900',
        sourceHref: BERLIN_RULES_URL,
        sourceLabel: 'Berlin dangerous-dog rules',
        points: [
            'Berlin lists Pitbull Terrier, American Staffordshire Terrier, Bull Terrier and crosses of those breeds as dangerous by breed.',
            'The holding must be reported to the district Ordnungsamt immediately. Berlin then requires a certificate of conduct within three weeks and proof of expertise, liability insurance and a Wesenstest within eight weeks.',
            'Breed-listed dogs are subject to a muzzle requirement from seven months old. A positive Wesenstest does not remove that breed-based muzzle requirement.',
            'Staffordshire Bull Terrier is covered by the federal import restriction even though it is not named on Berlin’s current breed-based list.',
        ],
    },
    {
        name: 'Hamburg',
        label: 'EXCEPTIONAL PERMIT',
        panelClass: 'bg-red-50 border-red-200',
        badgeClass: 'bg-red-200 text-red-900',
        sourceHref: HAMBURG_PERMIT_URL,
        sourceLabel: 'Hamburg dangerous-dog permit',
        secondarySourceHref: HAMBURG_RULES_URL,
        secondarySourceLabel: 'Hamburg dog rules',
        points: [
            'American Pit Bull Terrier, American Staffordshire Terrier, Staffordshire Bull Terrier, Bull Terrier and their crosses always count as dangerous under Hamburg rules.',
            'Keeping such a dog is generally prohibited. An exceptional permit must be obtained before keeping the dog and requires a special interest plus supporting evidence.',
            'Hamburg also names additional breeds whose dangerousness is presumed. For that second group, an official exemption may be possible after a passed Wesenstest.',
        ],
    },
    {
        name: 'Bavaria',
        label: 'TWO CATEGORIES',
        panelClass: 'bg-orange-50 border-orange-200',
        badgeClass: 'bg-orange-200 text-orange-900',
        sourceHref: BAVARIA_BREED_RULES_URL,
        sourceLabel: 'Bavaria breed regulation',
        secondarySourceHref: BAVARIA_PERMIT_LAW_URL,
        secondarySourceLabel: 'Bavaria permit law',
        points: [
            'Bavaria’s first category always presumes fighting-dog status for Pit Bull, Bandog, American Staffordshire Terrier, Staffordshire Bull Terrier, Tosa Inu and their crosses.',
            'Its second category includes Bull Terrier, Rottweiler and other named breeds. For an individual dog, the owner can present evidence to the competent authority to rebut that presumption.',
            'Keeping a dog that legally counts as a Kampfhund requires municipal permission under Article 37. The authority assesses the claimed special interest, reliability and public-safety risk.',
        ],
    },
];

const movingChecklist = [
    {
        title: 'Identify the exact breed or cross',
        text: 'Collect the pedigree, adoption record, chip details and any official breed assessment. A casual visual guess is not a safe basis for border travel.',
    },
    {
        title: 'Check the federal border rule',
        text: 'If you will cross into Germany, check the federal import law first. A local holding permit or Wesenstest does not automatically make a federally restricted import legal.',
    },
    {
        title: 'Check the destination authority',
        text: 'Ask the Ordnungsamt or other competent authority where the dog will live which state and municipal requirements apply to that individual dog.',
    },
    {
        title: 'Get written confirmation before travel',
        text: 'Confirm the lawful route and required original documents with Customs and the destination authority before booking transport. Do not rely on a general article or an informal assurance.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Which dog breeds are banned from being brought into Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Federal law generally prohibits bringing Pitbull Terriers, American Staffordshire Terriers, Staffordshire Bull Terriers, Bull Terriers and their crosses into Germany. Further breeds may be affected when the destination state presumes they are dangerous. Limited statutory exceptions exist.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are the import rule and state keeping rules the same?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Federal law controls bringing affected dogs into Germany. State and sometimes municipal law controls whether and under what conditions a dog may be kept at the destination. Both layers must be checked.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does a Wesenstest allow me to import a restricted dog?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Not automatically. A Wesenstest can matter under a specific state procedure, but it does not by itself cancel the federal import restriction. Confirm the individual case with Customs and the destination authority before travel.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can a visitor bring a restricted dog to Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The federal exceptions regulation includes a limited temporary-stay exception for an accompanied dog whose handler does not reside in Germany and will stay no longer than four weeks. Required proof must be available, and state rules still need to be checked.',
            },
        },
    ],
};

export default function BreedRestrictionsGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta name="keywords" content="breed restrictions germany, banned dog breeds germany, kampfhunde germany, wesenstest germany, dangerous dog breeds germany expat" />
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
                            Relocation and Dog-Law Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            Banned and Restricted Dog Breeds in Germany (2026)
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-primary/60 mb-8">
                            <span>Last verified: 24 July 2026</span>
                            <span className="hidden sm:inline" aria-hidden="true">·</span>
                            <span className="italic">Check the authorities again before every border crossing or move.</span>
                        </div>

                        <TableOfContents items={tableOfContents} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-3 bg-accent/5 rounded-r-lg text-xl">
                                Germany has a federal rule for bringing certain dogs across the border and separate state rules for keeping dogs after arrival. You must clear both legal layers before travelling.
                            </p>

                            <div className="bg-red-50 border border-red-200 p-5 rounded-xl my-6 not-prose">
                                <p className="font-bold text-red-900 mb-2">Do not travel on an assumption</p>
                                <p className="text-sm text-red-900/80">
                                    A state permit, a positive Wesenstest, or lawful ownership abroad does not automatically make a federally restricted import legal. Confirm the individual case with German Customs and the authority at the destination before travel.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-primary/10 my-6 not-prose">
                                <p className="font-bold text-primary mb-3">Official federal sources</p>
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

                            <h2 id="two-rule-layers" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                1. Federal import rules and state keeping rules are separate
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-white border border-primary/10 p-6 rounded-xl">
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent-ink mb-2">Crossing into Germany</p>
                                    <h3 className="font-bold text-primary mb-2">Federal law comes first</h3>
                                    <p className="text-sm text-primary/75">
                                        The federal HundVerbrEinfG controls import and movement into Germany. Its restriction applies at the national border, including movement from another EU country.
                                    </p>
                                </div>
                                <div className="bg-white border border-primary/10 p-6 rounded-xl">
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent-ink mb-2">Keeping the dog</p>
                                    <h3 className="font-bold text-primary mb-2">The destination state comes next</h3>
                                    <p className="text-sm text-primary/75">
                                        Each state defines its own dangerous-dog categories, permits and public-control rules. Municipal procedures can add another practical step.
                                    </p>
                                </div>
                            </div>

                            <p>
                                This distinction corrects a common misunderstanding: Germany does have a federal breed list for import, even though there is no single nationwide breed list governing how dogs are kept inside every state.
                            </p>

                            <h2 id="federal-import-rule" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                2. The federal import restriction
                            </h2>
                            <p>
                                Section 2 of the federal law generally prohibits bringing the following breeds, their crosses with one another, and their crosses with other dogs into Germany:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3 my-6 not-prose">
                                {federalImportBreeds.map((breed) => (
                                    <div key={breed} className="flex min-h-12 items-center gap-3 bg-red-50 border border-red-100 px-4 py-3 rounded-lg">
                                        <span aria-hidden="true">⚠️</span>
                                        <span className="font-bold text-sm text-red-900">{breed}</span>
                                    </div>
                                ))}
                            </div>
                            <p>
                                The law can also affect additional breeds when the destination state presumes those dogs are dangerous. German Customs publishes a state overview, but the destination authority should confirm the current classification and the documents required for the individual dog.
                            </p>

                            <h2 id="limited-exceptions" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                3. Limited federal exceptions
                            </h2>
                            <p>The federal exceptions regulation covers defined situations, including:</p>
                            <ul>
                                <li>specified service, assistance, guide, rescue and disaster-response dogs;</li>
                                <li>a dog returning after a temporary trip abroad to a German location where it may lawfully be kept; and</li>
                                <li>an accompanied dog visiting with a non-resident handler for no longer than four weeks.</li>
                            </ul>
                            <p>
                                An exception is not a general relocation route. Carry the required original evidence and confirm the case before travel. The destination’s state and municipal rules remain relevant.
                            </p>

                            <h2 id="state-examples" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                4. Verified examples: Berlin, Hamburg and Bavaria
                            </h2>
                            <p>
                                These examples show why one national quick-reference table is unsafe. The named breeds, legal categories, tests and permit effects differ materially.
                            </p>

                            <div className="space-y-5 my-6 not-prose">
                                {destinationRules.map((destination) => (
                                    <section
                                        key={destination.name}
                                        className={`p-5 md:p-6 rounded-xl border ${destination.panelClass}`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                            <h3 className="font-bold text-xl text-primary">{destination.name}</h3>
                                            <span className={`self-start text-xs font-bold px-2 py-1 rounded-full ${destination.badgeClass}`}>
                                                {destination.label}
                                            </span>
                                        </div>
                                        <ul className="space-y-3 text-sm text-primary/80 mb-4">
                                            {destination.points.map((point) => (
                                                <li key={point} className="pl-1">{point}</li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                                            <a
                                                href={destination.sourceHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-11 items-center font-bold text-accent-ink underline underline-offset-4"
                                            >
                                                {destination.sourceLabel}
                                            </a>
                                            {destination.secondarySourceHref ? (
                                                <a
                                                    href={destination.secondarySourceHref}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex min-h-11 items-center font-bold text-accent-ink underline underline-offset-4"
                                                >
                                                    {destination.secondarySourceLabel}
                                                </a>
                                            ) : null}
                                        </div>
                                    </section>
                                ))}
                            </div>

                            <h2 id="moving-checklist" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                5. What to do before moving or travelling
                            </h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-5">
                                {movingChecklist.map((step, index) => (
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

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">What a local vet can and cannot do</h3>
                                <p className="text-sm text-primary/80">
                                    A vet can help with identification records, microchip details and health documents. The vet does not replace Customs, the Ordnungsamt, or written legal permission for import or keeping.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 not-prose">
                                <Link to="/vets/berlin" className="inline-flex min-h-11 items-center justify-center bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                    English-speaking vets in Berlin
                                </Link>
                                <Link to="/vets/hamburg" className="inline-flex min-h-11 items-center justify-center bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                    English-speaking vets in Hamburg
                                </Link>
                                <Link to="/vets/munich" className="inline-flex min-h-11 items-center justify-center bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                    English-speaking vets in Munich
                                </Link>
                            </div>

                            <div className="bg-white border-l-4 border-primary/30 p-6 rounded-xl my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">Legal information notice</h3>
                                <p className="text-sm text-primary/70">
                                    This guide is general information, not legal advice or an individual clearance decision. Breed identification, crossbreed status, journey type, destination and permit history can change the result. Confirm your case with German Customs and the competent destination authority before travelling or acquiring a dog.
                                </p>
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

                        <RelatedPosts currentPath="/blog/breed-restrictions-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
