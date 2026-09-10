import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = 'Restricted Dog Laws by Country: Germany, UK and US (2026)';
const ARTICLE_DESCRIPTION = 'Moving with a Pit Bull or other restricted dog? Compare Germany, UK and US breed-law checks, official sources and a safe pre-travel workflow.';
const ARTICLE_URL = 'https://englishspeakinggermany.online/blog/restricted-dog-laws-by-country';
const DATE_PUBLISHED = '2026-09-10';
const DATE_MODIFIED = '2026-09-10';

const GERMANY_IMPORT_LAW_URL = 'https://www.gesetze-im-internet.de/hundverbreinfg/__2.html';
const GERMANY_EXCEPTIONS_URL = 'https://www.gesetze-im-internet.de/hundverbreinfvo/__2.html';
const GERMANY_CUSTOMS_URL = 'https://www.zoll.de/DE/Privatpersonen/Reisen/Reisen-nach-Deutschland-aus-einem-nicht-eu-Staat/Einschraenkungen/Gefaehrliche-Hunde/regelungen_bundeslaender.html';
const UK_BANNED_DOGS_URL = 'https://www.gov.uk/control-dog-public/banned-dogs';
const UK_PET_ENTRY_URL = 'https://www.gov.uk/bring-pet-to-great-britain';
const CDC_DOG_ENTRY_URL = 'https://www.cdc.gov/importation/dogs/index.html';
const CDC_LAWS_URL = 'https://www.cdc.gov/importation/laws-regulations/index.html';
const USDA_GERMANY_URL = 'https://www.aphis.usda.gov/pet-travel/us-to-another-country-export/pet-travel-us-germany';

const articleSchema = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const tableOfContents = [
    { id: 'start-with-destination', label: '1. Start with the destination and transit countries' },
    { id: 'germany', label: '2. Germany: federal import law plus state keeping rules' },
    { id: 'united-kingdom', label: '3. United Kingdom: banned types and exemption evidence' },
    { id: 'united-states', label: '4. United States: health entry plus state and local checks' },
    { id: 'safe-workflow', label: '5. Build a safe pre-travel file' },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Is there one global banned-breed list?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Germany, the United Kingdom and the United States use different legal layers and definitions. Check the destination, every transit country and the carrier separately before booking.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are Germany and the UK using the same restricted-dog rules?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Germany has a federal import law with named breeds and additional state-law provisions. Great Britain has banned dog types and a Certificate of Exemption route. You need the rules for the country where the dog will enter and live.',
            },
        },
        {
            '@type': 'Question',
            name: 'Are Pit Bulls banned everywhere in the United States?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Do not treat the United States as one breed-law jurisdiction. Current CDC federal entry guidance focuses on health and documentation, while the CDC also directs travelers to comply with state or territory rules. Confirm the exact destination city, county and state.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do a microchip, rabies certificate and airline booking prove a restricted dog can enter?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Those documents address animal-health or transport steps. They do not replace a destination authority decision about breed restrictions, exemptions, permits or keeping conditions.',
            },
        },
    ],
};

const comparisonCards = [
    {
        title: 'Germany',
        tone: 'bg-green-50 border-green-200',
        summary: 'Start with the federal import gate. Four named breeds and their crosses are covered by the first prohibition, while other dogs can be affected by the law of the state where they will be kept.',
        links: [
            { href: GERMANY_IMPORT_LAW_URL, label: 'Germany federal import law' },
            { href: GERMANY_EXCEPTIONS_URL, label: 'Germany exceptions regulation' },
            { href: GERMANY_CUSTOMS_URL, label: 'German Customs state overview' },
        ],
    },
    {
        title: 'United Kingdom',
        tone: 'bg-blue-50 border-blue-200',
        summary: 'Great Britain uses banned dog types, judged by appearance rather than the name on a document. A banned dog cannot enter unless it already has a valid Certificate of Exemption, and entry paperwork is a separate step.',
        links: [
            { href: UK_BANNED_DOGS_URL, label: 'UK banned-dog rules' },
            { href: UK_PET_ENTRY_URL, label: 'UK pet-entry steps' },
        ],
    },
    {
        title: 'United States',
        tone: 'bg-orange-50 border-orange-200',
        summary: 'Use the current CDC entry pathway for health, age, microchip and documentation. Then check state, county and city rules for the exact destination. This is a jurisdiction-by-jurisdiction check, not a single national breed answer.',
        links: [
            { href: CDC_DOG_ENTRY_URL, label: 'CDC dog-entry requirements' },
            { href: CDC_LAWS_URL, label: 'CDC laws and state-rule guidance' },
            { href: USDA_GERMANY_URL, label: 'USDA Germany pet travel steps' },
        ],
    },
];

const workflow = [
    {
        title: '1. Identify the legal destination',
        text: 'Write down the country, state or Land, county, municipality and planned address. A country-level answer is not enough when local keeping rules apply.',
    },
    {
        title: '2. Separate law from logistics',
        text: 'Keep breed eligibility, health certificates, border routing, transit permission and airline acceptance as separate checks. A pass at one gate does not approve the others.',
    },
    {
        title: '3. Ask for written decisions',
        text: 'Send the authority the dog’s records, route, purpose, dates and destination. Save the reply with the exact facts you supplied and note any expiry or renewal condition.',
    },
    {
        title: '4. Recheck before payment',
        text: 'Review the official pages periodically and reconfirm every authority, transit country and carrier before buying non-refundable transport.',
    },
];

function SourceLinks({ links }: { links: Array<{ href: string; label: string }> }) {
    return (
        <ul className="mt-4 space-y-2 text-sm">
            {links.map((link) => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary/80 underline decoration-accent/50 underline-offset-4 hover:text-accent"
                    >
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default function RestrictedDogLawsByCountry() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta name="keywords" content="restricted dog laws by country, pit bull banned UK US Germany, dangerous dog import rules, moving with restricted dog" />
                <meta property="og:title" content={ARTICLE_TITLE} />
                <meta property="og:description" content={ARTICLE_DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={ARTICLE_URL} />
                <link rel="canonical" href={ARTICLE_URL} />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            International Restricted-Dog Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            Restricted Dog Laws by Country: Germany, UK and US (2026)
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-primary/80 mb-8">
                            <span>Last verified: 10 September 2026</span>
                            <span className="hidden sm:inline" aria-hidden="true">·</span>
                            <span className="italic">Reviewed periodically. Reconfirm every authority before booking.</span>
                        </div>

                        <p className="border-l-4 border-accent pl-6 py-4 mb-8 bg-accent/5 rounded-r-lg text-xl text-primary/85">
                            There is no single global banned-breed list. Germany, the United Kingdom and the United States use different legal tests, definitions and authority layers. Check the destination and every transit country in writing before you book a restricted dog’s journey.
                        </p>

                        <TableOfContents items={tableOfContents} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <section id="start-with-destination">
                                <h2 className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                    1. Start with the destination and every transit country
                                </h2>
                                <p>
                                    Breed laws are territorial. A dog can meet the animal-health rules for a journey and still be refused because the destination or a transit country applies a separate restriction. Record every place where the dog will enter, clear immigration or leave a secure transit area.
                                </p>
                                <p>
                                    Do not use a breed name, an adoption label or an airline acceptance as a substitute for an authority decision. Ask the relevant government or municipal office to assess the dog, purpose, route and address you actually plan to use.
                                </p>
                            </section>

                            <section id="germany">
                                <h2 className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                    2. Germany: federal import law plus state keeping rules
                                </h2>
                                <p>
                                    Germany’s first federal prohibition covers Pit Bull Terrier, American Staffordshire Terrier, Staffordshire Bull Terrier, Bull Terrier and specified crosses. The same federal law also refers to additional dogs whose dangerousness is presumed under the law of the German state where the dog will be kept.
                                </p>
                                <p>
                                    The exceptions regulation is narrow. It includes working, guide, assistance, rescue and certain returning dogs, a limited temporary stay for a non-German resident, and a route for dogs covered by the state-law provision when lawful keeping in that Land can be shown. A normal move is not automatically approved by a passport, health certificate or temperament test.
                                </p>
                                <div className="bg-green-50 border border-green-200 p-6 rounded-xl my-6 not-prose">
                                    <h3 className="font-bold text-primary text-xl mb-2">Germany decision to save</h3>
                                    <p className="text-sm text-primary/80">Ask Customs and the destination authority for written answers about the exact dog, route, exception and address. Keep those answers beside the health and carrier file.</p>
                                    <SourceLinks links={comparisonCards[0].links} />
                                </div>
                            </section>

                            <section id="united-kingdom">
                                <h2 className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                    3. United Kingdom: banned types and exemption evidence
                                </h2>
                                <p>
                                    Great Britain lists banned dog types, including Pit Bull Terrier, Japanese Tosa, Dogo Argentino, Fila Brasileiro and XL Bully. The official test is based on what the dog looks like, not only the breed or name shown in a document. A banned dog needs a valid Certificate of Exemption before entry, and the pet-travel document and approved-route rules still apply separately.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl my-6 not-prose">
                                    <h3 className="font-bold text-primary text-xl mb-2">UK decision to save</h3>
                                    <p className="text-sm text-primary/80">Check the banned-type rules first. If an exemption exists, carry the certificate and confirm the current Great Britain pet-entry route before travel.</p>
                                    <SourceLinks links={comparisonCards[1].links} />
                                </div>
                            </section>

                            <section id="united-states">
                                <h2 className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                    4. United States: health entry plus state and local checks
                                </h2>
                                <p>
                                    The current CDC federal dog-entry pathway focuses on health, age, microchip and documentation, with additional requirements based on rabies risk and vaccination history. The CDC also directs travelers to comply with the destination state or territory’s regulations.
                                </p>
                                <p>
                                    That means there is no safe one-line national answer for a Pit Bull or another restricted dog travelling to the United States. Check the destination state, county and city, plus state or local rules for housing and insurance, before treating the federal health pathway as permission to keep the dog.
                                </p>
                                <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl my-6 not-prose">
                                    <h3 className="font-bold text-primary text-xl mb-2">US decision to save</h3>
                                    <p className="text-sm text-primary/80">Save the CDC entry result, the USDA or veterinarian paperwork, and written state or local answers for the exact destination address.</p>
                                    <SourceLinks links={comparisonCards[2].links} />
                                </div>
                            </section>

                            <section id="safe-workflow">
                                <h2 className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                    5. Build a safe pre-travel file
                                </h2>
                                <div className="grid gap-4 not-prose">
                                    {workflow.map((step) => (
                                        <div key={step.title} className="bg-white border border-primary/10 rounded-xl p-5 shadow-sm">
                                            <h3 className="font-bold text-primary text-lg mb-2">{step.title}</h3>
                                            <p className="text-sm text-primary/80">{step.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6">
                                    For a Germany-bound journey, use the dedicated <Link className="underline decoration-accent/50 underline-offset-4" to="/blog/moving-to-germany-with-restricted-dog">Germany restricted-dog relocation checklist</Link> after you have identified the federal and destination-state decision-makers. For the wider Germany pet-entry workflow, see the <Link className="underline decoration-accent/50 underline-offset-4" to="/blog/moving-to-germany-with-pet">Germany pet-entry guide</Link>.
                                </p>
                            </section>

                            <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl my-10 not-prose">
                                <h2 className="font-bold text-amber-950 text-xl mb-2">Important: rules change</h2>
                                <p className="text-sm text-amber-950/80">This comparison is an orientation tool, not personalised legal advice. Laws and guidance can change. Recheck the official source and obtain written confirmation before you pay for transport or move the dog.</p>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/restricted-dog-laws-by-country" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
