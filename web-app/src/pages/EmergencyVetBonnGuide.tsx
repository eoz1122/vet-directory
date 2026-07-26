import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Bonn: Official Duty Rota and Hours (2026)';
const DESCRIPTION = 'Need an emergency vet in Bonn? Find the current rotating practice, official duty hours, patient eligibility, Cologne 24-hour fallback, warning signs, and GOT fees.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-bonn';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const BONN_ROTA_URL = 'https://www.bonner-tieraerzte.de/';
const CHAMBER_URL = 'https://www.tieraerztekammer-nordrhein.de/informationen-zum-tieraerztlichen-notdienst/';
const COLOGNE_CLINIC_URL = 'https://koelner-tierklinik.de/leistungen/notfallmedizin';
const COLOGNE_PHONE = '0221 474543911';
const COLOGNE_PHONE_HREF = 'tel:+49221474543911';
const COLOGNE_DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Tierklinik+K%C3%B6ln-S%C3%BCd+Br%C3%BChler+Stra%C3%9Fe+183-185+50968+K%C3%B6ln';
const GOT_URL = 'https://www.gesetze-im-internet.de/got_2022/__4.html';

const ARTICLE_SCHEMA = {
    ...generateArticleSchema(TITLE, DESCRIPTION, URL, DATE_PUBLISHED, DATE_MODIFIED),
    url: URL,
};

const WARNING_SIGNS = [
    'Unconsciousness or collapse',
    'Difficulty breathing',
    'Very pale or white mucous membranes',
    'Heavy or uncontrolled bleeding',
    'Repeated or prolonged seizures',
    'Sudden paralysis or coordination problems',
    'Difficulty or inability to urinate',
    'Persistent bloody vomiting or diarrhoea',
    'Eye injuries',
    'Suspected poisoning or a swallowed foreign object',
    'Heatstroke, burns, or scalds',
    'A serious traffic accident or other major injury',
];

const CALL_DETAILS = [
    ['Membership', 'Name of the Bonn rota member practice where your pet is registered'],
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Problem', 'What happened, when it began, and whether it is getting worse'],
    ['Medical details', 'Medication, health conditions, and possible exposure to toxins'],
    ['Journey', 'Where you are and how quickly you can reach the assigned practice'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Wir sind Patienten bei einer Mitgliedspraxis.', 'We are patients of a member practice.'],
    ['Welche Praxis hat heute Notdienst?', 'Which practice is on duty today?'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Wir sind in ungefähr 20 Minuten da.', 'We will arrive in about 20 minutes.'],
];

const TABLE_OF_CONTENTS = [
    { id: 'rota', label: 'Current Bonn duty rota' },
    { id: 'hours', label: 'Official duty hours' },
    { id: 'fallback', label: 'Cologne 24-hour fallback' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'Information to prepare' },
    { id: 'fees', label: 'Fees and payment' },
    { id: 'regular-vets', label: 'Regular and national vet guides' },
];

export default function EmergencyVetBonnGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Bonn, Tierarzt Notdienst Bonn, veterinary emergency Bonn, Bonn veterinary duty rota"
                />
                <link rel="canonical" href={URL} />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={URL} />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
            </Helmet>

            <Header />

            <main className="mx-auto mb-12 max-w-7xl p-5 sm:p-6 md:p-12">
                <div className="flex flex-col gap-12 lg:flex-row">
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-24">
                            <BlogSidebar />
                        </div>
                    </div>

                    <article className="max-w-4xl lg:w-3/4">
                        <span className="text-sm font-bold uppercase tracking-wider text-accent-ink">
                            Emergency Guide
                        </span>
                        <h1 className="mb-6 mt-2 text-4xl font-bold leading-tight text-primary md:text-5xl">
                            {TITLE}
                        </h1>
                        <p className="mb-8 text-sm text-primary/60">
                            Rota access, hours, warning signs, fallback care, and fees checked against official and first-party sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Check the current practice, then call
                            </p>
                            <p className="mb-3 text-lg leading-relaxed">
                                Bonn has no central veterinary duty phone number. Its live rota identifies the practice responsible for each current service period.
                            </p>
                            <p className="mb-5 text-sm leading-relaxed text-secondary/75">
                                Open the current rota and always call the listed practice before travelling. Do not rely on an old screenshot or saved address.
                            </p>
                            <a
                                href={BONN_ROTA_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the current Bonn veterinary duty rota"
                                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white sm:w-auto"
                            >
                                Open the current Bonn duty rota
                            </a>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                The Bonn rota is not open to every caller.
                            </p>
                            <p className="text-red-900/80">
                                The service states that it is only for patients of member practices. If your pet is not registered with a participating practice, call your own veterinarian&apos;s current emergency contact or use the severe-case fallback below.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                Individual practices rotate through the service. The rota does not promise English coverage on every shift, so keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="rota" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                How the current Bonn duty rota works
                            </h2>
                            <p>
                                The Bonn Veterinary Representation Circle publishes the next duty practices on its live page. The Nordrhein Veterinary Chamber links to that service for Bonn and confirms that the region has no central phone number.
                            </p>
                            <ol className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6">
                                <li>Open the live Bonn duty rota and find the practice for the current period.</li>
                                <li>Check that your regular practice belongs to the Bonn circle.</li>
                                <li>Call the displayed duty practice before leaving home.</li>
                                <li>Describe the emergency and confirm that the practice wants you to travel there.</li>
                                <li>Use only the current address and instructions given by the receiving practice.</li>
                            </ol>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={BONN_ROTA_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Current rota and member practices
                                </a>
                                <a
                                    href={CHAMBER_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Nordrhein veterinary emergency guidance"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Nordrhein chamber guidance
                                </a>
                            </div>

                            <h2 id="hours" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Bonn duty-service hours
                            </h2>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Wednesday and Friday
                                    </p>
                                    <p className="mt-2 text-xl font-black text-primary">12:00 to the next morning at 08:00</p>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Saturday and Sunday
                                    </p>
                                    <p className="mt-2 text-xl font-black text-primary">08:00 to the next morning at 08:00</p>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Public holidays
                                    </p>
                                    <p className="mt-2 text-xl font-black text-primary">08:00 to the next morning at 08:00</p>
                                </div>
                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-amber-700">
                                        Monday, Tuesday, and Thursday
                                    </p>
                                    <p className="mt-2 text-xl font-black text-amber-950">Contact your own regular veterinarian</p>
                                </div>
                            </div>
                            <p>
                                The responsible practice changes with the rota. Always check the live service again even if you used it previously.
                            </p>

                            <h2 id="fallback" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Separate 24-hour fallback in Cologne
                            </h2>
                            <p>
                                A Bonn member practice identifies Tierklinik Köln-Süd as the nearest veterinary clinic for particularly severe cases, approximately 30 kilometres from Bonn. The clinic currently publishes a 24-hour emergency number and asks callers to phone first when possible.
                            </p>
                            <address className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-italic">
                                <strong className="block text-lg text-primary">Tierklinik Köln-Süd</strong>
                                <span className="block">Brühler Straße 183 - 185, 50968 Köln</span>
                                <span className="mt-2 block">{COLOGNE_PHONE}</span>
                            </address>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={COLOGNE_PHONE_HREF}
                                    aria-label="Call the Cologne 24-hour veterinary clinic"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    Call {COLOGNE_PHONE}
                                </a>
                                <a
                                    href={COLOGNE_CLINIC_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Cologne-South emergency information"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official clinic emergency page
                                </a>
                                <a
                                    href={COLOGNE_DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Directions to the clinic
                                </a>
                            </div>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                The Nordrhein Veterinary Chamber publishes these examples of veterinary emergencies. This list is not a diagnosis and is not complete.
                            </p>
                            <ul className="my-6 grid gap-2 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 md:grid-cols-2">
                                {WARNING_SIGNS.map((sign) => (
                                    <li key={sign}>{sign}</li>
                                ))}
                            </ul>

                            <h2 id="call" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Information to prepare
                            </h2>
                            <div className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                {CALL_DETAILS.map(([label, detail], index) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="font-bold text-primary">{label}</p>
                                            <p className="text-sm text-primary/70">{detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-primary/5 p-6 not-prose">
                                {GERMAN_PHRASES.map(([german, english]) => (
                                    <div key={german} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                                        <span className="font-bold italic text-accent sm:min-w-72">{german}</span>
                                        <span className="text-sm text-primary/70">{english}</span>
                                    </div>
                                ))}
                            </div>

                            <h2 id="fees" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency fees and payment
                            </h2>
                            <p>
                                The Bonn rota requires payment immediately at the duty practice and states that there is no later invoice. Ask which payment methods the assigned practice accepts when you call.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, hospitalisation, and VAT can add to the total.</li>
                                    <li>Payment is made directly to the receiving practice.</li>
                                </ul>
                                <a
                                    href={GOT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Federal GOT section 4"
                                    className="mt-5 inline-flex min-h-11 items-center font-bold text-accent underline"
                                >
                                    Federal GOT section 4
                                </a>
                            </div>

                            <h2 id="regular-vets" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Regular veterinary care in Bonn
                            </h2>
                            <p>
                                Confirm whether your regular veterinarian belongs to the Bonn circle before an emergency occurs. The directory separately verifies English-language signals for routine practices in Bonn.
                            </p>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <Link
                                    to="/vets/bonn"
                                    aria-label="Browse English-speaking vets in Bonn"
                                    className="flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    English-speaking vets in Bonn
                                </Link>
                                <Link
                                    to="/guides/pet-emergency-germany"
                                    className="flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Germany-wide pet emergency guide
                                </Link>
                            </div>

                            <GuideDisclaimer />
                        </div>

                        <RelatedPosts currentPath="/guides/emergency-vets-bonn" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
