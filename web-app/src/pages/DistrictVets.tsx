import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import vetsData from '../data/vets.json';
import { appendUTM } from '../utils/url';
import type { Vet } from '../types/vet';

const vets = vetsData as Vet[];

interface DistrictContent {
    title: string;
    description: string;
    content: string;
}

const DISTRICT_CONTENT: Record<string, DistrictContent> = {
    'prenzlauer berg': {
        title: "English-Speaking Vets in Prenzlauer Berg",
        description: "Find verified English-speaking veterinarians in Berlin's Prenzlauer Berg. Trusted practices near Mauerpark, Kollwitzplatz, and Winsviertel.",
        content: `Prenzlauer Berg is a haven for expat families and pet owners, known for its beautiful Altbau apartments and dog-friendly parks like Mauerpark and Volkspark Friedrichshain. Finding a vet who speaks fluent English in this neighborhood is essential for peace of mind.

Our directory lists verified practices in the Helmholtzkiez, Kollwitzkiez, and Winsviertel areas. These vets are accustomed to serving Berlin's international community, ensuring you can discuss your pet's health—from vaccinations to emergencies—without any language barriers.`
    },
    'kreuzberg': {
        title: "English-Speaking Vets in Kreuzberg",
        description: "Discover top-rated English-speaking vets in Kreuzberg. Verified clinics near Görlitzer Park, Bergmannkiez, and Schlesisches Tor.",
        content: `Kreuzberg's vibrant, diverse atmosphere makes it one of Berlin's most popular districts for international residents. Whether you're walking your dog along the Landwehr Canal or hanging out in Görlitzer Park, you need a local vet who understands your needs.

We've curated a list of English-speaking veterinary practices across Kreuzberg (SO36 and SW61). From routine check-ups in the Bergmannkiez to emergency care near Schlesisches Tor, connect with trusted professionals who speak your language.`
    },
    'friedrichshain': {
        title: "English-Speaking Vets in Friedrichshain",
        description: "Locate English-speaking veterinarians in Friedrichshain. Trusted pet care near Boxhagener Platz, Volkspark, and Samariterviertel.",
        content: `Friedrichshain is bustling with young professionals and expats. With distinct neighborhoods like the Simon-Dach-Kiez and the quieter Samariterviertel, it's a fantastic place to have a pet.

Our directory features verified vets in Friedrichshain who specialize in treating dogs, cats, and small animals for the international community. Find a practice near Boxhagener Platz or Volkspark Friedrichshain where clear communication in English is the standard.`
    },
    'mitte': {
        title: "English-Speaking Vets in Berlin Mitte",
        description: "Find premium English-speaking veterinary care in Berlin Mitte. Clinics near Alexanderplatz, Torstraße, and Rosenthaler Platz.",
        content: `As the heart of Berlin, Mitte is home to a dense population of international residents and diplomats. The standard of veterinary care here is high, with many practices offering English services to cater to the global clientele.

Whether you live near Torstraße, Rosenthaler Platz, or Museum Island, finding a vet in Mitte is easy with our directory. We list practices that combine central locations with high-quality, English-speaking medical care for your pets.`
    },
    'neukölln': {
        title: "English-Speaking Vets in Neukölln",
        description: "Trusted English-speaking vets in Neukölln. Verified practices in Reuterkiez, Schillerkiez, and Rixdorf.",
        content: `Neukölln has rapidly become one of Berlin's trendiest and most international districts. From the bustling Reuterkiez to the leafy Schillerkiez near Tempelhofer Feld, pet owners here need reliable medical support.

Our Verified English-Speaking Vets in Neukölln are chosen based on community recommendations. Find a compassionate vet in northern Neukölln or Britz who can explain diagnoses and treatments clearly in English.`
    },
    'charlottenburg': {
        title: "English-Speaking Vets in Charlottenburg",
        description: "Premium English-speaking veterinary services in Charlottenburg. Clinics near Savignyplatz, Ku'damm, and Charlottenburg Palace.",
        content: `Charlottenburg offers a mix of elegance and green spaces, making it ideal for dog owners. If you reside in this historic western district, you have access to some of Berlin's most established veterinary practices.

Our list includes clinics near Savignyplatz, Kurfürstendamm, and Westend that have a long history of serving refined, international clientele. Expect top-tier medical care and fluent English communication.`
    },
    'schöneberg': {
        title: "English-Speaking Vets in Schöneberg",
        description: "Find reliable English-speaking vets in Schöneberg. Practices near Akazienkiez, Winterfeldtplatz, and Bayerischer Platz.",
        content: `Schöneberg is a beloved district with a strong sense of community and plenty of green pockets. For English-speaking residents in the Akazienkiez or around Winterfeldtplatz, finding a local vet is a priority.

We verify practices in Schöneberg that explicitly offer services in English. Connect with friendly, competent veterinarians who make you and your pet feel at home.`
    }
};

export default function DistrictVets() {
    const { city, district } = useParams<{ city: string; district: string }>();

    // Normalize params
    const cityKey = city?.toLowerCase() || '';
    const districtKey = district?.toLowerCase().replace(/-/g, ' ').replace(/%20/g, ' ') || '';
    const districtDisplay = districtKey.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const cityDisplay = cityKey.charAt(0).toUpperCase() + cityKey.slice(1);

    // Get specific content or generate fallback
    const content = DISTRICT_CONTENT[districtKey] || {
        title: `English-Speaking Vets in ${districtDisplay}, ${cityDisplay}`,
        description: `Find verified English-speaking veterinarians in ${districtDisplay}, ${cityDisplay}. Browse reviews, check services, and book appointments with trusted local practices.`,
        content: `Living in ${districtDisplay} involves navigating daily life in a foreign language, but your pet's healthcare shouldn't be lost in translation. 
        
Our directory connects you with verified English-speaking veterinary practices in ${districtDisplay}. We rely on community feedback to ensure that every listed vet can communicate effectively in English, giving you peace of mind when your furry friend needs care.`
    };

    const districtVets = useMemo(() => {
        return vets.filter(vet =>
            vet.city.toLowerCase() === cityKey &&
            vet.district?.toLowerCase() === districtKey
        );
    }, [cityKey, districtKey]);

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
                "name": cityDisplay,
                "item": `https://englishspeakinggermany.online/vets/${cityKey}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": districtDisplay,
                "item": `https://englishspeakinggermany.online/vets/${cityKey}/${districtKey.replace(/\s+/g, '-')}`
            }
        ]
    };

    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{content.title} | The Pack</title>
                <meta name="description" content={content.description} />
                <link rel="canonical" href={`https://englishspeakinggermany.online/vets/${cityKey}/${districtKey.replace(/\s+/g, '-')}`} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
            </Helmet>

            <Header />

            <main className="max-w-6xl mx-auto p-6 md:p-12">
                <section className="mb-12">
                    <div className="flex items-center gap-2 text-sm text-primary/60 mb-4">
                        <Link to="/" className="hover:text-accent">Home</Link>
                        <span>→</span>
                        <Link to={`/vets/${cityKey}`} className="hover:text-accent">{cityDisplay}</Link>
                        <span>→</span>
                        <span>{districtDisplay}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        {content.title}
                    </h1>

                    <div className="prose prose-lg max-w-none text-primary/80 space-y-4 whitespace-pre-wrap">
                        {content.content}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        {districtVets.length} Verified Practices in {districtDisplay}
                    </h2>

                    {districtVets.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {districtVets.map((vet: Vet) => (
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

                                    {/* Address Display */}
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
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-primary/5">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-primary mb-2">No vets found in {districtDisplay} yet</h3>
                            <p className="text-primary/60 mb-6">We are constantly adding new verified practices.</p>
                            <Link to={`/vets/${cityKey}`} className="text-accent font-bold hover:underline">
                                View all vets in {cityDisplay} →
                            </Link>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
