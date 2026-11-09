import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ArticleLayout from '../components/ArticleLayout';
import ArticleHeader from '../components/ArticleHeader';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import vetsData from '../data/vets.json';
import type { Vet } from '../types/vet';
import { filterDisplayableVets } from '../utils/activeVets';
import { getVetDirectoryCounts } from '../utils/vetDirectoryStats';
import { generateArticleSchema } from '../utils/schema';

const TITLE = 'English-Speaking Vets in Berlin (2026): How to Find and Book';
const DESCRIPTION = 'Looking for an English-speaking vet in Berlin? Find community-verified practices, book with confidence, and keep the official emergency number ready.';
const URL = 'https://englishspeakinggermany.online/blog/english-speaking-vet-berlin';
const DATE = '2026-11-09';

const BERLIN_EMERGENCY_URL = 'https://tieraerztekammer-berlin.de/notdienst/';
const BERLIN_LICENSING_URL = 'https://service.berlin.de/dienstleistung/325553/en/';
const BERLIN_EMERGENCY_NUMBER = '030 8322 9000';

const TABLE_OF_CONTENTS = [
    { id: 'quick-answer', label: 'Quick answer' },
    { id: 'directory', label: 'Use the Berlin directory' },
    { id: 'booking-checks', label: 'Ask before booking' },
    { id: 'evidence', label: 'Understand the evidence labels' },
    { id: 'emergency', label: 'Emergency care in Berlin' },
];

const bookingChecks = [
    {
        title: 'Do you accept new patients?',
        text: 'A practice can offer English support and still be full. Ask whether it can take your dog or cat now, and whether you need a first appointment before routine treatment.',
    },
    {
        title: 'Can the appointment be handled in English?',
        text: 'Confirm English availability for the appointment itself, not only the website or booking form. Ask whether an English-speaking vet or staff member will be present.',
    },
    {
        title: 'What should I bring?',
        text: 'Have the pet passport, vaccination record, medication list, insurance details and a short timeline of symptoms ready. This helps the practice triage you before arrival.',
    },
    {
        title: 'What will the visit cost?',
        text: 'Ask whether the practice can give an estimate and whether emergency, weekend or laboratory charges may apply. Our GOT fee guide explains the usual German billing structure.',
    },
];

const articleSchema = generateArticleSchema(TITLE, DESCRIPTION, URL, DATE, DATE);

const displayableVets = filterDisplayableVets(vetsData as Vet[]);
const berlinVets = displayableVets.filter((vet) => vet.city === 'Berlin');
const berlinCommunityVerified = berlinVets.filter((vet) => vet.community_status === 'Verified').length;
const directoryCounts = getVetDirectoryCounts(vetsData as Vet[]);

export default function EnglishSpeakingVetBerlin() {
    return (
        <ArticleLayout>
            <Helmet>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <meta name="keywords" content="English-speaking vet Berlin, English veterinarian Berlin, vet Berlin expat, emergency vet Berlin English" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content={URL} />
                <link rel="canonical" href={URL} />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
            </Helmet>

            <div className="article-content">
                <ArticleHeader
                    eyebrow="Berlin Vet-Finding Guide"
                    title="English-Speaking Vets in Berlin: How to Find and Book"
                    review="Published 9 November 2026 · Reviewed periodically as directory evidence changes"
                />

                <p className="border-l-4 border-accent pl-6 py-3 mb-8 bg-accent/5 rounded-r-lg text-xl text-primary/80">
                    Start with a current Berlin listing, then confirm English support and new-patient acceptance before you travel. Community confirmation is evidence, not a guarantee, so the final booking call still matters.
                </p>

                <TableOfContents items={TABLE_OF_CONTENTS} />

                <div className="prose prose-lg text-primary/80 max-w-none">
                    <section id="quick-answer" className="scroll-mt-24">
                        <h2>Quick answer</h2>
                        <p>
                            Our directory currently lists {berlinVets.length} displayable practices in Berlin, including {berlinCommunityVerified} community-verified listings. Across Germany, it maps {directoryCounts.mapped} practices in {directoryCounts.cities} cities. These are directory figures, not a complete census of every practice in Berlin.
                        </p>
                        <div className="not-prose grid gap-4 sm:grid-cols-3 my-8">
                            <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                                <p className="text-3xl font-black text-accent">{berlinVets.length}</p>
                                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary/55">Berlin listings</p>
                            </div>
                            <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                                <p className="text-3xl font-black text-accent">{berlinCommunityVerified}</p>
                                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary/55">Community verified</p>
                            </div>
                            <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                                <p className="text-3xl font-black text-accent">{BERLIN_EMERGENCY_NUMBER}</p>
                                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-primary/55">Berlin emergency line</p>
                            </div>
                        </div>
                    </section>

                    <section id="directory" className="scroll-mt-24">
                        <h2>Use the Berlin directory as your shortlist</h2>
                        <p>
                            Filter by district, emergency information and evidence labels, then open the practice website or call before you book. The directory keeps public listing data separate from English-language confirmation so you can see what is known and what still needs checking.
                        </p>
                        <div className="not-prose my-6 flex flex-wrap gap-3">
                            <Link
                                to="/vets/berlin"
                                className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-secondary transition hover:bg-primary/90"
                            >
                                Browse all Berlin listings
                            </Link>
                            <Link
                                to="/quality-promise"
                                className="inline-flex min-h-11 items-center rounded-xl border border-primary/15 bg-white px-5 py-3 text-sm font-bold text-primary transition hover:border-accent hover:text-accent-ink"
                            >
                                See how evidence is reviewed
                            </Link>
                        </div>
                    </section>

                    <section id="booking-checks" className="scroll-mt-24">
                        <h2>Ask these questions before booking</h2>
                        <div className="not-prose grid gap-4 sm:grid-cols-2 my-8">
                            {bookingChecks.map((check) => (
                                <div key={check.title} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                                    <h3 className="text-lg font-bold text-primary">{check.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-primary/70">{check.text}</p>
                                </div>
                            ))}
                        </div>
                        <p>
                            For ordinary appointments, keep the practice confirmation in writing if the language requirement is important. If your pet has an urgent symptom, do not wait for an email reply. Call the practice or the official emergency service.
                        </p>
                    </section>

                    <section id="evidence" className="scroll-mt-24">
                        <h2>Understand the evidence labels</h2>
                        <p>
                            A community-verified label means a visitor or local source supplied English-language evidence that was reviewed by the directory team. It does not mean the practice has promised English support forever, and it does not replace the practice&apos;s own confirmation. We keep those distinctions visible so visitors can make a safer booking decision.
                        </p>
                        <p>
                            The Berlin directory is a living list. If a practice has changed its website, stopped accepting new patients or no longer offers English support, please report it so we can review the listing rather than silently presenting stale information.
                        </p>
                    </section>

                    <section id="emergency" className="scroll-mt-24">
                        <h2>Emergency care in Berlin</h2>
                        <p>
                            The Berlin Police emergency-information page lists the Berlin Veterinary Chamber&apos;s recorded emergency service number as {BERLIN_EMERGENCY_NUMBER}. The chamber&apos;s own page should be checked for the current duty pathway before you travel.
                        </p>
                        <div className="not-prose my-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950">
                            <p className="font-bold">Keep the official route ready</p>
                            <p className="mt-2 text-sm leading-relaxed">
                                A directory listing is not a substitute for emergency triage. Call ahead, explain the symptoms, and follow the service&apos;s instructions about where to go.
                            </p>
                            <a
                                href={BERLIN_EMERGENCY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800"
                            >
                                Berlin veterinary emergency service
                            </a>
                        </div>
                        <p>
                            Berlin also regulates veterinary practice through professional licensing. The city&apos;s licensing information is useful context, but it cannot confirm whether an individual practice accepts new patients or offers appointments in English.
                        </p>
                        <p>
                            <a
                                href={BERLIN_LICENSING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-accent-ink underline underline-offset-4"
                            >
                                Berlin veterinary licensing information
                            </a>
                        </p>
                    </section>

                    <section className="not-prose my-10 rounded-2xl border border-primary/10 bg-secondary p-6">
                        <h2 className="text-2xl font-bold text-primary">Need another city or want to help?</h2>
                        <p className="mt-3 text-primary/70">
                            Browse the full directory for Hamburg, Munich, Frankfurt and other German cities, or send us a practice we should review.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link to="/" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-secondary">Find a vet near you</Link>
                            <Link to="/contact?topic=submit_vet" className="inline-flex min-h-11 items-center rounded-xl border border-primary/15 bg-white px-5 py-3 text-sm font-bold text-primary">Submit an English-speaking vet</Link>
                        </div>
                    </section>
                </div>

                <RelatedPosts currentPath="/blog/english-speaking-vet-berlin" />
            </div>
        </ArticleLayout>
    );
}
