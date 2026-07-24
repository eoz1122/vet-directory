import type { Vet } from '../types/vet';
import { calculateDistance } from './distance';
import { isOfficialWebsiteConfirmed, isVetVerified } from './verifiedLabel';

/**
 * Data-driven intro content for city pages WITHOUT hand-written cityContent.
 * Replaces the old shared boilerplate (29 near-duplicate pages) with prose
 * derived from each city's actual data, so every page is honestly unique.
 * Same philosophy as districtContent: only say what the data supports.
 */
export interface CitySummary {
    content: string;
    nearestHub: { city: string; count: number; distanceKm: number } | null;
}

const prose = (names: string[]) =>
    names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;

function centroid(vets: Vet[]): { lat: number; lng: number } {
    const lat = vets.reduce((s, v) => s + v.coordinates.lat, 0) / vets.length;
    const lng = vets.reduce((s, v) => s + v.coordinates.lng, 0) / vets.length;
    return { lat, lng };
}

export function generateCitySummary(city: string, cityVets: Vet[], allVets: Vet[]): CitySummary {
    const count = cityVets.length;
    const names = cityVets.map((v) => v.practice_name);
    const officialWebsiteConfirmed = cityVets.filter(isOfficialWebsiteConfirmed);
    const communityConfirmed = cityVets.filter(
        (vet) => isVetVerified(vet) && !isOfficialWebsiteConfirmed(vet),
    );
    const communitySourced = count - officialWebsiteConfirmed.length - communityConfirmed.length;
    const withSite = cityVets.filter((v) => v.contact?.website).length;
    const emergency = cityVets.filter((v) => {
        const e = (v.verification as { emergency_services?: string }).emergency_services;
        return e && String(e).trim();
    });
    const districts = [...new Set(cityVets.map((v) => v.district).filter((d) => d && d !== 'Unknown' && d !== city))];
    const mobile = cityVets.filter((v) => /mobile|home visit/i.test(v.address || '') || /mobil/i.test(v.practice_name));

    const paragraphs: string[] = [];

    // 1. What we actually list here
    const evidenceSummary: string[] = [];
    if (officialWebsiteConfirmed.length) {
        evidenceSummary.push(
            officialWebsiteConfirmed.length === 1
                ? '1 is confirmed by its official website'
                : `${officialWebsiteConfirmed.length} are confirmed by their official websites`,
        );
    }
    if (communityConfirmed.length) {
        evidenceSummary.push(
            `${communityConfirmed.length} ${communityConfirmed.length === 1 ? 'is' : 'are'} community-confirmed by pet owners`,
        );
    }
    if (communitySourced) {
        evidenceSummary.push(
            `${communitySourced} ${communitySourced === 1 ? 'is' : 'are'} community-listed and awaiting confirmation`,
        );
    }

    paragraphs.push(
        `We currently list ${count} English-speaking veterinary ${count === 1 ? 'practice' : 'practices'} in ${city}: ${prose(names.slice(0, 3))}${count > 3 ? `, among others` : ''}. ` +
        `${evidenceSummary.join('; ')}. Confirm which English-speaking clinician will be available when booking.`,
    );

    // 2. Geography / practical detail, only where the data has it
    const details: string[] = [];
    if (districts.length >= 2) details.push(`coverage spans ${prose(districts.slice(0, 3))}`);
    if (withSite === count) details.push(`every practice has its own website for checking hours before you call`);
    else if (withSite > 0) details.push(`${withSite} of ${count} have a website for checking hours in advance`);
    if (mobile.length) details.push(`${prose(mobile.map((m) => m.practice_name).slice(0, 2))} ${mobile.length === 1 ? 'offers' : 'offer'} mobile or home-visit service`);
    if (details.length) {
        paragraphs.push(`A few practical notes from the data: ${details.join('; ')}.`);
    }

    // 3. Emergency picture, honest in both directions
    if (emergency.length) {
        paragraphs.push(
            `For urgent care, ${prose(emergency.map((e) => e.practice_name).slice(0, 2))} ${emergency.length === 1 ? 'lists' : 'list'} emergency or out-of-hours services. Save the number before you need it; German out-of-hours care carries a legal minimum surcharge, so knowing where to go is half the battle.`,
        );
    } else {
        paragraphs.push(
            `None of our ${city} listings currently advertises round-the-clock emergency service, so locate your nearest out-of-hours Tierklinik in advance rather than during the emergency. Our pet emergency guide explains how the German Notdienst system and its fees work.`,
        );
    }

    // 4. Nearest bigger hub for small cities (real distance from coordinates)
    let nearestHub: CitySummary['nearestHub'] = null;
    if (count < 5) {
        const here = centroid(cityVets);
        const byCity = new Map<string, Vet[]>();
        for (const v of allVets) {
            if (v.city === city) continue;
            (byCity.get(v.city) ?? byCity.set(v.city, []).get(v.city)!).push(v);
        }
        let best: { city: string; count: number; distanceKm: number } | null = null;
        for (const [other, vets] of byCity) {
            if (vets.length < 5) continue;
            const c = centroid(vets);
            const d = calculateDistance(here.lat, here.lng, c.lat, c.lng);
            if (d < 80 && (!best || d < best.distanceKm)) {
                best = { city: other, count: vets.length, distanceKm: Math.round(d) };
            }
        }
        nearestHub = best;
        if (best) {
            paragraphs.push(
                `Need more choice? ${best.city} is roughly ${best.distanceKm} km away with ${best.count} English-speaking practices in our directory, a realistic option for planned (non-urgent) visits.`,
            );
        }
    }

    // 5. Newcomer close, anchored to the city
    paragraphs.push(
        `New to ${city} with a pet? Register the microchip with TASSO first (free, five minutes), then book a get-to-know visit with one of the practices above before you actually need one: being an existing patient makes urgent appointments far easier to get. Every listing shows the English-language evidence behind it, and the Confirm English button lets you strengthen it for the next owner after your visit.`,
    );

    return { content: paragraphs.join('\n\n'), nearestHub };
}
