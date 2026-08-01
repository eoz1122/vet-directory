import { trackAffiliateClick } from '../utils/analytics';

type AffiliateCalloutProps = {
    ariaLabel: string;
    description: string;
    href: string;
    linkLabel: string;
    provider: string;
    title: string;
    trackingLocation: string;
};

export default function AffiliateCallout({
    ariaLabel,
    description,
    href,
    linkLabel,
    provider,
    title,
    trackingLocation,
}: AffiliateCalloutProps) {
    return (
        <section
            role="region"
            aria-label={ariaLabel}
            className="not-prose my-10 rounded-2xl border border-accent/20 bg-accent/5 p-6 md:p-7"
        >
            <p className="text-xs font-black uppercase tracking-[0.16em] text-accent-ink">
                Sponsored option
            </p>
            <h3 className="mt-2 text-xl font-bold text-primary">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary/75">{description}</p>
            <p className="mt-3 text-xs leading-relaxed text-primary/60">
                Advertising link. We may earn a commission at no extra cost to you. This is not a ranking or endorsement.
            </p>
            <a
                href={href}
                onClick={() => trackAffiliateClick(provider, trackingLocation)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-center font-bold text-secondary transition-colors hover:bg-black sm:w-auto"
            >
                {linkLabel}
            </a>
        </section>
    );
}
