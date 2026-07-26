import { useId, useState } from 'react';

import type { Vet } from '../../types/vet';
import { getVerificationPresentation } from '../../utils/verifiedLabel';

interface VerificationBadgeProps {
    vet: Vet;
}

export function VerificationBadge({ vet }: VerificationBadgeProps) {
    const presentation = getVerificationPresentation(vet);
    const [isOpen, setIsOpen] = useState(false);
    const tooltipId = useId();

    return (
        <div className="relative group/tooltip z-20 shrink-0">
            <button
                type="button"
                aria-label={`Verification evidence: ${presentation.title}`}
                aria-expanded={isOpen}
                aria-describedby={tooltipId}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen((open) => !open);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Escape') setIsOpen(false);
                }}
                className={`min-h-11 max-w-[8.5rem] px-2.5 py-1 text-center text-[9px] leading-tight font-black uppercase tracking-tight rounded-xl border flex items-center justify-center gap-1.5 shadow-sm cursor-help ${
                    presentation.verified
                        ? 'bg-accent/20 text-primary border-accent/20'
                        : 'bg-primary/5 text-primary/70 border-primary/10'
                }`}
            >
                <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${presentation.verified ? 'bg-accent' : 'bg-primary/30'}`} />
                <span>{presentation.badge}</span>
            </button>
            <div
                id={tooltipId}
                role="tooltip"
                className={`absolute bottom-full right-0 mb-2 w-64 p-4 bg-primary text-secondary border border-white/10 rounded-xl shadow-xl transition-all duration-200 z-50 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:visible ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <p className="text-[11px] leading-relaxed font-medium text-secondary/90 normal-case tracking-normal">
                    <span className="font-bold text-accent block mb-1 uppercase tracking-widest text-[9px]">
                        {presentation.title}
                    </span>
                    {presentation.description}
                </p>
                <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-primary border-b border-r border-white/10 rotate-45" />
            </div>
        </div>
    );
}
