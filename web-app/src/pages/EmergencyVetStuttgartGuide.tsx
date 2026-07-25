import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Stuttgart: Official Numbers & 24/7 Help (2026)';
const DESCRIPTION = 'Need an emergency vet in Stuttgart? Call the official city duty line or a current 24h clinic, plus GOT fees, warning signs, and English phrases.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-stuttgart';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';

const CITY_DUTY_PHONE = '0711 76 57 477';
const CITY_DUTY_PHONE_HREF = 'tel:+497117657477';
const CLINIC_PHONE = '0711 63 73 8-0';
const CLINIC_PHONE_HREF = 'tel:+49711637380';
const CITY_INFO_URL = 'https://www.stuttgart.de/service/notdienste/';
const CITY_ENGLISH_URL = 'https://www.stuttgart.de/en/service/notdienste/';
const CLINIC_URL = 'https://www.tierklinik-stuttgart.de/';
const GOT_URL = 'https://www.gesetze-im-internet.de/got_2022/__4.html';

const ARTICLE_SCHEMA = {
    ...generateArticleSchema(TITLE, DESCRIPTION, URL, DATE_PUBLISHED, DATE_MODIFIED),
    url: URL,
};

const WARNING_SIGNS = [
    'Unconsciousness, collapse, or seizures',
    'Difficulty breathing or blue-grey gums',
    'Heavy or uncontrolled bleeding',
    'A traffic accident or other serious trauma',
    'Suspected poisoning or a swallowed foreign object',
    'Sudden paralysis or severe coordination problems',
    'Difficulty or inability to urinate',
    'Persistent bloody vomiting or diarrhoea',
    'Heatstroke, burns, or scalds',
    'Eye injuries or sudden loss of vision',
];

const CALL_DETAILS = [
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Problem', 'What happened, when it began, and whether it is getting worse'],
    ['Medical details', 'Medication, health conditions, and possible exposure to toxins'],
    ['Arrival', 'Your location and how quickly you can reach the practice or clinic'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Können wir jetzt kommen?', 'Can we come now?'],
    ['Wie lautet die Adresse?', 'What is the address?'],
];

const TABLE_OF_CONTENTS = [
    { id: 'duty-line', label: 'Official Stuttgart duty line' },
    { id: 'clinic', label: 'Current 24-hour clinic' },
    { id: 'municipal-service', label: 'Stray and wildlife service' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Local and nearby guides' },
];

export default function EmergencyVetStuttgartGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Stuttgart, 24 hour vet Stuttgart, Tierarzt Notdienst Stuttgart, animal hospital Stuttgart, English emergency vet Stuttgart"
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
                            Phone details, service hours, and fees checked against official sources on 25 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Call before you travel
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                Stuttgart publishes a veterinary duty line, while AniCura Stuttgart publishes a 24-hour emergency service. Call first when it is safe to do so and follow the professional&apos;s instructions.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href={CITY_DUTY_PHONE_HREF}
                                    aria-label="Call Stuttgart veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white"
                                >
                                    Call duty service: {CITY_DUTY_PHONE}
                                </a>
                                <a
                                    href={CLINIC_PHONE_HREF}
                                    aria-label="Call Stuttgart 24-hour clinic"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-secondary/30 px-5 py-3 text-center font-black text-secondary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Call 24-hour clinic: {CLINIC_PHONE}
                                </a>
                            </div>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your pet may be in danger, contact a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom is safe to delay. Emergency teams triage by medical urgency.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                The city provides an English emergency-services page, but this does not verify English coverage at every practice or on every clinic shift. Ask when you call.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="duty-line" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Official Stuttgart veterinary duty line
                            </h2>
                            <p>
                                For an emergency involving your own pet, the City of Stuttgart directs callers to <strong>{CITY_DUTY_PHONE}</strong>. The recorded duty service returns the phone number of the veterinarian currently on duty. Call that veterinarian and confirm where to travel.
                            </p>
                            <div className="my-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap not-prose">
                                <a
                                    href={CITY_INFO_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Stuttgart emergency services information"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Stuttgart emergency services information
                                </a>
                                <a
                                    href={CITY_ENGLISH_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official English Stuttgart emergency services information"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official English Stuttgart emergency services information
                                </a>
                            </div>

                            <h2 id="clinic" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                A current 24-hour emergency clinic in Stuttgart
                            </h2>
                            <p>
                                AniCura Tierklinik Stuttgart currently publishes a Monday to Sunday, 24-hour emergency service. Phone ahead when possible because capacity, waiting time, and species coverage can change.
                            </p>
                            <section className="my-8 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm not-prose sm:p-6">
                                <p className="text-xs font-black uppercase tracking-widest text-red-700">
                                    Clinic-published 24-hour service
                                </p>
                                <h3 className="mt-2 text-xl font-bold text-primary">
                                    AniCura Tierklinik Stuttgart
                                </h3>
                                <p className="mt-2 text-sm text-primary/70">
                                    Hermann-Fein-Straße 15, 70599 Stuttgart-Plieningen
                                </p>
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <a
                                        href={CLINIC_PHONE_HREF}
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                    >
                                        {CLINIC_PHONE}
                                    </a>
                                    <a
                                        href={CLINIC_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Official Stuttgart clinic emergency information"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                    >
                                        Official Stuttgart clinic emergency information
                                    </a>
                                </div>
                            </section>

                            <h2 id="municipal-service" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                The municipal animal emergency service has a different role
                            </h2>
                            <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 not-prose">
                                <p className="font-bold text-amber-950">
                                    Stuttgart&apos;s municipal animal emergency service is a separate service for injured stray pets and wildlife.
                                </p>
                                <p className="mt-2 text-sm text-amber-900/80">
                                    It is not the veterinary duty line for an owned pet. Use the city duty line or contact the clinic above for your own animal.
                                </p>
                            </div>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                These examples need urgent professional assessment. The list is not a diagnosis and is not complete.
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
                                Section 4 of Germany&apos;s federal veterinary fee schedule applies to qualifying out-of-hours emergency work.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, and VAT can add to the total.</li>
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
                                Find local and nearby veterinary help
                            </h2>
                            <p>
                                Save your regular practice&apos;s out-of-hours instructions before an emergency occurs. Nearby city guides can help when you are travelling.
                            </p>
                            <div className="my-6 grid gap-3 sm:grid-cols-2 not-prose">
                                <Link
                                    to="/vets/stuttgart"
                                    aria-label="Browse English-speaking vets in Stuttgart"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    English-speaking vets in Stuttgart
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-munich"
                                    aria-label="Emergency vet help in Munich"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Munich
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-frankfurt"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Frankfurt
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
                        <RelatedPosts currentPath="/guides/emergency-vets-stuttgart" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
