interface BrandLogoProps {
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function BrandLogo({ alt, className, priority = false }: BrandLogoProps) {
    return (
        <img
            src="/logo-256.webp"
            alt={alt}
            width={256}
            height={256}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
        />
    );
}
