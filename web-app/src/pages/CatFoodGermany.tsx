import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackAffiliateClick } from '../utils/analytics';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "Best Cat Food in Germany (2026): A Buyer's Guide for Expats";
const DESCRIPTION = "How to choose the best cat food in Germany: wet vs dry, why cats need taurine and moisture, decoding German labels, and where to buy. A practical guide for expat cat owners.";
const URL = "https://englishspeakinggermany.online/blog/best-cat-food-germany";

const FAQS = [
    {
        q: "What is the best cat food in Germany?",
        a: "The best cat food is a complete food ('Alleinfuttermittel') with a high, named meat content, added taurine, and low carbohydrate, chosen to suit your cat's age and health. Cats are obligate carnivores, so animal protein matters far more than the brand name. Germany offers strong options from supermarket trays to premium wet food.",
    },
    {
        q: "Wet or dry food for cats?",
        a: "Wet food is generally better as the staple for cats. Cats evolved from desert animals and have a low thirst drive, so they often do not drink enough water. Wet food ('Nassfutter') keeps them hydrated and supports urinary and kidney health. Dry food ('Trockenfutter') is convenient and fine in combination, but a dry-only diet raises the risk of urinary problems for some cats.",
    },
    {
        q: "Why do cats need taurine?",
        a: "Taurine is an essential amino acid that cats cannot make in sufficient amounts. A deficiency can cause serious heart disease and vision loss. Complete cat foods ('Alleinfuttermittel') add taurine, which is one reason you should never feed a cat dog food or a food labelled only as 'Ergänzungsfuttermittel' (complementary) as its main meal.",
    },
    {
        q: "Is grain-free ('getreidefrei') cat food better?",
        a: "What matters most for cats is high animal protein and low carbohydrate, not the word grain-free itself. Cats have little need for carbohydrates, so a high-meat recipe is usually the better signal of quality. Grain-free only matters specifically if your cat has a diagnosed grain sensitivity.",
    },
    {
        q: "Where can I buy cat food in Germany?",
        a: "Pet stores (Fressnapf, Das Futterhaus), supermarkets and drugstores (REWE, EDEKA, DM, Rossmann), online retailers (zooplus, fressnapf.de, Amazon), and your vet clinic for prescription urinary or kidney diets. Online usually has the widest premium wet-food range.",
    },
];

export default function CatFoodGermany() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
    };

    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="best cat food Germany, cat food Germany, wet vs dry cat food, taurine cat food, German cat food labels, Alleinfuttermittel cat, getreidefrei, where to buy cat food Germany, Katzenfutter, expat pet care" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(TITLE, DESCRIPTION, URL, "2026-06-23"))}
                </script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">Nutrition & Feeding Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            🐈 Best Cat Food in Germany: <br />A Buyer's Guide for Expats
                        </h1>

                        <TableOfContents items={[
                            { id: 'carnivore', label: 'Cats Are Obligate Carnivores' },
                            { id: 'wet-vs-dry', label: 'Wet vs Dry' },
                            { id: 'labels', label: 'Decoding German Labels' },
                            { id: 'where-to-buy', label: 'Where to Buy' },
                            { id: 'how-to-choose', label: 'How to Choose' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Choosing the best cat food in Germany is less about the brand and more about a few biological facts. Once you understand what cats actually need, and how to read a German label, the overwhelming pet aisle gets a lot simpler.
                            </p>

                            <h2 id="carnivore" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">1. Start Here: Cats Are Obligate Carnivores</h2>
                            <p>
                                Unlike dogs, cats are <strong>obligate carnivores</strong>: they are built to live on animal protein and cannot thrive on a plant-heavy diet. Two things follow from this, and they drive every good buying decision:
                            </p>
                            <ul className="space-y-3 my-6">
                                <li><strong>Taurine is essential.</strong> Cats cannot make enough of this amino acid themselves. A deficiency causes heart disease and blindness, so a complete cat food always adds it. Never feed a cat dog food.</li>
                                <li><strong>High animal protein, low carbohydrate.</strong> Cats have little use for carbs. A named meat high on the ingredient list matters more than any marketing term.</li>
                            </ul>

                            <h2 id="wet-vs-dry" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">2. Wet vs Dry Food (and Why Moisture Matters)</h2>
                            <p>
                                Cats descend from desert animals and have a famously <strong>low thirst drive</strong>, so many do not drink enough water on their own. That makes moisture a real health issue, not a preference.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-accent/20 shadow-sm shadow-accent/5">
                                    <h4 className="font-bold text-primary mb-1">Wet food (Nassfutter)</h4>
                                    <p className="text-sm opacity-70 mb-2">High moisture supports hydration, urinary, and kidney health. Usually higher meat content and very palatable. The recommended staple for most cats.</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Best as the main diet</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h4 className="font-bold text-primary mb-1">Dry food (Trockenfutter)</h4>
                                    <p className="text-sm opacity-70 mb-2">Convenient, cheaper, easy to leave out. But very low moisture. Fine as a supplement or for grazing, less ideal as the only food.</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary/50">Best in combination</p>
                                </div>
                            </div>
                            <p>
                                A common, practical approach is wet food as the staple with a little dry for grazing, plus always-available fresh water (many cats prefer a water fountain).
                            </p>

                            <h2 id="labels" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">3. How to Decode German Cat Food Labels</h2>
                            <ul className="space-y-3 my-6">
                                <li><strong>Alleinfuttermittel</strong> = a <em>complete</em> food, safe to feed as the main diet. This is what you want.</li>
                                <li><strong>Ergänzungsfuttermittel</strong> = <em>complementary</em> food (topper or treat). Not balanced to feed alone, and may lack taurine.</li>
                                <li><strong>Fleischanteil</strong> = meat content. A high, named percentage ("60% Huhn") is a good sign.</li>
                                <li><strong>Taurin</strong> = taurine. Listed under additives in a proper complete food.</li>
                                <li><strong>Getreidefrei</strong> = grain-free. Only relevant for a diagnosed sensitivity; high protein matters more.</li>
                                <li><strong>Ohne Zucker</strong> = no added sugar (you do not want sugar in cat food).</li>
                            </ul>
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-8 not-prose">
                                <p className="text-sm font-bold text-primary mb-1">Quick quality test</p>
                                <p className="text-sm opacity-70">Look for <strong>Alleinfuttermittel</strong>, a <strong>named meat as the first ingredient</strong> with a high percentage, and <strong>added taurine</strong>. Skip foods that lead with grains, sugar, or vague "animal derivatives".</p>
                            </div>

                            <h2 id="where-to-buy" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">4. Where to Buy Cat Food in Germany</h2>
                            <ul className="space-y-3 my-6">
                                <li><strong>Pet superstores:</strong> Fressnapf and Das Futterhaus carry budget to premium, with staff advice.</li>
                                <li><strong>Supermarkets & drugstores:</strong> REWE, EDEKA, DM, and Rossmann stock mainstream wet and dry food.</li>
                                <li><strong>Online:</strong> <a href="https://tidd.ly/3R2z5ax" onClick={() => trackAffiliateClick('Zooplus', 'CatFood_WhereToBuy')} target="_blank" rel="noopener noreferrer sponsored" className="text-accent-ink font-bold hover:underline">zooplus</a>*, fressnapf.de, and Amazon have the widest premium wet-food range and the best bulk prices.</li>
                                <li><strong>Your vet clinic:</strong> prescription urinary, kidney, and weight diets for medical needs. Discuss these with a vet first.</li>
                            </ul>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic mt-2">*Affiliate link. We may earn a commission at no extra cost to you.</p>

                            <h2 id="how-to-choose" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">5. How to Choose the Right Food for Your Cat</h2>
                            <ul className="space-y-3 my-6">
                                <li><strong>Life stage:</strong> Kitten (Kitten/Junior), Adult, and Senior formulas match different needs.</li>
                                <li><strong>Indoor vs outdoor:</strong> indoor cats are less active and prone to weight gain, so portion control matters.</li>
                                <li><strong>Health flags:</strong> straining in the litter box, frequent vomiting, or sudden weight change deserve a vet visit, not a guess.</li>
                                <li><strong>Always confirm Alleinfuttermittel with taurine</strong> for the main meal.</li>
                            </ul>
                            <p>
                                Urinary problems are common in cats and can become emergencies fast, especially in males. If your cat strains to urinate or stops eating, treat it as urgent. For routine diet questions or a check-up, you can find a <Link to="/" className="text-accent-ink font-bold hover:underline">verified English-speaking vet near you</Link>, with practices in <Link to="/vets/berlin" className="text-accent-ink font-bold hover:underline">Berlin</Link>, <Link to="/vets/hamburg" className="text-accent-ink font-bold hover:underline">Hamburg</Link>, and 30+ other cities. If you have just arrived, our guide to <Link to="/blog/first-vet-visit-germany" className="text-accent-ink font-bold hover:underline">your first vet visit in Germany</Link> covers what to expect.
                            </p>

                            <h2 id="faq" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Frequently Asked Questions</h2>
                            <div className="space-y-4 not-prose">
                                {FAQS.map((f, i) => (
                                    <details key={i} className="group bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                        <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                                            <span>{f.q}</span>
                                            <span className="text-accent text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
                                        </summary>
                                        <p className="mt-3 text-primary/70 leading-relaxed">{f.a}</p>
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
