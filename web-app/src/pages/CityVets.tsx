import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import vets from '../data/vets.json';
import { appendUTM } from '../utils/url';

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
    }
};

export default function CityVets() {
    const { city } = useParams<{ city: string }>();

    const cityKey = city?.toLowerCase() || '';
    const cityData = cityContent[cityKey];

    const cityVets = useMemo(() => {
        return vets.filter(vet =>
            vet.city.toLowerCase() === cityKey
        );
    }, [cityKey]);

    if (!cityData) {
        return (
            <div className="min-h-screen bg-[#F5EBE0] flex items-center justify-center">
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
            "itemListElement": cityVets.map((vet: any, index) => ({
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
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            <Helmet>
                <title>{cityData.title} | Verified English-Speaking Clinics | EnglishSpeakingVets</title>
                <meta name="description" content={cityData.description} />
                <meta name="keywords" content={`English speaking vet ${capitalizedCity}, veterinarian ${capitalizedCity}, pet care ${capitalizedCity}, animal hospital ${capitalizedCity}, English vet Germany`} />
                <link rel="canonical" href={`https://englishspeakinggermany.online/vets/${cityKey}`} />
                <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
                <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
            </Helmet>

            {/* Header */}
            {/* Header */}
            <Header />

            <main className="max-w-6xl mx-auto p-6 md:p-12">
                {/* Hero Section */}
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
                </section>

                {/* Vet Listings */}
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        {cityVets.length} Verified Practices in {capitalizedCity}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {cityVets.map((vet: any) => (
                            <article
                                key={vet.id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 hover:border-accent/20 transition-all"
                            >
                                <h3 className="text-xl font-bold text-primary mb-2">{vet.practice_name}</h3>
                                <p className="text-sm text-primary/70 mb-1">{vet.address}</p>
                                {vet.contact?.phone && (
                                    <a href={`tel:${vet.contact.phone}`} className="text-accent hover:underline text-sm block mb-1">
                                        📞 {vet.contact.phone}
                                    </a>
                                )}
                                {vet.contact?.website && (
                                    <a href={appendUTM(vet.contact.website)} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm block">
                                        🌐 Visit Website
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
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
