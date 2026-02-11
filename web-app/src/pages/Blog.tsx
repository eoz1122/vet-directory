import { Link } from 'react-router-dom';
import { trackAffiliateClick } from '../utils/analytics';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const blogPosts = [
    {
        url: "/guides/pet-emergency-germany",
        title: "🚨 Pet Emergency Guide",
        emoji: "🚑",
        category: "EMERGENCY",
        desc: "Complete survival guide for pet emergencies in Germany. Know where to go, what to expect, costs, and emergency numbers BEFORE you need them."
    },
    {
        url: "/guides/emergency-vets-berlin",
        title: "24/7 Emergency Vets: Berlin",
        emoji: "🏥",
        category: "EMERGENCY",
        desc: "5 verified 24/7 emergency clinics in Berlin with English-speaking staff. Phone numbers, addresses, and what to expect."
    },
    {
        url: "/blog/pet-sitting-germany-2025",
        title: "Pet Sitting in Germany (2025)",
        emoji: "🏡",
        category: "Living",
        desc: "Finding a safe home for your little friends. Comparing platforms like Pawshake vs. Pensions vs. Community Swaps."
    },
    {
        url: "/blog/moving-to-germany-with-pet-2025",
        title: "Moving to Germany with a Pet",
        emoji: "🐕",
        category: "Moving",
        desc: "The complete 2025 survival checklist for bringing your dog or cat to Germany. Customs, vaccinations, and paperwork explained."
    },
    {
        url: "/blog/pet-friendly-apartments-germany-2025",
        title: "Finding a Pet-Friendly Apartment",
        emoji: "🏠",
        category: "Living",
        desc: "How to convince a German landlord to say 'Ja'. Understanding your rights, legal phrases, and where to look."
    },
    {
        url: "/blog/eu-pet-passport-germany-2025",
        title: "The EU Pet Passport Guide",
        emoji: "🛂",
        category: "Bureaucracy",
        desc: "Why you need one, how to get it, and how much it costs. The golden ticket for travel within Europe."
    },
    {
        url: "/blog/hundesteuer-dog-tax-germany-2025",
        title: "Hundesteuer (Dog Tax) 101",
        emoji: "💶",
        category: "Bureaucracy",
        desc: "Everything you need to know about German Dog Tax. Costs by city, how to register, and who is exempt."
    },
    {
        url: "/blog/cat-registration-germany-2025",
        title: "Cat Registration (Tasso & Finds)",
        emoji: "🐱",
        category: "Safety",
        desc: "Germany has no dog tax for cats, but registration is vital. Learn about Tasso e.V., microchipping, and Findefix."
    },
    {
        url: "/blog/public-transport-with-dogs-munich-2025",
        title: "Public Transport with Dogs: Munich",
        emoji: "🥨",
        category: "Transport",
        desc: "MVV Guide: Navigating the 'muzzle gray zone' and utilizing the free travel rules in Germany's financial hub."
    },
    {
        url: "/blog/public-transport-with-dogs-stuttgart-2025",
        title: "Public Transport with Dogs: Stuttgart",
        emoji: "🏎️",
        category: "Transport",
        desc: "VVS 2025 Guide: The 'Children's Ticket' rule, local Deutschlandticket bonuses, and the Zacke."
    },
    {
        url: "/blog/public-transport-with-dogs-berlin-2025",
        title: "Public Transport with Dogs: Berlin",
        emoji: "🚇",
        category: "Transport",
        desc: "The BVG survival guide. Ticket rules, muzzles, and safety tips for taking your dog on the U-Bahn and S-Bahn in the capital."
    },
    {
        url: "/blog/public-transport-with-dogs-hamburg-2025",
        title: "Public Transport with Dogs: Hamburg",
        emoji: "🚢",
        category: "Transport",
        desc: "HVV Guide: Why dogs travel free, taking the harbor ferries, and the relaxed leash policies of the North."
    },
    {
        url: "/blog/public-transport-with-dogs-frankfurt-2025",
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
        url: "/blog/pet-insurance-germany-2025",
        title: "Pet Insurance in Germany (2025)",
        emoji: "💰",
        category: "Bureaucracy",
        desc: "Do you really need it? Understanding liability vs. health insurance, the GOT fees, and why emergencies are so expensive."
    },
    {
        url: "/blog/german-dog-etiquette-rules",
        title: "German Dog Etiquette: Unwritten Rules",
        emoji: "🐕",
        category: "Living",
        desc: "Blending in like a local. From leash laws (Leinenpflicht) to restaurant etiquette and the social rules of the park."
    },
    {
        url: "/blog/pet-medication-germany-guide",
        title: "💊 Pet Medication Guide",
        emoji: "💊",
        category: "HEALTH",
        desc: "Where to buy, how prescriptions work, and why you can't have antibiotics shipped. Comparing vet prices vs. online pharmacies like Medpets."
    },
    {
        url: "/blog/best-pet-food-germany-dinner-for-dogs",
        title: "🥘 Best Pet Food in Germany",
        emoji: "🥘",
        category: "HEALTH",
        desc: "Beyond industrial kibble. A guide to high-quality fresh pet food in Germany, featuring a review of Dinner for Dogs direct-to-door delivery."
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Expat Dog & Cat Guides Germany | EnglishSpeakingVets</title>
                <meta name="description" content="Essential guides for pet owners in Germany. Dog tax, public transport rules, finding apartments, and EU pet passports explained for expats." />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog" />
            </Helmet>

            <Header />

            <main className="max-w-6xl mx-auto p-6 md:p-12 mb-12">
                <section className="text-center mb-16 space-y-4">
                    <span className="text-accent font-bold tracking-wider text-sm uppercase">The Expat Resource Center</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
                        Life in Germany with Pets
                    </h1>
                    <p className="text-xl text-primary/70 max-w-2xl mx-auto font-serif italic">
                        "Navigating German bureaucracy is hard. Doing it with four paws is harder. We make it simple."
                    </p>
                </section>

                {/* Affiliate Banner - Figo */}
                <a
                    href="https://tidd.ly/45yENEP"
                    onClick={() => trackAffiliateClick('Figo', 'Blog_Banner')}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block mb-16 relative overflow-hidden rounded-3xl bg-white border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="flex-shrink-0 bg-primary/5 p-6 rounded-2xl border border-primary/5 text-6xl">
                            🛡️
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-accent/10 text-accent rounded-full border border-accent/10">
                                <span>Part of the Pack</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-primary">
                                Save 30€ on Pet Health Insurance
                            </h2>
                            <p className="text-primary/70 text-lg leading-relaxed max-w-xl">
                                Vet bills in Germany can be a shock. We've partnered with <span className="font-bold text-primary">Figo</span> to offer comprehensive coverage that speaks your language.
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-secondary font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group-hover:scale-105 transform duration-300">
                                Get Your Quote
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>
                    </div>
                </a>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.url}
                            to={post.url}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/5 group flex flex-col"
                        >
                            <div className="p-8 flex items-start justify-between bg-primary/5 border-b border-primary/5">
                                <span className="text-5xl">{post.emoji}</span>
                                <span className="px-3 py-1 bg-white text-xs font-bold rounded-full uppercase tracking-wider text-primary/60 border border-primary/10">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-primary/70 leading-relaxed">
                                    {post.desc}
                                </p>
                                <div className="mt-auto pt-6 flex items-center text-accent font-bold text-sm uppercase tracking-wide">
                                    Read Guide <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
