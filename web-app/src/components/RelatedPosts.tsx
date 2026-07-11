import { Link } from 'react-router-dom';
import { pickRelated } from './relatedSelection';

interface BlogPost {
    url: string;
    title: string;
    emoji: string;
    desc: string;
}

const allPosts: BlogPost[] = [
    {
        url: "/blog/pet-sitting-germany",
        title: "Pet Sitting in Germany (2025)",
        emoji: "🏡",
        desc: "Finding a safe home for your little friends"
    },
    {
        url: "/blog/moving-to-germany-with-pet",
        title: "Moving to Germany with a Pet",
        emoji: "🐕",
        desc: "The 2025 Survival Checklist"
    },
    {
        url: "/blog/cat-registration-germany",
        title: "Cat Registration in Germany",
        emoji: "🐱",
        desc: "TASSO, microchipping & rules"
    },
    {
        url: "/blog/pet-friendly-apartments-germany",
        title: "Finding a Pet-Friendly Apartment",
        emoji: "🏠",
        desc: "Rights, strategies & best districts"
    },
    {
        url: "/blog/eu-pet-passport-germany",
        title: "EU Pet Passports",
        emoji: "🛂",
        desc: "Why you need one & how to get it"
    },
    {
        url: "/blog/hundesteuer-dog-tax-germany",
        title: "Hundesteuer (Dog Tax)",
        emoji: "💶",
        desc: "Costs, exemptions & registration"
    },
    {
        url: "/blog/public-transport-with-dogs-berlin",
        title: "Public Transport with Dogs (Berlin)",
        emoji: "🚇",
        desc: "BVG survival guide: Tickets & rules"
    },
    {
        url: "/blog/public-transport-with-dogs-hamburg",
        title: "Public Transport with Dogs (Hamburg)",
        emoji: "🚢",
        desc: "HVV guide: Ferries & free travel"
    },
    {
        url: "/blog/public-transport-with-dogs-frankfurt",
        title: "Public Transport with Dogs (Frankfurt)",
        emoji: "🚆",
        desc: "RMV guide: Free dogs & muzzle rules"
    },
    {
        url: "/blog/german-vet-survival-kit-phrases",
        title: "German Vet Survival Kit Phrases",
        emoji: "🩺",
        desc: "Essential medical German medical terms"
    },
    {
        url: "/blog/pet-insurance-germany",
        title: "Pet Insurance Guide",
        emoji: "💰",
        desc: "Understanding liability & health insurance"
    },
    {
        url: "/blog/german-dog-etiquette-rules",
        title: "Dog Etiquette & Rules",
        emoji: "🐕",
        desc: "Leash laws & social unwritten rules"
    },
    {
        url: "/blog/vet-costs-germany",
        title: "Vet Costs in Germany (GOT)",
        emoji: "💶",
        desc: "The fee schedule & multipliers explained"
    },
    {
        url: "/blog/neutering-cost-germany",
        title: "Neutering & Spaying Costs",
        emoji: "✂️",
        desc: "Kastration prices & mandatory rules"
    },
    {
        url: "/blog/pet-vaccination-costs-germany",
        title: "Vaccination Schedule & Costs",
        emoji: "💉",
        desc: "StIKo Vet schedules & prices per jab"
    },
    {
        url: "/blog/adopting-pet-tierheim-germany",
        title: "Adopting from a Tierheim",
        emoji: "🏠",
        desc: "Schutzgebühr, home checks & documents"
    },
    {
        url: "/blog/puppy-first-year-germany",
        title: "Puppy's First Year in Germany",
        emoji: "🐶",
        desc: "Timeline & realistic first-year budget"
    },
    {
        url: "/blog/new-pet-checklist-germany",
        title: "New Pet: First 30 Days",
        emoji: "✅",
        desc: "Registrations, insurance & deadlines"
    }
];

interface RelatedPostsProps {
    currentPath: string;
}

export default function RelatedPosts({ currentPath }: RelatedPostsProps) {
    // Deterministic per-page pick (prerender-stable) instead of always the first 4,
    // so internal links spread across the whole blog.
    const displayPosts = pickRelated(allPosts, currentPath, 4);

    return (
        <section className="bg-secondary p-8 rounded-2xl border border-primary/10 mt-12">
            <h3 className="font-bold text-primary mb-6 text-xl flex items-center gap-2">
                <span>📚</span> More Guides for Expats
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                {displayPosts.map(post => (
                    <Link
                        key={post.url}
                        to={post.url}
                        className="bg-white p-4 rounded-xl border border-primary/5 hover:border-accent hover:shadow-sm transition-all flex items-start gap-3 group"
                    >
                        <span className="text-2xl mt-0.5">{post.emoji}</span>
                        <div>
                            <p className="font-bold text-primary text-sm group-hover:text-accent transition-colors">
                                {post.title}
                            </p>
                            <p className="text-xs text-primary/60 mt-0.5">{post.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
