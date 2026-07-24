import { useState, useRef, useEffect, useId, type KeyboardEvent, type MouseEvent } from 'react';
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
    const menuRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();

    const place = () => {
        const r = btnRef.current?.getBoundingClientRect();
        if (r) setPos({ top: r.bottom + 8, left: r.left });
    };

    const toggle = (e: MouseEvent) => {
        e.stopPropagation();
        if (!open) place();
        setOpen((o) => !o);
    };

    const closeAndRestoreFocus = () => {
        btnRef.current?.focus();
        setOpen(false);
    };

    const openFromKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        if (!open) place();
        setOpen(true);
    };

    const handleListboxKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const options = Array.from(
            menuRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
        );
        if (options.length === 0) return;

        const currentIndex = Math.max(0, options.indexOf(document.activeElement as HTMLElement));
        if (event.key === 'Escape') {
            event.preventDefault();
            closeAndRestoreFocus();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            options[(currentIndex + 1) % options.length].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            options[(currentIndex - 1 + options.length) % options.length].focus();
        } else if (event.key === 'Home') {
            event.preventDefault();
            options[0].focus();
        } else if (event.key === 'End') {
            event.preventDefault();
            options[options.length - 1].focus();
        } else if (event.key === 'Tab') {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (!open) return;
        const close = () => setOpen(false);
        const onScroll = (e: Event) => {
            // Don't close when scrolling INSIDE the menu; only on page/panel scroll.
            const t = e.target as Node | null;
            if (menuRef.current && t && menuRef.current.contains(t)) return;
            setOpen(false);
        };
        window.addEventListener('click', close);
        window.addEventListener('resize', close);
        window.addEventListener('scroll', onScroll, true);
        return () => {
            window.removeEventListener('click', close);
            window.removeEventListener('resize', close);
            window.removeEventListener('scroll', onScroll, true);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const frame = window.requestAnimationFrame(() => {
            menuRef.current?.querySelector<HTMLElement>('[role="option"]')?.focus();
        });
        return () => window.cancelAnimationFrame(frame);
    }, [open]);

    return (
        <div className="relative inline-block">
            <button
                ref={btnRef}
                type="button"
                onClick={toggle}
                onKeyDown={openFromKeyboard}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listboxId}
                className="appearance-none min-h-11 px-4 py-2 pr-8 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm cursor-pointer bg-white border-primary/5 text-primary/80 hover:border-primary/20 hover:text-primary hover:bg-white/80 active:scale-90 flex items-center"
            >
                More Cities...
                <svg className={`w-3 h-3 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {open && pos && createPortal(
                <div
                    ref={menuRef}
                    id={listboxId}
                    role="listbox"
                    aria-label="More cities"
                    style={{ position: 'fixed', top: pos.top, left: pos.left, width: 192 }}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={handleListboxKeyDown}
                    className="bg-white rounded-xl shadow-xl border border-primary/10 overflow-y-auto overscroll-contain max-h-64 z-[1000] custom-scrollbar"
                >
                    {cities.map((city) => (
                        <button
                            key={city}
                            type="button"
                            role="option"
                            aria-selected={selectedCity === city}
                            onClick={() => { onSelect(city); closeAndRestoreFocus(); }}
                            className={`w-full min-h-11 block px-4 py-2 text-xs font-bold text-left transition-colors ${selectedCity === city
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
