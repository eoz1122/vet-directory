import type { ReactNode } from 'react';

import BlogSidebar from './BlogSidebar';
import Footer from './Footer';
import Header from './Header';

interface ArticleLayoutProps {
    children: ReactNode;
}

/** Shared frame for evergreen guides and blog posts. Page-specific content stays inside the article column. */
export default function ArticleLayout({ children }: ArticleLayoutProps) {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary flex flex-col">
            <Header />
            <main className="w-full max-w-7xl mx-auto flex-1 p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />
                    <article className="lg:flex-1 min-w-0 max-w-4xl">
                        {children}
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
}
