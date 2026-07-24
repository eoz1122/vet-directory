import { Link } from 'react-router-dom';
import { trackAffiliateClick } from '../utils/analytics';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const blogPosts = [
    {
        url: "/guides/pet-emergency-germany",
        title: "Emergency Vet Germany: Night & Weekend Help",
        emoji: "🚑",
        category: "Emergency",
        desc: "Find local night and weekend veterinary services, official warning signs, call-ahead steps, and the federal GOT emergency-fee rules."
    },
    {
        url: "/guides/emergency-vets-berlin",
        title: "24-Hour Emergency Vets in Berlin",
        emoji: "🏥",
        category: "Emergency",
        desc: "Five clinics from the current Berlin Veterinary Chamber list, verified phone numbers, warning signs, GOT fees, and English call phrases."
    },
    {
        url: "/guides/emergency-vets-munich",
        title: "24-Hour Emergency Vet Munich: LMU Guide",
        emoji: "🏥",
        category: "Emergency",
        desc: "Official LMU dog-and-cat emergency access, current service limits, location, phone guidance and GOT fees."
    },
    {
        url: "/guides/emergency-vets-frankfurt",
        title: "Emergency Vet Frankfurt Guide",
        emoji: "🏥",
        category: "Emergency",
        desc: "Emergency contacts, clinic details, call-ahead guidance, and what to expect from out-of-hours veterinary care in Frankfurt."
    },
    {
        url: "/blog/pet-sitting-germany",
        title: "Pet Sitting in Germany (2026)",
        emoji: "🏡",
        category: "Living",
        desc: "Finding a safe home for your little friends. Comparing platforms like Pawshake vs. Pensions vs. Community Swaps."
    },
    {
        url: "/blog/moving-to-germany-with-pet",
        title: "Moving to Germany With a Dog or Cat",
        emoji: "🐕",
        category: "Moving",
        desc: "Choose the correct EU or non-EU route, then check microchip, rabies, certificate, owner-travel and breed requirements."
    },
    {
        url: "/blog/pet-friendly-apartments-germany",
        title: "Pet-Friendly Apartments in Berlin",
        emoji: "🏠",
        category: "Living",
        desc: "Official Berlin search steps, the BGH dog-and-cat ruling, lease consent, application documents and a practical pet resume."
    },
    {
        url: "/blog/eu-pet-passport-germany",
        title: "The EU Pet Passport Guide",
        emoji: "🛂",
        category: "Bureaucracy",
        desc: "Why you need one, how to get it, and how much it costs. The golden ticket for travel within Europe."
    },
    {
        url: "/blog/hundesteuer-dog-tax-germany",
        title: "Hundesteuer (Dog Tax) 101",
        emoji: "💶",
        category: "Bureaucracy",
        desc: "Everything you need to know about German Dog Tax. Costs by city, how to register, and who is exempt."
    },
    {
        url: "/blog/cat-registration-germany",
        title: "Cat Registration (Tasso & Finds)",
        emoji: "🐱",
        category: "Safety",
        desc: "Germany has no dog tax for cats, but registration is vital. Learn about Tasso e.V., microchipping, and Findefix."
    },
    {
        url: "/blog/public-transport-with-dogs-munich",
        title: "Dogs on Munich Public Transport",
        emoji: "🥨",
        category: "Transport",
        desc: "Current MVV rules for dog tickets, leads, muzzles, Deutschlandticket travel and the MVV FLEX exception."
    },
    {
        url: "/blog/public-transport-with-dogs-stuttgart",
        title: "Public Transport with Dogs: Stuttgart",
        emoji: "🏎️",
        category: "Transport",
        desc: "VVS 2026 Guide: The 'Children's Ticket' rule, local Deutschlandticket bonuses, and the Zacke."
    },
    {
        url: "/blog/public-transport-with-dogs-berlin",
        title: "Public Transport with Dogs: Berlin",
        emoji: "🚇",
        category: "Transport",
        desc: "The BVG survival guide. Ticket rules, muzzles, and safety tips for taking your dog on the U-Bahn and S-Bahn in the capital."
    },
    {
        url: "/blog/public-transport-with-dogs-hamburg",
        title: "Public Transport with Dogs: Hamburg",
        emoji: "🚢",
        category: "Transport",
        desc: "HVV Guide: Why dogs travel free, taking the harbor ferries, and the relaxed leash policies of the North."
    },
    {
        url: "/blog/public-transport-with-dogs-frankfurt",
        title: "Public Transport with Dogs: Frankfurt",
        emoji: "🚆",
        category: "Transport",
        desc: "RMV Guide: Navigating the 'muzzle gray zone' and utilizing the free travel rules in Germany's financial hub."
    },
    {
        url: "/blog/german-vet-survival-kit-phrases",
        title: "German Vet Survival Kit Phrases",
        emoji: "🩺",
        category: "Safety",
        desc: "Essential medical German for pet owners. From describing symptoms like 'Durchfall' to making emergency appointments."
    },
    {
        url: "/blog/pet-gps-tracker-germany",
        title: "📡 GPS Trackers for Pets in Germany",
        emoji: "📡",
        category: "Safety",
        desc: "Tractive vs Kippy vs AirTag: real subscription costs, what works for outdoor cats, and the breakaway-collar safety rules nobody mentions."
    },
    {
        url: "/blog/adopting-pet-tierheim-germany",
        title: "🏠 Adopting from a Tierheim",
        emoji: "🏠",
        category: "New Pet",
        desc: "The Schutzgebühr, the interview and home check, documents expats need, and what happens after you adopt from a German shelter."
    },
    {
        url: "/blog/puppy-first-year-germany",
        title: "🐶 Puppy's First Year in Germany",
        emoji: "🐶",
        category: "New Pet",
        desc: "Month-by-month timeline and a realistic 1,500-3,000 EUR budget: registrations, vaccinations, dog school, and the deadlines that matter."
    },
    {
        url: "/blog/new-pet-checklist-germany",
        title: "✅ New Pet: First 30 Days Checklist",
        emoji: "✅",
        category: "New Pet",
        desc: "Everything to register, insure, and organize in the first month with a new dog or cat in Germany, in the right order."
    },
    {
        url: "/blog/vet-costs-germany",
        title: "💶 Vet Costs in Germany: GOT Fees Explained",
        emoji: "💶",
        category: "Bureaucracy",
        desc: "Understand GOT base fees, ordinary 1x-3x rates, emergency 2x-4x billing, invoice items, VAT and estimates."
    },
    {
        url: "/blog/neutering-cost-germany",
        title: "✂️ Neutering & Spaying Costs",
        emoji: "✂️",
        category: "Health",
        desc: "Realistic Kastration prices for cats and dogs, what quotes include, mandatory neutering rules for outdoor cats, and how to compare estimates."
    },
    {
        url: "/blog/pet-vaccination-costs-germany",
        title: "💉 Vaccination Schedule & Costs",
        emoji: "💉",
        category: "Health",
        desc: "The StIKo Vet puppy and kitten schedules, why rabies is now a travel vaccine, and what every jab costs under the GOT."
    },
    {
        url: "/blog/pet-insurance-germany",
        title: "Pet Insurance in Germany: Dog & Cat Guide",
        emoji: "💰",
        category: "Bureaucracy",
        desc: "Compare dog liability, cat and dog health cover, surgery policies, exclusions, GOT reimbursement and policy limits."
    },
    {
        url: "/blog/german-dog-etiquette-rules",
        title: "German Dog Etiquette and Useful Phrases",
        emoji: "🐕",
        category: "Living",
        desc: "How to greet dogs politely, read local leash signs, compare Berlin, Hamburg and Lower Saxony rules, and ask before entering venues."
    },
    {
        url: "/blog/pet-medication-germany-guide",
        title: "💊 Pet Medication Guide",
        emoji: "💊",
        category: "Health",
        desc: "Where to buy, how prescriptions work, and why you can't have antibiotics shipped. Comparing vet prices vs. online pharmacies like Medpets."
    },
    {
        url: "/blog/best-dog-food-germany",
        title: "🐕 Best Dog Food in Germany",
        emoji: "🐕",
        category: "Health",
        desc: "How to compare complete foods, German label terms, dry and wet formats, raw-diet risks and manufacturer quality checks."
    },
    {
        url: "/blog/best-cat-food-germany",
        title: "🐈 Best Cat Food in Germany",
        emoji: "🐈",
        category: "Health",
        desc: "How to compare complete foods, wet and dry formats, taurine needs, kitten nutrition and manufacturer quality checks."
    },
    {
        url: "/english-speaking-vet-access-germany",
        title: "📊 Mapping English-Speaking Vets in Germany",
        emoji: "📊",
        category: "Report",
        desc: "A coverage snapshot of our directory: 240+ practices mapped across 38 cities, where coverage is strongest, and the cities we are still expanding into."
    },
    {
        url: "/blog/first-vet-visit-germany",
        title: "🩺 First Vet Visit in Germany",
        emoji: "🩺",
        category: "Vet Care",
        desc: "What to bring, what to ask, how GOT billing and invoices work, and when pet-passport rules matter."
    },
    {
        url: "/blog/breed-restrictions-germany",
        title: "Banned Dog Breeds in Germany: Federal and State Rules",
        emoji: "⚠️",
        category: "Bureaucracy",
        desc: "Check the federal import ban, its limited exceptions, and verified Berlin, Hamburg and Bavaria keeping rules before travelling."
    },
    {
        url: "/blog/public-transport-with-dogs-cologne",
        title: "Dogs on Cologne Public Transport",
        emoji: "🚋",
        category: "Transport",
        desc: "Dogs travel free on KVB and VRS services. Check short-leash, muzzle, seat, carrier and assistance-dog rules."
    },
    {
        url: "/blog/best-dog-parks-berlin",
        title: 'Best Dog Parks in Berlin: Off-Leash Guide',
        emoji: "🌳",
        category: 'City Living',
        desc: 'The definitive guide to off-leash dog areas in Berlin. Hundeauslaufgebiete by neighbourhood, leash rules, and more.'
    },
    {
        url: "/blog/cat-microchipping-germany",
        title: 'Cat Microchipping in Germany 2026',
        emoji: "🐱",
        category: 'Bureaucracy',
        desc: 'Germany is tightening cat microchipping and registration rules. Here is what expat cat owners need to know, and what you must do before it affects you.'
    },
    {
        url: "/blog/tick-season-germany-pets",
        title: 'Tick Season in Germany: Dog & Cat Safety',
        emoji: "🦟",
        category: 'Health',
        desc: 'When ticks are active, how to check and remove them safely, species-specific prevention and urgent warning signs.'
    },
    {
        url: "/blog/emergency-vet-hamburg-english",
        title: '24-Hour Emergency Vet Hamburg: What to Call',
        emoji: "🏥",
        category: 'Emergency',
        desc: 'Use Hamburg’s rotating veterinary duty service, current call number, published hours, warning signs, and GOT fee rules.'
    }
];

type BlogPost = (typeof blogPosts)[number];

const FEATURED_POST_URLS = [
    '/guides/pet-emergency-germany',
    '/blog/moving-to-germany-with-pet',
    '/blog/pet-friendly-apartments-germany',
];

const TOPIC_LINKS = [
    ['#start-here', 'Start here'],
    ['#emergency-vet-care', 'Emergency and vet care'],
    ['#moving-paperwork', 'Moving and paperwork'],
    ['#health-safety', 'Health and safety'],
    ['#everyday-life', 'Everyday life'],
    ['#new-pet-essentials', 'New pet essentials'],
];

const GUIDE_SECTION_DEFINITIONS = [
    {
        id: 'emergency-vet-care',
        title: 'Emergency and vet care',
        description: 'Know who to call, what to bring, and how German emergency and routine vet care works.',
        categories: ['Emergency', 'Vet Care'],
    },
    {
        id: 'moving-paperwork',
        title: 'Moving and paperwork',
        description: 'Handle entry rules, registration, insurance, fees, and the paperwork that follows a move.',
        categories: ['Bureaucracy', 'Report'],
    },
    {
        id: 'health-safety',
        title: 'Health and safety',
        description: 'Make informed decisions about prevention, medication, nutrition, tracking, and urgent warning signs.',
        categories: ['Health', 'Safety'],
    },
    {
        id: 'everyday-life',
        title: 'Everyday life',
        description: 'Navigate transport, housing, pet sitting, city rules, parks, and everyday etiquette.',
        categories: ['Living', 'City Living', 'Transport'],
    },
    {
        id: 'new-pet-essentials',
        title: 'New pet essentials',
        description: 'Start with a practical checklist for adoption, puppy care, and the first month at home.',
        categories: ['New Pet'],
    },
];

const blogPostByUrl = new Map(blogPosts.map((post) => [post.url, post]));
const FEATURED_POSTS = FEATURED_POST_URLS.map((url) => {
    const post = blogPostByUrl.get(url);

    if (!post) {
        throw new Error(`Missing featured Blog guide: ${url}`);
    }

    return post;
});
const featuredPostUrls = new Set(FEATURED_POST_URLS);
const GUIDE_SECTIONS = GUIDE_SECTION_DEFINITIONS.map((section) => ({
    ...section,
    posts: blogPosts.filter(
        (post) => !featuredPostUrls.has(post.url) && section.categories.includes(post.category),
    ),
}));
const ORDERED_BLOG_POSTS = [
    ...FEATURED_POSTS,
    ...GUIDE_SECTIONS.flatMap((section) => section.posts),
];
const orderedBlogPostUrls = new Set(ORDERED_BLOG_POSTS.map((post) => post.url));

if (
    ORDERED_BLOG_POSTS.length !== blogPosts.length
    || orderedBlogPostUrls.size !== blogPosts.length
) {
    throw new Error('Every Blog guide must appear exactly once in the task-based hierarchy.');
}

const BLOG_URL = 'https://englishspeakinggermany.online/blog';
const BLOG_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    url: BLOG_URL,
    name: 'Expat Pet Guides for Germany',
    description: 'English-language guides on pet ownership in Germany: vet costs, insurance, emergencies, adoption, and bureaucracy.',
    publisher: {
        '@type': 'Organization',
        name: 'EnglishSpeakingVets',
        url: 'https://englishspeakinggermany.online',
        logo: 'https://englishspeakinggermany.online/logo.png',
        description: 'Community-verified directory of English-speaking veterinarians in Germany for expats and international residents.',
    },
    mainEntity: {
        '@type': 'ItemList',
        numberOfItems: ORDERED_BLOG_POSTS.length,
        itemListElement: ORDERED_BLOG_POSTS.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Article',
                name: post.title,
                description: post.desc,
                url: `https://englishspeakinggermany.online${post.url}`,
            },
        })),
    },
};

function GuideCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
    return (
        <Link
            to={post.url}
            data-guide-url={post.url}
            className={`group flex h-full gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:p-6 ${
                featured ? 'border-accent/20' : 'border-primary/5'
            }`}
        >
            <span
                aria-hidden="true"
                className={`flex shrink-0 items-center justify-center rounded-xl bg-primary/5 ${
                    featured ? 'h-14 w-14 text-3xl' : 'h-12 w-12 text-2xl'
                }`}
            >
                {post.emoji}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary/55">
                    {post.category}
                </span>
                <h3
                    className={`font-bold leading-tight text-primary transition-colors group-hover:text-accent ${
                        featured ? 'text-xl' : 'text-lg'
                    }`}
                >
                    {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary/70">
                    {post.desc}
                </p>
                <span className="mt-4 text-sm font-bold text-accent">
                    Read guide <span aria-hidden="true">→</span>
                </span>
            </div>
        </Link>
    );
}

export default function Blog() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Expat Dog & Cat Guides Germany | EnglishSpeakingVets</title>
                <meta name="description" content="Essential guides for pet owners in Germany. Dog tax, public transport rules, finding apartments, and EU pet passports explained for expats." />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog" />
                <script type="application/ld+json">
                    {JSON.stringify(BLOG_SCHEMA)}
                </script>
                <meta property="og:title" content="Expat Dog & Cat Guides Germany | EnglishSpeakingVets" />
                <meta property="og:description" content="Essential guides for pet owners in Germany. Dog tax, public transport rules, finding apartments, and EU pet passports explained for expats." />
                <meta property="og:url" content="https://englishspeakinggermany.online/blog" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
            </Helmet>

            <Header />

            <main className="mx-auto mb-12 max-w-6xl px-5 py-8 sm:px-6 md:p-12">
                <section className="mx-auto mb-8 max-w-3xl space-y-4 text-center md:mb-10">
                    <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">The Expat Resource Center</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
                        Life in Germany with Pets
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-primary/70 md:text-xl">
                        Practical guides for emergencies, moving, paperwork, health, and daily life with a dog or cat in Germany.
                    </p>
                </section>

                <nav
                    aria-label="Guide topics"
                    className="mb-12 flex flex-wrap justify-center gap-2 md:mb-16"
                >
                    {TOPIC_LINKS.map(([href, label]) => (
                        <a
                            key={href}
                            href={href}
                            className="inline-flex min-h-11 items-center rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm transition-colors hover:border-accent/30 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <section id="start-here" className="scroll-mt-24">
                    <div className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                            Start here
                        </span>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                            The three guides most pet owners need first
                        </h2>
                        <p className="mt-3 max-w-3xl text-base leading-relaxed text-primary/70 md:text-lg">
                            Get urgent help, prepare for a move, or understand how to find a home that welcomes your pet.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                        {FEATURED_POSTS.map((post) => (
                            <GuideCard key={post.url} post={post} featured />
                        ))}
                    </div>
                </section>

                <a
                    href="https://tidd.ly/45yENEP"
                    onClick={() => trackAffiliateClick('Figo', 'Blog_Banner')}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    data-testid="sponsored-partner"
                    className="group relative my-12 block overflow-hidden rounded-3xl border border-primary/5 bg-white shadow-sm transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:my-16"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="relative flex flex-col items-center gap-5 p-6 sm:flex-row sm:text-left md:gap-8 md:p-8">
                        <div className="flex-shrink-0 rounded-2xl border border-primary/5 bg-primary/5 p-4 text-4xl md:text-5xl">
                            🛡️
                        </div>

                        <div className="flex-1 space-y-2 text-center sm:text-left">
                            <div className="inline-flex items-center rounded-full border border-accent/10 bg-accent/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent">
                                <span>Sponsored partner</span>
                            </div>
                            <h2 className="text-xl font-bold text-primary md:text-2xl">
                                Save 30€ on Pet Health Insurance
                            </h2>
                            <p className="max-w-xl text-sm leading-relaxed text-primary/70 md:text-base">
                                Vet bills in Germany can be a shock. We've partnered with <span className="font-bold text-primary">Figo</span> to offer comprehensive coverage that speaks your language.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-secondary shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                                Get Your Quote
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>
                    </div>
                </a>

                <div className="space-y-14 md:space-y-20">
                    {GUIDE_SECTIONS.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <div className="mb-6 max-w-3xl">
                                <h2 className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                                    {section.title}
                                </h2>
                                <p className="mt-2 leading-relaxed text-primary/70">
                                    {section.description}
                                </p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                                {section.posts.map((post) => (
                                    <GuideCard key={post.url} post={post} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
