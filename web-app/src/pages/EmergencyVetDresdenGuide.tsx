import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Dresden: Official Duty Service (2026)';
const DESCRIPTION = 'Need an emergency vet in Dresden? Find the official Saxony duty number, live practice lookup, current night and weekend hours, warning signs, and GOT fees.';
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-dresden';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const DUTY_PHONE = '01805 84 37 36';
const DUTY_PHONE_HREF = 'tel:+491805843736';
const DUTY_LOOKUP_URL = 'https://vetnotdienst.de/';
const DRESDEN_AUTHORITY_URL = 'https://www.dresden.de/de/rathaus/aemter-und-einrichtungen/oe/dborg/stadt_dresden_6360.php?shortcut=gefluegelpest';
const DRESDEN_PUBLICATION_URL = 'https://www.dresden.de/media/pdf/schoenfeld/HLK_01_2026_oA.pdf';
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
    { id: 'official-service', label: 'Official Dresden duty service' },
    { id: 'hours', label: 'Current service hours' },
    { id: 'use-service', label: 'How to use the service' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Regular and national vet guides' },
];

export default function EmergencyVetDresdenGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Dresden, Tierarzt Notdienst Dresden, veterinary emergency Dresden, night vet Dresden, weekend vet Dresden"
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
                            Duty-service access, hours, warning signs, and fees checked against official sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Call before travelling
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                Call Saxony&apos;s central veterinary duty service and listen to the complete recorded announcement. It provides the current duty pathway instead of relying on an old practice address.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href={DUTY_PHONE_HREF}
                                    aria-label="Call the Saxony veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white"
                                >
                                    Call {DUTY_PHONE}
                                </a>
                                <a
                                    href={DUTY_LOOKUP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Find the current Saxony duty practice"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-secondary/30 px-5 py-3 text-center font-bold text-secondary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Find today&apos;s duty practice
                                </a>
                            </div>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your animal may be in danger, contact a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom is safe to delay. The duty practice should assess the urgency.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                The official service does not promise English coverage on every shift. Ask when you call and keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="official-service" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Dresden&apos;s official veterinary duty service
                            </h2>
                            <p>
                                Dresden&apos;s veterinary authority directs pet owners to Saxony&apos;s statewide small-animal emergency service. The current duty practice is identified through <strong>vetnotdienst.de</strong> or the central number <strong>{DUTY_PHONE}</strong>.
                            </p>
                            <p>
                                The receiving practice changes with the rota. Use the live service and call before travelling rather than going to a saved address.
                            </p>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={DRESDEN_AUTHORITY_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Dresden veterinary emergency guidance"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Dresden veterinary emergency guidance
                                </a>
                                <a
                                    href={DRESDEN_PUBLICATION_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Dresden 2026 duty-service publication"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Dresden 2026 publication
                                </a>
                            </div>

                            <h2 id="hours" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Current Dresden duty-service hours
                            </h2>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Monday to Friday
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-primary">18:00 to 08:00</p>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Weekend
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-primary">Friday 18:00 to Monday 08:00</p>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm sm:col-span-2">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Public holidays
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-primary">Covered all day</p>
                                </div>
                            </div>
                            <p>
                                These are the hours published by the City of Dresden for the Saxony duty service. Recheck the live service when you need help because arrangements can change.
                            </p>

                            <h2 id="use-service" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                How to use the Saxony service
                            </h2>
                            <ol className="my-6 space-y-3 rounded-2xl border border-primary/10 bg-white p-6">
                                <li>Call <strong>{DUTY_PHONE}</strong> or open the live practice map.</li>
                                <li>Listen to the complete recorded announcement before ending the call.</li>
                                <li>Contact the announced practice and describe the emergency.</li>
                                <li>Travel only after the practice confirms where and when to come.</li>
                            </ol>
                            <p>
                                This routing process matters because the duty practice can change. The service is for urgent out-of-hours veterinary care, not routine appointments.
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
                                    aria-label="Federal GOT section 4"
                                    className="mt-5 inline-flex min-h-11 items-center font-bold text-accent underline"
                                >
                                    Federal GOT section 4
                                </a>
                            </div>

                            <h2 id="regular-vets" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Regular veterinary care in Dresden
                            </h2>
                            <p>
                                Save your regular practice&apos;s out-of-hours instructions before an emergency occurs. The directory can help you find routine veterinary care in Dresden.
                            </p>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <Link
                                    to="/vets/dresden"
                                    aria-label="Browse English-speaking vets in Dresden"
                                    className="flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    English-speaking vets in Dresden
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

                        <RelatedPosts currentPath="/guides/emergency-vets-dresden" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
