import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Leipzig: Night & Weekend Help (2026)';
const DESCRIPTION = "Need an emergency vet in Leipzig? Find current night and weekend care, the University clinic's critical-patient service, local duty number, exotic-pet help, and GOT fees.";
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-leipzig';
const DATE_PUBLISHED = '2026-07-26';
const DATE_MODIFIED = '2026-07-26';

const NIGHT_CLINIC_PHONE = '0341 99991740';
const NIGHT_CLINIC_PHONE_HREF = 'tel:+4934199991740';
const NIGHT_CLINIC_URL = 'https://notfalltierarzt-leipzig.de/';
const LOCAL_DUTY_PHONE = '0341 94679466';
const LOCAL_DUTY_PHONE_HREF = 'tel:+4934194679466';
const UNIVERSITY_PHONE = '0341 9738711';
const UNIVERSITY_PHONE_HREF = 'tel:+493419738711';
const UNIVERSITY_URL = 'https://kleintierklinik.uni-leipzig.de/tierhalter/faq';
const BIRD_REPTILE_PHONE = '+49 175 1956835';
const BIRD_REPTILE_PHONE_HREF = 'tel:+491751956835';
const BIRD_REPTILE_URL = 'https://www.vetmed.uni-leipzig.de/klinik-fuer-voegel-und-reptilien/klinik/dienstleistungen/notdienst';
const GOT_URL = 'https://www.gesetze-im-internet.de/got_2022/__4.html';

const ARTICLE_SCHEMA = {
    ...generateArticleSchema(TITLE, DESCRIPTION, URL, DATE_PUBLISHED, DATE_MODIFIED),
    url: URL,
};

const WARNING_SIGNS = [
    'Difficulty breathing',
    'Heavy or uncontrolled bleeding',
    'Very pale or white mucous membranes',
    'A suddenly swollen abdomen with unproductive retching in a dog',
    'Repeated seizures in one day',
    'Unconsciousness, collapse, or heatstroke',
    'Difficulty or inability to urinate',
    'Persistent bloody vomiting or diarrhoea with increasing weakness',
    'Sudden complete paralysis of the legs',
    'Eye injuries',
    'Suspected poisoning, a swallowed foreign object, or burns',
    'A serious accident',
];

const CALL_DETAILS = [
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Problem', 'What happened, when it began, and whether it is getting worse'],
    ['Medical details', 'Medication, health conditions, and possible exposure to toxins'],
    ['Arrival', 'Your location and how quickly you can reach the receiving clinic'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Welche Praxis hat heute Notdienst?', 'Which practice is on duty today?'],
    ['Können wir jetzt kommen?', 'Can we come now?'],
];

const TABLE_OF_CONTENTS = [
    { id: 'night-clinic', label: 'Night and weekend clinic' },
    { id: 'local-duty', label: 'Local veterinary duty ring' },
    { id: 'university', label: 'University critical-patient service' },
    { id: 'birds-reptiles', label: 'Bird and reptile emergencies' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Regular and nearby vet guides' },
];

export default function EmergencyVetLeipzigGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Leipzig, Tierarzt Notdienst Leipzig, night vet Leipzig, weekend vet Leipzig, Leipzig University veterinary clinic"
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
                            Night, weekend, university, and exotic-pet emergency access checked against official sources on 26 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Night and weekend emergencies
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                Leipzig-Stötteritz&apos;s veterinary emergency clinic covers weekday nights and the full weekend. Telephone registration is required before treatment.
                            </p>
                            <a
                                href={NIGHT_CLINIC_PHONE_HREF}
                                aria-label="Call Leipzig-Stötteritz veterinary emergency clinic"
                                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white sm:w-auto"
                            >
                                Call {NIGHT_CLINIC_PHONE}
                            </a>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your animal may be in danger, contact a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom is safe to delay. Call the most appropriate service below and follow its current instructions.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                None of the official emergency pages promises English coverage on every shift. Ask when you call and keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="night-clinic" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Leipzig-Stötteritz night and weekend clinic
                            </h2>
                            <p>
                                The Tierärztliche Notfallambulanz at Papiermühlstraße 6, 04299 Leipzig publishes the following emergency opening hours:
                            </p>
                            <div className="my-6 grid gap-4 not-prose sm:grid-cols-2">
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Monday to Thursday
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-primary">19:00 to 08:00</p>
                                </div>
                                <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink">
                                        Weekend
                                    </p>
                                    <p className="mt-2 text-2xl font-black text-primary">Friday 19:00 to Monday 08:00</p>
                                </div>
                            </div>
                            <p>
                                The clinic states that it treats small animals, provides emergency surgery, and requires advance telephone notice. Capacity and instructions can change during a shift, so call before travelling whenever it is safe to do so.
                            </p>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={NIGHT_CLINIC_PHONE_HREF}
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    {NIGHT_CLINIC_PHONE}
                                </a>
                                <a
                                    href={NIGHT_CLINIC_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Leipzig-Stötteritz emergency information"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Leipzig-Stötteritz emergency information
                                </a>
                            </div>

                            <h2 id="local-duty" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Leipzig local veterinary duty ring
                            </h2>
                            <p>
                                Leipzig University directs less severe emergencies to a regular veterinarian or the local veterinary duty ring at <strong>{LOCAL_DUTY_PHONE}</strong>. The duty practice can change, so use the phone service rather than travelling to a saved address.
                            </p>
                            <a
                                href={LOCAL_DUTY_PHONE_HREF}
                                aria-label="Call Leipzig local veterinary duty ring"
                                className="my-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary no-underline transition-colors hover:bg-accent hover:text-primary"
                            >
                                Call {LOCAL_DUTY_PHONE}
                            </a>

                            <h2 id="university" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Leipzig University Small Animal Clinic
                            </h2>
                            <p>
                                Leipzig University publishes a 24-hour emergency service reserved for critically ill animal patients. The clinic explains that less severe emergencies must be handled by the animal&apos;s regular veterinarian or the local duty ring.
                            </p>
                            <p>
                                Call <strong>{UNIVERSITY_PHONE}</strong> to hear the current emergency number outside regular consultation hours. The clinic asks owners to use a veterinarian or duty practice first where possible and to bring previous findings and a referral when available.
                            </p>
                            <section className="my-8 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm not-prose sm:p-6">
                                <p className="text-xs font-black uppercase tracking-widest text-red-700">
                                    Critical patients only
                                </p>
                                <h3 className="mt-2 text-xl font-bold text-primary">
                                    Universität Leipzig, Klinik für Kleintiere
                                </h3>
                                <p className="mt-2 text-sm text-primary/70">
                                    An den Tierkliniken 23, 04103 Leipzig
                                </p>
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <a
                                        href={UNIVERSITY_PHONE_HREF}
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                    >
                                        {UNIVERSITY_PHONE}
                                    </a>
                                    <a
                                        href={UNIVERSITY_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Official Leipzig University small-animal emergency guidance"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                    >
                                        Official Leipzig University small-animal emergency guidance
                                    </a>
                                </div>
                            </section>

                            <h2 id="birds-reptiles" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Bird and reptile emergencies
                            </h2>
                            <p>
                                Leipzig University&apos;s specialist clinic offers a separate service on Saturday, Sunday, and public holidays from 09:30 to 13:00 and from 14:00 to 17:30. It can accept only birds and reptiles with life-threatening conditions during these emergency hours.
                            </p>
                            <p>
                                Call <strong>{BIRD_REPTILE_PHONE}</strong>. The university also asks owners of sick poultry, waterfowl, birds of prey, or zoo birds to call before arrival because of current avian-influenza controls.
                            </p>
                            <div className="my-6 flex flex-col gap-3 not-prose sm:flex-row sm:flex-wrap">
                                <a
                                    href={BIRD_REPTILE_PHONE_HREF}
                                    aria-label="Call Leipzig University bird and reptile emergency service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                >
                                    {BIRD_REPTILE_PHONE}
                                </a>
                                <a
                                    href={BIRD_REPTILE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Official Leipzig University bird and reptile emergency guidance"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                >
                                    Official Leipzig University bird and reptile emergency guidance
                                </a>
                            </div>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                Leipzig University republishes these examples from the German Federal Chamber of Veterinarians. This list is not a diagnosis and is not complete.
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
                                Qualifying out-of-hours treatment is billed under section 4 of Germany&apos;s federal veterinary fee schedule. Leipzig University&apos;s bird and reptile clinic also publishes the statutory surcharge and higher emergency rate.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, and VAT can add to the total.</li>
                                    <li>Ask the receiving clinic which payment methods it accepts.</li>
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
                                Save your regular practice&apos;s out-of-hours instructions before an emergency occurs. The directory can help you find routine veterinary care in Leipzig.
                            </p>
                            <div className="my-6 grid gap-3 sm:grid-cols-2 not-prose">
                                <Link
                                    to="/vets/leipzig"
                                    aria-label="Browse English-speaking vets in Leipzig"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    English-speaking vets in Leipzig
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-berlin"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Berlin
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-hannover"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Hannover
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
                        <RelatedPosts currentPath="/guides/emergency-vets-leipzig" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
