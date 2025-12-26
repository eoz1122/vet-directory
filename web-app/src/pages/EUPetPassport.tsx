import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function EUPetPassport() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            <Helmet>
                <title>EU Pet Passports: Why You Need One and How to Get It | EnglishSpeakingVets</title>
                <meta name="description" content="Living in Germany? Learn how to get an EU Pet Passport for your dog or cat. Valid indefinitely for travel across Europe. Step-by-step guide for expats in 2025." />
                <meta name="keywords" content="EU pet passport Germany, pet passport Berlin, pet passport Hamburg, EU pet travel, dog passport Europe, cat passport EU, pet travel Europe, rabies vaccination EU" />
                <meta property="og:title" content="EU Pet Passports: The Ultimate Freedom Pass for Expat Pet Owners" />
                <meta property="og:description" content="Your health certificate expires. An EU Pet Passport doesn't. Here's how to get one in Germany and travel freely across Europe." />
                <meta property="og:type" content="article" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/eu-pet-passport-germany-2025" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            EU Pet Passports: <br />Why You Need One and How to Get It
                        </h1>

                        <TableOfContents items={[
                            { id: 'what-is-it', label: 'What Is an EU Pet Passport?' },
                            { id: 'why-need-one', label: 'Why You Need One (vs. Certificates)' },
                            { id: 'cost', label: 'How Much Does It Cost? (2025)' },
                            { id: 'how-to', label: 'How to Get One (Step-by-Step)' },
                            { id: 'tapeworm', label: 'Special Rule: The Tapeworm Treatment' },
                            { id: 'travel-back', label: 'Traveling to UK/USA?' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                You've made it to Germany. You cleared customs with your pet's health certificate, survived the flight, and finally collapsed on your new sofa with your furry companion. Congratulations!
                            </p>
                            <p>
                                But here's what many people don't realize during the move: that expensive health certificate you used to enter the EU is <strong>only valid for 10 days for entry</strong>, and up to 4 months for onward travel within the EU (or until the rabies vaccination expires — whichever comes first). If you want to travel freely around Europe — weekend trips to Paris, Christmas markets in Austria, or summer holidays in Spain — you'll need an <strong>EU Pet Passport</strong>.
                            </p>
                            <p>
                                Trust me: you want this little blue book. It's the ultimate freedom pass for expat pet owners.
                            </p>

                            <div className="bg-primary/5 p-8 rounded-2xl shadow-sm my-8 border border-primary/10 not-prose">
                                <h2 id="what-is-it" className="text-2xl font-bold text-primary mb-4 mt-0 scroll-mt-24">What Is an EU Pet Passport?</h2>
                                <p className="text-primary/80">
                                    The EU Pet Passport is your pet's official travel document for movement within the European Union and certain neighbouring countries.
                                </p>
                                <p className="text-primary/80">
                                    It's a standardized booklet (most are blue, though older maroon versions are still valid) and it contains:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mb-0 text-primary/80">
                                    <li>Your pet's microchip number</li>
                                    <li>Physical description and owner contact details</li>
                                    <li>Official rabies vaccination records (the most important part)</li>
                                    <li>Space for clinical exams and tapeworm treatments</li>
                                </ul>
                                <p className="mt-4 mb-0 text-primary/80">
                                    Think of it as your pet's permanent ID and vaccination record rolled into one. Border officials, vets, and airlines across Europe recognize it instantly.
                                </p>
                            </div>

                            <h2 id="why-need-one" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Why You Need One (and Why It Beats Health Certificates)</h2>
                            <p>
                                Imagine you're living in <Link to="/vets/berlin" className="text-accent hover:underline">Berlin</Link> and decide to drive to Prague for the weekend.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <h3 className="text-lg font-bold text-red-800 mb-2 mt-0">❌ With a Health Certificate:</h3>
                                    <p className="text-sm text-red-900/80 mb-0">
                                        You'd need a vet appointment, pay €100+, and obtain a new certificate issued within 10 days of travel — <strong>every single time</strong>.
                                    </p>
                                </div>

                                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                                    <h3 className="text-lg font-bold text-green-800 mb-2 mt-0">✅ With an EU Pet Passport:</h3>
                                    <p className="text-sm text-green-900/80 mb-0">
                                        You grab the leash, pack some kibble, and go.
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-2">The Real Benefits</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Valid indefinitely</strong> — as long as rabies boosters are kept up to date</li>
                                <li><strong>Spontaneous travel</strong> across most of Europe</li>
                                <li><strong>Cost-effective</strong> — a one-time fee instead of repeated certificates</li>
                            </ul>

                            <h2 id="cost" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">How Much Does It Cost?</h2>
                            <p>In 2025, expect to pay approximately:</p>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 my-6 not-prose">
                                <ul className="list-none pl-0 space-y-2 mb-4 text-primary/80">
                                    <li><strong>Passport booklet:</strong> €30–€50</li>
                                    <li><strong>Mandatory exam:</strong> €20–€40</li>
                                </ul>
                                <p className="text-lg font-bold text-accent mb-0">
                                    Total: Most owners spend €60–€90 if vaccinations are already current.
                                </p>
                            </div>

                            <h2 id="how-to" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">How to Get an EU Pet Passport (Step by Step)</h2>

                            <div className="space-y-6 my-8 not-prose">
                                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-accent">
                                    <h3 className="text-lg font-bold mb-2 mt-0">Step 1: Check the Microchip</h3>
                                    <p className="text-sm mb-0 text-primary/80">
                                        Your pet must have an ISO-compliant 15-digit microchip. The vet will scan it to confirm it matches your entry paperwork.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-accent">
                                    <h3 className="text-lg font-bold mb-2 mt-0">Step 2: The Rabies Rule</h3>
                                    <p className="text-sm mb-0 text-primary/80">
                                        Your pet must have a valid rabies vaccination given <strong>after</strong> microchipping. If your entry health certificate is still valid, the vet can usually transfer that information directly into the passport.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-accent">
                                    <h3 className="text-lg font-bold mb-2 mt-0">Step 3: Find a Local Vet</h3>
                                    <p className="text-sm mb-3 text-primary/80">
                                        You'll need to explain your pet's history and documents, so working with a vet who speaks your language makes the process much easier.
                                    </p>
                                    <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-primary font-semibold text-sm">
                                        🔗 Browse our Directory of English-Speaking Vets in Germany
                                    </Link>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-accent">
                                    <h3 className="text-lg font-bold mb-2 mt-0">Step 4: The Appointment</h3>
                                    <p className="text-sm mb-3"><strong>Bring:</strong></p>
                                    <ul className="list-disc pl-5 text-sm space-y-1 mb-3 text-primary/80">
                                        <li>Your pet</li>
                                        <li>Your ID</li>
                                        <li>All vaccination records</li>
                                        <li>The health certificate used to enter Germany</li>
                                    </ul>
                                    <p className="text-sm mb-0 text-primary/80">
                                        The vet will scan the microchip, verify vaccinations, and usually issue the passport on the spot.
                                    </p>
                                </div>
                            </div>

                            <h2 id="tapeworm" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">⚠️ Special Requirements: The "Tapeworm Rule"</h2>
                            <p>
                                Some countries have additional rules even with a passport.
                            </p>
                            <p className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-sm text-yellow-900/80">
                                If you're traveling with a dog to <strong>Ireland, Malta, Finland, or Norway</strong>, your dog must receive a tapeworm treatment from a vet <strong>1–5 days before entry</strong>. This treatment must be recorded and stamped in the passport.
                            </p>

                            <h2 id="travel-back" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Can I Travel Back to the UK or the US with an EU Pet Passport?</h2>

                            <div className="space-y-6 my-8 not-prose">
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-bold mb-2 mt-0">🇺🇸 To the United States</h3>
                                    <p className="text-sm mb-0 text-primary/80">
                                        <strong>Yes</strong> — the EU Pet Passport is accepted as valid proof of rabies vaccination for non-commercial entry. However, US CDC rules still apply, and additional documentation may be required depending on origin and species.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-bold mb-2 mt-0">🇬🇧 To the United Kingdom</h3>
                                    <p className="text-sm mb-0 text-primary/80">
                                        <strong>Yes</strong>. The UK accepts EU-issued pet passports for entry from the EU. Dogs must still receive a tapeworm treatment 1–5 days before entry, recorded by an EU vet.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#1B4332] text-[#F5EBE0] p-8 rounded-2xl my-16 relative overflow-hidden not-prose">
                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold text-accent mb-4 mt-0">🐾 The Bottom Line</h2>
                                    <p className="text-lg leading-relaxed opacity-90">
                                        If you plan to live in Germany for more than a few months, the EU Pet Passport is one of the smartest investments you can make. It turns cross-border travel from a bureaucratic headache into a simple grab-and-go routine.
                                    </p>
                                    <div className="mt-8 pt-6 border-t border-[#F5EBE0]/20">
                                        <p className="font-bold mb-2">Need a vet to issue your passport?</p>
                                        <p className="text-sm opacity-80 mb-4">Browse our city guides to find an expat-friendly clinic today:</p>
                                        <div className="flex flex-wrap gap-2">
                                            <Link to="/vets/berlin" className="text-sm px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-full transition-colors">
                                                English-Speaking Vets in Berlin
                                            </Link>
                                            <Link to="/vets/hamburg" className="text-sm px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-full transition-colors">
                                                English-Speaking Vets in Hamburg
                                            </Link>
                                            <Link to="/vets/frankfurt" className="text-sm px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded-full transition-colors">
                                                English-Speaking Vets in Frankfurt
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-12 border-primary/10" />

                            <section className="text-sm text-primary/60 not-prose">
                                <h3 className="font-bold text-primary mb-4 text-base">📚 Official Sources</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><a href="https://food.ec.europa.eu/animals/movement-pets_en" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">European Commission – Travelling with Pets</a></li>
                                    <li><a href="https://www.cdc.gov/importation/bringing-an-animal-into-the-united-states/dogs.html" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">US CDC – Bringing a Dog into the United States</a></li>
                                    <li><a href="https://www.gov.uk/bring-pet-to-great-britain" target="_blank" rel="nofollow noopener noreferrer" className="hover:text-accent underline decoration-dotted">UK Government – Bringing Your Pet to Great Britain</a></li>
                                </ul>
                            </section>
                        </div>

                        <RelatedPosts currentPath="/blog/eu-pet-passport-germany-2025" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
