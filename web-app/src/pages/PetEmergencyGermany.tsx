import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import GuideDisclaimer from '../components/GuideDisclaimer';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = 'Emergency Vet Germany: Night & Weekend Help (2026)';
const ARTICLE_DESCRIPTION = 'Find an emergency vet in Germany at night or on weekends. Use verified city services, call before travel, check warning signs, and understand official GOT fees.';
const ARTICLE_URL = 'https://englishspeakinggermany.online/guides/pet-emergency-germany';
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2026-07-24';

const articleSchema = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const emergencySigns = [
    'Loss of consciousness or collapse',
    'Difficulty breathing',
    'Heavy or uncontrolled bleeding',
    'Very pale mucous membranes',
    'Seizures',
    'Difficulty urinating',
    'Persistent bloody diarrhoea or vomiting with increasing weakness',
    'Sudden paralysis of the legs',
    'Eye injuries',
    'Swallowed foreign objects or toxins',
    'Scalds, burns, heatstroke, or a serious traffic accident',
];

const preparationItems = [
    'Save your regular vet phone number and ask which service covers nights and weekends.',
    'Keep a secure carrier or lead where you can reach it quickly.',
    'Save your pet insurance details, medication list, and important medical records.',
    'Ask the receiving practice which payment methods it accepts.',
];

const tableOfContents = [
    { id: 'find-help', label: 'Find night or weekend help' },
    { id: 'warning-signs', label: 'Emergency warning signs' },
    { id: 'call-first', label: 'Call before travel' },
    { id: 'fees', label: 'Official GOT emergency fees' },
    { id: 'same-day', label: 'Same-day appointments' },
    { id: 'prepare', label: 'Prepare before an emergency' },
];

export default function PetEmergencyGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta name="keywords" content="emergency vet Germany, night vet Germany, weekend vet Germany, veterinary duty service Germany, Tierarzt Notdienst" />
                <meta property="og:title" content={ARTICLE_TITLE} />
                <meta property="og:description" content={ARTICLE_DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={ARTICLE_URL} />
                <link rel="canonical" href={ARTICLE_URL} />
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl prose prose-lg prose-forest text-primary/80">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Emergency Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6 leading-tight">
                            Emergency Vet in Germany: Night and Weekend Help (2026)
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-primary/60 mb-8">
                            <span>Last verified: July 2026</span>
                            <span className="hidden sm:inline" aria-hidden="true">·</span>
                            <span>Call the receiving practice before you travel.</span>
                        </div>

                        <TableOfContents items={tableOfContents} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl my-8 not-prose">
                                <p className="font-bold text-red-900 text-lg mb-2">
                                    If your pet may be in danger, call a veterinary practice or local duty service now.
                                </p>
                                <p className="text-red-900/80 mb-0">
                                    Do not use this page to decide that a symptom can safely wait. A veterinary professional
                                    who can ask follow-up questions should make that assessment.
                                </p>
                            </div>

                            <p className="text-xl text-primary/75 mb-8">
                                Germany has no single nationwide veterinary emergency number. Night and weekend care is
                                organised locally through veterinary clinics, practices, duty rosters, and state veterinary
                                chambers. The correct contact can change by city, date, and time.
                            </p>

                            <h2 id="find-help" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                How to find an emergency vet at night or on weekends
                            </h2>

                            <ol className="space-y-4">
                                <li>
                                    <strong>Call your regular vet.</strong> Its voicemail or website may name the current
                                    out-of-hours service.
                                </li>
                                <li>
                                    <strong>Use a verified local route.</strong> Berlin publishes a chamber list of
                                    24-hour providers, while Hamburg uses a rotating veterinary duty service.
                                </li>
                                <li>
                                    <strong>Check your state veterinary chamber.</strong> Emergency arrangements are
                                    regional, so use the chamber for the place where you are physically located.
                                </li>
                                <li>
                                    <strong>Call before you travel.</strong> Confirm that the service is open, can treat
                                    your animal, and wants you to come to that location.
                                </li>
                            </ol>

                            <div className="grid md:grid-cols-2 gap-5 my-8 not-prose">
                                <Link
                                    to="/guides/emergency-vets-berlin"
                                    aria-label="Berlin emergency vet guide"
                                    className="block min-h-11 p-5 bg-white border border-primary/10 rounded-2xl hover:border-accent transition-colors"
                                >
                                    <span className="font-bold text-primary block mb-1">Berlin emergency vet guide</span>
                                    <span className="text-sm text-primary/70">Verified chamber-listed 24-hour providers and phone numbers.</span>
                                </Link>
                                <Link
                                    to="/blog/emergency-vet-hamburg-english"
                                    aria-label="Hamburg emergency duty guide"
                                    className="block min-h-11 p-5 bg-white border border-primary/10 rounded-2xl hover:border-accent transition-colors"
                                >
                                    <span className="font-bold text-primary block mb-1">Hamburg emergency duty guide</span>
                                    <span className="text-sm text-primary/70">Current duty-service workflow, hours, and central phone number.</span>
                                </Link>
                                <a
                                    href="https://bundestieraerztekammer.de/btk/mitglieder/"
                                    aria-label="German state veterinary chambers"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block min-h-11 p-5 bg-white border border-primary/10 rounded-2xl hover:border-accent transition-colors"
                                >
                                    <span className="font-bold text-primary block mb-1">German state veterinary chambers</span>
                                    <span className="text-sm text-primary/70">Official list covering every German chamber region.</span>
                                </a>
                                <a
                                    href="https://www.bundestieraerztekammer.de/presse/2019/08/notdienst-flyer.php"
                                    aria-label="Official German veterinary emergency guide"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block min-h-11 p-5 bg-white border border-primary/10 rounded-2xl hover:border-accent transition-colors"
                                >
                                    <span className="font-bold text-primary block mb-1">Official German veterinary emergency guide</span>
                                    <span className="text-sm text-primary/70">Warning signs, safe transport, and how emergency services work.</span>
                                </a>
                            </div>

                            <h2 id="warning-signs" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Warning signs in the official veterinary guide
                            </h2>
                            <p>
                                The German Federal Chamber of Veterinarians lists the following examples as signs of an
                                emergency. This is not a complete diagnostic checklist.
                            </p>
                            <div className="bg-white border border-primary/10 p-6 rounded-2xl my-8 not-prose">
                                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-primary/80">
                                    {emergencySigns.map((sign) => (
                                        <li key={sign} className="flex gap-3">
                                            <span className="text-red-600" aria-hidden="true">●</span>
                                            <span>{sign}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p>
                                If poisoning or a swallowed object is suspected, tell the veterinary professional what
                                substance or object may be involved and follow their instructions. This guide does not
                                publish a national animal poison hotline because no verified nationwide veterinary number
                                was identified.
                            </p>

                            <h2 id="call-first" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Call before you travel
                            </h2>
                            <p>
                                Telephone pre-registration lets the service assess urgency, confirm the correct location,
                                prepare for arrival, and give transport instructions. Availability can change, even when
                                an older directory entry or search result says a clinic is open.
                            </p>

                            <div className="bg-primary text-secondary p-6 md:p-8 rounded-2xl my-8 not-prose">
                                <p className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
                                    Useful German phrase
                                </p>
                                <p className="text-lg mb-2">
                                    Hallo, ich habe einen tiermedizinischen Notfall. Mein Hund / meine Katze hat
                                    [symptoms]. Kann ich jetzt kommen?
                                </p>
                                <p className="text-sm text-secondary/75 mb-0">
                                    Hello, I have a veterinary emergency. My dog / cat has [symptoms]. Can I come now?
                                </p>
                            </div>

                            <h2 id="fees" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official GOT emergency-service fees
                            </h2>
                            <p>
                                Under section 4 of the federal veterinary fee regulation, qualifying emergency-service
                                work is billed at two to four times the GOT rate, plus a €50 net emergency-service fee.
                                With 19 percent VAT, that fixed fee is €59.50 gross. Diagnostics, treatment, medicines,
                                materials, and other invoice items are additional, so there is no reliable universal
                                minimum total.
                            </p>
                            <p>
                                These emergency rules apply only when care is provided as part of a veterinary emergency
                                service during the defined night, weekend, or public-holiday periods. A regular scheduled
                                consultation offered during those hours is not automatically emergency service.
                            </p>
                            <a
                                href="https://www.gesetze-im-internet.de/got_2022/__4.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 items-center text-accent-ink font-bold underline underline-offset-4"
                            >
                                Federal GOT section 4
                            </a>

                            <h2 id="same-day" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Can you book a same-day vet appointment online?
                            </h2>
                            <p>
                                Some practices offer online booking, but a same-day appointment is never guaranteed and
                                an online calendar should not delay an emergency call. For a non-emergency same-day
                                request, find a nearby practice and call to ask about current availability. For urgent
                                symptoms, use the emergency route above instead.
                            </p>
                            <Link
                                to="/"
                                className="inline-flex min-h-11 items-center bg-accent-ink text-white font-bold px-6 py-3 rounded-xl no-underline hover:bg-primary transition-colors"
                            >
                                Find a regular English-speaking vet
                            </Link>

                            <h2 id="prepare" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Prepare before an emergency
                            </h2>
                            <div className="bg-white p-6 rounded-2xl border border-primary/10 my-8 not-prose">
                                <ul className="space-y-4 text-primary/80">
                                    {preparationItems.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="text-green-700" aria-hidden="true">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <GuideDisclaimer />
                        <RelatedPosts currentPath="/guides/pet-emergency-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
