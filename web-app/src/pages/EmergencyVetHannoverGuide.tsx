import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import GuideDisclaimer from '../components/GuideDisclaimer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Emergency Vet Hannover: TiHo 24-Hour Help (2026)';
const DESCRIPTION = "Need an emergency vet in Hannover? Find TiHo's 24-hour dog-and-cat service, exotic-pet emergency access, warning signs, GOT fees, and call phrases.";
const URL = 'https://englishspeakinggermany.online/guides/emergency-vets-hannover';
const DATE_PUBLISHED = '2026-07-25';
const DATE_MODIFIED = '2026-07-25';

const SMALL_ANIMAL_PHONE = '0511 953-6200';
const SMALL_ANIMAL_PHONE_HREF = 'tel:+495119536200';
const EXOTIC_PHONE = '0511 953-6800';
const EXOTIC_PHONE_HREF = 'tel:+495119536800';
const TIHO_CONTACT_URL = 'https://www.tiho-hannover.de/kliniken-institute/kliniken/klinik-fuer-kleintiere/kontakt';
const TIHO_EMERGENCY_URL = 'https://www.tiho-hannover.de/kliniken-institute/kliniken/klinik-fuer-kleintiere/notdienst-information';
const EXOTIC_URL = 'https://www.tiho-hannover.de/kliniken-institute/kliniken/klinik-fuer-heimtiere-reptilien-und-voegel/kontakt';
const CHAMBER_URL = 'https://www.tknds.de/tieraerzte/gesetze-verordnungen/notfalldienstordnung/';
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
    ['Arrival', 'Your location and how quickly you can reach Bünteweg 9'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall.', 'My pet has an emergency.'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen.', 'My pet cannot breathe properly.'],
    ['Können wir jetzt kommen?', 'Can we come now?'],
    ['Wir sind in ungefähr 20 Minuten da.', 'We will arrive in about 20 minutes.'],
];

const TABLE_OF_CONTENTS = [
    { id: 'dogs-cats', label: 'Dogs and cats at TiHo' },
    { id: 'triage', label: 'Triage and capacity' },
    { id: 'exotic-pets', label: 'Exotic pets and birds' },
    { id: 'local-duty', label: 'Lower Saxony duty rules' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call', label: 'What to say when calling' },
    { id: 'fees', label: 'Official emergency fees' },
    { id: 'regular-vets', label: 'Local and nearby guides' },
];

export default function EmergencyVetHannoverGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="emergency vet Hannover, 24 hour vet Hannover, TiHo emergency, Tierarzt Notdienst Hannover, exotic pet emergency Hannover"
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
                            Clinic access, phone details, warning signs, and fees checked against official sources on 25 July 2026.
                        </p>

                        <section className="mb-8 rounded-2xl bg-primary p-6 text-secondary shadow-lg md:p-8">
                            <p className="mb-2 text-xs font-black uppercase tracking-widest text-accent">
                                Call first when it is safe
                            </p>
                            <p className="mb-5 text-lg leading-relaxed">
                                TiHo publishes separate 24-hour emergency access for dogs and cats and for exotic pets. Use the number for your animal&apos;s clinic and describe the emergency clearly.
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href={SMALL_ANIMAL_PHONE_HREF}
                                    aria-label="Call TiHo Hannover Small Animal Clinic"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center font-black text-primary transition-colors hover:bg-white"
                                >
                                    Dogs and cats: {SMALL_ANIMAL_PHONE}
                                </a>
                                <a
                                    href={EXOTIC_PHONE_HREF}
                                    aria-label="Call TiHo Hannover exotic-pet clinic"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-secondary/30 px-5 py-3 text-center font-black text-secondary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Exotic pets: {EXOTIC_PHONE}
                                </a>
                            </div>
                        </section>

                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                            <p className="mb-2 text-lg font-bold text-red-900">
                                If your animal may be in danger, contact a veterinary professional now.
                            </p>
                            <p className="text-red-900/80">
                                Do not use this page to decide that a symptom is safe to delay. TiHo assesses patients by medical urgency.
                            </p>
                        </div>

                        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <p className="font-bold text-amber-950">
                                English availability is not guaranteed.
                            </p>
                            <p className="mt-2 text-sm text-amber-900/80">
                                TiHo&apos;s emergency pages do not promise English coverage on every shift. Ask when you call and keep the German phrases below ready.
                            </p>
                        </div>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <h2 id="dogs-cats" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Dogs and cats: TiHo Small Animal Clinic
                            </h2>
                            <p>
                                The University of Veterinary Medicine Hannover&apos;s Small Animal Clinic publishes a 24-hour emergency service at Bünteweg 9, 30559 Hannover. Its emergency number is <strong>{SMALL_ANIMAL_PHONE}</strong>.
                            </p>
                            <section className="my-8 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm not-prose sm:p-6">
                                <p className="text-xs font-black uppercase tracking-widest text-red-700">
                                    Official 24-hour service
                                </p>
                                <h3 className="mt-2 text-xl font-bold text-primary">
                                    TiHo Klinik für Kleintiere
                                </h3>
                                <p className="mt-2 text-sm text-primary/70">
                                    Bünteweg 9, 30559 Hannover
                                </p>
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <a
                                        href={SMALL_ANIMAL_PHONE_HREF}
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                    >
                                        {SMALL_ANIMAL_PHONE}
                                    </a>
                                    <a
                                        href={TIHO_EMERGENCY_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Official TiHo Hannover emergency information"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                    >
                                        Official TiHo Hannover emergency information
                                    </a>
                                    <a
                                        href={TIHO_CONTACT_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                    >
                                        Official clinic contact page
                                    </a>
                                </div>
                            </section>

                            <h2 id="triage" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                TiHo triage and current capacity limits
                            </h2>
                            <p>
                                TiHo states that critical and acutely life-threatening emergencies are treated around the clock. Every arriving animal first receives veterinary triage, so patients are treated by medical urgency rather than arrival time.
                            </p>
                            <p>
                                If a case is assessed as not time-critical, TiHo may direct the owner to another suitable provider, the responsible rotating duty service, another clinic, or a later appointment. This is why calling first is helpful when the animal&apos;s condition permits it.
                            </p>

                            <h2 id="exotic-pets" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Rabbits, birds, reptiles, and other exotic pets
                            </h2>
                            <p>
                                TiHo has a separate clinic for rabbits, small mammals, birds, reptiles, and amphibians at the same Bünteweg 9 campus. Its official page states that staff are on site 24 hours a day.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <p className="font-bold text-primary">
                                    Klinik für Heimtiere, Reptilien und Vögel
                                </p>
                                <p className="mt-2 text-sm text-primary/70">
                                    Call {EXOTIC_PHONE}. If you cannot reach the exotic-pet clinic by phone during an emergency, its official instructions say to come directly to the clinic.
                                </p>
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <a
                                        href={EXOTIC_PHONE_HREF}
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-secondary transition-colors hover:bg-accent hover:text-primary"
                                    >
                                        {EXOTIC_PHONE}
                                    </a>
                                    <a
                                        href={EXOTIC_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Official TiHo exotic-pet emergency information"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent transition-colors hover:border-accent"
                                    >
                                        Official TiHo exotic-pet emergency information
                                    </a>
                                </div>
                            </div>

                            <h2 id="local-duty" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                How Lower Saxony&apos;s veterinary duty service works
                            </h2>
                            <p>
                                The Lower Saxony Veterinary Chamber requires continuous emergency coverage, while local chamber districts organise their own duty areas and rosters. A non-duty practice should provide contact details for the currently available practice.
                            </p>
                            <p>
                                The chamber defines the duty service as first aid, especially for life-threatening cases. Follow-up care should normally return to the animal&apos;s regular veterinarian.
                            </p>
                            <a
                                href={CHAMBER_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Official Lower Saxony veterinary emergency rules"
                                className="my-5 inline-flex min-h-11 items-center rounded-xl border border-primary/15 px-5 py-3 text-center font-bold text-accent no-underline transition-colors hover:border-accent"
                            >
                                Official Lower Saxony veterinary emergency rules
                            </a>

                            <h2 id="warning-signs" className="mt-16 scroll-mt-24 text-3xl font-bold text-primary">
                                Emergency warning signs
                            </h2>
                            <p>
                                TiHo republishes these examples from the German Federal Chamber of Veterinarians. This list is not a diagnosis and is not complete.
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
                                Qualifying out-of-hours treatment is billed under section 4 of Germany&apos;s federal veterinary fee schedule. TiHo&apos;s exotic-pet clinic also publishes its emergency surcharge and higher treatment rate.
                            </p>
                            <div className="my-6 rounded-2xl border border-primary/10 bg-white p-6 not-prose">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net).</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, treatment, medication, consumables, and VAT can add to the total.</li>
                                    <li>TiHo states that its services must be paid directly.</li>
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
                                    to="/vets/hannover"
                                    aria-label="Browse English-speaking vets in Hannover"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-primary"
                                >
                                    English-speaking vets in Hannover
                                </Link>
                                <Link
                                    to="/blog/emergency-vet-hamburg-english"
                                    aria-label="Emergency vet help in Hamburg"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Hamburg
                                </Link>
                                <Link
                                    to="/guides/emergency-vets-berlin"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/15 px-5 py-3 text-center text-sm font-bold text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    Emergency vet help in Berlin
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
                        <RelatedPosts currentPath="/guides/emergency-vets-hannover" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
