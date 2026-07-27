import type { Vet } from '../types/vet';
import { calculateDistance } from './distance';
import {
    isGovernmentSourceConfirmed,
    isOfficialWebsiteConfirmed,
    isVetVerified,
} from './verifiedLabel';

/**
 * Data-driven intro content for city pages.
 * Uses each city's current directory data so every summary stays specific
 * without relying on promotional or manually maintained location claims.
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
    const governmentConfirmed = cityVets.filter(isGovernmentSourceConfirmed);
    const communityConfirmed = cityVets.filter(
        (vet) => isVetVerified(vet) &&
            !isOfficialWebsiteConfirmed(vet) &&
            !isGovernmentSourceConfirmed(vet),
    );
    const communitySourced = count -
        officialWebsiteConfirmed.length -
        governmentConfirmed.length -
        communityConfirmed.length;
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
    if (governmentConfirmed.length) {
        evidenceSummary.push(
            `${governmentConfirmed.length} ${governmentConfirmed.length === 1 ? 'is' : 'are'} confirmed by a government veterinary source`,
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
            `For urgent care, ${prose(emergency.map((e) => e.practice_name).slice(0, 2))} ${emergency.length === 1 ? 'lists' : 'list'} emergency or out-of-hours information. Check the listing details, current hours and telephone instructions before travelling whenever the situation safely allows.`,
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

    // 5. Practical close, anchored to the city
    paragraphs.push(
        `New to ${city} with a pet? Compare the evidence shown on each listing and confirm English availability, the service you need, current hours and likely fees directly with the practice. Save a suitable routine-care option and the local out-of-hours instructions before you need them.`,
    );

    return { content: paragraphs.join('\n\n'), nearestHub };
}
