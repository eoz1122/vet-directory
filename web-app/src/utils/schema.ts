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

export function generateArticleSchema(title: string, description: string, url: string, datePublished: string, imageUrl: string = "https://englishspeakinggermany.online/logo.png") {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": imageUrl,
        "author": {
            "@type": "Organization",
            "name": "EnglishSpeakingVets Germany",
            "url": "https://englishspeakinggermany.online/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "EnglishSpeakingVets Germany",
            "logo": {
                "@type": "ImageObject",
                "url": "https://englishspeakinggermany.online/logo.png"
            }
        },
        "datePublished": datePublished,
        "dateModified": new Date().toISOString().split('T')[0],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };
}
