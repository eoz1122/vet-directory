import type { Vet } from '../types/vet';
import { isOfficialWebsiteConfirmed, isVetVerified } from './verifiedLabel';

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
    const officialNames = vets.filter(isOfficialWebsiteConfirmed).map(v => v.practice_name);
    const communityConfirmedNames = vets
        .filter(v => isVetVerified(v) && !isOfficialWebsiteConfirmed(v))
        .map(v => v.practice_name);
    const verifiedNames = [...officialNames, ...communityConfirmedNames];
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
        paragraphs.push(officialNames.length
            ? `${names[0]} is confirmed by its official website as offering English-language service in ${district}, ${city}. ` +
                `Confirm which English-speaking clinician will be available when you book.`
            : communityConfirmedNames.length
                ? `${names[0]} is the community-confirmed veterinary practice we currently list in ${district}, ${city}. ` +
                `Community members have confirmed English availability, but it is still worth confirming who will be available when you book.`
                : `${names[0]} is the community-sourced veterinary practice we currently list in ${district}, ${city}. ` +
                    `Its listing contains an English-language signal, but English availability has not yet been confirmed through our community process. Review the evidence shown and confirm when booking.`,
        );
    } else {
        const shown = names.slice(0, 4);
        const lead = shown.length < count
            ? `including ${prose(shown)}`
            : prose(shown);
        const evidenceNotes = [
            officialNames.length
                ? `${officialNames.length} ${officialNames.length === 1 ? 'is' : 'are'} confirmed by ${officialNames.length === 1 ? 'its official website' : 'their official websites'}`
                : '',
            communityConfirmedNames.length
                ? `${communityConfirmedNames.length} ${communityConfirmedNames.length === 1 ? 'is' : 'are'} community-confirmed`
                : '',
        ].filter(Boolean);
        const verifiedNote = evidenceNotes.length ? ` ${evidenceNotes.join('; ')}.` : '';
        paragraphs.push(
            `We list ${count} community-sourced veterinary practices in ${district}, ${city}: ${lead}.${verifiedNote} ` +
            `Review each listing's English-language evidence and confirm staff availability when booking.`,
        );
    }

    // 2) Why these qualify: surface concrete English-language signals.
    if (signals.length || hasReviewSignal) {
        const reasons = [
            ...signals.slice(0, 3),
            ...(hasReviewSignal ? ['English confirmed directly in their Google reviews'] : []),
        ];
        paragraphs.push(
            `${count === 1 ? 'This listing includes' : 'These listings include'} English-language signals such as ${prose(reasons)}. ` +
            `We show those signals so you can assess the evidence, but they do not guarantee that an English-speaking staff member will be available for every appointment.`,
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
                ? `Yes. We list ${count} English-speaking veterinary ${count === 1 ? 'practice' : 'practices'} in ${district}. ${officialNames.length ? `${officialNames.length} ${officialNames.length === 1 ? 'is' : 'are'} confirmed by ${officialNames.length === 1 ? 'its official website' : 'their official websites'}. ` : ''}${communityConfirmedNames.length ? `${communityConfirmedNames.length} ${communityConfirmedNames.length === 1 ? 'is' : 'are'} community-confirmed. ` : ''}The listings include ${prose(names.slice(0, 3))}${count > 3 ? ', among others' : ''}.`
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
        a: `${officialNames.length ? `${officialNames.length} ${officialNames.length === 1 ? 'listing uses' : 'listings use'} an explicit statement from the practice's official website. ` : ''}Other ${district} listings are community-sourced and cross-checked for English-language signals` +
            `${signals.length ? ` such as ${prose(signals.slice(0, 2))}` : ''}` +
            `${hasReviewSignal ? ', including English confirmed in Google reviews' : ''}. ` +
            `Community Confirmed means pet owners have reported successful English communication.`,
    };

    // Matches the conversational phrasing real searchers use (GSC, July 2026):
    // "is there an english-speaking vet in <district> you can recommend?".
    // Only included when there is at least one practice to point to, and the
    // answer sticks to the evidence source stored for each listing.
    const recommendFaq: DistrictFaq | null = count > 0
        ? {
            q: `Is there an English-speaking vet in ${district} you can recommend?`,
            a: verifiedNames.length
                ? `${prose(verifiedNames.slice(0, 3))} ${verifiedNames.length === 1 ? 'has' : 'have'} confirmation evidence in ${district}. ${officialNames.length ? `${officialNames.length} ${officialNames.length === 1 ? 'is' : 'are'} confirmed by ${officialNames.length === 1 ? 'its official website' : 'their official websites'}. ` : ''}${communityConfirmedNames.length ? `${communityConfirmedNames.length} ${communityConfirmedNames.length === 1 ? 'is' : 'are'} community-confirmed by pet owners. ` : ''}Each listing shows the practice's contact details and the evidence source.`
                : `Our ${district} ${count === 1 ? 'listing is' : 'listings are'} community-sourced${count <= 3 ? ` (${prose(names)})` : ''} rather than independently Verified yet, so we would not call ${count === 1 ? 'it' : 'any of them'} a firm recommendation. Check the English signals on each listing and confirm when booking.`,
        }
        : null;

    const faqs: DistrictFaq[] = [englishFaq, ...(recommendFaq ? [recommendFaq] : []), ...(emergencyFaq ? [emergencyFaq] : []), verifyFaq];

    return { intro: paragraphs.join('\n\n'), faqs };
}
