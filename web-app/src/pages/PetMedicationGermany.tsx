import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { appendUTM } from '../utils/url';

export default function PetMedicationGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>How to Get Pet Medication in Germany: The Complete Guide | EnglishSpeakingVets</title>
                <meta name="description" content="A complete guide to getting pet medication in Germany. Learn about prescriptions (Rezept), pharmacies (Apotheke), online pet pharmacies like Medpets, and how the German vet medication system works." />
                <meta name="keywords" content="pet medication Germany, dog medication Germany, cat medication Germany, veterinaray prescription Germany, Medpets Germany, Tierapotheke, apothekenpflichtig, rezeptpflichtig" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/pet-medication-germany-guide" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Health & Medication Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            💊 How to Get Pet Medication in Germany: <br />Your Complete Guide
                        </h1>

                        <TableOfContents items={[
                            { id: 'introduction', label: 'The Rules of the Game' },
                            { id: 'system', label: 'How the System Works' },
                            { id: 'vet-dispensed', label: 'Buying from Your Vet' },
                            { id: 'prescriptions', label: 'Getting a Prescription' },
                            { id: 'online-ordering', label: 'Ordering Online' },
                            { id: 'categories', label: 'Categories: OTC vs. Prescription' },
                            { id: 'apotheke', label: 'Using Human Pharmacies' },
                            { id: 'chronic', label: 'Saving on Chronic Meds' },
                            { id: 'emergency', label: 'Emergency Medication' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <h2 id="introduction" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24 text-center italic border-b border-primary/5 pb-6">
                                "In Germany, your vet is often both the doctor and the pharmacist. But knowing when to ask for a prescription can save you 40%."
                            </h2>

                            <p className="mb-6">
                                Your cat needs flea treatment. Your dog is on chronic medication for arthritis. Or your vet just prescribed antibiotics after surgery. Now you're standing outside the clinic wondering: where do I actually <em>get</em> this medication?
                            </p>

                            <p className="mb-8">
                                In Germany, the pet medication system works differently than in many other countries. Some meds you get directly from your vet, some you can order online, and some require prescriptions that you'll need to navigate carefully. It's not complicated once you understand the rules—but those rules aren't always obvious to expats.
                            </p>

                            <h2 id="system" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">The German System: How Pet Medication Works</h2>
                            <p>
                                In Germany, veterinarians have something called <strong>Dispensierrecht</strong> (dispensing right). This means your vet is legally allowed to stock, prescribe, and sell medications directly to you.
                            </p>

                            <div className="grid md:grid-cols-3 gap-6 my-12 not-prose">
                                <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                                    <h4 className="font-bold text-red-600 mb-2 uppercase text-xs tracking-widest">Prescription-Only</h4>
                                    <p className="text-[10px] uppercase font-black text-primary/40 mb-3 tracking-tighter">Verschreibungspflichtig</p>
                                    <p className="text-sm opacity-70">Antibiotics, strong pain meds, heart meds. <strong>MUST be picked up in person.</strong> Shipping is prohibited.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-accent/20 shadow-sm">
                                    <h4 className="font-bold text-accent mb-2 uppercase text-xs tracking-widest">Pharmacy-Only</h4>
                                    <p className="text-[10px] uppercase font-black text-primary/40 mb-3 tracking-tighter">Apothekenpflichtig</p>
                                    <p className="text-sm opacity-70">Flea/tick (Frontline), dewormers. No prescription needed, but <strong>only sold by pharmacies or vets.</strong></p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
                                    <h4 className="font-bold text-primary mb-2 uppercase text-xs tracking-widest">Over-the-Counter</h4>
                                    <p className="text-[10px] uppercase font-black text-primary/40 mb-3 tracking-tighter">Freiverkäuflich</p>
                                    <p className="text-sm opacity-70">Shampoos, basic supplements, grooming. <strong>Available everywhere</strong> (pet stores, DM, Amazon).</p>
                                </div>
                            </div>

                            <h2 id="vet-dispensed" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center text-primary">Getting Medication Directly from Your Vet</h2>
                            <p>
                                This is the most common way to get pet medication in Germany. Your vet examines your pet, prescribes treatment, and sells you the medication on the spot.
                            </p>

                            <div className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm my-8 not-prose">
                                <div className="grid md:grid-cols-2 gap-8 font-medium">
                                    <div>
                                        <h4 className="text-green-600 font-bold mb-4 uppercase text-xs tracking-widest">✅ The Pros</h4>
                                        <ul className="space-y-2 text-sm text-primary/70">
                                            <li>Immediate medication in hand</li>
                                            <li>Guaranteed authenticity</li>
                                            <li>Professional dosage guidance</li>
                                            <li>No paperwork needed</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-red-500 font-bold mb-4 uppercase text-xs tracking-widest">❌ The Cons</h4>
                                        <ul className="space-y-2 text-sm text-primary/70">
                                            <li>20-50% more expensive than online</li>
                                            <li>Limited to what's in stock</li>
                                            <li>No price comparison</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h2 id="prescriptions" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Getting a Prescription (Rezept)</h2>
                            <p>
                                If you want to order medication online to save money, you'll need a written prescription from your vet.
                            </p>

                            <div className="bg-primary text-secondary p-8 rounded-2xl my-10 not-prose">
                                <h3 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                                    <span className="text-2xl">🗣️</span> How to ask (The "Rezept" Phrase)
                                </h3>
                                <div className="space-y-6 italic">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest opacity-40 font-bold mb-1">In German:</p>
                                        <p className="text-lg font-bold">"Kann ich bitte ein Rezept für [Medikamentenname] haben? Ich möchte es online bestellen."</p>
                                        <p className="text-xs opacity-60">Pronounced: kahn ikh BIT-tuh ine reh-TSEPT foor... HAH-ben? Ikh MÖKH-tuh es online buh-SHTELL-en.</p>
                                    </div>
                                </div>
                            </div>

                            <p className="bg-accent/5 p-6 rounded-xl border border-accent/20 mb-8 font-bold text-primary">
                                💡 <strong>Cost Tip:</strong> German vets are legally allowed to charge a small fee (€5-15) for writing a prescription. It's still usually cheaper than buying the meds directly if the treatment is long-term.
                            </p>

                            <h2 id="online-ordering" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Ordering Pet Medication Online</h2>
                            <p>
                                Online pet pharmacies (Tierapotheken) in Germany can offer lower prices than vets for <strong>pharmacy-only (non-prescription) medications</strong>—often 20-40% cheaper!
                            </p>

                            <div className="bg-white border border-red-200 p-6 rounded-2xl mb-12 not-prose">
                                <h4 className="text-red-700 font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
                                    ⚠️ THE 1% EXCEPTION
                                </h4>
                                <p className="text-sm font-medium text-red-800/80">
                                    In Germany, <strong>shipping prescription veterinary medications directly to consumers is prohibited.</strong> You can order Pharmacy-Only (non-prescription) meds, but items like Antibiotics must be picked up in person from your vet or a local pharmacy.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-12 mb-6 not-prose">
                                <a href={appendUTM("https://www.medpets.de")} target="_blank" rel="noopener" className="bg-white p-6 rounded-2xl border-l-4 border-accent shadow-sm hover:translate-y-[-4px] transition-all group">
                                    <h4 className="font-bold text-primary text-xl group-hover:text-accent transition-colors">Medpets.de*</h4>
                                    <p className="text-xs opacity-50 mb-4">Largest Online Tierapotheke</p>
                                    <p className="text-sm opacity-70 mb-4 leading-relaxed">Huge selection, English customer service available, and free shipping over €49.</p>
                                    <span className="text-accent text-[10px] font-black uppercase tracking-widest">Visit Site →</span>
                                </a>
                                <a href={appendUTM("https://www.shop-apotheke.com")} target="_blank" rel="noopener" className="bg-white p-6 rounded-2xl border-l-4 border-primary shadow-sm hover:translate-y-[-4px] transition-all group">
                                    <h4 className="font-bold text-primary text-xl group-hover:text-accent transition-colors">Shop-Apotheke*</h4>
                                    <p className="text-xs opacity-50 mb-4">Fastest Delivery (App available)</p>
                                    <p className="text-sm opacity-70 mb-4 leading-relaxed">Wide selection of OTC and Pharmacy-only products. Often offers massive discounts for bulk orders.</p>
                                    <span className="text-accent text-[10px] font-black uppercase tracking-widest">Visit Site →</span>
                                </a>
                            </div>
                            <p className="text-[10px] opacity-40 italic mb-12">*Affiliate Link: This site may earn a commission from your purchase at no extra cost to you.</p>

                            <h2 id="categories" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">What You Can vs. Cannot Order</h2>
                            <p className="text-center font-bold text-lg mb-8 italic opacity-60">"Just because it doesn't need a prescription doesn't mean it's sold at your local pet shop."</p>

                            <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
                                <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                    <h4 className="font-black text-green-700 mb-4 uppercase tracking-tighter text-sm flex items-center gap-2">
                                        🚀 OK TO SHIP
                                    </h4>
                                    <ul className="space-y-3 text-sm font-bold text-green-800/70">
                                        <li>✅ Frontline / Advantix (Flea)</li>
                                        <li>✅ Seresto Collars</li>
                                        <li>✅ Joint Supplements (Gelenke)</li>
                                        <li>✅ Probiotics / Calming aids</li>
                                        <li>✅ Non-medicated ear cleaners</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                                    <h4 className="font-black text-red-700 mb-4 uppercase tracking-tighter text-sm flex items-center gap-2">
                                        📦 PROHIBITED TO SHIP
                                    </h4>
                                    <ul className="space-y-3 text-sm font-bold text-red-800/70">
                                        <li>❌ Antibiotics (All types)</li>
                                        <li>❌ Bravecto (Prescription Parasite)</li>
                                        <li>❌ Strong Pain Meds (Gabapentin)</li>
                                        <li>❌ Thyroid / Heart Meds</li>
                                        <li>❌ Steroids / Insulin</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 id="chronic" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Chronic Medications: How to Save</h2>
                            <p>
                                If your pet is on long-term medication (arthritis, thyroid, heart disease), the costs add up fast.
                            </p>
                            <div className="bg-white border border-primary/10 rounded-2xl overflow-hidden my-8 not-prose">
                                <div className="p-8 space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-xl shrink-0 font-black">1</div>
                                        <div>
                                            <p className="font-bold text-primary italic leading-tight text-lg underline mb-1">Ask for Generic</p>
                                            <p className="text-sm opacity-70">Ask your vet if there is a generic version (Generika) available. These are identical in active ingredients but often much cheaper.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 border-t border-primary/5 pt-6">
                                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-xl shrink-0 font-black">2</div>
                                        <div>
                                            <p className="font-bold text-primary text-lg italic mb-1">The "Bulk" Request</p>
                                            <p className="text-sm opacity-70">Ask for a larger pack size if the condition is chronic. The price per unit usually drops drastically for 3-month or 6-month supplies.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 border-t border-primary/5 pt-6">
                                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-xl shrink-0 font-black">3</div>
                                        <div>
                                            <p className="font-bold text-primary text-lg italic mb-1">Check Your Insurance</p>
                                            <p className="text-sm opacity-70">Many German pet insurance policies (like HanseMerkur or Allianz) cover up to 100% of prescribed medication. Always submit your invoices.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 id="emergency" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24 text-center">Emergency Medication: After-Hours</h2>
                            <p>
                                If your pet needs medication outside of normal vet hours, you have two real options:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="bg-primary p-6 rounded-2xl text-secondary">
                                    <h4 className="font-bold text-accent mb-2 flex items-center gap-2">🏪 Emergency Clinics</h4>
                                    <p className="text-xs opacity-70 leading-relaxed italic">They dispense immediately on the spot. Expect to pay a €50 emergency fee + a higher multiplier for the meds.</p>
                                </div>
                                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">💊 Human Notdienst</h4>
                                    <p className="text-xs opacity-70 leading-relaxed italic">Apotheke Notdienst can fill vet prescriptions IF the med is also used for humans (e.g. certain antibiotics). Call ahead first!</p>
                                </div>
                            </div>

                            <div className="bg-accent/10 p-8 rounded-2xl my-16 text-center shadow-lg border border-accent/20 not-prose">
                                <h3 className="text-2xl font-bold text-primary mb-4">Need a new prescription?</h3>
                                <p className="mb-8 text-primary/80 italic font-medium">
                                    Whether you need a refill for chronic meds or a one-time script for online savings, our network of English-speaking vets can help you navigate the paperwork.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Find a Vet for Prescriptions →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/pet-medication-germany-guide" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
