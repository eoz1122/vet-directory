import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Vet Costs in Germany: GOT Fees Explained (2026)';
const DESCRIPTION = 'Understand vet costs in Germany: GOT base fees, 1x-3x rates, emergency 2x-4x billing, invoice items, VAT and how to request an estimate.';
const URL = 'https://englishspeakinggermany.online/blog/vet-costs-germany';

const ARTICLE_SCHEMA = generateArticleSchema(
    TITLE,
    DESCRIPTION,
    URL,
    '2026-07-11',
    '2026-07-24',
);

const FAQ_ITEMS = [
    {
        question: 'How much is a standard vet visit in Germany?',
        answer: 'There is no universal average vet bill. The GOT 1x base fee for a general examination with consultation for a dog, cat, or ferret is 23.62 EUR net. The final invoice depends on the selected multiplier, additional services, medicine, materials, external costs, and VAT.',
    },
    {
        question: 'Can German veterinarians choose any price?',
        answer: 'No. Ordinary services generally use a continuous range from one to three times the GOT base fee. The veterinarian selects the rate using statutory case factors. A justified rate below 1x or above 3x can be agreed in text before treatment under section 5, subject to the regulation and its exceptions.',
    },
    {
        question: 'How does emergency veterinary billing work?',
        answer: 'Qualifying veterinary emergency service generally uses two to four times the GOT rate and adds a 50 EUR net emergency-service fee. The fee is charged once for the same matter, even when several animals belonging to one keeper are treated. A scheduled consultation during a practice regular opening hours is not automatically emergency service.',
    },
    {
        question: 'Can I ask for a veterinary cost estimate?',
        answer: 'Yes. Ask for a non-binding estimate before planned diagnostics or treatment and agree when the clinic should contact you if the plan changes. A firm final price may not be possible because the animal condition and necessary treatment can change.',
    },
    {
        question: 'What must a German veterinary invoice show?',
        answer: 'The invoice must include the treatment date, species, diagnosis or reason for consultation, the billed service with its GOT schedule number, the invoice amount, and VAT. Separately billed medicine, materials, expenses, and compensation must also be shown, and you can request further itemisation.',
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
    { id: 'got-basics', label: 'What the GOT regulates' },
    { id: 'ordinary-rates', label: 'Ordinary 1x to 3x rates' },
    { id: 'exam-example', label: 'A transparent exam example' },
    { id: 'emergency', label: 'Emergency 2x to 4x billing' },
    { id: 'invoice', label: 'How to read the invoice' },
    { id: 'estimate', label: 'Estimates and written agreements' },
    { id: 'control-costs', label: 'Practical cost controls' },
    { id: 'sources', label: 'Official sources' },
];

const INVOICE_ITEMS = [
    {
        title: 'Professional services',
        text: 'Each billed veterinary service should identify the corresponding number in the GOT fee schedule.',
    },
    {
        title: 'Multiplier',
        text: 'Different services on one invoice can use different rates when the circumstances justify them.',
    },
    {
        title: 'Additional items',
        text: 'Medicine, consumable materials, laboratory work and travel can appear as separate line items or services.',
    },
    {
        title: 'Tax and total',
        text: 'The GOT schedule states net fees. The invoice must show VAT and the final amount due.',
    },
];

const COST_CONTROLS = [
    {
        number: '01',
        title: 'Ask what is included',
        text: 'For planned care, ask which examinations, diagnostics, anaesthesia, monitoring, medicine, materials, follow-up, and external laboratory work are expected.',
    },
    {
        number: '02',
        title: 'Request a non-binding estimate',
        text: 'Ask for a realistic low and high scenario and agree when the clinic should contact you before adding non-urgent work.',
    },
    {
        number: '03',
        title: 'Discuss diagnostic stages',
        text: 'Ask what must happen now, what may depend on the first results, and what can safely be scheduled later. The veterinarian decides what is medically necessary.',
    },
    {
        number: '04',
        title: 'Use regular hours for non-urgent care',
        text: 'Book routine work during ordinary opening hours. Do not delay urgent treatment to avoid an emergency-service fee.',
    },
    {
        number: '05',
        title: 'Clarify payment before treatment',
        text: 'Ask which payment methods are accepted and whether instalments or external financing are available. A clinic is not required to offer credit.',
    },
    {
        number: '06',
        title: 'Plan for uninsured costs',
        text: 'Compare policy limits and exclusions with an accessible emergency reserve. Insurance does not guarantee reimbursement of every invoice item.',
    },
];

export default function VetCostsGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="vet costs Germany, GOT fees Germany, Tierarzt Kosten, veterinary invoice Germany, emergency vet fees Germany, GOT multiplier"
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
                            Money and bureaucracy guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-5 leading-tight">
                            Vet Costs in Germany: GOT Fees Explained (2026)
                        </h1>
                        <p className="text-sm text-primary/55 mb-8">
                            Published 11 July 2026 · Reviewed 24 July 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-3 bg-accent/5 rounded-r-xl text-xl mb-8">
                                The German veterinary fee schedule gives each service a base fee, but that is only one part of the invoice. GOT base fees are not fixed total prices.
                            </p>

                            <aside className="bg-white border border-primary/10 rounded-2xl p-6 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">Quick calculation</p>
                                <p className="text-sm leading-relaxed text-primary/75">
                                    GOT service fee × selected rate, plus other billable services, medicine, materials, expenses and VAT = final invoice.
                                </p>
                            </aside>

                            <h2 id="got-basics" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">
                                What the GOT regulates
                            </h2>
                            <p>
                                The <strong>Gebührenordnung für Tierärztinnen und Tierärzte</strong>, shortened to GOT, is the federal regulation governing payment for veterinary professional services in Germany. Its schedule lists individual services and the fee for the 1x rate.
                            </p>
                            <p>
                                The current regulation took effect on 22 November 2022 and was amended in March 2023. Listed GOT amounts exclude VAT. They also do not automatically include every medicine, material, diagnostic step, external expense, house visit, or travel cost that may be necessary.
                            </p>

                            <div className="bg-primary text-secondary p-7 rounded-2xl my-8 not-prose">
                                <h3 className="text-xl font-bold text-accent mb-3">Why two similar visits can cost different amounts</h3>
                                <p className="text-sm leading-relaxed text-secondary/85">
                                    The fee schedule regulates the calculation, not one national package price. The animal&apos;s condition, the work performed, the rate applied to each service, and separately billable items determine the total.
                                </p>
                            </div>

                            <h2 id="ordinary-rates" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Ordinary services: one to three times the GOT rate
                            </h2>
                            <p>
                                For ordinary veterinary services, the statutory range is generally one to three times the GOT base fee. The rate is continuous, so it is not limited to only 1x, 2x, or 3x.
                            </p>
                            <p>
                                Section 2 tells the veterinarian to consider the difficulty, time required, timing of the service, value of the animal, and local circumstances. There is no statutory rule that every routine visit uses one rate or that every city clinic uses another.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
                                <section className="bg-white rounded-2xl border border-primary/10 p-6">
                                    <p className="text-2xl font-black text-accent-ink mb-2">1x</p>
                                    <p className="font-bold text-primary mb-2">Base rate</p>
                                    <p className="text-sm text-primary/65">The amount printed in the GOT schedule before VAT.</p>
                                </section>
                                <section className="bg-white rounded-2xl border border-primary/10 p-6">
                                    <p className="text-2xl font-black text-accent-ink mb-2">1x to 3x</p>
                                    <p className="font-bold text-primary mb-2">Ordinary range</p>
                                    <p className="text-sm text-primary/65">Selected for each service using the statutory case factors.</p>
                                </section>
                                <section className="bg-white rounded-2xl border border-primary/10 p-6">
                                    <p className="text-2xl font-black text-accent-ink mb-2">Not a package</p>
                                    <p className="font-bold text-primary mb-2">Several line items</p>
                                    <p className="text-sm text-primary/65">An examination, imaging, laboratory work and treatment are separate services.</p>
                                </section>
                            </div>

                            <h2 id="exam-example" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                A transparent examination example
                            </h2>
                            <p>
                                GOT schedule number 16 sets the 1x base fee for a general examination with consultation for a dog, cat, or ferret at <strong>€23.62 net</strong>.
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="min-w-[640px] w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm">Rate</th>
                                            <th className="p-4 font-bold text-sm">Fee before VAT</th>
                                            <th className="p-4 font-bold text-sm">Illustration with 19% VAT</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/10">
                                        <tr>
                                            <td className="p-4 font-bold text-primary">1x</td>
                                            <td className="p-4 text-primary/70">€23.62</td>
                                            <td className="p-4 text-primary/70">€28.11</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">2x</td>
                                            <td className="p-4 text-primary/70">€47.24</td>
                                            <td className="p-4 text-primary/70">€56.22</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-bold text-primary">3x</td>
                                            <td className="p-4 text-primary/70">€70.86</td>
                                            <td className="p-4 text-primary/70">€84.32</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                This arithmetic covers that examination service only. It is not a typical or guaranteed total, and it is not a quote for your animal. Other services and items can change the invoice substantially.
                            </p>

                            <h2 id="emergency" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Qualifying emergency service: two to four times the rate
                            </h2>
                            <p>
                                During qualifying emergency service, veterinary services generally use two to four times the GOT rate and add a <strong>€50 net emergency-service fee</strong>. VAT is added to the fee. The fee can be charged only once for the same matter, even when several animals belonging to one keeper need treatment, and the regulation permits it to be waived in a justified individual case.
                            </p>
                            <p>
                                The statutory time windows cover nights from 18:00 to 08:00, weekends from Friday 18:00 to Monday 08:00, and public holidays. However, timing alone does not make every appointment an emergency. A regular scheduled consultation during a practice&apos;s regular opening hours is not automatically emergency service.
                            </p>

                            <aside className="bg-red-50 border border-red-200 rounded-2xl p-6 my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">Do not delay urgent care because of cost</h3>
                                <p className="text-sm leading-relaxed text-primary/75">
                                    If you are unsure whether your pet needs immediate treatment, call the veterinary provider for instructions. Use our{' '}
                                    <Link to="/guides/pet-emergency-germany" className="text-accent-ink font-bold hover:underline">
                                        Pet emergency guide
                                    </Link>{' '}
                                    for warning signs and current city contacts.
                                </p>
                            </aside>

                            <h2 id="invoice" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                How to read a German veterinary invoice
                            </h2>
                            <p>
                                Under section 7, the invoice must show the treatment date, species, diagnosis or reason for consultation, billed service, GOT service number, invoice amount, and VAT. You can request an itemised invoice if you need more detail.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                                {INVOICE_ITEMS.map((item) => (
                                    <section key={item.title} className="bg-white rounded-2xl border border-primary/10 p-6">
                                        <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-primary/70">{item.text}</p>
                                    </section>
                                ))}
                            </div>

                            <p>
                                Medicine, consumable materials, laboratory work and travel can be billed separately when permitted by the regulation. A low-looking examination line therefore does not establish that the total invoice is wrong.
                            </p>

                            <h2 id="estimate" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Estimates, rate agreements and payment
                            </h2>
                            <p>
                                Ask for an estimate before planned diagnostics or treatment. An estimate is useful but not binding because findings, complications, and the medically necessary plan can change. Ask the clinic to explain assumptions and agree when it should contact you before proceeding with additional non-urgent work.
                            </p>
                            <p>
                                The ordinary GOT framework is not an absolute ban on every price discussion. In a justified individual case, a rate below the 1x rate or above the 3x rate can be agreed in text before treatment under section 5. The regulation also contains narrow exceptions, including specified work involving free-roaming cats. This is different from demanding an informal cash discount after treatment.
                            </p>
                            <p>
                                Payment terms are separate from the fee calculation. Ask before treatment which methods are accepted and whether instalments or external financing are available. Do not assume that a clinic must provide credit.
                            </p>

                            <h2 id="control-costs" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Six practical ways to control uncertainty
                            </h2>
                            <p>
                                There is no universal average vet bill, but you can make the scope and payment process clearer before planned care.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                                {COST_CONTROLS.map((item) => (
                                    <section key={item.number} className="bg-white rounded-2xl border border-primary/10 p-6">
                                        <p className="text-xs font-black text-accent-ink mb-2">{item.number}</p>
                                        <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-primary/70">{item.text}</p>
                                    </section>
                                ))}
                            </div>

                            <p>
                                If you are comparing health cover with self-funding, use our{' '}
                                <Link to="/blog/pet-insurance-germany" className="text-accent-ink font-bold hover:underline">
                                    Pet insurance comparison guide
                                </Link>
                                . Check the policy&apos;s GOT reimbursement ceiling, deductible, annual limit, waiting periods, and exclusions rather than assuming every veterinary invoice will be paid.
                            </p>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official sources
                            </h2>
                            <ul>
                                <li>
                                    <a
                                        href="https://www.gesetze-im-internet.de/got_2022/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Official German veterinary fee regulation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.gesetze-im-internet.de/got_2022/__2.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Official GOT section 2 on ordinary fees
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.gesetze-im-internet.de/got_2022/__4.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Official GOT section 4 on emergency fees
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.gesetze-im-internet.de/got_2022/__7.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Official GOT section 7 on invoices
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.bundestieraerztekammer.de/tieraerzte/beruf/got/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Bundestierärztekammer GOT guide for pet owners
                                    </a>
                                </li>
                            </ul>

                            <h2 className="text-3xl font-bold text-primary mt-16 mb-6">
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

                            <div className="bg-accent/10 p-8 rounded-2xl my-12 text-center border border-accent/20 not-prose">
                                <h3 className="text-2xl font-bold text-primary mb-3">Ask about the plan before the bill</h3>
                                <p className="mb-6 text-primary/75">
                                    Clear communication helps you understand the proposed work, alternatives, estimated range, and payment process.
                                </p>
                                <Link
                                    to="/"
                                    className="min-h-11 inline-flex items-center justify-center bg-accent-ink hover:bg-primary text-white font-bold py-3 px-7 rounded-xl transition-colors"
                                >
                                    English-speaking vets in Germany
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/vet-costs-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
