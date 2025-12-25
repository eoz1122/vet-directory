import React from 'react';

interface TocItem {
    id: string;
    label: string;
}

interface TableOfContentsProps {
    items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
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
        <nav className="mb-10 p-6 bg-[#F5EBE0]/50 rounded-2xl border border-[#1B4332]/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1B4332]/60 mb-4 flex items-center gap-2 font-mono">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                Table of Contents
            </h2>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => handleClick(e, item.id)}
                            className="text-[#1B4332]/80 hover:text-[#FB8500] font-medium text-sm transition-colors flex items-start gap-2 group leading-relaxed"
                        >
                            <span className="opacity-40 group-hover:text-[#FB8500] transition-colors mt-0.5">→</span>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
