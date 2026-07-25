import { Link } from 'react-router-dom';

import { slugify } from '../../utils/url';

type CityDirectoryLinksProps = {
    cities: string[];
};

export function CityDirectoryLinks({ cities }: CityDirectoryLinksProps) {
    return (
        <section aria-labelledby="all-city-directories-heading" className="px-2">
            <div className="mb-3 flex items-center justify-between gap-3">
                <h2
                    id="all-city-directories-heading"
                    className="text-xs font-black uppercase tracking-widest text-primary/80"
                >
                    All city directories
                </h2>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-primary/70">
                    {cities.length} cities
                </span>
            </div>

            <details className="group rounded-2xl border border-primary/10 bg-white/50">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 text-xs font-bold text-primary transition-colors hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                    Browse the complete city list
                    <span
                        aria-hidden="true"
                        className="text-base transition-transform group-open:rotate-180"
                    >
                        ↓
                    </span>
                </summary>
                <nav
                    aria-label="All city directories"
                    className="grid grid-cols-2 gap-x-3 border-t border-primary/10 px-3 py-2 sm:grid-cols-3"
                >
                    {cities.map((city) => (
                        <Link
                            key={city}
                            to={`/vets/${slugify(city)}`}
                            aria-label={`English-speaking vets in ${city}`}
                            className="inline-flex min-h-11 items-center rounded-lg px-2 text-xs font-semibold text-primary hover:bg-secondary hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                        >
                            {city}
                        </Link>
                    ))}
                </nav>
            </details>
        </section>
    );
}
