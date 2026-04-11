import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

export default function FirstVetVisitGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>What to Expect at Your First Vet Visit in Germany | EnglishSpeakingVets</title>
                <meta name="description" content="Your first German vet visit doesn't have to be stressful. Here's exactly what to expect, from paperwork to payment, as an English-speaking expat." />
                <meta name="keywords" content="first vet visit germany expat, german vet appointment, english speaking vet germany, vet visit germany english, german veterinary care expat" />
                <meta property="og:title" content="What to Expect at Your First Vet Visit in Germany" />
                <meta property="og:description" content="From booking your appointment to paying the bill - a clear, step-by-step guide for English-speaking expats at their first German vet visit." />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content="https://englishspeakinggermany.online/blog/first-vet-visit-germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/first-vet-visit-germany" />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(
                        "What to Expect at Your First Vet Visit in Germany",
                        "Your first German vet visit doesn't have to be stressful. Here's exactly what to expect, from paperwork to payment, as an English-speaking expat.",
                        "https://englishspeakinggermany.online/blog/first-vet-visit-germany",
                        "2026-04-14"
                    ))}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Vet Care Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            What to Expect at Your First Vet Visit in Germany
                        </h1>

                        <TableOfContents items={[
                            { id: 'finding', label: '1. Finding the Right Practice' },
                            { id: 'appointment', label: '2. Making the Appointment' },
                            { id: 'what-to-bring', label: '3. What to Bring' },
                            { id: 'consultation', label: '4. The Consultation' },
                            { id: 'vaccinations', label: '5. Vaccinations - What\'s Standard' },
                            { id: 'payment', label: '6. Payment' },
                            { id: 'after', label: '7. After the Visit' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                You've survived the Anmeldung. You've decoded the recycling bins. You carry cash everywhere now. And then your dog starts limping, your cat can't stop sneezing, or you've just arrived and need to get your pet into the system.
                            </p>
                            <p><strong>Welcome to your first German vet visit.</strong></p>
                            <p>
                                German veterinary care is genuinely excellent - well-equipped, properly regulated, high standards. But it works differently from the UK, the US, Australia, or wherever home used to be. Here's exactly what to expect.
                            </p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="finding" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🔍 Step 1: Finding the Right Practice</h2>
                            <p>
                                Before anything else, you need a vet who actually speaks English, not just one who "has some English" but freezes when you describe symptoms.
                            </p>
                            <p>
                                That's exactly what our directory is for. Every practice listed on EnglishSpeakingVets has been community-verified by other English-speaking expats who have successfully communicated in English there. Not Google-translated, not assumed. Verified.
                            </p>
                            <div className="bg-accent/10 p-6 rounded-xl border border-accent/20 my-6 not-prose">
                                <p className="font-bold text-primary mb-3">Find a verified English-speaking vet in your city:</p>
                                <div className="flex flex-wrap gap-2">
                                    {['berlin', 'hamburg', 'munich', 'frankfurt', 'cologne', 'stuttgart'].map(city => (
                                        <Link key={city} to={`/vets/${city}`} className="px-4 py-2 bg-white rounded-lg border border-accent/20 text-accent font-bold text-sm hover:bg-accent hover:text-white transition-colors capitalize">
                                            {city.charAt(0).toUpperCase() + city.slice(1)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <h2 id="appointment" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📞 Step 2: Making the Appointment</h2>
                            <p>
                                Most German vets require an appointment (<em>Termin</em>). Walk-ins are generally only accepted for emergencies.
                            </p>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10 my-6 not-prose">
                                <h3 className="font-bold text-primary mb-3">When you call:</h3>
                                <ul className="space-y-2 text-primary/80">
                                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Have your pet's name, species, breed, and age ready</li>
                                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Briefly describe the issue: "My dog has been limping on his front left leg for two days"</li>
                                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Ask directly: "Do you have English-speaking staff?" Even if the practice is listed here, confirm which vet will see you</li>
                                    <li className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span> Ask about approximate wait times. Some practices are very busy and a first appointment might be a week away</li>
                                </ul>
                            </div>
                            <p>
                                <strong>Can't face the phone?</strong> Many practices now accept appointment requests via email or an online form. If your German is limited, a brief email in English is almost always fine.
                            </p>

                            <h2 id="what-to-bring" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🎒 Step 3: What to Bring</h2>
                            <p>Unlike in some countries, German vets don't automatically have access to your pet's previous records. Bring everything you have:</p>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-primary/10 my-6 not-prose space-y-4">
                                {[
                                    { label: 'EU Pet Passport (EU-Heimtierausweis)', desc: 'Or the equivalent from your home country. Contains vaccination records, microchip number, and rabies titre test results. If you don\'t have one yet, your new vet can issue a German one.' },
                                    { label: 'Previous vet records', desc: 'Even if in English. German vets can read English medical records, and having a history of vaccinations, surgeries, or chronic conditions is genuinely useful.' },
                                    { label: 'Microchip documentation', desc: 'If you have a separate certificate.' },
                                    { label: 'Your insurance policy number', desc: 'If you have pet health insurance in Germany. Most practices expect you to pay upfront and claim back yourself; they don\'t bill insurers directly.' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-start gap-3">
                                        <span className="text-accent text-lg mt-0.5">✓</span>
                                        <div>
                                            <p className="font-bold text-primary text-sm">{item.label}</p>
                                            <p className="text-primary/70 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p>
                                If this is your pet's very first vet visit in Germany and you've just arrived, don't panic if you have nothing. The vet will start fresh; they're used to new arrivals.
                            </p>

                            <h2 id="consultation" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🩺 Step 4: The Consultation</h2>
                            <p>
                                <strong>The waiting room</strong> is usually shared between dogs and cats (unlike some countries that separate them). Keep your dog on a short leash and cats in their carrier until called.
                            </p>
                            <p>
                                <strong>The examination</strong> follows the same general pattern as anywhere: the vet will check weight, temperature, eyes, ears, teeth, coat, abdomen, and the specific area of concern. They'll ask questions. Answer as clearly as you can. If something is lost in translation, ask them to rephrase.
                            </p>
                            <p><strong>A few things that may surprise you:</strong></p>
                            <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                                {[
                                    { title: 'No nurse/technician in the room', desc: 'In many smaller German practices, the vet works alone or with one assistant. More intimate than the multi-person consultations common in UK or US clinics.' },
                                    { title: 'More conservative with medication', desc: 'Germany has strict rules around antibiotic use in animals. Don\'t be alarmed if the vet opts for watchful waiting over immediately prescribing something.' },
                                    { title: 'Diagnostic costs quoted upfront', desc: 'If the vet wants bloodwork or X-rays, they should tell you the cost first. You can always ask: "Wie viel kostet das?" (How much does that cost?)' },
                                    { title: 'No automatic yearly reminders', desc: 'In Germany it\'s largely your responsibility to track when vaccinations and check-ups are due. Your EU Pet Passport is your record.' },
                                ].map(item => (
                                    <div key={item.title} className="bg-white p-5 rounded-xl border border-primary/10">
                                        <h3 className="font-bold text-primary text-sm mb-1">{item.title}</h3>
                                        <p className="text-primary/70 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 id="vaccinations" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">💉 Step 5: Vaccinations - What's Standard in Germany</h2>
                            <p>German vaccination schedules may differ slightly from what your pet had at home. Here's the typical baseline:</p>
                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-white p-6 rounded-xl border border-primary/10">
                                    <h3 className="font-bold text-primary mb-3">🐕 Dogs</h3>
                                    <ul className="space-y-2 text-sm text-primary/80">
                                        <li><strong>SHPPi combo</strong> (Distemper, Parvovirus, Hepatitis): core, annual or triennial</li>
                                        <li><strong>Rabies</strong>: required for international travel; strongly recommended otherwise</li>
                                        <li><strong>Leptospirosis (Lepto)</strong>: strongly recommended in Germany; annual</li>
                                        <li><strong>Kennel cough (Zwingerhusten)</strong>: required by most boarding facilities</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-primary/10">
                                    <h3 className="font-bold text-primary mb-3">🐱 Cats</h3>
                                    <ul className="space-y-2 text-sm text-primary/80">
                                        <li><strong>Cat flu combo</strong> (Calicivirus, Herpesvirus, Panleukopaenie): core</li>
                                        <li><strong>Rabies</strong>: recommended; required for travel</li>
                                        <li><strong>FeLV (Feline Leukaemia)</strong>: recommended for outdoor cats</li>
                                    </ul>
                                </div>
                            </div>
                            <p>If your pet is up to date from home, bring those records. The vet will advise whether any boosters are needed to align with the German schedule.</p>

                            <h2 id="payment" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">💶 Step 6: Payment</h2>
                            <p>
                                <strong>Germany is still very much a cash-friendly country</strong>, and many smaller vet practices prefer it, or charge a small surcharge for card payments. Ask when you book if you're unsure.
                            </p>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <h3 className="font-bold text-primary mb-3">The GOT fee schedule</h3>
                                <p className="text-sm text-primary/80 mb-3">Vet fees in Germany are regulated by the <em>Gebuhrenordnung fur Tierarzte</em> (GOT), a national fee schedule that sets the minimum and standard rates.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-secondary p-3 rounded-lg text-center">
                                        <p className="text-xs text-primary/60 uppercase tracking-wider">Basic consultation</p>
                                        <p className="font-bold text-primary">€15-25</p>
                                    </div>
                                    <div className="bg-secondary p-3 rounded-lg text-center">
                                        <p className="text-xs text-primary/60 uppercase tracking-wider">Full visit</p>
                                        <p className="font-bold text-primary">€40-80</p>
                                    </div>
                                </div>
                            </div>
                            <p>
                                <strong>Pet insurance:</strong> If you have a German health insurance policy for your pet, you'll almost always pay upfront and submit a claim afterwards. Keep all receipts and the itemised invoice (<em>Rechnung</em>) - you'll need the specific procedure codes for reimbursement.
                            </p>

                            <h2 id="after" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">✅ Step 7: After the Visit - What to Ask For</h2>
                            <p>Ask for:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>A copy of the itemised invoice (essential for insurance claims)</li>
                                <li>Any updated entries in your EU Pet Passport (especially if vaccinations were given)</li>
                                <li>Written follow-up instructions if your pet was prescribed medication or a special diet</li>
                                <li>The direct number or email for the practice in case of follow-up questions</li>
                            </ul>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-12 relative overflow-hidden not-prose">
                                <h2 className="text-2xl font-bold text-accent mb-4 mt-0">Register Before You Need To</h2>
                                <p className="opacity-90 leading-relaxed">
                                    The best time to find a vet is before there's an emergency. Book a routine check-up within your first month in Germany. It establishes your pet as a patient, gets you into the system, and means you have a trusted practice to call when something goes wrong at short notice.
                                </p>
                                <p className="opacity-90 leading-relaxed mt-4">
                                    Practices are often reluctant to see animals they've never met before in urgent situations, especially if they're at capacity. Being an existing patient makes a real difference.
                                </p>
                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <Link to="/" className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg">
                                        <span>🐾</span> Find a Vet in Your City
                                    </Link>
                                </div>
                            </div>

                            <p className="text-sm italic opacity-70 not-prose">
                                Have you already been to a German vet with your pet? Know a practice that speaks excellent English?{' '}
                                <Link to="/contact?topic=submit_vet" className="text-accent underline hover:text-primary">Submit a listing</Link>
                            </p>
                        </div>

                        <RelatedPosts currentPath="/blog/first-vet-visit-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
