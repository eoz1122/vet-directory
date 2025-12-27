import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from '../components/Header';
import Footer from '../components/Footer';
import vetsData from '../data/vets.json';
import { appendUTM } from '../utils/url';
import type { Vet } from '../types/vet';

const vets = vetsData as Vet[];

const CITY_CONFIG: Record<string, { guideLink?: string }> = {
    'Berlin': { guideLink: '/blog/public-transport-with-dogs-berlin-2025' },
    'Hamburg': { guideLink: '/blog/public-transport-with-dogs-hamburg-2025' },
    'Frankfurt': { guideLink: '/blog/public-transport-with-dogs-frankfurt-2025' },
    'Munich': { guideLink: '/blog/public-transport-with-dogs-munich-2025' },
    'Stuttgart': { guideLink: '/blog/public-transport-with-dogs-stuttgart-2025' }
};

const cityContent: Record<string, { title: string; description: string; content: string }> = {
    berlin: {
        title: "English-Speaking Vets in Berlin",
        description: "Finding an English-speaking vet in Berlin doesn't have to be stressful. Our verified directory connects expats with veterinary practices across Mitte, Kreuzberg, Prenzlauer Berg, and beyond.",
        content: `Living in Berlin with a dog is a dream—sprawling parks like Tempelhofer Feld, dog-friendly cafés on every corner, and a culture that genuinely loves pets. But when your furry friend needs medical attention, the language barrier can turn a routine checkup into a stressful ordeal.

That's where we come in. Our directory features verified English-speaking veterinary practices across all Berlin districts, from the bustling heart of Mitte to the leafy streets of Zehlendorf. Each listing has been carefully vetted to ensure staff can communicate clearly in English, whether you're dealing with an emergency or just need advice on flea prevention.

**Why Berlin Pet Owners Choose Us:**
- **District-Specific Search**: Find vets near you in Kreuzberg, Friedrichshain, Charlottenburg, or any of Berlin's 12 boroughs
- **Emergency-Ready**: Many practices offer 24/7 emergency services or Notdienst referrals
- **Expat-Friendly**: These aren't just vets who "speak some English"—they're practices that actively serve the international community

Whether you've just moved to Berlin or you're a long-time resident looking for a new vet after a bad experience, our directory is here to help you find the right care for your pet.`
    },
    hamburg: {
        title: "English-Speaking Vets in Hamburg",
        description: "Discover trusted English-speaking veterinary practices in Hamburg. From Altona to Winterhude, find quality pet care that speaks your language.",
        content: `Hamburg's international community is thriving, and so is its network of English-speaking veterinary care. Whether you're in the trendy Sternschanze neighborhood or the family-friendly suburbs of Blankenese, finding a vet who can explain your pet's health in clear English is essential.

Our Hamburg directory features practices that understand the unique needs of expat pet owners. These aren't just clinics with a bilingual receptionist—they're full-service veterinary hospitals where doctors and technicians communicate fluently in English.

**What Makes Hamburg Vets Special:**
- **Port City Expertise**: Many Hamburg vets have experience with international pet relocations and can help with EU health certificates
- **Comprehensive Care**: From routine vaccinations to specialized surgery, these practices offer the full spectrum of veterinary medicine
- **Accessible Locations**: Practices located near major U-Bahn and S-Bahn stations for easy access

Hamburg's pet culture is warm and welcoming, and with the right vet by your side, you and your furry companion can enjoy everything this beautiful Hanseatic city has to offer.`
    },
    frankfurt: {
        title: "English-Speaking Vets in Frankfurt",
        description: "Frankfurt's international hub deserves international-quality pet care. Find English-speaking vets in Sachsenhausen, Nordend, and across the Rhine-Main area.",
        content: `As Germany's financial capital and one of Europe's most international cities, Frankfurt has a robust network of English-speaking veterinary services. Whether you're in the banking district, the vibrant Nordend, or the cozy Sachsenhausen neighborhood, quality pet care in English is within reach.

Frankfurt's expat community is one of the largest in Germany, and local vets have adapted to serve this diverse population. Many practices here have staff who've trained internationally or regularly attend English-language veterinary conferences, ensuring they're up-to-date with global best practices.

**Why Frankfurt Pet Owners Trust Our Directory:**
- **Airport Proximity**: Several practices specialize in pre-flight health checks and international pet travel documentation
- **Multilingual Staff**: Beyond English and German, many Frankfurt vets also speak French, Spanish, or Italian
- **Modern Facilities**: Frankfurt's vets often feature state-of-the-art diagnostic equipment and surgical suites

From the Palmengarten to the Main riverbanks, Frankfurt is a wonderful city to explore with your pet. Let us help you find the veterinary partner who'll keep them healthy and happy.`
    },
    stuttgart: {
        title: "English-Speaking Vets in Stuttgart",
        description: "Find trusted English-speaking veterinarians in Stuttgart and the surrounding Baden-Württemberg region. Quality care for the international community.",
        content: `Stuttgart's significant international population, including many expats and US military families, has led to a high standard of English-speaking veterinary care. Finding a vet who understands your concerns in your native language is key to your pet's well-being.

Our Stuttgart directory connects you with practices that are experienced in serving international clients, offering everything from routine checkups to specialized treatments.

**Why Stuttgart Pet Owners Use Our Directory:**
- **Expat Communities**: Vets familiar with the needs of the international and military communities.
- **Baden-Württemberg Coverage**: Find practices in the city center and surrounding districts.
- **High Standards**: Access to modern clinics with English-speaking proficiency.`
    },
    munich: {
        title: "English-Speaking Vets in Munich",
        description: "Discover verified English-speaking veterinary clinics in Munich. Trusted pet care in the heart of Bavaria for the international community.",
        content: `Munich is a world-class city, and its pet care services reflect that. With a large international community, Munich offers numerous veterinary practices where English is spoken fluently by both doctors and staff.

Whether you're living near the Englischer Garten or in the outskirts of the city, our directory helps you find the right medical partner for your pet.

**Benefits of Munich's English-Speaking Vets:**
- **Central & Suburban**: Options across Munich's diverse neighborhoods.
- **Advanced Medicine**: Access to some of Germany's leading veterinary specialists.
- **Community Trusted**: Practices with a proven track record of serving expat families.`
    },
    leipzig: {
        title: "English-Speaking Vets in Leipzig",
        description: "Find trusted English-speaking veterinary practices in Leipzig. Verified care for your pets in Plagwitz, Südvorstadt, and across the city.",
        content: `Leipzig is widely known as "Hypezig" for a reason—its vibrant culture, green spaces like the Clara-Zetkin-Park, and growing international community make it a fantastic place to live. for pet owners, however, finding a veterinarian who speaks clear English can still be a challenge.

Our Leipzig directory connects you with verified practices where language isn't a barrier. Whether you're living in the trendy Plagwitz area, the family-friendly Südvorstadt, or the historic Gohlis, we help you find the right care for your four-legged family members.

**Why Leipzig Pet Owners Use Our Directory:**
- **Local Verification**: We've analyzed thousands of reviews to identify practices with a history of supporting English speakers.
- **District Coverage**: options across major neighborhoods to save you travel time.
- **Peace of Mind**: Ensure you fully understand your pet's diagnosis and treatment plan.`
    }
};

export default function CityVets() {
    const { city } = useParams<{ city: string }>();

    const cityKey = city?.toLowerCase() || '';
    const cityData = cityContent[cityKey];

    const cityVets = vets.filter(vet =>
        vet.city.toLowerCase() === cityKey
    );

    if (!cityData) {
        return (
            <div className="min-h-screen bg-secondary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">City Not Found</h1>
                    <Link to="/" className="text-accent hover:underline">← Back to Directory</Link>
                </div>
            </div>
        );
    }

    const capitalizedCity = city!.charAt(0).toUpperCase() + city!.slice(1);

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
        "mainEntity": {
            "@type": "ItemList",
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

    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{cityData.title} | Verified English-Speaking Clinics | EnglishSpeakingVets</title>
                <meta name="description" content={cityData.description} />
                <meta name="keywords" content={`English speaking vet ${capitalizedCity}, veterinarian ${capitalizedCity}, pet care ${capitalizedCity}, animal hospital ${capitalizedCity}, English vet Germany`} />
                <link rel="canonical" href={`https://englishspeakinggermany.online/vets/${cityKey}`} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
                <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
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
                        {cityData.content.split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className={paragraph.startsWith('**') ? 'font-semibold' : ''}>
                                {paragraph.replace(/\*\*/g, '')}
                            </p>
                        ))}
                    </div>

                    {CITY_CONFIG[capitalizedCity]?.guideLink && (
                        <div className="mt-8">
                            <Link to={CITY_CONFIG[capitalizedCity].guideLink!} className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent font-bold rounded-xl transition-colors">
                                <span>🚆</span>
                                <span>Public Transport with Dogs in {capitalizedCity}</span>
                                <span>→</span>
                            </Link>
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        {cityVets.length} Verified Practices in {capitalizedCity}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {cityVets.map((vet: Vet) => (
                            <article
                                key={vet.id}
                                className="group/card relative bg-white p-6 rounded-[2rem] border border-primary/5 transition-all duration-500 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-accent/20"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
                                                {vet.city}
                                            </span>
                                            {vet.district && vet.district !== "Unknown" && (
                                                <span className="px-2 py-0.5 bg-accent/5 text-accent text-[9px] font-black uppercase tracking-widest rounded-full">
                                                    {vet.district}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-black text-primary group-hover/card:text-accent transition-colors leading-tight">
                                            {vet.practice_name}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="relative group/tooltip z-20">
                                            <div className="px-3 py-1 bg-accent/20 text-primary text-[10px] font-black uppercase tracking-tighter rounded-xl border border-accent/20 flex items-center gap-1.5 shadow-sm cursor-help">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                                                Verified
                                            </div>
                                            <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-primary text-secondary border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 transform translate-y-1 group-hover/tooltip:translate-y-0 pointer-events-none">
                                                <p className="text-[11px] leading-relaxed font-medium text-secondary/90 normal-case tracking-normal">
                                                    <span className="font-bold text-accent block mb-1 uppercase tracking-widest text-[9px]">Community Verified</span>
                                                    We analyze thousands of patient reviews to identify "English signals"—confirming that other international pet owners successfully communicated in English.
                                                </p>
                                                <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-primary border-b border-r border-white/10 rotate-45"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Address Display - Mobile vs Fixed */}
                                {vet.address && (vet.address.includes("Mobile Service") || vet.address.includes("Home Visits") || vet.address === 'Unknown') ? (
                                    <div className="text-[12px] text-primary/60 mb-5 font-bold leading-relaxed bg-accent/10 p-4 rounded-xl border border-accent/20 flex items-center gap-2">
                                        <span>🚐</span> Mobile Service - {vet.city}
                                    </div>
                                ) : (
                                    <a
                                        href={`https://www.google.com/search?q=${encodeURIComponent(vet.practice_name + " " + (vet.address || ""))}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-[12px] text-primary/60 mb-5 font-medium leading-relaxed bg-secondary/30 p-4 rounded-xl border border-primary/5 group-hover/card:bg-secondary/40 transition-colors hover:text-accent hover:border-accent/30"
                                    >
                                        {vet.address}
                                    </a>
                                )}

                                <div className="space-y-2 mb-6">
                                    {vet.verification?.english_signals && vet.verification.english_signals.slice(0, 1).map((signal, idx) => (
                                        <div key={idx} className="flex gap-3 items-start group/signal">
                                            <div className="mt-1 flex-shrink-0 w-4 h-4 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                                                <svg className="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                            <p className="text-[11px] text-primary/60 italic leading-snug group-hover/signal:text-primary/80 transition-colors line-clamp-2">
                                                "{signal}"
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {(vet.contact && vet.contact.website) ? (
                                        <a
                                            href={appendUTM(vet.contact.website)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-primary text-secondary rounded-xl hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <span>🌐</span> Visit Website
                                        </a>
                                    ) : (
                                        <a
                                            href={vet.contact?.phone ? `tel:${vet.contact.phone}` : '#'}
                                            className={`flex-1 py-3 text-center text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${vet.contact?.phone ? 'bg-primary text-secondary hover:bg-primary/95 shadow-primary/10' : 'bg-gray-100 text-gray-400 cursor-not-allowed hidden'}`}
                                        >
                                            <span>📞</span> Call Practice
                                        </a>
                                    )}

                                    {/* Hide Map button for Mobile Services */}
                                    {!(vet.address && (vet.address.includes("Mobile Service") || vet.address.includes("Home Visits") || vet.address === 'Unknown')) && (
                                        <a
                                            href={`https://www.google.com/search?q=${encodeURIComponent(vet.practice_name + " " + (vet.address || ""))}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-white border border-primary/10 text-primary rounded-xl hover:bg-gray-50 transition-all hover:border-primary/30 flex items-center justify-center"
                                            title="View on Maps"
                                        >
                                            📍
                                        </a>
                                    )}
                                </div>

                                <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-50/50">
                                    <span className="text-[10px] text-gray-400">
                                        Last Verified: {vet.verification?.last_scanned ? new Date(vet.verification.last_scanned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2025'}
                                    </span>
                                    <Link
                                        to={`/contact?topic=report_issue&vetId=${vet.id}&vetName=${encodeURIComponent(vet.practice_name)}&reason=Data%20Incorrect`}
                                        className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1 group/report"
                                    >
                                        <span className="text-[9px] opacity-0 group-hover/report:opacity-100 transition-opacity">Report Issue</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
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
