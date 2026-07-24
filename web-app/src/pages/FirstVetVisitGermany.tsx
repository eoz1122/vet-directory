import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'First Vet Visit in Germany: What to Bring (2026)';
const DESCRIPTION = 'Prepare for your first vet visit in Germany. Bring records and medicines, confirm language and payment, understand GOT fees, and request an itemised invoice.';
const CANONICAL_URL = 'https://englishspeakinggermany.online/blog/first-vet-visit-germany';

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    CANONICAL_URL,
    '2026-04-14',
    '2026-07-24',
);

const TABLE_OF_CONTENTS = [
    { id: 'choose', label: '1. Choose and contact a practice' },
    { id: 'bring', label: '2. What to bring' },
    { id: 'appointment', label: '3. During the appointment' },
    { id: 'vaccination', label: '4. Vaccination and pet passports' },
    { id: 'costs', label: '5. GOT fees and invoices' },
    { id: 'payment', label: '6. Payment and insurance' },
    { id: 'after', label: '7. Before you leave' },
    { id: 'phrases', label: 'Useful German phrases' },
];

const CITY_LINKS = [
    ['Berlin', '/vets/berlin'],
    ['Hamburg', '/vets/hamburg'],
    ['Munich', '/vets/munich'],
    ['Frankfurt', '/vets/frankfurt'],
    ['Cologne', '/vets/cologne'],
    ['Stuttgart', '/vets/stuttgart'],
];

const APPOINTMENT_CHECKLIST = [
    'A short symptom timeline: when it started, what changed, and whether eating, drinking, toileting or activity changed',
    'Vaccination and medical records, including laboratory results, imaging reports and operation notes',
    'The names, strengths and doses of current medicines, supplements and recent parasite treatments',
    'Your pet in a secure carrier or on a secure lead, with any handling or bite risk explained before the examination',
    'Insurance details if relevant, while remembering that the policy determines the claim process',
];

const GERMAN_PHRASES = [
    ['Sprechen Sie Englisch?', 'Do you speak English?'],
    ['Ist das dringend?', 'Is this urgent?'],
    ['Welche Möglichkeiten gibt es?', 'What options are available?'],
    ['Was sind die Vorteile, Risiken und Alternativen?', 'What are the benefits, risks and alternatives?'],
    ['Können Sie mir die voraussichtlichen Kosten erklären?', 'Can you explain the expected costs?'],
    ['Bitte geben Sie mir eine detaillierte Rechnung.', 'Please give me an itemised invoice.'],
];

const externalLinkClass = 'font-bold text-accent underline decoration-accent/30 underline-offset-4 hover:text-primary';

export default function FirstVetVisitGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={CANONICAL_URL} />
                <link rel="canonical" href={CANONICAL_URL} />
                <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 min-w-0 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Vet Care Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            First Vet Visit in Germany: What to Bring and Ask
                        </h1>
                        <p className="text-sm text-primary/60 mb-8">
                            Reviewed against official German and EU guidance on 24 July 2026.
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-3 bg-accent/5 rounded-r-lg text-xl">
                                A useful first appointment starts before you enter the consulting room. Confirm the
                                practice, language, urgency, records, likely payment method and questions in advance.
                            </p>
                            <p>
                                This guide is a preparation checklist, not medical advice. If your pet may need urgent
                                care, use the{' '}
                                <Link to="/guides/pet-emergency-germany" className={externalLinkClass}>
                                    Pet emergency guide
                                </Link>{' '}
                                rather than waiting for a routine appointment.
                            </p>

                            <h2 id="choose" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                1. Choose and contact a practice
                            </h2>
                            <p>
                                Directory records do not all have the same evidence level. Check the listing status
                                and read our{' '}
                                <Link to="/quality-promise" className={externalLinkClass}>
                                    Directory quality promise
                                </Link>
                                . Then confirm English availability, the service you need and the appointment time
                                directly with the practice. English-speaking staff and opening hours can change.
                            </p>
                            <p>
                                When booking, briefly describe the problem and ask whether the practice considers it
                                suitable for a routine slot. Ask which clinician can consult in English and confirm
                                English again at booking. If the situation changes before the appointment, contact the
                                practice again.
                            </p>

                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <p className="font-bold text-primary mb-4">Browse by city, then verify the listing:</p>
                                <div className="flex flex-wrap gap-3">
                                    {CITY_LINKS.map(([city, path]) => (
                                        <Link
                                            key={path}
                                            to={path}
                                            className="min-h-11 inline-flex items-center px-4 py-2 bg-secondary rounded-lg border border-primary/10 text-accent font-bold text-sm hover:bg-accent hover:text-white transition-colors"
                                        >
                                            {city}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <h2 id="bring" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                2. What to bring
                            </h2>
                            <p>
                                Bring information that helps the vet reconstruct the history. A phone note is useful
                                if stress or translation could make details hard to remember.
                            </p>
                            <ul className="space-y-3">
                                {APPOINTMENT_CHECKLIST.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <p>
                                Photos or videos can help show an intermittent symptom, but do not delay urgent care to
                                record one. Ask before bringing a urine, stool, vomit or food sample because the
                                practice may require a specific container, quantity or collection time.
                            </p>

                            <h2 id="appointment" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                3. During the appointment
                            </h2>
                            <p>
                                Start with the main concern and the symptom timeline. Mention known conditions,
                                allergies, recent travel and all medicines. If you do not understand a term, ask the vet
                                to rephrase it or write it down.
                            </p>
                            <p>
                                Before a non-urgent test or treatment, ask what the vet is looking for, how the result
                                could change the plan, and what the benefits, risks and alternatives are. You can also
                                ask about expected costs. An expected-cost discussion is not a fixed quote because a
                                living animal's findings and treatment needs can change.
                            </p>
                            <p>
                                The German Federal Chamber of Veterinarians advises owners to discuss the examinations,
                                treatment plan and likely cost with the vet. Its{' '}
                                <a
                                    href="https://www.bundestieraerztekammer.de/tieraerzte/beruf/got/"
                                    className={externalLinkClass}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Official GOT guide for pet owners
                                </a>{' '}
                                also explains why a tradesperson-style fixed estimate is not generally possible.
                            </p>

                            <h2 id="vaccination" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                4. Vaccination and pet passports
                            </h2>
                            <p>
                                Do not use a generic annual schedule as a substitute for an individual vaccination
                                plan. The vet should consider the species, age, health, exposure, product information
                                and travel plans. The current{' '}
                                <a
                                    href="https://www.openagrar.de/servlets/MCRFileNodeServlet/openagrar_derivate_00063989/Impfleitlinie_Kleintiere_2025-01-06.pdf"
                                    className={externalLinkClass}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    StIKo Vet vaccination guidance
                                </a>{' '}
                                is the national expert reference for small animals.
                            </p>
                            <p>
                                An EU pet passport is a travel document for dogs, cats and ferrets. The European
                                Commission says an authorised veterinarian can issue one for an EU resident. For travel,
                                the animal must be identified by microchip before the rabies vaccination used for that
                                journey. Other entry conditions and waiting periods may also apply.
                            </p>
                            <p>
                                Read the{' '}
                                <a
                                    href="https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/faqs_en"
                                    className={externalLinkClass}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    European Commission pet passport FAQ
                                </a>{' '}
                                and our{' '}
                                <Link to="/blog/eu-pet-passport-germany" className={externalLinkClass}>
                                    EU pet passport guide
                                </Link>{' '}
                                before relying on a document for travel.
                            </p>

                            <h2 id="costs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                5. GOT fees and invoices
                            </h2>
                            <p>
                                Veterinary billing in Germany follows the national GOT. Ordinary services can generally
                                be billed at one to three times the GOT base rate depending on the circumstances. A
                                visit often contains several services, and medicines, materials, laboratory work and
                                VAT can add to the total. This is why a single fixed "typical visit price" is misleading.
                            </p>
                            <p>
                                See the{' '}
                                <Link to="/blog/vet-costs-germany" className={externalLinkClass}>
                                    German vet costs and GOT guide
                                </Link>{' '}
                                for the ordinary and emergency fee rules.
                            </p>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <h3 className="font-bold text-primary mb-3">What a GOT invoice must show</h3>
                                <p className="text-primary/75 leading-relaxed">
                                    The invoice must include the date, species, diagnosis or reason for consultation,
                                    service number, amount and VAT. Additional medicines, materials and other permitted
                                    charges must be shown separately where required. Ask for an itemised invoice;
                                    further detail is available on request.
                                </p>
                                <a
                                    href="https://www.gesetze-im-internet.de/got_2022/__7.html"
                                    className="mt-4 min-h-11 inline-flex items-center font-bold text-accent underline decoration-accent/30 underline-offset-4 hover:text-primary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Official GOT invoice rules
                                </a>
                            </div>

                            <h2 id="payment" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                6. Payment and insurance
                            </h2>
                            <p>
                                Payment arrangements vary by practice. Confirm accepted payment methods before the
                                appointment, especially if a large diagnostic or procedure may be discussed. Do not
                                assume cash, card, instalments or insurer billing will be available.
                            </p>
                            <p>
                                If you have insurance, check the policy's claim process, reimbursement limits, waiting
                                periods, exclusions and any pre-authorisation requirement. Keep the invoice and medical
                                documents. The practice can explain its bill, but only the insurer can confirm how your
                                policy will handle a claim.
                            </p>

                            <h2 id="after" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                7. Before you leave
                            </h2>
                            <ul>
                                <li>Repeat medication dose, timing, duration and storage instructions back to the team.</li>
                                <li>Ask which changes mean you should call sooner or seek urgent care.</li>
                                <li>Confirm when and how results will arrive and whether a follow-up is needed.</li>
                                <li>Request relevant records and an itemised invoice for your files.</li>
                                <li>Check that any travel-document entry is complete before leaving.</li>
                            </ul>

                            <h2 id="phrases" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">
                                Useful German phrases
                            </h2>
                            <div className="overflow-x-auto rounded-xl border border-primary/10 my-6 not-prose">
                                <table className="w-full min-w-[640px] bg-white text-left">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4">German</th>
                                            <th className="p-4">English</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {GERMAN_PHRASES.map(([german, english]) => (
                                            <tr key={german} className="border-t border-primary/10">
                                                <td className="p-4 font-bold text-primary">{german}</td>
                                                <td className="p-4 text-primary/70">{english}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-12 not-prose">
                                <h2 className="text-2xl font-bold text-accent mb-4 mt-0">
                                    Prepare the routine relationship, but plan emergencies separately
                                </h2>
                                <p className="opacity-90 leading-relaxed">
                                    Finding a suitable practice before a problem occurs gives you time to verify
                                    language, services and access. It does not guarantee urgent availability. Save the
                                    local emergency route separately and call before travel when it is safe to do so.
                                </p>
                                <Link
                                    to="/"
                                    className="mt-6 min-h-12 inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
                                >
                                    Find an English-speaking vet
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/first-vet-visit-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
