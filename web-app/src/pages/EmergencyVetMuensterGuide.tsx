import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Münster: Official 2026 Duty Rota';
const DESCRIPTION = 'Need an emergency vet in Münster? Use the official 2026 rota and participating-practice list, call-ahead steps, 08:00 handover time, warning signs, and GOT fees.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-muenster';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const FINDER_URL = 'https://www.tieraerztekammer-wl.de/fuer-tierhalter/notdienst-finder/';
const CALENDAR_URL = 'https://www.tieraerztekammer-wl.de/fileadmin/user_upload/tak/04_Fuer_Tierhalter/04.3_Notdienst-Finder/NotdienstMuenster2026_040626.pdf';
const PRACTICE_LIST_URL = 'https://www.tieraerztekammer-wl.de/fileadmin/user_upload/tak/04_Fuer_Tierhalter/04.3_Notdienst-Finder/NamenslisteKollegenNotdienstMuenster2025Neu.pdf';
const INSTRUCTIONS_URL = 'https://www.tieraerztekammer-wl.de/fileadmin/user_upload/tak/04_Fuer_Tierhalter/04.3_Notdienst-Finder/Was_tun_im_Notfall.pdf';
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
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Problem', 'What happened, when it began, and whether it is getting worse'],
    ['Medical details', 'Medication, health conditions, and possible exposure to toxins'],
    ['Journey', 'Where you are and how quickly you can reach the assigned practice'],
    ['Contact', 'A phone number where the veterinarian can reach you'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Haben Sie heute Notdienst?', 'Are you on duty today?'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Wir sind in ungefähr 20 Minuten da.', 'We will arrive in about 20 minutes.'],
];

const TABLE_OF_CONTENTS = [
    { id: 'find-practice', label: 'Find the current practice' },
    { id: 'hours', label: 'Duty hours and call-ahead rule' },
    { id: 'transport', label: 'Transport and arrival' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'Information to prepare' },
    { id: 'fees', label: 'Fees and payment' },
    { id: 'regular-vets', label: 'Regular and national vet guides' },
];

export default function EmergencyVetMuensterGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Münster, Tierarzt Notdienst Münster, veterinary emergency Münster, Münster Notdienstplan 2026"
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
                            Calendar workflow, hours, warning signs, transport, and fees checked against official chamber sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Match the date, then call
                            </p>
                            <p className="mb-3 text-lg leading-relaxed">
                                The Westfalen-Lippe Veterinary Chamber publishes Münster&apos;s current 2026 duty calendar. It names the practice responsible for each date.
                            </p>
                            <p className="mb-5 text-sm leading-relaxed text-secondary/75">
                                Find today&apos;s practice, use the chamber-linked list to get its phone number, and call before travelling. Never rely on an old screenshot.
                            </p>
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the official Münster 2026 veterinary duty calendar"
                                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white sm:w-auto"
                            >
                                Open the official 2026 calendar
                            </a>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                Do not travel using only the practice abbreviation.
                            </p>
                            <p className="text-red-900/80">
                                Cross-reference the calendar with the participating-practice list, call the practice, and confirm both the address and arrival instructions before setting off.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                The chamber rota does not promise English coverage at every participating practice. Keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="find-practice" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Find today&apos;s duty practice
                            </h2>
                            <p>
                                The chamber&apos;s Münster entry does not publish a central citywide number. Instead, it links the calendar and a separate list of participating practices with their phone numbers and addresses. The current 2026 calendar was updated on 4 June 2026.
                            </p>
                            <ol className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6">
                                <li>Open the 2026 calendar and find the abbreviation or name for today&apos;s date.</li>
                                <li>Open the chamber-linked participating-practice list and match that entry.</li>
                                <li>Call the listed practice before leaving home.</li>
                                <li>Confirm that the practice is currently responsible and wants you to travel there.</li>
                                <li>Write down the exact address and any arrival instructions.</li>
                            </ol>
                            <p>
                                The participating-practice list currently linked by the chamber is marked 10 June 2025. Use it only through the current chamber finder and confirm all details by phone.
                            </p>
                            <div className="my-6 grid gap-3 not-prose sm:grid-cols-2">
                                <a
                                    href={FINDER_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Westfalen-Lippe veterinary emergency finder"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official chamber finder
                                </a>
                                <a
                                    href={PRACTICE_LIST_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Münster participating-practice list"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Participating-practice list
                                </a>
                            </div>

                            <h2 id="hours" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Duty hours and telephone registration
                            </h2>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                    Published duty-day coverage
                                </p>
                                <p className="mt-2 text-2xl font-black text-primary">
                                    08:00 until the following day at 08:00
                                </p>
                                <p className="mt-3 text-sm text-primary/65">
                                    The assigned practice is continuously reachable by telephone during its duty period.
                                </p>
                            </div>
                            <p>
                                The chamber strongly recommends telephone registration. Münster&apos;s own instructions are firmer: call first and never travel without arranging the visit. Your regular veterinarian&apos;s voicemail may also identify the current duty practice.
                            </p>
                            <a
                                href={INSTRUCTIONS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Official Münster veterinary emergency instructions"
                                className="my-5 inline-flex min-h-11 items-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent no-underline transition-colors hover:border-accent"
                            >
                                Official Münster emergency instructions
                            </a>

                            <h2 id="transport" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Transport and arrival
                            </h2>
                            <p>
                                The Münster instructions state that house visits are not available during the emergency service. You must organise transport and bring the animal to the receiving practice.
                            </p>
                            <ul className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6">
                                <li>Ask for the exact entrance and parking instructions when calling.</li>
                                <li>Bring the pet&apos;s medication, vaccination record, and relevant medical documents when available.</li>
                                <li>Use a secure carrier, lead, blanket, or other restraint appropriate for the animal.</li>
                                <li>Follow-up care is normally transferred back to your regular veterinarian.</li>
                            </ul>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                German veterinary chambers publish these examples of veterinary emergencies. This list is not a diagnosis and is not complete.
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
                                Münster&apos;s instructions say payment is usually made immediately and in cash. Ask the assigned practice about accepted payment methods before travelling.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, hospitalisation, and VAT can add to the total.</li>
                                    <li>Payment arrangements can differ between participating practices.</li>
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
                                Regular veterinary care in Münster
                            </h2>
                            <p>
                                Save your regular veterinarian&apos;s phone number before an emergency occurs. The directory separately verifies English-language signals for routine practices in Münster.
                            </p>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <Link
                                    to="/vets/münster"
                                    aria-label="Browse English-speaking vets in Münster"
                                    className="flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    English-speaking vets in Münster
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

                        <RelatedPosts currentPath="/guides/emergency-vets-muenster" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
