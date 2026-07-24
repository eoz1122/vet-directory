import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = '24-Hour Emergency Vets in Berlin: English Help (2026)';
const ARTICLE_DESCRIPTION = 'Find verified 24-hour emergency vets in Berlin, current phone numbers, urgent warning signs, official GOT fees, and English phrases for calling.';
const ARTICLE_URL = 'https://englishspeakinggermany.online/guides/emergency-vets-berlin';
const DATE_PUBLISHED = '2026-04-21';
const DATE_MODIFIED = '2026-07-22';
const BERLIN_EMERGENCY_LIST_URL = 'https://tieraerztekammer-berlin.de/notdienst/';
const BERLIN_GOT_URL = 'https://tieraerztekammer-berlin.de/gebuehrenordnung-fuer-tieraerztinnen-und-tieraerzte-got/';
const ARTICLE_SCHEMA = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const EMERGENCY_CLINICS = [
    {
        name: 'AniCura Tierklinik Berlin-Biesdorf',
        district: 'Biesdorf',
        phone: '030 51 43 760',
        phoneHref: 'tel:+49305143760',
        sourceUrl: 'https://www.anicura.de/standorte/berlin-biesdorf/kontakt/',
        sourceLabel: 'AniCura emergency information',
        note: 'Small animals and exotics; use the main entrance bell after hours.',
    },
    {
        name: 'Valera Tierklinik Berlin',
        district: 'Tiergarten',
        phone: '030 20 1805 750',
        phoneHref: 'tel:+4930201805750',
        sourceUrl: 'https://www.valeratierklinikberlin.com/notfall/',
        sourceLabel: 'Valera emergency information',
        note: '24-hour emergency service for dogs and cats.',
    },
    {
        name: 'Tierarztpraxis Bärenwiese',
        district: 'Wilmersdorf',
        phone: '030 23 36 26 27',
        phoneHref: 'tel:+493023362627',
        sourceUrl: BERLIN_EMERGENCY_LIST_URL,
        sourceLabel: 'Berlin Veterinary Chamber listing',
        note: 'Listed by the Berlin Veterinary Chamber for 24-hour emergency service.',
    },
    {
        name: 'Tierarztpraxis Rödiger',
        district: 'Reinickendorf',
        phone: '030 412 73 57',
        phoneHref: 'tel:+49304127357',
        sourceUrl: BERLIN_EMERGENCY_LIST_URL,
        sourceLabel: 'Berlin Veterinary Chamber listing',
        note: 'Listed by the Berlin Veterinary Chamber for 24-hour emergency service.',
    },
    {
        name: 'VetZentrum Berlin (Olof Löwe)',
        district: 'Marzahn',
        phone: '030 93 22 093',
        phoneHref: 'tel:+49309322093',
        sourceUrl: BERLIN_EMERGENCY_LIST_URL,
        sourceLabel: 'Berlin Veterinary Chamber listing',
        note: 'Listed by the Berlin Veterinary Chamber for 24-hour emergency service.',
    },
];

export default function EmergencyVetBerlinGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta name="keywords" content="emergency vet berlin english, 24 hour vet berlin, berlin emergency veterinary, notfalldienst berlin english, pet emergency berlin expat" />
                <meta property="og:title" content={ARTICLE_TITLE} />
                <meta property="og:description" content={ARTICLE_DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={ARTICLE_URL} />
                <link rel="canonical" href={ARTICLE_URL} />
                <script type="application/ld+json">
                    {JSON.stringify(ARTICLE_SCHEMA)}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">Emergency Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            {ARTICLE_TITLE}
                        </h1>
                        <p className="mb-6 text-sm text-primary/60">Clinics, phone numbers, and fees checked against official sources on 22 July 2026.</p>

                        <TableOfContents items={[
                            { id: 'what-counts', label: '1. What Counts as a Pet Emergency?' },
                            { id: '24h-vets', label: '2. 24-Hour Emergency Vets in Berlin' },
                            { id: 'what-to-say', label: '3. What to Say When You Call' },
                            { id: 'getting-there', label: '4. Getting There' },
                            { id: 'costs', label: '5. What Emergency Vet Care Costs' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                It's 11pm. Your dog just ate something off the street and won't stop retching. Your cat is breathing oddly. Your rabbit hasn't moved in an hour.
                            </p>
                            <p>
                                This is not the moment to google in a panic, attempt to translate German vet websites, and wonder what "Notfalldienst" means.
                            </p>
                            <p><strong>Bookmark this page now. Before you need it.</strong></p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="what-counts" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🚨 1. What Counts as a Pet Emergency?</h2>
                            <p>Some symptoms require urgent professional assessment. Call a clinic while preparing to travel whenever it is safe to do so.</p>

                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-red-700 mb-3">🚨 Go now - do not wait</h3>
                                    <ul className="space-y-1.5 text-sm text-red-800">
                                        {[
                                            'Difficulty breathing or blue/grey gums',
                                            'Collapse, unconsciousness, or severe weakness',
                                            'Suspected poisoning',
                                            'Seizures',
                                            'Severe injury or a traffic accident',
                                            'Sudden paralysis',
                                            'Heavy or uncontrolled bleeding',
                                        ].map(s => <li key={s} className="flex items-start gap-1.5"><span className="text-red-500 mt-0.5">•</span>{s}</li>)}
                                    </ul>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-yellow-700 mb-3">📞 Call for professional triage</h3>
                                    <p className="text-sm text-yellow-800">
                                        Do not use this page to decide whether a symptom can safely wait. If you are unsure, call a clinic and describe the symptoms, duration, species, age, and medications.
                                    </p>
                                    <p className="text-xs text-yellow-700 mt-3 italic">Clinics prioritize patients by medical severity, so waiting times can change.</p>
                                </div>
                            </div>

                            <p className="text-sm">
                                These warning signs follow{' '}
                                <a href="https://www.anicura.de/leistungen/katze/notdienst-katze/" target="_blank" rel="noopener noreferrer">AniCura emergency guidance</a>. The Berlin Veterinary Chamber asks owners to reserve emergency clinics for serious or life-threatening conditions.
                            </p>

                            <h2 id="24h-vets" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🏥 2. Verified 24-Hour Emergency Vets in Berlin</h2>

                            <p>
                                The following practices appear on the Berlin Veterinary Chamber's current 24-hour small-animal emergency list. Call before travelling because capacity and arrangements can change. See the{' '}
                                <a href={BERLIN_EMERGENCY_LIST_URL} target="_blank" rel="noopener noreferrer">Official Berlin 24-hour emergency list</a>.
                            </p>

                            <div className="space-y-3 my-6 not-prose">
                                {EMERGENCY_CLINICS.map(clinic => (
                                    <div key={clinic.name} className="bg-white p-5 rounded-xl border border-primary/10 flex items-start gap-4">
                                        <span className="text-2xl mt-0.5">🏥</span>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-primary text-sm">{clinic.name}</h3>
                                            <p className="text-primary/60 text-xs mt-0.5">{clinic.district}</p>
                                            <a href={clinic.phoneHref} className="inline-flex min-h-11 items-center gap-1.5 text-accent font-bold text-sm hover:underline">
                                                📞 {clinic.phone}
                                            </a>
                                            <p className="text-primary/60 text-xs mt-1 italic">{clinic.note}</p>
                                            <a href={clinic.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-xs font-bold text-primary/70 underline hover:text-accent">
                                                {clinic.sourceLabel}
                                            </a>
                                        </div>
                                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full shrink-0">24/7</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-accent/10 p-5 rounded-xl border border-accent/20 my-6 not-prose">
                                <p className="text-sm font-bold text-primary mb-1">Berlin Veterinary Emergency Network</p>
                                <p className="text-sm text-primary/70">Not every practice outside this list operates around the clock. Your regular vet may provide separate out-of-hours instructions, so listen to its full voicemail.</p>
                                <Link to="/vets/berlin" aria-label="Browse English-speaking vets in Berlin" className="inline-flex min-h-11 items-center gap-2 mt-3 bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                    Browse English-speaking vets in Berlin →
                                </Link>
                            </div>

                            <h2 id="what-to-say" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📞 3. What to Say When You Call</h2>
                            <p>Having this information ready will help the clinic triage your pet:</p>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-3">
                                {[
                                    ['Species and breed', '"I have a 4-year-old male golden retriever"'],
                                    ['Weight', 'Helpful for dosing if medication is needed immediately'],
                                    ['Symptoms and when they started', '"He started vomiting about 90 minutes ago, three times, and now he\'s just lying down and won\'t get up"'],
                                    ['Any known ingestion', '"We were at the park and I think he ate something. I\'m not sure what."'],
                                    ['Vaccination and medication status', '"He\'s up to date on vaccinations and takes monthly flea/tick prevention"'],
                                    ['Your location', 'They\'ll tell you if you need to come to them or if there\'s a closer option'],
                                ].map(([label, example], i) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <span className="bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <div>
                                            <p className="font-bold text-primary text-sm">{label}</p>
                                            <p className="text-primary/60 text-sm italic">e.g. {example}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <h3 className="font-bold text-primary mb-3">Key German phrases to understand on the phone</h3>
                                <div className="space-y-2">
                                    {[
                                        ['Kommen Sie sofort', 'Come immediately'],
                                        ['Das ist ein Notfall', 'This is an emergency'],
                                        ['Warten Sie bis morgen', 'Wait until tomorrow (if they say this and you\'re unsure, describe the symptoms again)'],
                                        ['Wir haben keinen Notfalldienst', 'We don\'t have an emergency service (ask for the duty vet number)'],
                                    ].map(([de, en]) => (
                                        <div key={de} className="flex items-start gap-3">
                                            <span className="text-accent font-bold text-sm min-w-fit italic">{de}</span>
                                            <span className="text-primary/70 text-sm">{en}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 id="getting-there" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🚗 4. Getting There</h2>
                            <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
                                {[
                                    { icon: '🚗', mode: 'By car', desc: 'Choose the nearest clinic that confirms it can receive your pet. Secure the animal safely and have another person drive when possible.' },
                                    { icon: '🚕', mode: 'By taxi or rideshare', desc: 'Tell the driver that you are travelling with an animal before pickup. Use a carrier or another safe restraint and keep the clinic address ready.' },
                                    { icon: '🚇', mode: 'By public transport', desc: 'Check the operator\'s current animal and ticket rules before travelling. For a critical emergency, ask the clinic about the quickest safe option from your location.' },
                                ].map(item => (
                                    <div key={item.mode} className="bg-white p-5 rounded-xl border border-primary/10">
                                        <p className="text-2xl mb-2">{item.icon}</p>
                                        <h3 className="font-bold text-primary text-sm mb-1">{item.mode}</h3>
                                        <p className="text-primary/70 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 id="costs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">💶 5. What Emergency Vet Care Costs in Berlin</h2>
                            <p>German veterinary fees are regulated by the <em>Gebührenordnung für Tierärztinnen und Tierärzte</em> (GOT). Emergency treatment uses specific statutory fee rules rather than a fixed package price.</p>
                            <div className="my-6 not-prose rounded-xl border border-primary/10 bg-white p-6">
                                <ul className="space-y-3 text-sm text-primary/80">
                                    <li>There is a €59.50 gross emergency-service fee (€50 net) during the GOT emergency-service period.</li>
                                    <li>Emergency treatment is billed at two to four times the GOT rate.</li>
                                    <li>Diagnostics, medication, materials, and hospital care are additional and depend on the treatment your pet needs.</li>
                                </ul>
                                <a href={BERLIN_GOT_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center font-bold text-accent underline hover:text-primary">
                                    Official Berlin GOT information
                                </a>
                            </div>
                            <p>
                                Ask the clinic which payment methods it accepts. Once your pet is medically stable, you can also ask for an estimate of the likely next steps. If you have pet insurance, request an itemised invoice and check the claim process with your insurer.
                            </p>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-12 not-prose">
                                <h2 className="text-2xl font-bold text-accent mb-3 mt-0">Prevention: The Best Emergency Plan</h2>
                                <p className="opacity-90 leading-relaxed">
                                    The single best thing you can do right now, before any emergency, is to identify your nearest 24-hour vet clinic and save the number in your phone as "Emergency Vet Berlin."
                                </p>
                                <p className="font-bold text-accent mt-3">Do it tonight.</p>
                                <p className="opacity-90 leading-relaxed mt-3">
                                    And if you haven't yet found a regular vet who speaks English, establishing that relationship is your next step. Your regular vet knows your pet's history, which matters enormously in an emergency. Even if you end up at a different clinic, being able to share records speeds up treatment.
                                </p>
                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <Link to="/vets/berlin" className="inline-flex min-h-11 items-center gap-2 bg-accent text-primary px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg">
                                        Find a verified English-speaking vet in Berlin →
                                    </Link>
                                </div>
                            </div>

                            <p className="text-sm italic opacity-70 not-prose">
                                Know a 24-hour clinic in Berlin that belongs in this guide?{' '}
                                <Link to="/contact?topic=submit_vet" className="text-accent underline hover:text-primary">Tell us about it</Link>
                            </p>
                        </div>

                        <RelatedPosts currentPath="/guides/emergency-vets-berlin" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
