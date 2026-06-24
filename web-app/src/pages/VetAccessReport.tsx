import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import vetsData from '../data/vets.json';
import { slugify } from '../utils/url';
import { generateArticleSchema } from '../utils/schema';
import type { Vet } from '../types/vet';

const vets = vetsData as Vet[];

const TITLE = "The State of English-Speaking Veterinary Access in Germany (2026)";
const DESCRIPTION = "A data study of English-speaking veterinary access across Germany: how many verified practices exist, where coverage is strongest, which cities are underserved, and where emergency care falls short.";
const URL = "https://englishspeakinggermany.online/english-speaking-vet-access-germany";

// Germany's largest cities by population (rounded, public figures) for the coverage gap analysis.
const BIG_CITIES: { city: string; pop: string }[] = [
    { city: 'Berlin', pop: '3.7M' }, { city: 'Hamburg', pop: '1.9M' }, { city: 'Munich', pop: '1.5M' },
    { city: 'Cologne', pop: '1.1M' }, { city: 'Frankfurt', pop: '770k' }, { city: 'Stuttgart', pop: '630k' },
    { city: 'Düsseldorf', pop: '620k' }, { city: 'Leipzig', pop: '600k' }, { city: 'Dortmund', pop: '590k' },
    { city: 'Essen', pop: '580k' }, { city: 'Bremen', pop: '570k' }, { city: 'Dresden', pop: '560k' },
];

function computeStats() {
    const counts = new Map<string, number>();
    for (const v of vets) counts.set(v.city, (counts.get(v.city) ?? 0) + 1);
    const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const districts = new Set(
        vets.filter((v) => v.district && v.district !== 'Unknown').map((v) => `${v.city}/${v.district}`),
    );
    const emergencyVets = vets.filter((v) => v.verification?.emergency_services);
    const emergencyCities = new Set(emergencyVets.map((v) => v.city));
    const singleVetCities = ranked.filter(([, k]) => k === 1).length;
    const withSite = vets.filter((v) => v.contact?.website).length;
    const berlin = counts.get('Berlin') ?? 0;
    return {
        total: vets.length,
        cityCount: counts.size,
        districtCount: districts.size,
        ranked,
        topMax: ranked[0]?.[1] ?? 1,
        singleVetCities,
        emergencyVetCount: emergencyVets.length,
        emergencyCityCount: emergencyCities.size,
        withSitePct: Math.round((100 * withSite) / vets.length),
        berlinShare: Math.round((100 * berlin) / vets.length),
        bigGaps: BIG_CITIES.map((b) => ({ ...b, count: counts.get(b.city) ?? 0 })),
    };
}

export default function VetAccessReport() {
    const s = computeStats();

    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{`${TITLE} | EnglishSpeakingVets`}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="English-speaking vets Germany data, veterinary access Germany, expat vet coverage Germany, English veterinarian statistics, vet directory study" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(TITLE, DESCRIPTION, URL, "2026-06-24"))}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-4xl mx-auto p-6 md:p-12 mb-12">
                <span className="text-accent font-bold tracking-wider text-sm uppercase">Data Study</span>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6 leading-tight">
                    The State of English-Speaking Veterinary Access in Germany
                </h1>
                <p className="text-lg text-primary/70 mb-10 leading-relaxed">
                    For Germany's millions of internationals, a language barrier in the vet's office is more than an inconvenience. It can mean a misunderstood diagnosis at the worst possible moment. We analysed our community-sourced directory of verified English-speaking veterinary practices to map where that care actually exists, and where it does not.
                </p>

                {/* Headline stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10 not-prose">
                    {[
                        { n: s.total, l: 'Verified practices' },
                        { n: s.cityCount, l: 'Cities covered' },
                        { n: s.districtCount, l: 'Districts mapped' },
                        { n: `${s.withSitePct}%`, l: 'With a website' },
                    ].map((x) => (
                        <div key={x.l} className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm text-center">
                            <div className="text-3xl md:text-4xl font-black text-accent">{x.n}</div>
                            <div className="text-[11px] font-bold uppercase tracking-widest text-primary/50 mt-1">{x.l}</div>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">Key findings</h2>
                <ul className="space-y-3 text-primary/80 leading-relaxed list-disc pl-5">
                    <li><strong>Coverage is heavily concentrated in expat hubs.</strong> Berlin alone accounts for roughly {s.berlinShare}% of all listed English-speaking practices, with Frankfurt punching well above its size thanks to its international finance community.</li>
                    <li><strong>{s.singleVetCities} cities have just one</strong> listed English-speaking vet, leaving expats in much of the country with a single option, or none.</li>
                    <li><strong>Several major cities are underserved.</strong> Some of Germany's largest cities have little or no English-speaking coverage in our data (see below).</li>
                    <li><strong>Emergency care is the thinnest layer.</strong> Only {s.emergencyCityCount} of {s.cityCount} covered cities have a practice noting emergency or out-of-hours service, the moment a language barrier matters most.</li>
                </ul>

                {/* Coverage ranking */}
                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">Where coverage is strongest</h2>
                <p className="text-primary/70 mb-6">English-speaking veterinary practices by city (top of the directory):</p>
                <div className="space-y-2 my-6 not-prose">
                    {s.ranked.slice(0, 12).map(([city, count]) => (
                        <Link
                            key={city}
                            to={`/vets/${slugify(city)}`}
                            className="flex items-center gap-3 group"
                            title={`English-speaking vets in ${city}`}
                        >
                            <span className="w-28 text-sm font-bold text-primary/70 group-hover:text-accent transition-colors text-right shrink-0">{city}</span>
                            <span className="flex-1 bg-primary/5 rounded-full h-6 overflow-hidden">
                                <span className="block h-full bg-accent/70 group-hover:bg-accent rounded-full transition-all" style={{ width: `${Math.max(6, (100 * count) / s.topMax)}%` }} />
                            </span>
                            <span className="w-8 text-sm font-black text-primary text-right shrink-0">{count}</span>
                        </Link>
                    ))}
                </div>

                {/* Gaps */}
                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">The coverage gaps</h2>
                <p className="text-primary/70 mb-6">Coverage against Germany's twelve largest cities. A handful of major population centres remain thinly served or unserved:</p>
                <div className="overflow-x-auto not-prose">
                    <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm border border-primary/10">
                        <thead className="bg-primary text-secondary text-sm">
                            <tr>
                                <th className="px-4 py-3 font-bold">City</th>
                                <th className="px-4 py-3 font-bold">Population (approx.)</th>
                                <th className="px-4 py-3 font-bold">English-speaking vets</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {s.bigGaps.map((b) => (
                                <tr key={b.city} className="border-t border-primary/10">
                                    <td className="px-4 py-3 font-semibold">{b.city}</td>
                                    <td className="px-4 py-3 text-primary/70">{b.pop}</td>
                                    <td className={`px-4 py-3 font-bold ${b.count === 0 ? 'text-red-500' : b.count <= 2 ? 'text-amber-600' : 'text-primary'}`}>
                                        {b.count === 0 ? 'None listed' : b.count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-primary/70 mt-6 leading-relaxed">
                    The pattern is clear: international communities cluster where English-speaking care has grown, while large industrial cities outside the classic expat magnets, such as the Ruhr area, are left with thin or non-existent coverage. As more pet owners confirm and submit practices, these gaps are the ones most worth closing.
                </p>

                {/* Methodology */}
                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">Methodology</h2>
                <p className="text-primary/70 leading-relaxed">
                    Figures are drawn from the EnglishSpeakingVets directory, a community-sourced list of veterinary practices in Germany identified as English-speaking. Practices are added through expat recommendations and checked for English-language signals (such as an English website, English-language reviews, or international staff). The data updates as practices are added and confirmed, so these numbers reflect a living snapshot rather than a one-off survey. They capture practices known to our community, not every English-speaking vet in the country, so true access is likely somewhat higher than shown, especially in smaller cities.
                </p>

                {/* CTA */}
                <div className="bg-accent/10 p-8 md:p-10 rounded-3xl mt-14 border border-accent/20 text-center not-prose">
                    <h3 className="text-2xl font-black text-primary mb-3">Help close the gaps</h3>
                    <p className="text-primary/70 mb-6 max-w-xl mx-auto">Know an English-speaking vet we are missing, especially in an underserved city? Every confirmation makes the map more accurate for the next expat.</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/" className="inline-block bg-primary text-secondary font-bold py-3 px-8 rounded-2xl hover:bg-black transition-all">Browse the directory</Link>
                        <Link to="/contact?topic=submit_vet" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-2xl border border-primary/10 hover:border-accent/40 transition-all">Submit a vet</Link>
                    </div>
                </div>

                <p className="text-xs text-primary/40 mt-8 italic">
                    Free to cite with attribution to EnglishSpeakingVets (englishspeakinggermany.online). Last updated June 2026.
                </p>
            </main>

            <Footer />
        </div>
    );
}
