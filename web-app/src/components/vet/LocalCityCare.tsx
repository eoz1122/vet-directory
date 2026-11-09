import { Link } from 'react-router-dom';
import { LOCAL_CITY_CARE } from '../../content/localCityCare';

export function LocalCityCare({ city }: { city: string }) {
    const content = LOCAL_CITY_CARE[city];
    if (!content) return null;

    return (
        <section id="local-booking-notes" aria-labelledby="local-booking-heading" className="mt-10 scroll-mt-40 rounded-2xl border border-primary/10 bg-white p-5 sm:p-6">
            <h2 id="local-booking-heading" className="text-2xl font-bold text-primary">Local booking notes for {city}</h2>
            <p className="mt-2 text-sm leading-relaxed text-primary/75">{content.locationNote}</p>
            <h3 className="mt-5 font-bold text-primary">Examples with official English-language information</h3>
            <p className="mt-1 text-sm text-primary/70">These are source examples, not a ranking or a complete shortlist. Community evidence on other listings remains valid as labelled.</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {content.sources.map(source => (
                    <li key={source.href} className="rounded-xl border border-primary/10 p-4">
                        <h4 className="font-bold text-primary">{source.name}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-primary/75">{source.note}</p>
                        <a href={source.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-accent-ink underline underline-offset-4">
                            {source.name}: official source
                        </a>
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-sm text-primary/75">For urgent care, call ahead and check the current duty pathway. English support on an emergency shift is not guaranteed by these sources.</p>
            <Link to={content.emergencyGuide} className="inline-flex min-h-11 items-center text-sm font-bold text-accent-ink underline underline-offset-4">Emergency vet help in {city}</Link>
            <p className="mt-3 text-xs text-primary/60">Sources checked 9 November 2026. Reviewed periodically; confirm details directly before travelling.</p>
        </section>
    );
}
