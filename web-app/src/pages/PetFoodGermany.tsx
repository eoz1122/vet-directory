import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { trackAffiliateClick } from '../utils/analytics';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Best Dog Food in Germany: How to Choose (2026)';
const DESCRIPTION = 'Compare dog food in Germany using EU label terms, FEDIAF guidance and WSAVA checks. Understand complete food, formats, raw-diet risks and vet diets.';
const URL = 'https://englishspeakinggermany.online/blog/best-dog-food-germany';
const DINNER_FOR_DOGS_URL = 'https://tidd.ly/4au55tO';
const ZOOPLUS_URL = 'https://tidd.ly/4wdElaw';

const SOURCE_URLS = {
    euLabelling: 'https://eur-lex.europa.eu/eli/reg/2009/767/oj/eng',
    fediafNutrition: 'https://europeanpetfood.org/self-regulation/nutritional-guidelines/',
    wsavaSelection: 'https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf',
    wsavaRaw: 'https://wsava.org/wp-content/uploads/2021/04/Raw-Meat-Based-Diets-for-Pets_WSAVA-Global-Nutrition-Toolkit.pdf',
} as const;

const TABLE_OF_CONTENTS = [
    { id: 'label', label: 'Read the German Label' },
    { id: 'formats', label: 'Compare Food Formats' },
    { id: 'manufacturer', label: 'Check the Manufacturer' },
    { id: 'raw-homemade', label: 'Raw and Homemade Diets' },
    { id: 'medical-diets', label: 'Medical Diets and Symptoms' },
    { id: 'switching', label: 'Changing Foods' },
    { id: 'where-to-buy', label: 'Where to Buy' },
    { id: 'sources', label: 'Sources' },
    { id: 'faq', label: 'FAQ' },
];

const FAQS = [
    {
        q: 'What is the best dog food in Germany?',
        a: 'There is no universal best food. Start with a complete food appropriate for your dog\'s species and life stage, then compare the manufacturer\'s nutrition expertise, quality controls, calorie information and your dog\'s individual medical needs.',
    },
    {
        q: 'What do Alleinfuttermittel and Ergänzungsfuttermittel mean?',
        a: 'Alleinfuttermittel is complete food that can provide the daily ration by itself when fed as directed. Ergänzungsfuttermittel is complementary food that is sufficient only when combined with other feed, so it should not automatically replace the main diet.',
    },
    {
        q: 'Is dry or wet food better?',
        a: 'Either format can be complete and appropriate. Format alone does not establish nutritional quality. Compare the complete-food statement, life stage, calories, feeding instructions, manufacturer standards, storage needs and what your dog can safely eat.',
    },
    {
        q: 'Is grain-free dog food healthier?',
        a: 'A grain-free label does not prove that a food is nutritionally better. Choose it only when it suits a documented need, and ask a veterinarian before using diet changes to investigate itching, digestive signs or another possible medical problem.',
    },
    {
        q: 'Is a raw or BARF diet healthier?',
        a: 'WSAVA reports no evidence of health benefits over commercial or balanced cooked diets and identifies contamination, parasites, bone injury and nutrient imbalance as risks. A veterinary nutrition professional should formulate any raw or homemade diet.',
    },
];

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2025-01-01',
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

export default function PetFoodGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="best dog food Germany, Alleinfuttermittel, Ergänzungsfuttermittel, dog food labels Germany, dry dog food Germany, wet dog food Germany, BARF risks, WSAVA pet food" />
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
                            Evidence-Based Nutrition Guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4 leading-tight">
                            Best Dog Food in Germany: How to Choose (2026)
                        </h1>
                        <p className="text-sm text-primary/60 mb-8">
                            Reviewed July 23, 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 bg-accent/5 rounded-r-lg text-xl">
                                There is no single best dog food or best format for every dog. A useful comparison starts with whether the food is complete, whether it matches the dog&apos;s life stage and health needs, and whether the manufacturer can explain how the diet is formulated and tested.
                            </p>

                            <p className="mt-6">
                                This guide uses the EU feed-labelling regulation, the 2025 FEDIAF nutritional guidelines and WSAVA&apos;s veterinary nutrition tools. It does not rank brands or replace individual veterinary advice.
                            </p>

                            <h2 id="label" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                1. Start With the German Label
                            </h2>
                            <p>
                                Under EU feed law, <strong>Alleinfuttermittel means complete food</strong>: it is sufficient for a daily ration when used as directed. <strong>Ergänzungsfuttermittel means complementary food</strong>: it is sufficient only in combination with other feed. A topper, treat or supplement with the complementary label should not automatically become the entire diet.
                            </p>
                            <p>For a food intended as the main diet, check:</p>
                            <ul className="space-y-3 my-6">
                                <li><strong>Type of feed:</strong> complete or complementary.</li>
                                <li><strong>Intended animal and life stage:</strong> for example puppy, adult or senior.</li>
                                <li><strong>Feeding instructions and calories:</strong> use these as a starting point and monitor body condition.</li>
                                <li><strong>Composition and analytical constituents:</strong> useful information, but the ingredient list alone does not determine nutritional adequacy or manufacturing quality.</li>
                                <li><strong>Traceability:</strong> responsible business, batch or lot number, net quantity and contact details.</li>
                            </ul>
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">Marketing words are not a nutrition standard</p>
                                <p className="text-sm text-primary/70 leading-relaxed">
                                    Terms such as &quot;premium&quot; or &quot;holistic&quot; do not show whether a diet is complete or whether the company uses qualified nutrition expertise and robust quality control. Check the evidence behind the label instead.
                                </p>
                            </div>

                            <h2 id="formats" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                2. Compare Formats, Not Just Packaging
                            </h2>
                            <p>
                                There is no single best format. Dry, wet and commercially cooked foods can all be suitable if they are complete for the correct life stage and produced with appropriate controls. Compare calorie density, moisture, portioning, storage, cost and the dog&apos;s needs rather than assuming one format is inherently superior.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h3 className="font-bold text-primary mb-2">Dry food (Trockenfutter)</h3>
                                    <p className="text-sm text-primary/70">
                                        Compact, easy to portion and often economical. Check calories carefully because a small-looking portion can be energy dense.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h3 className="font-bold text-primary mb-2">Wet food (Nassfutter)</h3>
                                    <p className="text-sm text-primary/70">
                                        Higher moisture than kibble and available in cans, trays or pouches. Confirm that the specific product is complete rather than complementary.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h3 className="font-bold text-primary mb-2">Commercial cooked or fresh food</h3>
                                    <p className="text-sm text-primary/70">
                                        May be chilled, frozen or shelf stable. Delivery and a higher price do not prove nutritional adequacy, so apply the same label and manufacturer checks.
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h3 className="font-bold text-primary mb-2">Raw or homemade food</h3>
                                    <p className="text-sm text-primary/70">
                                        Requires careful formulation and food-hygiene controls. It carries risks that a simple meat, organ and bone formula does not solve.
                                    </p>
                                </div>
                            </div>

                            <h2 id="manufacturer" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                3. Ask Who Formulates and Tests the Food
                            </h2>
                            <p>
                                WSAVA recommends looking beyond the front of the bag. A manufacturer should be able to answer practical questions about its people, process and finished food.
                            </p>
                            <ul className="space-y-3 my-6">
                                <li>Does the company employ a qualified nutritionist, and who formulates the diet?</li>
                                <li>What quality-control checks cover ingredients, the production site and the finished product?</li>
                                <li>Does the company analyse the finished food and conduct or publish relevant nutrition research?</li>
                                <li>Can it confirm that the food is complete for the stated life stage and provide calorie information?</li>
                                <li>Can a customer reach the manufacturer for detailed answers?</li>
                            </ul>
                            <p>
                                If a company cannot provide this information, that gap is more meaningful than a fashionable ingredient or an appealing claim on the front panel.
                            </p>

                            <h2 id="raw-homemade" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                4. Understand Raw and Homemade Diet Risks
                            </h2>
                            <p>
                                WSAVA reports <strong>no evidence of health benefits</strong> for raw meat-based diets over commercial or balanced cooked diets. Its guidance identifies bacterial contamination, antimicrobial-resistant bacteria, parasites, bone injuries and nutrient imbalance as risks. Growing puppies are particularly vulnerable to formulation errors.
                            </p>
                            <p>
                                Raw food also creates a household hygiene issue through bowls, preparation surfaces, hands and faeces. People who are pregnant, very young, older or immunocompromised may face greater consequences from exposure. If you want to feed raw or prepare food at home, ask a veterinary nutrition professional to formulate and review the diet.
                            </p>

                            <h2 id="medical-diets" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                5. Use Veterinary Diets With Veterinary Guidance
                            </h2>
                            <p>
                                Itching, diarrhoea, vomiting, weight change, urinary signs or a dull coat can have many causes. Repeatedly changing food can obscure the pattern and does not diagnose an allergy or medical condition. Ask a veterinarian before starting an elimination diet or a diet intended for kidney, liver, gastrointestinal, urinary or weight-management conditions.
                            </p>
                            <p>
                                EU rules require the labelling of feed intended for particular nutritional purposes to recommend seeking a nutrition expert&apos;s or veterinarian&apos;s opinion before use or before extending the period of use. Find{' '}
                                <Link to="/" className="text-accent-ink font-bold hover:underline">
                                    English-speaking vets in Germany
                                </Link>{' '}
                                if you need help matching a diet to a diagnosis.
                            </p>

                            <h2 id="switching" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                6. Change Foods Gradually
                            </h2>
                            <p>
                                Follow the manufacturer&apos;s transition instructions or your veterinarian&apos;s plan, introducing the new food gradually while monitoring appetite, stool, vomiting, itching and body condition. A dog on a medical diet, a puppy with poor growth or any dog with persistent or severe signs needs veterinary advice rather than repeated home trials.
                            </p>

                            <h2 id="where-to-buy" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                7. Where to Buy Dog Food in Germany
                            </h2>
                            <p>
                                Supermarkets, drugstores, pet shops, online retailers and veterinary clinics all sell dog food. Veterinary clinics are the appropriate source for diets tied to a diagnosed condition. Wherever you shop, compare the exact product label and manufacturer rather than treating the retailer or price as proof of quality.
                            </p>

                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-primary/10 shadow-sm my-10 not-prose">
                                <h3 className="text-xl font-bold text-primary mb-3">Commercial disclosure</h3>
                                <p className="text-primary/70 leading-relaxed">
                                    The two links below are affiliate links. We may earn a commission at no extra cost to you. We have not independently laboratory-tested or ranked these products or services, and inclusion is not a nutritional endorsement. Confirm complete-food status, life stage and suitability before buying.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                    <a
                                        href={ZOOPLUS_URL}
                                        aria-label="Zooplus affiliate link"
                                        onClick={() => trackAffiliateClick('Zooplus', 'PetFood_WhereToBuy')}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold text-secondary transition-colors hover:bg-black"
                                    >
                                        Browse Zooplus
                                    </a>
                                    <a
                                        href={DINNER_FOR_DOGS_URL}
                                        aria-label="Dinner for Dogs affiliate link"
                                        onClick={() => trackAffiliateClick('DinnerForDogs', 'PetFood_Page')}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary/20 px-6 py-3 font-bold text-primary transition-colors hover:bg-primary/5"
                                    >
                                        Visit Dinner for Dogs
                                    </a>
                                </div>
                            </div>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official and Veterinary Sources
                            </h2>
                            <p>
                                The guidance above was checked against these primary European and veterinary references:
                            </p>
                            <ul className="space-y-3 my-6 break-words">
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.euLabelling}>
                                        EU pet-food labelling regulation
                                    </ExternalSourceLink>
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.fediafNutrition}>
                                        FEDIAF 2025 nutritional guidelines
                                    </ExternalSourceLink>
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.wsavaSelection}>
                                        WSAVA pet-food selection checklist
                                    </ExternalSourceLink>
                                </li>
                                <li>
                                    <ExternalSourceLink href={SOURCE_URLS.wsavaRaw}>
                                        WSAVA raw-diet guidance
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

                        <RelatedPosts currentPath="/blog/best-dog-food-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
