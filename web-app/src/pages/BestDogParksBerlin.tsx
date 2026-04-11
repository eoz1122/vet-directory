import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import { generateArticleSchema } from '../utils/schema';

const BestDogParksBerlin: React.FC = () => {
    const publishDate = '2026-06-09';
    
    const schema = generateArticleSchema(
        'Best Dog Parks in Berlin: Off-Leash Areas by Neighbourhood',
        'The definitive guide to off-leash dog areas in Berlin. Hundeauslaufgebiete by neighbourhood, leash rules, and where to take reactive or large dogs.',
        'https://englishspeakinggermany.online/blog/best-dog-parks-berlin',
        publishDate
    );

    return (
        <div className="min-h-screen flex flex-col font-sans bg-secondary/20">
            <Helmet>
                <title>Best Dog Parks in Berlin: Off-Leash Areas Guide | English Speaking Vets</title>
                <meta name="description" content="The definitive guide to off-leash dog areas in Berlin. Hundeauslaufgebiete by neighbourhood, leash rules, and where to take reactive or large dogs." />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/best-dog-parks-berlin" />
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>

            <Header />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 mt-16 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="sticky top-24">
                            <BlogSidebar />
                        </div>
                    </div>

                    <div className="lg:w-3/4 max-w-4xl">
                        <div className="mb-4 text-sm font-bold text-accent uppercase tracking-wider">
                            CITY LIVING
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            Best Dog Parks in Berlin: Off-Leash Guide
                        </h1>

                        <div className="flex items-center text-primary/60 text-sm mb-12 space-x-4">
                            <span className="flex items-center">
                                📅 Published: June 2026
                            </span>
                        </div>

                        <div className="bg-secondary/30 p-6 rounded-2xl mb-12 hidden md:block border border-primary/10">
                            <TableOfContents items={[
                                { id: 'rules', label: '1. The Ground Rules: Leash Laws in Berlin' },
                                { id: 'mitte-prenzlauer', label: '2. Mitte & Prenzlauer Berg' },
                                { id: 'kreuzberg-neukolln', label: '3. Kreuzberg & Neukölln' },
                                { id: 'west-berlin', label: '4. Charlottenburg & Wilmersdorf' },
                                { id: 'forests', label: '5. Deep Runs: Grunewald & Köpenick' },
                                { id: 'tips', label: '6. Pro Tips for Off-Leash Success' },
                                { id: 'vet', label: '7. Vet Care After a Park Trip' }
                            ]} />
                        </div>

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Berlin is by any measure one of the best cities in the world to have a dog. The ratio of dog-friendly cafes to humans, the vast urban forests, and the accepted dog culture all add up to a place where life with a dog works.
                            </p>
                            <p>
                                But figuring out Berlin's off-leash rules takes a bit of insider knowledge. Unlike cities where any park is fair game, Berlin has strictly designated <em>Hundeauslaufgebiete</em>.
                            </p>
                            <p>Get it wrong and you get a €35 fine. Here is the full guide to the best spots by neighbourhood.</p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="rules" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">⚖️ 1. The Ground Rules: Leash Laws in Berlin</h2>
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li><strong>Default rule:</strong> Dogs must be on a leash (<em>Leinenpflicht</em>) in all Berlin public parks and green spaces unless in a designated off-leash zone.</li>
                                <li><strong>Designated off-leash areas (Hundeauslaufgebiete):</strong> Zones where dogs run free. Berlin has over 170 of them across 12 districts.</li>
                                <li><strong>The fine:</strong> €35 if caught off-leash in non-designated zones. Ordnungsamt wardens actively patrol popular parks.</li>
                            </ul>
                            
                            <div className="bg-accent/10 border border-accent/20 p-5 rounded-xl my-6 not-prose">
                                <h3 className="font-bold text-accent mb-1">What about Tempelhofer Feld?</h3>
                                <p className="text-sm text-primary/80">The famous former airfield is a special case. Dogs are allowed on the runways and fields, but must be on a leash except in the small designated off-leash zones near the edges. Great for a long walk, but do not let your dog roam completely free on the main field.</p>
                            </div>

                            <h2 id="mitte-prenzlauer" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📍 2. Mitte & Prenzlauer Berg</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Volkspark Friedrichshain</h3>
                                    <p>One of Berlin's best all-round dog parks. Multiple off-leash areas, good paths, and a sociable morning crowd near the Märchenbrunnen side.</p>
                                    <p className="text-sm text-primary/60 italic">Nearest U-Bahn: Strausberger Platz or Frankfurter Tor (U5)</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Mauerpark</h3>
                                    <p>Technically not an official zone, but the upper section near the flea market side has a de facto off-leash culture tolerated in practice. Bring a lead and use judgment, as Sundays get overwhelmingly busy and reactive.</p>
                                </div>
                            </div>

                            <h2 id="kreuzberg-neukolln" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📍 3. Kreuzberg & Neukölln</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Hasenheide (Volkspark)</h3>
                                    <p>Large park with a well-established big off-leash area. Beautiful old trees. Great for large dogs with energy to burn.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Viktoriapark</h3>
                                    <p>Smaller park on a hill. Designated zone at the base. Good for a post-coffee social sniff rather than a massive run.</p>
                                </div>
                            </div>

                            <h2 id="west-berlin" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📍 4. Charlottenburg & Wilmersdorf</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Volkspark Wilmersdorf</h3>
                                    <p>Friendly crowd near the ponds. Excellent space for a proper run and swimming-capable dogs in summer.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Lietzenseepark</h3>
                                    <p>Upmarket park with a designated off-leash corner near the playground on the opposite side. Very relaxed vibe.</p>
                                </div>
                            </div>

                            <h2 id="forests" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🌲 5. Deep Runs: Grunewald & Köpenick</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Grunewald Forest (South West)</h3>
                                    <p>3,000 hectares of woodland, lakes, and trails. Dogs can go off-leash in designated huge forest swathes. The lakes (Schlachtensee, Krumme Lanke, Grunewaldsee) allow swimming. Essential on hot summer days.</p>
                                    <p className="text-sm text-primary/60 italic">Watch for lakeside leash signs.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-xl">Müggelberge (South East)</h3>
                                    <p>For those living in outer east Berlin. Vast woodland walking with marked trails and less crowds than Grunewald.</p>
                                </div>
                            </div>

                            <h2 id="tips" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">💡 6. Pro Tips for Off-Leash Success</h2>
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li><strong>Carry water:</strong> Fountains vary wildly by park.</li>
                                <li><strong>Pick up waste:</strong> Fines for not doing so are €35 and actively enforced. <em>Hundekot-Beutel</em> dispensers are everywhere. Use them.</li>
                                <li><strong>Reactive dogs:</strong> Look for "eingezäunt" (fenced) areas on the official map to run free without unwanted approaches.</li>
                                <li><strong>Ticks:</strong> If you went to Grunewald or forested parks, <Link to="/blog/tick-season-germany-pets" className="text-accent underline">do a tick check</Link> immediately after.</li>
                            </ul>

                            <h2 id="vet" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🧑‍⚕️ 7. Vet Care After a Park Trip</h2>
                            <p>Injuries from off-leash play (cut paws, collisions, swallowing weird things) are the most common reasons for unscheduled vet visits. Make sure you already have a verified English-speaking vet so you can be seen quickly rather than arriving as a stranger.</p>

                            <div className="mt-8">
                                <Link to="/vets/berlin" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-colors">
                                    Find a verified English-speaking vet in your Kiez →
                                </Link>
                            </div>

                        </div>

                        <hr className="my-12 border-primary/10" />
                        <RelatedPosts currentPath="/blog/best-dog-parks-berlin" />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BestDogParksBerlin;
