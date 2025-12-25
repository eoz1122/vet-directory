import { Link } from 'react-router-dom';

interface BlogPost {
    url: string;
    title: string;
    emoji: string;
    desc: string;
}

const allPosts: BlogPost[] = [
    {
        url: "/blog/pet-sitting-germany-2025",
        title: "Pet Sitting in Germany (2025)",
        emoji: "🏡",
        desc: "Finding a safe home for your little friends"
    },
    {
        url: "/blog/moving-to-germany-with-pet-2025",
        title: "Moving to Germany with a Pet",
        emoji: "🐕",
        desc: "The 2025 Survival Checklist"
    },
    {
        url: "/blog/cat-registration-germany-2025",
        title: "Cat Registration in Germany",
        emoji: "🐱",
        desc: "TASSO, microchipping & rules"
    },
    {
        url: "/blog/pet-friendly-apartments-germany-2025",
        title: "Finding a Pet-Friendly Apartment",
        emoji: "🏠",
        desc: "Rights, strategies & best districts"
    },
    {
        url: "/blog/eu-pet-passport-germany-2025",
        title: "EU Pet Passports",
        emoji: "🛂",
        desc: "Why you need one & how to get it"
    },
    {
        url: "/blog/hundesteuer-dog-tax-germany-2025",
        title: "Hundesteuer (Dog Tax)",
        emoji: "💶",
        desc: "Costs, exemptions & registration"
    },
    {
        url: "/blog/public-transport-with-dogs-berlin-2025",
        title: "Public Transport with Dogs (Berlin)",
        emoji: "🚇",
        desc: "BVG survival guide: Tickets & rules"
    },
    {
        url: "/blog/public-transport-with-dogs-hamburg-2025",
        title: "Public Transport with Dogs (Hamburg)",
        emoji: "🚢",
        desc: "HVV guide: Ferries & free travel"
    },
    {
        url: "/blog/public-transport-with-dogs-frankfurt-2025",
        title: "Public Transport with Dogs (Frankfurt)",
        emoji: "🚆",
        desc: "RMV guide: Free dogs & muzzle rules"
    },
    {
        url: "/blog/german-vet-survival-kit-phrases",
        title: "German Vet Survival Kit Phrases",
        emoji: "🩺",
        desc: "Essential medical German medical terms"
    }
];

interface RelatedPostsProps {
    currentPath: string;
}

export default function RelatedPosts({ currentPath }: RelatedPostsProps) {
    const related = allPosts.filter(p => p.url !== currentPath);

    // Show only 4 related posts max to keep grid nice
    const displayPosts = related.slice(0, 4);

    return (
        <section className="bg-[#F5EBE0] p-8 rounded-2xl border border-[#1B4332]/10 mt-12">
            <h3 className="font-bold text-[#1B4332] mb-6 text-xl flex items-center gap-2">
                <span>📚</span> More Guides for Expats
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                {displayPosts.map(post => (
                    <Link
                        key={post.url}
                        to={post.url}
                        className="bg-white p-4 rounded-xl border border-[#1B4332]/5 hover:border-[#FB8500] hover:shadow-sm transition-all flex items-start gap-3 group"
                    >
                        <span className="text-2xl mt-0.5">{post.emoji}</span>
                        <div>
                            <p className="font-bold text-[#1B4332] text-sm group-hover:text-[#FB8500] transition-colors">
                                {post.title}
                            </p>
                            <p className="text-xs text-[#1B4332]/60 mt-0.5">{post.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
