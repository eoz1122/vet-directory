import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Essen & Ruhr Area: 24/7 Help (2026)';
const DESCRIPTION = 'Need an emergency vet in Essen or Dortmund? Call the official local duty service, check a verified 24h Essen clinic, GOT fees, warning signs, and English phrases.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-ruhr';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';

const ESSEN_DUTY_PHONE = '01806 451300';
const ESSEN_DUTY_PHONE_HREF = 'tel:+491806451300';
const ESSEN_CLINIC_PHONE = '0201 342604';
const ESSEN_CLINIC_PHONE_HREF = 'tel:+49201342604';

const NORDRHEIN_INFO_URL = 'https://www.tieraerztekammer-nordrhein.de/informationen-zum-tieraerztlichen-notdienst/';
const ESSEN_CLINIC_URL = 'https://tieraerztliche-klinik.de/kontakt/';
const DORTMUND_DUTY_URL = 'https://www.tiernotdienst-dortmund.de/';
const WESTFALEN_DUTY_URL = 'https://www.tieraerztekammer-wl.de/fuer-tierhalter/notdienst-finder/';

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

const WARNING_SIGNS = [
    'Unconsciousness or collapse',
    'Difficulty breathing',
    'Heavy or uncontrolled bleeding',
    'Very pale mucous membranes',
    'Seizures',
    'Difficulty or inability to urinate',
    'Persistent bloody diarrhoea or vomiting',
    'Sudden paralysis or serious coordination problems',
    'Eye injuries',
    'Swallowed foreign objects or suspected poisoning',
    'Heatstroke, burns, or scalds',
    'A traffic accident or other serious trauma',
];

const CALL_DETAILS = [
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Problem', 'What happened, when it began, and whether it is getting worse'],
    ['Medical details', 'Medication, health conditions, and possible exposure to toxins'],
    ['Arrival', 'Your location and how quickly you can reach the requested practice'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Können wir jetzt kommen?', 'Can we come now?'],
    ['Wie lautet die Adresse?', 'What is the address?'],
];

const TABLE_OF_CONTENTS = [
    { id: 'essen', label: 'Emergency help in Essen' },
    { id: 'dortmund', label: 'Emergency help in Dortmund' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Find a regular local vet' },
];

export default function EmergencyVetRuhrGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Essen, emergency vet Dortmund, emergency vet Ruhr, 24 hour vet Essen, Tierarzt Notdienst Essen, Tierarzt Notdienst Dortmund"
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
                            Duty services, clinic details, hours, and fees checked against official sources on 25 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Call before you travel
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                Emergency capacity and the practice on duty can change. Call the relevant service first so the team can assess urgency and confirm where to go.
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <a
                                    href={ESSEN_DUTY_PHONE_HREF}
                                    aria-label="Call Essen veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white"
                                >
                                    📞 Essen duty: {ESSEN_DUTY_PHONE}
                                </a>
                                <a
                                    href={DORTMUND_DUTY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-center font-bold text-white transition-colors hover:bg-white/10"
                                >
                                    Dortmund practice on duty
                                </a>
                            </div>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your pet may be in danger, contact a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom can safely wait. Emergency services triage by medical urgency, so less critical patients may wait longer.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                Ask whether an English-speaking team member is available when you call. An English form or directory listing does not verify the language coverage of an emergency shift.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="essen" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency veterinary help in Essen
                            </h2>
                            <p>
                                The Nordrhein Veterinary Chamber lists a regional Essen duty number. It is a paid phone number, with the exact cost depending on the network provider. Call it for the current duty arrangement.
                            </p>
                            <div className="my-8 grid gap-5 not-prose">
                                <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent">
                                        Official regional duty service
                                    </p>
                                    <h3 className="mt-2 text-xl font-bold text-primary">
                                        Essen veterinary duty line
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-primary/70">
                                        Use the chamber-listed number to obtain the current out-of-hours route. Call before leaving home.
                                    </p>
                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                        <a
                                            href={ESSEN_DUTY_PHONE_HREF}
                                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                        >
                                            📞 {ESSEN_DUTY_PHONE}
                                        </a>
                                        <a
                                            href={NORDRHEIN_INFO_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                        >
                                            Official Nordrhein emergency service information
                                        </a>
                                    </div>
                                </section>

                                <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-6">
                                    <p className="text-xs font-black uppercase tracking-widest text-red-700">
                                        Practice-published 24h service
                                    </p>
                                    <h3 className="mt-2 text-xl font-bold text-primary">
                                        Tierärztliche Klinik für Kleintiere Dr. Jan Apelt
                                    </h3>
                                    <p className="mt-2 text-sm text-primary/70">
                                        Stankeitstraße 11, 45326 Essen
                                    </p>
                                    <p className="mt-3 text-sm leading-relaxed text-primary/70">
                                        The clinic publishes a 24-hour emergency service and asks patients to register by phone outside normal consultation hours.
                                    </p>
                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                        <a
                                            href={ESSEN_CLINIC_PHONE_HREF}
                                            aria-label="Call Essen 24-hour clinic"
                                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                        >
                                            📞 {ESSEN_CLINIC_PHONE}
                                        </a>
                                        <a
                                            href={ESSEN_CLINIC_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                        >
                                            Official Essen clinic emergency information
                                        </a>
                                    </div>
                                </section>
                            </div>

                            <h2 id="dortmund" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency veterinary help in Dortmund
                            </h2>
                            <p>
                                The Westfalen-Lippe Veterinary Chamber links to Dortmund&apos;s rotating duty schedule. Because the responsible practice changes, use the live schedule rather than saving one practice as the permanent emergency destination.
                            </p>
                            <div className="my-6 grid gap-4 md:grid-cols-2 not-prose">
                                <div className="rounded-xl border border-primary/10 bg-white p-5">
                                    <p className="font-bold text-primary">Weekdays</p>
                                    <p className="mt-2 text-sm text-primary/70">Monday to Friday: 18:00 to 22:00.</p>
                                </div>
                                <div className="rounded-xl border border-primary/10 bg-white p-5">
                                    <p className="font-bold text-primary">Weekends and public holidays</p>
                                    <p className="mt-2 text-sm text-primary/70">Weekends and public holidays: 10:00 to 18:00.</p>
                                </div>
                            </div>
                            <p>
                                The Dortmund service says to register by telephone before visiting. Open the current schedule, find today&apos;s practice, and call that practice directly.
                            </p>
                            <div className="my-6 flex flex-col gap-3 sm:flex-row not-prose">
                                <a
                                    href={DORTMUND_DUTY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    Official Dortmund duty schedule
                                </a>
                                <a
                                    href={WESTFALEN_DUTY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Westfalen-Lippe veterinary duty finder
                                </a>
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
                                The Nordrhein Veterinary Chamber explains that qualifying out-of-hours emergency work is billed under section 4 of the federal GOT fee schedule. The emergency periods include nights from 18:00 to 08:00, Friday 18:00 to Monday 08:00, and public holidays.
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

                            <h2 id="regular-vets" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Find a regular English-speaking vet
                            </h2>
                            <p>
                                A regular practice can maintain your pet&apos;s records and explain its own out-of-hours arrangement. Save the relevant duty route before an emergency occurs.
                            </p>
                            <div className="my-6 grid gap-3 sm:grid-cols-2 not-prose">
                                <Link
                                    to="/vets/essen"
                                    aria-label="Browse English-speaking vets in Essen"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    English-speaking vets in Essen
                                </Link>
                                <Link
                                    to="/vets/dortmund"
                                    aria-label="Browse English-speaking vets in Dortmund"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    English-speaking vets in Dortmund
                                </Link>
                                <Link
                                    to="/vets/düsseldorf"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    English-speaking vets in Düsseldorf
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
                        <RelatedPosts currentPath="/guides/emergency-vets-ruhr" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
