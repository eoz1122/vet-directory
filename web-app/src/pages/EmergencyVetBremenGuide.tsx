import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Bremen: Official Duty Number & Hours (2026)';
const DESCRIPTION = 'Need an emergency vet in Bremen? Find the official veterinary duty number and hours, required call-ahead steps, fallback clinics, warning signs, and GOT fees.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-bremen';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const DUTY_PHONE = '0421 43 81 67';
const DUTY_PHONE_HREF = 'tel:+49421438167';
const CHAMBER_URL = 'https://tieraerztekammer-bremen.org/notdienst/';
const BREMEN_GOV_URL = 'https://www.gesundheit.bremen.de/das-ressort/stabsbereich-landesbeauftragte-fuer-den-tierschutz/tiernotfall-46575';
const WARNING_SIGNS_URL = 'https://www.bundestieraerztekammer.de/d.php?id=8659';
const GOT_URL = 'https://www.gesetze-im-internet.de/got_2022/__4.html';

const ARTICLE_SCHEMA = {
    ...generateArticleSchema(TITLE, DESCRIPTION, URL, DATE_PUBLISHED, DATE_MODIFIED),
    url: URL,
};

const FALLBACK_CLINICS = [
    {
        name: 'Tierklinik Posthausen',
        phone: '04297 168990',
        phoneHref: 'tel:+494297168990',
        website: 'https://tierklinik-posthausen.de/notdienst-infos/',
        description: 'The clinic publishes a 24-hour emergency service for severe and life-threatening cases. Call before arrival.',
    },
    {
        name: 'Klinik für Kleintiere Sottrum',
        phone: '04264 2240',
        phoneHref: 'tel:+4942642240',
        website: 'https://klinik-fuer-kleintiere.de/kontakt/',
        description: 'The clinic publishes a 24-hour emergency service. Telephone contact remains the first step.',
    },
    {
        name: 'TiHo Hannover Small Animal Clinic',
        phone: '0511 953-6200',
        phoneHref: 'tel:+495119536200',
        website: 'https://www.tiho-hannover.de/notdienst',
        description: 'TiHo publishes round-the-clock emergency access for its Small Animal Clinic in Hannover.',
    },
];

const WARNING_SIGNS = [
    'Unconsciousness or collapse',
    'Difficulty breathing',
    'Very pale or white mucous membranes',
    'Heavy or uncontrolled bleeding',
    'Repeated or prolonged seizures',
    'Sudden paralysis',
    'Difficulty or inability to urinate',
    'Persistent bloody vomiting or diarrhoea with increasing weakness',
    'Eye injuries',
    'Suspected poisoning or a swallowed foreign object',
    'Heatstroke, burns, or scalds',
    'A serious traffic accident or bite injury',
];

const CALL_DETAILS = [
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Problem', 'What happened, when it began, and whether it is getting worse'],
    ['Medical details', 'Medication, health conditions, and possible exposure to toxins'],
    ['Location', 'Where you are and how quickly you can reach the assigned practice'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Welche Praxis hat heute Notdienst?', 'Which practice is on duty today?'],
    ['Können wir jetzt kommen?', 'Can we come now?'],
];

const TABLE_OF_CONTENTS = [
    { id: 'official-service', label: 'Official Bremen duty service' },
    { id: 'hours', label: 'Current service hours' },
    { id: 'outside-hours', label: 'Help outside those hours' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Regular and nearby vet guides' },
];

export default function EmergencyVetBremenGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Bremen, Tierarzt Notdienst Bremen, veterinary emergency Bremen, night vet Bremen, weekend vet Bremen"
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
                            Duty-service access, hours, fallback clinics, warning signs, and fees checked against official sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Call before travelling
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                Bremen&apos;s official veterinary duty service requires telephone registration. Call the central number to confirm the current receiving practice before you leave.
                            </p>
                            <a
                                href={DUTY_PHONE_HREF}
                                aria-label="Call the official Bremen veterinary duty service"
                                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white sm:w-auto"
                            >
                                Call {DUTY_PHONE}
                            </a>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your animal may be in danger, contact a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom is safe to delay. The duty service or receiving clinic should assess the urgency.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                The official Bremen sources do not promise English coverage on every shift. Ask when you call and keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="official-service" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Bremen&apos;s official veterinary duty service
                            </h2>
                            <p>
                                The Bremen Veterinary Chamber publishes <strong>{DUTY_PHONE}</strong> as the official central number for the city&apos;s veterinary duty service. It describes the service as an on-call rota, so the receiving practice can change.
                            </p>
                            <p>
                                Telephone registration is mandatory. Do not travel to a practice based only on an old directory entry, search result, or saved address.
                            </p>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={CHAMBER_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Bremen veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Bremen veterinary duty service
                                </a>
                                <a
                                    href={BREMEN_GOV_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Bremen animal-emergency guidance"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Bremen animal-emergency guidance
                                </a>
                            </div>

                            <h2 id="hours" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Current Bremen duty-service hours
                            </h2>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Monday to Friday
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-primary">18:00 to 22:00</p>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Saturday, Sunday, and public holidays
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-primary">08:00 to 22:00</p>
                                </div>
                            </div>
                            <p>
                                These hours come from the Bremen Veterinary Chamber. Recheck the official page when you need help because duty arrangements can change.
                            </p>

                            <h2 id="outside-hours" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Help outside the Bremen duty-service hours
                            </h2>
                            <p>
                                The Bremen Veterinary Chamber directs owners to clinics outside the city when its central duty service is closed. The three contacts below are the chamber-listed options, and each provider currently publishes emergency access on its own website.
                            </p>
                            <div className="my-8 grid gap-5 not-prose">
                                {FALLBACK_CLINICS.map((clinic) => (
                                    <section key={clinic.name} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6">
                                        <h3 className="text-xl font-bold text-primary">{clinic.name}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-primary/70">{clinic.description}</p>
                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                            <a
                                                href={clinic.phoneHref}
                                                aria-label={`Call ${clinic.name}`}
                                                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                            >
                                                {clinic.phone}
                                            </a>
                                            <a
                                                href={clinic.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Official emergency information for ${clinic.name}`}
                                                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                            >
                                                Official emergency information
                                            </a>
                                        </div>
                                    </section>
                                ))}
                            </div>
                            <p>
                                Capacity can change during a shift. Call the clinic before travelling whenever it is safe to do so, and follow its current instructions.
                            </p>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                The German Federal Chamber of Veterinarians publishes these examples of veterinary emergencies. This list is not a diagnosis and is not complete.
                            </p>
                            <ul className="my-6 grid gap-2 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 md:grid-cols-2">
                                {WARNING_SIGNS.map((sign) => (
                                    <li key={sign}>{sign}</li>
                                ))}
                            </ul>
                            <a
                                href={WARNING_SIGNS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Official German veterinary emergency warning signs"
                                className="my-5 inline-flex min-h-11 items-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent no-underline transition-colors hover:border-accent"
                            >
                                Official German veterinary emergency warning signs
                            </a>

                            <h2 id="call" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                What to say when you call
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
                                Official emergency fees
                            </h2>
                            <p>
                                Qualifying out-of-hours treatment is billed under section 4 of Germany&apos;s federal veterinary fee schedule.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, and VAT can add to the total.</li>
                                    <li>Ask the receiving practice which payment methods it accepts.</li>
                                </ul>
                                <a
                                    href={GOT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex min-h-11 items-center font-bold text-accent underline transition-colors hover:text-primary"
                                >
                                    Official federal GOT section 4
                                </a>
                            </div>

                            <h2 id="regular-vets" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Find regular and nearby veterinary help
                            </h2>
                            <p>
                                Save your regular practice&apos;s out-of-hours instructions before an emergency occurs. The directory can help you find routine veterinary care in Bremen.
                            </p>
                            <div className="my-6 grid gap-3 sm:grid-cols-2 not-prose">
                                <Link
                                    to="/vets/bremen"
                                    aria-label="Browse English-speaking vets in Bremen"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    English-speaking vets in Bremen
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-hannover"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Hannover
                                </Link>
                                <Link
                                    to="/blog/emergency-vet-hamburg-english"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Hamburg
                                </Link>
                                <Link
                                    to="/guides/pet-emergency-germany"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Germany-wide emergency guide
                                </Link>
                            </div>
                        </div>

                        <GuideDisclaimer />
                        <RelatedPosts currentPath="/guides/emergency-vets-bremen" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
