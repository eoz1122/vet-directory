import { describe, expect, it } from 'vitest';
import vetsData from './vets.json';

const expectedLeipzigPractices = [
    {
        id: 'leipzig-tierarztpraxis-leutzsch',
        website: 'https://tierarztpraxis-leutzsch.de/',
        sourceUrl: 'https://tierarztpraxis-leutzsch.de/pages/team.php',
    },
    {
        id: 'leipzig-tierarztpraxis-am-kirschberg',
        website: 'https://tierarztpraxis-am-kirschberg.de/',
        sourceUrl: 'https://tierarztpraxis-am-kirschberg.de/sprechzeiten/',
    },
    {
        id: 'leipzig-tierarztpraxis-goepner-schroth',
        website: 'https://hund-katze-maus.net/',
        sourceUrl: 'https://hund-katze-maus.net/',
    },
] as const;

const expectedNationwidePractices = [
    {
        id: 'hannover-medivet',
        city: 'Hannover',
        address: 'Schulenburger Landstraße 120, 30165 Hannover',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/hannover/',
    },
    {
        id: 'nuremberg-tierstadt',
        city: 'Nuremberg',
        address: 'Valentin-Dretzel-Straße 13, 90469 Nürnberg',
        sourceUrl: 'https://tierstadt.de/',
    },
    {
        id: 'gelsenkirchen-medivet',
        city: 'Gelsenkirchen',
        address: 'Lockhofstraße 9, 45881 Gelsenkirchen',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/gelsenkirchen/',
    },
    {
        id: 'bonn-tierarztpraxis-antonia-klaus',
        city: 'Bonn',
        address: 'Rheinallee 15c, 53173 Bonn',
        sourceUrl: 'https://tierarztbonn.de/english-clients/',
    },
    {
        id: 'karlsruhe-kleintierzentrum-arndt',
        city: 'Karlsruhe',
        address: 'Bergwaldstraße 30, 76227 Karlsruhe',
        sourceUrl: 'https://tierarzt-karlsruhe-durlach.de/tierarzt-karlsruhe-kleintierzentrum-arndt-jetzt-mit-sieben/',
    },
    {
        id: 'sindelfingen-kleintierpraxis',
        city: 'Sindelfingen',
        address: 'Wolboldstraße 5, 71063 Sindelfingen',
        sourceUrl: 'https://www.kleintierpraxissindelfingen.de/?lang=en',
    },
    {
        id: 'bremen-exotenpraxis-doernath',
        city: 'Bremen',
        address: 'Bennigsenstraße 1b, 28205 Bremen',
        sourceUrl: 'https://exotenpraxis-bremen.de/',
        practiceFocus: 'Exotic pets, zoo animals and wildlife',
    },
] as const;

describe('verified Leipzig English-speaking practices', () => {
    it.each(expectedLeipzigPractices)(
        'keeps $id backed by first-party language evidence',
        ({ id, website, sourceUrl }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe('Leipzig');
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.contact.website).toBe(website);
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);
        },
    );
});

describe('first-party-verified nationwide English-speaking practices', () => {
    it.each(expectedNationwidePractices)(
        'keeps $id backed by current first-party language evidence',
        ({ id, city, address, sourceUrl, ...expected }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe(city);
            expect(practice?.address).toBe(address);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('official_website');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);

            if ('practiceFocus' in expected) {
                expect(practice?.practice_focus).toBe(expected.practiceFocus);
            }
        },
    );

    it('keeps every practice ID unique', () => {
        const ids = vetsData.map((vet) => vet.id);

        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('reverified existing practice records', () => {
    it.each([
        {
            id: 'Hamburg-72',
            sourceUrl: 'https://www.tierarztpraxis-am-millerntor.de/en/team/',
        },
        {
            id: 'Duesseldorf-Niessen',
            sourceUrl: 'https://www.tierdoc.org/de',
        },
        {
            id: 'Bremen-Medivet',
            sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/bremen/',
        },
        {
            id: 'Munich-131',
            sourceUrl: 'https://tierarzt-muenchen.de/english/',
        },
    ])('uses official evidence for $id', ({ id, sourceUrl }) => {
        const practice = vetsData.find((vet) => vet.id === id);

        expect(practice?.verification.evidence_type).toBe('official_website');
        expect(practice?.verification.source_urls).toContain(sourceUrl);
        expect(practice?.verification.last_scanned).toBe('2026-07-25');
    });

    it('uses the practice-published Munich postcode', () => {
        const practice = vetsData.find((vet) => vet.id === 'Munich-131');

        expect(practice?.address).toBe('Schwarzstraße 3, 81669 München');
    });
});
