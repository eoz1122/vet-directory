import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = 'Moving to Germany With a Pit Bull: Restricted Dog Guide (2026)';
const ARTICLE_DESCRIPTION = 'Moving to Germany with a Pit Bull or restricted dog? Check federal import bans, exceptions, EU, UK and US paperwork, transit, airlines, and state rules.';
const ARTICLE_URL = 'https://englishspeakinggermany.online/blog/moving-to-germany-with-restricted-dog';
const DATE_PUBLISHED = '2026-09-10';
const DATE_MODIFIED = '2026-09-10';

const FEDERAL_IMPORT_LAW_URL = 'https://www.gesetze-im-internet.de/hundverbreinfg/__2.html';
const FEDERAL_EXCEPTIONS_URL = 'https://www.gesetze-im-internet.de/hundverbreinfvo/__2.html';
const CUSTOMS_GUIDANCE_URL = 'https://www.zoll.de/DE/Privatpersonen/Reisen/Rueckkehr-aus-einem-Nicht-EU-Staat/Einschraenkungen/Gefaehrliche-Hunde/gefaehrliche_hunde.html';
const CUSTOMS_STATE_RULES_URL = 'https://www.zoll.de/DE/Privatpersonen/Reisen/Reisen-nach-Deutschland-aus-einem-nicht-eu-Staat/Einschraenkungen/Gefaehrliche-Hunde/regelungen_bundeslaender.html';
const EU_PET_TRAVEL_URL = 'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm';
const EU_COUNTRY_LIST_URL = 'https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/listing-territories-and-non-eu-countries_en';
const EU_ENTRY_POINTS_URL = 'https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/travellers-points-entry_en';
const EU_TRAVEL_FAQ_URL = 'https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/faqs_en';
const UK_HEALTH_CERTIFICATE_URL = 'https://www.gov.uk/taking-your-pet-abroad/getting-an-animal-health-certificate';
const USDA_GERMANY_URL = 'https://www.aphis.usda.gov/pet-travel/us-to-another-country-export/pet-travel-us-germany';

const articleSchema = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const tableOfContents = [
    { id: 'federal-gate', label: '1. Federal Breed Gate' },
    { id: 'origin-route', label: '2. EU, UK, US and Other Origins' },
    { id: 'transit-carrier', label: '3. Transit Countries and Airlines' },
    { id: 'destination-decision', label: '4. Destination Approval' },
    { id: 'go-no-go', label: '5. Final Go or No-Go File' },
];

const namedFederalBreeds = [
    'Pit Bull Terrier',
    'American Staffordshire Terrier',
    'Staffordshire Bull Terrier',
    'Bull Terrier',
];

const originRoutes = [
    {
        title: 'EU country or Northern Ireland',
        tone: 'bg-green-50 border-green-200',
        summary: 'Use the current EU pet-passport route and verify the microchip and rabies entries. Passing the animal-health check does not override Germany’s separate breed restriction.',
        linkHref: EU_PET_TRAVEL_URL,
        linkLabel: 'EU pet travel rules',
    },
    {
        title: 'Great Britain',
        tone: 'bg-blue-50 border-blue-200',
        summary: 'A resident travelling from England, Scotland or Wales normally needs a new animal health certificate for each EU entry. The official veterinarian, certificate timing and owner-travel conditions still sit behind the German breed gate.',
        linkHref: UK_HEALTH_CERTIFICATE_URL,
        linkLabel: 'Great Britain animal health certificate',
    },
    {
        title: 'United States',
        tone: 'bg-orange-50 border-orange-200',
        summary: 'Follow the current APHIS Germany workflow. It ordinarily involves an accredited veterinarian and USDA endorsement of the applicable EU health certificate. Do not begin that paid process until German breed eligibility is clear.',
        linkHref: USDA_GERMANY_URL,
        linkLabel: 'USDA Germany pet travel steps',
    },
    {
        title: 'Other non-EU country',
        tone: 'bg-purple-50 border-purple-200',
        summary: 'Check the Commission’s current country list to determine whether rabies titration applies, obtain the correct health certificate, and use a designated travellers’ point of entry when required.',
        linkHref: EU_COUNTRY_LIST_URL,
        linkLabel: 'EU non-EU country list',
    },
];

const decisionFile = [
    {
        title: 'Breed identity evidence',
        text: 'Collect the pedigree, registration, adoption, microchip and veterinary records that identify the dog. A visual guess or an airline booking is not a legal classification.',
    },
    {
        title: 'Written federal answer',
        text: 'Ask German Customs about the specific dog, journey purpose, origin and proposed exception. Save the response with the exact travel facts you supplied.',
    },
    {
        title: 'Written destination answer',
        text: 'Ask the competent Ordnungsamt or other named authority whether the dog may be kept at the exact destination and which permit, insurance, muzzle or test rules apply.',
    },
    {
        title: 'Animal-health file',
        text: 'Keep the microchip, rabies, passport or certificate, titration result when required, owner declaration and entry-point plan together.',
    },
    {
        title: 'Transit and carrier confirmations',
        text: 'Record every country where the dog may enter, clear immigration or leave the secure transit area. Obtain the operating carrier’s acceptance for the exact breed and crate.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Can I move permanently to Germany with a Pit Bull?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Germany’s federal law generally prohibits bringing Pit Bull Terriers and the other three named breeds, including their crosses, into Germany. An ordinary permanent relocation is not a general exception. Ask German Customs for a written decision about the specific dog and facts before booking.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does the four-week visitor exception allow a permanent move?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. The statutory exception is limited to a dog accompanied by a person who is not resident in Germany and whose stay will not exceed four weeks. It is not a permanent relocation route, and documentary and destination-state requirements still apply.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is a Rottweiler federally banned from Germany?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A Rottweiler is not one of the four breeds named in the first federal prohibition. However, the federal law also reaches additional dogs whose dangerousness is presumed under the law of the German state where they will be kept, so the destination rules and documentary exception must be checked.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does a temperament test make a restricted import legal?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Not automatically. A Wesenstest can affect a particular state keeping procedure, but it does not by itself cancel the federal import prohibition. Federal import eligibility and destination keeping permission are separate decisions.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can an airline approve a dog that Germany will not admit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Carrier acceptance concerns transport, not legal admission. Airline acceptance does not make the import legal, and a legally eligible dog can still be refused by a carrier or transit country.',
            },
        },
    ],
};

export default function RestrictedDogMoveGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta name="keywords" content="moving to Germany with pit bull, bringing restricted dog to Germany, Germany dog import ban, move American Staffordshire Terrier Germany, restricted breed relocation Germany" />
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
                            Restricted-Dog Relocation Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            Moving to Germany With a Pit Bull or Restricted Dog (2026)
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-primary/80 mb-8">
                            <span>Last verified: 10 September 2026</span>
                            <span className="hidden sm:inline" aria-hidden="true">·</span>
                            <span className="italic">Reviewed periodically. Reconfirm every authority before booking.</span>
                        </div>

                        <p className="border-l-4 border-accent pl-6 py-4 mb-8 bg-accent/5 rounded-r-lg text-xl text-primary/85">
                            If your dog is a Pit Bull Terrier, American Staffordshire Terrier, Staffordshire Bull Terrier, Bull Terrier, or a cross, moving one of the four federally named breeds permanently to Germany is generally prohibited. Normal pet paperwork, airline acceptance, or a temperament test does not override the federal rule. Limited statutory exceptions exist, but the four-week visitor exception is not a permanent relocation route.
                        </p>

                        <TableOfContents items={tableOfContents} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <div className="bg-red-50 border border-red-200 p-6 rounded-xl my-8 not-prose">
                                <h2 className="font-bold text-red-950 text-xl mb-2">Do not book non-refundable transport yet</h2>
                                <p className="text-sm text-red-950/80">
                                    Resolve the federal breed question first. Then check the destination state, every transit country, the operating carrier, and the separate animal-health route. Approval at one gate does not approve the others.
                                </p>
                            </div>

                            <h2 id="federal-gate" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                1. Check Germany's federal breed gate before booking
                            </h2>
                            <p>
                                Section 2 of Germany's Dog Movement and Import Restriction Act names four breeds and their crosses in its first prohibition:
                            </p>
                            <ul>
                                {namedFederalBreeds.map((breed) => <li key={breed}>{breed}</li>)}
                            </ul>
                            <p>
                                The law also covers additional breeds and crosses when dangerousness is presumed under the law of the German state where the dog will be kept. That is why a dog outside the four-name list can still require a destination-specific decision.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                                <a href={FEDERAL_IMPORT_LAW_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-white border border-primary/10 rounded-xl px-4 font-bold text-accent-ink underline underline-offset-4">
                                    Federal import restriction law
                                </a>
                                <a href={FEDERAL_EXCEPTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-white border border-primary/10 rounded-xl px-4 font-bold text-accent-ink underline underline-offset-4">
                                    Federal exceptions regulation
                                </a>
                                <a href={CUSTOMS_GUIDANCE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-white border border-primary/10 rounded-xl px-4 font-bold text-accent-ink underline underline-offset-4">
                                    German Customs breed guidance
                                </a>
                                <a href={CUSTOMS_STATE_RULES_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-white border border-primary/10 rounded-xl px-4 font-bold text-accent-ink underline underline-offset-4">
                                    German Customs state overview
                                </a>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">Rottweilers require a destination check</h3>
                                <p className="text-sm text-primary/80">
                                    A Rottweiler is not one of the four breeds named in the first federal prohibition. State classification can still bring the second federal rule into play. Get the competent destination authority's answer before treating the dog as eligible.
                                </p>
                            </div>

                            <h2 id="origin-route" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                2. Match your origin to the animal-health route
                            </h2>
                            <p>
                                Breed eligibility and animal-health compliance are cumulative. A valid passport or certificate cannot cure a breed prohibition, while a breed-eligible dog can still fail the microchip, rabies, certificate or entry-point requirements.
                            </p>

                            <div className="grid md:grid-cols-2 gap-5 my-6 not-prose">
                                {originRoutes.map((route) => (
                                    <section key={route.title} className={`p-5 rounded-xl border ${route.tone}`}>
                                        <h3 className="font-bold text-primary text-lg mb-2">{route.title}</h3>
                                        <p className="text-sm text-primary/80 mb-4">{route.summary}</p>
                                        <a href={route.linkHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-accent-ink underline underline-offset-4">
                                            {route.linkLabel}
                                        </a>
                                    </section>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 my-8 not-prose">
                                <Link to="/blog/moving-to-germany-with-pet" className="inline-flex min-h-11 items-center justify-center bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-accent transition-colors">
                                    Germany pet entry checklist
                                </Link>
                                <a href={EU_ENTRY_POINTS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center bg-white border border-primary/15 text-primary px-5 py-2.5 rounded-lg font-bold text-sm hover:border-accent transition-colors">
                                    EU travellers’ points of entry
                                </a>
                            </div>

                            <h2 id="transit-carrier" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                3. Check every transit country and carrier separately
                            </h2>
                            <p>
                                Do not assume that an airside connection removes national breed rules. Ask the relevant transit authority what happens if the dog changes terminals, clears immigration, is collected during disruption, or must leave the secure area. For a road journey, check every country crossed.
                            </p>
                            <p>
                                Ask the operating carrier, not only the booking website, whether it accepts the exact breed, crossbreed description, crate and route. Airline acceptance does not make the import legal, and government permission does not force a carrier to transport the dog.
                            </p>
                            <a href={EU_TRAVEL_FAQ_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-accent-ink underline underline-offset-4 not-prose">
                                European Commission pet-travel FAQ
                            </a>

                            <h2 id="destination-decision" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                4. Get the destination decision in writing
                            </h2>
                            <p>
                                Federal import rules answer whether the dog may be brought into Germany. State and municipal rules answer whether the dog may be kept at the destination and under which conditions. Send the authority the breed documents, destination address, ownership history and intended arrival route, then retain its written answer.
                            </p>
                            <p>
                                A landlord, veterinarian, breeder, rescue, relocation company or airline cannot replace the competent authority. A local vet can help verify the microchip and health records, but cannot grant import or keeping permission.
                            </p>

                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 my-8 not-prose">
                                <Link to="/blog/breed-restrictions-germany" className="inline-flex min-h-11 items-center justify-center bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                    German breed rules explained
                                </Link>
                                <Link to="/vets/berlin" className="inline-flex min-h-11 items-center justify-center bg-white border border-primary/15 px-5 py-2.5 rounded-lg font-bold text-sm hover:border-accent transition-colors">
                                    English-speaking vets in Berlin
                                </Link>
                                <Link to="/vets/hamburg" className="inline-flex min-h-11 items-center justify-center bg-white border border-primary/15 px-5 py-2.5 rounded-lg font-bold text-sm hover:border-accent transition-colors">
                                    English-speaking vets in Hamburg
                                </Link>
                                <Link to="/vets/munich" className="inline-flex min-h-11 items-center justify-center bg-white border border-primary/15 px-5 py-2.5 rounded-lg font-bold text-sm hover:border-accent transition-colors">
                                    English-speaking vets in Munich
                                </Link>
                            </div>

                            <h2 id="go-no-go" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                5. Build the final go or no-go file
                            </h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-5">
                                {decisionFile.map((step, index) => (
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

                            <div className="bg-white border-l-4 border-primary/30 p-6 rounded-xl my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">Entry-information notice</h3>
                                <p className="text-sm text-primary/70">
                                    This guide is general information, not an entry clearance or individual legal advice. Origin, transit, ownership transfer, animal count, health history, breed evidence and destination can change the result. Confirm the final route with German Customs, the destination authority and the official veterinarian before travel.
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
                                    <p className="text-primary/70 text-sm mt-3 leading-relaxed">{question.acceptedAnswer.text}</p>
                                </details>
                            ))}
                        </div>

                        <RelatedPosts currentPath="/blog/moving-to-germany-with-restricted-dog" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
