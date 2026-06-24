import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    cities: string[];
    selectedCity: string;
    onSelect: (city: string) => void;
}

/**
 * "More Cities" dropdown. The filter panel and the chips row both clip overflow
 * (overflow-y-auto / overflow-x-hidden), so a normally-positioned menu gets cut
 * off. This renders the menu in a portal with fixed positioning to escape every
 * clipping ancestor, and opens on click (works on touch, unlike the old hover menu).
 */
export function MoreCitiesDropdown({ cities, selectedCity, onSelect }: Props) {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const place = () => {
        const r = btnRef.current?.getBoundingClientRect();
        if (r) setPos({ top: r.bottom + 8, left: r.left });
    };

    const toggle = (e: MouseEvent) => {
        e.stopPropagation();
        if (!open) place();
        setOpen((o) => !o);
    };

    useEffect(() => {
        if (!open) return;
        const close = () => setOpen(false);
        window.addEventListener('click', close);
        window.addEventListener('resize', close);
        window.addEventListener('scroll', close, true); // any scroll closes it
        return () => {
            window.removeEventListener('click', close);
            window.removeEventListener('resize', close);
            window.removeEventListener('scroll', close, true);
        };
    }, [open]);

    return (
        <div className="relative inline-block">
            <button
                ref={btnRef}
                type="button"
                onClick={toggle}
                className="appearance-none px-4 py-2 pr-8 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm cursor-pointer focus:outline-none bg-white border-primary/5 text-primary/60 hover:border-primary/20 hover:text-primary hover:bg-white/80 active:scale-90 flex items-center"
            >
                More Cities...
                <svg className={`w-3 h-3 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {open && pos && createPortal(
                <div
                    style={{ position: 'fixed', top: pos.top, left: pos.left, width: 192 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-xl shadow-xl border border-primary/10 overflow-y-auto max-h-64 z-[1000] custom-scrollbar"
                >
                    {cities.map((city) => (
                        <button
                            key={city}
                            type="button"
                            onClick={() => { onSelect(city); setOpen(false); }}
                            className={`w-full block px-4 py-2 text-xs font-bold text-left transition-colors ${selectedCity === city
                                ? 'bg-primary/10 text-primary'
                                : 'text-primary/70 hover:bg-primary/5 hover:text-primary'
                                }`}
                        >
                            {city}
                        </button>
                    ))}
                </div>,
                document.body,
            )}
        </div>
    );
}
