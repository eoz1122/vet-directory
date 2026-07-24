import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = 'German Dog Etiquette: Leash Rules & Phrases (2026)';
const ARTICLE_DESCRIPTION = "Learn how to ask 'Can I pet your dog?' in German, plus current leash, off-leash, certificate, waste and venue rules for dog owners in Germany.";
const ARTICLE_URL = 'https://englishspeakinggermany.online/blog/german-dog-etiquette-rules';
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2026-07-24';

const FEDERAL_WELFARE_URL = 'https://www.gesetze-im-internet.de/tierschhuv/__2.html';
const BERLIN_DOG_LAW_URL = 'https://www.berlin.de/sen/verbraucherschutz/aufgaben/hundehaltung/artikel.1485419.php';
const HAMBURG_LEASH_URL = 'https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/themen/verbraucherschutz/tiere/hundegesetz/anleinpflicht-89206';
const LOWER_SAXONY_DOG_LAW_URL = 'https://www.ml.niedersachsen.de/startseite/themen/tiergesundheit_tierschutz/tierschutz_allgemein/informationen-zum-hundegesetz-93854.html';

const ARTICLE_SCHEMA = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const TABLE_OF_CONTENTS = [
    { id: 'quick-phrase', label: '1. How to Ask Before Petting' },
    { id: 'law-map', label: '2. Which Dog Rules Apply?' },
    { id: 'local-examples', label: '3. Berlin, Hamburg and Lower Saxony' },
    { id: 'outside', label: '4. Walks and Off-Leash Etiquette' },
    { id: 'venues', label: '5. Shops, Cafes and Transport' },
    { id: 'phrases', label: '6. Useful German Phrases' },
    { id: 'welfare', label: '7. Federal Welfare Baseline' },
    { id: 'checklist', label: '8. Before You Go Out' },
];

const LOCAL_RULE_EXAMPLES = [
    {
        place: 'Berlin',
        summary: 'Berlin has a general citywide leash duty, with defined exceptions and a possible exemption based on recognized competence. Even an exempt dog must remain leashed in several places, including public transport, shops and offices, events, and protected green areas.',
        sourceLabel: 'Official Berlin dog-law FAQ',
        sourceUrl: BERLIN_DOG_LAW_URL,
    },
    {
        place: 'Hamburg',
        summary: 'Hamburg also has a general leash duty. Dogs may run without a leash in designated exercise zones, or under the conditions of an individual exemption. Separate restrictions apply in parks, busy places, markets, festivals and other signed areas.',
        sourceLabel: 'Official Hamburg leash guidance',
        sourceUrl: HAMBURG_LEASH_URL,
    },
    {
        place: 'Lower Saxony',
        summary: 'Lower Saxony uses a different model. First-time dog owners who are not otherwise exempt generally need a competence certificate, with the theory test before taking on the dog and the practical test during the first year.',
        sourceLabel: 'Official Lower Saxony dog-law guidance',
        sourceUrl: LOWER_SAXONY_DOG_LAW_URL,
    },
];

const GERMAN_PHRASES = [
    {
        german: 'Darf ich Ihren Hund streicheln?',
        english: 'May I pet your dog? Use this polite form with someone you do not know.',
    },
    {
        german: 'Darf ich deinen Hund streicheln?',
        english: 'May I pet your dog? Use this informal form when you are already on first-name terms.',
    },
    {
        german: 'Dürfen die Hunde sich begrüßen?',
        english: 'May the dogs greet each other?',
    },
    {
        german: 'Bitte halten Sie Abstand.',
        english: 'Please keep your distance.',
    },
    {
        german: 'Mein Hund braucht Platz.',
        english: 'My dog needs space.',
    },
    {
        german: 'Ist hier Leinenpflicht?',
        english: 'Is a leash required here?',
    },
    {
        german: 'Dürfen Hunde hier rein?',
        english: 'Are dogs allowed inside?',
    },
    {
        german: 'Bitte nicht anfassen.',
        english: 'Please do not touch.',
    },
];

const BEFORE_YOU_GO = [
    'Check the current rule for the exact place, not only the federal state.',
    'Read signs at park entrances, forests, beaches, playgrounds and public buildings.',
    'Check the transport operator before travelling. Ticket, leash, muzzle and carrier rules differ.',
    'Carry waste bags and remove your dog’s waste. Local enforcement and penalties vary.',
    'Keep liability, registration and competence documents available where your local rules require them.',
    'Check federal import restrictions and the destination state’s keeping rules for your dog’s breed.',
];

export default function GermanDogEtiquette() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta property="og:title" content={ARTICLE_TITLE} />
                <meta property="og:description" content={ARTICLE_DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={ARTICLE_URL} />
                <link rel="canonical" href={ARTICLE_URL} />
                <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto px-6 py-10 md:p-12 mt-16 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-24">
                            <BlogSidebar />
                        </div>
                    </div>

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Living in Germany Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6 leading-tight">
                            German Dog Etiquette: Leash Rules and Useful Phrases
                        </h1>
                        <p className="text-sm text-primary/60 mb-10">Last verified: 24 July 2026</p>

                        <div className="bg-white/70 p-6 rounded-2xl mb-10 hidden md:block border border-primary/10">
                            <TableOfContents items={TABLE_OF_CONTENTS} />
                        </div>

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-lg text-xl">
                                Dog etiquette becomes much easier when you separate courtesy from law.
                                Germany does not have one nationwide public-space leash rule. State law,
                                municipal rules, park signs, transport conditions and venue policies can
                                all change the answer.
                            </p>

                            <h2 id="quick-phrase" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                1. How to Ask “Can I Pet Your Dog?” in German
                            </h2>
                            <div className="not-prose bg-white p-6 rounded-2xl border border-primary/10 shadow-sm">
                                <p className="text-2xl font-bold text-primary">Darf ich Ihren Hund streicheln?</p>
                                <p className="mt-2 text-primary/75">
                                    This is the polite form to use with someone you do not know. Ask the owner,
                                    wait for a clear yes, and let the dog choose whether to approach. A dog that
                                    turns away, freezes, hides or moves behind its owner is not asking to be touched.
                                </p>
                            </div>
                            <p>
                                Asking first is useful everywhere, not uniquely German. It protects children,
                                dogs in training, assistance dogs, nervous dogs, injured dogs and owners who simply
                                do not want an interaction.
                            </p>

                            <h2 id="law-map" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                2. Which Dog Rules Apply?
                            </h2>
                            <p>
                                Start with the federal welfare baseline, then check the law of the federal state,
                                the municipality or district, and the rule for the specific place. A forest,
                                city park, train platform, beach and restaurant can each have a different answer.
                            </p>
                            <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
                                {[
                                    ['Federal', 'Welfare and husbandry requirements'],
                                    ['State', 'Leash, competence, registration and dangerous-dog rules'],
                                    ['Municipality', 'Parks, seasonal protection, waste and local restrictions'],
                                    ['Place or operator', 'Signs, transport conditions and venue policy'],
                                ].map(([level, scope]) => (
                                    <div key={level} className="bg-white p-5 rounded-xl border border-primary/10">
                                        <p className="font-bold text-primary">{level}</p>
                                        <p className="mt-1 text-sm text-primary/70">{scope}</p>
                                    </div>
                                ))}
                            </div>
                            <p>
                                There is no reliable nationwide fine table. The offence, location, circumstances
                                and responsible authority matter, so a generic amount can mislead.
                            </p>

                            <h2 id="local-examples" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                3. Three Different Local Systems
                            </h2>
                            <div className="not-prose space-y-5">
                                {LOCAL_RULE_EXAMPLES.map((example) => (
                                    <section key={example.place} className="bg-white p-6 rounded-2xl border border-primary/10">
                                        <h3 className="text-xl font-bold text-primary">{example.place}</h3>
                                        <p className="mt-2 text-primary/75">{example.summary}</p>
                                        <a
                                            href={example.sourceUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center mt-3 text-accent-ink font-bold underline underline-offset-4"
                                        >
                                            {example.sourceLabel}
                                        </a>
                                    </section>
                                ))}
                            </div>
                            <p>
                                These are examples, not a substitute for checking your own location. Rules can
                                also differ for dogs officially classed as dangerous.
                            </p>

                            <h2 id="outside" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                4. Walks and Off-Leash Etiquette
                            </h2>
                            <ul>
                                <li>Use off-leash areas only where the signs or official map allow it.</li>
                                <li>Do not let your dog approach another dog or person without consent.</li>
                                <li>Recall and leash your dog when you see an on-leash dog, wildlife, livestock or a narrow path.</li>
                                <li>Do not block gates, paths, entrances or cycle lanes while dogs greet.</li>
                                <li>Carry waste bags and remove waste even when no bin is immediately available.</li>
                            </ul>
                            <div className="not-prose bg-amber-50 border border-amber-200 p-5 rounded-xl my-6">
                                <p className="font-bold text-amber-900">Seasonal wildlife rules are local</p>
                                <p className="mt-1 text-sm text-amber-900">
                                    Germany does not have one nationwide 1 April to 15 July leash season.
                                    Check the current forestry, nature-protection or municipal rule for the exact area.
                                </p>
                            </div>

                            <h2 id="venues" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                5. Shops, Cafes, Restaurants and Transport
                            </h2>
                            <p>
                                Unless an applicable rule already prohibits entry, the venue decides whether pet
                                dogs may enter. No sign is not the same as permission. Ask before walking in, keep
                                your dog out of aisles and service routes, and leave if staff asks.
                            </p>
                            <p>
                                Public-transport rules are operator-specific. Check tickets, carriers, leads,
                                muzzles and assistance-dog exceptions before the journey. The current Munich and
                                Cologne rules, for example, are not identical.
                            </p>
                            <div className="not-prose flex flex-col sm:flex-row sm:flex-wrap gap-3 my-6">
                                <Link
                                    to="/blog/public-transport-with-dogs-munich"
                                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/15 bg-white px-4 py-2 text-sm font-bold text-primary hover:border-accent"
                                >
                                    Munich dog-transport guide
                                </Link>
                                <Link
                                    to="/blog/public-transport-with-dogs-cologne"
                                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary/15 bg-white px-4 py-2 text-sm font-bold text-primary hover:border-accent"
                                >
                                    Cologne dog-transport guide
                                </Link>
                            </div>

                            <h2 id="phrases" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                6. Useful German Dog Phrases
                            </h2>
                            <div className="not-prose overflow-x-auto rounded-2xl border border-primary/10 my-6">
                                <table className="w-full min-w-[620px] border-collapse bg-white">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 text-left text-sm">German</th>
                                            <th className="p-4 text-left text-sm">Meaning and use</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/10">
                                        {GERMAN_PHRASES.map((phrase) => (
                                            <tr key={phrase.german}>
                                                <td className="p-4 font-bold text-primary">{phrase.german}</td>
                                                <td className="p-4 text-primary/75">{phrase.english}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h2 id="welfare" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                7. The Federal Welfare Baseline
                            </h2>
                            <p>
                                The federal Dog Welfare Ordinance requires sufficient outdoor exercise, contact
                                with a caregiver several times daily for an adequate duration, and regular contact
                                with other dogs unless health or incompatibility makes that unsafe. Exercise and
                                social contact must be adapted to the dog’s breed, age and health. The law does not
                                set one universal daily walk duration for every dog.
                            </p>
                            <a
                                href={FEDERAL_WELFARE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="not-prose inline-flex min-h-11 items-center text-accent-ink font-bold underline underline-offset-4"
                            >
                                Federal dog-welfare requirements
                            </a>

                            <h2 id="checklist" className="text-3xl font-bold text-primary mt-14 mb-5 scroll-mt-24">
                                8. Before You Go Out
                            </h2>
                            <div className="not-prose bg-white p-6 rounded-2xl border border-primary/10">
                                <ol className="space-y-4">
                                    {BEFORE_YOU_GO.map((item, index) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white font-bold">
                                                {index + 1}
                                            </span>
                                            <span className="pt-1 text-primary/80">{item}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="not-prose bg-accent/10 p-6 rounded-2xl border border-accent/20 mt-10">
                                <p className="font-bold text-primary">Breed rules are a separate check</p>
                                <p className="mt-1 text-primary/75">
                                    Federal import restrictions and state keeping rules are not answered by
                                    everyday etiquette or an ordinary leash exemption.
                                </p>
                                <Link
                                    to="/blog/breed-restrictions-germany"
                                    className="inline-flex min-h-11 items-center mt-3 text-accent-ink font-bold underline underline-offset-4"
                                >
                                    Check German breed restrictions
                                </Link>
                            </div>

                            <div className="not-prose mt-8">
                                <Link
                                    to="/"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-6 py-3 font-bold text-white hover:bg-primary"
                                >
                                    Find an English-speaking vet
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/german-dog-etiquette-rules" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
