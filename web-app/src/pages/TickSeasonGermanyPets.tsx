import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Tick Season in Germany: Protect Dogs & Cats (2026)';
const DESCRIPTION = 'Learn when ticks are active in Germany, how to check and remove them safely, choose species-appropriate prevention, and recognize warning signs in pets.';
const URL = 'https://englishspeakinggermany.online/blog/tick-season-germany-pets';

const SOURCE_URLS = {
    esccapEctoparasites: 'https://www.esccap.de/empfehlung/neue-ektoparasiten/',
    esccapVectorDiseases: 'https://www.esccap.de/empfehlung/vbds/',
    bvlSafety: 'https://www.bvl.bund.de/SharedDocs/Pressemitteilungen/05_tierarzneimittel/2021/2021_04_09_PI_Auwaldzecke.html?nn=10418114',
    rkiRiskAreas: 'https://edoc.rki.de/handle/176904/13432',
} as const;

const TABLE_OF_CONTENTS = [
    { id: 'when', label: 'When Ticks Are Active' },
    { id: 'prevention', label: 'Risk-Based Prevention' },
    { id: 'cats', label: 'Permethrin Warning for Cats' },
    { id: 'removal', label: 'Safe Tick Removal' },
    { id: 'disease', label: 'Disease and Warning Signs' },
    { id: 'checklist', label: 'After a Tick Bite' },
    { id: 'sources', label: 'Official Sources' },
    { id: 'faq', label: 'FAQ' },
];

const FAQS = [
    {
        q: 'When is tick season in Germany?',
        a: 'There is no single nationwide start and end date. Tick activity varies with weather, region, habitat, and tick species. Check pets after outdoor exposure whenever local conditions allow ticks to be active.',
    },
    {
        q: 'Does every pet in Germany need year-round tick medication?',
        a: 'Not automatically. ESCCAP recommends matching prevention to the individual animal, local conditions, travel, and exposure. Ask a veterinarian to select an authorised product and schedule for your pet.',
    },
    {
        q: 'How should I remove a tick from a dog or cat?',
        a: 'Remove it as soon as possible with a purpose-designed tick tool or suitable tweezers. Follow the tool instructions, avoid squeezing the tick body, and do not use oil, alcohol, or ether.',
    },
    {
        q: 'Can I use a dog tick product on a cat?',
        a: 'No. Products intended only for dogs may be dangerous to cats. Permethrin-containing dog products can cause severe or fatal poisoning in cats. Use only a product authorised for the animal species.',
    },
    {
        q: 'When should I call a vet after a tick bite?',
        a: 'Call a veterinarian if you cannot remove the tick, the bite site becomes increasingly inflamed, or the pet develops fever, marked lethargy, poor appetite, lameness, pale gums, dark urine, weakness, or another concerning change.',
    },
];

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2026-05-26',
    '2026-07-23',
);

const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
};

const ExternalSourceLink = ({
    href,
    children,
}: {
    href: string;
    children: string;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-ink font-bold hover:underline"
    >
        {children}
    </a>
);

export default function TickSeasonGermanyPets() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-secondary/20">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="tick season Germany, ticks dogs Germany, ticks cats Germany, tick prevention pets, Zecken Germany, remove tick dog cat" />
                <link rel="canonical" href={URL} />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={URL} />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 mt-16 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-24">
                            <BlogSidebar />
                        </div>
                    </div>

                    <article className="lg:w-3/4 max-w-4xl min-w-0">
                        <div className="mb-4 text-sm font-bold text-accent-ink uppercase tracking-wider">
                            Evidence-Based Pet Health Guide
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
                            {TITLE}
                        </h1>
                        <p className="text-sm text-primary/60 mb-8">
                            Published May 26, 2026 · Reviewed July 23, 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-lg text-xl">
                                Germany has no single nationwide tick season. Risk varies with weather, region, habitat, travel, and the individual animal, so prevention should be based on real exposure rather than a fixed calendar.
                            </p>
                            <p className="mt-6">
                                This guide follows German and European veterinary parasite guidance. It does not rank products or replace advice from a veterinarian who knows your pet&apos;s species, weight, health, travel, and lifestyle.
                            </p>

                            <h2 id="when" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                1. When and Where Ticks Are Active
                            </h2>
                            <p>
                                Tick activity changes with local temperature, humidity, vegetation, and tick species. Mild conditions can support activity outside the months people usually call &quot;tick season&quot;, while hot and dry periods can change where ticks wait in vegetation. A nationwide start date, end date, or fixed regional ranking would be misleading.
                            </p>
                            <p>
                                Ticks are commonly encountered in grass, undergrowth, woodland edges, gardens, and urban green spaces. Dogs and outdoor cats can be exposed when they brush vegetation. Inspect your pet after outdoor exposure, paying particular attention to the head, ears, neck, armpits, groin, legs, and between the toes.
                            </p>
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">What the RKI map means</p>
                                <p className="text-sm text-primary/70 leading-relaxed">
                                    The RKI 2026 map reports human TBE risk districts. It is not a pet tick-density map and should not be used to declare other German areas tick-free.
                                </p>
                            </div>

                            <h2 id="prevention" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                2. Build a Risk-Based Prevention Plan
                            </h2>
                            <p>
                                ESCCAP recommends matching parasite control to the animal&apos;s exposure and the local risk of vector-borne disease. A pet that regularly walks through undergrowth, travels, hunts, or has frequent tick findings may need a different plan from an animal with very limited exposure.
                            </p>
                            <ol className="space-y-3 my-6">
                                <li><strong>Check after exposure:</strong> feel slowly through the coat and remove visible ticks as soon as possible.</li>
                                <li><strong>Ask for an individual plan:</strong> discuss local conditions, travel, health history, age, weight, and other medicines with a veterinarian.</li>
                                <li><strong>Use the correct medicine:</strong> use only a product authorised for the animal species and follow its label for dose, application, reapplication, bathing, and water exposure.</li>
                                <li><strong>Avoid accidental overdosing:</strong> never combine or layer parasite products unless a veterinarian explicitly directs you to do so.</li>
                            </ol>
                            <p>
                                A prescription status, shop location, marketing claim, or brand name does not by itself establish which option is safest for one pet. Home remedies are not reliable substitutes for an authorised veterinary medicine when medication is indicated.
                            </p>

                            <h2 id="cats" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                3. Permethrin Warning for Cats
                            </h2>
                            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl my-8 not-prose">
                                <p className="font-bold text-red-900 mb-2">Dog-only products can be dangerous to cats</p>
                                <p className="text-sm text-red-900/80 leading-relaxed">
                                    Permethrin in some dog products can cause severe, potentially fatal poisoning in cats. Never apply a dog-only product to a cat. Prevent a cat from licking a recently treated dog, and follow the product instructions about contact between animals.
                                </p>
                            </div>
                            <p>
                                Convulsions, tremors, paralysis, excessive salivation, vomiting, diarrhoea, or breathing difficulty after possible exposure require immediate veterinary help. Bring the product packaging or ingredient information when you call.
                            </p>

                            <h2 id="removal" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                4. How to Remove a Tick Safely
                            </h2>
                            <p>
                                Remove visible ticks as soon as possible. Use a purpose-designed tick-removal tool or suitable fine-tipped tweezers and follow the instructions for that tool. With tweezers, grasp the tick close to the skin without crushing its body, then remove it with a controlled, steady motion.
                            </p>
                            <div className="bg-accent/5 p-6 rounded-2xl border border-accent/20 my-8 not-prose">
                                <p className="font-bold text-primary mb-3">Safe removal rules</p>
                                <ul className="space-y-2 text-sm text-primary/75">
                                    <li>Do not squeeze the tick body or handle it with bare fingers.</li>
                                    <li>Do not use oil, alcohol, or ether to make the tick detach.</li>
                                    <li>Dispose of the tick safely, wash your hands, and clean the tool.</li>
                                    <li>Monitor the bite site and your pet&apos;s general condition.</li>
                                </ul>
                            </div>
                            <p>
                                Different removal tools use different motions, so follow the tool manufacturer&apos;s instructions rather than applying one universal twist or no-twist rule. Ask a veterinarian for help if the tick cannot be removed, the site becomes increasingly swollen or painful, or you are unsure what remains in the skin.
                            </p>

                            <h2 id="disease" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                5. Tick-Borne Disease and Warning Signs
                            </h2>
                            <p>
                                Not every tick carries a pathogen, and a tick bite does not mean that disease will develop. However, transmission timing varies by pathogen, so there is no universal &quot;safe&quot; attachment window. Prompt removal still reduces avoidable exposure.
                            </p>
                            <p>
                                Depending on the tick species, location, and travel history, dogs in Germany may be exposed to pathogens associated with borreliosis, anaplasmosis, or babesiosis. Clinically apparent tick-borne disease is less commonly documented in cats, but a cat with symptoms still needs veterinary assessment.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <h3 className="font-bold text-primary mb-3">Call a veterinarian</h3>
                                    <ul className="space-y-2 text-sm text-primary/70">
                                        <li>Fever or marked lethargy</li>
                                        <li>Poor appetite or unusual weakness</li>
                                        <li>Lameness, stiffness, or joint pain</li>
                                        <li>Pale gums or dark red-brown urine</li>
                                        <li>A worsening bite-site reaction</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                                    <h3 className="font-bold text-red-900 mb-3">Seek urgent help</h3>
                                    <ul className="space-y-2 text-sm text-red-900/80">
                                        <li>Collapse or severe weakness</li>
                                        <li>Breathing difficulty</li>
                                        <li>Seizures or uncontrolled tremors</li>
                                        <li>Rapid deterioration or inability to stand</li>
                                    </ul>
                                </div>
                            </div>
                            <p>
                                Tell the clinic when and where the pet may have encountered ticks, recent travel, products used, symptoms, and when each symptom began. Do not start leftover antibiotics or another animal&apos;s medicine.
                            </p>
                            <Link
                                to="/"
                                className="not-prose inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold text-secondary transition-colors hover:bg-black"
                            >
                                English-speaking vets in Germany for tick prevention
                            </Link>

                            <h2 id="checklist" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                6. After a Tick Bite
                            </h2>
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-8 not-prose">
                                <ol className="space-y-3 text-primary/75">
                                    <li><strong>1.</strong> Remove the tick promptly with a suitable tool.</li>
                                    <li><strong>2.</strong> Note the date, location, and likely exposure area.</li>
                                    <li><strong>3.</strong> Check for more ticks and monitor the bite site.</li>
                                    <li><strong>4.</strong> Watch the pet&apos;s appetite, energy, movement, gum colour, and urine.</li>
                                    <li><strong>5.</strong> Contact a veterinarian if symptoms or a worsening local reaction appear.</li>
                                </ol>
                            </div>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official Sources
                            </h2>
                            <ul className="space-y-4">
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.esccapEctoparasites}>
                                        ESCCAP Germany ectoparasite guideline
                                    </ExternalSourceLink>
                                    {' '}for individual risk assessment, species-authorised products, inspection, and prompt removal.
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.bvlSafety}>
                                        German BVL tick-product safety warning
                                    </ExternalSourceLink>
                                    {' '}for permethrin poisoning risk and urgent symptoms in cats.
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.esccapVectorDiseases}>
                                        ESCCAP vector-borne disease guideline
                                    </ExternalSourceLink>
                                    {' '}for pathogen-specific transmission and disease guidance.
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.rkiRiskAreas}>
                                        RKI 2026 human TBE risk areas
                                    </ExternalSourceLink>
                                    {' '}for the scope and interpretation of Germany&apos;s human TBE risk map.
                                </li>
                            </ul>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-5 not-prose">
                                {FAQS.map((faq) => (
                                    <section key={faq.q} className="bg-white p-6 rounded-2xl border border-primary/10">
                                        <h3 className="font-bold text-primary mb-2">{faq.q}</h3>
                                        <p className="text-sm text-primary/70 leading-relaxed">{faq.a}</p>
                                    </section>
                                ))}
                            </div>
                        </div>

                        <hr className="my-12 border-primary/10" />
                        <RelatedPosts currentPath="/blog/tick-season-germany-pets" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
