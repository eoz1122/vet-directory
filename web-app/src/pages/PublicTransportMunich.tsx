import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Dogs on Munich Public Transport: MVV Rules (2026)';
const DESCRIPTION = 'Taking a dog on Munich public transport? Check 2026 MVV ticket, leash and muzzle rules for U-Bahn, S-Bahn, trams, buses and the Deutschlandticket.';
const URL = 'https://englishspeakinggermany.online/blog/public-transport-with-dogs-munich';
const MVV_RULES_URL = 'https://www.mvv-muenchen.de/en/tickets-subscriptions-prices/all-about-tickets/tariff-structure/carry-on-baggage-rules/';
const MVV_CONDITIONS_URL = 'https://www.mvv-muenchen.de/en/tickets-subscriptions-prices/all-about-tickets/tariff-structure/conditions-of-carriage-and-fare-rules/';
const MVV_FLEX_URL = 'https://www.mvv-muenchen.de/en/vernetzte-mobilitaet/on-demand-services-ods/flex-line-1/';
const DB_DOG_RULES_URL = 'https://www.bahn.de/angebot/zusatzticket/hund';
const DB_DEUTSCHLANDTICKET_URL = 'https://int.bahn.de/en/faq/deutschlandticket-dogs';
const MUNICH_DANGEROUS_DOGS_URL = 'https://stadt.muenchen.de/service/en-GB/info/hauptabteilung-i-sicherheit-und-ordnung-pravention/10423889/';

const tableOfContents = [
    { id: 'ticket-rules', label: 'Does Your Dog Need a Ticket?' },
    { id: 'leash-muzzle', label: 'Leash, Muzzle and Exclusions' },
    { id: 'transport-types', label: 'U-Bahn, S-Bahn, Tram and Bus' },
    { id: 'deutschlandticket', label: 'Deutschlandticket and Travel Beyond MVV' },
    { id: 'flex', label: 'MVV FLEX Exception' },
    { id: 'checklist', label: 'Before You Travel' },
    { id: 'faq', label: 'Frequently Asked Questions' },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Do dogs need a ticket on Munich public transport?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'One dog travels free when the accompanying passenger has a valid MVV ticket or Deutschlandticket. Each additional dog needs a child ticket unless it can travel in a basket or bag.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does my dog need a muzzle on Munich public transport?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'MVV requires dogs to be kept on a lead in vehicles and in S-Bahn and U-Bahn stations. A muzzle is required if the dog presents a risk to passengers. Dangerous dogs are not permitted.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does the Deutschlandticket include a dog in Munich?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Within the MVV fare area, one dog may travel free with a valid Deutschlandticket. Outside MVV, the local transport association or train operator sets the dog rule, and the Deutschlandticket does not automatically cover a dog that requires a fare.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can dogs use MVV FLEX?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Dogs are generally not permitted on MVV FLEX. The official exceptions are guide dogs, assistance dogs and dogs carried in a suitable carrier. State the requirement when booking.',
            },
        },
    ],
};

const articleSchema = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2025-01-01',
    '2026-07-23',
);

export default function PublicTransportMunich() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            Dogs on Munich Public Transport: MVV Rules (2026)
                        </h1>
                        <p className="text-sm font-semibold text-primary/70 mb-8">
                            Official rules reviewed 23 July 2026
                        </p>

                        <TableOfContents items={tableOfContents} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-lg text-xl">
                                The main Munich rule is simple: your first dog is included with your own valid ticket. Extra dogs, safety requirements and travel outside the MVV fare area need more attention.
                            </p>

                            <h2 id="ticket-rules" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                Does Your Dog Need an MVV Ticket?
                            </h2>
                            <p>
                                One dog travels free when you have a valid MVV ticket or Deutschlandticket. This is the current MVV rule for the fare area, not a special benefit limited to a monthly pass.
                            </p>
                            <p>
                                Additional dogs need a child ticket unless they travel in a basket or bag. Check the current child fare for the zones in your journey instead of relying on an old fixed price.
                            </p>

                            <div className="overflow-x-auto not-prose my-6">
                                <table className="w-full min-w-[34rem] text-left border-collapse bg-white rounded-xl shadow-sm border border-primary/10">
                                    <thead>
                                        <tr className="bg-primary/5">
                                            <th className="p-4 border border-primary/10">Situation</th>
                                            <th className="p-4 border border-primary/10">Current MVV rule</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-primary/80">
                                        <tr>
                                            <td className="p-4 border border-primary/10 font-semibold">Passenger with one dog</td>
                                            <td className="p-4 border border-primary/10">Dog travels free with the passenger's valid MVV ticket or Deutschlandticket</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border border-primary/10 font-semibold">Each additional dog</td>
                                            <td className="p-4 border border-primary/10">Child ticket required unless the dog travels in a basket or bag</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border border-primary/10 font-semibold">Dog in a basket or bag</td>
                                            <td className="p-4 border border-primary/10">No additional dog ticket required</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="not-prose bg-white p-5 rounded-xl border border-primary/10 text-sm text-primary/80">
                                <strong>Source:</strong>{' '}
                                <a href={MVV_RULES_URL} target="_blank" rel="noopener noreferrer" className="text-accent-ink font-bold hover:underline">
                                    Read the official MVV rule
                                </a>
                            </p>

                            <h2 id="leash-muzzle" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                Leash, Muzzle and Exclusions
                            </h2>
                            <p>
                                Dogs must be kept on a lead on MVV vehicles and in S-Bahn and U-Bahn stations. They must wear a muzzle if there is a risk to passengers. The published rule does not create a blanket muzzle requirement based only on a dog's size or the time of day.
                            </p>
                            <p>
                                MVV excludes dogs classified as dangerous from its vehicles. If your dog may fall under Bavaria's fighting-dog categories, check the official Munich classification before travelling.
                            </p>
                            <p className="not-prose bg-amber-50 border border-amber-200 p-5 rounded-xl text-sm text-amber-950">
                                <strong>Practical precaution:</strong> Bring a suitable muzzle even when you do not expect to use it. Staff can respond to the circumstances on board, and avoiding a dispute is safer for your dog and other passengers.
                            </p>
                            <p>
                                <a href={MUNICH_DANGEROUS_DOGS_URL} target="_blank" rel="noopener noreferrer" className="text-accent-ink font-bold hover:underline">
                                    Munich's official dangerous-dog categories
                                </a>
                            </p>

                            <h2 id="transport-types" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                U-Bahn, S-Bahn, Tram and Bus
                            </h2>
                            <p>
                                The published MVV carriage rule applies across vehicles in the network, including Munich's U-Bahn, S-Bahn, trams and regular buses. Keep the dog close, do not block doors or aisles, and follow staff instructions if a vehicle is crowded.
                            </p>
                            <p>
                                The binding 2026 conditions cover the operators participating in the MVV joint fare. For an unusual service or a route operated by another company, check the journey details before boarding.
                            </p>
                            <p>
                                <a href={MVV_CONDITIONS_URL} target="_blank" rel="noopener noreferrer" className="text-accent-ink font-bold hover:underline">
                                    Read the binding MVV conditions
                                </a>
                            </p>

                            <h2 id="deutschlandticket" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                Deutschlandticket and Travel Beyond MVV
                            </h2>
                            <p>
                                Within the MVV fare area, one dog travels free with a valid Deutschlandticket. This local exception applies even if the Deutschlandticket was purchased from a provider outside the MVV network.
                            </p>
                            <p>
                                Do not assume that rule follows you beyond MVV. Deutsche Bahn states that the Deutschlandticket does not automatically include a dog that is subject to a fare. The relevant regional tariff or train operator decides what ticket the dog needs.
                            </p>
                            <p>
                                On DB trains, small dogs and other small pets up to the size of a domestic cat can travel free in a suitable closed carrier. Larger dogs generally need a dog ticket and must be leashed and muzzled. Check the specific connection because regional offers and other operators can differ.
                            </p>
                            <div className="not-prose flex flex-col sm:flex-row gap-3 my-6">
                                <a href={DB_DEUTSCHLANDTICKET_URL} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center justify-center px-5 py-3 rounded-xl border border-primary/15 bg-white text-primary font-bold hover:border-accent transition-colors">
                                    Deutschlandticket dog limits
                                </a>
                                <a href={DB_DOG_RULES_URL} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center justify-center px-5 py-3 rounded-xl border border-primary/15 bg-white text-primary font-bold hover:border-accent transition-colors">
                                    Check DB dog ticket and carrier rules
                                </a>
                            </div>

                            <h2 id="flex" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                MVV FLEX Is an Exception
                            </h2>
                            <p>
                                MVV FLEX is an on-demand minibus service, not an ordinary bus. On MVV FLEX, dogs are generally not permitted. The official exceptions are guide dogs, assistance dogs and dogs carried in a suitable carrier. State the requirement when booking so an appropriate vehicle can be assigned.
                            </p>
                            <p>
                                <a href={MVV_FLEX_URL} target="_blank" rel="noopener noreferrer" className="text-accent-ink font-bold hover:underline">
                                    Read the MVV FLEX rules
                                </a>
                            </p>

                            <h2 id="checklist" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                Before You Travel
                            </h2>
                            <ul className="space-y-2">
                                <li>Carry your own valid ticket and buy child-fare tickets for additional dogs that are not in a basket or bag.</li>
                                <li>Use a secure lead and bring a properly fitted muzzle.</li>
                                <li>Check whether the whole journey stays inside the MVV fare area.</li>
                                <li>Review the operator's rules before using regional, long-distance or on-demand services.</li>
                                <li>Allow extra time so you can wait for a less crowded vehicle if your dog becomes stressed.</li>
                            </ul>

                            <h2 id="faq" className="text-2xl font-bold text-primary mt-12 mb-6 scroll-mt-24">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4 not-prose">
                                {faqSchema.mainEntity.map((item) => (
                                    <details key={item.name} className="bg-white rounded-xl border border-primary/10 shadow-sm p-5 group">
                                        <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                                            {item.name}
                                            <span className="text-accent group-open:rotate-45 transition-transform shrink-0">+</span>
                                        </summary>
                                        <p className="text-primary/80 text-sm mt-3 leading-relaxed">{item.acceptedAnswer.text}</p>
                                    </details>
                                ))}
                            </div>

                            <section className="not-prose bg-primary text-secondary p-8 rounded-2xl my-14">
                                <h2 className="text-3xl font-bold text-accent mt-0 mb-4">Need veterinary care in Munich?</h2>
                                <p className="text-lg leading-relaxed mb-6">
                                    Browse local practices with community-confirmed English support, then confirm language availability when booking.
                                </p>
                                <Link
                                    to="/vets/munich"
                                    aria-label="English-speaking vets in Munich"
                                    className="min-h-11 inline-flex items-center justify-center px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:bg-secondary hover:text-accent transition-colors"
                                >
                                    Browse Munich vets
                                </Link>
                            </section>

                            <section className="text-sm text-primary/70 mt-12 not-prose">
                                <h2 className="font-bold text-primary mb-4 text-lg">Official sources</h2>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><a href={MVV_RULES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink underline">Official MVV dog carriage rules</a></li>
                                    <li><a href={MVV_CONDITIONS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink underline">Official MVV 2026 fare conditions</a></li>
                                    <li><a href={MVV_FLEX_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink underline">Official MVV FLEX dog rules</a></li>
                                    <li><a href={DB_DOG_RULES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink underline">Deutsche Bahn dog travel rules</a></li>
                                    <li><a href={MUNICH_DANGEROUS_DOGS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink underline">Munich's official dangerous-dog categories</a></li>
                                </ul>
                            </section>
                        </div>

                        <RelatedPosts currentPath="/blog/public-transport-with-dogs-munich" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
