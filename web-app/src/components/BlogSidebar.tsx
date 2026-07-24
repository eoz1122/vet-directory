import { Link, useLocation } from 'react-router-dom';
import { GUIDE_CATALOG, type GuideCatalogEntry } from '../content/guideCatalog';

const SIDEBAR_GUIDE_URLS = [
    '/blog/moving-to-germany-with-pet',
    '/guides/pet-emergency-germany',
    '/guides/emergency-vets-berlin',
    '/blog/first-vet-visit-germany',
    '/blog/pet-insurance-germany',
    '/blog/dog-liability-insurance-germany',
    '/blog/vet-costs-germany',
    '/blog/hundesteuer-dog-tax-germany',
    '/blog/new-pet-checklist-germany',
    '/blog/eu-pet-passport-germany',
    '/blog/pet-friendly-apartments-germany',
    '/blog/pet-medication-germany-guide',
    '/blog/german-vet-survival-kit-phrases',
    '/blog/breed-restrictions-germany',
];

const guideByUrl = new Map(GUIDE_CATALOG.map((guide) => [guide.url, guide]));
const sidebarGuides = SIDEBAR_GUIDE_URLS
    .map((url) => guideByUrl.get(url))
    .filter((guide): guide is GuideCatalogEntry => Boolean(guide));

export default function BlogSidebar() {
    const location = useLocation();

    return (
        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="sticky top-32">
                <div className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
                    <div className="p-4 border-b border-primary/5">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-wider">All Guides</h2>
                    </div>
                    <nav className="p-2 space-y-1">
                        {sidebarGuides.map((post) => {
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
