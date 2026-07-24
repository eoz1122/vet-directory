import type { Vet } from '../../types/vet';
import { getVerificationPresentation } from '../../utils/verifiedLabel';

interface VerificationBadgeProps {
    vet: Vet;
}

export function VerificationBadge({ vet }: VerificationBadgeProps) {
    const presentation = getVerificationPresentation(vet);

    return (
        <div className="relative group/tooltip z-20 shrink-0">
            <div
                aria-label={`Verification evidence: ${presentation.title}`}
                className={`max-w-[8.5rem] px-2.5 py-1 text-center text-[9px] leading-tight font-black uppercase tracking-tight rounded-xl border flex items-center justify-center gap-1.5 shadow-sm cursor-help ${
                    presentation.verified
                        ? 'bg-accent/20 text-primary border-accent/20'
                        : 'bg-primary/5 text-primary/70 border-primary/10'
                }`}
            >
                <div className={`w-1.5 h-1.5 shrink-0 rounded-full ${presentation.verified ? 'bg-accent' : 'bg-primary/30'}`} />
                <span>{presentation.badge}</span>
            </div>
            <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-primary text-secondary border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 transform translate-y-1 group-hover/tooltip:translate-y-0 pointer-events-none">
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
