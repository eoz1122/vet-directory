import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import vetsData from '../data/vets.json';
import { filterDisplayableVets } from '../utils/activeVets';
import { slugify } from '../utils/url';
import { generateArticleSchema } from '../utils/schema';
import type { Vet } from '../types/vet';

const vets = filterDisplayableVets(vetsData as Vet[]);

const TITLE = "Mapping English-Speaking Vets Across Germany (2026)";
const DESCRIPTION = "A snapshot of our community directory's coverage of English-speaking veterinary practices in Germany: how many we have mapped, where coverage is strongest, and which cities we are still expanding into.";
const URL = "https://englishspeakinggermany.online/english-speaking-vet-access-germany";

// Germany's largest cities by population (rounded, public figures), used to show how far
// our mapping has reached so far. A low count means "not yet researched", not "none exist".
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
    const multi = ranked.filter(([, k]) => k >= 2);
    const single = ranked.filter(([, k]) => k === 1).map(([c]) => c).sort();
    const withSite = vets.filter((v) => v.contact?.website).length;
    const berlin = counts.get('Berlin') ?? 0;
    return {
        total: vets.length,
        cityCount: counts.size,
        districtCount: districts.size,
        multi,
        single,
        topMax: ranked[0]?.[1] ?? 1,
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
                <meta name="keywords" content="English-speaking vets Germany, veterinary coverage Germany, expat vet directory, English veterinarian Germany cities" />
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
                <span className="text-accent font-bold tracking-wider text-sm uppercase">Coverage Snapshot</span>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6 leading-tight">
                    Mapping English-Speaking Vets Across Germany
                </h1>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-sm text-amber-900 not-prose">
                    <strong>What this is:</strong> a snapshot of <em>our directory's</em> coverage so far, built from expat recommendations and research focused on Germany's biggest international-community cities. It is <strong>not</strong> a census of every English-speaking vet in the country. Where a city shows a low or zero count, it usually means <strong>we have not mapped it yet</strong>, not that English-speaking care is unavailable there.
                </div>

                <p className="text-lg text-primary/70 mb-10 leading-relaxed">
                    For Germany's millions of internationals, a language barrier at the vet can turn a stressful moment into a frightening one. We have been mapping the practices our community confirms as English-speaking. Here is where that map stands today, and where we are still filling it in.
                </p>

                {/* Headline stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10 not-prose">
                    {[
                        { n: s.total, l: 'Practices mapped' },
                        { n: s.cityCount, l: 'Cities so far' },
                        { n: s.districtCount, l: 'Districts mapped' },
                        { n: `${s.withSitePct}%`, l: 'With a website' },
                    ].map((x) => (
                        <div key={x.l} className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm text-center">
                            <div className="text-3xl md:text-4xl font-black text-accent">{x.n}</div>
                            <div className="text-[11px] font-bold uppercase tracking-widest text-primary/50 mt-1">{x.l}</div>
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">What the map shows</h2>
                <ul className="space-y-3 text-primary/80 leading-relaxed list-disc pl-5">
                    <li><strong>Coverage tracks the biggest expat communities.</strong> Berlin alone accounts for roughly {s.berlinShare}% of everything we have mapped, with Frankfurt and Hamburg close behind, which mirrors where we have focused our research first.</li>
                    <li><strong>{s.single.length} cities currently have a single listed practice.</strong> These are usually places a community member flagged one vet, with more almost certainly out there to add.</li>
                    <li><strong>Several large cities are still on our list to map</strong> (see below). A blank there is a to-do for us, not a verdict on the city.</li>
                    <li><strong>This is a living map.</strong> Every confirmation and submission makes it more complete, especially outside the classic expat hubs.</li>
                </ul>

                {/* Coverage ranking */}
                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">Cities we have mapped</h2>
                <p className="text-primary/70 mb-6">Practices per city, where we currently list two or more:</p>
                <div className="space-y-2 my-6 not-prose">
                    {s.multi.map(([city, count]) => (
                        <Link key={city} to={`/vets/${slugify(city)}`} className="flex items-center gap-3 group" title={`English-speaking vets in ${city}`}>
                            <span className="w-28 text-sm font-bold text-primary/70 group-hover:text-accent transition-colors text-right shrink-0">{city}</span>
                            <span className="flex-1 bg-primary/5 rounded-full h-6 overflow-hidden">
                                <span className="block h-full bg-accent/70 group-hover:bg-accent rounded-full transition-all" style={{ width: `${Math.max(5, (100 * count) / s.topMax)}%` }} />
                            </span>
                            <span className="w-8 text-sm font-black text-primary text-right shrink-0">{count}</span>
                        </Link>
                    ))}
                </div>
                {s.single.length > 0 && (
                    <p className="text-sm text-primary/60 leading-relaxed">
                        <strong>Plus {s.single.length} more cities</strong> with a single listed practice so far:{' '}
                        {s.single.map((c, i) => (
                            <span key={c}>
                                <Link to={`/vets/${slugify(c)}`} className="text-accent hover:underline">{c}</Link>{i < s.single.length - 1 ? ', ' : '.'}
                            </span>
                        ))}
                    </p>
                )}

                {/* Largest cities coverage */}
                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">How far we have reached</h2>
                <p className="text-primary/70 mb-6">Our coverage across Germany's twelve largest cities. The thin and blank rows are simply where our mapping has not reached yet, our priority list for expansion:</p>
                <div className="overflow-x-auto not-prose">
                    <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm border border-primary/10">
                        <thead className="bg-primary text-secondary text-sm">
                            <tr>
                                <th className="px-4 py-3 font-bold">City</th>
                                <th className="px-4 py-3 font-bold">Population (approx.)</th>
                                <th className="px-4 py-3 font-bold">Practices mapped</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {s.bigGaps.map((b) => (
                                <tr key={b.city} className="border-t border-primary/10">
                                    <td className="px-4 py-3 font-semibold">{b.city}</td>
                                    <td className="px-4 py-3 text-primary/70">{b.pop}</td>
                                    <td className={`px-4 py-3 font-bold ${b.count === 0 ? 'text-primary/40' : 'text-primary'}`}>
                                        {b.count === 0 ? 'Not yet mapped' : b.count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Methodology */}
                <h2 className="text-2xl font-bold text-primary mt-14 mb-4">Methodology & limits</h2>
                <p className="text-primary/70 leading-relaxed">
                    Figures come from the EnglishSpeakingVets directory, a community-sourced list of veterinary practices in Germany identified as English-speaking. Practices are added through expat recommendations and research, then checked for English-language signals such as an English website, English-language reviews, or international staff. Importantly, our research has so far concentrated on the cities with the largest international communities, so the map is densest there by design. A low or zero count for any city reflects how much we have mapped it, not how much English-speaking care exists there. These numbers therefore undercount true availability, particularly in cities we have not yet focused on.
                </p>

                {/* CTA */}
                <div className="bg-accent/10 p-8 md:p-10 rounded-3xl mt-14 border border-accent/20 text-center not-prose">
                    <h3 className="text-2xl font-black text-primary mb-3">Help us fill in the map</h3>
                    <p className="text-primary/70 mb-6 max-w-xl mx-auto">Know an English-speaking vet we are missing, especially in a city we have not reached yet? Every submission makes the map more accurate for the next expat.</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/" className="inline-block bg-primary text-secondary font-bold py-3 px-8 rounded-2xl hover:bg-black transition-all">Browse the directory</Link>
                        <Link to="/contact?topic=submit_vet" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-2xl border border-primary/10 hover:border-accent/40 transition-all">Submit a vet</Link>
                    </div>
                </div>

                <p className="text-xs text-primary/40 mt-8 italic">
                    Free to cite with attribution to EnglishSpeakingVets (englishspeakinggermany.online), provided figures are described as our directory's current coverage rather than a national total. Last updated June 2026.
                </p>
            </main>

            <Footer />
        </div>
    );
}
