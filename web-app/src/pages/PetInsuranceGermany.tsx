import { Link } from 'react-router-dom';
import { trackAffiliateClick } from '../utils/analytics';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';

export default function PetInsuranceGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>Pet Insurance in Germany (2025): Do You Really Need It? | EnglishSpeakingVets</title>
                <meta name="description" content="A complete guide to German pet insurance. Understand Hundehaftpflicht (liability) vs Tierkrankenversicherung (health), costs, and the GOT fee schedule for 2025." />
                <meta name="keywords" content="pet insurance Germany, dog liability insurance Germany, Hundehaftpflichtversicherung, pet health insurance Germany, vet costs Germany GOT, Tierkrankenversicherung" />
                <link rel="canonical" href="https://englishspeakinggermany.online/blog/pet-insurance-germany-2025" />
            </Helmet>

            <Header />

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 max-w-4xl">
                        <span className="text-accent font-bold tracking-wider text-sm uppercase">Expat Bureaucracy Guide</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-8 leading-tight">
                            💰 Pet Insurance in Germany: <br />Do You Really Need It?
                        </h1>

                        <TableOfContents items={[
                            { id: 'two-types', label: 'The Two Types of Pet Insurance' },
                            { id: 'liability', label: '1. Liability Insurance (Mandatory?)' },
                            { id: 'liability-risk', label: 'The Financial Risk of No Liability' },
                            { id: 'health', label: '2. Health Insurance (The GOT Scale)' },
                            { id: 'costs', label: 'Real-World Cost Examples' },
                            { id: 'options', label: 'Surgery-Only vs. Full Health' },
                            { id: 'providers', label: 'Best Providers for Expats' },
                            { id: 'decision', label: 'Quick Decision Guide' }
                        ]} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-2 italic bg-accent/5 rounded-r-lg text-xl mb-8">
                                Let's cut to the chase. You're an expat in Germany, you've just adopted a dog or cat, and now someone's telling you that you need two different types of insurance. One's mandatory (maybe), one's optional (but recommended), and both have confusing German names that make your head spin.
                            </p>

                            <p className="mb-6">
                                Here's the simple answer: <strong>Yes, you need pet insurance.</strong> But not all of it, and not for the reasons you think. This is your no-nonsense guide to German pet insurance—what actually costs, and why a single emergency vet visit can bankrupt you without it.
                            </p>

                            <h2 id="two-types" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">The Two Types of Pet Insurance in Germany</h2>
                            <p>German pet insurance comes in two completely separate categories. Understanding the difference is critical:</p>

                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-2xl mb-4">🛡️</div>
                                    <h3 className="text-xl font-bold text-primary mb-2">Hundehaftpflicht</h3>
                                    <p className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Dog Liability Insurance</p>
                                    <ul className="space-y-2 text-sm text-primary/70">
                                        <li className="flex gap-2"><span>✅</span> Covers damage to OTHERS</li>
                                        <li className="flex gap-2"><span>⚖️</span> Legally mandatory in many states</li>
                                        <li className="flex gap-2"><span>💶</span> Cost: €40–€150 per year</li>
                                    </ul>
                                </div>
                                <div className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-2xl mb-4">🏥</div>
                                    <h3 className="text-xl font-bold text-primary mb-2">Tierkranken</h3>
                                    <p className="text-sm font-bold text-primary/40 uppercase tracking-widest mb-4">Pet Health Insurance</p>
                                    <ul className="space-y-2 text-sm text-primary/70">
                                        <li className="flex gap-2"><span>✅</span> Covers your pet's medical bills</li>
                                        <li className="flex gap-2"><span>🕊️</span> Always optional (but smart)</li>
                                        <li className="flex gap-2"><span>💶</span> Cost: €15–€80 per month</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="bg-primary/5 p-6 rounded-xl border border-primary/10 italic text-center">
                                "Think of it this way: <strong>Liability insurance</strong> protects YOUR wallet from lawsuits. <strong>Health insurance</strong> protects YOUR wallet from vet bills."
                            </p>

                            <h2 id="liability" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">1. Liability Insurance: The Mandatory Category</h2>
                            <p>Under German law (§ 833 BGB), dog owners are <strong>100% liable</strong> for any damage their dog causes—even if it was an accident or you had them on a leash.</p>

                            <div className="bg-white border border-primary/10 rounded-2xl overflow-hidden my-8 not-prose">
                                <div className="bg-primary p-4 text-white font-bold text-center uppercase tracking-widest text-sm">Mandatory for ALL dogs in:</div>
                                <div className="p-6 grid grid-cols-2 gap-4 text-center font-bold text-primary">
                                    <div className="bg-secondary p-3 rounded-lg border border-primary/5">Berlin</div>
                                    <div className="bg-secondary p-3 rounded-lg border border-primary/5">Hamburg</div>
                                    <div className="bg-secondary p-3 rounded-lg border border-primary/5">Lower Saxony</div>
                                    <div className="bg-secondary p-3 rounded-lg border border-primary/5">Saxony-Anhalt</div>
                                    <div className="bg-secondary p-3 rounded-lg border border-primary/5">Thuringia</div>
                                </div>
                                <div className="p-6 bg-accent/5 border-t border-primary/5 text-sm italic text-primary/70">
                                    In other states like Bavaria, Hesse, or NRW, it is mandatory only for "dangerous breeds" (Listenhunde), but highly recommended for everyone.
                                </div>
                            </div>

                            <h2 id="liability-risk" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">What's the real risk?</h2>
                            <p>There is <strong>no upper limit</strong> on liability claims in Germany. One serious incident can follow you for life.</p>

                            <div className="space-y-4 my-8 not-prose">
                                <div className="p-4 bg-white rounded-xl border-l-4 border-red-400 shadow-sm flex items-center gap-4">
                                    <span className="text-2xl">🚲</span>
                                    <div>
                                        <p className="font-bold text-primary leading-tight">Knocking over a cyclist</p>
                                        <p className="text-sm text-primary/60">Broken collarbone + lost income = €50,000+</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-xl border-l-4 border-red-500 shadow-sm flex items-center gap-4">
                                    <span className="text-2xl">🚗</span>
                                    <div>
                                        <p className="font-bold text-primary leading-tight">Causing a car accident</p>
                                        <p className="text-sm text-primary/60">Property damage + legal fees = €200,000+</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-xl border-l-4 border-red-600 shadow-sm flex items-center gap-4">
                                    <span className="text-2xl">🏥</span>
                                    <div>
                                        <p className="font-bold text-primary leading-tight">Serious dog bite</p>
                                        <p className="text-sm text-primary/60">Medical bills + therapy = €100,000+</p>
                                    </div>
                                </div>
                            </div>

                            <h2 id="health" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">2. Health Insurance: The GOT Fee Schedule</h2>
                            <p>Vet bills in Germany are non-negotiable. They follow a government-regulated price list called the <strong>Gebührenordnung für Tierärzte (GOT)</strong>.</p>
                            <p>Vets can charge 1× to 4× the base price depending on the time of day and complexity:</p>

                            <div className="overflow-hidden rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Situation</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Multiplier</th>
                                            <th className="p-4 font-bold text-sm uppercase tracking-widest">Example</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/5">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Routine Exam</td>
                                            <td className="p-4 text-primary/70">1–1.5×</td>
                                            <td className="p-4 text-accent font-bold">€11 – €17</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Standard Surgery</td>
                                            <td className="p-4 text-primary/70">2×</td>
                                            <td className="p-4 text-accent font-bold">€400 – €800</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Weekend Emergency</td>
                                            <td className="p-4 text-primary/70">2–4× + €50 fee</td>
                                            <td className="p-4 text-accent font-bold">€500+</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 id="costs" className="text-2xl font-bold text-primary mt-12 mb-4 scroll-mt-24">Real-World Costs (2025 Rates)</h2>
                            <p>If you skip health insurance, these are the "out-of-pocket" numbers you need to be ready for:</p>

                            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                                <div className="bg-white p-5 rounded-xl border border-primary/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-primary">Dog Spaying</span>
                                        <span className="text-accent font-bold">€200–€600</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-1/4"></div>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-primary/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-primary">Cruciate Ligament (ACL)</span>
                                        <span className="text-accent font-bold">€1,500–€3,500</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-3/4"></div>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-primary/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-primary">Poisoning Emergency</span>
                                        <span className="text-accent font-bold">€500–€1,200</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-1/2"></div>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-primary/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-primary">Tumor Removal</span>
                                        <span className="text-accent font-bold">€500–€2,500</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-accent w-2/3"></div>
                                    </div>
                                </div>
                            </div>

                            <h2 id="options" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Surgery-Only vs. Full Health Insurance</h2>
                            <p>Most expats choose between these two paths:</p>

                            <div className="flex flex-col md:flex-row gap-6 my-10 not-prose">
                                <div className="flex-1 bg-white border-t-4 border-primary p-8 rounded-2xl shadow-sm relative pt-12 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 bg-primary text-secondary font-black text-[10px] uppercase tracking-tighter">Economy</div>
                                    <h3 className="text-xl font-bold mb-4">OP-Versicherung</h3>
                                    <p className="text-sm opacity-70 mb-6">Covers only major surgeries and hospitalization. The "Emergency Fund" booster.</p>
                                    <div className="text-2xl font-black text-primary mb-6">€10–€25 <span className="text-xs font-bold opacity-40">/mo</span></div>
                                    <ul className="space-y-3 text-sm font-medium">
                                        <li className="flex gap-2"><span>✅</span> Major Surgeries</li>
                                        <li className="flex gap-2"><span>✅</span> Hospitalization</li>
                                        <li className="flex gap-2 text-primary/30 line-through"><span>❌</span> Routine Exams</li>
                                        <li className="flex gap-2 text-primary/30 line-through"><span>❌</span> Vaccinations</li>
                                    </ul>
                                </div>
                                <div className="flex-1 bg-white border-t-4 border-accent p-8 rounded-2xl shadow-sm relative pt-12 overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 bg-accent text-primary font-black text-[10px] uppercase tracking-tighter">Peace of Mind</div>
                                    <h3 className="text-xl font-bold mb-4">Vollversicherung</h3>
                                    <p className="text-sm opacity-70 mb-6">Complete coverage including consultations, meds, and preventive care.</p>
                                    <div className="text-2xl font-black text-accent mb-6">€30–€80 <span className="text-xs font-bold opacity-40">/mo</span></div>
                                    <ul className="space-y-3 text-sm font-medium">
                                        <li className="flex gap-2"><span>✅</span> Everything in OP</li>
                                        <li className="flex gap-2"><span>✅</span> Consultations & Exams</li>
                                        <li className="flex gap-2"><span>✅</span> Medications</li>
                                        <li className="flex gap-2"><span>✅</span> Vaccinations & Parasites</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 id="providers" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Best Pet Insurance Providers for Expats</h2>
                            <p>As an expat, you want a provider that offers English policies and a simple, digital submission process. Here are our top recommendations:</p>

                            <div className="space-y-4 my-8 not-prose">
                                <a href="https://www.getsafe.com"
                                    onClick={() => trackAffiliateClick('Getsafe', 'PetInsurance_List')}
                                    target="_blank" rel="noopener noreferrer" className="block p-6 bg-white rounded-2xl border border-primary/5 hover:border-accent transition-all group shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">Getsafe Pet Insurance</h4>
                                            <p className="text-sm opacity-60">Fully digital, 100% English support, cancel monthly.</p>
                                        </div>
                                        <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">Visit Website →</span>
                                    </div>
                                </a>
                                <a href="https://feather-insurance.com/pet-health-insurance?utm_source=EnglishSpeakingVets"
                                    onClick={() => trackAffiliateClick('Feather', 'PetInsurance_List')}
                                    target="_blank" rel="noopener noreferrer" className="block p-6 bg-white rounded-2xl border border-primary/5 hover:border-accent transition-all group shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">Feather Insurance</h4>
                                            <p className="text-sm opacity-60">Specifically built for expats in Germany. Simple claims via app.</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity font-bold text-sm block">Get a Quote →</span>
                                            <span className="text-[10px] text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity block">*Affiliate Link</span>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://tidd.ly/45yENEP"
                                    onClick={() => trackAffiliateClick('Figo', 'PetInsurance_List')}
                                    target="_blank" rel="noopener noreferrer sponsored" className="block p-6 bg-white rounded-2xl border border-primary/5 hover:border-accent transition-all group shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">Figo (Luko) Pet Insurance</h4>
                                            <p className="text-sm opacity-60">High coverage limits and comprehensive English support.</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity font-bold text-sm block">Get a Quote →</span>
                                            <span className="text-[10px] text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity block">*Affiliate Link</span>
                                        </div>
                                    </div>
                                </a>
                                <div className="p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
                                    <h4 className="text-lg font-bold text-primary">Agila / Uelzener</h4>
                                    <p className="text-sm opacity-60">The traditional giants. Extremely reliable coverage, but their English support varies.</p>
                                </div>
                            </div>

                            <h2 id="decision" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">Quick Decision Guide</h2>
                            <div className="bg-primary text-secondary p-8 rounded-2xl my-10 relative overflow-hidden not-prose">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-accent mb-6">Should you get it?</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] text-primary">✅</div>
                                            <p className="text-sm font-medium opacity-90 leading-tight"><strong>YES,</strong> if you can't afford a surprise €3,000 vet bill today.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] text-primary">✅</div>
                                            <p className="text-sm font-medium opacity-90 leading-tight"><strong>YES,</strong> if your pet is young (premiums are locked in lower).</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">❌</div>
                                            <p className="text-sm font-medium opacity-90 leading-tight"><strong>MAYBE NOT,</strong> if you have €10,000+ specifically set aside for pet emergencies.</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/10 italic text-sm opacity-70">
                                        "The monthly cost of pet insurance is far less painful than a single uninsured emergency in Germany."
                                    </div>
                                </div>
                                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-accent/20 rounded-full blur-[80px]"></div>
                            </div>

                            <div className="bg-accent/10 p-8 rounded-2xl my-16 text-center shadow-lg border border-accent/20 not-prose">
                                <h3 className="text-2xl font-bold text-primary mb-4">Ready to find a vet?</h3>
                                <p className="mb-8 text-primary/80">
                                    Whether you have insurance yet or not, finding a vet you can communicate with is priority number one.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-accent hover:bg-primary text-primary hover:text-white font-black py-4 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(251,133,0,0.3)]"
                                >
                                    Browse English-Speaking Vets →
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/pet-insurance-germany-2025" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
