import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Karlsruhe: Official 24-Hour Duty Line (2026)';
const DESCRIPTION = 'Need an emergency vet in Karlsruhe? Find the official 24-hour duty number, rotating-practice instructions, Durlach centre hours, warning signs, and GOT fees.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-karlsruhe';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const DUTY_PHONE = '0721 49 55 66';
const DUTY_PHONE_HREF = 'tel:+49721495566';
const CITY_URL = 'https://www.karlsruhe.de/stadt-rathaus/service-buergerinformation/notrufnummern';
const DUTY_URL = 'https://www.tierarzt-notdienst-karlsruhe.de/';
const DURLACH_URL = 'https://tierarzt-karlsruhe-durlach.de/tierarzt-notdienst-karlsruhe/';
const DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Bergwaldstra%C3%9Fe+30+76227+Karlsruhe';
const WARNING_SIGNS_URL = 'https://www.bundestieraerztekammer.de/d.php?id=8659';
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
    ['Journey', 'Where you are and how quickly you can reach the assigned practice'],
    ['Contact', 'A phone number where the veterinarian can reach you'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Welcher Tierarzt hat gerade Notdienst?', 'Which veterinarian is currently on duty?'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Wir sind in ungefähr 20 Minuten da.', 'We will arrive in about 20 minutes.'],
];

const TABLE_OF_CONTENTS = [
    { id: 'duty-line', label: 'Official 24-hour duty line' },
    { id: 'durlach', label: 'Durlach centre hours' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'Information to prepare' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Regular and national vet guides' },
];

export default function EmergencyVetKarlsruheGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Karlsruhe, Tierarzt Notdienst Karlsruhe, veterinary emergency Karlsruhe, Kleintierzentrum Karlsruhe Durlach"
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
                            Routing, hours, warning signs, and fees checked against official and first-party sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Call before travelling
                            </p>
                            <p className="mb-3 text-lg leading-relaxed">
                                Karlsruhe&apos;s official veterinary duty number is available 24 hours a day, 365 days a year. A recorded announcement identifies the current duty veterinarian.
                            </p>
                            <p className="mb-5 text-sm leading-relaxed text-secondary/75">
                                Listen to the full announcement, then call the assigned practice before travelling. The receiving address changes with the duty rota.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href={DUTY_PHONE_HREF}
                                    aria-label="Call the official Karlsruhe veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white"
                                >
                                    Call {DUTY_PHONE}
                                </a>
                                <a
                                    href={DUTY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Karlsruhe veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-secondary/30 px-5 py-3 text-center font-bold text-secondary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Official duty service
                                </a>
                            </div>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                Do not travel to an old or saved duty address.
                            </p>
                            <p className="text-red-900/80">
                                The assigned practice rotates. Use the announcement to identify today&apos;s veterinarian and confirm the destination by phone before setting off.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                The official duty information does not promise English coverage at every rotating practice. Keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="duty-line" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Official 24-hour veterinary duty line
                            </h2>
                            <p>
                                The City of Karlsruhe publishes <strong>{DUTY_PHONE}</strong> as the city&apos;s 24-hour veterinary emergency number. The regional duty service explains that the recorded announcement names the veterinarian currently responsible for emergency care.
                            </p>
                            <ol className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6">
                                <li>Call the central duty number and listen to the full recording.</li>
                                <li>Write down the name and phone number of the current duty veterinarian.</li>
                                <li>Call that veterinarian before leaving home.</li>
                                <li>Describe the emergency, animal, age, and expected arrival time.</li>
                                <li>Travel only to the destination confirmed by the receiving practice.</li>
                            </ol>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={CITY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official City of Karlsruhe veterinary emergency number"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    City emergency-number page
                                </a>
                                <a
                                    href={DUTY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Duty service instructions
                                </a>
                            </div>

                            <h2 id="durlach" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Karlsruhe-Durlach emergency centre
                            </h2>
                            <p>
                                Kleintierzentrum Karlsruhe-Durlach publishes emergency coverage every day from <strong>07:00 to 22:00</strong>, including weekends and public holidays, at:
                            </p>
                            <address className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-italic">
                                <strong className="block text-lg text-primary">Kleintierzentrum Karlsruhe-Durlach</strong>
                                <span className="block">Bergwaldstraße 30, 76227 Karlsruhe</span>
                            </address>
                            <p>
                                The centre&apos;s current page says there is no fixed 24-hour clinic in Karlsruhe. Its published building coverage therefore does not replace the rotating service outside 07:00 to 22:00. Call the official duty line for the current pathway.
                            </p>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={DURLACH_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Karlsruhe-Durlach emergency information"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Durlach emergency information
                                </a>
                                <a
                                    href={DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Directions to Bergwaldstraße 30
                                </a>
                            </div>

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
                                Official emergency fees
                            </h2>
                            <p>
                                Qualifying out-of-hours treatment is governed by section 4 of Germany&apos;s federal veterinary fee schedule.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, hospitalisation, and VAT can add to the total.</li>
                                    <li>Ask the receiving practice which payment methods it accepts.</li>
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
                                Regular veterinary care in Karlsruhe
                            </h2>
                            <p>
                                Save your regular practice&apos;s out-of-hours instructions before an emergency occurs. The directory separately verifies English-language signals for routine practices in Karlsruhe.
                            </p>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <Link
                                    to="/vets/karlsruhe"
                                    aria-label="Browse English-speaking vets in Karlsruhe"
                                    className="flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    English-speaking vets in Karlsruhe
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

                        <RelatedPosts currentPath="/guides/emergency-vets-karlsruhe" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
