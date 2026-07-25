import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Düsseldorf: 24/7 Clinic Help (2026)';
const DESCRIPTION = "Need an emergency vet in Düsseldorf? Call a current 24/7 clinic, see the chamber's hotline status, GOT fees, warning signs, and English phrases.";
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-duesseldorf';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';

const CLINIC_PHONE = '0211 62 68 68';
const CLINIC_PHONE_HREF = 'tel:+49211626868';
const CLINIC_URL = 'https://www.anicura.de/standorte/tierklinik-duesseldorf/kontakt/';
const CLINIC_ENGLISH_URL = 'https://www.anicura.de/en/our-clinics/tierklinik-duesseldorf/';
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
    ['Arrival', 'Your location and how quickly you can reach the clinic'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Können wir jetzt kommen?', 'Can we come now?'],
    ['Wie lautet die Adresse?', 'What is the address?'],
];

const TABLE_OF_CONTENTS = [
    { id: 'clinic', label: 'Current 24-hour clinic' },
    { id: 'hotline', label: 'Düsseldorf duty-line status' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Find a regular local vet' },
];

export default function EmergencyVetDuesseldorfGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Düsseldorf, 24 hour vet Düsseldorf, Tierarzt Notdienst Düsseldorf, animal hospital Düsseldorf, English emergency vet Düsseldorf"
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
                            Clinic hours, phone details, chamber status, and fees checked against official sources on 25 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Call before you travel
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                AniCura publishes a 24-hour emergency service at its Düsseldorf clinic. Call first when it is safe to do so, describe the problem, and confirm the clinic can receive your animal.
                            </p>
                            <a
                                href={CLINIC_PHONE_HREF}
                                aria-label="Call Düsseldorf 24-hour clinic"
                                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white sm:w-auto"
                            >
                                📞 Call {CLINIC_PHONE}
                            </a>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your pet may be in danger, contact a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom can safely wait. Emergency teams triage by medical urgency, so another patient may be treated before yours.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                The clinic provides an official English page, but that does not verify English coverage on every emergency shift. Ask when you call.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="clinic" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                A current 24-hour emergency clinic in Düsseldorf
                            </h2>
                            <p>
                                AniCura Tierklinik Düsseldorf currently publishes emergency availability every day, 00:00 to 24:00. Its official English page also describes a 24/7 emergency service for small animals, birds, reptiles, and exotic pets.
                            </p>
                            <section className="my-8 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm not-prose sm:p-6">
                                <p className="text-xs font-black uppercase tracking-widest text-red-700">
                                    Clinic-published 24/7 service
                                </p>
                                <h3 className="mt-2 text-xl font-bold text-primary">
                                    AniCura Tierklinik Düsseldorf
                                </h3>
                                <p className="mt-2 text-sm text-primary/70">
                                    Münsterstraße 359, 40470 Düsseldorf
                                </p>
                                <p className="mt-3 text-sm leading-relaxed text-primary/70">
                                    Phone ahead when possible. Current capacity, waiting time, and the specialists available for a particular species can change.
                                </p>
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <a
                                        href={CLINIC_PHONE_HREF}
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                    >
                                        📞 {CLINIC_PHONE}
                                    </a>
                                    <a
                                        href={CLINIC_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                    >
                                        Official Düsseldorf clinic emergency information
                                    </a>
                                    <a
                                        href={CLINIC_ENGLISH_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                    >
                                        Official English clinic page
                                    </a>
                                </div>
                            </section>

                            <h2 id="hotline" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Is there an official Düsseldorf veterinary duty number?
                            </h2>
                            <p>
                                The Nordrhein Veterinary Chamber does not currently publish a central Düsseldorf emergency phone number. Its current entry for the Düsseldorf district states that there are no current publications or data and no central number.
                            </p>
                            <p>
                                This means you should not rely on an unofficial city hotline copied from another directory. Call your regular vet for its out-of-hours instructions or contact the clinic above directly.
                            </p>
                            <a
                                href={NORDRHEIN_INFO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="my-5 inline-flex min-h-11 items-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent no-underline transition-colors hover:border-accent"
                            >
                                Official Nordrhein emergency service information
                            </a>

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
                                A regular practice can maintain your pet&apos;s records and explain its own out-of-hours arrangement. Save the relevant route before an emergency occurs.
                            </p>
                            <div className="my-6 grid gap-3 sm:grid-cols-2 not-prose">
                                <Link
                                    to="/vets/düsseldorf"
                                    aria-label="Browse English-speaking vets in Düsseldorf"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    English-speaking vets in Düsseldorf
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-ruhr"
                                    aria-label="Emergency help in Essen and the Ruhr area"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency help in Essen and the Ruhr area
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-cologne"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency help in Cologne
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
                        <RelatedPosts currentPath="/guides/emergency-vets-duesseldorf" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
