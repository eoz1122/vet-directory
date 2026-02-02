import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function GermanDogEtiquette() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>German Dog Etiquette: The Unwritten Rules | EnglishSpeakingVets</title>
                <meta name="description" content="A complete guide to German dog etiquette. Learn about leash laws (Leinenpflicht), off-leash areas, Hundeführerschein requirements, and the social rules of owning a dog in Germany." />
                <meta name="keywords" content="dog etiquette Germany, German leash laws, Leinenpflicht, dog rules Germany, off-leash areas Germany, Hundeauslaufgebiet, dog tax Germany, expat dog owner Germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/german-dog-etiquette-rules" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Living in Germany Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            🐕 German Dog Etiquette: <br />The Unwritten Rules
                        </h1>

                        <TableOfContents items={[
                            { id: 'introduction', label: 'The Social Contract' },
                            { id: 'leash-laws', label: 'Leinenpflicht (Leash Laws)' },
                            { id: 'fines', label: 'Fines: How Expensive Can It Get?' },
                            { id: 'off-leash', label: 'Where to Run Free' },
                            { id: 'hundefuehrerschein', label: 'The Dog Handler’s Certificate' },
                            { id: 'poop-patrol', label: 'Poop Patrol & Social Norms' },
                            { id: 'hundeverbot', label: 'The "Hundeverbot" Signs' },
                            { id: 'restaurant-etiquette', label: 'Dining With Your Dog' },
                            { id: 'social-rules', label: 'Unspoken Social Rules' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <h2 id="introduction" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24 text-center italic border-b border-primary/5 pb-6">
                                "In Germany, your dog is expected to be a productive, silent, and law-abiding member of society."
                            </h2>

                            <p className="mb-6">
                                Germany is one of the most dog-friendly countries in the world. Dogs sit calmly under café tables, ride the U-Bahn without batting an eye, and join their owners on shopping trips. But here's the thing: German dogs are really well-behaved. And German dog owners? They follow rules you didn't even know existed.
                            </p>

                            <p className="mb-8">
                                As an expat, you might feel like everyone's staring at you when your dog pulls on the leash, barks at another dog, or sniffs a stranger's leg. That's because in Germany, there are unwritten social rules—and plenty of written ones—that every dog owner is expected to follow.
                            </p>

                            <h2 id="leash-laws" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">The Golden Rule: Leinenpflicht (Leash Laws)</h2>
                            <p>
                                Germany doesn't have a single, nationwide leash law. Instead, each of the 16 federal states sets its own rules, and sometimes individual cities add their own regulations on top.
                            </p>

                            <div className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm my-8 not-prose">
                                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🏙️</span> Where Leashes Are Generally Required
                                </h3>
                                <ul className="space-y-3 font-medium text-primary/70">
                                    <li className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        Public streets, sidewalks, and pedestrian zones
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        Public transport (U-Bahn, S-Bahn, trams, buses)
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        Inside shops, restaurants, and cafés
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        Government buildings and post offices
                                    </li>
                                    <li className="flex gap-3 items-center text-red-500">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                        Children’s playgrounds (dogs are often banned entirely)
                                    </li>
                                    <li className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                        Cemeteries
                                    </li>
                                </ul>
                            </div>

                            <h3 className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Breeding / Nesting Season (Brut- und Setzzeit)</h3>
                            <p className="bg-accent/5 p-6 rounded-xl border border-accent/20 mb-8 font-bold text-primary">
                                ⚠️ Crucial Date: April 1 to July 15.
                            </p>
                            <p>
                                During this time, regardless of the state, leashes are typically <strong>mandatory</strong> in forests, fields, and near wildlife to protect ground-nesting birds and newborns.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-12 not-prose">
                                <div className="bg-primary p-6 rounded-2xl text-secondary">
                                    <h4 className="font-bold text-accent mb-4 uppercase tracking-widest text-sm text-center">Strict Forest Leash Rules</h4>
                                    <ul className="space-y-2 text-sm font-bold opacity-90 text-center">
                                        <li>Berlin</li>
                                        <li>Hamburg</li>
                                        <li>Thuringia</li>
                                    </ul>
                                    <p className="mt-4 text-xs opacity-60 text-center italic">Dogs must stay leashed in these city-states unless in a marked zone.</p>
                                </div>
                                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                    <h4 className="font-bold text-primary mb-4 uppercase tracking-widest text-sm text-center">Seasonal / Context Rules</h4>
                                    <ul className="space-y-2 text-sm font-bold opacity-70 text-center">
                                        <li>Bavaria</li>
                                        <li>Baden-Württemberg</li>
                                        <li>Saxony</li>
                                        <li>Hesse</li>
                                    </ul>
                                    <p className="mt-4 text-xs opacity-40 text-center italic">Rules depend more on the specific municipality or wildlife season.</p>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24 text-center">Special Berlin Rule (Important for Expats)</h3>
                            <p className="mb-8">
                                Since January 2019, Berlin has one of the strictest urban leash policies in Germany. <strong>Dogs must be leashed in all public spaces</strong> unless you are in an officially designated off-leash park.
                            </p>

                            <h2 id="fines" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Fines: How Expensive Can It Get?</h2>
                            <div className="overflow-hidden rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary text-center">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Type of Violation</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Expected Fine</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Off-leash in restricted urban area</td>
                                            <td className="p-4 text-accent font-black text-center">€50 – €200</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Repeat offenses / ignoring warnings</td>
                                            <td className="p-4 text-accent font-black text-center">€500 – €1,000</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Injuring a person or chasing wildlife</td>
                                            <td className="p-4 text-red-600 font-black text-center">Up to €5,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 id="off-leash" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Off-Leash Areas: Where Your Dog Can Actually Run Free</h2>
                            <p className="text-center font-bold text-lg mb-8">
                                Look for signs saying: <span className="text-accent underline">“Hundeauslaufgebiet”</span> or <span className="text-accent underline">“Freilaufzone”</span>.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
                                <div className="bg-white p-6 rounded-2xl border-l-4 border-accent shadow-sm">
                                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><span className="text-xl">🐻</span> Berlin Highlights</h4>
                                    <p className="text-sm opacity-70 mb-3 font-semibold">Grunewald Forest:</p>
                                    <p className="text-xs opacity-60">Massive forest areas with a dedicated dog swimming beach (Hundestrand).</p>
                                    <p className="text-sm opacity-70 mt-3 font-semibold">Tempelhofer Feld:</p>
                                    <p className="text-xs opacity-60">Huge fenced areas with plenty of space for sprinting.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border-l-4 border-primary shadow-sm">
                                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2"><span className="text-xl">🚢</span> Hamburg Highlights</h4>
                                    <p className="text-sm opacity-70 mb-3 font-semibold">Stadtpark:</p>
                                    <p className="text-xs opacity-60">Multiple designated sections for social play.</p>
                                    <p className="text-sm opacity-70 mt-3 font-semibold">Elbstrand:</p>
                                    <p className="text-xs opacity-60">The beach is dog heaven, but check the signs for specific zones.</p>
                                </div>
                            </div>

                            <h2 id="hundefuehrerschein" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">The Hundeführerschein (Dog Handler’s Certificate)</h2>
                            <p className="bg-primary/5 p-6 rounded-xl border border-primary/10 text-sm mb-12">
                                💡 <strong>Pro Tip:</strong> This is NOT required everywhere. In <strong>Berlin</strong>, it is voluntary. However, in <strong>Lower Saxony (Niedersachsen)</strong>, it is mandatory for almost all dog owners over a certain age.
                            </p>

                            <h2 id="poop-patrol" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Poop Patrol: The Social Imperative</h2>
                            <p>
                                Germans take dog waste very seriously. Not picking up after your dog is one of the fastest ways to earn the ire of your neighbors and fellow dog owners.
                            </p>
                            <div className="bg-primary text-secondary p-8 rounded-2xl my-10 not-prose flex flex-col items-center text-center">
                                <span className="text-4xl mb-4">💩</span>
                                <h3 className="text-xl font-bold text-accent mb-2 uppercase tracking-wide">The Unspoken Mandatory Rule</h3>
                                <p className="opacity-80 italic">"On sidewalks, in parks, in high-grass meadows, and even deep in the forest—you MUST pick it up and carry it to a bin. No exceptions."</p>
                                <p className="mt-4 font-black text-xs uppercase bg-white/10 px-4 py-2 rounded-full">Fine for ignoring: €20 – €150</p>
                            </div>

                            <h2 id="hundeverbot" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center text-red-600">The "Hundeverbot" Signs</h2>
                            <div className="grid md:grid-cols-3 gap-4 my-10 not-prose text-center">
                                <div className="bg-white p-5 rounded-xl border border-primary/5">
                                    <span className="text-3xl block mb-2">🍞</span>
                                    <p className="font-bold text-xs uppercase tracking-widest text-primary/40 mb-2 leading-none">Grocery & Bakeries</p>
                                    <p className="font-black text-red-600 uppercase text-lg">NEVER</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-primary/5">
                                    <span className="text-3xl block mb-2">🧒</span>
                                    <p className="font-bold text-xs uppercase tracking-widest text-primary/40 mb-2 leading-none">Playgrounds</p>
                                    <p className="font-black text-red-600 uppercase text-lg">NEVER</p>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-primary/5">
                                    <span className="text-3xl block mb-2">🍺</span>
                                    <p className="font-bold text-xs uppercase tracking-widest text-primary/40 mb-2 leading-none">Beer Gardens</p>
                                    <p className="font-black text-green-600 uppercase text-lg">ALWAYS</p>
                                </div>
                            </div>

                            <h2 id="restaurant-etiquette" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Dining With Your Dog</h2>
                            <p>
                                Germans bring their dogs to restaurants all the time. If there is no "Hunde verboten" sign, they are likely welcome.
                            </p>
                            <div className="bg-white border border-primary/10 rounded-2xl overflow-hidden my-8 not-prose">
                                <div className="p-6 space-y-4">
                                    <div className="flex gap-4">
                                        <span className="text-2xl mt-1">🛌</span>
                                        <div>
                                            <p className="font-bold text-primary italic leading-tight text-lg underline">The Blanket Rule</p>
                                            <p className="text-sm opacity-70">Many German owners bring a small travel mat or blanket. It signals to the staff that your dog knows how to "park" and stay in one spot.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 border-t border-primary/5 pt-4">
                                        <span className="text-2xl mt-1">💧</span>
                                        <div>
                                            <p className="font-bold text-primary text-lg italic">Water Culture</p>
                                            <p className="text-sm opacity-70">Expect a bowl of water to arrive before your drink does. It's standard service in dog-friendly spots.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 id="social-rules" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Unspoken Social Rules</h2>
                            <div className="space-y-6 mb-12">
                                <div className="p-6 bg-white rounded-2xl border-l-4 border-accent shadow-sm">
                                    <h4 className="text-xl font-bold text-primary mb-2">1. The "Invisible" Dog</h4>
                                    <p className="opacity-70 leading-relaxed italic">"German dogs rarely bark in public. Excessive barking or jumping on strangers is considered a failure of training and will earn you intense judgmental stares."</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl border-l-4 border-accent shadow-sm">
                                    <h4 className="text-xl font-bold text-primary mb-2">2. Ask Before Petting</h4>
                                    <p className="opacity-70 leading-relaxed italic uppercase font-bold text-sm tracking-tighter">"Darf ich Ihren Hund streicheln?"</p>
                                    <p className="opacity-70 leading-relaxed italic mt-1">Always ask before approaching another dog. Personal space is highly valued.</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl border-l-4 border-accent shadow-sm">
                                    <h4 className="text-xl font-bold text-primary mb-2">3. The Responsibility Act</h4>
                                    <p className="opacity-70 leading-relaxed italic">"Keeping a dog in a single room or crate all day is illegal. Daily exercise and mental stimulation are legal requirements under German animal welfare laws."</p>
                                </div>
                            </div>

                            <div className="bg-accent/10 p-8 rounded-2xl my-16 text-center shadow-lg border border-accent/20 not-prose">
                                <h3 className="text-2xl font-bold text-primary mb-4">Did your dog have an "oopsie"?</h3>
                                <p className="mb-8 text-primary/80 italic font-medium">
                                    Whether it's a minor check-up or a social anxiety question, our network of English-speaking vets is here to help you navigate dog ownership in Germany.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/german-dog-etiquette-rules" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
