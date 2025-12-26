import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function PetFriendlyApartments() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Finding a Pet-Friendly Apartment in Germany (2025) | Rights & Tips</title>
                <meta name="description" content="Apartment hunting with a dog or cat in Berlin, Hamburg, or Frankfurt? Learn your legal rights, how to build a “Pet Resume,” and which districts are truly pet-friendly in 2025." />
                <meta name="keywords" content="Finding a pet-friendly apartment in Germany, German rental law pets 2025, dog-friendly neighborhoods Berlin, pet resume for landlords Germany, cat ownership rental laws Germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/pet-friendly-apartments-germany-2025" />
            </Helmet>

            {/* Header */}
            {/* Header */}
            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            🏠 Finding a Pet-Friendly Apartment in Berlin, Hamburg & Frankfurt (2025)
                        </h1>

                        <TableOfContents items={[
                            { id: 'legal-rights', label: 'Your Legal Rights: What Landlords Can Do' },
                            { id: 'pet-resume', label: 'The "Pet Resume": Your Secret Weapon' },
                            { id: 'best-districts', label: 'Best Pet-Friendly Districts (2025)' },
                            { id: 'strategy', label: 'How to Apply: The Strategy' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Let’s be honest: finding an apartment in Germany right now is brutal. Add a dog or a cat to the mix, and it can feel like you’re trying to win the lottery while wearing a blindfold.
                            </p>

                            <p>
                                Landlords ghost you. Viewing appointments disappear. And your perfect flat slips away the moment you mention a pet in your first email.
                            </p>

                            <p>
                                But here’s the hobbyist’s secret: <strong>German rental law is actually more pet-friendly than most people think.</strong> Landlords can’t simply blanket-ban pets anymore. With the right strategy — and a bit of expat charm — you can find a home for your whole pack.
                            </p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="legal-rights" className="text-2xl font-bold text-primary mt-10 mb-4 scroll-mt-24">Your Legal Rights: What Landlords Can (and Can’t) Do</h2>
                            <div className="bg-white p-6 rounded-xl border border-primary/5 shadow-sm my-6 not-prose">
                                <p className="mb-4">
                                    In 2013, Germany’s Federal Court of Justice (<em>Bundesgerichtshof – BGH</em>) made a landmark ruling: general blanket bans on dogs and cats in rental contracts are invalid.
                                </p>

                                <h3 className="text-xl font-bold text-primary mt-6 mb-2">🐹 Small Pets (No Permission Needed)</h3>
                                <p className="mb-4">
                                    Hamsters, fish, birds, guinea pigs, and similar small animals are considered part of “normal use” of an apartment. <strong>You do not need permission to keep them.</strong>
                                </p>

                                <h3 className="text-xl font-bold text-primary mt-6 mb-2">🐕 Cats & Dogs (Permission Required — But…)</h3>
                                <p className="mb-2">
                                    Yes, you need written permission for dogs and cats.
                                    However, a landlord must assess each case individually and cannot refuse without an <strong>objective, reasonable justification</strong>.
                                </p>
                                <p className="text-sm font-bold text-primary/70 uppercase tracking-widest mt-4 mb-2">Valid Reasons for Refusal:</p>
                                <ul className="list-disc pl-5 space-y-1 mb-6 text-sm">
                                    <li>A very large dog in a very small apartment</li>
                                    <li>An excessive number of animals</li>
                                    <li>Proven past issues (noise, damage) in the building</li>
                                </ul>
                                <p className="text-sm italics opacity-70">What doesn’t count: vague fears, stereotypes, or “I just don’t like dogs.”</p>
                            </div>

                            <div className="bg-accent/10 p-6 rounded-xl border-l-4 border-accent my-8 not-prose">
                                <h3 className="text-lg font-bold text-primary mb-2">💸 The “Pet Rent” Trap</h3>
                                <p className="text-sm text-primary/80 mb-4">Be careful here.</p>
                                <p className="text-sm text-primary/80">
                                    In recent years, German courts have increasingly ruled that monthly “pet rent” surcharges (e.g. +€15–€30 per month) are often unenforceable, since normal pet ownership is already covered by the base rent.
                                </p>
                                <p className="text-sm text-primary/80 mt-2 font-bold">
                                    Landlords MAY, however:
                                </p>
                                <ul className="list-disc pl-5 text-sm text-primary/80 mt-1">
                                    <li>Ask for a higher security deposit (within legal limits)</li>
                                    <li>Set clear conditions for keeping the pet</li>
                                </ul>
                            </div>

                            <h2 id="pet-resume" className="text-2xl font-bold text-primary mt-10 mb-4 scroll-mt-24">The “Pet Resume”: Your Secret Weapon</h2>
                            <p>
                                In a market where 40–60 people apply for one apartment, you need to present yourself as the <strong>Responsible Expat™</strong>, not a risk.
                            </p>
                            <p>Create a simple one-page PDF and attach it once interest is shown.</p>

                            <div className="bg-primary/5 p-8 rounded-xl my-8 not-prose">
                                <h3 className="text-lg font-bold text-primary mt-0 mb-6 uppercase tracking-widest text-center">What to Include</h3>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-full shadow-sm text-2xl">📸</div>
                                        <div>
                                            <strong className="block text-primary text-lg">A high-quality photo</strong>
                                            <p className="text-sm text-primary/70">Your pet looking calm, clean, and non-chaotic. No muddy park photos.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-full shadow-sm text-2xl">⭐</div>
                                        <div>
                                            <strong className="block text-primary text-lg">The gold standard: a landlord reference</strong>
                                            <p className="text-sm text-primary/70">A short note like: <em>“Tenant lived here for 2 years with a dog. No damage. No noise complaints.”</em> This is often more convincing than income statements.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-white p-3 rounded-full shadow-sm text-2xl">🛡️</div>
                                        <div>
                                            <strong className="block text-primary text-lg">Insurance proof</strong>
                                            <p className="text-sm text-primary/70">Attach your <em>Hundehaftpflichtversicherung</em> certificate. It reassures landlords that any damage is covered by insurance, not your wallet.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <h2 id="best-districts" className="text-2xl font-bold text-primary mt-12 mb-6 scroll-mt-24">Best Pet-Friendly Districts (2025–2026)</h2>

                            <div className="grid md:grid-cols-3 gap-4 mb-8 not-prose">
                                <div className="bg-white border border-primary/10 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-accent mb-3 text-lg">Berlin 🐕</h3>
                                    <ul className="text-sm space-y-3 text-primary/80">
                                        <li><strong>Prenzlauer Berg:</strong> Stroller capital, dog-friendly cafés everywhere</li>
                                        <li><strong>Neukölln:</strong> Direct access to Tempelhofer Feld’s fenced dog areas</li>
                                        <li><strong>Grunewald:</strong> Ideal for nature-loving, off-leash dogs</li>
                                    </ul>
                                </div>
                                <div className="bg-white border border-primary/10 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-accent mb-3 text-lg">Hamburg ⚓</h3>
                                    <ul className="text-sm space-y-3 text-primary/80">
                                        <li><strong>Altona:</strong> Close to Elbe beaches like Falkensteiner Ufer</li>
                                        <li><strong>Eimsbüttel:</strong> Green, quiet, and park-heavy</li>
                                    </ul>
                                </div>
                                <div className="bg-white border border-primary/10 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-accent mb-3 text-lg">Frankfurt 🏙️</h3>
                                    <ul className="text-sm space-y-3 text-primary/80">
                                        <li><strong>Nordend:</strong> Community-oriented, tree-lined streets</li>
                                        <li><strong>Sachsenhausen:</strong> Long riverside walks along the Main</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-xs text-center opacity-60 italic">(Pet-friendly doesn’t mean guaranteed — but these areas are known to be more accepting.)</p>

                            <h2 id="strategy" className="text-2xl font-bold text-primary mt-10 mb-4 scroll-mt-24">The Hobbyist Strategy: How to Apply</h2>
                            <ol className="list-decimal pl-5 space-y-2 mb-6 font-medium">
                                <li>Don’t hide the pet. <span className="font-normal opacity-80">Sneaking one in can justify termination later.</span></li>
                                <li>Lead with the resume, not the request.</li>
                                <li>Offer reassurance, not arguments.</li>
                            </ol>

                            <p className="mb-4">If a landlord hesitates, try:</p>
                            <blockquote className="border-l-4 border-accent pl-4 italic bg-white py-4 pr-4 rounded-r-lg shadow-sm text-primary/80">
                                “I’m happy to bring my dog to the viewing so you can see how calm they are.”
                            </blockquote>

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8 not-prose">
                                <h3 className="text-lg font-bold text-primary mb-2">🌳 Bonus Tip: Check Dog Zones Early</h3>
                                <p className="text-sm text-primary/80 mb-2">Some parks have strict no-dogs or leash-only rules. Before committing to a flat, check:</p>
                                <ul className="list-disc pl-5 text-sm text-primary/80">
                                    <li>“Hundeauslaufzonen” (off-leash areas)</li>
                                    <li>Local district rules</li>
                                    <li>Apps like <em>Dog’s Places</em> or city park maps</li>
                                </ul>
                            </div>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-16 relative overflow-hidden not-prose">
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold text-accent mb-4 mt-0">🏠 A Note from the Sofa</h3>
                                    <p className="text-lg leading-relaxed opacity-90 mb-6">
                                        I know the search is exhausting. I’ve spent those same nights refreshing ImmoScout24 with a cat asleep on my feet, wondering if we’d ever find a place. But hang in there. Once you find that pet-friendly landlord, life in Germany becomes incredible for animals.
                                    </p>

                                    <div className="bg-white/10 p-6 rounded-xl border border-white/10 flex flex-col md:flex-row items-center gap-6">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg mb-1 text-white">Settled in and need a check-up?</h4>
                                            <p className="text-sm opacity-80 text-white/80">Check our Directory of English-Speaking Vets to find a friendly face in your new neighborhood.</p>
                                        </div>
                                        <Link to="/" className="whitespace-nowrap px-6 py-3 bg-accent text-primary rounded-xl font-bold hover:bg-white transition-colors shadow-lg">
                                            Find a Vet Near Me
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/pet-friendly-apartments-germany-2025" />
                    </article>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
