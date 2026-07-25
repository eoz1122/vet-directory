import { describe, expect, it } from 'vitest';
import vetsData from './vets.json';

const expectedLeipzigPractices = [
    {
        id: 'Leipzig-2',
        website: 'https://www.tierarzt-auensee.de/',
        sourceUrl: 'https://www.tierarzt-auensee.de/en/vet-leipzig-team',
    },
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
        id: 'muenster-medivet',
        city: 'Münster',
        address: 'Robert-Bosch-Straße 2-4, 48153 Münster',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/muenster/',
    },
    {
        id: 'mannheim-kleintierpraxis-wendel',
        city: 'Mannheim',
        address: 'Seckenheimer Straße 22, 68165 Mannheim',
        sourceUrl: 'https://kleintierpraxis-wendel.de/kontakt/',
    },
    {
        id: 'aachen-koch-kollegen',
        city: 'Aachen',
        address: 'Gewerbepark Brand 59, 52078 Aachen',
        sourceUrl: 'https://vet-ac.de/?page_id=856',
    },
    {
        id: 'kiel-anicura',
        city: 'Kiel',
        address: 'Kirchhofallee 70, 24114 Kiel',
        sourceUrl: 'https://www.anicura.de/en/our-clinics/tierarztpraxis-kiel/',
    },
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
    {
        id: 'erfurt-kleintierpraxis-dichterviertel',
        city: 'Erfurt',
        address: 'Schillerstraße 43, 99096 Erfurt',
        sourceUrl: 'https://tierarzt-erfurt.net/',
    },
    {
        id: 'meerbusch-tierarztpraxis-gemmer',
        city: 'Meerbusch',
        address: 'Moerser Straße 125, 40667 Meerbusch',
        sourceUrl: 'https://www.tierarztpraxis-gemmer.de/',
    },
    {
        id: 'gauting-tierarztpraxis-pfaffernoschke',
        city: 'Gauting',
        address: 'Bergstraße 11, 82131 Gauting',
        sourceUrl: 'https://www.gesundestier.de/kontakt/',
    },
    {
        id: 'seeheim-kleintierpraxis-winkler-messemer',
        city: 'Seeheim-Jugenheim',
        address: 'Darmstädter Straße 11, 64342 Seeheim-Jugenheim',
        sourceUrl: 'https://www.tierarzt-seeheim.de/',
    },
    {
        id: 'neu-isenburg-tierarztpraxis-wenz',
        city: 'Neu-Isenburg',
        address: 'Brunnenstraße 75, 63263 Neu-Isenburg',
        sourceUrl: 'https://drwenz.de/Leistungen/',
    },
    {
        id: 'schmitten-tierarztpraxis-knof',
        city: 'Schmitten im Taunus',
        address: 'Struthweg 19, 61389 Schmitten im Taunus',
        sourceUrl: 'https://www.tierarzt-schmitten.de/',
    },
    {
        id: 'gangelt-kleintierpraxis',
        city: 'Gangelt',
        address: 'Pastor-Fischenich-Straße 4, 52538 Gangelt',
        sourceUrl: 'https://www.kleintierpraxis-gangelt.de/welcome.html',
    },
    {
        id: 'gevelsberg-tierarztpraxis-kerkman',
        city: 'Gevelsberg',
        address: 'Schulstraße 6, 58285 Gevelsberg',
        sourceUrl: 'https://www.tierarzt-kerkman.de/kontakt.htm',
    },
    {
        id: 'leverkusen-tierarztpraxis-vogelsfeldchen',
        city: 'Leverkusen',
        address: 'Am Vogelsfeldchen 11, 51373 Leverkusen',
        sourceUrl: 'https://tierarztpraxisamvogelsfeldchen.de/',
    },
    {
        id: 'frankenthal-kleintierklinik',
        city: 'Frankenthal',
        address: 'Beindersheimer Straße 77, 67227 Frankenthal',
        sourceUrl: 'https://www.tierarzt-frankenthal.de/',
    },
    {
        id: 'bad-toelz-kleintierpraxis-hollwich',
        city: 'Bad Tölz',
        address: 'Prof.-Max-Lange-Platz 12, 83646 Bad Tölz',
        sourceUrl: 'https://www.tierarztpraxis-toelz.de/leistungen',
    },
    {
        id: 'weingarten-anicura-kleintierzentrum',
        city: 'Weingarten',
        address: 'Am Eisweiher 11, 76356 Weingarten',
        sourceUrl: 'https://www.anicura.de/standorte/weingarten/kontakt/',
    },
    {
        id: 'meerbusch-kleintierspezialisten',
        city: 'Meerbusch',
        address: 'Robert-Bosch-Straße 2, 40668 Meerbusch',
        sourceUrl: 'https://www.tierarzt-meerbusch.de/',
    },
    {
        id: 'hoppegarten-medivet',
        city: 'Hoppegarten',
        address: 'Bollensdorfer Weg 2-4, 15366 Hoppegarten',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/hoppegarten/',
    },
    {
        id: 'elmshorn-medivet',
        city: 'Elmshorn',
        address: 'Westerstraße 30, 25336 Elmshorn',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/elmshorn/',
    },
    {
        id: 'unterhaching-medivet',
        city: 'Unterhaching',
        address: 'Parkacker Straße 2, 82008 Unterhaching',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/unterhaching/',
    },
    {
        id: 'hamburg-medivet-bergedorf',
        city: 'Hamburg',
        address: 'Stuhlrohrstraße 10, 21029 Hamburg-Bergedorf',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/bergedorf/',
    },
    {
        id: 'munich-medivet-westkreuz',
        city: 'Munich',
        address: 'Stockacher Straße 5, 81243 München-Westkreuz',
        sourceUrl: 'https://www.medivetgroup.com/de-de/tierarzt/muenchen-westkreuz/',
    },
    {
        id: 'hofheim-tierarztpraxis-vegner',
        city: 'Hofheim',
        address: 'Marbodstraße 25, 65719 Hofheim am Taunus',
        sourceUrl: 'https://www.tierarztpraxis-hofheim.de/',
    },
    {
        id: 'loerrach-anicura-kleintierzentrum',
        city: 'Lörrach',
        address: 'Bahnhofstraße 11, 79539 Lörrach',
        sourceUrl: 'https://www.anicura.de/standorte/loerrach/unser-team/',
    },
    {
        id: 'karlsruhe-anicura',
        city: 'Karlsruhe',
        address: 'Hoffstraße 6, 76133 Karlsruhe',
        sourceUrl: 'https://www.anicura.de/standorte/karlsruhe/unser-team/tierarztetierarztinnen/marie-gilles/',
    },
] as const;

const expectedCommunityConfirmedPractices = [
    {
        id: 'dortmund-lawrence-mayfeld',
        city: 'Dortmund',
        address: 'Preinstraße 53, 44265 Dortmund',
        website: 'https://www.mayfeld.com/',
        communitySourceUrl: 'https://www.reddit.com/r/Dortmund/comments/xmk5mr/english_speaking_veterinarian/',
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
            expect(practice?.verification.evidence_type).toBe('official_website');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);
            expect(practice?.verification.last_scanned).toBe('2026-07-25');
        },
    );
});

describe('community-confirmed English-speaking practices', () => {
    it.each(expectedCommunityConfirmedPractices)(
        'keeps $id distinct from first-party website verification',
        ({ id, city, address, website, communitySourceUrl }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe(city);
            expect(practice?.address).toBe(address);
            expect(practice?.contact.website).toBe(website);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('community');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(communitySourceUrl);
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
