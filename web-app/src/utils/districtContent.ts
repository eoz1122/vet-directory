import type { Vet } from '../types/vet';

export interface DistrictFaq {
    q: string;
    a: string;
}

export interface GeneratedDistrictContent {
    /** Multi-paragraph markdown body, unique per district (driven by real listing data). */
    intro: string;
    /** Data-driven FAQ block (also emitted as FAQPage JSON-LD for People Also Ask). */
    faqs: DistrictFaq[];
}

/** Joins a list into readable prose: "A", "A and B", "A, B, and C". */
const prose = (items: string[]): string => {
    const xs = items.filter(Boolean);
    if (xs.length <= 1) return xs[0] ?? '';
    if (xs.length === 2) return `${xs[0]} and ${xs[1]}`;
    return `${xs.slice(0, -1).join(', ')}, and ${xs[xs.length - 1]}`;
};

const isVerified = (v: Vet): boolean =>
    v.community_status === 'Verified' || v.verification?.status === 'Verified';

/**
 * Builds genuinely unique, factual page copy for a district from its own listings.
 * No invented facts: every sentence is grounded in practice names, English-language
 * signals, verification status, and emergency availability already present in the data.
 */
export function generateDistrictContent(
    district: string,
    city: string,
    vets: Vet[],
    cityVets: Vet[] = vets,
): GeneratedDistrictContent {
    const count = vets.length;
    const names = vets.map(v => v.practice_name).filter(Boolean);
    const verifiedNames = vets.filter(isVerified).map(v => v.practice_name);
    const emergencyNames = vets
        .filter(v => v.verification?.emergency_services)
        .map(v => v.practice_name);
    // Emergency clinics elsewhere in the same city (so we never promise a resource
    // that does not exist when a small district/region has no 24/7 cover).
    const nearbyEmergencyNames = cityVets
        .filter(v => v.verification?.emergency_services)
        .map(v => v.practice_name)
        .filter(n => !emergencyNames.includes(n));

    // Signals can be combined strings ("Verified English Support; Confirmed via
    // Google Review: ...") or raw review quotes. Split on ';' and drop any fragment
    // that references a review so quotes never leak into the prose.
    const rawSignals = vets.flatMap(v => v.verification?.english_signals ?? []);
    const hasReviewSignal = rawSignals.some(s => /google review/i.test(s));
    const signals = Array.from(
        new Set(
            rawSignals
                .flatMap(s => s.split(';'))
                .map(s => s.trim())
                .filter(s => s && !/google review/i.test(s))
                .map(s => s.toLowerCase()),
        ),
    );

    const paragraphs: string[] = [];

    // 1) Coverage: how many, which ones, how many verified.
    if (count === 1) {
        paragraphs.push(
            `${names[0]} is the English-speaking veterinary practice we currently list in ${district}, ${city}. ` +
            `For expat pet owners nearby, that means a clinic where you can discuss diagnoses, treatment, and costs in English instead of translating medical German under pressure.`,
        );
    } else {
        const shown = names.slice(0, 4);
        const lead = shown.length < count
            ? `including ${prose(shown)}`
            : prose(shown);
        const verifiedNote = verifiedNames.length
            ? ` ${verifiedNames.length} of them ${verifiedNames.length === 1 ? 'is' : 'are'} marked Verified by expat pet owners in our community.`
            : '';
        paragraphs.push(
            `We list ${count} English-speaking veterinary practices in ${district}, ${city}: ${lead}.${verifiedNote} ` +
            `Each one is somewhere you can talk through your pet's care in English rather than navigating it in German.`,
        );
    }

    // 2) Why these qualify: surface concrete English-language signals.
    if (signals.length || hasReviewSignal) {
        const reasons = [
            ...signals.slice(0, 3),
            ...(hasReviewSignal ? ['English confirmed directly in their Google reviews'] : []),
        ];
        paragraphs.push(
            `${count === 1 ? 'This practice reaches' : 'These practices reach'} our directory through concrete English-language signals, such as ${prose(reasons)}. ` +
            `We track these signals per clinic so the list reflects real language access, not guesswork.`,
        );
    }

    // 3) Emergencies: only assert what the data supports.
    if (emergencyNames.length) {
        paragraphs.push(
            `${prose(emergencyNames)} also ${emergencyNames.length === 1 ? 'offers' : 'offer'} emergency or out-of-hours care in or near ${district}. ` +
            `It is worth saving the details now, before a late-night emergency makes the search harder.`,
        );
    } else if (nearbyEmergencyNames.length) {
        paragraphs.push(
            `For after-hours emergencies, the nearest option we list is ${prose(nearbyEmergencyNames.slice(0, 2))} in ${city}. It is worth saving the number before you need it.`,
        );
    } else {
        paragraphs.push(
            `We do not yet list a 24/7 emergency clinic in or near ${district}, so it is worth locating your nearest out-of-hours Tierklinik in advance.`,
        );
    }

    // FAQ block (also feeds FAQPage schema). Questions are only included when the
    // data can answer them honestly.
    const englishFaq: DistrictFaq = {
        q: `Do vets in ${district} speak English?`,
        a: count === 0
            ? `We do not yet list a confirmed English-speaking vet directly in ${district}. Check nearby districts in ${city} for the closest English-friendly practice.`
            : verifiedNames.length
                ? `Yes. We list ${count} English-speaking veterinary ${count === 1 ? 'practice' : 'practices'} in ${district}, ${verifiedNames.length} community-Verified, including ${prose(names.slice(0, 3))}${count > 3 ? ', among others' : ''}.`
                : `We list ${count} ${count === 1 ? 'practice' : 'practices'} in ${district} that our community has flagged as English-speaking${count <= 3 ? ` (${prose(names)})` : ''}. These are community-sourced rather than independently Verified, so it is worth confirming when you book.`,
    };

    const emergencyFaq: DistrictFaq | null = emergencyNames.length
        ? {
            q: `Is there an emergency vet near ${district}?`,
            a: `${prose(emergencyNames)} ${emergencyNames.length === 1 ? 'provides' : 'provide'} emergency or out-of-hours veterinary care in or near ${district}.`,
        }
        : nearbyEmergencyNames.length
            ? {
                q: `Is there an emergency vet near ${district}?`,
                a: `Not in ${district} itself, but ${prose(nearbyEmergencyNames.slice(0, 2))} in ${city} ${nearbyEmergencyNames.slice(0, 2).length === 1 ? 'offers' : 'offer'} emergency care.`,
            }
            : null; // nothing accurate to say -> omit the question entirely

    const verifyFaq: DistrictFaq = {
        q: `How do you verify English-speaking vets in ${district}?`,
        a: `Every ${district} listing is community-sourced and cross-checked for English-language signals` +
            `${signals.length ? ` such as ${prose(signals.slice(0, 2))}` : ''}` +
            `${hasReviewSignal ? ', including English confirmed in Google reviews' : ''}. ` +
            `Practices marked Verified have been confirmed by expat pet owners who have been seen there.`,
    };

    // Matches the conversational phrasing real searchers use (GSC, July 2026):
    // "is there an english-speaking vet in <district> you can recommend?".
    // Only included when there is at least one practice to point to, and the
    // answer sticks to what the data supports: community confirmations.
    const recommendFaq: DistrictFaq | null = count > 0
        ? {
            q: `Is there an English-speaking vet in ${district} you can recommend?`,
            a: verifiedNames.length
                ? `${prose(verifiedNames.slice(0, 3))} ${verifiedNames.length === 1 ? 'is' : 'are'} the community-Verified ${verifiedNames.length === 1 ? 'choice' : 'choices'} in ${district}: expat pet owners have confirmed being seen there in English. Each listing shows the practice's contact details and the evidence behind the verification.`
                : `Our ${district} ${count === 1 ? 'listing is' : 'listings are'} community-sourced${count <= 3 ? ` (${prose(names)})` : ''} rather than independently Verified yet, so we would not call ${count === 1 ? 'it' : 'any of them'} a firm recommendation. Check the English signals on each listing and confirm when booking.`,
        }
        : null;

    const faqs: DistrictFaq[] = [englishFaq, ...(recommendFaq ? [recommendFaq] : []), ...(emergencyFaq ? [emergencyFaq] : []), verifyFaq];

    return { intro: paragraphs.join('\n\n'), faqs };
}
