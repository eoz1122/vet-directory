import React from 'react';

interface TocItem {
    id: string;
    label: string;
}

interface TableOfContentsProps {
    items: TocItem[];
    className?: string;
}

export default function TableOfContents({ items, className = '' }: TableOfContentsProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (items.length === 0) return null;

    return (
        <div className={`bg-white p-6 rounded-2xl border border-primary/5 shadow-sm mb-12 ${className}`}>
            <span className="block text-xs font-bold text-primary/40 uppercase tracking-widest mb-4">Table of Contents</span>
            <nav className="space-y-3">
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleClick(e, item.id)}
                        className="block text-primary/80 hover:text-accent transition-colors text-sm font-medium leading-relaxed group"
                    >
                        <span className="opacity-0 -ml-4 mr-2 text-accent group-hover:opacity-100 transition-opacity">→</span>
                        {item.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}
