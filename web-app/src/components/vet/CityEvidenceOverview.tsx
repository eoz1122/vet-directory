import { Link } from 'react-router-dom';

export interface CityEvidenceCounts {
    officialWebsite: number;
    governmentSource: number;
    communityConfirmed: number;
    communityListed: number;
}

interface CityEvidenceOverviewProps {
    city: string;
    counts: CityEvidenceCounts;
}

const evidenceDetails = [
    {
        key: 'officialWebsite' as const,
        label: 'Official website',
        description: 'The practice publishes English-language service on its own website.',
    },
    {
        key: 'governmentSource' as const,
        label: 'Government source',
        description: 'A government veterinary resource identifies the practice as English-speaking.',
    },
    {
        key: 'communityConfirmed' as const,
        label: 'Community confirmed',
        description: 'Pet owners have reported successful English communication.',
    },
    {
        key: 'communityListed' as const,
        label: 'Confirmation needed',
        description: 'The listing is community-sourced and English availability still needs confirmation.',
    },
];

const bookingSteps = [
    {
        title: 'Check the evidence source',
        description: 'Open the evidence shown on the listing and note whether it comes from the practice, a government source or the community.',
    },
    {
        title: 'Confirm English for your appointment',
        description: 'Ask which clinician or team member can communicate in English at the time you plan to visit.',
    },
    {
        title: 'Confirm services, hours and likely fees',
        description: 'Check that the practice provides the care you need, when it is available, and how charges or payment will be handled.',
    },
];

export function CityEvidenceOverview({ city, counts }: CityEvidenceOverviewProps) {
    const evidenceHeadingId = `city-evidence-${city.toLowerCase()}`;
    const bookingHeadingId = `city-booking-${city.toLowerCase()}`;

    return (
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <section
                aria-labelledby={evidenceHeadingId}
                className="rounded-3xl border border-primary/10 bg-white p-5 sm:p-7"
            >
                <h2 id={evidenceHeadingId} className="text-2xl font-bold text-primary">
                    How we verify {city} listings
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-primary/75">
                    Evidence strength differs by practice. These totals come directly from the listings currently shown on this page.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {evidenceDetails
                        .filter((detail) => counts[detail.key] > 0)
                        .map((detail) => {
                            const count = counts[detail.key];
                            return (
                                <article
                                    key={detail.key}
                                    className="rounded-2xl border border-primary/10 bg-secondary/40 p-4"
                                >
                                    <p className="text-sm font-bold text-primary">{detail.label}</p>
                                    <p className="mt-1 text-lg font-black text-accent">
                                        {count} {count === 1 ? 'listing' : 'listings'}
                                    </p>
                                    <p className="mt-2 text-sm leading-relaxed text-primary/70">
                                        {detail.description}
                                    </p>
                                </article>
                            );
                        })}
                </div>
                <Link
                    to="/quality-promise"
                    className="mt-5 inline-flex min-h-11 items-center font-bold text-accent hover:underline"
                >
                    Read our Quality Promise
                </Link>
            </section>

            <section
                aria-labelledby={bookingHeadingId}
                className="rounded-3xl border border-primary/10 bg-primary p-5 text-secondary sm:p-7"
            >
                <h2 id={bookingHeadingId} className="text-2xl font-bold">
                    Before booking a vet in {city}
                </h2>
                <ol className="mt-5 space-y-5">
                    {bookingSteps.map((step, index) => (
                        <li key={step.title} className="flex gap-3">
                            <span
                                aria-hidden="true"
                                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent font-black text-primary"
                            >
                                {index + 1}
                            </span>
                            <div>
                                <p className="font-bold">{step.title}</p>
                                <p className="mt-1 text-sm leading-relaxed text-secondary/85">
                                    {step.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}
