import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { trackAffiliateClick } from '../utils/analytics';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Pet Insurance in Germany: Dog & Cat Guide (2026)';
const DESCRIPTION = 'Compare pet insurance in Germany for dogs and cats. Understand liability, health and surgery cover, exclusions, GOT reimbursement and policy limits.';
const URL = 'https://englishspeakinggermany.online/blog/pet-insurance-germany';

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2025-01-01',
    '2026-07-23',
);

const FAQ_ITEMS = [
    {
        question: 'Is pet insurance mandatory in Germany?',
        answer: 'Pet health insurance is optional. Dog liability requirements vary by federal state, dog classification, and sometimes the permit involved. Check the current rules where the dog is kept and where it will be handled. Berlin and Hamburg require liability insurance for all dogs. Health cover and liability cover are separate policies.',
    },
    {
        question: 'Does private liability insurance cover a dog or cat?',
        answer: 'Cats are usually covered by private personal liability insurance, but owners should confirm their own wording. Dogs usually require separate dog-owner liability cover. Never assume a household policy covers a dog.',
    },
    {
        question: 'What is the difference between OP-only and full pet health insurance?',
        answer: 'OP-only insurance focuses on eligible surgery and related treatment defined by the policy. Fuller health insurance can add eligible consultations, diagnostics, medication, and other treatment. Both can still have exclusions, waiting periods, deductibles, reimbursement limits, and annual caps.',
    },
    {
        question: 'Which GOT reimbursement level should a policy cover?',
        answer: 'The normal German veterinary fee range is generally one to three times the GOT rate. During qualifying emergency service, fees generally run from two to four times the rate, plus the statutory emergency-service fee. Check that the policy wording covers the multiple and emergency treatment you need.',
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
    { id: 'quick-answer', label: 'The quick answer' },
    { id: 'liability', label: 'Dog liability insurance' },
    { id: 'health', label: 'Dog and cat health insurance' },
    { id: 'got', label: 'GOT reimbursement' },
    { id: 'compare', label: 'Policy comparison checklist' },
    { id: 'decision', label: 'Insurance or emergency fund?' },
    { id: 'commercial-links', label: 'Commercial links' },
    { id: 'sources', label: 'Official sources' },
];

const POLICY_CHECKS = [
    {
        title: 'Eligibility and declarations',
        text: 'Check entry-age rules, health questions, medical records, breed restrictions, pre-existing conditions, waiting periods, and age limits. Answer health questions completely.',
    },
    {
        title: 'What treatment means',
        text: 'Read the definitions of illness, accident, operation, medically necessary treatment, diagnostics, medication, hospital care, rehabilitation, dental care, and preventive care.',
    },
    {
        title: 'Reimbursement and your share',
        text: 'Compare the covered GOT multiple, reimbursement percentage, fixed or percentage deductible, annual limit, per-condition limit, and any benefit schedule.',
    },
    {
        title: 'Exclusions and special limits',
        text: 'Look for hereditary or congenital conditions, bilateral conditions, alternative treatment, neutering, pregnancy, vaccinations, parasite control, dental treatment, and prescription diets.',
    },
    {
        title: 'Claims and vet access',
        text: 'Check free choice of vet, referrals, pre-authorisation, direct settlement, required documents, claim deadlines, foreign travel cover, and whether you must pay the clinic first.',
    },
    {
        title: 'Renewal and cancellation',
        text: 'Read notice periods, premium changes with age, what happens at renewal, and whether either you or the insurer can cancel after a claim. Do not rely on a sales summary.',
    },
];

export default function PetInsuranceGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="pet insurance Germany, dog insurance Germany, cat insurance Germany, dog liability insurance, Hundehaftpflicht, Tierkrankenversicherung, OP insurance, GOT reimbursement"
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

            <main className="max-w-7xl mx-auto p-6 md:p-12 mb-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <BlogSidebar />

                    <article className="lg:flex-1 min-w-0 max-w-4xl">
                        <span className="text-accent-ink font-bold tracking-wider text-sm uppercase">
                            Insurance guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-5 leading-tight">
                            Pet Insurance in Germany: Dog &amp; Cat Guide (2026)
                        </h1>
                        <p className="text-sm text-primary/55 mb-8">
                            Published 1 January 2025 · Reviewed 23 July 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-3 bg-accent/5 rounded-r-xl text-xl mb-8">
                                Dog liability insurance is separate from pet health insurance. Liability pays eligible claims when a dog harms another person or their property. Health insurance helps with eligible veterinary treatment for your own dog or cat.
                            </p>

                            <aside className="bg-white border border-primary/10 rounded-2xl p-6 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">Important</p>
                                <p className="text-sm leading-relaxed text-primary/70">
                                    This independent guide explains common policy features. It is not legal, financial, or insurance advice. Laws and product terms change, so verify the current state rule and the insurer&apos;s full policy wording before buying.
                                </p>
                            </aside>

                            <h2 id="quick-answer" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">
                                The quick answer
                            </h2>

                            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
                                <section className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">Dogs</p>
                                    <h3 className="text-lg font-bold text-primary mb-3">Liability first</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        The requirement varies by federal state, dog classification, and local permit rules. Check before registering or moving with a dog.
                                    </p>
                                </section>
                                <section className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">Dogs and cats</p>
                                    <h3 className="text-lg font-bold text-primary mb-3">Health cover is optional</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        Choose between narrower OP-only cover and fuller health cover, or fund eligible and ineligible treatment yourself.
                                    </p>
                                </section>
                                <section className="bg-white p-6 rounded-2xl border border-primary/10">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">Cats</p>
                                    <h3 className="text-lg font-bold text-primary mb-3">Check household liability</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        Cats are usually covered by private liability, according to Verbraucherzentrale, but your own contract controls.
                                    </p>
                                </section>
                            </div>

                            <h2 id="liability" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Dog liability insurance in Germany
                            </h2>
                            <p>
                                Dog-owner liability is commonly called <strong>Hundehalterhaftpflicht</strong>, <strong>Hundehaftpflicht</strong>, or <strong>Tierhalterhaftpflicht</strong>. It covers eligible third-party bodily injury, property damage, and financial loss under the contract. It does not pay your own dog&apos;s veterinary bill.
                            </p>
                            <p>
                                Use the dedicated{' '}
                                <Link
                                    to="/blog/dog-liability-insurance-germany"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    Dog liability insurance guide
                                </Link>{' '}
                                for the current state-by-state requirements and a focused policy checklist.
                            </p>
                            <p>
                                <a
                                    href="https://www.gesetze-im-internet.de/bgb/__833.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    German Civil Code section 833
                                </a>{' '}
                                sets out animal-keeper liability. The statute also contains an exception for certain domestic animals serving an occupation, gainful activity, or maintenance when the keeper proves the required care or that the damage would have occurred anyway. Liability therefore depends on the law and facts, not a slogan.
                            </p>

                            <div className="bg-primary text-secondary rounded-2xl p-7 my-8 not-prose">
                                <h3 className="text-xl font-bold text-accent mb-3">Is it mandatory?</h3>
                                <p className="text-sm leading-relaxed text-secondary/85 mb-4">
                                    There is no single nationwide rule for every dog. State laws can distinguish between all dogs, specified breeds, dogs assessed as dangerous, and permit situations.
                                </p>
                                <ul className="space-y-3 text-sm text-secondary/85">
                                    <li>
                                        <strong className="text-white">Berlin:</strong> the official state page confirms chip and insurance duties for dogs.{' '}
                                        <a
                                            href="https://www.berlin.de/sen/verbraucherschutz/aufgaben/hundehaltung/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent font-bold hover:underline"
                                        >
                                            Official Berlin dog insurance rules
                                        </a>
                                    </li>
                                    <li>
                                        <strong className="text-white">Hamburg:</strong> the official city page says all dog keepers must obtain liability insurance.{' '}
                                        <a
                                            href="https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/themen/verbraucherschutz/tiere/hundegesetz/hundegesetz-53038"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent font-bold hover:underline"
                                        >
                                            Official Hamburg dog insurance rules
                                        </a>
                                    </li>
                                </ul>
                                <p className="text-xs text-secondary/65 mt-5">
                                    These examples are not an exhaustive state list. Check your state and municipality for the current rule.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">
                                What to compare in dog liability cover
                            </h3>
                            <ul>
                                <li>Required minimum cover and maximum deductible under the applicable state rule.</li>
                                <li>Bodily injury, property damage, and consequential financial loss limits.</li>
                                <li>Damage to rented property and rented holiday accommodation.</li>
                                <li>Handlers, dog sitters, puppies, off-leash incidents, training, and travel abroad.</li>
                                <li>Breed exclusions, dangerous-dog classifications, and any contractual leash or muzzle conditions.</li>
                                <li>Whether the insurer defends against unfounded claims as part of liability handling.</li>
                            </ul>

                            <h2 id="health" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Pet health insurance for dogs and cats
                            </h2>
                            <p>
                                Pet health insurance is optional in Germany. A policy can reduce some large, eligible treatment costs, but it does not make all veterinary care free. Premiums and coverage depend on factors such as species, breed, age, health, location, deductible, and benefit limits.
                            </p>

                            <div className="grid md:grid-cols-2 gap-5 my-8 not-prose">
                                <section className="bg-white border-t-4 border-primary p-7 rounded-2xl shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-primary/50 mb-2">Narrower scope</p>
                                    <h3 className="text-xl font-bold text-primary mb-3">OP-only insurance</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        Focuses on operations that meet the contract definition and may include specified diagnostics, anaesthesia, medication, hospital care, and follow-up around the procedure.
                                    </p>
                                </section>
                                <section className="bg-white border-t-4 border-accent p-7 rounded-2xl shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-widest text-accent-ink mb-2">Broader scope</p>
                                    <h3 className="text-xl font-bold text-primary mb-3">Fuller health insurance</h3>
                                    <p className="text-sm leading-relaxed text-primary/70">
                                        Can add eligible consultations, diagnostics, medication, and non-surgical treatment. Preventive, dental, hereditary, and reproductive care may still be limited or excluded.
                                    </p>
                                </section>
                            </div>

                            <p>
                                The{' '}
                                <a
                                    href="https://www.verbraucherzentrale.de/wissen/geld-versicherungen/weitere-versicherungen/krankenversicherungen-fuer-haustiere-sinnvoll-oder-ueberfluessig-10781"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    Verbraucherzentrale pet health insurance guide
                                </a>{' '}
                                warns that exclusions and limits vary substantially. It highlights pre-existing conditions, waiting periods, age limits, reimbursement percentages, deductibles, annual caps, free choice of vet, and the insurer&apos;s cancellation rights as important comparison points.
                            </p>

                            <h2 id="got" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                GOT reimbursement: the number that matters
                            </h2>
                            <p>
                                German veterinarians calculate professional fees under the <strong>Gebührenordnung für Tierärztinnen und Tierärzte</strong>, usually shortened to GOT. The fee schedule lists base fees, but the final invoice can also include medication, materials, laboratory work, imaging, travel, and VAT.
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="min-w-[640px] w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm">Situation</th>
                                            <th className="p-4 font-bold text-sm">Statutory range</th>
                                            <th className="p-4 font-bold text-sm">What to check in a policy</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/10">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Ordinary treatment</td>
                                            <td className="p-4 text-primary/70">Generally 1 to 3 times the GOT base rate</td>
                                            <td className="p-4 text-primary/70">The maximum reimbursed multiple and any percentage limit</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Qualifying emergency service</td>
                                            <td className="p-4 text-primary/70">Generally 2 to 4 times the rate, plus a €50 fee before VAT</td>
                                            <td className="p-4 text-primary/70">Emergency cover, emergency-service fee, annual cap, and deductible</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">Special written agreement</td>
                                            <td className="p-4 text-primary/70">A justified deviation can be agreed before treatment under GOT rules</td>
                                            <td className="p-4 text-primary/70">Whether reimbursement stops at the policy&apos;s stated GOT multiple</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p>
                                Read the{' '}
                                <a
                                    href="https://www.gesetze-im-internet.de/got_2022/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-ink font-bold hover:underline"
                                >
                                    Official German veterinary fee regulation
                                </a>{' '}
                                and our{' '}
                                <Link to="/blog/vet-costs-germany" className="text-accent-ink font-bold hover:underline">
                                    German vet costs and GOT guide
                                </Link>
                                . A policy advertising a high reimbursement percentage can still leave a large balance if its GOT reimbursement ceiling, annual limit, or deductible is restrictive.
                            </p>

                            <h2 id="compare" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Policy comparison checklist
                            </h2>
                            <p>
                                Compare the policy wording and product information document, not only the monthly premium or headline percentage.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                                {POLICY_CHECKS.map((item, index) => (
                                    <section key={item.title} className="bg-white rounded-2xl border border-primary/10 p-6">
                                        <p className="text-xs font-black text-accent-ink mb-2">
                                            {String(index + 1).padStart(2, '0')}
                                        </p>
                                        <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-primary/70">{item.text}</p>
                                    </section>
                                ))}
                            </div>

                            <aside className="bg-amber-50 border border-amber-200 rounded-2xl p-6 my-8 not-prose">
                                <h3 className="font-bold text-primary mb-3">Before you sign</h3>
                                <ul className="space-y-2 text-sm text-primary/75">
                                    <li>Save the quotation, product information document, policy wording, and health declaration.</li>
                                    <li>Ask the insurer to answer unclear exclusions in writing.</li>
                                    <li>Confirm the waiting period and the exact policy start date.</li>
                                    <li>Check whether the clinic must be paid before reimbursement.</li>
                                    <li>Do not cancel an existing policy until the replacement is confirmed and active.</li>
                                </ul>
                            </aside>

                            <h2 id="decision" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Insurance or an emergency fund?
                            </h2>
                            <p>
                                There is no universal best policy and no answer that fits every household. Liability and health risks should be considered separately.
                            </p>

                            <div className="bg-primary text-secondary p-7 rounded-2xl my-8 not-prose">
                                <ol className="space-y-5">
                                    <li>
                                        <p className="font-bold text-white">1. Resolve dog liability first</p>
                                        <p className="text-sm text-secondary/75 mt-1">
                                            Meet the applicable legal requirement and decide how much third-party risk you can carry.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="font-bold text-white">2. Model health cover honestly</p>
                                        <p className="text-sm text-secondary/75 mt-1">
                                            Compare the premium, deductible, limits, exclusions, and likely out-of-pocket costs with a ring-fenced emergency reserve.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="font-bold text-white">3. Consider mixed protection</p>
                                        <p className="text-sm text-secondary/75 mt-1">
                                            Some owners combine OP-only cover with savings for routine and excluded care. Others choose fuller cover or self-fund all treatment.
                                        </p>
                                    </li>
                                </ol>
                            </div>

                            <p>
                                Insurance is a risk-transfer contract, not a savings account. A policy can be valuable even if claims never exceed premiums, while self-funding can be reasonable only if the reserve is genuinely available when treatment is needed.
                            </p>

                            <h2 id="commercial-links" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Commercial links
                            </h2>
                            <div className="bg-white border border-primary/10 rounded-2xl p-7 my-8 not-prose">
                                <p className="text-sm leading-relaxed text-primary/75 mb-6">
                                    The links below are advertising or affiliate destinations, not provider rankings. We have not independently audited their policy wording, claim outcomes, pricing, exclusions, or language support. Check current documents and compare alternatives before buying. We may earn a commission at no extra cost to you.
                                </p>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    <a
                                        href="https://www.awin1.com/cread.php?awinmid=14361&awinaffid=2707844&ued=https%3A%2F%2Fhelden.de%2Fprodukte%2Ftierversicherung%2Fhundehaftpflicht%2F"
                                        onClick={() => trackAffiliateClick('Helden', 'PetInsurance_CommercialLinks')}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        aria-label="Helden commercial dog liability link"
                                        className="min-h-11 inline-flex items-center justify-center text-center bg-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-primary/90"
                                    >
                                        Helden liability link
                                    </a>
                                    <a
                                        href="https://feather-insurance.com/pet-health-insurance?utm_source=EnglishSpeakingVets"
                                        onClick={() => trackAffiliateClick('Feather', 'PetInsurance_CommercialLinks')}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        aria-label="Feather commercial pet health link"
                                        className="min-h-11 inline-flex items-center justify-center text-center bg-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-primary/90"
                                    >
                                        Feather health link
                                    </a>
                                    <a
                                        href="https://tidd.ly/45yENEP"
                                        onClick={() => trackAffiliateClick('Figo', 'PetInsurance_CommercialLinks')}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        aria-label="Figo commercial pet health link"
                                        className="min-h-11 inline-flex items-center justify-center text-center bg-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-primary/90"
                                    >
                                        Figo health link
                                    </a>
                                </div>
                            </div>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Sources and next steps
                            </h2>
                            <ul>
                                <li>
                                    <a
                                        href="https://www.gesetze-im-internet.de/bgb/__833.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        German Civil Code section 833
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.verbraucherzentrale.de/wissen/geld-versicherungen/weitere-versicherungen/krankenversicherungen-fuer-haustiere-sinnvoll-oder-ueberfluessig-10781"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Verbraucherzentrale pet health insurance guide
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.gesetze-im-internet.de/got_2022/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Official German veterinary fee regulation
                                    </a>
                                </li>
                            </ul>

                            <div className="bg-accent/10 p-8 rounded-2xl my-12 text-center border border-accent/20 not-prose">
                                <h3 className="text-2xl font-bold text-primary mb-3">Need a clinic before choosing cover?</h3>
                                <p className="mb-6 text-primary/75">
                                    Ask a clinic what payment methods it accepts, whether it settles directly with insurers, and which documents it can provide for claims.
                                </p>
                                <Link
                                    to="/"
                                    className="min-h-11 inline-flex items-center justify-center bg-accent-ink hover:bg-primary text-white font-bold py-3 px-7 rounded-xl transition-colors"
                                >
                                    English-speaking vets in Germany
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-primary mt-16 mb-6">
                            Frequently asked questions
                        </h2>
                        <div className="space-y-4 my-8 not-prose">
                            {FAQ_ITEMS.map((item) => (
                                <details key={item.question} className="bg-white rounded-xl border border-primary/10 shadow-sm p-5 group">
                                    <summary className="font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                                        {item.question}
                                        <span className="text-accent transition-transform group-open:rotate-45 shrink-0">+</span>
                                    </summary>
                                    <p className="text-primary/70 text-sm mt-3 leading-relaxed">{item.answer}</p>
                                </details>
                            ))}
                        </div>

                        <RelatedPosts currentPath="/blog/pet-insurance-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
