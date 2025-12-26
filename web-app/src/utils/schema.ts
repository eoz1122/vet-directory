import type { Vet } from '../types/vet';

export function generateVetExampleSchema(vet: Vet) {
    return {
        "@type": "VeterinaryCare",
        "name": vet.practice_name,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": vet.address || "",
            "addressLocality": vet.city,
            "addressRegion": vet.district !== "Unknown" ? vet.district : "",
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": vet.coordinates.lat,
            "longitude": vet.coordinates.lng
        },
        "url": vet.contact.website,
        "telephone": vet.contact.phone,
        "image": "https://englishspeakinggermany.online/logo.png", // Fallback image
        "priceRange": "$$"
    };
}

export function generateListingSchema(vets: Vet[], title: string, description: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": title,
        "description": description,
        "numberOfItems": vets.length,
        "itemListElement": vets.map((vet, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": generateVetExampleSchema(vet)
        }))
    };
}
