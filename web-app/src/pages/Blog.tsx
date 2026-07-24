import { Link } from 'react-router-dom';
import { trackAffiliateClick } from '../utils/analytics';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GUIDE_CATALOG } from '../content/guideCatalog';

const blogPosts = GUIDE_CATALOG;

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
