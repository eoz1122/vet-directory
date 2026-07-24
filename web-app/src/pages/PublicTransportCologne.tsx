import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Dogs on Cologne Public Transport: KVB Rules (2026)';
const DESCRIPTION = 'Taking a dog on Cologne public transport? Check 2026 KVB and VRS rules for free travel, short leashes, muzzles, seats, carriers and assistance dogs.';
const URL = 'https://englishspeakinggermany.online/blog/public-transport-with-dogs-cologne';

const SOURCE_URLS = {
    kvbFaq: 'https://www.kvb.koeln/abos-und-tickets/faq.html',
    nrwConditions: 'https://www.vrs.de/fileadmin/01_Tickets/Downloads_und_Informationen/NRW_Befoerderungsbedingungen_01072026.pdf',
    vrsTariff: 'https://www.vrs.de/tickets/tarifbestimmungen-rheinlandtarif',
    cologneDogRules: 'https://www.stadt-koeln.de/leben-in-koeln/umwelt-tiere/74472/index.html',
} as const;

const TABLE_OF_CONTENTS = [
    { id: 'free-travel', label: 'Dogs Travel Free' },
    { id: 'leash', label: 'Leash and Supervision' },
    { id: 'muzzle', label: 'Muzzle Rules' },
    { id: 'seats-carriers', label: 'Seats, Carriers and Assistance Dogs' },
    { id: 'crowding', label: 'Crowding and Staff Instructions' },
    { id: 'outside-nrw', label: 'Travel Outside NRW' },
    { id: 'vet-trip', label: 'Travelling to a Vet' },
    { id: 'sources', label: 'Official Sources' },
    { id: 'faq', label: 'FAQ' },
];

const FAQS = [
    {
        q: 'Does a dog need a ticket on KVB in Cologne?',
        a: 'No. KVB states that dogs travel free, and the current NRW transport conditions allow animals to be carried without charge when safety, order, and other passengers are not adversely affected.',
    },
    {
        q: 'Does a dog have to be on a leash on Cologne public transport?',
        a: 'Yes. A dog must be supervised by a suitable person and kept on a short leash. Follow any additional instruction given by transport staff.',
    },
    {
        q: 'Does every dog need a muzzle on KVB?',
        a: 'No. Under the NRW transport conditions, a dog that could endanger other passengers must wear a muzzle. Separate NRW and Cologne rules can require dangerous dogs and dogs of specified breeds to wear one unless an official exemption applies.',
    },
    {
        q: 'Can my dog sit on a KVB seat?',
        a: 'No. Dogs must not occupy seats. Other animals may travel only in suitable containers, and those containers must not block seats.',
    },
    {
        q: 'Can KVB refuse to carry a dog?',
        a: 'Yes. There is no automatic right to take an animal. Carriage depends on safety and order not being endangered and other passengers not being bothered. Transport staff make operational decisions and their instructions must be followed.',
    },
];

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2026-05-05',
    '2026-07-23',
);

const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
};

const OTHER_CITY_GUIDES = [
    { city: 'Berlin', path: '/blog/public-transport-with-dogs-berlin' },
    { city: 'Hamburg', path: '/blog/public-transport-with-dogs-hamburg' },
    { city: 'Munich', path: '/blog/public-transport-with-dogs-munich' },
    { city: 'Frankfurt', path: '/blog/public-transport-with-dogs-frankfurt' },
    { city: 'Stuttgart', path: '/blog/public-transport-with-dogs-stuttgart' },
];

const ExternalSourceLink = ({
    href,
    children,
}: {
    href: string;
    children: string;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-ink font-bold hover:underline"
    >
        {children}
    </a>
);

export default function PublicTransportCologne() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="dogs Cologne public transport, KVB dog rules, VRS dogs free, KVB leash muzzle, Hund KVB Köln, dog tram Cologne" />
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

                    <article className="lg:flex-1 max-w-4xl min-w-0">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Verified Cologne Transport Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4 leading-tight">
                            {TITLE}
                        </h1>
                        <p className="text-sm text-primary/60 mb-8">
                            Published May 5, 2026 · Reviewed July 23, 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-lg text-xl">
                                Dogs travel free on KVB and throughout the VRS. You need a valid ticket for yourself, but there is no separate dog ticket for Cologne buses, trams, or Stadtbahn services.
                            </p>
                            <p className="mt-6">
                                Free travel does not mean unconditional travel. The NRW transport conditions require safe, considerate handling and allow operational decisions by transport staff. This guide separates those official conditions from optional comfort advice.
                            </p>

                            <h2 id="free-travel" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                1. Dogs Travel Free
                            </h2>
                            <p>
                                KVB&apos;s current FAQ states that dogs are carried free of charge. The NRW conditions that apply in the VRS likewise allow animals to travel without charge when their carriage does not endanger safety or order and does not bother other passengers.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
                                <div className="bg-white p-5 rounded-2xl border border-primary/10">
                                    <p className="text-xs font-bold uppercase tracking-wider text-primary/50 mb-2">Passenger</p>
                                    <p className="font-bold text-primary">Valid ticket required</p>
                                </div>
                                <div className="bg-accent/5 p-5 rounded-2xl border border-accent/20">
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent-ink mb-2">Dog</p>
                                    <p className="font-bold text-primary">No separate dog ticket</p>
                                </div>
                            </div>
                            <p>
                                This corrects a common misunderstanding: a child ticket is not the standard dog fare in Cologne. Do not buy an extra ticket solely because you are travelling with a dog on KVB or within the VRS.
                            </p>

                            <h2 id="leash" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                2. Use a Short Leash and Suitable Supervision
                            </h2>
                            <p>
                                Under the NRW conditions, every dog must be supervised by a suitable person and kept on a short leash. The leash and the handler must keep the dog under control around doors, platforms, other passengers, mobility aids, and other animals.
                            </p>
                            <ul className="space-y-3 my-6">
                                <li>Keep the dog close instead of allowing it to cross the aisle or doorway.</li>
                                <li>Do not block doors, escape routes, wheelchair spaces, or priority areas.</li>
                                <li>Follow instructions from KVB or other transport staff, including a request to move or leave if safe carriage is not possible.</li>
                            </ul>
                            <p>
                                There is no automatic right to take an animal. Carriage can be refused when safety or operational order would be endangered or other passengers would be bothered.
                            </p>

                            <h2 id="muzzle" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                3. When a Muzzle Is Required
                            </h2>
                            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl my-8 not-prose">
                                <p className="font-bold text-yellow-900 mb-2">The transport rule is based on risk</p>
                                <p className="text-sm text-yellow-900/80 leading-relaxed">
                                    The NRW conditions require a muzzle when a dog could endanger other passengers. Size alone does not create a KVB muzzle requirement.
                                </p>
                            </div>
                            <p>
                                Separate state and city dog law also matters. Dangerous dogs and dogs of specified breeds generally have leash and muzzle duties in public unless an official exemption applies. Cologne advises handlers who have an exemption to carry the proof and show it on request.
                            </p>
                            <p>
                                A &quot;large dog&quot; classification under NRW law is not the same as a dangerous-dog classification and does not automatically create a muzzle duty. If you are unsure how your dog is classified, verify it with Cologne&apos;s public-order office before travelling.
                            </p>
                            <Link
                                to="/blog/breed-restrictions-germany"
                                className="font-bold text-accent-ink hover:underline"
                            >
                                Read the Germany breed-restrictions guide
                            </Link>

                            <h2 id="seats-carriers" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                4. Seats, Other Animals and Assistance Dogs
                            </h2>
                            <div className="space-y-4 my-8 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <h3 className="font-bold text-primary mb-2">Dogs stay off seats</h3>
                                    <p className="text-sm text-primary/70">
                                        Dogs must not occupy seats. Position the dog safely on the floor without blocking the aisle or doors.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <h3 className="font-bold text-primary mb-2">Cats and other animals</h3>
                                    <p className="text-sm text-primary/70">
                                        Other animals may travel only in suitable containers, and the containers must not occupy seats.
                                    </p>
                                </div>
                                <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20">
                                    <h3 className="font-bold text-primary mb-2">Assistance dogs</h3>
                                    <p className="text-sm text-primary/70">
                                        Assistance dogs accompanying a disabled person, including guide dogs, are always admitted under the NRW transport conditions.
                                    </p>
                                </div>
                            </div>

                            <h2 id="crowding" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                5. Crowding and Staff Instructions
                            </h2>
                            <p>
                                KVB does not publish a special peak-hour dog ban in the sources reviewed for this guide. Quieter travel can still be more comfortable, especially for a nervous, recovering, or easily overwhelmed dog, but it is a practical choice rather than a separate ticket or timetable rule.
                            </p>
                            <p>
                                Capacity and conditions can change during disruptions or crowded service. Keep clear of priority space and follow staff instructions. If the dog is distressed or safe control is no longer possible, leave at the next safe stop and reassess the journey.
                            </p>

                            <h2 id="outside-nrw" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                6. Travel Outside NRW
                            </h2>
                            <p>
                                A Deutschlandticket does not create one nationwide animal rule. Dogs travel free within NRW, including KVB and VRS services, but outside NRW local rules may differ. Check the transport operator for every region on a longer trip before boarding.
                            </p>
                            <p>
                                This guide covers local and regional public transport under the NRW and VRS conditions. Long-distance IC, EC, and ICE services use separate Deutsche Bahn rules.
                            </p>

                            <h2 id="vet-trip" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                7. Travelling to a Vet
                            </h2>
                            <p>
                                Plan the route and transfers before leaving, and confirm that your dog can board, stand, and travel without worsening an injury or illness. Use a suitable secure carrier for cats and other small animals. For an unstable animal or urgent symptoms, call the clinic before travelling and follow its transport advice.
                            </p>
                            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl my-8 not-prose">
                                <p className="font-bold text-red-900 mb-2">Public transport is not emergency transport</p>
                                <p className="text-sm text-red-900/80 leading-relaxed">
                                    Collapse, severe breathing difficulty, uncontrolled bleeding, seizures, or rapid deterioration require immediate veterinary triage. Tell the clinic your location and ask how to transport the animal safely.
                                </p>
                            </div>
                            <Link
                                to="/vets/cologne"
                                className="not-prose inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold text-secondary transition-colors hover:bg-black"
                            >
                                English-speaking vets in Cologne
                            </Link>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official Sources
                            </h2>
                            <ul className="space-y-4">
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.kvbFaq}>
                                        Official KVB dog-travel FAQ
                                    </ExternalSourceLink>
                                    {' '}for free dog travel on KVB and within NRW.
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.nrwConditions}>
                                        Official NRW transport conditions effective July 2026
                                    </ExternalSourceLink>
                                    {' '}for animal carriage, short leashes, muzzles, seats, containers, and assistance dogs.
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.vrsTariff}>
                                        Official VRS tariff information
                                    </ExternalSourceLink>
                                    {' '}for the current regional conditions and tariff documents.
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.cologneDogRules}>
                                        Official Cologne dog and muzzle rules
                                    </ExternalSourceLink>
                                    {' '}for city guidance on dangerous dogs, specified breeds, leashes, muzzles, and exemptions.
                                </li>
                            </ul>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-5 not-prose">
                                {FAQS.map((faq) => (
                                    <section key={faq.q} className="bg-white p-6 rounded-2xl border border-primary/10">
                                        <h3 className="font-bold text-primary mb-2">{faq.q}</h3>
                                        <p className="text-sm text-primary/70 leading-relaxed">{faq.a}</p>
                                    </section>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3 not-prose mt-12">
                                <span className="text-sm text-primary/60">Other city transport guides:</span>
                                {OTHER_CITY_GUIDES.map(({ city, path }) => (
                                    <Link key={city} to={path} className="text-sm text-accent-ink underline hover:text-primary">
                                        {city}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/public-transport-with-dogs-cologne" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
