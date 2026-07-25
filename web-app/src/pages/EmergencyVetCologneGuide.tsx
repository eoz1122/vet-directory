import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Cologne: Official Numbers and 24/7 Help (2026)';
const DESCRIPTION = 'Need an emergency vet in Cologne? Call the official duty line, compare two 24/7 clinics, check current hours, GOT fees, warning signs and English call phrases.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-cologne';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';

const DUTY_PHONE = '02203 962339';
const DUTY_PHONE_HREF = 'tel:+492203962339';
const DUTY_SERVICE_URL = 'https://koelner-tieraerztenotdienst.de/';
const NORDRHEIN_INFO_URL = 'https://www.tieraerztekammer-nordrhein.de/informationen-zum-tieraerztlichen-notdienst/';

const ARTICLE_SCHEMA = {
    ...generateArticleSchema(
        TITLE,
        DESCRIPTION,
        URL,
        DATE_PUBLISHED,
        DATE_MODIFIED,
    ),
    url: URL,
};

const EMERGENCY_CLINICS = [
    {
        name: 'Vet Zentrum Köln',
        address: 'Scheidtweilerstr. 19, 50933 Köln',
        phone: '0221 545764',
        phoneHref: 'tel:+49221545764',
        phoneLabel: 'Call Vet Zentrum Köln',
        sourceLabel: 'Official Vet Zentrum Köln emergency information',
        sourceUrl: 'https://www.vetzentrum-koeln.de/',
        note: 'The clinic publishes a 24-hour emergency service. It asks patients to call first and may publish temporary capacity limits.',
    },
    {
        name: 'Tierklinik Köln-Süd',
        address: 'Brühler Str. 183-185, 50968 Köln',
        phone: '0221 474543911',
        phoneHref: 'tel:+49221474543911',
        phoneLabel: 'Call Tierklinik Köln-Süd emergency line',
        sourceLabel: 'Official Tierklinik Köln-Süd emergency information',
        sourceUrl: 'https://koelner-tierklinik.de/leistungen/notfallmedizin',
        note: 'The clinic publishes a 24/7 emergency service. Call when possible so the team can prepare and give initial instructions.',
    },
];

const WARNING_SIGNS = [
    'Unconsciousness, collapse, or difficulty breathing',
    'Heavy or uncontrolled bleeding',
    'Very pale mucous membranes',
    'Seizures',
    'Difficulty or inability to urinate',
    'Persistent bloody diarrhoea or vomiting with increasing weakness',
    'Sudden paralysis or serious coordination problems',
    'Eye injuries',
    'Swallowed foreign objects or suspected poisoning',
    'Heatstroke, burns, scalds, or a traffic accident',
];

const CALL_DETAILS = [
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Problem', 'What happened, when it began, and whether it is getting worse'],
    ['Medical details', 'Current medication, health conditions, and possible exposure to toxins'],
    ['Arrival', 'Your location and how quickly you can reach the requested clinic'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Können wir jetzt kommen?', 'Can we come now?'],
    ['Wie lautet die Adresse?', 'What is the address?'],
];

const TABLE_OF_CONTENTS = [
    { id: 'duty-service', label: 'Official Cologne duty service' },
    { id: 'clinics', label: 'Current 24/7 clinics' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vet', label: 'Find a regular Cologne vet' },
];

export default function EmergencyVetCologneGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Cologne, emergency vet Köln, 24 hour vet Cologne, Tierarzt Notdienst Köln"
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
                            Duty number, clinic details, hours, and fees checked against official sources on 25 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Official Cologne veterinary duty line
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                Call before you travel. The official service directs you to the practice currently on duty during its published hours.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <a
                                    href={DUTY_PHONE_HREF}
                                    aria-label="Call Cologne veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 py-3 font-black text-primary transition-colors hover:bg-white"
                                >
                                    📞 Call {DUTY_PHONE}
                                </a>
                                <a
                                    href={DUTY_SERVICE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 px-6 py-3 text-center font-bold text-white transition-colors hover:bg-white/10"
                                >
                                    Official Cologne veterinary duty service
                                </a>
                            </div>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your pet may be in danger, call a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom can safely wait. Services triage by medical urgency, so less critical patients may wait longer.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                Ask whether an English-speaking team member is available when you call. This English-language guide does not verify the language coverage of an emergency shift.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="duty-service" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Official Cologne veterinary duty service
                            </h2>
                            <p>
                                Cologne practices operate a rotating small-animal duty service. Always call <strong>{DUTY_PHONE}</strong> before travelling so you receive the current destination.
                            </p>
                            <div className="my-6 grid gap-4 md:grid-cols-2 not-prose">
                                <div className="rounded-xl border border-primary/10 bg-white p-5">
                                    <p className="font-bold text-primary">Weekdays</p>
                                    <p className="mt-2 text-sm text-primary/70">Monday to Friday: 18:00 to 22:00.</p>
                                </div>
                                <div className="rounded-xl border border-primary/10 bg-white p-5">
                                    <p className="font-bold text-primary">Weekends and public holidays</p>
                                    <p className="mt-2 text-sm text-primary/70">Weekends and public holidays: 08:00 to 22:00.</p>
                                </div>
                            </div>
                            <p>
                                Outside the rotating service hours, call a 24-hour clinic directly. Availability and capacity can change, even when a clinic normally provides emergency care.
                            </p>

                            <h2 id="clinics" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Two current 24/7 emergency clinics in Cologne
                            </h2>
                            <p>
                                These clinics publish round-the-clock emergency care on their own websites. Call first whenever possible to confirm capacity, the correct entrance, and whether the clinic can treat your animal.
                            </p>
                            <div className="my-8 grid gap-5 not-prose">
                                {EMERGENCY_CLINICS.map((clinic) => (
                                    <section
                                        key={clinic.name}
                                        className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6"
                                    >
                                        <h3 className="text-xl font-bold text-primary">{clinic.name}</h3>
                                        <p className="mt-2 text-sm text-primary/70">{clinic.address}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-primary/75">{clinic.note}</p>
                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                            <a
                                                href={clinic.phoneHref}
                                                aria-label={clinic.phoneLabel}
                                                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                            >
                                                📞 {clinic.phone}
                                            </a>
                                            <a
                                                href={clinic.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                            >
                                                {clinic.sourceLabel}
                                            </a>
                                        </div>
                                    </section>
                                ))}
                            </div>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                The Nordrhein Veterinary Chamber lists examples that require urgent professional assessment. This list is not a diagnosis and is not complete.
                            </p>
                            <ul className="my-6 grid gap-2 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 md:grid-cols-2">
                                {WARNING_SIGNS.map((sign) => (
                                    <li key={sign}>{sign}</li>
                                ))}
                            </ul>

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
                                The Veterinary Chamber states that qualifying out-of-hours emergency work is billed under section 4 of the federal GOT fee schedule. The emergency periods include nights from 18:00 to 08:00, Friday 18:00 to Monday 08:00, and public holidays.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, and VAT can add to the total.</li>
                                </ul>
                                <a
                                    href={NORDRHEIN_INFO_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex min-h-11 items-center font-bold text-accent underline transition-colors hover:text-primary"
                                >
                                    Official Nordrhein emergency and fee information
                                </a>
                            </div>
                            <p>
                                Ask about accepted payment methods when you call. Emergency treatment is intended to stabilize the patient, with follow-up care usually handled by the regular veterinary practice.
                            </p>

                            <h2 id="regular-vet" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Find a regular Cologne vet
                            </h2>
                            <p>
                                A regular practice can maintain your pet&apos;s records and explain its own out-of-hours arrangement. Save both your regular vet number and the official duty number before an emergency occurs.
                            </p>
                            <div className="my-6 rounded-xl border border-accent/20 bg-accent/10 p-5 not-prose">
                                <Link
                                    to="/vets/cologne"
                                    aria-label="Browse English-speaking vets in Cologne"
                                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    Browse English-speaking vets in Cologne →
                                </Link>
                            </div>
                        </div>

                        <GuideDisclaimer />
                        <RelatedPosts currentPath="/guides/emergency-vets-cologne" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
