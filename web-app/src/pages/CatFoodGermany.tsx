import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackAffiliateClick } from '../utils/analytics';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Best Cat Food in Germany: How to Choose (2026)';
const DESCRIPTION = 'Compare cat food in Germany using EU label terms, wet and dry formats, kitten needs, taurine guidance and manufacturer quality checks.';
const URL = 'https://englishspeakinggermany.online/blog/best-cat-food-germany';
const ZOOPLUS_URL = 'https://tidd.ly/3R2z5ax';

const SOURCE_URLS = {
    euLabelling: 'https://eur-lex.europa.eu/eli/reg/2009/767/oj/eng',
    fediafNutrition: 'https://europeanpetfood.org/self-regulation/nutritional-guidelines/',
    wsavaSelection: 'https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf',
    cornellFeeding: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feeding-your-cat',
    cornellUrinary: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-lower-urinary-tract-disease',
} as const;

const TABLE_OF_CONTENTS = [
    { id: 'label', label: 'Read the German Label' },
    { id: 'cat-needs', label: 'Taurine and Cat Nutrition' },
    { id: 'wet-dry', label: 'Wet vs Dry Food' },
    { id: 'kitten', label: 'Kitten and Life-Stage Food' },
    { id: 'manufacturer', label: 'Check the Manufacturer' },
    { id: 'urinary', label: 'Urinary and Medical Needs' },
    { id: 'where-to-buy', label: 'Where to Buy' },
    { id: 'sources', label: 'Sources' },
    { id: 'faq', label: 'FAQ' },
];

const FAQS = [
    {
        q: 'What is the best cat food in Germany?',
        a: 'There is no universal best food. Start with a complete food for your cat\'s life stage, then compare the manufacturer\'s nutrition expertise and quality controls, calorie information, feeding instructions, and your cat\'s individual health needs.',
    },
    {
        q: 'Is wet or dry cat food better?',
        a: 'Both wet and dry foods can be nutritionally complete. Wet food contributes more water, while dry food is compact and often more calorie dense. The right format or combination depends on the individual cat, total calorie intake, water intake, medical needs, and what the cat will reliably eat.',
    },
    {
        q: 'Why do cats need taurine?',
        a: 'Taurine is an essential nutrient for cats. Complete diets must provide enough taurine as part of the full formulation. Do not use one ingredient or additive line as a substitute for checking that the entire food is complete for cats and appropriate for the stated life stage.',
    },
    {
        q: 'What food should a kitten eat?',
        a: 'Choose food labelled as complete for growth, kittens, or the relevant life stage. Kittens have different energy and nutrient requirements from adult cats, so an adult maintenance food is not automatically appropriate for growth.',
    },
    {
        q: 'Is grain-free cat food healthier?',
        a: 'A grain-free label does not establish nutritional quality. Ingredient categories and marketing claims should not replace the complete-food statement, life-stage suitability, manufacturer standards, portion control, and veterinary advice when symptoms or a diagnosed condition are involved.',
    },
];

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2026-06-23',
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

export default function CatFoodGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="best cat food Germany, cat food Germany, Alleinfuttermittel cat, wet vs dry cat food, kitten food Germany, taurine cat food, German cat food labels, Katzenfutter" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">{JSON.stringify(ARTICLE_SCHEMA)}</script>
                <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl min-w-0">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Evidence-Based Cat Nutrition Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4 leading-tight">
                            Best Cat Food in Germany: How to Choose (2026)
                        </h1>
                        <p className="text-sm text-primary/60 mb-8">
                            Reviewed July 23, 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-lg text-xl">
                                There is no single best brand or format for every cat. Start with a complete food for the correct life stage, then assess the manufacturer, calories, feeding plan, water intake, and your cat&apos;s individual health.
                            </p>
                            <p className="mt-6">
                                This guide uses EU feed law, FEDIAF&apos;s 2025 nutritional reference, WSAVA&apos;s food-selection checklist, and Cornell Feline Health Center guidance. It does not rank brands or replace veterinary advice.
                            </p>

                            <h2 id="label" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                1. Start With the German Label
                            </h2>
                            <p>
                                Under EU feed law, <strong>Alleinfuttermittel means complete food</strong>: it is sufficient for the daily ration when fed as directed. <strong>Ergänzungsfuttermittel means complementary food</strong>: it is sufficient only when combined with other feed. Complementary pouches, toppers, treats, and supplements should not automatically replace the main diet.
                            </p>
                            <p>For a cat&apos;s main food, check:</p>
                            <ul className="space-y-3 my-6">
                                <li><strong>Species and life stage:</strong> cat food for growth, adult maintenance, reproduction, or another stated purpose.</li>
                                <li><strong>Feeding instructions and calories:</strong> use the label as a starting point, then monitor weight and body condition.</li>
                                <li><strong>Composition and analytical constituents:</strong> useful information, but the ingredient list alone does not determine nutritional adequacy, ingredient quality, or production controls.</li>
                                <li><strong>Traceability:</strong> responsible business, batch or lot reference, net quantity, and a way to contact the company.</li>
                            </ul>

                            <h2 id="cat-needs" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                2. Taurine and the Complete Diet
                            </h2>
                            <p>
                                Cats are obligate carnivores with species-specific nutrient requirements. Taurine is essential, and <strong>complete diets must provide enough taurine</strong> along with the required amino acids, fatty acids, vitamins, and minerals for the stated life stage.
                            </p>
                            <p>
                                Do not judge the entire diet by whether &quot;Taurin&quot; appears as one additive line. Taurine can be supplied through the complete formulation, and one highlighted nutrient does not confirm that all other requirements are met. The complete-food statement and the manufacturer&apos;s formulation and testing practices provide more useful context.
                            </p>
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">Do not substitute dog food</p>
                                <p className="text-sm text-primary/70 leading-relaxed">
                                    Dog food is formulated for a different species and should not be used as a cat&apos;s regular main diet. Choose food identified as complete for cats and for the relevant life stage.
                                </p>
                            </div>

                            <h2 id="wet-dry" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                3. Wet vs Dry Cat Food
                            </h2>
                            <p>
                                <strong>Both wet and dry foods can be nutritionally complete.</strong> Format changes water content, calorie density, storage, portioning, and palatability, but it does not by itself establish overall nutritional quality.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h3 className="font-bold text-primary mb-2">Wet food (Nassfutter)</h3>
                                    <p className="text-sm text-primary/70">
                                        Typically contains much more water and can contribute meaningfully to total water intake. Check that the individual pouch, can, or tray is complete rather than complementary.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h3 className="font-bold text-primary mb-2">Dry food (Trockenfutter)</h3>
                                    <p className="text-sm text-primary/70">
                                        Compact, convenient, and often more calorie dense by weight. Measure portions, store it correctly, and provide clean fresh water at all times.
                                    </p>
                                </div>
                            </div>
                            <p>
                                Some cats eat one format and others eat a combination. Consider the cat&apos;s willingness to eat, total calorie intake, water intake, dental or medical needs, storage, and your veterinarian&apos;s advice rather than applying one rule to every cat.
                            </p>

                            <h2 id="kitten" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                4. Choose the Correct Life Stage
                            </h2>
                            <p>
                                Kittens need food formulated as complete for growth or the stated kitten life stage. Adult maintenance food is not automatically suitable for growth, pregnancy, or lactation. Follow the product&apos;s age and feeding guidance, weigh portions, and monitor growth with a veterinarian rather than relying only on appetite.
                            </p>
                            <p>
                                For adult and senior cats, calorie needs vary with size, activity, neuter status, health, and body condition. Label portions are starting points, not guarantees. Regularly check weight and body condition and adjust with veterinary guidance.
                            </p>

                            <h2 id="manufacturer" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                5. Check Who Formulates and Tests the Food
                            </h2>
                            <p>
                                WSAVA recommends looking beyond ingredient lists and marketing terms. A manufacturer should be able to answer practical questions about the people, process, and finished diet.
                            </p>
                            <ul className="space-y-3 my-6">
                                <li>Does the company employ a qualified nutritionist, and who formulates the diet?</li>
                                <li>What quality-control checks cover ingredients, production, and the finished food?</li>
                                <li>Does the company analyse the finished diet and conduct or publish relevant nutrition research?</li>
                                <li>Can it confirm nutritional completeness for the stated life stage and provide calorie information?</li>
                                <li>Can customers contact the manufacturer for detailed answers?</li>
                            </ul>
                            <p>
                                Terms such as &quot;premium&quot;, &quot;natural&quot;, &quot;grain-free&quot;, or a high meat percentage are not substitutes for these answers.
                            </p>

                            <h2 id="urinary" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                6. Urinary Signs and Medical Diets
                            </h2>
                            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl my-8 not-prose">
                                <p className="font-bold text-red-900 mb-2">Urinary blockage warning</p>
                                <p className="text-sm text-red-900/80 leading-relaxed">
                                    A cat repeatedly straining to urinate, passing little or no urine, crying in the litter box, vomiting, or becoming weak needs immediate veterinary assessment. Urethral obstruction is a medical emergency.
                                </p>
                            </div>
                            <p>
                                Do not use a supermarket &quot;urinary&quot; claim to diagnose or treat a problem at home. Diets intended for urinary, kidney, weight, gastrointestinal, allergy, or other medical needs should match a veterinary diagnosis and monitoring plan.
                            </p>
                            <Link
                                to="/"
                                className="not-prose inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold text-secondary transition-colors hover:bg-black"
                            >
                                English-speaking vets in Germany for cat nutrition advice
                            </Link>

                            <h2 id="where-to-buy" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                7. Where to Buy Cat Food in Germany
                            </h2>
                            <p>
                                Supermarkets, drugstores, pet shops, online retailers, and veterinary clinics all sell cat food. Veterinary clinics are the appropriate source for diets connected to a diagnosed condition. Wherever you shop, compare the exact product label and manufacturer rather than treating price or retailer as a quality guarantee.
                            </p>
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary/10 shadow-sm my-10 not-prose">
                                <h3 className="text-xl font-bold text-primary mb-3">Commercial disclosure</h3>
                                <p className="text-primary/70 leading-relaxed">
                                    The link below is an affiliate link. We may earn a commission at no extra cost to you. We have not independently laboratory-tested or ranked the products sold there, and inclusion is not a nutritional endorsement. Confirm complete-food status, life stage, calories, and suitability before buying.
                                </p>
                                <a
                                    href={ZOOPLUS_URL}
                                    aria-label="Zooplus cat-food affiliate link"
                                    onClick={() => trackAffiliateClick('Zooplus', 'CatFood_WhereToBuy')}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold text-secondary transition-colors hover:bg-black"
                                >
                                    Browse cat food on Zooplus
                                </a>
                            </div>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official and Veterinary Sources
                            </h2>
                            <p>
                                The guidance above was checked against these European and veterinary references:
                            </p>
                            <ul className="space-y-3 my-6 break-words">
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.euLabelling}>
                                        EU pet-food labelling regulation for cats
                                    </ExternalSourceLink>
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.fediafNutrition}>
                                        FEDIAF 2025 cat nutrition guidelines
                                    </ExternalSourceLink>
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.wsavaSelection}>
                                        WSAVA cat-food selection checklist
                                    </ExternalSourceLink>
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.cornellFeeding}>
                                        Cornell cat-feeding guidance
                                    </ExternalSourceLink>
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.cornellUrinary}>
                                        Cornell feline urinary guidance
                                    </ExternalSourceLink>
                                </li>
                            </ul>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4 not-prose">
                                {FAQS.map((faq) => (
                                    <details key={faq.q} className="group bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                        <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                                            <span>{faq.q}</span>
                                            <span className="text-accent text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
                                        </summary>
                                        <p className="mt-3 text-primary/70 leading-relaxed">{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/best-cat-food-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
