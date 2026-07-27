import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from '../components/Header';
import Footer from '../components/Footer';
import vetsData from '../data/vets.json';
import { filterDisplayableVets } from '../utils/activeVets';
import { slugify, titleCaseSlug } from '../utils/url';
import {
    isGovernmentSourceConfirmed,
    isOfficialWebsiteConfirmed,
    isVetVerified,
} from '../utils/verifiedLabel';
import { parseCityContent, type Block } from '../utils/cityMarkdown';
import { generateCitySummary } from '../utils/citySummary';
import type { Vet } from '../types/vet';
import { NearbyCityLinks } from '../components/vet/NearbyCityLinks';
import { CityVetFinder } from '../components/vet/CityVetFinder';
import { CityEvidenceOverview } from '../components/vet/CityEvidenceOverview';
import { buildNearbyCityMap } from '../utils/nearbyCities';

const vets = filterDisplayableVets(vetsData as Vet[]);
const nearbyCitiesByCity = buildNearbyCityMap(vets);

function renderBlocks(blocks: Block[]) {
    const seg = (s: { bold: boolean; text: string }, k: number) =>
        s.bold ? <strong key={k}>{s.text}</strong> : <span key={k}>{s.text}</span>;
    return blocks.map((b, i) =>
        b.type === 'list' ? (
            <ul key={i} className="list-disc pl-5 space-y-2">
                {b.items!.map((item, j) => <li key={j}>{item.map(seg)}</li>)}
            </ul>
        ) : (
            <p key={i}>{b.segments!.map(seg)}</p>
        ),
    );
}

const CITY_CONFIG: Record<string, {
    guides: Array<{ href: string; label: string; icon: string }>;
}> = {
    'Berlin': {
        guides: [{ href: '/blog/public-transport-with-dogs-berlin', label: 'Public transport with dogs in Berlin', icon: '🚆' }],
    },
    'Hamburg': {
        guides: [{ href: '/blog/public-transport-with-dogs-hamburg', label: 'Public transport with dogs in Hamburg', icon: '🚆' }],
    },
    'Frankfurt': {
        guides: [{ href: '/blog/public-transport-with-dogs-frankfurt', label: 'Public transport with dogs in Frankfurt', icon: '🚆' }],
    },
    'Munich': {
        guides: [{ href: '/blog/public-transport-with-dogs-munich', label: 'Public transport with dogs in Munich', icon: '🚆' }],
    },
    'Stuttgart': {
        guides: [
            { href: '/guides/emergency-vets-stuttgart', label: 'Emergency vet help in Stuttgart', icon: '🏥' },
            { href: '/blog/public-transport-with-dogs-stuttgart', label: 'Public transport with dogs in Stuttgart', icon: '🚆' },
        ],
    },
    'Hannover': {
        guides: [{ href: '/guides/emergency-vets-hannover', label: 'Emergency vet help in Hannover', icon: '🏥' }],
    },
    'Bremen': {
        guides: [{ href: '/guides/emergency-vets-bremen', label: 'Emergency vet help in Bremen', icon: '🏥' }],
    },
    'Leipzig': {
        guides: [{ href: '/guides/emergency-vets-leipzig', label: 'Emergency vet help in Leipzig', icon: '🏥' }],
    },
    'Dresden': {
        guides: [{ href: '/guides/emergency-vets-dresden', label: 'Emergency vet help in Dresden', icon: '🏥' }],
    },
    'Nuremberg': {
        guides: [{ href: '/guides/emergency-vets-nuremberg', label: 'Emergency vet help in Nuremberg', icon: '🏥' }],
    },
    'Karlsruhe': {
        guides: [{ href: '/guides/emergency-vets-karlsruhe', label: 'Emergency vet help in Karlsruhe', icon: '🏥' }],
    },
    'Bonn': {
        guides: [{ href: '/guides/emergency-vets-bonn', label: 'Emergency vet help in Bonn', icon: '🏥' }],
    },
    'Münster': {
        guides: [{ href: '/guides/emergency-vets-muenster', label: 'Emergency vet help in Münster', icon: '🏥' }],
    },
    'Mainz': {
        guides: [{ href: '/guides/emergency-vets-mainz', label: 'Emergency vet help in Mainz', icon: '🏥' }],
    },
    'Cologne': {
        guides: [
            { href: '/guides/emergency-vets-cologne', label: 'Emergency vet help in Cologne', icon: '🏥' },
            { href: '/blog/public-transport-with-dogs-cologne', label: 'Public transport with dogs in Cologne', icon: '🚆' },
        ],
    },
    'Essen': {
        guides: [{ href: '/guides/emergency-vets-ruhr', label: 'Emergency vet help in Essen and the Ruhr area', icon: '🏥' }],
    },
    'Dortmund': {
        guides: [{ href: '/guides/emergency-vets-ruhr', label: 'Emergency vet help in Dortmund and the Ruhr area', icon: '🏥' }],
    },
    'Düsseldorf': {
        guides: [{ href: '/guides/emergency-vets-duesseldorf', label: 'Emergency vet help in Düsseldorf', icon: '🏥' }],
    },
};

const EVIDENCE_FIRST_CITIES = new Set([
    'Berlin',
    'Hamburg',
    'Munich',
    'Cologne',
    'Frankfurt',
]);

export default function CityVets() {
    const { city } = useParams<{ city: string }>();

    const cityKey = city?.toLowerCase() || '';

    const cityVets = vets.filter(vet =>
        slugify(vet.city) === cityKey
    );

    // Prefer the real city name from the data ("Bad Homburg"); fall back to a titled slug.
    const capitalizedCity = cityVets[0]?.city || titleCaseSlug(cityKey);
    const nearbyCities = nearbyCitiesByCity.get(capitalizedCity) ?? [];
    const verifiedCount = cityVets.filter(isVetVerified).length;
    const officialWebsiteCount = cityVets.filter(isOfficialWebsiteConfirmed).length;
    const governmentSourceCount = cityVets.filter(isGovernmentSourceConfirmed).length;
    const communityConfirmedCount = verifiedCount -
        officialWebsiteCount -
        governmentSourceCount;
    const communityListedCount = cityVets.length - verifiedCount;
    const evidenceSummary = [
        officialWebsiteCount
            ? `${officialWebsiteCount} ${officialWebsiteCount === 1 ? 'is' : 'are'} confirmed by ${officialWebsiteCount === 1 ? 'its official website' : 'their official websites'}`
            : '',
        governmentSourceCount
            ? `${governmentSourceCount} ${governmentSourceCount === 1 ? 'is' : 'are'} confirmed by a government veterinary source`
            : '',
        communityConfirmedCount
            ? `${communityConfirmedCount} ${communityConfirmedCount === 1 ? 'is' : 'are'} community-confirmed`
            : '',
    ].filter(Boolean).join('; ');
    const emergencyVets = cityVets.filter(
        vet => Boolean(vet.verification?.emergency_services?.trim()),
    );
    const listingTitle = `${cityVets.length} English-Speaking ${cityVets.length === 1 ? 'Vet' : 'Vets'} in ${capitalizedCity}`;
    const listingDescription = verifiedCount === cityVets.length
        ? `Browse ${cityVets.length} verified English-speaking veterinary ${cityVets.length === 1 ? 'practice' : 'practices'} in ${capitalizedCity}. Compare official website, government and community evidence, contact details, and emergency information.`
        : `Browse ${cityVets.length} English-speaking veterinary practices in ${capitalizedCity}; ${officialWebsiteCount} have official website confirmation, ${governmentSourceCount} have government-source confirmation and ${communityConfirmedCount} are community-confirmed. Compare districts and confirm English when booking.`;

    const summary = cityVets.length > 0 ? generateCitySummary(capitalizedCity, cityVets, vets) : null;

    if (!summary) {
        return (
            <div className="min-h-screen bg-secondary flex items-center justify-center">
                <Helmet>
                    <title>City Not Found | The Pack</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">City Not Found</h1>
                    <p className="text-primary/60 mb-6">We currently don't have any verified vets listed for {capitalizedCity}.</p>
                    <Link to="/" className="text-accent hover:underline">← Back to Directory</Link>
                </div>
            </div>
        );
    }

    const cityData = {
        title: listingTitle,
        description: listingDescription,
        content: summary.content,
        nearestHub: summary.nearestHub,
    };

    // JSON-LD Structured Data
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://englishspeakinggermany.online"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": capitalizedCity,
                "item": `https://englishspeakinggermany.online/vets/${cityKey}`
            }
        ]
    };

    const collectionLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": cityData.title,
        "description": cityData.description,
        "url": `https://englishspeakinggermany.online/vets/${cityKey}`,
        "inLanguage": "en",
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": cityVets.length,
            "itemListOrder": "https://schema.org/ItemListUnordered",
            "itemListElement": cityVets.map((vet: Vet, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "VeterinaryCare",
                    "name": vet.practice_name,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": vet.address,
                        "addressLocality": vet.city,
                        "addressCountry": "DE"
                    }
                }
            }))
        }
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Do vets in ${capitalizedCity} speak English?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": verifiedCount === cityVets.length
                        ? `We list ${cityVets.length} English-speaking veterinary ${cityVets.length === 1 ? 'practice' : 'practices'} in ${capitalizedCity}. ${evidenceSummary}. Confirm who will be available in English when booking because staff availability can change.`
                        : `We list ${cityVets.length} veterinary practices in ${capitalizedCity} with English-language signals. ${officialWebsiteCount} have official website confirmation, ${governmentSourceCount} have government-source confirmation, ${communityConfirmedCount} are community-confirmed and ${communityListedCount} are community-listed, so confirm English availability when booking.`
                }
            },
            {
                "@type": "Question",
                "name": `How do I find a vet in ${capitalizedCity} as an expat?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Browse the ${capitalizedCity} directory by district and compare the evidence shown on each listing. Official Website means the practice advertises English service itself; Government Listed means a government veterinary source identifies the practice as English-speaking; Community Confirmed means pet owners have reported successful English communication. Confirm staff availability when booking.`
                }
            },
            ...(emergencyVets.length ? [{
                "@type": "Question",
                "name": `Are there emergency English-speaking vets in ${capitalizedCity}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${emergencyVets.slice(0, 3).map(vet => vet.practice_name).join(', ')} ${emergencyVets.length === 1 ? 'lists' : 'list'} emergency or out-of-hours services in ${capitalizedCity}. Confirm current hours and English availability before travelling.`
                }
            }] : [])
        ]
    };

    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${cityData.title} | EnglishSpeakingVets`}</title>
                <meta name="description" content={cityData.description} />
                <meta name="keywords" content={`English speaking vet ${capitalizedCity}, veterinarian ${capitalizedCity}, pet care ${capitalizedCity}, animal hospital ${capitalizedCity}, English vet Germany`} />
                <link rel="canonical" href={`https://englishspeakinggermany.online/vets/${cityKey}`} />
                <meta property="og:title" content={`${cityData.title} | EnglishSpeakingVets`} />
                <meta property="og:description" content={cityData.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://englishspeakinggermany.online/vets/${cityKey}`} />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${cityData.title} | EnglishSpeakingVets`} />
                <meta name="twitter:description" content={cityData.description} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
                <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
                <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
            </Helmet>

            <Header />

            <main className="max-w-6xl mx-auto p-6 md:p-12">
                <section className="mb-12">
                    <div className="flex items-center gap-2 text-sm text-primary/60 mb-4">
                        <Link to="/" className="hover:text-accent">Home</Link>
                        <span>→</span>
                        <span>{capitalizedCity}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        {cityData.title}
                    </h1>

                    <div className="prose prose-lg max-w-none text-primary/80 space-y-4">
                        {renderBlocks(parseCityContent(cityData.content).slice(0, 1))}
                    </div>

                </section>

                {EVIDENCE_FIRST_CITIES.has(capitalizedCity) && (
                    <CityEvidenceOverview
                        city={capitalizedCity}
                        counts={{
                            officialWebsite: officialWebsiteCount,
                            governmentSource: governmentSourceCount,
                            communityConfirmed: communityConfirmedCount,
                            communityListed: communityListedCount,
                        }}
                    />
                )}

                {/* District index: gives every district page a crawlable inbound link */}
                {(() => {
                    const districtCounts = new Map<string, { name: string; count: number }>();
                    cityVets.forEach((v: Vet) => {
                        if (!v.district || v.district === 'Unknown') return;
                        const dSlug = slugify(v.district);
                        if (dSlug === cityKey) return; // mirrors prerender/sitemap rule
                        const entry = districtCounts.get(dSlug);
                        if (entry) entry.count += 1;
                        else districtCounts.set(dSlug, { name: v.district, count: 1 });
                    });
                    if (districtCounts.size < 2) return null;
                    return (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold text-primary mb-4">Browse {capitalizedCity} by district</h2>
                            <div className="flex flex-wrap gap-2">
                                {[...districtCounts.entries()]
                                    .sort((a, b) => b[1].count - a[1].count || a[1].name.localeCompare(b[1].name))
                                    .map(([dSlug, d]) => (
                                        <Link
                                            key={dSlug}
                                            to={`/vets/${cityKey}/${dSlug}`}
                                            className="px-4 py-2 bg-white border border-primary/10 rounded-2xl text-sm font-bold text-primary hover:border-accent/40 hover:text-accent transition-all"
                                            title={`English-speaking vets in ${d.name}, ${capitalizedCity}`}
                                        >
                                            {d.name} <span className="text-primary/40 font-normal">({d.count})</span>
                                        </Link>
                                    ))}
                            </div>
                        </section>
                    );
                })()}

                <NearbyCityLinks
                    currentCity={capitalizedCity}
                    cities={nearbyCities}
                />

                <section>
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        {cityVets.length} {cityVets.length === 1 ? 'Practice' : 'Practices'} Listed in {capitalizedCity}
                    </h2>

                    <CityVetFinder city={capitalizedCity} vets={cityVets} />
                </section>

                                <section className="mt-16 max-w-3xl">
                    <h2 className="text-2xl font-bold text-primary mb-4">More about vet care in {capitalizedCity}</h2>
                    <div className="prose prose-lg max-w-none text-primary/80 space-y-4">
                        {renderBlocks(parseCityContent(cityData.content).slice(1))}
                    </div>
                    {CITY_CONFIG[capitalizedCity]?.guides.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-3">
                            {CITY_CONFIG[capitalizedCity].guides.map((guide) => (
                                <Link
                                    key={guide.href}
                                    to={guide.href}
                                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent/10 px-6 py-3 font-bold text-accent transition-colors hover:bg-accent/20"
                                >
                                    <span aria-hidden="true">{guide.icon}</span>
                                    <span>{guide.label}</span>
                                    <span aria-hidden="true">→</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mt-16 bg-primary/5 p-8 rounded-2xl border border-primary/10">
                    <h2 className="text-2xl font-bold text-primary mb-4">Know a Great Vet in {capitalizedCity}?</h2>
                    <p className="text-primary/70 mb-6">
                        Help fellow expats by recommending an English-speaking practice you trust.
                    </p>
                    <Link
                        to="/contact?topic=submit_vet"
                        className="inline-block px-6 py-3 bg-primary text-secondary rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Submit a Recommendation
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
