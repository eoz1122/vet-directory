import { describe, it, expect } from 'vitest';
import { generateDistrictContent } from './districtContent';
import type { Vet } from '../types/vet';

const mk = (over: Partial<Vet>): Vet => ({
    id: 'x', practice_name: 'Test Clinic', city: 'Berlin', district: 'Mitte',
    address: 'Somewhere 1', coordinates: { lat: 0, lng: 0 },
    contact: { website: null, phone: null },
    verification: { status: 'Verified', last_scanned: '2025-01-01', english_signals: [] },
    community_status: 'Verified', ...over,
});

describe('generateDistrictContent', () => {
    const vets: Vet[] = [
        mk({ practice_name: 'Tierklinik A', verification: { status: 'Verified', last_scanned: '2025-01-01', english_signals: ['University Clinic'], emergency_services: '24/7' } }),
        mk({ practice_name: 'Vet Practice B', community_status: 'Community Sourced', verification: { status: 'Community Sourced', last_scanned: '2025-01-01', english_signals: ['Confirmed via Google Review: "spoke English"'] } }),
    ];

    it('produces a unique, substantive intro mentioning the district and real practice names', () => {
        const c = generateDistrictContent('Friedrichshain / Others', 'Berlin', vets);
        expect(c.intro).toContain('Friedrichshain / Others');
        expect(c.intro).toContain('Tierklinik A');
        expect(c.intro.split(/\s+/).length).toBeGreaterThan(60);
        expect(c.intro).not.toMatch(/undefined|NaN|—/);   // no holes, no em dash
    });

    it('returns exactly 4 data-driven FAQs with answers', () => {
        const c = generateDistrictContent('Mitte', 'Berlin', vets);
        expect(c.faqs).toHaveLength(4);
        for (const f of c.faqs) {
            expect(f.q.length).toBeGreaterThan(8);
            expect(f.a.length).toBeGreaterThan(15);
            expect(f.a).not.toMatch(/undefined|—/);
        }
        expect(c.faqs[0].q.toLowerCase()).toContain('english');
    });

    // GSC data (July 2026): real searches phrase this conversationally, e.g.
    // "is there an english-speaking vet in berlin prenzlauer berg you can recommend?"
    it('includes a recommendation-shaped FAQ naming real practices when vets exist', () => {
        const c = generateDistrictContent('Prenzlauer Berg', 'Berlin', vets);
        const rec = c.faqs.find(f => /recommend/i.test(f.q));
        expect(rec).toBeDefined();
        expect(rec!.q).toContain('Prenzlauer Berg');
        expect(rec!.a).toContain('Tierklinik A');
        expect(rec!.a).not.toMatch(/undefined|—/);
    });

    it('omits the recommendation FAQ when the district has no vets', () => {
        const c = generateDistrictContent('Empty District', 'Berlin', []);
        expect(c.faqs.some(f => /recommend/i.test(f.q))).toBe(false);
    });

    it('surfaces emergency availability when present in the data', () => {
        const c = generateDistrictContent('Mitte', 'Berlin', vets);
        expect((c.intro + JSON.stringify(c.faqs)).toLowerCase()).toContain('emergency');
    });

    it('never leaks a raw Google-review quote into the prose (combined ; signals)', () => {
        const messy = [mk({
            practice_name: 'ElbVet',
            verification: {
                status: 'Verified', last_scanned: '2025-01-01',
                english_signals: ['Verified English Support; Confirmed via Google Review: "could communicate well in English."'],
            },
        })];
        const c = generateDistrictContent('Altona', 'Hamburg', messy);
        const blob = (c.intro + JSON.stringify(c.faqs)).toLowerCase();
        expect(blob).not.toContain('google review:');   // no raw quote dumped
        expect(blob).not.toContain('could communicate well');
    });

    it('omits the emergency FAQ when neither district nor city has emergency data', () => {
        const noEmergency = [mk({ practice_name: 'Small Clinic', verification: { status: 'Verified', last_scanned: '2025-01-01', english_signals: ['Verified English Support'] } })];
        const c = generateDistrictContent('Near Heidelberg', 'Wiesloch', noEmergency, noEmergency);
        const blob = (c.intro + JSON.stringify(c.faqs)).toLowerCase();
        expect(c.faqs.some(f => /emergency vet near/i.test(f.q))).toBe(false);  // no unanswerable FAQ
        expect(blob).not.toContain('use our wiesloch listings'); // no dead-end promise
    });

    it('points the emergency FAQ to a real nearby clinic when the city (not the district) has one', () => {
        const districtVets = [mk({ practice_name: 'Local Vet', district: 'Suburb', verification: { status: 'Verified', last_scanned: '2025-01-01', english_signals: ['Verified English Support'] } })];
        const cityVets = [...districtVets, mk({ practice_name: 'Central ER', district: 'Downtown', verification: { status: 'Verified', last_scanned: '2025-01-01', english_signals: [], emergency_services: '24/7' } })];
        const c = generateDistrictContent('Suburb', 'Hamburg', districtVets, cityVets);
        const er = c.faqs.find(f => /emergency vet near/i.test(f.q));
        expect(er?.a).toContain('Central ER');
        expect(er?.a.toLowerCase()).toContain('not in suburb itself');
    });

    it('softens the English claim (no definitive "Yes") when nothing is Verified', () => {
        const unverified = [mk({ practice_name: 'Maybe Vet', community_status: 'Community Sourced', verification: { status: 'Community Sourced', last_scanned: '2025-01-01', english_signals: ['Verified English Support'] } })];
        const c = generateDistrictContent('Tinyplace', 'Smalltown', unverified, unverified);
        expect(c.faqs[0].a.startsWith('Yes')).toBe(false);
        expect(c.faqs[0].a.toLowerCase()).toContain('community-sourced');
        expect(c.intro.toLowerCase()).toContain('community-sourced');
        expect(c.intro).not.toContain('where you can discuss diagnoses');
    });

    it('handles a single-vet district with singular grammar', () => {
        const c = generateDistrictContent('Sülz', 'Cologne', [vets[0]]);
        expect(c.intro).not.toMatch(/—|undefined/);
        expect(c.intro.toLowerCase()).toContain('sülz');
    });
});
