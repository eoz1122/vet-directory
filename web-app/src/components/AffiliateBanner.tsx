import { trackAffiliateClick } from '../utils/analytics';

type AffiliateBannerProps = {
    ariaLabel: string;
    description: string;
    eyebrow: string;
    href: string;
    linkLabel: string;
    provider: string;
    title: string;
    trackingLocation: string;
};

export default function AffiliateBanner({
    ariaLabel,
    description,
    eyebrow,
    href,
    linkLabel,
    provider,
    title,
    trackingLocation,
}: AffiliateBannerProps) {
    return (
        <section
            role="region"
            aria-label={ariaLabel}
            data-testid="affiliate-banner"
            className="not-prose my-10 overflow-hidden rounded-2xl border border-accent/30 bg-primary text-secondary shadow-sm"
        >
            <a
                href={href}
                aria-label={linkLabel}
                onClick={() => trackAffiliateClick(provider, trackingLocation)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block transition-colors hover:bg-primary/90 focus-visible:outline-none"
            >
                <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-accent px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-primary">
                                Sponsored
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-secondary/65">
                                {provider}
                            </span>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
                        <h3 className="mt-1 text-xl font-bold text-secondary">{title}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-secondary/75">{description}</p>
                    </div>
                    <span className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-secondary px-5 py-3 text-center text-sm font-bold text-primary transition-transform group-hover:translate-x-0.5">
                        {linkLabel} <span aria-hidden="true" className="ml-2">→</span>
                    </span>
                </div>
            </a>
            <p className="border-t border-secondary/15 px-5 py-3 text-xs leading-5 text-secondary/60 sm:px-6">
                Advertising link. We may earn a commission at no extra cost to you. This is not a ranking or endorsement.
            </p>
        </section>
    );
}
