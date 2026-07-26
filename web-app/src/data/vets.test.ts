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
    {
        id: 'braunschweig-anicura',
        city: 'Braunschweig',
        address: 'Bockshornweg 71, 38114 Braunschweig',
        sourceUrl: 'https://www.anicura.de/en/our-clinics/tierarzt-braunschweig/kontakt/',
    },
    {
        id: 'magdeburg-tierarztpraxis-schneidersgarten',
        city: 'Magdeburg',
        address: 'Halberstädter Straße 47, 39112 Magdeburg',
        sourceUrl: 'https://www.tierarztpraxis-schneidersgarten.de/en',
    },
    {
        id: 'moenchengladbach-anicura-boekelberg',
        city: 'Mönchengladbach',
        address: 'Krefelder Straße 461, 41066 Mönchengladbach',
        sourceUrl: 'https://www.anicura.de/en/our-clinics/tierarztliche-klinik-vom-bokelberg/',
        emergencyServices: '24/7',
    },
    {
        id: 'dortmund-tierarztpraxis-am-dorney',
        city: 'Dortmund',
        address: 'Dorneystraße 65, 44149 Dortmund',
        sourceUrl: 'https://www.praxis-am-dorney.de/files/tierarztpraxis-am-dorney/dokumente/tierarztpraxis_am_dorney_registration_form.pdf',
    },
    {
        id: 'essen-tierklinik-apelt',
        city: 'Essen',
        address: 'Stankeitstraße 11, 45326 Essen',
        sourceUrl: 'https://www.tieraerztliche-klinik.de/wp-content/uploads/2025/01/NBV-Behandlungsvertrag01.01.25-Englisch.pdf',
        emergencyServices: '24/7',
    },
    {
        id: 'wiesbaden-tiergesundheitszentrum-bierstadt',
        city: 'Wiesbaden',
        address: 'Kloppenheimer Straße 3, 65191 Wiesbaden',
        sourceUrl: 'https://www.tiergesundheitszentrum-wiesbaden.de/en-gb/kontakt',
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
    {
        id: 'Frankfurt-82',
        city: 'Wiesbaden',
        address: 'Saarbrücker Allee 7, 65201 Wiesbaden',
        website: 'https://www.anicura.de/standorte/wiesbaden-schierstein/',
        communitySourceUrl: 'https://www.google.com/maps/place/Tierarztpraxis+Dr.+Kindler+AniCura+Wiesbaden+Schierstein+GmbH/data=!4m7!3m6!1s0x47bd95edb7da87f3:0x3c68002a0ade2fb6!8m2!3d50.0459109!4d8.2048268!16s%2Fg%2F1tdj3b78!19sChIJ84fat-2VvUcRti_eCioAaDw?authuser=0&hl=en&rclk=1',
    },
] as const;

const expectedGovernmentListedPractices = [
    {
        id: 'wiesbaden-tierdermatologie-wildermuth',
        city: 'Wiesbaden',
        address: 'Borsigstraße 7a, 65205 Wiesbaden',
        website: 'https://www.tierdermatologie-wildermuth.de/',
        governmentSourceUrl: 'https://mrc-europe.army.mil/Portals/106/VMCE%20Welcome%20Packet%202023__Fillable_1.pdf',
    },
] as const;

const expectedBerlinOfficialPractices = [
    {
        id: 'Berlin-11',
        address: 'Bizetstraße 48, 13088 Berlin',
        sourceUrl: 'https://www.tierarztpraxis-peters-weissensee.de/en/',
    },
    {
        id: 'Berlin-110',
        address: 'Olivaer Platz 15, 10707 Berlin',
        sourceUrl: 'https://www.filu.vet/en/standorte/berlin',
    },
    {
        id: 'Berlin-33',
        address: 'Sonnenallee 204, 12059 Berlin',
        sourceUrl: 'https://www.tierarztpraxis-sonnenallee.de/',
    },
    {
        id: 'Berlin-43',
        address: 'Gutzkowstraße 4, 10827 Berlin (Mobile Service)',
        sourceUrl: 'https://tierarzt-mobil-berlin.de/consultations-in-english/',
    },
    {
        id: 'Berlin-96',
        address: 'Bartningallee 5, 10557 Berlin',
        sourceUrl: 'https://www.team-hansavet.de/',
    },
    {
        id: 'berlin-tierarztpraxis-kiezfidel',
        address: 'Brunowstraße 39, 13507 Berlin',
        sourceUrl: 'https://www.tierarztpraxis-kiezfidel.de/',
    },
] as const;

const expectedFrankfurtOfficialUpgrades = [
    {
        id: 'Frankfurt-47',
        address: 'Wittelsbacherallee 26, 60316 Frankfurt am Main',
        phone: '+49 69 96757004',
        website: 'https://www.rex.app/clinics/frankfurt-ostend',
        sourceUrls: [
            'https://www.rex.app/clinics/frankfurt-ostend',
            'https://www.rex.app/en-team/ksenia-zamora',
        ],
    },
    {
        id: 'Frankfurt-87',
        address: 'Wilhelmstraße 22, 61118 Bad Vilbel',
        phone: '06101 47619',
        website: 'https://www.tierarztpraxis-badvilbel.de/',
        sourceUrls: ['https://www.tierarztpraxis-badvilbel.de/'],
    },
] as const;

const expectedFrankfurtCommunityUpgrades = [
    {
        id: 'Frankfurt-56',
        address: 'Juliusstraße 12, 60487 Frankfurt am Main',
        phone: '+49 69 97074955',
        website: 'https://www.tierklinik-bockenheim.de/',
        sourceUrls: [
            'https://www.tierklinik-bockenheim.de/',
            'https://www.reddit.com/r/frankfurt/comments/yk1vzs/',
        ],
    },
    {
        id: 'Frankfurt-61',
        address: 'Darmstädter Landstraße 48, 60594 Frankfurt (Sachsenhausen)',
        phone: '',
        website: 'https://tierarztpraxis-berger.com/',
        sourceUrls: [
            'https://tierarztpraxis-berger.com/',
            'https://www.reddit.com/r/frankfurt/comments/ussr53/vets_who_can_provide_the_eu_pet_passport/',
        ],
    },
    {
        id: 'Frankfurt-65',
        address: 'Frankfurter Str. 11, 61462 Königstein im Taunus',
        phone: '',
        website: null,
        sourceUrls: [
            'https://www.reddit.com/r/frankfurt/comments/yk1vzs/',
        ],
    },
] as const;

const expectedReverifiedMajorCityPractices = [
    {
        id: 'Frankfurt-48',
        city: 'Frankfurt',
        address: 'Westerbachstraße 226, 65936 Frankfurt am Main (Sossenheim)',
        phone: '069 341951',
        website: 'https://www.tierarzt-kraemer.de/en/',
        sourceUrl: 'https://www.tierarzt-kraemer.de/en/',
    },
    {
        id: 'Frankfurt-49',
        city: 'Frankfurt',
        address: 'Eckenheimer Landstraße 340, 60435 Frankfurt am Main',
        phone: '+49 69 90548010',
        website: 'https://www.dr-hoech.de/en/about-us',
        sourceUrl: 'https://www.dr-hoech.de/en/about-us',
    },
    {
        id: 'Stuttgart-New-2',
        city: 'Stuttgart',
        address: 'Smaragdweg 1, 70174 Stuttgart',
        phone: '+49 711 2536757',
        website: 'https://kleintierpraxis-stuttgart.de/en',
        sourceUrl: 'https://kleintierpraxis-stuttgart.de/en',
    },
    {
        id: 'Stuttgart-137',
        city: 'Stuttgart',
        address: 'Birkenwaldstraße 214, 70191 Stuttgart',
        phone: '+49 711 2566409',
        website: 'https://www.kleintierpraxis-ernst.de/en/home/',
        sourceUrl: 'https://www.kleintierpraxis-ernst.de/en/home/',
    },
    {
        id: 'dresden-vetpraxis-loebtau',
        city: 'Dresden',
        address: 'Tharandter Str. 45 B, 01159 Dresden',
        phone: '+49 351 42420505',
        website: 'https://www.vetpraxis-dresden.de/',
        sourceUrl: 'https://www.vetpraxis-dresden.de/',
    },
] as const;

const expectedReverifiedFiluPractices = [
    {
        id: 'Frankfurt-46',
        city: 'Frankfurt',
        district: 'Nordend',
        address: 'Weberstraße 59, 60318 Frankfurt am Main',
        phone: '+49 69 34879730',
        website: 'https://www.filu.vet/en/standorte/frankfurt',
        sourceUrl: 'https://www.filu.vet/en/standorte/frankfurt',
        emergencyServices: '',
    },
    {
        id: 'Hamburg-69',
        city: 'Hamburg',
        district: 'Winterhude',
        address: 'Winterhuder Weg 116, 22085 Hamburg',
        phone: '+49 40 80805999',
        website: 'https://www.filu.vet/en/standorte/hamburg',
        sourceUrl: 'https://www.filu.vet/en/standorte/hamburg',
        emergencyServices: 'Saturday emergency consultation hours 10:00-18:00',
    },
    {
        id: 'Munich-141',
        city: 'Munich',
        district: 'Schwabing',
        address: 'Schleißheimer Straße 141, 80797 München',
        phone: '+49 89 38038398',
        website: 'https://www.filu.vet/en/standorte/schwabing',
        sourceUrl: 'https://www.filu.vet/en/standorte/schwabing',
        emergencyServices: 'Saturday emergency consultation hours 12:00-18:00',
    },
    {
        id: 'Munich-Filu-Theresienwiese',
        city: 'Munich',
        district: 'Ludwigsvorstadt',
        address: 'Paul-Heyse-Straße 28, 80336 München',
        phone: '+49 89 12086780',
        website: 'https://www.filu.vet/en/standorte/theresienwiese',
        sourceUrl: 'https://www.filu.vet/en/standorte/theresienwiese',
        emergencyServices: 'Saturday emergency consultation hours 12:00-18:00',
    },
    {
        id: 'Duesseldorf-Filu',
        city: 'Düsseldorf',
        district: 'Pempelfort',
        address: 'Duisburger Straße 32, 40477 Düsseldorf',
        phone: '+49 211 41873373',
        website: 'https://www.filu.vet/en/standorte/dusseldorf',
        sourceUrl: 'https://www.filu.vet/en/standorte/dusseldorf',
        emergencyServices: 'Saturday emergency consultation hours 10:00-18:00',
    },
    {
        id: 'Cologne-Filu',
        city: 'Cologne',
        district: 'Neustadt-Süd',
        address: 'Pilgrimstraße 6, 50674 Köln',
        phone: '+49 221 58609808',
        website: 'https://www.filu.vet/en/standorte/koeln',
        sourceUrl: 'https://www.filu.vet/en/standorte/koeln',
        emergencyServices: 'Saturday emergency consultation hours 10:00-18:00',
    },
] as const;

const expectedNewFiluPractices = [
    {
        id: 'hamburg-filu-hoheluft',
        practiceName: 'filu Veterinary Hamburg Hoheluft',
        city: 'Hamburg',
        district: 'Hoheluft',
        address: 'Hoheluftchaussee 76, 20253 Hamburg',
        coordinates: { lat: 53.5828362, lng: 9.9713694 },
        phone: '+49 40 57308931',
        website: 'https://www.filu.vet/en/standorte/hamburg-hoheluft',
        sourceUrl: 'https://www.filu.vet/en/standorte/hamburg-hoheluft',
        emergencyServices: 'Saturday emergency consultation hours 10:00-18:00',
    },
    {
        id: 'hannover-filu-list',
        practiceName: 'filu Veterinary Hannover List',
        city: 'Hannover',
        district: 'List',
        address: 'Podbielskistraße 96, 30177 Hannover',
        coordinates: { lat: 52.3950874, lng: 9.7634131 },
        phone: '+49 511 95733896',
        website: 'https://www.filu.vet/en/standorte/hannover-list',
        sourceUrl: 'https://www.filu.vet/en/standorte/hannover-list',
        emergencyServices: 'Saturday emergency consultation hours 10:00-18:00',
    },
    {
        id: 'munich-filu-wiener-platz',
        practiceName: 'filu Veterinary Munich Wiener Platz',
        city: 'Munich',
        district: 'Haidhausen',
        address: 'Steinstraße 11, 81667 München',
        coordinates: { lat: 48.1334884, lng: 11.5963405 },
        phone: '+49 89 21556707',
        website: 'https://www.filu.vet/en/standorte/wiener-platz',
        sourceUrl: 'https://www.filu.vet/en/standorte/wiener-platz',
        emergencyServices: 'Emergencies during opening hours',
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

describe('upgrade-only Frankfurt evidence audit', () => {
    it.each(expectedFrankfurtOfficialUpgrades)(
        'uses current first-party English evidence for $id',
        ({ id, address, phone, website, sourceUrls }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.address).toBe(address);
            expect(practice?.contact.phone).toBe(phone);
            expect(practice?.contact.website).toBe(website);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('official_website');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toEqual(
                expect.arrayContaining(sourceUrls),
            );
            expect(practice?.verification.last_scanned).toBe('2026-07-26');
        },
    );

    it.each(expectedFrankfurtCommunityUpgrades)(
        'keeps community evidence distinct from first-party proof for $id',
        ({ id, address, phone, website, sourceUrls }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.address).toBe(address);
            expect(practice?.contact.phone).toBe(phone);
            expect(practice?.contact.website).toBe(website);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('community');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toEqual(
                expect.arrayContaining(sourceUrls),
            );
            expect(practice?.verification.last_scanned).toBe('2026-07-26');
        },
    );

    it('does not cite the unresolved Moormann website as evidence', () => {
        const practice = vetsData.find((vet) => vet.id === 'Frankfurt-65');

        expect(practice?.verification.source_urls).not.toContain(
            'https://www.tierarzt-moormann.de/',
        );
    });
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

            if ('emergencyServices' in expected) {
                expect(practice?.verification.emergency_services).toBe(
                    expected.emergencyServices,
                );
            }
        },
    );

    it('keeps every practice ID unique', () => {
        const ids = vetsData.map((vet) => vet.id);

        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('government-listed English-speaking practices', () => {
    it.each(expectedGovernmentListedPractices)(
        'keeps $id distinct from first-party and community verification',
        ({ id, city, address, website, governmentSourceUrl }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe(city);
            expect(practice?.address).toBe(address);
            expect(practice?.contact.website).toBe(website);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('government_source');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(governmentSourceUrl);
            expect(practice?.verification.last_scanned).toBe('2026-07-26');
        },
    );
});

describe('first-party-verified Berlin English-speaking practices', () => {
    it.each(expectedBerlinOfficialPractices)(
        'keeps $id backed by an explicit current language statement',
        ({ id, address, sourceUrl }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe('Berlin');
            expect(practice?.address).toBe(address);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('official_website');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);
            expect(practice?.verification.last_scanned).toBe('2026-07-26');
        },
    );

    it('does not present Kiezfidel phone availability as an always-open clinic', () => {
        const practice = vetsData.find(
            (vet) => vet.id === 'berlin-tierarztpraxis-kiezfidel',
        );

        expect(practice?.verification.emergency_services).toBe(
            '24/7 telephone availability and emergency house calls; practice visits by appointment',
        );
    });
});

describe('reverified existing practice records', () => {
    it.each(expectedReverifiedMajorCityPractices)(
        'uses current clinic-owned English evidence and contact details for $id',
        ({ id, city, address, phone, website, sourceUrl }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe(city);
            expect(practice?.address).toBe(address);
            expect(practice?.contact.phone).toBe(phone);
            expect(practice?.contact.website).toBe(website);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('official_website');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);
            expect(practice?.verification.last_scanned).toBe('2026-07-26');
        },
    );

    it.each(expectedReverifiedFiluPractices)(
        'uses current filu language evidence and location details for $id',
        ({
            id,
            city,
            district,
            address,
            phone,
            website,
            sourceUrl,
            emergencyServices,
        }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe(city);
            expect(practice?.district).toBe(district);
            expect(practice?.address).toBe(address);
            expect(practice?.contact.phone).toBe(phone);
            expect(practice?.contact.website).toBe(website);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('official_website');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);
            expect(practice?.verification.emergency_services).toBe(emergencyServices);
            expect(practice?.verification.last_scanned).toBe('2026-07-26');
        },
    );

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

    it('uses Tierklinik Hofheim current address and explicit English page', () => {
        const practice = vetsData.find((vet) => vet.id === 'Frankfurt-50');

        expect(practice?.practice_name).toBe('Tierklinik Hofheim');
        expect(practice?.address).toBe(
            'Katharina-Kemmler-Straße 7, 65719 Hofheim am Taunus',
        );
        expect(practice?.district).toBe('Hofheim');
        expect(practice?.contact.phone).toBe('+49 6192 290290');
        expect(practice?.verification.evidence_type).toBe('official_website');
        expect(practice?.verification.source_urls).toContain(
            'https://www.tierklinik-hofheim.de/dialog/englisch.html',
        );
        expect(practice?.verification.last_scanned).toBe('2026-07-26');
    });
});

describe('new filu locations with first-party English evidence', () => {
    it.each(expectedNewFiluPractices)(
        'includes $id with current location-owned evidence and contact details',
        ({
            id,
            practiceName,
            city,
            district,
            address,
            coordinates,
            phone,
            website,
            sourceUrl,
            emergencyServices,
        }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.practice_name).toBe(practiceName);
            expect(practice?.city).toBe(city);
            expect(practice?.district).toBe(district);
            expect(practice?.address).toBe(address);
            expect(practice?.coordinates).toEqual(coordinates);
            expect(practice?.contact.phone).toBe(phone);
            expect(practice?.contact.website).toBe(website);
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.verification.status).toBe('Verified');
            expect(practice?.verification.evidence_type).toBe('official_website');
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);
            expect(practice?.verification.emergency_services).toBe(emergencyServices);
            expect(practice?.verification.last_scanned).toBe('2026-07-26');
        },
    );
});

describe('Frankfurt directory data quality', () => {
    it.each([
        ['Frankfurt-55', 'Sachsenhausen-Nord'],
        ['Frankfurt-58', 'Sachsenhausen-Nord'],
        ['Frankfurt-60', 'Kalbach-Riedberg'],
    ])('uses a geographic district for %s', (id, district) => {
        expect(vetsData.find((vet) => vet.id === id)?.district).toBe(district);
    });

    it('uses Tierklinik Kalbach current clinic-owned contact details', () => {
        const practice = vetsData.find((vet) => vet.id === 'Frankfurt-60');

        expect(practice?.address).toBe('Max-Holder-Straße 37, 60437 Frankfurt am Main');
        expect(practice?.contact.phone).toBe('+49 69 300651550');
        expect(practice?.verification.source_urls).toContain(
            'https://www.tierklinik-kalbach.de/kontakt',
        );
        expect(practice?.verification.last_scanned).toBe('2026-07-26');
    });

    it('preserves the Bockenheim community evidence under one canonical public clinic', () => {
        const canonical = vetsData.find((vet) => vet.id === 'Frankfurt-51');
        const alias = vetsData.find((vet) => vet.id === 'Frankfurt-56');

        expect(canonical?.practice_name).toBe(
            'AniCura Frankfurt (formerly Tierklinik Frankfurt Bockenheim)',
        );
        expect(canonical?.contact.website).toBe(
            'https://www.anicura.de/standorte/tierklinik-frankfurt/',
        );
        expect(canonical?.contact.phone).toBe('+49 69 97074955');
        expect(canonical?.verification.source_urls).toEqual(expect.arrayContaining([
            'https://www.anicura.de/en/our-clinics/tierklinik-frankfurt/kontakt/',
            'https://www.tierklinik-bockenheim.de/',
            'https://www.reddit.com/r/frankfurt/comments/yk1vzs/',
        ]));
        expect(alias?.verification.status).toBe('Verified');
        expect(alias).toHaveProperty('canonical_listing_id', 'Frankfurt-51');
    });
});

describe('public directory entry quality', () => {
    it.each([
        ['Berlin-2', 'Berlin-105'],
        ['hofheim-tierklinik-24h', 'Frankfurt-50'],
        ['Internal-Dusseldorf-1', 'Duesseldorf-TKD'],
        ['nuremberg-probst', 'nuremberg-langwasser-probst'],
        ['Internal-Frankfurt-1', 'Frankfurt-60'],
    ])('keeps duplicate %s as an audit alias of %s', (aliasId, canonicalId) => {
        const alias = vetsData.find((vet) => vet.id === aliasId);

        expect(alias).toBeDefined();
        expect(alias).toHaveProperty('canonical_listing_id', canonicalId);
        expect(alias?.verification.english_signals.length).toBeGreaterThan(0);
    });

    it('uses a geographic district for Tierklinik Rostock', () => {
        expect(
            vetsData.find((vet) => vet.id === 'Internal-Rostock-1')?.district,
        ).toBe('Hansaviertel');
    });

    it('uses correctly encoded German characters in the Nussdorf address', () => {
        expect(
            vetsData.find((vet) => vet.id === 'Stuttgart-143')?.address,
        ).toBe('Dieselstraße 7, 88662 Überlingen');
    });

    it.each([
        'Berlin-1',
        'Berlin-15',
        'Berlin-18',
        'Berlin-20',
        'Berlin-19',
        'Berlin-22',
        'Berlin-25',
        'Berlin-28',
        'Berlin-32',
        'Berlin-45',
        'Berlin-7',
        'Duesseldorf-TierklinikZentrum',
        'Duesseldorf-Beyer',
        'Duesseldorf-Morys',
        'Frankfurt-57',
        'Frankfurt-58',
        'Frankfurt-59',
        'Frankfurt-65',
        'Frankfurt-54',
        'Hamburg-104',
        'Hamburg-106',
        'Hamburg-75',
        'Hamburg-76',
        'Hamburg-77',
        'Hamburg-80',
        'Hamburg-84',
        'Hannover-New-1',
        'Internal-6',
        'Internal-Cologne-1',
        'Internal-Cologne-2',
        'Internal-Giessen-1',
        'Internal-Ahlen-1',
        'Internal-Heidelberg-1',
        'Internal-Hamburg-2',
        'Internal-Nuremberg-1',
        'Internal-Regensburg-1',
        'Internal-Rostock-1',
        'Leipzig-Plenge',
        'Munich-136',
        'Stuttgart-143',
        'Stuttgart-144',
        'Stuttgart-New-3',
        'dresden-hoehne-loebtau',
        'leipzig-anicura-tierklinik',
        'leipzig-tierarztpraxis-gohlis',
        'leipzig-tierarztpraxis-plagwitz',
        'leipzig-tierarztzentrum-sued',
        'meerbusch-tierarztpraxis-gemmer',
        'munich-tierarztpraxis-haidhausen',
        'nuremberg-nordring-klinik',
        'stuttgart-spaeth-moehringen',
        'stuttgart-tierarztpraxis-mitte',
        'stuttgart-tierarztzentrum-west',
    ])('does not expose the confirmed broken website for %s', (id) => {
        const practice = vetsData.find((vet) => vet.id === id);

        expect(practice).toBeDefined();
        expect(practice?.contact.website).toBeNull();
    });
});
