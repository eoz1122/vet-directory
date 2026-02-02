import { Helmet } from 'react-helmet-async';

interface Vet {
    id: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone?: string;
    website?: string;
    email?: string;
}

interface VetSchemaProps {
    vet: Vet;
}

export default function VetSchema({ vet }: VetSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "VeterinaryCare",
        "name": vet.name,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": vet.address,
            "addressLocality": vet.city,
            "postalCode": vet.postalCode,
            "addressCountry": "DE"
        },
        ...(vet.phone && { "telephone": vet.phone }),
        ...(vet.website && { "url": vet.website }),
        ...(vet.email && { "email": vet.email }),
        "priceRange": "$$",
        "availableLanguage": ["en", "de"]
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
