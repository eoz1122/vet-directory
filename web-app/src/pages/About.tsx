import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary relative overflow-hidden">

            {/* Header / Nav */}
            {/* Header / Nav */}
            <Header />

            <main className="max-w-3xl mx-auto p-6 md:p-12 space-y-16 relative z-10">

                {/* Hero Section */}
                <section className="text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                            Our Mission & The Pack
                        </h1>
                        <p className="text-xl text-primary/70 max-w-2xl mx-auto font-serif italic">
                            "We believe that language should never be a barrier to love."
                        </p>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-xl rotate-1 hover:rotate-0 transition-transform duration-500 max-w-2xl mx-auto border-4 border-white/50">
                        <img
                            src="/images/about-hero.png"
                            alt="Expat owner hugging dog in Berlin"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white text-left">
                            <p className="text-sm font-medium">Tempelhofer Feld, Berlin</p>
                        </div>
                    </div>
                </section>

                {/* Our Story: Born on a Sofa */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">🏠</span>
                        <h2 className="text-3xl font-bold text-primary">Our Story: Born on a Sofa, Not in a Boardroom</h2>
                    </div>

                    <div className="prose prose-lg text-primary/80">
                        <p className="leading-relaxed">
                            We aren't a big agency, a tech company, or a "startup" trying to change the world. We’re just expats who live here, just like you—the kind who still sometimes trip over the grammar in a German grocery store.
                        </p>
                        <p className="leading-relaxed mt-4 font-semibold">
                            This project didn't come from a business meeting. It came from a very bad Tuesday.
                        </p>
                        <p className="leading-relaxed mt-4">
                            I was standing in a vet’s office with my best friend curled into a shivering ball in my arms. While my heart was pounding, I was frantically typing symptoms into a translation app, trying to explain that they weren't just "tired"—something was wrong. My hands were shaking so hard I could barely hit the right keys. In that moment, the panic of a pet emergency felt ten times heavier because I couldn't find the words to ask for help.
                        </p>
                        <p className="leading-relaxed mt-4">
                            That night, after we were finally home and safe, I couldn't sleep. I realized that this "expat panic" is universal. I spent my weekends digging through old forums, scrolling past dead links in Facebook groups, and asking neighbors for the names of vets they actually trusted.
                        </p>
                        <p className="leading-relaxed mt-4">
                            I started a spreadsheet just for myself. Then, I shared it with a friend. Then, I realized that spreadsheet needed a home.
                        </p>
                        <p className="leading-relaxed mt-4">
                            So, I built this. This is a passion project, built late at night on the sofa with a cold cup of coffee after the "real" job is done. I do it because I believe no pet owner should ever feel "lost in translation" when their best friend is hurting.
                        </p>
                    </div>
                </section>

                {/* The Mission */}
                <section className="space-y-6 bg-white/60 p-8 rounded-2xl border border-primary/5 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">🌉</span>
                        <h2 className="text-3xl font-bold text-primary">The Mission: Just a Helping Hand</h2>
                    </div>

                    <p className="text-lg leading-relaxed text-primary/80">
                        This site isn't about monetization or "scaling." It’s about building a bridge.
                    </p>
                    <ul className="space-y-4 mt-4 text-primary/80 list-none">
                        <li className="flex gap-3">
                            <span className="text-2xl mt-1">🩺</span>
                            <div>
                                <strong>We aren't medical experts:</strong> We’re just researchers. We spend our spare time looking for "English signals"—a bilingual website, a friendly receptionist, or a glowing review from another expat.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-2xl mt-1">🤝</span>
                            <div>
                                <strong>We’re a community effort:</strong> This site is kept alive by people like you. If you found a vet who was patient with your language barrier, tell us. If you found an old address, help us fix it.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* The Why */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">❤️</span>
                        <h2 className="text-3xl font-bold text-primary">The "Why"</h2>
                    </div>

                    <div className="prose prose-lg text-primary/80">
                        <p className="text-lg leading-relaxed font-medium italic">
                            We do this to make the transition to life in Germany just a little bit softer for the people (and the paws) who come after us.
                        </p>
                        <p className="mt-4 leading-relaxed">
                            Our mission is simple: to ensure every expat companion in Germany gets the care they deserve. We aren't doing this alone—this site is built by the hands and hearts of the community. Every new vet added and every detail updated is a step toward the most complete resource for our little friends.
                        </p>
                    </div>
                </section>

                {/* Meet the Team (Happiness Officer) */}
                <section className="space-y-8 text-center pt-8 border-t border-primary/10">
                    <h2 className="text-3xl font-bold text-primary">Meet the Team</h2>

                    <div className="inline-block bg-white p-6 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 border border-primary/5">
                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-accent/20">
                            <img
                                src="/images/cho.png"
                                alt="Chief Happiness Officer Cat"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-primary">Mochi</h3>
                        <p className="text-accent font-bold text-sm uppercase tracking-wide mb-2">Chief Happiness Officer</p>
                        <p className="text-primary/60 text-sm italic">
                            "Specializes in keyboard walking <br />and motivational purring."
                        </p>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
