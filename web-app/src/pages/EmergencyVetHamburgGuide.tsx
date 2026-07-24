import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import { generateArticleSchema } from '../utils/schema';

const TITLE = '24-Hour Emergency Vet Hamburg: What to Call (2026)';
const DESCRIPTION = 'Need emergency veterinary care in Hamburg? During official duty hours, call 040 434379 for the current practice. Check hours, GOT fees, and warning signs.';
const URL = 'https://englishspeakinggermany.online/blog/emergency-vet-hamburg-english';
const DATE_PUBLISHED = '2026-06-02';
const DATE_MODIFIED = '2026-07-22';
const DUTY_PHONE = '040 434379';
const DUTY_PHONE_HREF = 'tel:+4940434379';
const DUTY_SCHEDULE_URL = 'https://tieraerztekammer-hamburg.de/aktueller-notdienstplan';
const EMERGENCY_INFO_URL = 'https://tieraerztekammer-hamburg.de/was-ist-ein-notfall';
const WARNING_SIGNS_URL = 'https://www.anicura.de/leistungen/katze/notdienst-katze/';
const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const URGENT_WARNING_SIGNS = [
    'Difficulty breathing or blue/grey gums',
    'Collapse, unconsciousness, or severe weakness',
    'Heavy or uncontrolled bleeding',
    'Seizures',
    'Severe injury or a traffic accident',
    'Sudden paralysis',
    'Suspected poisoning',
];

const CALL_DETAILS = [
    ['Animal', 'Species, breed, age, and approximate weight'],
    ['Symptoms', 'What happened, when it started, and whether it is getting worse'],
    ['Medication', 'Current medication and relevant medical conditions'],
    ['Possible exposure', 'Anything swallowed, inhaled, or touched'],
    ['Location', 'Your district and how quickly you can travel'],
];

const GERMAN_PHRASES = [
    ['Mein Tier hat einen Notfall', 'My pet has an emergency'],
    ['Ist jemand da, der Englisch spricht?', 'Is someone there who speaks English?'],
    ['Mein Tier kann nicht richtig atmen', 'My pet cannot breathe properly'],
    ['Wir sind in etwa zehn Minuten da', 'We will be there in about ten minutes'],
];

const TRAVEL_OPTIONS = [
    {
        icon: '🚗',
        title: 'Car',
        description: 'Confirm the destination first. Secure your pet safely and have another person drive when possible.',
    },
    {
        icon: '🚕',
        title: 'Taxi or rideshare',
        description: 'Tell the driver about the animal before pickup and use a carrier or another safe restraint.',
    },
    {
        icon: '🚇',
        title: 'Public transport',
        description: 'Check the operator\'s current animal rules. Ask the duty practice about the quickest safe route from your location.',
    },
];

export default function EmergencyVetHamburgGuide() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-secondary/20">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <link rel="canonical" href={URL} />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:url" content={URL} />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
            </Helmet>

            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 mt-16 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-24">
                            <BlogSidebar />
                        </div>
                    </div>

                    <article className="lg:w-3/4 max-w-4xl">
                        <div className="mb-4 text-sm font-bold text-accent uppercase tracking-wider">
                            EMERGENCY GUIDE
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            {TITLE}
                        </h1>
                        <p className="mb-8 text-sm text-primary/60">
                            Duty number, hours, and fees checked against official sources on 22 July 2026.
                        </p>

                        <div className="bg-primary text-secondary rounded-2xl p-6 md:p-8 mb-10 shadow-lg">
                            <p className="text-xs font-black uppercase tracking-widest text-accent mb-2">Official Hamburg duty line</p>
                            <p className="text-lg leading-relaxed mb-5">
                                At night, on weekends, and on public holidays, call the central service to learn which practice is currently on duty. The assigned practice changes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={DUTY_PHONE_HREF}
                                    aria-label="Call Hamburg veterinary duty service"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 py-3 font-black text-primary hover:bg-white transition-colors"
                                >
                                    📞 Call {DUTY_PHONE}
                                </a>
                                <a
                                    href={DUTY_SCHEDULE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors"
                                >
                                    Official Hamburg duty schedule
                                </a>
                            </div>
                        </div>

                        <div className="bg-secondary/30 p-6 rounded-2xl mb-12 border border-primary/10">
                            <TableOfContents items={[
                                { id: 'official-service', label: '1. The Official Hamburg Emergency Service' },
                                { id: 'warning-signs', label: '2. Emergency Warning Signs' },
                                { id: 'before-travel', label: '3. Before You Travel' },
                                { id: 'what-to-say', label: '4. What to Say When You Call' },
                                { id: 'costs', label: '5. Official Emergency Fees' },
                                { id: 'regular-vet', label: '6. Find a Regular Hamburg Vet' },
                            ]} />
                        </div>

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Hamburg does not publish a fixed list of permanent 24/7 clinics. The Veterinary Chamber operates a rotating duty service and publishes the currently assigned practice.
                            </p>

                            <h2 id="official-service" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                📞 1. The Official Hamburg Emergency Service
                            </h2>
                            <p>
                                The central veterinary duty number is <strong>{DUTY_PHONE}</strong>. Call before travelling so the service can direct you to the current duty practice and that practice can prepare for your arrival.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                                <div className="rounded-xl border border-primary/10 bg-white p-5">
                                    <p className="font-bold text-primary">Weekday duty hours</p>
                                    <p className="mt-2 text-sm text-primary/70">Monday to Friday: 20:00 to 08:00 the following morning.</p>
                                </div>
                                <div className="rounded-xl border border-primary/10 bg-white p-5">
                                    <p className="font-bold text-primary">Weekend and holiday duty hours</p>
                                    <p className="mt-2 text-sm text-primary/70">Weekends and public holidays: 08:00 to 08:00 the following morning.</p>
                                </div>
                            </div>
                            <p>
                                During ordinary weekday daytime hours, contact a regular veterinary practice directly. Outside those hours, use the central duty line instead of relying on an old static clinic list.
                            </p>

                            <h2 id="warning-signs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                🚨 2. Emergency Warning Signs
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-red-700 mb-3">Seek urgent veterinary help</h3>
                                    <ul className="space-y-1.5 text-sm text-red-800">
                                        {URGENT_WARNING_SIGNS.map((sign) => (
                                            <li key={sign} className="flex items-start gap-1.5">
                                                <span className="text-red-500 mt-0.5">•</span>
                                                {sign}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-yellow-700 mb-3">Call for professional triage</h3>
                                    <p className="text-sm text-yellow-800">
                                        Do not use this page to decide whether a symptom can safely wait. If you are unsure, call a veterinary practice or the duty service and describe the symptoms and duration.
                                    </p>
                                    <p className="text-xs text-yellow-700 mt-3 italic">
                                        Duty practices prioritize patients by medical severity, so waiting times can change.
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm">
                                See the{' '}
                                <a href={WARNING_SIGNS_URL} target="_blank" rel="noopener noreferrer">veterinary emergency warning-sign guidance</a>{' '}
                                used for this summary.
                            </p>

                            <h2 id="before-travel" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                🚗 3. Before You Travel
                            </h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-3">
                                {CALL_DETAILS.map(([label, detail], index) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <span className="bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="font-bold text-primary text-sm">{label}</p>
                                            <p className="text-primary/60 text-sm">{detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
                                {TRAVEL_OPTIONS.map((option) => (
                                    <div key={option.title} className="bg-white p-5 rounded-xl border border-primary/10">
                                        <p className="text-2xl mb-2">{option.icon}</p>
                                        <h3 className="font-bold text-primary text-sm mb-1">{option.title}</h3>
                                        <p className="text-primary/70 text-sm">{option.description}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 id="what-to-say" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                💬 4. What to Say When You Call
                            </h2>
                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <div className="space-y-3">
                                    {GERMAN_PHRASES.map(([german, english]) => (
                                        <div key={german} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                            <span className="text-accent font-bold text-sm sm:min-w-[230px] italic">{german}</span>
                                            <span className="text-primary/70 text-sm">{english}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 id="costs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                💶 5. Official Emergency Fees
                            </h2>
                            <p>
                                Germany's veterinary fee schedule, the <em>Gebührenordnung für Tierärztinnen und Tierärzte</em> (GOT), applies to emergency treatment. Total costs depend on the examination, diagnostics, medication, materials, and treatment required.
                            </p>
                            <div className="my-6 not-prose rounded-xl border border-primary/10 bg-white p-6">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net) during official duty periods.</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Additional treatment, diagnostics, medication, and materials are charged separately.</li>
                                </ul>
                                <a
                                    href={EMERGENCY_INFO_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex min-h-11 items-center font-bold text-accent underline hover:text-primary"
                                >
                                    Official Hamburg emergency and fee information
                                </a>
                            </div>
                            <p>
                                Ask the duty practice which payment methods it accepts. The Hamburg Veterinary Chamber advises owners to be prepared for immediate payment, commonly by cash or EC card.
                            </p>

                            <h2 id="regular-vet" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                🩺 6. Find a Regular Hamburg Vet
                            </h2>
                            <p>
                                A regular practice can handle daytime concerns, maintain your pet's records, and tell you what to do when it is closed. Save both your regular vet's number and the Hamburg duty number before an emergency.
                            </p>
                            <div className="bg-accent/10 p-5 rounded-xl border border-accent/20 my-6 not-prose">
                                <Link
                                    to="/vets/hamburg"
                                    aria-label="Browse English-speaking vets in Hamburg"
                                    className="inline-flex min-h-11 items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-primary transition-colors"
                                >
                                    Browse English-speaking vets in Hamburg →
                                </Link>
                            </div>

                            <p className="text-sm italic opacity-70 not-prose">
                                This guide supports emergency preparation and does not replace veterinary assessment. Service assignments and availability can change, so always call first.
                            </p>
                        </div>

                        <RelatedPosts currentPath="/blog/emergency-vet-hamburg-english" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
