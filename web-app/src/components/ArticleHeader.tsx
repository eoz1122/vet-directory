import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
            <p className="mt-2 text-xs leading-relaxed text-primary/50">
                Editorial review by the EnglishSpeakingVets team.{' '}
                <Link to="/quality-promise" className="font-bold text-accent-ink underline underline-offset-2">
                    How we review guides
                </Link>
            </p>
        </header>
    );
}
