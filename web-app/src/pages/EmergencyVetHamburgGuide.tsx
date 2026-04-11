import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogSidebar from '../components/BlogSidebar';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import { generateArticleSchema } from '../utils/schema';

const EmergencyVetHamburgGuide: React.FC = () => {
    const publishDate = '2026-06-02';
    
    const schema = generateArticleSchema(
        'Emergency Vets in Hamburg: 24-Hour English-Speaking Clinics',
        'Pet emergency in Hamburg? Find 24-hour English-speaking vet services, learn the emergency system, what to say when you call, and what it will cost.',
        'https://englishspeakinggermany.online/blog/emergency-vet-hamburg-english',
        publishDate
    );

    return (
        <div className="min-h-screen flex flex-col font-sans bg-secondary/20">
            <Helmet>
                <title>Emergency Vets in Hamburg: 24-Hour English-Speaking Clinics | English Speaking Vets</title>
                <meta name="description" content="Pet emergency in Hamburg? Find 24-hour English-speaking vet services, learn the emergency system, what to say when you call, and what it will cost." />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/emergency-vet-hamburg-english" />
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
                            EMERGENCY GUIDE
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            Emergency Vets in Hamburg: 24/7 English-Speaking Clinics
                        </h1>

                        <div className="flex items-center text-primary/60 text-sm mb-12 space-x-4">
                            <span className="flex items-center">
                                📅 Published: June 2026
                            </span>
                        </div>

                        <div className="bg-secondary/30 p-6 rounded-2xl mb-12 hidden md:block border border-primary/10">
                            <TableOfContents items={[
                                { id: 'what-counts', label: '1. What Counts as a Pet Emergency?' },
                                { id: 'system', label: '2. Hamburg\'s Emergency Vet System' },
                                { id: '24h-vets', label: '3. Verified 24-Hour Emergency Vets in Hamburg' },
                                { id: 'getting-there', label: '4. Getting to Emergency Care' },
                                { id: 'what-to-say', label: '5. What to Say When You Call' },
                                { id: 'costs', label: '6. Emergency Vet Costs' },
                                { id: 'checklist', label: '7. The One Thing to Do Right Now' }
                            ]} />
                        </div>

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl">
                                Hamburg at 2am. Your cat jumped from the balcony and is limping badly. Your dog ate something on the Alster path and is now retching and won't settle. Your rabbit is lying on its side.
                            </p>
                            <p>
                                Whatever it is, you need a vet tonight, and you need one who speaks English.
                            </p>
                            <p><strong>Bookmark this page now. Before you need it.</strong></p>

                            <hr className="my-8 border-primary/10" />

                            <h2 id="what-counts" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🚨 1. What Counts as a Pet Emergency?</h2>
                            <p>If in doubt, call. But here is a quick guide to help you decide how urgently you need to move:</p>

                            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-red-700 mb-3">🚨 Go now, do not wait</h3>
                                    <ul className="space-y-1.5 text-sm text-red-800">
                                        {[
                                            'Difficulty breathing, choking, open-mouth breathing (cats)',
                                            'Collapse, inability to stand, sudden paralysis',
                                            'Suspected poisoning',
                                            'Seizures (especially if lasting over 2 mins)',
                                            'Suspected broken bone',
                                            'Eye injury or sudden loss of vision',
                                            'Bloated, distended, or hard abdomen',
                                            'Cats straining to urinate with no output',
                                            'Uncontrolled bleeding',
                                            'Dark brown or red urine (possible Babesiosis)',
                                        ].map(s => <li key={s} className="flex items-start gap-1.5"><span className="text-red-500 mt-0.5">•</span>{s}</li>)}
                                    </ul>
                                </div>
                                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                                    <h3 className="font-bold text-yellow-700 mb-3">⏳ Can wait until morning</h3>
                                    <ul className="space-y-1.5 text-sm text-yellow-800">
                                        {[
                                            'Single vomiting episode with no blood',
                                            'Mild diarrhoea, eating and drinking normally',
                                            'Minor limp, not bearing weight but no obvious injury',
                                            'Small cut or graze that has stopped bleeding',
                                            'Ear scratching or mild head shaking',
                                        ].map(s => <li key={s} className="flex items-start gap-1.5"><span className="text-yellow-500 mt-0.5">•</span>{s}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <h2 id="system" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🏥 2. Hamburg's Emergency Vet System</h2>
                            <p>Hamburg operates a rotating emergency duty system (<em>tierärztlicher Bereitschaftsdienst</em>) alongside several permanent 24-hour animal hospitals.</p>
                            
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li><strong>Permanent 24-hour clinics (Tierkliniken):</strong> Fully staffed around the clock (multiple vets, surgical facilities, ICU). Best option for serious emergencies.</li>
                                <li><strong>Rotating duty service (Notfalldienst):</strong> Outside of hours, general practices take turns. The number is typically listed on your regular vet's answering machine. <strong>Always listen to the full voicemail.</strong></li>
                            </ul>

                            <h2 id="24h-vets" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🩺 3. Verified 24-Hour Emergency Vets in Hamburg</h2>
                            <p>The following tierkliniken are confirmed 24/7 in our directory. Always call ahead to confirm.</p>
                            
                            <div className="space-y-3 my-6 not-prose">
                                {[
                                    { name: 'Kleintierklinik im Mühlenfeld', district: 'Eidelstedt', phone: '040 5700568', add: 'Im Mühlenfeld 23' },
                                    { name: 'Tierklinik Fuhlsbüttel', district: 'Fuhlsbüttel', phone: '040 592859', add: 'Farnstraße 41' },
                                    { name: 'Tierklinik Lademannbogen', district: 'Hummelsbüttel', phone: '040 5209096', add: 'Wilhelm-Stein-Weg 2' }
                                ].map(clinic => (
                                    <div key={clinic.name} className="bg-white p-5 rounded-xl border border-primary/10 flex items-start gap-4">
                                        <span className="text-2xl mt-0.5">🏥</span>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-primary text-sm">{clinic.name}</h3>
                                            <p className="text-primary/60 text-xs mt-0.5">{clinic.add} ({clinic.district})</p>
                                            <a href={`tel:${clinic.phone.replace(/\s/g,'')}`} className="inline-flex items-center gap-1.5 mt-2 text-accent font-bold text-sm hover:underline">
                                                📞 {clinic.phone}
                                            </a>
                                        </div>
                                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full shrink-0">24/7</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-accent/10 p-5 rounded-xl border border-accent/20 my-6 not-prose">
                                <Link to="/vets/hamburg" className="inline-flex items-center gap-2 mt-3 bg-accent text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-primary transition-colors">
                                    See all verified English-speaking Hamburg vets →
                                </Link>
                            </div>

                            <h2 id="getting-there" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">🚗 4. Getting to Emergency Care</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 my-6 not-prose">
                                {[
                                    { icon: '🚗', title: 'By car', desc: 'The fastest option. Pick your nearest clinic early.' },
                                    { icon: '🚇', title: 'By U-Bahn', desc: 'Dogs travel free in Hamburg (with caveats). Take a taxi if severely ill.' },
                                    { icon: '🚕', title: 'By taxi', desc: 'Bolt and Uber usually take pets—let the driver know.' },
                                    { icon: '⛴️', title: 'By ferry', desc: 'HVV night ferries allow dogs. Great if south of the Elbe.' },
                                ].map(item => (
                                    <div key={item.title} className="bg-white p-4 rounded-xl border border-primary/10">
                                        <div className="text-2xl mb-1">{item.icon}</div>
                                        <div className="font-bold text-sm">{item.title}</div>
                                        <div className="text-xs text-primary/70">{item.desc}</div>
                                    </div>
                                ))}
                            </div>

                            <h2 id="what-to-say" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">📞 5. What to Say When You Call</h2>
                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-6 not-prose">
                                <h3 className="font-bold text-primary mb-3">Key German phrases:</h3>
                                <div className="space-y-2">
                                    {[
                                        ['Mein Hund/Katze hat einen Notfall', 'My dog/cat has an emergency'],
                                        ['Ist jemand da, der Englisch spricht?', 'Is there someone who speaks English?'],
                                        ['Kommen Sie sofort', 'Come immediately (do not delay)'],
                                        ['Warten Sie bis morgen', 'Wait until tomorrow'],
                                    ].map(([de, en]) => (
                                        <div key={de} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                            <span className="text-accent font-bold text-sm min-w-[200px] italic">{de}</span>
                                            <span className="text-primary/70 text-sm">{en}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 id="costs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">💶 6. Emergency Vet Costs</h2>
                            <p>Regulated by the GOT, out-of-hours consultations carry significant surcharges. Emergency base consultation is around <strong>€80 to €200</strong> just to be seen (depending on time of night). With blood work and fluids, expect a minimum of €200-400.</p>
                            <p><strong>Payment is required immediately.</strong> Keep your itemised invoice (<em>Rechnung mit Gebührenpositionen</em>) if you plan to submit to insurance.</p>

                            <h2 id="checklist" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">✅ 7. The One Thing to Do Right Now</h2>
                            <p>Save the number of your nearest Hamburg 24-hour clinic as "Emergency Vet HH" in your phone right now.</p>

                        </div>

                        <hr className="my-12 border-primary/10" />
                        <RelatedPosts currentPath="/blog/emergency-vet-hamburg-english" />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmergencyVetHamburgGuide;
