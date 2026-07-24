import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import RelatedPosts from '../components/RelatedPosts';
import GuideDisclaimer from '../components/GuideDisclaimer';
import { generateArticleSchema } from '../utils/schema';

const ARTICLE_TITLE = '24-Hour Emergency Vet Munich: LMU Guide (2026)';
const ARTICLE_DESCRIPTION = 'Need an emergency vet in Munich? LMU treats dogs and cats 24/7. Check where to go, current service limits, phone guidance, GOT fees and English information.';
const ARTICLE_URL = 'https://englishspeakinggermany.online/guides/emergency-vets-munich';
const DATE_PUBLISHED = '2025-01-01';
const DATE_MODIFIED = '2026-07-24';
const LMU_EMERGENCY_ENGLISH = 'https://www.vetmed.lmu.de/kleintierklinik/en/for-pet-owners/emergency/';
const LMU_EMERGENCY_GERMAN = 'https://www.vetmed.lmu.de/kleintierklinik/de/fuer-tierhalterinnen-und-tierhalter/notfaelle/';

const articleSchema = generateArticleSchema(
    ARTICLE_TITLE,
    ARTICLE_DESCRIPTION,
    ARTICLE_URL,
    DATE_PUBLISHED,
    DATE_MODIFIED,
);

const arrivalSteps = [
    {
        title: 'Go directly for a life-threatening emergency',
        text: 'LMU instructs owners to come immediately with a dog or cat when symptoms are life-threatening.',
    },
    {
        title: 'Give short notice only if it is safe',
        text: 'The English LMU guide asks for short notice when the animal’s condition allows it. Do not delay travel while waiting for a phone answer.',
    },
    {
        title: 'Expect clinical prioritisation',
        text: 'The most serious cases are treated first, so less critical patients may have a longer wait.',
    },
    {
        title: 'Expect emergency stabilisation',
        text: 'The emergency service focuses on acute care and stabilisation. A full specialist work-up may require a later appointment.',
    },
];

export default function PetEmergencyMunich() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{ARTICLE_TITLE}</title>
                <meta name="description" content={ARTICLE_DESCRIPTION} />
                <meta name="keywords" content="emergency vet Munich, 24-hour vet Munich, LMU emergency vet, Tiernotdienst München, Kleintierklinik LMU" />
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
                        <nav className="text-sm text-accent-ink font-bold mb-6">
                            <Link to="/guides/pet-emergency-germany" className="hover:text-primary transition-colors">
                                ← Germany emergency guide
                            </Link>
                        </nav>

                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Munich Emergency Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6 leading-tight">
                            24-Hour Emergency Vet Munich: LMU Guide (2026)
                        </h1>
                        <p className="text-sm text-primary/60 mb-8">
                            LMU emergency access and service limits checked against the clinic’s English and German pages on 24 July 2026.
                        </p>

                        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl my-8 not-prose">
                            <p className="font-bold text-red-900 text-lg mb-2">
                                Life-threatening emergency: go directly to the LMU Small Animal Clinic.
                            </p>
                            <p className="text-red-900/80 mb-0">
                                LMU’s English guidance says to give short notice only if your animal’s condition allows it.
                                Do not delay urgent travel while waiting for a phone answer.
                            </p>
                        </div>

                        <div className="bg-white border border-primary/10 rounded-2xl p-6 md:p-8 my-8 not-prose">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-green-700 font-bold mb-2">
                                        Official 24-hour service
                                    </p>
                                    <h2 className="text-2xl font-bold text-primary mb-3">
                                        LMU Small Animal Clinic
                                    </h2>
                                    <p className="text-primary/75 mb-1">Veterinärstraße 13</p>
                                    <p className="text-primary/75 mb-0">80539 Munich</p>
                                </div>
                                <a
                                    href="tel:+498921802650"
                                    className="inline-flex min-h-11 items-center justify-center bg-red-700 text-white font-bold px-5 py-3 rounded-xl"
                                >
                                    Call LMU Small Animal Clinic
                                </a>
                            </div>

                            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <p className="font-bold text-amber-900 mb-2">Current service limits</p>
                                <p className="text-sm text-amber-900/80 mb-0">
                                    This clinic treats dogs and cats only. Its current German emergency page says it cannot
                                    offer dental and eye emergency care at present. Check the official page because temporary
                                    exclusions can change.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3 mt-6">
                                <a
                                    href={LMU_EMERGENCY_ENGLISH}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center text-center border border-primary/15 text-primary font-bold px-4 py-3 rounded-xl"
                                >
                                    Official LMU emergency information in English
                                </a>
                                <a
                                    href={LMU_EMERGENCY_GERMAN}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center justify-center text-center border border-primary/15 text-primary font-bold px-4 py-3 rounded-xl"
                                >
                                    Official LMU emergency information in German
                                </a>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-primary mt-14 mb-6">
                            What to do and what to expect
                        </h2>
                        <div className="grid md:grid-cols-2 gap-5 my-8 not-prose">
                            {arrivalSteps.map((step) => (
                                <section key={step.title} className="bg-white border border-primary/10 p-5 rounded-2xl">
                                    <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                                    <p className="text-sm text-primary/75 mb-0">{step.text}</p>
                                </section>
                            ))}
                        </div>

                        <div className="bg-white border border-primary/10 p-6 md:p-8 rounded-2xl my-10 not-prose">
                            <h2 className="text-2xl font-bold text-primary mb-4">LMU emergency fees</h2>
                            <p className="text-primary/75 mb-4">
                                During the statutory emergency-service periods, LMU publishes a €50 net fixed fee,
                                which is €59.50 gross at 19 percent VAT. Emergency services are billed at two to four
                                times the GOT rate. Treatment, diagnostics, medicines, materials, and other invoice
                                items are additional.
                            </p>
                            <p className="text-primary/75 mb-0">
                                LMU states that veterinary services are billed immediately and instalment payment is
                                unavailable. Ask about accepted payment methods if the animal’s condition allows.
                            </p>
                        </div>

                        <div className="bg-accent/10 p-6 md:p-8 rounded-2xl my-12 text-center border border-accent/20 not-prose">
                            <h2 className="text-2xl font-bold text-primary mb-3">Need regular veterinary care?</h2>
                            <p className="mb-6 text-primary/75">
                                For appointments, vaccinations, follow-up care, or another Munich practice, use the
                                directory and confirm English availability when booking.
                            </p>
                            <Link
                                to="/vets/munich"
                                className="inline-flex min-h-11 items-center justify-center bg-accent-ink text-white font-bold py-3 px-6 rounded-xl"
                            >
                                Browse English-speaking vets in Munich
                            </Link>
                        </div>

                        <GuideDisclaimer />
                        <RelatedPosts currentPath="/guides/emergency-vets-munich" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
