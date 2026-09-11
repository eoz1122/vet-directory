interface PracticeFocusProps {
    practiceFocus?: string;
}

export function PracticeFocus({ practiceFocus }: PracticeFocusProps) {
    if (!practiceFocus) {
        return null;
    }

    return (
        <div
            aria-label="Practice focus"
            className="mb-3 xl:mb-2 rounded-xl border border-amber-300/60 bg-amber-50 px-3 py-2 text-primary"
        >
            <p className="text-[9px] font-black uppercase tracking-widest text-amber-800">
                Specialist practice
            </p>
            <p className="mt-1 text-[11px] font-bold leading-snug">
                {practiceFocus}
            </p>
        </div>
    );
}
