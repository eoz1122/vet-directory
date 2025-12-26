import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function GermanVetPhrases() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            <Helmet>
                <title>German Vet Survival Kit: Essential Phrases for Expats | EnglishSpeakingVets</title>
                <meta name="description" content="Learn the essential German words and phrases for visiting the vet with your pet. From making appointments to describing symptoms like Durchfall." />
                <meta name="keywords" content="German vet phrases, pet emergency German, German medical terms for dogs, expat guide Germany pets" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/german-vet-survival-kit-phrases" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Survival Kits</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-6 leading-tight">
                            Our Story: Why I Learned <br />„Durchfall“ the Hard Way
                        </h1>
                        <p className="text-xl text-primary/70 mt-4 mb-8 font-serif italic border-l-4 border-accent pl-4">
                            "Stress can make your brain go blank. This is the cheat sheet I keep on my own fridge."
                        </p>

                        <TableOfContents items={[
                            { id: 'survival-kit', label: '🩺 Vet Survival Kit' },
                            { id: 'making-appointments', label: '1. Making Appointments' },
                            { id: 'symptoms', label: '2. Describing Symptoms' },
                            { id: 'anatomy', label: '3. Anatomy Guide' },
                            { id: 'questions', label: '4. Essential Questions' },
                            { id: 'emergency-note', label: '💡 Emergency Note' },
                            { id: 'note-from-sofa', label: '🌉 A Note from the Sofa' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="lead text-lg">
                                In our <a href="/about" className="text-accent hover:underline">Origin Story</a>, I mentioned standing in a clinic trying to translate “lethargy” on a cracked phone screen while my pet stared at me like, “Please help me.”
                            </p>

                            <p>
                                That day, I realized something important: I didn’t need to be fluent in German — I just needed a survival kit of words.
                            </p>

                            <p className="bg-white p-6 rounded-xl border-l-4 border-accent shadow-sm italic my-8 text-primary/80">
                                Knowing how to say “He won’t eat” or “She’s limping” is the difference between a panicked 10-minute struggle and getting your pet the help they need right now.
                            </p>

                            <h2 id="survival-kit" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🩺 The Expat’s Vet Survival Kit: Essential German Phrases</h2>
                            <p>
                                Even if you’ve found a great practice through our <a href="/" className="text-accent hover:underline">Directory of English-Speaking Vets</a>, stress can make your brain go completely blank in a medical situation.
                            </p>

                            <h3 id="making-appointments" className="text-xl font-bold text-primary mt-8 mb-4 scroll-mt-24">1. The Basics: Making the Appointment</h3>
                            <p>
                                Most German vet practices prefer you to call ahead — even for urgent visits.
                            </p>
                            <ul className="bg-white p-6 rounded-xl list-none space-y-4 border border-primary/5 shadow-sm not-prose">
                                <li><strong>Ich möchte einen Termin vereinbaren.</strong><br /><span className="text-sm opacity-70">(I would like to make an appointment.)</span></li>
                                <li><strong>Es ist ein Notfall!</strong><br /><span className="text-sm opacity-70">(It’s an emergency!)</span></li>
                                <li><strong>Mein Hund / Meine Katze ist krank.</strong><br /><span className="text-sm opacity-70">(My dog / my cat is sick.)</span></li>
                                <li><strong>Wann können wir vorbeikommen?</strong><br /><span className="text-sm opacity-70">(When can we come by?)</span></li>
                            </ul>
                            <div className="my-6 p-4 bg-white rounded-lg border border-primary/10 not-prose">
                                <p className="m-0 text-sm">💡 <strong>Optional but helpful:</strong> <em>Sprechen Sie Englisch?</em> (Do you speak English?) Even if the answer is “a little,” vets will usually try.</p>
                            </div>

                            <h3 id="symptoms" className="text-xl font-bold text-primary mt-8 mb-4 scroll-mt-24">2. Describing the Symptoms (The “What’s Wrong?” List)</h3>
                            <p>
                                When the vet asks „Was fehlt dem Kleinen?“ (What’s wrong with the little one?) use these simple building blocks:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                                <div className="bg-white p-4 rounded-lg border border-primary/5 hover:border-accent/30 transition-colors">
                                    <p className="font-bold mb-1 text-primary">Fieber (fever)</p>
                                    <p className="text-sm opacity-70 italic">→ „Er hat Fieber.“</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-primary/5 hover:border-accent/30 transition-colors">
                                    <p className="font-bold mb-1 text-primary">Durchfall (diarrhea)</p>
                                    <p className="text-sm opacity-70 italic">→ Pronounced: DOORKH-fall</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-primary/5 hover:border-accent/30 transition-colors">
                                    <p className="font-bold mb-1 text-primary">Erbrechen (vomiting)</p>
                                    <p className="text-sm opacity-70 italic">→ „Er hat erbrochen.“</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-primary/5 hover:border-accent/30 transition-colors">
                                    <p className="font-bold mb-1 text-primary">Appetitlosigkeit (loss of appetite)</p>
                                    <p className="text-sm opacity-70 italic">→ „Sie frisst nicht.“ (She isn’t eating.)</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-primary/5 hover:border-accent/30 transition-colors">
                                    <p className="font-bold mb-1 text-primary">Humpeln / Hinken (limping)</p>
                                    <p className="text-sm opacity-70 italic">→ „Er hinkt seit gestern.“</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-primary/5 hover:border-accent/30 transition-colors">
                                    <p className="font-bold mb-1 text-primary">Juckreiz (itching)</p>
                                    <p className="text-sm opacity-70 italic">→ „Sie kratzt sich viel.“</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-primary/5 hover:border-accent/30 transition-colors">
                                    <p className="font-bold mb-1 text-accent">Lethargisch / Schlapp</p>
                                    <p className="text-sm opacity-70 italic">→ „Er ist sehr schlapp.“</p>
                                </div>
                            </div>

                            <h3 id="anatomy" className="text-xl font-bold text-primary mt-8 mb-4 scroll-mt-24">3. Anatomy: Where Does It Hurt?</h3>
                            <p>Pointing helps. These words help more.</p>
                            <ul className="grid grid-cols-2 gap-2 list-none pl-0 not-prose text-primary/80">
                                <li className="bg-white/50 px-3 py-2 rounded">🦴 <strong>Der Bauch</strong> (belly)</li>
                                <li className="bg-white/50 px-3 py-2 rounded">🐾 <strong>Die Pfote</strong> (paw)</li>
                                <li className="bg-white/50 px-3 py-2 rounded">👂 <strong>Das Ohr</strong> (ear)</li>
                                <li className="bg-white/50 px-3 py-2 rounded">👁️ <strong>Das Auge</strong> (eye)</li>
                                <li className="bg-white/50 px-3 py-2 rounded">🐕 <strong>Der Rücken</strong> (back)</li>
                            </ul>
                            <p className="mt-4 italic text-sm">💡 Example: „Hier, am Bauch.“ (Here, on the belly.)</p>

                            <h3 id="questions" className="text-xl font-bold text-primary mt-8 mb-4 scroll-mt-24">4. Essential Questions to Ask the Vet</h3>
                            <p>These are the questions that matter after the panic settles.</p>
                            <div className="space-y-4 not-prose">
                                <div className="p-4 bg-white rounded-lg border border-primary/5">
                                    <p className="font-bold m-0 italic text-primary">Ist es ansteckend?</p>
                                    <p className="text-sm m-0 opacity-70">(Is it contagious?)</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg border border-primary/5">
                                    <p className="font-bold m-0 italic text-primary">Braucht er eine Impfung?</p>
                                    <p className="text-sm m-0 opacity-70">(Does he need a vaccination?)</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg border border-primary/5">
                                    <p className="font-bold m-0 italic text-primary">Muss sie nüchtern bleiben?</p>
                                    <p className="text-sm m-0 opacity-70">(Does she need to stay fasted / no food?)</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg text-accent border border-accent/20">
                                    <p className="font-bold m-0">Nehmen Sie Kartenzahlung an?</p>
                                    <p className="text-sm m-0">(Do you accept card payment?)</p>
                                </div>
                            </div>
                            <p className="mt-6 text-sm bg-orange-50 p-4 border border-orange-200 rounded-lg text-orange-900 not-prose">
                                <strong>⚠️ Important:</strong> Many German vets accept only Girocard (EC-Karte) — not credit cards. Asking this early avoids an extra wave of stress.
                            </p>

                            <h3 id="emergency-note" className="text-xl font-bold text-primary mt-8 mb-4 scroll-mt-24">💡 Pro Tip: The “Emergency Note”</h3>
                            <p>If your hands are shaking, write down just three things before you leave the house:</p>
                            <ol className="bg-white p-6 rounded-xl border border-primary/5 space-y-4 not-prose">
                                <li><strong>Seit wann? (Since when?)</strong><br />→ „Seit zwei Tagen.“</li>
                                <li><strong>Was ist passiert? (What happened?)</strong><br />→ „Er hat Schokolade gefressen.“ (He ate chocolate.)</li>
                                <li><strong>Medikamente? (Current meds?)</strong><br />→ List anything your pet is already taking.</li>
                            </ol>

                            <h2 id="note-from-sofa" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🌉 A Note from the Sofa</h2>
                            <p>
                                You don’t need to be a linguist to be a great pet parent in Germany.
                                German vets are usually incredibly patient with expats — they see how much we care. Just having a few of these words ready shows you’re trying, and that goes a long way.
                            </p>
                            <p className="font-bold text-primary/80">
                                Found a word we missed? Send us a message, and we’ll add it to the kit.
                            </p>
                        </div>

                        <RelatedPosts currentPath="/blog/german-vet-survival-kit-phrases" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
