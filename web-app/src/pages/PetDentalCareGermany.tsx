import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import BlogSidebar from '../components/BlogSidebar';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'Dog & Cat Dental Care in Germany: Costs | EnglishSpeakingVets';
const HEADING = 'Dog and Cat Dental Care in Germany: Costs and GOT Fees (2026)';
const DESCRIPTION = 'What dental care costs for dogs and cats in Germany: verified GOT fees for scaling, extractions and anaesthesia, worked bill examples, and insurance traps.';
const URL = 'https://englishspeakinggermany.online/blog/pet-dental-care-germany';

const ARTICLE_SCHEMA = generateArticleSchema(
    HEADING,
    DESCRIPTION,
    URL,
    '2026-08-02',
    '2026-08-02',
);

const FAQ_ITEMS = [
    {
        question: 'How much does a dental cleaning cost for a dog or cat in Germany?',
        answer: 'There is no single national price. The GOT 1x fee for removal of tartar and deposits with scaling and polishing is 61.97 EUR net, and a straightforward case is usually billed together with a general examination at 23.62 EUR net and inhalation anaesthesia at 61.57 EUR net. At the 2x rate plus 19% VAT that combination illustrates roughly 350 EUR, but dental radiographs, extractions, monitoring, infusions, laboratory work and medicine are billed separately and can raise the invoice well beyond 1,000 EUR.',
    },
    {
        question: 'Why does my German vet insist on anaesthesia for a dental cleaning?',
        answer: 'Dental disease develops below the gumline, where an awake animal cannot be examined, probed, radiographed or treated. Anaesthesia also allows a tube to protect the airway from water and debris. The American Veterinary Dental College strongly opposes anaesthesia-free dental cleaning for companion animals because it removes visible tartar without treating the disease.',
    },
    {
        question: 'Is dental treatment covered by German pet insurance?',
        answer: 'It depends entirely on the policy. Dentistry is frequently a separate module, an annual sub-limit, or a benefit tied to documented yearly prophylaxis, and routine descaling is often excluded as a preventive service. Read the dental clause, the waiting period and the GOT reimbursement ceiling before you assume a dental invoice is covered.',
    },
    {
        question: 'What is FORL in cats and why is it expensive?',
        answer: 'FORL stands for feline odontoclastic resorptive lesions, a painful tooth resorption process in which the animal own cells break down tooth substance. It is common in adult cats, often invisible without dental radiographs, and the treatment is extraction rather than filling. Several complicated extractions plus a full set of radiographs are what push a cat dental invoice into four figures.',
    },
    {
        question: 'Are German veterinary dental fees changing in 2026?',
        answer: 'The GOT took effect on 22 November 2022 and was amended in March 2023. The federal ministry began the scheduled evaluation of that reform in mid-2025 and expects results by the end of 2026. Until an amended regulation is published, the fees in the current schedule apply.',
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
    { id: 'why-it-matters', label: 'Why German vets push dental care' },
    { id: 'got-fees', label: 'The official GOT dental fees' },
    { id: 'worked-examples', label: 'Two worked invoice examples' },
    { id: 'anaesthesia', label: 'Why anaesthesia is not optional' },
    { id: 'cats-forl', label: 'FORL: the cat-specific problem' },
    { id: 'insurance', label: 'What insurance actually covers' },
    { id: 'prevention', label: 'Prevention that lowers the bill' },
    { id: 'german-terms', label: 'German words on the estimate' },
    { id: 'find-a-vet', label: 'Finding the right vet' },
    { id: 'sources', label: 'Official sources' },
];

const GOT_DENTAL_ITEMS = [
    { number: '921', service: 'Eingehende Untersuchung einzelner Organe des stomatognathen Systems', english: 'Detailed examination of the mouth and jaw', fee: '16.43' },
    { number: '931', service: 'Entfernung von geringfügigem Zahnstein, manuell, ohne Politur', english: 'Manual removal of minor tartar, no polishing', fee: '20.54' },
    { number: '932', service: 'Entfernung von Zahnstein und Belägen, mit Scaling und Politur', english: 'Tartar and plaque removal with scaling and polishing', fee: '61.97' },
    { number: '933', service: 'Entfernung von Zahnstein und Belägen mit Scaling und Politur, kompliziert', english: 'The same treatment, complicated case', fee: '108.82' },
    { number: '942', service: 'Zahnfüllung', english: 'Tooth filling', fee: '61.57' },
    { number: '944', service: 'Wurzelbehandlung', english: 'Root canal treatment', fee: '30.78' },
    { number: '951', service: 'Zahnextraktion', english: 'Tooth extraction, per tooth', fee: '10.26' },
    { number: '955', service: 'Zahnextraktion kompliziert', english: 'Complicated extraction, per tooth', fee: '41.04' },
    { number: '961', service: 'Gingivektomie', english: 'Gum tissue removal', fee: '41.05' },
];

const SUPPORT_ITEMS = [
    { number: '16', service: 'Allgemeine Untersuchung mit Beratung', english: 'General examination with consultation, dog, cat, ferret', fee: '23.62' },
    { number: '320', service: 'Injektionsnarkose intravenös', english: 'Intravenous injection anaesthesia, dog, cat, ferret', fee: '24.19' },
    { number: '337', service: 'Inhalationsnarkose', english: 'Inhalation anaesthesia, dog, cat, ferret', fee: '61.57' },
    { number: '166', service: 'Erste und zweite Röntgenaufnahme, jeweils', english: 'First and second radiograph, each', fee: '26.53' },
    { number: '167', service: 'Dritte und jede folgende Röntgenaufnahme, jeweils', english: 'Third and each following radiograph, each', fee: '18.03' },
];

const PREVENTION_STEPS = [
    {
        number: '01',
        title: 'Brush, and count in weeks not days',
        text: 'Daily brushing with a pet toothpaste is the single measure with the strongest evidence behind it. Introduce the brush over two to three weeks by pairing it with food rather than restraining the animal.',
    },
    {
        number: '02',
        title: 'Treat chews as a supplement',
        text: 'Dental chews and additives reduce plaque build-up between cleanings. They do not remove existing tartar and they do not replace treatment once gum disease has started.',
    },
    {
        number: '03',
        title: 'Avoid genuinely hard objects',
        text: 'Antlers, hooves, hard nylon bones and stones are a common cause of slab fractures in the large chewing teeth. A fractured tooth with an exposed pulp is painful and needs treatment, not observation.',
    },
    {
        number: '04',
        title: 'Ask for a mouth check at every visit',
        text: 'Add the mouth to your annual vaccination appointment. Catching gingivitis early is the difference between a scaling appointment and a multiple-extraction appointment.',
    },
    {
        number: '05',
        title: 'Take bad breath seriously',
        text: 'Persistent Maulgeruch is not a normal feature of dogs and cats. It is usually the first sign an owner notices of bacterial disease under the gumline.',
    },
    {
        number: '06',
        title: 'Watch for silent pain in cats',
        text: 'Cats rarely stop eating. Chewing on one side, dropping kibble, pawing at the mouth, drooling or a sudden preference for wet food are more reliable signals.',
    },
];

const GERMAN_TERMS = [
    { de: 'Zahnstein', en: 'Tartar, calculus' },
    { de: 'Zahnbelag / Plaque', en: 'Soft plaque, the film before it hardens' },
    { de: 'Zahnfleischentzündung / Gingivitis', en: 'Gum inflammation, the reversible early stage' },
    { de: 'Parodontitis', en: 'Periodontal disease affecting the tooth support' },
    { de: 'Zahnsanierung', en: 'The full dental procedure under anaesthesia' },
    { de: 'Zahnextraktion', en: 'Tooth extraction' },
    { de: 'Zahnröntgen', en: 'Dental radiographs' },
    { de: 'Inhalationsnarkose', en: 'Gas anaesthesia via a tube' },
    { de: 'Maulgeruch', en: 'Bad breath' },
    { de: 'Kostenvoranschlag', en: 'Non-binding written cost estimate' },
];

export default function PetDentalCareGermany() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary">
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta
                    name="keywords"
                    content="dog dental cleaning Germany cost, Zahnsteinentfernung Hund Kosten, cat tooth extraction Germany, GOT dental fees, Zahnsanierung Katze, FORL cat Germany, veterinary dentist Germany English"
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
                            Health and money guide
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-5 leading-tight">
                            {HEADING}
                        </h1>
                        <p className="text-sm text-primary/55 mb-8">
                            Published 2 August 2026 · Fees checked against the official GOT schedule on 2 August 2026
                        </p>

                        <TableOfContents items={TABLE_OF_CONTENTS} />

                        <div className="prose prose-lg text-primary/80 max-w-none">
                            <p className="border-l-4 border-accent pl-6 py-3 bg-accent/5 rounded-r-xl text-xl mb-8">
                                A German vet who recommends a &quot;Zahnsanierung&quot; is not upselling. Dental disease is one of the most commonly diagnosed problems in adult dogs and cats, and the German fee schedule prices the work in a way most expats find surprising the first time.
                            </p>

                            <aside className="bg-white border border-primary/10 rounded-2xl p-6 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">The short version</p>
                                <p className="text-sm leading-relaxed text-primary/75">
                                    A cleaning is never one line on the invoice. Examination, anaesthesia, the cleaning itself, radiographs and any extractions are separate GOT services, each multiplied by the selected rate, plus medicine, materials and 19% VAT.
                                </p>
                            </aside>

                            <h2 id="why-it-matters" className="text-3xl font-bold text-primary mt-12 mb-6 scroll-mt-24">
                                Why German vets push dental care
                            </h2>
                            <p>
                                Tartar is the visible part of the problem, not the problem. Bacteria colonise the space under the gum, the supporting tissue is destroyed, and the process is painful long before an animal shows it. Dogs and cats almost never stop eating because of dental pain, which is exactly why owners underestimate it.
                            </p>
                            <p>
                                The <a href="https://wsava.org/global-guidelines/dental-guidelines/" target="_blank" rel="noopener noreferrer">WSAVA Global Dental Guidelines</a> set out the international standard your German vet is most likely working to: a full oral examination under anaesthesia, dental radiographs to see the two thirds of each tooth that is buried, treatment of what is found, and home care afterwards. That standard is why the estimate is longer than you expect.
                            </p>

                            <div className="bg-primary text-secondary p-7 rounded-2xl my-8 not-prose">
                                <h3 className="text-xl font-bold text-accent mb-3">What a &quot;simple cleaning&quot; cannot tell you</h3>
                                <p className="text-sm leading-relaxed text-secondary/85">
                                    Scaling the visible crown leaves the disease under the gumline untouched. The mouth looks better and the pain stays. This is the core reason a German clinic will not quote you a flat descaling price over the phone.
                                </p>
                            </div>

                            <h2 id="got-fees" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                The official GOT dental fees
                            </h2>
                            <p>
                                Veterinary charges in Germany follow the <strong>Gebührenordnung für Tierärztinnen und Tierärzte</strong> (GOT). Dental work sits in section <strong>14. Stomatologie</strong> of the fee schedule, items 921 to 979. Every amount below is the <strong>1x rate, net of VAT</strong>, taken from the current official schedule.
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="min-w-[640px] w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm">Item</th>
                                            <th className="p-4 font-bold text-sm">Service in the schedule</th>
                                            <th className="p-4 font-bold text-sm">In English</th>
                                            <th className="p-4 font-bold text-sm">1x, net</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/10">
                                        {GOT_DENTAL_ITEMS.map((item) => (
                                            <tr key={item.number}>
                                                <td className="p-4 font-bold text-primary">{item.number}</td>
                                                <td className="p-4 text-primary/70 text-sm">{item.service}</td>
                                                <td className="p-4 text-primary/70 text-sm">{item.english}</td>
                                                <td className="p-4 font-bold text-primary whitespace-nowrap">€{item.fee}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p>
                                Those items never appear alone. The examination, the anaesthesia and any imaging are billed from other chapters of the same schedule:
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="min-w-[640px] w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm">Item</th>
                                            <th className="p-4 font-bold text-sm">Service in the schedule</th>
                                            <th className="p-4 font-bold text-sm">In English</th>
                                            <th className="p-4 font-bold text-sm">1x, net</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/10">
                                        {SUPPORT_ITEMS.map((item) => (
                                            <tr key={item.number}>
                                                <td className="p-4 font-bold text-primary">{item.number}</td>
                                                <td className="p-4 text-primary/70 text-sm">{item.service}</td>
                                                <td className="p-4 text-primary/70 text-sm">{item.english}</td>
                                                <td className="p-4 font-bold text-primary whitespace-nowrap">€{item.fee}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <aside className="bg-white border border-primary/10 rounded-2xl p-6 my-8 not-prose">
                                <p className="font-bold text-primary mb-2">A detail worth knowing</p>
                                <p className="text-sm leading-relaxed text-primary/75">
                                    The schedule contains <strong>no separate dental radiograph item</strong>. Dental images are billed under the general radiography numbers 166 and 167, one charge per image. A full-mouth series in a cat can be eight to twelve images, so imaging alone becomes a meaningful part of the invoice.
                                </p>
                            </aside>

                            <p>
                                For ordinary services the vet selects a continuous rate between 1x and 3x using the statutory case factors, and the emergency rules are different again. Our{' '}
                                <Link to="/blog/vet-costs-germany" className="text-accent-ink font-bold hover:underline">
                                    guide to GOT fees and veterinary invoices
                                </Link>{' '}
                                explains how the multiplier is chosen and what the invoice must show.
                            </p>

                            <h2 id="worked-examples" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Two worked invoice examples
                            </h2>
                            <p>
                                The arithmetic below uses the published fees, a 2x rate, and 19% VAT. It is an illustration of how the schedule adds up. It is <strong>not a quote</strong> and it does not include the pre-anaesthetic blood work, monitoring, infusion, pain relief or take-home medicine that a clinic will usually bill on top.
                            </p>

                            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">Example A: a straightforward dog cleaning</h3>
                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-6 not-prose">
                                <table className="min-w-[560px] w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm">Service</th>
                                            <th className="p-4 font-bold text-sm">Item</th>
                                            <th className="p-4 font-bold text-sm">1x, net</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/10">
                                        <tr>
                                            <td className="p-4 text-primary/70">General examination with consultation</td>
                                            <td className="p-4 text-primary/70">16</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€23.62</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary/70">Inhalation anaesthesia</td>
                                            <td className="p-4 text-primary/70">337</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€61.57</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary/70">Scaling and polishing</td>
                                            <td className="p-4 text-primary/70">932</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€61.97</td>
                                        </tr>
                                        <tr className="bg-secondary/60">
                                            <td className="p-4 font-bold text-primary">Subtotal at 1x</td>
                                            <td className="p-4"></td>
                                            <td className="p-4 font-bold text-primary whitespace-nowrap">€147.16</td>
                                        </tr>
                                        <tr className="bg-secondary/60">
                                            <td className="p-4 font-bold text-primary">At 2x, plus 19% VAT</td>
                                            <td className="p-4"></td>
                                            <td className="p-4 font-bold text-accent-ink whitespace-nowrap">€350.24</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                At the 1x rate the same three services come to €175.12 including VAT, and at 3x to €525.36. That spread is the regulation working as designed, not a clinic inventing prices.
                            </p>

                            <h3 className="text-2xl font-bold text-primary mt-10 mb-4">Example B: a cat with resorptive lesions</h3>
                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-6 not-prose">
                                <table className="min-w-[560px] w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm">Service</th>
                                            <th className="p-4 font-bold text-sm">Item</th>
                                            <th className="p-4 font-bold text-sm">1x, net</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/10">
                                        <tr>
                                            <td className="p-4 text-primary/70">General examination with consultation</td>
                                            <td className="p-4 text-primary/70">16</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€23.62</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary/70">Inhalation anaesthesia</td>
                                            <td className="p-4 text-primary/70">337</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€61.57</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary/70">Scaling and polishing</td>
                                            <td className="p-4 text-primary/70">932</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€61.97</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary/70">Radiographs, first two</td>
                                            <td className="p-4 text-primary/70">166 x2</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€53.06</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary/70">Radiographs, six more</td>
                                            <td className="p-4 text-primary/70">167 x6</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€108.18</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 text-primary/70">Three complicated extractions</td>
                                            <td className="p-4 text-primary/70">955 x3</td>
                                            <td className="p-4 text-primary/70 whitespace-nowrap">€123.12</td>
                                        </tr>
                                        <tr className="bg-secondary/60">
                                            <td className="p-4 font-bold text-primary">Subtotal at 1x</td>
                                            <td className="p-4"></td>
                                            <td className="p-4 font-bold text-primary whitespace-nowrap">€431.52</td>
                                        </tr>
                                        <tr className="bg-secondary/60">
                                            <td className="p-4 font-bold text-primary">At 2x, plus 19% VAT</td>
                                            <td className="p-4"></td>
                                            <td className="p-4 font-bold text-accent-ink whitespace-nowrap">€1,027.02</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                This is the invoice that shocks people, and nothing in it is unusual. Ask for a written <em>Kostenvoranschlag</em> before the appointment and agree in advance when the clinic should phone you if it finds more diseased teeth than expected once the animal is under anaesthesia.
                            </p>

                            <h2 id="anaesthesia" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Why anaesthesia is not optional
                            </h2>
                            <p>
                                Expats sometimes arrive expecting the &quot;anaesthesia-free&quot; scaling services marketed in other countries. German veterinary practice and the international specialist bodies reject that approach. The disease lives <strong>below the gumline</strong>, where a conscious animal cannot be probed, radiographed or treated, and a breathing tube is what stops water and bacterial debris from reaching the lungs.
                            </p>
                            <p>
                                The <a href="https://afd.avdc.org/reasons-not-to-choose-anethesia-free-pet-dentals/" target="_blank" rel="noopener noreferrer">American Veterinary Dental College</a> strongly opposes anaesthesia-free dental cleaning for companion animals: it produces a cosmetically cleaner crown while leaving the actual disease in place, and sharp instruments in an awake animal carry a real injury risk.
                            </p>

                            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
                                <section className="bg-white rounded-2xl border border-primary/10 p-6">
                                    <p className="text-2xl font-black text-accent-ink mb-2">0.05%</p>
                                    <p className="font-bold text-primary mb-2">Healthy dogs</p>
                                    <p className="text-sm text-primary/65">Anaesthetic-related death risk in the CEPSAF cohort study.</p>
                                </section>
                                <section className="bg-white rounded-2xl border border-primary/10 p-6">
                                    <p className="text-2xl font-black text-accent-ink mb-2">0.11%</p>
                                    <p className="font-bold text-primary mb-2">Healthy cats</p>
                                    <p className="text-sm text-primary/65">Same study. Overall rates including sick animals were 0.17% and 0.24%.</p>
                                </section>
                                <section className="bg-white rounded-2xl border border-primary/10 p-6">
                                    <p className="text-2xl font-black text-accent-ink mb-2">Ask</p>
                                    <p className="font-bold text-primary mb-2">About monitoring</p>
                                    <p className="text-sm text-primary/65">Pre-anaesthetic blood work, a dedicated monitoring nurse, warming and fluids all reduce risk.</p>
                                </section>
                            </div>
                            <p>
                                Those figures come from the UK Confidential Enquiry into Perioperative Small Animal Fatalities, a large prospective study published in 2008. It remains the most widely cited dataset on the question, and the pattern it shows is consistent: the animal&apos;s health status matters far more than the anaesthetic itself. Sick animals in that study carried a risk above 1.3%.
                            </p>
                            <p>
                                If your pet is older or has a known heart or kidney problem, that is an argument for a thorough work-up before the procedure, not an argument for leaving an infected mouth untreated. The same anaesthesia questions apply to other planned surgery, which we cover in the{' '}
                                <Link to="/blog/neutering-cost-germany" className="text-accent-ink font-bold hover:underline">
                                    neutering and spaying cost guide
                                </Link>
                                .
                            </p>

                            <h2 id="cats-forl" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                FORL: the cat-specific problem
                            </h2>
                            <p>
                                <strong>FORL</strong> stands for feline odontoclastic resorptive lesions, in German <em>feline odontoklastische resorptive Läsionen</em>. The cat&apos;s own cells dissolve tooth substance from the inside. It is a genuine tooth resorption process, it is painful, and no filling or cleaning stops it. The treatment is extraction of the affected teeth.
                            </p>
                            <p>
                                Reported prevalence varies a great deal with the age of the population and the diagnostic method used, with published estimates for adult cats spanning roughly a quarter to three quarters of animals. What matters practically is simpler: many lesions sit below the gumline and are invisible on a visual inspection, so the diagnosis depends on dental radiographs taken under anaesthesia.
                            </p>

                            <aside className="bg-accent/5 border border-accent/20 rounded-2xl p-6 my-8 not-prose">
                                <h3 className="font-bold text-primary mb-2">Signs worth an appointment</h3>
                                <p className="text-sm leading-relaxed text-primary/75">
                                    Chattering of the jaw when the mouth is touched, dropping food, chewing on one side, drooling, sudden preference for wet food, or a red line where the gum meets the tooth. A cat that still eats is not a cat without dental pain.
                                </p>
                            </aside>

                            <h2 id="insurance" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                What insurance actually covers
                            </h2>
                            <p>
                                Dental cover is where German pet health policies differ from one another most, and where expats most often discover a clause after the fact. Do not assume a health policy pays a dental invoice. Read the contract for these four points before you need them:
                            </p>
                            <ul>
                                <li><strong>Is dentistry included at all,</strong> or is it a paid add-on module?</li>
                                <li><strong>Is there a separate annual dental sub-limit</strong> below the overall policy limit?</li>
                                <li><strong>Is cover conditional on documented yearly prophylaxis</strong> or a recorded dental check?</li>
                                <li><strong>Up to which GOT multiplier does the insurer reimburse?</strong> A policy capped at 2x leaves you paying the difference on a 3x invoice.</li>
                            </ul>
                            <p>
                                Routine descaling is frequently treated as preventive care and excluded, while treatment of diagnosed disease is covered. Waiting periods also matter, because a mouth that is already inflamed when you sign is a pre-existing condition. Compare the wording using our{' '}
                                <Link to="/blog/pet-insurance-germany" className="text-accent-ink font-bold hover:underline">
                                    pet insurance guide for Germany
                                </Link>
                                .
                            </p>

                            <h2 id="prevention" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Prevention that lowers the bill
                            </h2>
                            <p>
                                Home care does not cure established periodontal disease, but it slows the cycle and stretches the interval between professional cleanings. That interval is where the money is.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
                                {PREVENTION_STEPS.map((item) => (
                                    <section key={item.number} className="bg-white rounded-2xl border border-primary/10 p-6">
                                        <p className="text-xs font-black text-accent-ink mb-2">{item.number}</p>
                                        <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                                        <p className="text-sm leading-relaxed text-primary/70">{item.text}</p>
                                    </section>
                                ))}
                            </div>

                            <p>
                                Diet plays a supporting role rather than a decisive one. Specific dental formulas exist, but no food replaces brushing. Our buyer guides to{' '}
                                <Link to="/blog/best-dog-food-germany" className="text-accent-ink font-bold hover:underline">
                                    dog food in Germany
                                </Link>{' '}
                                and{' '}
                                <Link to="/blog/best-cat-food-germany" className="text-accent-ink font-bold hover:underline">
                                    cat food in Germany
                                </Link>{' '}
                                explain how to read German labels. For toothpaste and prescribed dental products, the{' '}
                                <Link to="/blog/pet-medication-germany-guide" className="text-accent-ink font-bold hover:underline">
                                    pet medication guide
                                </Link>{' '}
                                covers where you can and cannot buy them.
                            </p>

                            <h2 id="german-terms" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                German words on the estimate
                            </h2>
                            <p>
                                Estimates and invoices are written in German even in practices where the consultation is in English. These are the words that carry the cost.
                            </p>

                            <div className="overflow-x-auto rounded-2xl border border-primary/10 my-8 not-prose">
                                <table className="min-w-[480px] w-full text-left border-collapse">
                                    <thead className="bg-primary text-secondary">
                                        <tr>
                                            <th className="p-4 font-bold text-sm">German</th>
                                            <th className="p-4 font-bold text-sm">What it means</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-primary/10">
                                        {GERMAN_TERMS.map((term) => (
                                            <tr key={term.de}>
                                                <td className="p-4 font-bold text-primary text-sm">{term.de}</td>
                                                <td className="p-4 text-primary/70 text-sm">{term.en}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                For describing symptoms at the counter, our{' '}
                                <Link to="/blog/german-vet-survival-kit-phrases" className="text-accent-ink font-bold hover:underline">
                                    German vet phrase kit
                                </Link>{' '}
                                covers the sentences you actually need, and the{' '}
                                <Link to="/blog/first-vet-visit-germany" className="text-accent-ink font-bold hover:underline">
                                    first vet visit guide
                                </Link>{' '}
                                explains what to bring and how billing is presented.
                            </p>

                            <h2 id="find-a-vet" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Finding the right vet
                            </h2>
                            <p>
                                Most general practices handle scaling and straightforward extractions. Complicated extractions, root canals, jaw fractures and orthodontic problems are a specialist field in Germany, with the additional qualification <em>Zusatzbezeichnung Tierzahnheilkunde</em> and the specialist title <em>Fachtierarzt für Zahnheilkunde beim Kleintier</em>. The{' '}
                                <a href="https://www.tierzahnaerzte.de/" target="_blank" rel="noopener noreferrer">
                                    Deutsche Gesellschaft für Tierzahnheilkunde
                                </a>{' '}
                                publishes a list of members who have demonstrated that qualification.
                            </p>
                            <p>
                                If you want the conversation in English first, start with our city directories for{' '}
                                <Link to="/vets/berlin" className="text-accent-ink font-bold hover:underline">Berlin</Link>,{' '}
                                <Link to="/vets/munich" className="text-accent-ink font-bold hover:underline">Munich</Link>,{' '}
                                <Link to="/vets/hamburg" className="text-accent-ink font-bold hover:underline">Hamburg</Link>,{' '}
                                <Link to="/vets/frankfurt" className="text-accent-ink font-bold hover:underline">Frankfurt</Link>{' '}
                                and{' '}
                                <Link to="/vets/cologne" className="text-accent-ink font-bold hover:underline">Cologne</Link>. A broken tooth with bleeding, a swollen face or a jaw injury is not a routine appointment: use the{' '}
                                <Link to="/guides/pet-emergency-germany" className="text-accent-ink font-bold hover:underline">
                                    pet emergency guide
                                </Link>{' '}
                                for out-of-hours contacts.
                            </p>

                            <h2 id="sources" className="text-3xl font-bold text-primary mt-16 mb-6 scroll-mt-24">
                                Official sources
                            </h2>
                            <p>
                                Fees on this page were read from the official schedule on 2 August 2026. The GOT took effect on 22 November 2022 and was amended in March 2023. The federal ministry began evaluating that reform in mid-2025 and expects results by the end of 2026, so check the schedule again before relying on a figure for a large planned procedure.
                            </p>
                            <ul>
                                <li>
                                    <a href="https://www.gesetze-im-internet.de/got_2022/anlage.html" target="_blank" rel="noopener noreferrer">
                                        Official GOT fee schedule, including section 14 Stomatologie
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.gesetze-im-internet.de/got_2022/__2.html" target="_blank" rel="noopener noreferrer">
                                        Official GOT section 2 on how the 1x to 3x rate is chosen
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.bmleh.de/DE/themen/tiere/got.html" target="_blank" rel="noopener noreferrer">
                                        Federal ministry page on the GOT and its evaluation
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.bundestieraerztekammer.de/tierhalter/got/" target="_blank" rel="noopener noreferrer">
                                        Bundestierärztekammer GOT explainer for pet owners
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wsava.org/global-guidelines/dental-guidelines/" target="_blank" rel="noopener noreferrer">
                                        WSAVA Global Dental Guidelines
                                    </a>
                                </li>
                                <li>
                                    <a href="https://afd.avdc.org/reasons-not-to-choose-anethesia-free-pet-dentals/" target="_blank" rel="noopener noreferrer">
                                        American Veterinary Dental College on anaesthesia-free dentistry
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.tierzahnaerzte.de/" target="_blank" rel="noopener noreferrer">
                                        Deutsche Gesellschaft für Tierzahnheilkunde member list
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
                                <h3 className="text-2xl font-bold text-primary mb-3">Discuss the mouth before it becomes an extraction</h3>
                                <p className="mb-6 text-primary/75">
                                    A dental plan is easier to agree when you and the vet share a language. Find a practice near you that consults in English.
                                </p>
                                <Link
                                    to="/"
                                    className="min-h-11 inline-flex items-center justify-center bg-accent-ink hover:bg-primary text-white font-bold py-3 px-7 rounded-xl transition-colors"
                                >
                                    English-speaking vets in Germany
                                </Link>
                            </div>
                        </div>

                        <RelatedPosts currentPath="/blog/pet-dental-care-germany" />
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
