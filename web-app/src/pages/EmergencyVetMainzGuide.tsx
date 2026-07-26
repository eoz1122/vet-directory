import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Mainz: Live Daily Rota and 24/7 Fallback';
const DESCRIPTION = 'Need an emergency vet in Mainz? Use the city-linked daily rota, call-ahead steps, Tierklinik Hofheim 24/7 fallback, warning signs, and GOT fees.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-mainz';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const MAINZ_ROTA_URL = 'https://www.mainzer-marktplatz.de/notdienste/tieraerzte.htm';
const MAINZ_CITY_SOURCE_URL = 'https://www.mainz.de/vv/produkte/z_haeufig-gesuchte-nichtstaedtische-dienstleistungen/tier-im-tierheim-abgeben';
const MAINZ_CALL_AHEAD_SOURCE_URL = 'https://www.tierarzt-mainz.de/wordpress/sprechzeiten/';
const HOFHEIM_EMERGENCY_URL = 'https://www.tierklinik-hofheim.de/die-klinik/notfallambulanz.html';
const HOFHEIM_PHONE = '06192 290 290';
const HOFHEIM_PHONE_HREF = 'tel:+496192290290';
const HOFHEIM_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Katharina-Kemmler-Stra%C3%9Fe+7%2C+65719+Hofheim';
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
    ['Journey', 'Where you are and how quickly you can reach the receiving practice'],
    ['Contact', 'A phone number where the veterinarian can reach you'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Haben Sie heute Notdienst?', 'Are you on duty today?'],
    ['Kann ich jetzt zu Ihnen kommen?', 'May I come to you now?'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Wir sind in ungefähr 20 Minuten da.', 'We will arrive in about 20 minutes.'],
];

const TABLE_OF_CONTENTS = [
    { id: 'mainz-rota', label: 'Find today\'s Mainz practice' },
    { id: 'mainz-hours', label: 'Local hours and call-ahead rule' },
    { id: 'hofheim', label: 'Hofheim 24-hour fallback' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'Information to prepare' },
    { id: 'fees', label: 'Fees and payment' },
    { id: 'regular-vets', label: 'Regular and national vet guides' },
];

export default function EmergencyVetMainzGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Mainz, Tierarzt Notdienst Mainz, veterinary emergency Mainz, Mainz emergency vet rota"
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
                            Rota access, call-ahead guidance, fallback care, warning signs, and fees checked against City of Mainz-linked and first-party sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Match today&apos;s date, then call
                            </p>
                            <p className="mb-3 text-lg leading-relaxed">
                                The City of Mainz links residents to a daily rota for Mainz and the surrounding area. The receiving practice can change every day.
                            </p>
                            <p className="mb-5 text-sm leading-relaxed text-secondary/75">
                                Open the live rota, find the entry for today, and call that practice before travelling. Never rely on an old screenshot or saved address.
                            </p>
                            <a
                                href={MAINZ_ROTA_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open the Mainz city-linked veterinary emergency rota"
                                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white sm:w-auto"
                            >
                                Open today&apos;s Mainz rota
                            </a>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                Do not travel without checking the live entry.
                            </p>
                            <p className="text-red-900/80">
                                The calendar is updated when arrangements change. Confirm the current practice, phone number, address, service availability, and arrival instructions before setting off.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                Neither the rotating Mainz service nor the Hofheim emergency department promises English coverage on every shift. Keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="mainz-rota" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Find today&apos;s Mainz duty practice
                            </h2>
                            <p>
                                The City of Mainz links to the daily rota under its emergency-service resources. The live calendar was last changed on 23 July 2026 and says it was created with the listed veterinary practices. Current changes are marked on that page.
                            </p>
                            <ol className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6">
                                <li>Open the live rota and match the current date.</li>
                                <li>Note the practice name, phone number, and address shown for that date.</li>
                                <li>Call before travelling and ask whether the practice is currently receiving your type of emergency.</li>
                                <li>Confirm the exact entrance and any arrival instructions.</li>
                                <li>Check the live rota again if the practice cannot receive you or directs you elsewhere.</li>
                            </ol>
                            <div className="my-6 grid gap-3 not-prose sm:grid-cols-2">
                                <a
                                    href={MAINZ_CITY_SOURCE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="City of Mainz emergency-service source"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    City of Mainz source
                                </a>
                                <a
                                    href={MAINZ_CALL_AHEAD_SOURCE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Mainz practice call-ahead guidance"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Local call-ahead guidance
                                </a>
                            </div>

                            <h2 id="mainz-hours" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Local hours and the call-ahead rule
                            </h2>
                            <p>
                                The Mainz calendar assigns a practice to each date, but it does not publish one universal set of local duty hours. Treat the live listing as the route to the responsible practice, not as a guarantee that every listed location has the same walk-in hours.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                    Safe workflow
                                </p>
                                <p className="mt-2 text-xl font-black text-primary">
                                    Check the date, call the named practice, then follow its instructions.
                                </p>
                                <p className="mt-3 text-sm text-primary/65">
                                    A participating Mainz practice separately tells emergency callers to check its answering machine or the rota outside consultation hours and to arrange a visit by phone.
                                </p>
                            </div>

                            <h2 id="hofheim" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Separate 24-hour fallback in Hofheim
                            </h2>
                            <p>
                                The Mainz rota lists Tierklinik Hofheim separately after the rotating practices. Hofheim is outside Mainz, so use it as a distinct fallback for severe cases rather than assuming it is the local duty practice.
                            </p>
                            <p>
                                The clinic states that its emergency department is staffed 24 hours a day, all year. It treats small companion animals and small mammals, but it does not treat birds or reptiles. Its out-of-hours emergency service is restricted to life-threatening patients, and less urgent patients can face long waits.
                            </p>

                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Monday to Friday, 08:00 to 19:00
                                    </p>
                                    <p className="mt-2 text-lg font-black text-primary">
                                        Call first when possible
                                    </p>
                                    <p className="mt-2 text-sm text-primary/65">
                                        The clinic asks emergency patients to register by phone during these hours.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-amber-700">
                                        Nights and weekends
                                    </p>
                                    <p className="mt-2 text-lg font-black text-amber-950">
                                        The phone is not staffed, so arrive directly
                                    </p>
                                    <p className="mt-2 text-sm text-amber-900/75">
                                        Check the clinic&apos;s live capacity light before travel. If it is red, also seek another receiving practice or clinic.
                                    </p>
                                </div>
                            </div>

                            <address className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-italic">
                                <strong className="block text-lg text-primary">Tierklinik Hofheim</strong>
                                <span className="block">Katharina-Kemmler-Straße 7, 65719 Hofheim</span>
                                <span className="mt-2 block">{HOFHEIM_PHONE}</span>
                            </address>

                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={HOFHEIM_PHONE_HREF}
                                    aria-label="Call Tierklinik Hofheim during weekday phone hours"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    Call {HOFHEIM_PHONE}
                                </a>
                                <a
                                    href={HOFHEIM_EMERGENCY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Tierklinik Hofheim live emergency information and capacity"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Live capacity and instructions
                                </a>
                                <a
                                    href={HOFHEIM_DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Get directions to Tierklinik Hofheim"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Directions to Hofheim
                                </a>
                            </div>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                German veterinary guidance uses these as examples of possible emergencies. This list is not a diagnosis and is not complete. When in doubt, call a veterinary professional who can ask follow-up questions.
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
                                Ask the receiving practice which payment methods it accepts and whether a deposit may be required. Charges depend on the examination, diagnostics, treatment, medication, and hospital care needed.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Medication, consumables, diagnostics, hospitalisation, and VAT can add to the total.</li>
                                    <li>Payment arrangements can differ between the rotating practices and the fallback clinic.</li>
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
                                Regular veterinary care in Mainz
                            </h2>
                            <p>
                                Save your regular veterinarian&apos;s phone number before an emergency occurs. The directory separately verifies English-language signals for routine practices in Mainz.
                            </p>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <Link
                                    to="/vets/mainz"
                                    aria-label="Browse English-speaking vets in Mainz"
                                    className="flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    English-speaking vets in Mainz
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

                        <RelatedPosts currentPath="/guides/emergency-vets-mainz" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
