import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function PetFriendlyApartments() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            <Helmet>
                <title>Finding a Pet-Friendly Apartment in Germany (2025) | Rights & Tips</title>
                <meta name="description" content="Apartment hunting with a dog or cat in Berlin, Hamburg, or Frankfurt? Learn your legal rights, how to build a “Pet Resume,” and which districts are truly pet-friendly in 2025." />
                <meta name="keywords" content="Finding a pet-friendly apartment in Germany, German rental law pets 2025, dog-friendly neighborhoods Berlin, pet resume for landlords Germany, cat ownership rental laws Germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/pet-friendly-apartments-germany-2025" />
            </Helmet>

            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#F5EBE0]/90 backdrop-blur-md border-b border-primary/10 p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <img src="/logo.png" alt="EnglishSpeakingVets Logo" className="h-12 w-auto" />
                        <span className="hidden sm:inline">EnglishSpeaking<span className="text-accent">Vets</span></span>
                    </Link>
                    <div className="flex gap-4 text-sm font-semibold text-primary/70">
                        <Link to="/" className="hover:text-accent transition-colors">Directory</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6 md:p-12">
                <article className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-primary/5">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-primary/40 mb-6 font-medium">
                        <Link to="/" className="hover:text-accent">Home</Link>
                        <span>/</span>
                        <span className="text-primary/60">Expat Resources</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                        🏠 Finding a Pet-Friendly Apartment in Berlin, Hamburg & Frankfurt (2025)
                    </h1>

                    <div className="prose prose-lg text-primary/80 max-w-none">
                        <p className="text-xl leading-relaxed opacity-90 mb-8 border-l-4 border-accent pl-4 italic">
                            Let’s be honest: finding an apartment in Germany right now is brutal. Add a dog or a cat to the mix, and it can feel like you’re trying to win the lottery while wearing a blindfold.
                        </p>

                        <p>
                            Landlords ghost you. Viewing appointments disappear. And your perfect flat slips away the moment you mention a pet in your first email.
                        </p>

                        <p>
                            But here’s the hobbyist’s secret: <strong>German rental law is actually more pet-friendly than most people think.</strong> Landlords can’t simply blanket-ban pets anymore. With the right strategy — and a bit of expat charm — you can find a home for your whole pack.
                        </p>

                        <hr className="my-8 border-primary/10" />

                        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">Your Legal Rights: What Landlords Can (and Can’t) Do</h2>
                        <p>
                            In 2013, Germany’s Federal Court of Justice (<em>Bundesgerichtshof – BGH</em>) made a landmark ruling: general blanket bans on dogs and cats in rental contracts are invalid.
                        </p>

                        <h3 className="text-xl font-bold text-primary mt-6 mb-2">🐹 Small Pets (No Permission Needed)</h3>
                        <p>
                            Hamsters, fish, birds, guinea pigs, and similar small animals are considered part of “normal use” of an apartment. <strong>You do not need permission to keep them.</strong>
                        </p>

                        <h3 className="text-xl font-bold text-primary mt-6 mb-2">🐕 Cats & Dogs (Permission Required — But…)</h3>
                        <p>
                            Yes, you need written permission for dogs and cats.
                            However, a landlord must assess each case individually and cannot refuse without an <strong>objective, reasonable justification</strong>.
                        </p>
                        <p>Valid reasons may include:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>A very large dog in a very small apartment</li>
                            <li>An excessive number of animals</li>
                            <li>Proven past issues (noise, damage) in the building</li>
                        </ul>
                        <p>What doesn’t count: vague fears, stereotypes, or “I just don’t like dogs.”</p>

                        <div className="bg-red-50 p-6 rounded-xl border border-red-100 my-8">
                            <h3 className="text-lg font-bold text-red-800 mb-2">💸 The “Pet Rent” Trap</h3>
                            <p className="text-sm text-red-900/80 mb-4">Be careful here.</p>
                            <p className="text-sm text-red-900/80">
                                In recent years, German courts have increasingly ruled that monthly “pet rent” surcharges (e.g. +€15–€30 per month) are often unenforceable, since normal pet ownership is already covered by the base rent.
                            </p>
                            <p className="text-sm text-red-900/80 mt-2">
                                Landlords <strong>may</strong>, however:
                            </p>
                            <ul className="list-disc pl-5 text-sm text-red-900/80 mt-1">
                                <li>Ask for a higher security deposit (within legal limits)</li>
                                <li>Set clear conditions for keeping the pet</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">The “Pet Resume”: Your Secret Weapon</h2>
                        <p>
                            In a market where 40–60 people apply for one apartment, you need to present yourself as the <strong>Responsible Expat™</strong>, not a risk.
                        </p>
                        <p>Create a simple one-page PDF and attach it once interest is shown.</p>

                        <h3 className="text-lg font-bold text-primary mt-6 mb-3">What to Include</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">📸</span>
                                <div>
                                    <strong>A high-quality photo</strong>
                                    <p className="text-sm opacity-80">Your pet looking calm, clean, and non-chaotic.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">⭐</span>
                                <div>
                                    <strong>The gold standard: a landlord reference</strong>
                                    <p className="text-sm opacity-80">A short note like: <em>“Tenant lived here for 2 years with a dog. No damage. No noise complaints.”</em> This is often more convincing than income statements.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🛡️</span>
                                <div>
                                    <strong>Insurance proof</strong>
                                    <p className="text-sm opacity-80">Attach your <em>Hundehaftpflichtversicherung</em> certificate. It reassures landlords that any damage is covered by insurance, not your wallet.</p>
                                </div>
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-primary mt-12 mb-6">Best Pet-Friendly Districts (2025–2026)</h2>

                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-primary/5 p-4 rounded-xl">
                                <h3 className="font-bold text-accent mb-2">Berlin 🐕</h3>
                                <ul className="text-sm space-y-2">
                                    <li><strong>Prenzlauer Berg:</strong> Stroller capital, dog-friendly cafés everywhere</li>
                                    <li><strong>Neukölln (Schillerkiez):</strong> Direct access to Tempelhofer Feld’s fenced dog areas</li>
                                    <li><strong>Grunewald:</strong> Ideal for nature-loving, off-leash dogs</li>
                                </ul>
                            </div>
                            <div className="bg-primary/5 p-4 rounded-xl">
                                <h3 className="font-bold text-accent mb-2">Hamburg ⚓</h3>
                                <ul className="text-sm space-y-2">
                                    <li><strong>Altona:</strong> Close to Elbe beaches like Falkensteiner Ufer</li>
                                    <li><strong>Eimsbüttel:</strong> Green, quiet, and park-heavy</li>
                                </ul>
                            </div>
                            <div className="bg-primary/5 p-4 rounded-xl">
                                <h3 className="font-bold text-accent mb-2">Frankfurt 🏙️</h3>
                                <ul className="text-sm space-y-2">
                                    <li><strong>Nordend & Bornheim:</strong> Community-oriented, tree-lined streets</li>
                                    <li><strong>Sachsenhausen:</strong> Long riverside walks along the Main</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-xs text-center opacity-60 italic">(Pet-friendly doesn’t mean guaranteed — but these areas are known to be more accepting.)</p>

                        <h2 className="text-2xl font-bold text-primary mt-10 mb-4">The Hobbyist Strategy: How to Apply</h2>
                        <ol className="list-decimal pl-5 space-y-2 mb-6 font-medium">
                            <li>Don’t hide the pet. <span className="font-normal opacity-80">Sneaking one in can justify termination later.</span></li>
                            <li>Lead with the resume, not the request.</li>
                            <li>Offer reassurance, not arguments.</li>
                        </ol>

                        <p className="mb-4">If a landlord hesitates, try:</p>
                        <blockquote className="border-l-4 border-accent pl-4 italic bg-white py-2 mb-6">
                            “I’m happy to bring my dog to the viewing so you can see how calm they are.”
                        </blockquote>

                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 my-8">
                            <h3 className="text-lg font-bold text-green-800 mb-2">🌳 Bonus Tip: Check Dog Zones Early</h3>
                            <p className="text-sm text-green-900/80 mb-2">Some parks have strict no-dogs or leash-only rules. Before committing to a flat, check:</p>
                            <ul className="list-disc pl-5 text-sm text-green-900/80">
                                <li>“Hundeauslaufzonen” (off-leash areas)</li>
                                <li>Local district rules</li>
                                <li>Apps like <em>Dog’s Places</em> or city park maps</li>
                            </ul>
                        </div>

                        <hr className="my-8 border-primary/10" />

                        <div className="bg-secondary p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4">🏠 A Note from the Sofa</h3>
                            <p className="mb-4">
                                I know the search is exhausting. I’ve spent those same nights refreshing ImmoScout24 with a cat asleep on my feet, wondering if we’d ever find a place.
                            </p>
                            <p className="mb-6">
                                But hang in there. Once you find that pet-friendly landlord, life in Germany becomes incredible for animals. Most Germans genuinely love pets — it’s just the paperwork that’s a little stiff.
                            </p>

                            <div className="bg-white p-6 rounded-xl border border-primary/10 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg mb-1">Settled in and need a check-up?</h4>
                                    <p className="text-sm opacity-80">Check our Directory of English-Speaking Vets to find a friendly face in your new neighborhood.</p>
                                </div>
                                <Link to="/" className="whitespace-nowrap px-6 py-3 bg-primary text-secondary rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    Find a Vet Near Me
                                </Link>
                            </div>
                        </div>

                    </div>
                </article>
            </main>

            {/* Footer */}
            <footer className="bg-primary text-secondary py-12 text-center text-sm mt-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-center gap-6 font-semibold mb-4">
                        <Link to="/" className="hover:text-accent transition-colors">Directory</Link>
                        <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                        <Link to="/impressum" className="hover:text-accent transition-colors">Impressum</Link>
                        <Link to="/privacy" className="hover:text-accent transition-colors">Privacy</Link>
                    </div>
                    <p className="opacity-60">© 2025 EnglishSpeakingVets.online • Made with ❤️ for pets.</p>
                </div>
            </footer>
        </div>
    );
}
