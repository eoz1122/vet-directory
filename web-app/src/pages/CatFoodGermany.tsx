import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackAffiliateClick } from '../utils/analytics';
import ArticleLayout from '../components/ArticleLayout';
import ArticleHeader from '../components/ArticleHeader';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import AffiliateCallout from '../components/AffiliateCallout';
import NewsletterSignup from '../components/NewsletterSignup';
import { AFFILIATE_LINKS } from '../utils/affiliateLinks';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Best Cat Food in Germany: How to Choose (2026)';
const DESCRIPTION = 'Compare cat food in Germany using EU label terms, wet and dry formats, kitten needs, taurine guidance and manufacturer quality checks.';
const URL = 'https://englishspeakinggermany.online/blog/best-cat-food-germany';

const SOURCE_URLS = {
    euLabelling: 'https://eur-lex.europa.eu/eli/reg/2009/767/oj/eng',
    fediafNutrition: 'https://europeanpetfood.org/self-regulation/nutritional-guidelines/',
    wsavaSelection: 'https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf',
    cornellFeeding: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feeding-your-cat',
    cornellUrinary: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-lower-urinary-tract-disease',
} as const;

const TABLE_OF_CONTENTS = [
    { id: 'quick-answer', label: 'Quick answer: how to choose cat food' },
    { id: 'label', label: 'Read the German Label' },
    { id: 'cat-needs', label: 'Taurine and Cat Nutrition' },
    { id: 'wet-dry', label: 'Wet vs Dry Food' },
    { id: 'format-comparison', label: 'Format Comparison' },
    { id: 'kitten', label: 'Kitten and Life-Stage Food' },
    { id: 'manufacturer', label: 'Check the Manufacturer' },
    { id: 'urinary', label: 'Urinary and Medical Needs' },
    { id: 'where-to-buy', label: 'Where to Buy' },
    { id: 'sources', label: 'Sources' },
    { id: 'faq', label: 'FAQ' },
];

const QUICK_ANSWER_CARDS = [
    {
        title: 'Complete food first',
        text: 'Choose food labelled complete for cats and the correct life stage before comparing ingredients or marketing claims.',
        tone: 'border-green-200 bg-green-50',
    },
    {
        title: 'Wet, dry or both',
        text: 'Both wet and dry formats can be nutritionally complete. Compare moisture, calories, portioning, storage and what your cat will eat reliably.',
        tone: 'border-blue-200 bg-blue-50',
    },
    {
        title: 'Check the maker',
        text: 'Look for qualified nutrition expertise, finished-diet analysis, quality controls and clear calorie and feeding information.',
        tone: 'border-orange-200 bg-orange-50',
    },
    {
        title: 'Medical needs',
        text: 'Urinary, kidney, allergy and other therapeutic diets should follow a veterinary diagnosis and monitoring plan.',
        tone: 'border-primary/10 bg-white',
    },
];

const CAT_FORMAT_COMPARISON = [
    {
        format: 'Wet food (Nassfutter)',
        bestFor: 'Higher-moisture meals',
        check: 'Complete versus complementary status',
    },
    {
        format: 'Dry food (Trockenfutter)',
        bestFor: 'Compact storage and measured portions',
        check: 'Calorie density and fresh water access',
    },
    {
        format: 'Mixed feeding',
        bestFor: 'Cats that reliably eat both formats',
        check: 'Total daily calories and complete-food status',
    },
] as const;

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
    '2026-09-15',
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
        <ArticleLayout>
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

            <div className="article-content">
                        <ArticleHeader
                            eyebrow="Evidence-Based Cat Nutrition Guide"
                            title="Best Cat Food in Germany: How to Choose (2026)"
                            review={(
                                <>
                                    Reviewed periodically. Last checked September 15, 2026
                                    <span aria-hidden="true"> • </span>
                                    <Link to="/quality-promise" className="font-bold text-accent-ink hover:underline">
                                        How we review guides
                                    </Link>
                                </>
                            )}
                        />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-lg text-xl">
                                There is no single best brand or format for every cat. Start with a complete food for the correct life stage, then assess the manufacturer, calories, feeding plan, water intake, and your cat&apos;s individual health.
                            </p>
                            <p className="mt-6">
                                This guide uses EU feed law, FEDIAF&apos;s 2025 nutritional reference, WSAVA&apos;s food-selection checklist, and Cornell Feline Health Center guidance. It does not rank brands or replace veterinary advice.
                            </p>

                            <NewsletterSignup />

                            <TableOfContents items={TABLE_OF_CONTENTS} />

                            <nav
                                aria-label="Related cat-care guides"
                                className="not-prose mb-12 rounded-2xl border border-primary/10 bg-secondary/60 p-5"
                            >
                                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent-ink">
                                    Planning the wider care budget?
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Link
                                        to="/blog/vet-costs-germany"
                                        className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-bold text-primary transition hover:border-accent hover:text-accent-ink"
                                    >
                                        Vet costs
                                    </Link>
                                    <Link
                                        to="/blog/pet-insurance-germany"
                                        className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-bold text-primary transition hover:border-accent hover:text-accent-ink"
                                    >
                                        Pet insurance
                                    </Link>
                                    <Link
                                        to="/blog/first-vet-visit-germany"
                                        className="rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-bold text-primary transition hover:border-accent hover:text-accent-ink"
                                    >
                                        First vet visit
                                    </Link>
                                </div>
                            </nav>

                            <section id="quick-answer" className="not-prose mb-10" aria-labelledby="quick-answer-heading">
                                <h2 id="quick-answer-heading" className="text-3xl font-bold text-primary mt-10 mb-6 scroll-mt-24">
                                    Quick answer: how to choose cat food
                                </h2>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    {QUICK_ANSWER_CARDS.map((card) => (
                                        <div key={card.title} className={`rounded-xl border p-4 ${card.tone}`}>
                                            <h3 className="text-base font-bold text-primary mb-2">{card.title}</h3>
                                            <p className="text-sm leading-relaxed text-primary/70">{card.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

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

                            <div id="format-comparison" className="my-10 overflow-x-auto rounded-2xl border border-primary/10 bg-white not-prose shadow-sm scroll-mt-24">
                                <table className="w-full min-w-[640px] text-left text-sm" aria-label="Cat food format comparison">
                                    <caption className="sr-only">Cat food format comparison</caption>
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 font-bold">Format</th>
                                            <th scope="col" className="px-4 py-3 font-bold">Best for</th>
                                            <th scope="col" className="px-4 py-3 font-bold">Check before buying</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/10">
                                        {CAT_FORMAT_COMPARISON.map((row) => (
                                            <tr key={row.format}>
                                                <th scope="row" className="px-4 py-3 font-bold text-primary align-top">{row.format}</th>
                                                <td className="px-4 py-3 text-primary/75 align-top">{row.bestFor}</td>
                                                <td className="px-4 py-3 text-primary/75 align-top">{row.check}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <AffiliateCallout
                                ariaLabel="Sponsored cat-food option"
                                description="Zooplus lists wet and dry cat foods, but the retailer is not a quality rating. Check that the exact product is complete for cats, appropriate for the life stage, and suitable for your cat before ordering."
                                href={AFFILIATE_LINKS.zooplus.catFoodMidArticle}
                                linkLabel="Review Zooplus cat-food options"
                                provider="Zooplus"
                                title="Ready to compare suitable foods?"
                                trackingLocation="CatFood_MidArticle"
                            />

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
                            <div
                                role="region"
                                aria-label="Commercial disclosure"
                                className="my-10 rounded-2xl border border-primary/10 bg-secondary/40 p-5 not-prose md:p-6"
                            >
                                <div className="flex items-start gap-3">
                                    <span aria-hidden="true" className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm text-primary/70">↗</span>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                            <h3 className="text-base font-bold text-primary">Commercial disclosure</h3>
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary/45">Affiliate link</span>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-primary/70">
                                            The link below is an affiliate link. We may earn a commission at no extra cost to you. We have not independently laboratory-tested or ranked the products sold there, and inclusion is not a nutritional endorsement. Confirm complete-food status, life stage, calories, and suitability before buying.
                                        </p>
                                        <a
                                            href={AFFILIATE_LINKS.zooplus.catFoodWhereToBuy}
                                            aria-label="Zooplus cat-food affiliate link"
                                            onClick={() => trackAffiliateClick('Zooplus', 'CatFood_WhereToBuy')}
                                            target="_blank"
                                            rel="noopener noreferrer sponsored"
                                            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-secondary transition-colors hover:bg-black"
                                        >
                                            Browse cat food on Zooplus
                                        </a>
                                    </div>
                                </div>
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
            </div>
        </ArticleLayout>
    );
}
