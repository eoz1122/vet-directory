import { Link } from 'react-router-dom';

import type { NearbyCity } from '../../utils/nearbyCities';
import { slugify } from '../../utils/url';

interface NearbyCityLinksProps {
    currentCity: string;
    cities: NearbyCity[];
}

export function NearbyCityLinks({ currentCity, cities }: NearbyCityLinksProps) {
    if (cities.length === 0) return null;

    return (
        <section
            aria-labelledby="nearby-city-directories-heading"
            className="mb-12 rounded-3xl border border-primary/10 bg-white/50 p-5 md:p-7"
        >
            <h2
                id="nearby-city-directories-heading"
                className="text-xl font-bold text-primary"
            >
                Nearby English-speaking vets
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-primary/70">
                Explore verified directories near {currentCity}. Distances are approximate and based on listed practice locations.
            </p>
            <nav
                aria-label="Nearby English-speaking vets"
                className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4"
            >
                {cities.map((city) => (
                    <Link
                        key={city.city}
                        to={`/vets/${slugify(city.city)}`}
                        aria-label={`English-speaking vets in ${city.city}, about ${city.distanceKm} km away`}
                        className="flex min-h-20 flex-col justify-center rounded-2xl border border-primary/10 bg-white px-4 py-3 text-primary transition-colors hover:border-accent/40 hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        <span className="text-sm font-bold">{city.city}</span>
                        <span className="mt-1 text-xs text-primary/60">
                            {city.distanceKm} km · {city.practiceCount} confirmed
                        </span>
                    </Link>
                ))}
            </nav>
            <p className="mt-4 text-xs leading-relaxed text-primary/60">
                For urgent care, call the practice before travelling.
            </p>
        </section>
    );
}
