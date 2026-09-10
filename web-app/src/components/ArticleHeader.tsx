import type { ReactNode } from 'react';

interface ArticleHeaderProps {
    eyebrow: string;
    title: string;
    review: ReactNode;
}

/** Shared hierarchy for guide titles, category labels and freshness metadata. */
export default function ArticleHeader({ eyebrow, title, review }: ArticleHeaderProps) {
    return (
        <header className="mb-8">
            <p className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                {eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4 leading-tight">
                {title}
            </h1>
            <p className="text-sm leading-relaxed text-primary/60">
                {review}
            </p>
        </header>
    );
}
