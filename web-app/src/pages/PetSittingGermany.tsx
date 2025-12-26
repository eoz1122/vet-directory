import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import TableOfContents from '../components/TableOfContents';

export default function PetSittingGermany() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-[#1B4332]">
            <Helmet>
                <title>Pet Sitting in Germany (2025): Finding a Safe Home for Your Little Friends</title>
                <meta name="description" content="A complete guide to finding pet sitters in Germany. Comparing Pawshake, Cat in a Flat, pensions, and community options for expats." />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/pet-sitting-germany-2025" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar */}
                    <BlogSidebar />

                    {/* Main Content */}
                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            🏡 Pet Sitting in Germany (2025): Finding a Safe Home for Your Little Friends
                        </h1>

                        <TableOfContents items={[
                            { id: 'options', label: '1. The Three Ways to Settle Your Pet' },
                            { id: 'costs', label: '2. What Does Pet Sitting Cost?' },
                            { id: 'legal', label: '3. Legal & Insurance (Don\'t Skip)' },
                            { id: 'checklist', label: '4. The Ultimate Checklist' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                You've finally booked that long-awaited trip home. Or maybe a spontaneous weekend in the Alps. The suitcase is out, the to-do list is shrinking... and then you feel it. Those big eyes. Watching you from the sofa. Judging you. Just a little.
                            </p>

                            <p className="mt-8">
                                For expats in Germany, finding trustworthy pet care is often more stressful than the actual move. You don't just want someone to feed your dog; you want someone who won't accidentally teach them bad habits or, worse, misunderstand a vet emergency because of a language barrier.
                            </p>

                            <h2 id="options" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">1. The Three Ways to Settle Your Pet</h2>

                            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                                <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
                                    <div className="text-4xl mb-4">📱</div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">The Apps</h3>
                                    <p className="text-sm text-primary/70 mb-4">Pawshake, Rover, Cat in a Flat.</p>
                                    <ul className="text-xs space-y-2 text-primary/60">
                                        <li className="flex gap-2">✅ Insured usually</li>
                                        <li className="flex gap-2">✅ Reviews visible</li>
                                        <li className="flex gap-2">❌ Quality varies widely</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
                                    <div className="text-4xl mb-4">🏨</div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">Professional Pensions</h3>
                                    <p className="text-sm text-primary/70 mb-4">"Hundepensionen" or "Katzenhotels".</p>
                                    <ul className="text-xs space-y-2 text-primary/60">
                                        <li className="flex gap-2">✅ Pros handle it</li>
                                        <li className="flex gap-2">✅ Reliable 24/7</li>
                                        <li className="flex gap-2">❌ Expensive & Kennel-like</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
                                    <div className="text-4xl mb-4">🤝</div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">Community Swap</h3>
                                    <p className="text-sm text-primary/70 mb-4">TrustedHousesitters or FB Groups.</p>
                                    <ul className="text-xs space-y-2 text-primary/60">
                                        <li className="flex gap-2">✅ Free / Low Cost</li>
                                        <li className="flex gap-2">✅ Home environment</li>
                                        <li className="flex gap-2">❌ Hard to find availability</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-primary mt-8 mb-4">Which one is right for you?</h3>
                            <p>
                                If you have an <strong>anxious dog</strong>, a loud "Hundepension" with 20 other barking dogs is probably hell on earth for them. Look for a 1-on-1 sitter on Rover or Pawshake.
                            </p>
                            <p>
                                If you have a <strong>cat</strong>, never move them to a pension unless absolutely necessary. Cats are territorial. Use <a href="https://catinaflat.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-bold">Cat in a Flat</a> or a neighbor check-in service.
                            </p>

                            <h2 id="costs" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">2. What Does Pet Sitting Cost in 2025?</h2>
                            <p>Prices have risen significantly in major cities like Berlin and Munich. Here are the realistic averages you should budget for:</p>

                            <ul className="space-y-4 my-6 list-none pl-0">
                                <li className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary/5">
                                    <span className="font-bold text-primary">Dog Day Care (Gassigehen)</span>
                                    <span className="font-mono text-accent font-bold">€15 - €25 / walk</span>
                                </li>
                                <li className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary/5">
                                    <span className="font-bold text-primary">Overnight Dog Sitting (Sitter's Home)</span>
                                    <span className="font-mono text-accent font-bold">€35 - €60 / night</span>
                                </li>
                                <li className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary/5">
                                    <span className="font-bold text-primary">Cat Visit (1x daily, 30 min)</span>
                                    <span className="font-mono text-accent font-bold">€15 - €20 / visit</span>
                                </li>
                                <li className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary/5">
                                    <span className="font-bold text-primary">Professional Hundepension</span>
                                    <span className="font-mono text-accent font-bold">€40 - €80 / night</span>
                                </li>
                            </ul>

                            <h2 id="legal" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">3. Legal & Insurance (Don't Skip)</h2>
                            <p>
                                German liability law (§ 833 BGB) states that YOU, the owner, are liable for damages caused by your animal, even if you are not there.
                            </p>
                            <div className="bg-red-50 border-l-4 border-red-400 p-6 my-6 rounded-r-lg">
                                <h4 className="font-bold text-red-800 mb-2">Scenario:</h4>
                                <p className="text-red-700 text-sm">
                                    Your dog pulls the leash out of the sitter's hand and causes a cyclist to fall. The cyclist breaks an arm. <strong>Your</strong> "Hundehaftpflichtversicherung" (Dog Liability Insurance) must cover this.
                                </p>
                            </div>
                            <p>
                                <strong>Crucial Step:</strong> Call your insurance provider and ask: <em>"Is 'Fremdhütung' (care by a third party) covered particularly if it is a paid service?"</em> Some basic policies exclude paid sitting!
                            </p>

                            <h2 id="checklist" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">4. The Ultimate Sitter Checklist</h2>
                            <p>Before you hand over the keys, print this out for your peace of mind:</p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-accent">
                                <li><strong>Emergency Vet Contact:</strong> Provide name, address, and Google Maps link.</li>
                                <li><strong>Payment Authorization:</strong> Tell your vet you are away and authorize the sitter to make medical decisions up to €500 (or your limit).</li>
                                <li><strong>Dietary Rules:</strong> "No table scraps" isn't enough. Be specific: "He is allergic to Chicken."</li>
                                <li><strong>Behavioral Triggers:</strong> "He hates postmen" or "Do not touch his tail."</li>
                                <li><strong>Passport:</strong> Leave the EU Pet Passport visible on the table.</li>
                            </ul>

                            <div className="mt-12 p-8 bg-secondary/30 rounded-2xl text-center">
                                <h3 className="text-2xl font-bold text-primary mb-4">Need a Vet while you're away?</h3>
                                <p className="mb-6 text-primary/70">
                                    Make sure your sitter knows where to go. Find a verified English-speaking vet near you.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-accent-dark text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Search Vet Directory
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/pet-sitting-germany-2025" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
