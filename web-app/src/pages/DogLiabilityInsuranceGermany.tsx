import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import BlogSidebar from '../components/BlogSidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RelatedPosts from '../components/RelatedPosts';
import TableOfContents from '../components/TableOfContents';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Dog Liability Insurance Germany: Rules & Checklist (2026)';
const DESCRIPTION = 'Understand dog liability insurance in Germany, where it is mandatory, what Hundehaftpflicht covers, and which policy terms expat dog owners should check.';
const URL = 'https://englishspeakinggermany.online/blog/dog-liability-insurance-germany';

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2026-07-24',
    '2026-07-24',
);

const FAQ_ITEMS = [
    {
        question: 'Is dog liability insurance mandatory in Germany?',
        answer: 'There is no single rule for every dog throughout Germany. Berlin, Hamburg and Lower Saxony require liability insurance broadly, while other states can link the requirement to size, breed, a dangerous-dog classification or a permit. Check the current law and authority guidance where the dog is kept.',
    },
    {
        question: 'Is dog liability included in personal liability insurance?',
        answer: 'Do not assume that a private personal liability policy covers a dog. Dog-owner liability is normally sold as a separate policy called Hundehalterhaftpflicht, Hundehaftpflicht or Tierhalterhaftpflicht. The actual contract wording controls.',
    },
    {
        question: 'Does dog liability insurance pay my own vet bill?',
        answer: 'No. Liability insurance addresses eligible third-party claims caused by the insured dog. Your own dog’s eligible treatment belongs to a separate health or surgery policy, or must be paid directly.',
    },
    {
        question: 'Can I use a foreign dog liability policy in Germany?',
        answer: 'A foreign policy may not automatically satisfy a German state or municipal proof requirement. Ask the local authority what evidence, territorial cover, insured risks and minimum limits it accepts, and obtain written confirmation from the insurer.',
    },
];

const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
        },
    })),
};

const TABLE_OF_CONTENTS = [
    { id: 'quick-answer', label: 'Quick answer' },
    { id: 'liability', label: 'Why owners can be liable' },
    { id: 'state-rules', label: 'State rules' },
    { id: 'coverage', label: 'What to compare' },
    { id: 'cost', label: 'Price and quote checks' },
    { id: 'claim', label: 'After an incident' },
    { id: 'related', label: 'Related owner tasks' },
    { id: 'sources', label: 'Official sources' },
];

const POLICY_CHECKS = [
    {
        title: 'The correct dog and keeper',
        text: 'Confirm the insured dog, named keeper, household members, temporary handlers and dog sitters. Ask how a change of address, keeper or dog must be reported.',
    },
    {
        title: 'Covered types of loss',
        text: 'Read the definitions and limits for bodily injury, property damage and financial loss. Check exclusions rather than relying on a short product summary.',
    },
    {
        title: 'Required limits and proof',
        text: 'If an authority requires insurance, make sure the policy meets its minimum limits and evidence rules. Keep the insurance certificate available for registration or permit checks.',
    },
    {
        title: 'Rental and borrowed property',
        text: 'Check whether damage to rented homes, holiday accommodation, furniture or borrowed items is covered and which exclusions or sublimits apply.',
    },
    {
        title: 'Everyday handling',
        text: 'Check off-leash incidents, dog-school participation, temporary care, travel territory and the consequences of breaking a contractual duty.',
    },
    {
        title: 'Breed and history declarations',
        text: 'Answer breed, size, prior-claim and dangerous-dog questions completely. Confirm that the certificate identifies the dog in the way the authority expects.',
    },
];

export default function DogLiabilityInsuranceGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="dog liability insurance Germany, Hundehaftpflicht Germany, Hundehalterhaftpflicht, dog insurance Germany, dog owner liability"
                />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">
                    {JSON.stringify(ARTICLE_SCHEMA)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(FAQ_SCHEMA)}
                </script>
            </Helmet>

            <Header />

            <main className="mx-auto mb-12 max-w-7xl p-5 sm:p-6 md:p-12">
                <div className="flex flex-col gap-12 lg:flex-row">
                    <BlogSidebar />

                    <article className="min-w-0 max-w-4xl lg:flex-1">
                        <span className="text-sm font-bold uppercase tracking-wider text-accent-ink">
                            Insurance and dog law
                        </span>
                        <h1 className="mt-2 mb-5 text-4xl font-bold leading-tight text-primary md:text-5xl">
                            Dog Liability Insurance in Germany: Rules and Checklist (2026)
                        </h1>
                        <p className="mb-8 text-sm text-primary/55">
                            Published and reviewed 24 July 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg max-w-none text-primary/80">
                            <p className="mb-8 rounded-r-xl border-l-4 border-accent bg-accent/5 py-3 pl-6 text-xl">
                                Dog-owner liability insurance is called <strong>Hundehalterhaftpflicht</strong>, <strong>Hundehaftpflicht</strong> or <strong>Tierhalterhaftpflicht</strong>. It protects against eligible third-party claims caused by the insured dog. It does not pay your own dog&apos;s veterinary bill.
                            </p>

                            <aside className="not-prose my-8 rounded-2xl border border-primary/10 bg-white p-6">
                                <p className="mb-2 font-bold text-primary">Scope of this guide</p>
                                <p className="text-sm leading-relaxed text-primary/70">
                                    This is general information, not individualized legal or insurance advice. State rules, municipal requirements and policy wording can change. Verify the current rule with the authority responsible for the dog&apos;s place of keeping and read the full insurance documents before buying.
                                </p>
                            </aside>

                            <h2 id="quick-answer" className="mt-12 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                The quick answer
                            </h2>
                            <p>
                                Berlin, Hamburg and Lower Saxony require liability cover broadly. North Rhine-Westphalia requires it for large dogs, dangerous dogs and specified breeds under its dog law. Bavaria does not impose one general statewide insurance rule for every dog, but a dangerous-dog permit can depend on proof of special liability insurance.
                            </p>
                            <p>
                                Even where a state does not require a policy for every dog, the owner can still face civil liability. A legal duty to insure and legal responsibility for damage are different questions.
                            </p>

                            <h2 id="liability" className="mt-16 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                Why a dog owner can be liable
                            </h2>
                            <p>
                                <a
                                    href="https://www.gesetze-im-internet.de/bgb/__833.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-accent-ink hover:underline"
                                >
                                    German Civil Code section 833
                                </a>{' '}
                                addresses animal-keeper liability when an animal kills a person, injures a person or damages property. Its second sentence contains a specific exception for certain domestic animals serving an occupation, gainful activity or maintenance when the keeper proves the required care or that the damage would have happened anyway. The facts and the law control each case.
                            </p>
                            <p>
                                A liability insurer typically examines whether a claim is covered, defends against an unjustified covered claim and pays an eligible justified claim within the contract limits. Read the actual wording for duties, exclusions, deductibles and territory.
                            </p>

                            <h2 id="state-rules" className="mt-16 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                Where is Hundehaftpflicht mandatory?
                            </h2>
                            <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-primary/10 bg-white">
                                <table className="min-w-[680px] w-full border-collapse text-left text-sm">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold">State</th>
                                            <th className="p-4 font-bold">Verified rule</th>
                                            <th className="p-4 font-bold">Practical action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/10">
                                        <tr>
                                            <th className="p-4 align-top font-bold text-primary">Berlin</th>
                                            <td className="p-4 align-top text-primary/70">Keep continuous liability insurance from the beginning of dog ownership. Berlin also applies an insurance duty when a dog kept elsewhere is led in Berlin.</td>
                                            <td className="p-4 align-top text-primary/70">
                                                Keep the certificate and verify the current registration requirements.{' '}
                                                <a className="font-bold text-accent-ink hover:underline" href="https://www.hunderegister.berlin.de/faq/" target="_blank" rel="noopener noreferrer">
                                                    Official Berlin dog rules
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-4 align-top font-bold text-primary">Hamburg</th>
                                            <td className="p-4 align-top text-primary/70">All dog owners must obtain liability insurance. The official registration guidance also publishes minimum-limit and deductible requirements.</td>
                                            <td className="p-4 align-top text-primary/70">
                                                Match the certificate to the current Hamburg registration standard.{' '}
                                                <a className="font-bold text-accent-ink hover:underline" href="https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/themen/verbraucherschutz/tiere/hundegesetz/hundegesetz-53038" target="_blank" rel="noopener noreferrer">
                                                    Official Hamburg dog rules
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-4 align-top font-bold text-primary">Lower Saxony</th>
                                            <td className="p-4 align-top text-primary/70">Liability insurance is required for damage caused by a dog older than six months.</td>
                                            <td className="p-4 align-top text-primary/70">
                                                Coordinate insurance with chipping, registration and the owner-competence rules.{' '}
                                                <a className="font-bold text-accent-ink hover:underline" href="https://www.laves.niedersachsen.de/startseite/tiere/tierschutz/tierhaltung/das-niedersaechsische-hundegesetz-nhundg-110827.html" target="_blank" rel="noopener noreferrer">
                                                    Official Lower Saxony dog-law guidance
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-4 align-top font-bold text-primary">North Rhine-Westphalia</th>
                                            <td className="p-4 align-top text-primary/70">Large dogs, dangerous dogs and specified breeds have liability requirements. A large dog is at least 40 cm at the shoulder or 20 kg when fully grown.</td>
                                            <td className="p-4 align-top text-primary/70">
                                                Check the classification and submit the required proof to the local authority.{' '}
                                                <a className="font-bold text-accent-ink hover:underline" href="https://recht.nrw.de/lrgv/gesetz/27092016-hundegesetz-fuer-das-land-nordrhein-westfalen-landeshundegesetz-lhundg-nrw/" target="_blank" rel="noopener noreferrer">
                                                    North Rhine-Westphalia dog law
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-4 align-top font-bold text-primary">Bavaria</th>
                                            <td className="p-4 align-top text-primary/70">There is no general statewide liability-insurance duty for every dog. A municipality can make a dangerous-dog permit dependent on special liability insurance.</td>
                                            <td className="p-4 align-top text-primary/70">
                                                Ask the municipality about the specific dog and any permit conditions.{' '}
                                                <a className="font-bold text-accent-ink hover:underline" href="https://www.gesetze-bayern.de/Content/Document/BayLStVG-37" target="_blank" rel="noopener noreferrer">
                                                    Bavarian dangerous-dog law
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                This table is deliberately not presented as a complete substitute for all 16 state laws. If your state is not listed, ask the local <em>Ordnungsamt</em> or official state service portal whether the dog&apos;s size, breed, history or permit status triggers an insurance requirement.
                            </p>

                            <h2 id="coverage" className="mt-16 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                What to compare in a policy
                            </h2>
                            <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
                                {POLICY_CHECKS.map((item) => (
                                    <section key={item.title} className="rounded-2xl border border-primary/10 bg-white p-6">
                                        <h3 className="mb-2 text-lg font-bold text-primary">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-primary/70">{item.text}</p>
                                    </section>
                                ))}
                            </div>

                            <h2 id="cost" className="mt-16 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                Price and quote checks
                            </h2>
                            <p>
                                There is no statutory nationwide price for dog liability insurance. A quote can depend on the dog, breed classification, prior claims, selected limits, deductible, optional extensions, household and provider. Compare quotes only after fixing the same coverage requirements.
                            </p>
                            <ol>
                                <li>Write down the state or municipal proof requirements first.</li>
                                <li>Use the same coverage limits and deductible for every quote.</li>
                                <li>Disclose the dog&apos;s breed, size, use and claim history accurately.</li>
                                <li>Read exclusions, sublimits and the policy start date before paying.</li>
                                <li>Save the application, policy wording and insurance certificate together.</li>
                            </ol>

                            <h2 id="claim" className="mt-16 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                What to do after an incident
                            </h2>
                            <ul>
                                <li>Prevent further harm and obtain urgent medical or veterinary help when needed.</li>
                                <li>Exchange contact details and record the time, place, witnesses and visible damage.</li>
                                <li>Notify the insurer promptly using the procedure in the contract.</li>
                                <li>Describe facts accurately. Do not promise payment or sign a liability admission without advice.</li>
                                <li>Preserve correspondence, photographs, invoices and official reports.</li>
                            </ul>

                            <h2 id="related" className="mt-16 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                Complete the related owner tasks
                            </h2>
                            <div className="not-prose my-8 grid gap-4 md:grid-cols-3">
                                <Link to="/blog/pet-insurance-germany" className="rounded-2xl border border-primary/10 bg-white p-5 font-bold text-primary hover:border-accent hover:text-accent">
                                    Compare health and surgery insurance
                                </Link>
                                <Link to="/blog/hundesteuer-dog-tax-germany" className="rounded-2xl border border-primary/10 bg-white p-5 font-bold text-primary hover:border-accent hover:text-accent">
                                    Register for dog tax
                                </Link>
                                <Link to="/blog/new-pet-checklist-germany" className="rounded-2xl border border-primary/10 bg-white p-5 font-bold text-primary hover:border-accent hover:text-accent">
                                    Use the first-30-days checklist
                                </Link>
                            </div>

                            <h2 id="sources" className="mt-16 mb-6 scroll-mt-24 text-3xl font-bold text-primary">
                                Official sources checked
                            </h2>
                            <ul>
                                <li><a href="https://www.gesetze-im-internet.de/bgb/__833.html" target="_blank" rel="noopener noreferrer">German Civil Code section 833</a></li>
                                <li><a href="https://www.hunderegister.berlin.de/faq/" target="_blank" rel="noopener noreferrer">Berlin dog register FAQ</a></li>
                                <li><a href="https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/themen/verbraucherschutz/tiere/hundegesetz/hundegesetz-53038" target="_blank" rel="noopener noreferrer">Hamburg dog-law guidance</a></li>
                                <li><a href="https://www.laves.niedersachsen.de/startseite/tiere/tierschutz/tierhaltung/das-niedersaechsische-hundegesetz-nhundg-110827.html" target="_blank" rel="noopener noreferrer">Lower Saxony dog-law guidance</a></li>
                                <li><a href="https://recht.nrw.de/lrgv/gesetz/27092016-hundegesetz-fuer-das-land-nordrhein-westfalen-landeshundegesetz-lhundg-nrw/" target="_blank" rel="noopener noreferrer">North Rhine-Westphalia dog law</a></li>
                                <li><a href="https://www.gesetze-bayern.de/Content/Document/BayLStVG-37" target="_blank" rel="noopener noreferrer">Bavarian dangerous-dog law</a></li>
                            </ul>
                        </div>

                        <RelatedPosts currentPath="/blog/dog-liability-insurance-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
