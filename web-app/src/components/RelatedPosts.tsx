import { Link } from 'react-router-dom';
import { GUIDE_CATALOG } from '../content/guideCatalog';
import { pickRelated } from './relatedSelection';

interface RelatedPostsProps {
    currentPath: string;
}

export default function RelatedPosts({ currentPath }: RelatedPostsProps) {
    const displayPosts = pickRelated(GUIDE_CATALOG, currentPath, 4);

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
