import { Link, useLocation } from 'react-router-dom';
const blogPosts = [
    {
        url: "/blog/moving-to-germany-with-pet",
        title: "Moving to Germany Guide",
        emoji: "📦"
    },
    {
        url: "/guides/pet-emergency-germany",
        title: "Pet Emergency Guide",
        emoji: "🚑"
    },
    {
        url: "/guides/emergency-vets-berlin",
        title: "Emergency Vets Berlin",
        emoji: "🏥"
    },
    {
        url: "/blog/pet-medication-germany-guide",
        title: "Pet Medication Guide",
        emoji: "💊"
    },
    {
        url: "/blog/eu-pet-passport-germany",
        title: "EU Pet Passport",
        emoji: "🛂"
    },
    {
        url: "/blog/pet-friendly-apartments-germany",
        title: "Finding Apartments",
        emoji: "🏠"
    },
    {
        url: "/blog/hundesteuer-dog-tax-germany",
        title: "Dog Tax (Hundesteuer)",
        emoji: "💶"
    },
    {
        url: "/blog/cat-registration-germany",
        title: "Cat Registration",
        emoji: "🐱"
    },
    {
        url: "/blog/pet-sitting-germany",
        title: "Pet Sitting & Boarding",
        emoji: "🏡"
    },
    {
        url: "/blog/german-vet-survival-kit-phrases",
        title: "German Vet Phrases",
        emoji: "🇩🇪"
    },
    {
        url: "/blog/pet-insurance-germany",
        title: "Pet Insurance Guide",
        emoji: "💰"
    },
    {
        url: "/blog/german-dog-etiquette-rules",
        title: "Dog Etiquette & Rules",
        emoji: "🐕"
    },
    {
        url: "/blog/public-transport-with-dogs-berlin",
        title: "Transport: Berlin",
        emoji: "🐻"
    },
    {
        url: "/blog/public-transport-with-dogs-hamburg",
        title: "Transport: Hamburg",
        emoji: "⚓"
    },
    {
        url: "/blog/public-transport-with-dogs-munich",
        title: "Transport: Munich",
        emoji: "🥨"
    },
    {
        url: "/blog/public-transport-with-dogs-frankfurt",
        title: "Transport: Frankfurt",
        emoji: "🏙️"
    },
    {
        url: "/blog/public-transport-with-dogs-stuttgart",
        title: "Transport: Stuttgart",
        emoji: "🚗"
    }
];

export default function BlogSidebar() {
    const location = useLocation();

    return (
        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="sticky top-32">
                <div className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-primary/5">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-wider">All Guides</h2>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-full border border-green-100">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Live Sync</span>
                        </div>
                    </div>
                    <nav className="p-2 space-y-1">
                        {blogPosts.map((post) => {
                            const isActive = location.pathname === post.url;
                            return (
                                <Link
                                    key={post.url}
                                    to={post.url}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-accent/10 text-accent'
                                        : 'text-primary/70 hover:bg-secondary hover:text-primary'
                                        }`}
                                >
                                    <span className="text-lg w-6 text-center">{post.emoji}</span>
                                    <span>{post.title}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-6 bg-accent/5 rounded-xl p-6 border border-accent/10 text-center">
                    <div className="text-3xl mb-2">🚑</div>
                    <h4 className="font-bold text-primary mb-2">Need a Vet?</h4>
                    <p className="text-xs text-primary/70 mb-4 leading-relaxed">
                        Find verified, English-speaking veterinarians near you in our free directory.
                    </p>
                    <Link
                        to="/"
                        className="inline-block w-full bg-accent hover:bg-accent-dark text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors shadow-sm hover:shadow-md"
                    >
                        Find a Vet Now
                    </Link>
                </div>
            </div>
        </aside>
    );
}
