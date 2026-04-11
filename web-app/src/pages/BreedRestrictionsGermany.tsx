import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const stateData = [
    { state: 'Berlin', banned: 'Restricted', additional: 'None', wesenstest: 'Can lift restrictions' },
    { state: 'Hamburg', banned: 'Banned', additional: 'Rottweiler, Doberman, others', wesenstest: 'Limited' },
    { state: 'Bavaria', banned: 'Banned', additional: 'None formal', wesenstest: 'Yes' },
    { state: 'NRW', banned: 'Banned', additional: 'Extensive Cat. 2 list', wesenstest: 'Yes' },
    { state: 'Hesse', banned: 'Banned', additional: 'Am. Bulldog, Rottweiler, others', wesenstest: 'Yes' },
    { state: 'Baden-Wurttemberg', banned: 'None', additional: 'Size/weight threshold only', wesenstest: 'Yes' },
    { state: 'Lower Saxony', banned: 'Banned', additional: 'Rottweiler, Doberman', wesenstest: 'Yes' },
    { state: 'Saxony', banned: 'Banned', additional: 'Rottweiler, Doberman', wesenstest: 'Yes' },
    { state: 'Rhineland-Palatinate', banned: 'Restricted', additional: 'Rottweiler, Doberman', wesenstest: 'Yes' },
];

export default function BreedRestrictionsGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Breed Restrictions in Germany: The Complete Guide for Expats | EnglishSpeakingVets</title>
                <meta name="description" content="Moving to Germany with a dog? Breed restrictions vary by state. Here's the complete breakdown of banned and restricted breeds and what to do if yours is on the list." />
                <meta name="keywords" content="breed restrictions germany, banned dog breeds germany, kampfhunde germany, wesenstest germany, dangerous dog breeds germany expat" />
                <meta property="og:title" content="Breed Restrictions in Germany: The Complete Expat Guide" />
                <meta property="og:description" content="State-by-state breakdown of Germany's breed-specific legislation. What's banned, what's restricted, and how the Wesenstest can change everything." />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content="https://englishspeakinggermany.online/blog/breed-restrictions-germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/breed-restrictions-germany" />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(
                        "Breed Restrictions in Germany: The Complete Guide for Expats",
                        "Moving to Germany with a dog? Breed restrictions vary by state. Complete breakdown of banned and restricted breeds and what to do if yours is on the list.",
                        "https://englishspeakinggermany.online/blog/breed-restrictions-germany",
                        "2026-04-28"
                    ))}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Bureaucracy Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            Breed Restrictions in Germany: The Complete Guide for Expats
                        </h1>

                        <div className="flex items-center gap-3 text-sm text-primary/50 mb-8">
                            <span>📅 Last verified: April 2026</span>
                            <span>·</span>
                            <span className="italic">German state law changes. Verify current rules with your local Ordnungsamt annually.</span>
                        </div>

                        <TableOfContents items={[
                            { id: 'two-categories', label: '1. Banned vs. Restricted' },
                            { id: 'core-breeds', label: '2. The Core Restricted Breeds' },
                            { id: 'by-state', label: '3. State-by-State Breakdown' },
                            { id: 'wesenstest', label: '4. The Wesenstest: Getting an Exemption' },
                            { id: 'what-to-do', label: '5. What to Do If Your Dog Is Listed' },
                            { id: 'summary-table', label: '6. Quick Reference Table' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Most dogs move to Germany without drama. But if yours is a Pit Bull, a Staffordshire, or anything that looks even vaguely like one - you need to read this before you pack.
                            </p>
                            <p>
                                <strong>There is no single German national list of banned breeds.</strong> Breed restrictions are set at state (Bundesland) level, and sometimes municipality level on top of that. What's fine in Stuttgart might require permits in Cologne and be banned outright in Hamburg.
                            </p>
                            <p>Here's the full breakdown, by state.</p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="two-categories" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">⚖️ 1. Banned vs. Restricted</h2>
                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-red-700 mb-2">Category 1 - "Kampfhunde"</h3>
                                    <p className="text-sm text-red-800">Presumed dangerous without needing any incident to prove it. Ownership is either banned outright or requires significant bureaucratic hurdles: permits, housing approval, liability insurance, muzzle-and-leash requirements in public, and sometimes a mandatory behavioral test.</p>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-yellow-700 mb-2">Category 2 - Potentially Dangerous</h3>
                                    <p className="text-sm text-yellow-800">These breeds may face additional requirements (insurance, leash mandates, or passing a behavioral test) but are not presumptively banned. With the right documentation, you can usually keep them.</p>
                                </div>
                            </div>

                            <h2 id="core-breeds" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">⚠️ 2. The Core Restricted Breeds</h2>
                            <p>These four breeds appear on virtually every state's restricted list. In several states, they are outright banned for new ownership:</p>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <div className="grid grid-cols-2 gap-3">
                                    {['American Pit Bull Terrier', 'American Staffordshire Terrier', 'Staffordshire Bull Terrier', 'Bull Terrier'].map(breed => (
                                        <div key={breed} className="flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2.5 rounded-lg">
                                            <span className="text-red-500">⚠️</span>
                                            <span className="font-bold text-sm text-red-900">{breed}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-primary/60 mt-3 italic">Some states also restrict crosses and mixes of these breeds, even if the dog looks only vaguely like one of the above.</p>
                            </div>

                            <h2 id="by-state" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🗺️ 3. State-by-State Breakdown</h2>
                            {[
                                { state: 'Berlin', emoji: '🗺️', status: 'restricted', content: 'The core 4 breeds are restricted but not banned. Registration with the district (Bezirk) is required, along with proof of liability insurance (minimum €1 million), and a muzzle and leash in all public spaces. A Wesenstest may be required for some exemptions.' },
                                { state: 'Hamburg', emoji: '🗺️', status: 'banned', content: 'Hamburg operates one of the stricter regimes in Germany. The core 4 breeds cannot legally be acquired or kept. Dogs already registered before the ban may be grandfathered in with permits. Rottweilers, Dobermans, and several others may also require a Wesenstest.' },
                                { state: 'Bavaria (Munich, Nuremberg, Augsburg)', emoji: '🗺️', status: 'banned', content: 'Bavaria bans the core 4 breeds. Mixed breeds with significant characteristics of these breeds may also be subject to assessment. No formal second category, but individual municipalities may add further restrictions.' },
                                { state: 'North Rhine-Westphalia (Cologne, Dusseldorf, Dortmund)', emoji: '🗺️', status: 'banned', content: 'NRW has one of the most detailed restricted lists in Germany. Category 1 (banned): the core 4. Category 2 (Wesenstest can lift restrictions): Alano, Bullmastiff, Dogue de Bordeaux, Fila Brasileiro, Kangal, Caucasian Shepherd, Mastiff, Mastino Napoletano, Dogo Argentino, Rottweiler, Tosa Inu.' },
                                { state: 'Hesse (Frankfurt, Wiesbaden)', emoji: '🗺️', status: 'banned', content: 'Category 1 (banned): core 4 plus Tosa Inu and Bandog. Category 2 (regulated, can pass Wesenstest): Alano, American Bulldog, Bullmastiff, Dogo Argentino, Dogue de Bordeaux, Fila Brasileiro, Mastiff, Mastino Napoletano, Rottweiler.' },
                                { state: 'Baden-Wurttemberg (Stuttgart, Mannheim, Freiburg)', emoji: '🗺️', status: 'none', content: 'No breed-specific bans at state level - one of the more liberal states. A size/weight threshold applies instead: dogs over 40cm at the shoulder OR over 20kg require registration and liability insurance. Aggressive behavior is addressed case-by-case, not by breed.' },
                                { state: 'Lower Saxony (Hanover, Braunschweig)', emoji: '🗺️', status: 'banned', content: 'The core 4 breeds are banned. Rottweilers and Dobermans are regulated and can be exempted with a passed behavioral test.' },
                                { state: 'Saxony (Dresden, Leipzig)', emoji: '🗺️', status: 'banned', content: 'Banned: the core 4 plus Tosa Inu, Dogo Argentino, and Fila Brasileiro. Rottweilers and Dobermans have an on-leash requirement in public; can apply for exemption.' },
                                { state: 'Rhineland-Palatinate (Mainz, Koblenz)', emoji: '🗺️', status: 'restricted', content: 'All regulated breeds (core 4 plus Rottweiler, Doberman) require registration, liability insurance, and a passed Wesenstest for public off-leash access. No outright state-level ban.' },
                            ].map(item => (
                                <div key={item.state} className="my-4 not-prose">
                                    <div className={`p-5 rounded-xl border ${item.status === 'banned' ? 'bg-red-50 border-red-200' : item.status === 'none' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span>{item.emoji}</span>
                                            <h3 className="font-bold text-primary">{item.state}</h3>
                                            <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${item.status === 'banned' ? 'bg-red-200 text-red-800' : item.status === 'none' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                                {item.status === 'banned' ? 'BANNED' : item.status === 'none' ? 'NO BAN' : 'RESTRICTED'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-primary/80">{item.content}</p>
                                    </div>
                                </div>
                            ))}

                            <h2 id="wesenstest" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🧪 4. The Wesenstest: Getting an Exemption</h2>
                            <p>
                                The behavioral test (<em>Wesenstest</em> or <em>Charaktertest</em>) is Germany's mechanism for treating individual dogs as individuals rather than breed statistics. A certified assessor evaluates your dog in various real-world scenarios (around strangers, other dogs, children, loud noises, traffic) and issues a pass/fail assessment.
                            </p>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <div className="grid md:grid-cols-3 gap-4 text-center">
                                    {[
                                        { icon: '✅', title: 'What a pass gets you', desc: 'Removes or significantly reduces restrictions, including off-leash access and freedom from mandatory muzzle requirements.' },
                                        { icon: '👨‍⚕️', title: 'Who conducts it', desc: 'Only state-approved assessors. Your vet can advise, or your district Ordnungsamt will provide a list.' },
                                        { icon: '💶', title: 'Cost', desc: 'Typically €50-150 depending on the state and assessor.' },
                                    ].map(item => (
                                        <div key={item.title} className="p-4">
                                            <p className="text-2xl mb-2">{item.icon}</p>
                                            <h3 className="font-bold text-primary text-sm mb-1">{item.title}</h3>
                                            <p className="text-xs text-primary/70">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg mt-4">
                                    <strong>It's worth doing.</strong> German culture is generally very pro-dog, and officials are not looking to confiscate well-behaved animals. A passed Wesenstest is often the end of the bureaucratic story.
                                </p>
                            </div>

                            <h2 id="what-to-do" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">✅ 5. What to Do If Your Dog Is on a Restricted List</h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-4">
                                {[
                                    { n: 1, title: "Don't panic", desc: "Bans apply to new acquisitions in most states. Dogs already living there and registered are usually grandfathered in with permits." },
                                    { n: 2, title: "Register your dog immediately", desc: "With the local Ordnungsamt (public order office). Don't wait to be found out; proactive registration is treated far more favorably than non-compliance." },
                                    { n: 3, title: "Get liability insurance", desc: "Hundehaftpflichtversicherung with at least €1 million coverage. Required for restricted breeds and a good idea for all dogs in Germany. Costs around €50-100/year." },
                                    { n: 4, title: "Book a Wesenstest", desc: "Even if it's not legally required in your state, it gives you documentation that your dog is well-behaved, helping in any future dispute with landlords, neighbors, or officials." },
                                    { n: 5, title: "Talk to your vet", desc: "An English-speaking vet familiar with local regulations can be a real asset and can often provide supporting documentation." },
                                ].map(item => (
                                    <div key={item.n} className="flex items-start gap-4">
                                        <span className="bg-accent text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">{item.n}</span>
                                        <div>
                                            <p className="font-bold text-primary text-sm">{item.title}</p>
                                            <p className="text-primary/70 text-sm mt-0.5">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/vets/berlin" className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                Find an English-speaking vet who can help with breed registration →
                            </Link>

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">A note on landlords</h3>
                                <p className="text-sm text-primary/80">
                                    Even in states where your breed is legal, your <strong>landlord</strong> can refuse to allow certain dogs in a rental property, and they often do. Be upfront in your apartment search and, again, a passed Wesenstest certificate significantly improves your odds.
                                </p>
                            </div>

                            <h2 id="summary-table" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📋 6. Quick Reference Table</h2>
                            <p className="text-sm text-primary/60 italic mb-4">Last verified: April 2026. Always check with your local Ordnungsamt for the most current rules.</p>
                            <div className="my-4 not-prose overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-primary text-secondary">
                                            <th className="text-left p-3 font-bold rounded-tl-lg">State</th>
                                            <th className="text-left p-3 font-bold">Core 4 status</th>
                                            <th className="text-left p-3 font-bold">Additional breeds</th>
                                            <th className="text-left p-3 font-bold rounded-tr-lg">Wesenstest</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stateData.map((row, i) => (
                                            <tr key={row.state} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/50'}>
                                                <td className="p-3 border-b border-primary/5 font-bold text-primary">{row.state}</td>
                                                <td className="p-3 border-b border-primary/5">
                                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${row.banned === 'Banned' ? 'bg-red-100 text-red-800' : row.banned === 'None' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {row.banned}
                                                    </span>
                                                </td>
                                                <td className="p-3 border-b border-primary/5 text-primary/70">{row.additional}</td>
                                                <td className="p-3 border-b border-primary/5 text-primary/70">{row.wesenstest}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-sm italic opacity-70 not-prose mt-6">
                                Breed legislation in Germany can change. Always verify current rules with your local Ordnungsamt or a legal professional before making decisions about relocating with a restricted breed.
                            </p>
                        </div>

                        <RelatedPosts currentPath="/blog/breed-restrictions-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
