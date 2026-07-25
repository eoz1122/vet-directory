import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Nuremberg: 24/7 Critical Care (2026)';
const DESCRIPTION = 'Need an emergency vet in Nuremberg? Find the Hafen clinic address, 24/7 pathway for life-threatening cases, call limits, warning signs, and GOT fees.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-nuremberg';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const CLINIC_PHONE = '0911 64 31 10';
const CLINIC_PHONE_HREF = 'tel:+49911643110';
const CLINIC_URL = 'https://www.tierklinik-nbg.de/';
const CLINIC_CONTACT_URL = 'https://www.tierklinik-nbg.de/kontakt/';
const DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Tierklinik+N%C3%BCrnberg+Hafen+Wertachstra%C3%9Fe+1+90451+N%C3%BCrnberg';
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
    ['Journey', 'Where you are and how quickly you can reach Wertachstraße 1'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen lebensbedrohlichen Notfall.', 'My pet has a life-threatening emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Wir sind auf dem Weg zur Tierklinik.', 'We are on the way to the veterinary clinic.'],
    ['Wo ist die Notfallaufnahme?', 'Where is the emergency reception?'],
];

const TABLE_OF_CONTENTS = [
    { id: 'critical-care', label: '24/7 critical-care pathway' },
    { id: 'hours', label: 'Regular and emergency hours' },
    { id: 'arrival', label: 'Before travelling' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'Information to prepare' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Regular and national vet guides' },
];

export default function EmergencyVetNurembergGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Nuremberg, Tierarzt Notdienst Nürnberg, 24 hour veterinary clinic Nuremberg, Tierklinik Nürnberg Hafen"
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
                            Access rules, contact details, warning signs, and fees checked against first-party sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Acutely life-threatening emergency
                            </p>
                            <p className="mb-3 text-lg leading-relaxed">
                                Tierklinik Nürnberg Hafen states that its emergency team is present around the clock for acutely life-threatening cases. For such a case, go directly to the clinic.
                            </p>
                            <p className="mb-5 text-sm leading-relaxed text-secondary/75">
                                Outside regular opening hours, telephone advice is not available and callers hear a recorded announcement.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href={DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Directions to Tierklinik Nürnberg Hafen"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white"
                                >
                                    Directions to the clinic
                                </a>
                                <a
                                    href={CLINIC_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Tierklinik Nürnberg Hafen emergency guidance"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-secondary/30 px-5 py-3 text-center font-bold text-secondary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Official emergency guidance
                                </a>
                            </div>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                The 24/7 pathway is restricted to critical cases.
                            </p>
                            <p className="text-red-900/80">
                                Outside regular opening hours, the clinic states that its staff are present exclusively for acute, life-threatening emergencies. The duty veterinarian decides on admission.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                The clinic&apos;s current emergency guidance does not promise English coverage on every shift. Keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="critical-care" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Tierklinik Nürnberg Hafen
                            </h2>
                            <p>
                                The clinic publishes a 24/7 emergency service for acutely life-threatening cases at:
                            </p>
                            <address className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-italic">
                                <strong className="block text-lg text-primary">Tierklinik Nürnberg Hafen</strong>
                                <span className="block">Wertachstraße 1, 90451 Nürnberg</span>
                                <span className="mt-2 block">{CLINIC_PHONE}</span>
                            </address>
                            <p>
                                The clinic treats animals kept as household pets, including dogs, cats, rabbits, guinea pigs, rodents, and other small companion animals. The published 24/7 access wording is specifically limited to acute, life-threatening emergencies.
                            </p>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={CLINIC_CONTACT_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Tierklinik Nürnberg Hafen contact details"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official clinic contact details
                                </a>
                                <a
                                    href={DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Open directions
                                </a>
                            </div>

                            <h2 id="hours" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Regular opening hours and emergency access
                            </h2>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Monday to Friday
                                    </p>
                                    <p className="mt-2 text-xl font-black text-primary">08:00 to 13:00</p>
                                    <p className="text-xl font-black text-primary">14:00 to 19:00</p>
                                    <p className="mt-3 text-sm text-primary/65">Appointments are requested.</p>
                                </div>
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-red-700">
                                        Outside regular opening hours
                                    </p>
                                    <p className="mt-2 text-xl font-black text-red-900">Acutely life-threatening cases only</p>
                                    <p className="mt-3 text-sm text-red-900/75">Emergency staff are present 24/7, including Sundays and public holidays.</p>
                                </div>
                            </div>
                            <p>
                                During regular opening hours, call ahead when possible so the team can prepare. Outside those hours, the clinic says that telephone advice is not available and a recorded announcement plays.
                            </p>
                            <a
                                href={CLINIC_PHONE_HREF}
                                aria-label="Call Tierklinik Nürnberg Hafen during regular opening hours"
                                className="my-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary no-underline transition-colors hover:bg-accent hover:text-primary"
                            >
                                Call {CLINIC_PHONE} during regular hours
                            </a>

                            <h2 id="arrival" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                What to expect before and after arrival
                            </h2>
                            <ul className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6">
                                <li>For an acute, life-threatening emergency, the clinic says you may go directly to the clinic.</li>
                                <li>The duty veterinarian decides whether the animal is admitted during emergency-service hours.</li>
                                <li>Staffing levels vary during the day, so longer waiting times can occur.</li>
                                <li>A referral is helpful for planned specialist care but is not required in an emergency.</li>
                                <li>For a stable, non-critical problem outside regular hours, use your regular veterinarian&apos;s current duty instructions instead of assuming 24/7 admission.</li>
                            </ul>

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
                                The clinic warns that a higher fee rate applies at night, on weekends, and on public holidays. Qualifying out-of-hours treatment is governed by section 4 of Germany&apos;s federal veterinary fee schedule.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, hospitalisation, and VAT can add to the total.</li>
                                    <li>Ask about accepted payment methods during regular opening hours.</li>
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
                                Regular veterinary care in Nuremberg
                            </h2>
                            <p>
                                Save your regular practice&apos;s out-of-hours instructions before an emergency occurs. The directory can help you find routine veterinary care in Nuremberg.
                            </p>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <Link
                                    to="/vets/nuremberg"
                                    aria-label="Browse English-speaking vets in Nuremberg"
                                    className="flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    English-speaking vets in Nuremberg
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

                        <RelatedPosts currentPath="/guides/emergency-vets-nuremberg" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
