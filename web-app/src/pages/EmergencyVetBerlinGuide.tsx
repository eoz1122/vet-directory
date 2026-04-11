import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

export default function EmergencyVetBerlinGuide() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Emergency Vets in Berlin: 24-Hour English-Speaking Clinics | EnglishSpeakingVets</title>
                <meta name="description" content="Pet emergency in Berlin? Find 24-hour English-speaking vet clinics, learn what to say when you call, and know what it'll cost. For expat pet owners." />
                <meta name="keywords" content="emergency vet berlin english, 24 hour vet berlin, berlin emergency veterinary, notfalldienst berlin english, pet emergency berlin expat" />
                <meta property="og:title" content="Emergency Vets in Berlin: 24-Hour English-Speaking Clinics" />
                <meta property="og:description" content="Bookmark this before you need it. When your pet has an emergency at 11pm in Berlin, here's exactly what to do, who to call, and what it will cost." />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content="https://englishspeakinggermany.online/blog/emergency-vet-berlin-english" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/emergency-vet-berlin-english" />
                <script type="application/ld+json">
                    {JSON.stringify(generateArticleSchema(
                        "Emergency Vets in Berlin: 24-Hour English-Speaking Clinics",
                        "Pet emergency in Berlin? Find 24-hour English-speaking vet clinics, learn what to say when you call, and know what it'll cost.",
                        "https://englishspeakinggermany.online/blog/emergency-vet-berlin-english",
                        "2026-04-21"
                    ))}
                </script>
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Emergency Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                            🚨 Emergency Vets in Berlin: 24-Hour English-Speaking Clinics
                        </h1>

                        <TableOfContents items={[
                            { id: 'what-counts', label: '1. What Counts as a Pet Emergency?' },
                            { id: '24h-vets', label: '2. 24-Hour Emergency Vets in Berlin' },
                            { id: 'what-to-say', label: '3. What to Say When You Call' },
                            { id: 'getting-there', label: '4. Getting There' },
                            { id: 'costs', label: '5. What Emergency Vet Care Costs' },
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                It's 11pm. Your dog just ate something off the street and won't stop retching. Your cat is breathing oddly. Your rabbit hasn't moved in an hour.
                            </p>
                            <p>
                                This is not the moment to google in a panic, attempt to translate German vet websites, and wonder what "Notfalldienst" means.
                            </p>
                            <p><strong>Bookmark this page now. Before you need it.</strong></p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="what-counts" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🚨 1. What Counts as a Pet Emergency?</h2>
                            <p>Not every worrying symptom needs a midnight dash across Berlin. But some absolutely do.</p>

                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-red-700 mb-3">🚨 Go now - do not wait</h3>
                                    <ul className="space-y-1.5 text-sm text-red-800">
                                        {[
                                            'Difficulty breathing, choking, or blue/grey gums',
                                            'Collapse or inability to stand',
                                            'Suspected poisoning',
                                            'Seizures',
                                            'Suspected broken bone or severe injury',
                                            'Eye injury or sudden loss of vision',
                                            'Bloated, distended, or hard abdomen',
                                            'Suspected urinary blockage (cats)',
                                            'Uncontrolled bleeding',
                                            'Loss of consciousness',
                                        ].map(s => <li key={s} className="flex items-start gap-1.5"><span className="text-red-500 mt-0.5">•</span>{s}</li>)}
                                    </ul>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-yellow-700 mb-3">⏳ Can wait until morning (call first thing)</h3>
                                    <ul className="space-y-1.5 text-sm text-yellow-800">
                                        {[
                                            'Limping that isn\'t severe and leg isn\'t visibly deformed',
                                            'Vomiting once or twice with no blood',
                                            'Mild diarrhea',
                                            'A cut that has stopped bleeding',
                                            'Ear scratching or head shaking',
                                        ].map(s => <li key={s} className="flex items-start gap-1.5"><span className="text-yellow-500 mt-0.5">•</span>{s}</li>)}
                                    </ul>
                                    <p className="text-xs text-yellow-700 mt-3 italic">If you're unsure, call an emergency line and describe the symptoms.</p>
                                </div>
                            </div>

                            <h2 id="24h-vets" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🏥 2. Verified 24-Hour Emergency Vets in Berlin</h2>

                            <p>The following practices are confirmed 24/7 in our verified directory. Always call ahead to confirm - hours and on-call arrangements can change.</p>

                            <div className="space-y-3 my-6 not-prose">
                                {[
                                    { name: 'Klinik für kleine Haustiere (FU Berlin Small Animal Clinic)', district: 'Zehlendorf / Düppel', phone: '030 83862356', note: 'University clinic. Full surgical and ICU capability.' },
                                    { name: 'Valera Veterinary Clinic', district: 'Zehlendorf', phone: '030 201805750', note: 'English-speaking staff. Verified by expat community.' },
                                    { name: 'AniCura Tierklinik Berlin-Biesdorf', district: 'Biesdorf (East Berlin)', phone: null, note: 'Large-scale 24h animal hospital. Check website for current number.' },
                                    { name: 'The Berlin Veterinary Center (Dr. Rödiger)', district: 'Reinickendorf', phone: null, note: '24/7 confirmed. Check our directory for current contact.' },
                                    { name: 'Veterinary Practice Bärenwiese', district: 'Wilmersdorf', phone: '0174 1601606', note: 'Mobile number - call to confirm availability before travelling.' },
                                ].map(clinic => (
                                    <div key={clinic.name} className="bg-white p-5 rounded-xl border border-primary/10 flex items-start gap-4">
                                        <span className="text-2xl mt-0.5">🏥</span>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-primary text-sm">{clinic.name}</h3>
                                            <p className="text-primary/60 text-xs mt-0.5">{clinic.district}</p>
                                            {clinic.phone && (
                                                <a href={`tel:${clinic.phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-1.5 mt-2 text-accent font-bold text-sm hover:underline">
                                                    📞 {clinic.phone}
                                                </a>
                                            )}
                                            <p className="text-primary/60 text-xs mt-1 italic">{clinic.note}</p>
                                        </div>
                                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full shrink-0">24/7</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-accent/10 p-5 rounded-xl border border-accent/20 my-6 not-prose">
                                <p className="text-sm font-bold text-primary mb-1">Berlin Veterinary Emergency Network</p>
                                <p className="text-sm text-primary/70">Emergency duty (<em>tierarztlicher Bereitschaftsdienst</em>) rotates among registered practices by district. The current duty vet number is typically listed on your regular vet's answering machine. Always listen to the full voicemail.</p>
                                <Link to="/vets/berlin" className="inline-flex items-center gap-2 mt-3 bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                    See all verified emergency-capable Berlin vets →
                                </Link>
                            </div>

                            <h2 id="what-to-say" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📞 3. What to Say When You Call</h2>
                            <p>Even at an English-speaking practice, having this information ready will get your pet seen faster:</p>
                            <div className="bg-white p-6 rounded-xl border border-primary/10 my-6 not-prose space-y-3">
                                {[
                                    ['Species and breed', '"I have a 4-year-old male golden retriever"'],
                                    ['Weight', 'Helpful for dosing if medication is needed immediately'],
                                    ['Symptoms and when they started', '"He started vomiting about 90 minutes ago, three times, and now he\'s just lying down and won\'t get up"'],
                                    ['Any known ingestion', '"We were at the park and I think he ate something. I\'m not sure what."'],
                                    ['Vaccination and medication status', '"He\'s up to date on vaccinations and takes monthly flea/tick prevention"'],
                                    ['Your location', 'They\'ll tell you if you need to come to them or if there\'s a closer option'],
                                ].map(([label, example], i) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <span className="bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <div>
                                            <p className="font-bold text-primary text-sm">{label}</p>
                                            <p className="text-primary/60 text-sm italic">e.g. {example}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <h3 className="font-bold text-primary mb-3">Key German phrases to understand on the phone</h3>
                                <div className="space-y-2">
                                    {[
                                        ['Kommen Sie sofort', 'Come immediately'],
                                        ['Das ist ein Notfall', 'This is an emergency'],
                                        ['Warten Sie bis morgen', 'Wait until tomorrow (if they say this and you\'re unsure, describe the symptoms again)'],
                                        ['Wir haben keinen Notfalldienst', 'We don\'t have an emergency service (ask for the duty vet number)'],
                                    ].map(([de, en]) => (
                                        <div key={de} className="flex items-start gap-3">
                                            <span className="text-accent font-bold text-sm min-w-fit italic">{de}</span>
                                            <span className="text-primary/70 text-sm">{en}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 id="getting-there" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🚗 4. Getting There</h2>
                            <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
                                {[
                                    { icon: '🚗', mode: 'By car', desc: 'The fastest option if you have one. Berlin\'s 24-hour clinics are spread across the city, so find your nearest one before an emergency happens.' },
                                    { icon: '🚕', mode: 'By taxi/Uber', desc: 'Works well. Let the driver know you have a pet emergency; most will accommodate a carrier or a dog on a leash. Have the address ready.' },
                                    { icon: '🚇', mode: 'By U-Bahn/S-Bahn', desc: 'Dogs are allowed at any hour with a valid ticket. If your pet is seriously ill, take a taxi. You don\'t want to manage a sick animal on a crowded platform.' },
                                ].map(item => (
                                    <div key={item.mode} className="bg-white p-5 rounded-xl border border-primary/10">
                                        <p className="text-2xl mb-2">{item.icon}</p>
                                        <h3 className="font-bold text-primary text-sm mb-1">{item.mode}</h3>
                                        <p className="text-primary/70 text-sm">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 id="costs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">💶 5. What Emergency Vet Care Costs in Berlin</h2>
                            <p>Emergency vet care in Germany is regulated by the <em>Gebuhrenordnung fur Tierarzte</em> (GOT), but emergency surcharges apply outside of normal hours.</p>
                            <div className="my-6 not-prose overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-primary text-secondary">
                                            <th className="text-left p-3 rounded-tl-lg font-bold">Service</th>
                                            <th className="text-right p-3 rounded-tr-lg font-bold">Approx. Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {[
                                            ['Emergency consultation (out of hours)', '€80-150'],
                                            ['Blood panel / basic diagnostics', '€80-200'],
                                            ['X-ray', '€80-150'],
                                            ['IV fluids and hospitalisation (per night)', '€150-300'],
                                            ['Surgery (emergency, e.g. foreign body removal)', '€800-2,500+'],
                                            ['Intensive care (per day)', '€200-500'],
                                        ].map(([service, cost], i) => (
                                            <tr key={service} className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/50'}>
                                                <td className="p-3 border-b border-primary/5">{service}</td>
                                                <td className="p-3 border-b border-primary/5 text-right font-bold text-primary">{cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                <strong>Important:</strong> Emergency clinics in Germany typically require payment at the end of the visit, in full. Credit cards are widely accepted at larger clinics. If you have pet insurance, keep your policy number handy and ask for a detailed itemised invoice; you'll submit the claim yourself.
                            </p>
                            <p>
                                If cost is a concern, be upfront when you call. Veterinary social services and payment plans exist in Germany, though they vary by clinic.
                            </p>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-12 not-prose">
                                <h2 className="text-2xl font-bold text-accent mb-3 mt-0">Prevention: The Best Emergency Plan</h2>
                                <p className="opacity-90 leading-relaxed">
                                    The single best thing you can do right now, before any emergency, is to identify your nearest 24-hour vet clinic and save the number in your phone as "Emergency Vet Berlin."
                                </p>
                                <p className="font-bold text-accent mt-3">Do it tonight.</p>
                                <p className="opacity-90 leading-relaxed mt-3">
                                    And if you haven't yet found a regular vet who speaks English, establishing that relationship is your next step. Your regular vet knows your pet's history, which matters enormously in an emergency. Even if you end up at a different clinic, being able to share records speeds up treatment.
                                </p>
                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <Link to="/vets/berlin" className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg">
                                        Find a verified English-speaking vet in Berlin →
                                    </Link>
                                </div>
                            </div>

                            <p className="text-sm italic opacity-70 not-prose">
                                Know a 24-hour clinic in Berlin that belongs in this guide?{' '}
                                <Link to="/contact?topic=submit_vet" className="text-accent underline hover:text-primary">Tell us about it</Link>
                            </p>
                        </div>

                        <RelatedPosts currentPath="/blog/emergency-vet-berlin-english" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
