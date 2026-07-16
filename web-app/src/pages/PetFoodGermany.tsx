import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { trackAffiliateClick } from '../utils/analytics';
import { generateArticleSchema } from '../utils/schema';

const TITLE = "Best Dog Food in Germany (2026): A Buyer's Guide for Expats";
const DESCRIPTION = "How to choose the best dog food in Germany: dry vs wet vs raw (BARF), decoding German food labels, where to buy, and a recommended fresh-delivery option. A practical guide for expat dog owners.";
const URL = "https://englishspeakinggermany.online/blog/best-dog-food-germany";

const FAQS = [
    {
        q: "What is the best dog food in Germany?",
        a: "There is no single best dog food. The right choice depends on your dog's age, size, activity, and any allergies. What matters most is that the food is labelled 'Alleinfuttermittel' (a complete food), lists a named meat as the first ingredient, and suits your dog. Germany offers everything from budget supermarket kibble to premium fresh-cooked delivery, and this guide explains how to compare them.",
    },
    {
        q: "What does 'Alleinfuttermittel' mean on German dog food?",
        a: "'Alleinfuttermittel' means a complete food that covers all of your dog's nutritional needs on its own. 'Ergänzungsfuttermittel' means a complementary food (a topper or treat) that is not balanced to feed alone. Always check for 'Alleinfuttermittel' if it is your dog's main meal.",
    },
    {
        q: "Is grain-free ('getreidefrei') dog food better?",
        a: "Not automatically. Grain-free helps dogs with a diagnosed grain sensitivity, but most dogs digest grains fine, and some grain-free recipes simply swap grains for legumes. Vets have raised questions about certain grain-free diets, so choose based on your dog's actual needs and ask your vet rather than assuming grain-free is healthier.",
    },
    {
        q: "Where can I buy dog food in Germany?",
        a: "Pet stores like Fressnapf and Das Futterhaus, supermarkets and drugstores (REWE, EDEKA, DM, Rossmann), online retailers (zooplus, fressnapf.de, Amazon), your vet clinic for prescription diets, and direct-to-door fresh services. Online usually has the widest premium range and saves carrying heavy bags up your Altbau stairs.",
    },
    {
        q: "How do I switch my dog's food safely?",
        a: "Transition gradually over 7 to 10 days: mix a little of the new food into the old, increasing the new portion each day. A sudden switch often causes an upset stomach. If your dog has ongoing digestive issues, consult an English-speaking vet.",
    },
];

export default function PetFoodGermany() {
    const affiliateLink = "https://tidd.ly/4au55tO";

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
                <meta name="keywords" content="best dog food Germany, dog food Germany, best dry dog food Germany, German dog food labels, Alleinfuttermittel, getreidefrei, BARF Germany, where to buy dog food Germany, fresh dog food delivery Germany, expat pet care" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(TITLE, DESCRIPTION, URL, "2025-01-01"))}
                </script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Nutrition & Feeding Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            🍲 Best Dog Food in Germany: <br />A Buyer's Guide for Expats
                        </h1>

                        <TableOfContents items={[
                            { id: 'types', label: 'Types of Dog Food' },
                            { id: 'labels', label: 'Decoding German Labels' },
                            { id: 'where-to-buy', label: 'Where to Buy' },
                            { id: 'how-to-choose', label: 'How to Choose' },
                            { id: 'fresh-delivery', label: 'Best Fresh Delivery' },
                            { id: 'switching', label: 'Switching Foods Safely' },
                            { id: 'faq', label: 'FAQ' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Finding the best dog food in Germany feels harder than it should, mostly because every label is in German and the aisle runs the full range from cheap supermarket kibble to premium fresh-cooked menus. This guide breaks down the real options, decodes the labels, and shows you exactly where to buy.
                            </p>

                            <p className="mt-6">
                                There is no single best dog food. The right answer depends on your dog's age, size, activity level, and any sensitivities. But there are clear ways to compare your options and avoid the low-quality stuff, even if your German is still a work in progress.
                            </p>

                            <h2 id="types" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">1. The Types of Dog Food in Germany</h2>
                            <p>German pet aisles broadly split into four categories. Each has a place depending on budget, convenience, and your dog's needs.</p>

                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h4 className="font-bold text-primary mb-1">Dry food (Trockenfutter)</h4>
                                    <p className="text-sm opacity-70 mb-2">Kibble. Cheapest per meal, easy to store and portion, good for the teeth. Quality varies enormously, so the label matters most here.</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Best for: budget & convenience</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h4 className="font-bold text-primary mb-1">Wet food (Nassfutter)</h4>
                                    <p className="text-sm opacity-70 mb-2">Cans and trays. Higher moisture and usually higher meat content, more palatable for picky eaters. Pricier and bulkier to store.</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Best for: picky or older dogs</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h4 className="font-bold text-primary mb-1">Raw / BARF</h4>
                                    <p className="text-sm opacity-70 mb-2">Germany is a European leader in BARF (Biologisch Artgerechtes Rohes Futter). Raw meat, organs, and bone. Requires research to balance correctly, and freezer space.</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Best for: committed owners</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-accent/20 shadow-sm shadow-accent/5">
                                    <h4 className="font-bold text-primary mb-1">Fresh-cooked / delivery</h4>
                                    <p className="text-sm opacity-70 mb-2">Gently cooked menus delivered to your door, portioned for your dog. The convenience of wet food with premium ingredients. The priciest option.</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Best for: premium & convenience</p>
                                </div>
                            </div>

                            <h2 id="labels" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">2. How to Decode German Dog Food Labels</h2>
                            <p>This is where most expats get stuck. A few German terms tell you almost everything you need to know:</p>

                            <ul className="space-y-3 my-6">
                                <li><strong>Alleinfuttermittel</strong> = a <em>complete</em> food, balanced to feed on its own. This is what you want for your dog's main meal.</li>
                                <li><strong>Ergänzungsfuttermittel</strong> = a <em>complementary</em> food (topper, treat, or mixer). Not balanced to feed alone.</li>
                                <li><strong>Getreidefrei</strong> = grain-free. Useful for diagnosed grain sensitivities, not automatically healthier (see the FAQ).</li>
                                <li><strong>Fleischanteil</strong> = meat content. A higher, named meat percentage (for example "70% Huhn") is generally a good sign.</li>
                                <li><strong>Offene Deklaration</strong> = open declaration. The label lists exact ingredient percentages, rather than vague "meat and animal derivatives".</li>
                                <li><strong>Ohne Zucker / ohne Konservierungsstoffe</strong> = no added sugar / no preservatives.</li>
                                <li><strong>Zusatzstoffe</strong> = additives (vitamins, minerals, but sometimes dyes and flavourings too).</li>
                            </ul>

                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-8 not-prose">
                                <p className="text-sm font-bold text-primary mb-1">Quick quality test</p>
                                <p className="text-sm opacity-70">Check for <strong>Alleinfuttermittel</strong>, look for a <strong>named meat as the first ingredient</strong> ("Huhn", "Rind", "Lachs", not just "Fleischmehl"), and prefer an <strong>open declaration</strong>. That alone filters out most low-quality food.</p>
                            </div>

                            <h2 id="where-to-buy" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">3. Where to Buy Dog Food in Germany</h2>
                            <ul className="space-y-3 my-6">
                                <li><strong>Pet superstores:</strong> Fressnapf and Das Futterhaus carry everything from budget to premium, plus staff advice.</li>
                                <li><strong>Supermarkets & drugstores:</strong> REWE, EDEKA, DM, and Rossmann stock mainstream brands. Convenient, but the premium range is limited.</li>
                                <li><strong>Online:</strong> <a href="https://tidd.ly/4wdElaw" onClick={() => trackAffiliateClick('Zooplus', 'PetFood_WhereToBuy')} target="_blank" rel="noopener noreferrer sponsored" className="text-accent font-bold hover:underline">zooplus</a>*, fressnapf.de, and Amazon have the widest selection and the best prices on bulk, and they save you carrying a 12kg bag up four flights of Altbau stairs.</li>
                                <li><strong>Your vet clinic:</strong> prescription and veterinary diets for medical needs (allergies, kidney, weight). For these, talk to a vet first.</li>
                                <li><strong>Fresh delivery services:</strong> direct-to-door cooked menus (covered below).</li>
                            </ul>

                            <h2 id="how-to-choose" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">4. How to Choose the Right Food for Your Dog</h2>
                            <p>Match the food to the dog, not the marketing:</p>
                            <ul className="space-y-3 my-6">
                                <li><strong>Life stage:</strong> Welpe (puppy), Adult, and Senior formulas exist for a reason. Puppies and seniors have different needs.</li>
                                <li><strong>Size & activity:</strong> a working Shepherd and a flat-living Dachshund need very different calories.</li>
                                <li><strong>Sensitivities:</strong> if your dog has itchy skin, recurring tummy upsets, or ear issues, a vet-guided elimination diet beats guessing.</li>
                                <li><strong>Always confirm it is an Alleinfuttermittel</strong> if it is the main meal.</li>
                            </ul>
                            <p>
                                When something seems off with your dog's weight, coat, or digestion, food is often a factor but rarely the whole story. If you are unsure, it is worth a conversation with a vet who can explain things clearly. You can find a <Link to="/" className="text-accent font-bold hover:underline">verified English-speaking vet near you</Link> in our directory, or browse practices in <Link to="/vets/berlin" className="text-accent font-bold hover:underline">Berlin</Link>, <Link to="/vets/munich" className="text-accent font-bold hover:underline">Munich</Link>, and 30+ other cities.
                            </p>

                            <h2 id="fresh-delivery" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">5. Our Pick for Fresh Delivery: Dinner for Dogs</h2>
                            <p>
                                If you want the premium, fresh end of the scale without the freezer logistics of BARF, our recommended option is <strong>Dinner for Dogs</strong>. Founded over 20 years ago, they have fed more than 2 million dogs in Germany on one rule: quality is the best recipe.
                            </p>

                            <div className="bg-white p-8 rounded-3xl border border-primary/5 shadow-xl my-10 not-prose transition-all hover:shadow-2xl">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="flex-shrink-0 bg-accent/5 p-6 rounded-2xl text-6xl">🥘</div>
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-2xl font-black text-primary italic underline decoration-accent/30 decoration-4 underline-offset-4">Premium Fresh Menus</h3>
                                        <p className="text-primary/70 font-medium">Specialised wet and dry menus made from high-quality raw materials, gently prepared so they are close to home-cooked, and delivered to your door.</p>
                                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-bold opacity-60">
                                            <li>✅ No Artificial Additives</li>
                                            <li>✅ Vitamin-Preserving</li>
                                            <li>✅ Direct-to-Door Delivery</li>
                                            <li>✅ Puppy, Adult & Senior</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <p>
                                Dogs moved onto a fresh, high-quality diet often show visible improvements within a few weeks: a shinier coat, steadier energy from real protein instead of grain-heavy fillers, and firmer, smaller stools (every city dog owner's dream). And practically, set-and-forget delivery means no more midnight runs to the Späti when the bowl runs empty.
                            </p>

                            <div className="bg-accent/10 p-10 rounded-[3rem] my-12 text-center border border-accent/20 shadow-2xl shadow-accent/5 not-prose relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                <h3 className="text-3xl font-black text-primary mb-6">Try Fresh, Delivered</h3>
                                <p className="mb-10 text-primary/80 italic font-serif text-xl max-w-2xl mx-auto">
                                    "Your companion deserves food as good as yours. Explore the direct-to-door fresh philosophy of Dinner for Dogs."
                                </p>
                                <a
                                    href={affiliateLink}
                                    onClick={() => trackAffiliateClick('DinnerForDogs', 'PetFood_Page')}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="inline-block bg-primary hover:bg-black text-secondary font-black py-5 px-12 rounded-2xl transition-all transform hover:scale-105 shadow-xl active:scale-95"
                                >
                                    Explore Dinner for Dogs →
                                </a>
                                <p className="mt-6 text-[10px] font-bold uppercase tracking-widest opacity-40 italic">
                                    *Affiliate link. We may earn a commission at no extra cost to you.
                                </p>
                            </div>

                            <h2 id="switching" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">6. Switching Foods Safely</h2>
                            <p>
                                Whatever you choose, change food gradually over <strong>7 to 10 days</strong>. Start with mostly the old food and a little of the new, then shift the ratio each day. A sudden switch is the most common cause of a dog's upset stomach. If digestive issues persist after the transition, that is a good moment to check in with a vet.
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

                        <RelatedPosts currentPath="/blog/best-dog-food-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
