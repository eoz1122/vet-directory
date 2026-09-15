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
            className="not-prose my-10 rounded-2xl border border-accent/20 bg-secondary/60 p-5 md:p-6"
        >
            <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-accent-ink">
                Sponsored option
            </p>
            <h3 className="mt-3 text-lg font-bold text-primary">{title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-primary/75">{description}</p>
            <div className="mt-4 flex flex-col gap-3 border-t border-primary/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-primary/60 sm:max-w-[60%]">
                    Advertising link. We may earn a commission at no extra cost to you. This is not a ranking or endorsement.
                </p>
                <a
                    href={href}
                    onClick={() => trackAffiliateClick(provider, trackingLocation)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center text-sm font-bold text-secondary transition-colors hover:bg-black sm:w-auto"
                >
                    {linkLabel}
                </a>
            </div>
        </section>
    );
}
