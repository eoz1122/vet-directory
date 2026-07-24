import type { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import BreedRestrictionsGermany from './BreedRestrictionsGermany';
import Blog from './Blog';
import CatFoodGermany from './CatFoodGermany';
import CatMicrochippingGermany from './CatMicrochippingGermany';
import EmergencyVetBerlinGuide from './EmergencyVetBerlinGuide';
import EmergencyVetHamburgGuide from './EmergencyVetHamburgGuide';
import FirstVetVisitGermany from './FirstVetVisitGermany';
import GermanDogEtiquette from './GermanDogEtiquette';
import MovingWithPetChecklist from './MovingWithPetChecklist';
import PetEmergencyGermany from './PetEmergencyGermany';
import PetEmergencyMunich from './PetEmergencyMunich';
import PetFriendlyApartments from './PetFriendlyApartments';
import PetFoodGermany from './PetFoodGermany';
import PetInsuranceGermany from './PetInsuranceGermany';
import PublicTransportCologne from './PublicTransportCologne';
import PublicTransportMunich from './PublicTransportMunich';
import TickSeasonGermanyPets from './TickSeasonGermanyPets';
import VetCostsGermany from './VetCostsGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = (page: ReactNode) => render(
    <HelmetProvider>
        <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>,
);

const getMetaContent = (name: string) => document.head
    .querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    ?.getAttribute('content');

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

const getStructuredData = (type: string) => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === type);

describe('traffic-focused search metadata', () => {
    beforeEach(() => {
        document.title = '';
    });

    it('describes every visible blog guide in display order', async () => {
        renderPage(<Blog />);

        await waitFor(() => {
            expect(getStructuredData('Blog')).toBeTruthy();
        });

        const visibleGuides = Array.from(
            document.querySelectorAll<HTMLAnchorElement>('main a[href^="/"]'),
        ).map((link) => ({
            name: link.querySelector('h3')?.textContent?.trim(),
            description: link.querySelector('p')?.textContent?.trim(),
            url: `https://englishspeakinggermany.online${link.getAttribute('href')}`,
        }));
        const itemList = getStructuredData('Blog').mainEntity;

        expect(visibleGuides.length).toBeGreaterThan(0);
        expect(itemList['@type']).toBe('ItemList');
        expect(itemList.numberOfItems).toBe(visibleGuides.length);
        expect(itemList.itemListElement).toEqual(
            visibleGuides.map((guide, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Article',
                    ...guide,
                },
            })),
        );
    });

    it('targets Berlin apartment demand and links readers to relevant city directories', async () => {
        renderPage(<PetFriendlyApartments />);

        await waitFor(() => {
            expect(document.title).toBe('Pet-Friendly Apartments Berlin & Germany: 2026 Guide');
        });

        expect(getMetaContent('description')).toBe(
            'Find pet-friendly apartments in Berlin and Germany. Learn rental rights, landlord rules, pet resume tips, and the best districts for dog and cat owners.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Finding Pet-Friendly Apartments in Berlin and Germany (2026)',
        })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Browse English-speaking vets in Berlin' }).getAttribute('href'))
            .toBe('/vets/berlin');
        expect(screen.getByRole('link', { name: 'Federal Court judgment VIII ZR 168/12' }).getAttribute('href'))
            .toBe('https://juris.bundesgerichtshof.de/cgi-bin/bgh_notp/document.py?Art=en&Datum=2013-3-20&Gericht=bgh&Sort=3&anz=14&nr=28367&pos=6');
        expect(screen.getByRole('link', { name: 'Official Berlin apartment-search guidance' }).getAttribute('href'))
            .toBe('https://willkommenszentrum.berlin.de/wohnen/wohnungssuche');
        expect(screen.getByRole('link', { name: 'Official Berlin rental-contract guidance' }).getAttribute('href'))
            .toBe('https://willkommenszentrum.berlin.de/en/housing/rental-contract');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/does not create an automatic right to keep any dog or cat/i);
        expect(articleText).toMatch(/read the exact lease clause/i);
        expect(articleText).toMatch(/get the answer in writing/i);
        expect(articleText).toMatch(/not individualized legal advice/i);
        expect(articleText).not.toMatch(/Small Pets \\(No Permission Needed\\)/i);
        expect(articleText).not.toMatch(/you need written permission for dogs and cats/i);
        expect(articleText).not.toMatch(/Pet Rent Trap/i);
        expect(articleText).not.toMatch(/40.?60 people apply/i);
        expect(articleText).not.toMatch(/known to be more accepting/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('keeps the housing discovery card aligned with the verified guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Pet-Friendly Apartments in Berlin/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/pet-friendly-apartments-germany');
        expect(screen.getByText(
            'Official Berlin search steps, the BGH dog-and-cat ruling, lease consent, application documents and a practical pet resume.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/convince a German landlord/i);
    });

    it('uses Hamburgs official rotating duty service without unsupported 24-hour clinics', async () => {
        renderPage(<EmergencyVetHamburgGuide />);

        await waitFor(() => {
            expect(document.title).toBe(
                '24-Hour Emergency Vet Hamburg: What to Call (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Need emergency veterinary care in Hamburg? During official duty hours, call 040 434379 for the current practice. Check hours, GOT fees, and warning signs.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: '24-Hour Emergency Vet Hamburg: What to Call (2026)',
        })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Call Hamburg veterinary duty service' }).getAttribute('href'))
            .toBe('tel:+4940434379');
        expect(screen.getByRole('link', { name: 'Official Hamburg duty schedule' }).getAttribute('href'))
            .toBe('https://tieraerztekammer-hamburg.de/aktueller-notdienstplan');
        expect(screen.getByRole('link', { name: 'Official Hamburg emergency and fee information' }).getAttribute('href'))
            .toBe('https://tieraerztekammer-hamburg.de/was-ist-ein-notfall');
        expect(screen.getByRole('link', { name: 'Browse English-speaking vets in Hamburg' }).getAttribute('href'))
            .toBe('/vets/hamburg');
        expect(screen.getByText(/Monday to Friday: 20:00 to 08:00 the following morning/i)).toBeTruthy();
        expect(screen.getByText(/Weekends and public holidays: 08:00 to 08:00 the following morning/i)).toBeTruthy();
        expect(screen.getByText(/Do not use this page to decide whether a symptom can safely wait/i)).toBeTruthy();
        expect(screen.queryByText(/Can wait until morning/i)).toBeNull();
        expect(screen.queryByText('Kleintierklinik im Mühlenfeld')).toBeNull();
        expect(screen.queryByText('Tierklinik Fuhlsbüttel')).toBeNull();
        expect(screen.queryByText('Tierklinik Lademannbogen')).toBeNull();
        expect(screen.getByText(/€59\.50 gross emergency-service fee/i)).toBeTruthy();
        expect(screen.getByText(/two to four times the GOT rate/i)).toBeTruthy();

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-06-02');
        expect(schema.dateModified).toBe('2026-07-22');
    });

    it('publishes verified Berlin emergency contacts without unsafe wait advice', async () => {
        renderPage(<EmergencyVetBerlinGuide />);

        await waitFor(() => {
            expect(document.title).toBe(
                '24-Hour Emergency Vets in Berlin: English Help (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Find verified 24-hour emergency vets in Berlin, current phone numbers, urgent warning signs, official GOT fees, and English phrases for calling.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: '24-Hour Emergency Vets in Berlin: English Help (2026)',
        })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Official Berlin 24-hour emergency list' }).getAttribute('href'))
            .toBe('https://tieraerztekammer-berlin.de/notdienst/');
        expect(screen.getByRole('link', { name: 'Official Berlin GOT information' }).getAttribute('href'))
            .toBe('https://tieraerztekammer-berlin.de/gebuehrenordnung-fuer-tieraerztinnen-und-tieraerzte-got/');
        expect(screen.getByRole('link', { name: 'Browse English-speaking vets in Berlin' }).getAttribute('href'))
            .toBe('/vets/berlin');
        expect(screen.getByText(/Do not use this page to decide whether a symptom can safely wait/i))
            .toBeTruthy();
        expect(screen.queryByText(/Can wait until morning/i)).toBeNull();
        expect(screen.queryByText(/FU Berlin Small Animal Clinic/i)).toBeNull();

        const expectedPhones = [
            ['030 51 43 760', 'tel:+49305143760'],
            ['030 20 1805 750', 'tel:+4930201805750'],
            ['030 23 36 26 27', 'tel:+493023362627'],
            ['030 412 73 57', 'tel:+49304127357'],
            ['030 93 22 093', 'tel:+49309322093'],
        ];
        for (const [phone, href] of expectedPhones) {
            expect(screen.getByRole('link', { name: new RegExp(phone) }).getAttribute('href'))
                .toBe(href);
        }

        expect(screen.getByText(/€59\.50 gross emergency-service fee/i)).toBeTruthy();
        expect(screen.getByText(/two to four times the GOT rate/i)).toBeTruthy();

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-04-21');
        expect(schema.dateModified).toBe('2026-07-22');
    });

    it('answers national night and weekend emergency intent without unsafe triage or hotline claims', async () => {
        renderPage(<PetEmergencyGermany />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Germany: Night & Weekend Help (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Find an emergency vet in Germany at night or on weekends. Use verified city services, call before travel, check warning signs, and understand official GOT fees.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet in Germany: Night and Weekend Help (2026)',
        })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Official German veterinary emergency guide' }).getAttribute('href'))
            .toBe('https://www.bundestieraerztekammer.de/presse/2019/08/notdienst-flyer.php');
        expect(screen.getByRole('link', { name: 'Federal GOT section 4' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/got_2022/__4.html');
        expect(screen.getByRole('link', { name: 'German state veterinary chambers' }).getAttribute('href'))
            .toBe('https://bundestieraerztekammer.de/btk/mitglieder/');
        expect(screen.getByRole('link', { name: 'Berlin emergency vet guide' }).getAttribute('href'))
            .toBe('/guides/emergency-vets-berlin');
        expect(screen.getByRole('link', { name: 'Hamburg emergency duty guide' }).getAttribute('href'))
            .toBe('/blog/emergency-vet-hamburg-english');
        expect(screen.getByRole('link', { name: 'Find a regular English-speaking vet' }).getAttribute('href'))
            .toBe('/');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/no single nationwide veterinary emergency number/i);
        expect(articleText).toMatch(/same-day appointment/i);
        expect(articleText).toMatch(/call before (you )?travel/i);
        expect(articleText).toMatch(/€50 net.*€59\.50 gross/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);
        expect(articleText).not.toMatch(/24\/7 in every major city/i);
        expect(articleText).not.toMatch(/€100.?€150/i);
        expect(articleText).not.toMatch(/Poison Control \(Göttingen\)/i);
        expect(articleText).not.toMatch(/at least €500/i);
        expect(articleText).not.toMatch(/Feather Insurance/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('keeps the emergency discovery card aligned with the verified national guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', {
            name: /Emergency Vet Germany: Night & Weekend Help/i,
        });
        expect(guideLink.getAttribute('href')).toBe('/guides/pet-emergency-germany');
        expect(screen.getByText(
            'Find local night and weekend veterinary services, official warning signs, call-ahead steps, and the federal GOT emergency-fee rules.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/emergency numbers/i);
    });

    it('publishes the current LMU Munich emergency workflow without unsupported service claims', async () => {
        renderPage(<PetEmergencyMunich />);

        await waitFor(() => {
            expect(document.title).toBe(
                '24-Hour Emergency Vet Munich: LMU Guide (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Need an emergency vet in Munich? LMU treats dogs and cats 24/7. Check where to go, current service limits, phone guidance, GOT fees and English information.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: '24-Hour Emergency Vet Munich: LMU Guide (2026)',
        })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Official LMU emergency information in English' }).getAttribute('href'))
            .toBe('https://www.vetmed.lmu.de/kleintierklinik/en/for-pet-owners/emergency/');
        expect(screen.getByRole('link', { name: 'Official LMU emergency information in German' }).getAttribute('href'))
            .toBe('https://www.vetmed.lmu.de/kleintierklinik/de/fuer-tierhalterinnen-und-tierhalter/notfaelle/');
        expect(screen.getByRole('link', { name: 'Call LMU Small Animal Clinic' }).getAttribute('href'))
            .toBe('tel:+498921802650');
        expect(screen.getByRole('link', { name: 'Browse English-speaking vets in Munich' }).getAttribute('href'))
            .toBe('/vets/munich');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/dogs and cats only/i);
        expect(articleText).toMatch(/dental and eye emergency care/i);
        expect(articleText).toMatch(/do not delay.*waiting for.*phone/i);
        expect(articleText).toMatch(/€50 net.*€59\.50 gross/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/Highest level of trauma care/i);
        expect(articleText).not.toMatch(/Specialists on call 24\/7/i);
        expect(articleText).not.toMatch(/Full diagnostic imaging/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('keeps the Munich emergency discovery card aligned with the LMU guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', {
            name: /24-Hour Emergency Vet Munich: LMU Guide/i,
        });
        expect(guideLink.getAttribute('href')).toBe('/guides/emergency-vets-munich');
        expect(screen.getByText(
            'Official LMU dog-and-cat emergency access, current service limits, location, phone guidance and GOT fees.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/English-speaking staff/i);
    });

    it('targets banned-breed intent with concise metadata and official state sources', async () => {
        renderPage(<BreedRestrictionsGermany />);

        await waitFor(() => {
            expect(document.title).toBe('Banned Dog Breeds in Germany: State Rules (2026)');
        });

        expect(getMetaContent('description')).toBe(
            'Which dog breeds are banned or restricted in Germany? Compare state rules, permits, muzzle requirements, and the Wesenstest before moving with your dog.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Banned and Restricted Dog Breeds in Germany (2026)',
        })).toBeTruthy();
        expect(screen.getByRole('heading', {
            level: 2,
            name: '1. Federal import rules and state keeping rules are separate',
        })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Federal import restriction law' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/hundverbreinfg/__2.html');
        expect(screen.getByRole('link', { name: 'Federal exceptions regulation' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/hundverbreinfvo/__2.html');
        expect(screen.getByRole('link', { name: 'German Customs guidance' }).getAttribute('href'))
            .toBe('https://www.zoll.de/DE/Privatpersonen/Reisen/Rueckkehr-aus-einem-Nicht-EU-Staat/Einschraenkungen/Gefaehrliche-Hunde/gefaehrliche_hunde.html');
        expect(screen.getByRole('link', { name: 'Berlin dangerous-dog rules' }).getAttribute('href'))
            .toBe('https://www.berlin.de/sen/verbraucherschutz/aufgaben/hundehaltung/artikel.1485419.php');
        expect(screen.getByRole('link', { name: 'Hamburg dangerous-dog permit' }).getAttribute('href'))
            .toBe('https://www.hamburg.de/service/info/11256423/n0/');
        expect(screen.getByRole('link', { name: 'Bavaria breed regulation' }).getAttribute('href'))
            .toBe('https://www.gesetze-bayern.de/Content/Document/BayHundAgressV/True');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Hamburg' }).getAttribute('href'))
            .toBe('/vets/hamburg');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Munich' }).getAttribute('href'))
            .toBe('/vets/munich');

        const articleText = document.body.textContent ?? '';
        expect(articleText).toMatch(/Staffordshire Bull Terrier is covered by the federal import restriction/i);
        expect(articleText).toMatch(/does not automatically make a federally restricted import legal/i);
        expect(articleText).not.toMatch(/bans apply to new acquisitions in most states/i);
        expect(articleText).not.toMatch(/usually grandfathered in/i);
        expect(articleText).not.toMatch(/officials are not looking to confiscate/i);
        expect(articleText).not.toMatch(/typically €50-150/i);
        expect(articleText).not.toMatch(/Baden-Wurttemberg.*size\/weight threshold/is);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-04-28');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('aligns the breed-restrictions discovery card with the federal and state guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', {
            name: /Banned Dog Breeds in Germany: Federal and State Rules/i,
        });
        expect(guideLink.getAttribute('href')).toBe('/blog/breed-restrictions-germany');
        expect(screen.getByText(
            'Check the federal import ban, its limited exceptions, and verified Berlin, Hamburg and Bavaria keeping rules before travelling.',
        )).toBeTruthy();
    });

    it('separates the current EU, listed-country and titration routes for moving pets', async () => {
        renderPage(<MovingWithPetChecklist />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Moving to Germany With a Dog or Cat: 2026 Entry Rules',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Bringing a dog or cat to Germany? Check microchip and rabies timing, EU passport or health certificate, blood-test rules, owner travel and breed restrictions.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Moving to Germany With a Dog or Cat: 2026 Entry Rules',
        })).toBeTruthy();
        expect(screen.getByRole('heading', {
            level: 2,
            name: '1. Start with the country your journey begins in',
        })).toBeTruthy();
        expect(screen.getByText('EU country or Northern Ireland')).toBeTruthy();
        expect(screen.getByText('Listed non-EU country or territory')).toBeTruthy();
        expect(screen.getByText('Other non-EU country or territory')).toBeTruthy();

        expect(screen.getByRole('link', { name: 'Official EU pet travel rules' }).getAttribute('href'))
            .toBe('https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm');
        expect(screen.getByRole('link', { name: 'European Commission non-EU entry guide' }).getAttribute('href'))
            .toBe('https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/bringing-pet-eu-non-eu-country_en');
        expect(screen.getByRole('link', { name: 'Official non-EU country list' }).getAttribute('href'))
            .toBe('https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/listing-territories-and-non-eu-countries_en');
        expect(screen.getByRole('link', { name: 'German federal entry guidance' }).getAttribute('href'))
            .toBe('https://www.bmel.de/EN/topics/animals/pets-and-zoo-animals/pets-entry-regulation.html');
        expect(screen.getByRole('link', { name: 'Germany breed-restriction guide' }).getAttribute('href'))
            .toBe('/blog/breed-restrictions-germany');

        const articleText = document.body.textContent ?? '';
        expect(articleText).toMatch(/Germany does not accept a young dog, cat or ferret that is not yet fully protected against rabies/i);
        expect(articleText).toMatch(/Annex IV certificates issued before 1 October 2026 remain valid/i);
        expect(articleText).toMatch(/does not automatically make the movement commercial/i);
        expect(articleText).not.toMatch(/This waiting period is non-negotiable/i);
        expect(articleText).not.toMatch(/Arrive even one day early/i);
        expect(articleText).not.toMatch(/usually means pets cannot enter Germany until they are around 7 months/i);
        expect(articleText).not.toMatch(/officials? government veterinarian \\(USDA in the US, CFIA in Canada, APHA in the UK\\)/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('aligns the moving-pet discovery card with the current entry guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', {
            name: /Moving to Germany With a Dog or Cat/i,
        });
        expect(guideLink.getAttribute('href')).toBe('/blog/moving-to-germany-with-pet');
        expect(screen.getByText(
            'Choose the correct EU or non-EU route, then check microchip, rabies, certificate, owner-travel and breed requirements.',
        )).toBeTruthy();
    });

    it('targets cat microchipping intent with current city rules and official sources', async () => {
        renderPage(<CatMicrochippingGermany />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Cat Microchipping in Germany: Rules & Registration (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Does your cat need a microchip in Germany? Check Berlin and Hamburg rules for outdoor cats, registration options, and EU pet passport requirements.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Cat Microchipping in Germany: Rules and Registration (2026)',
        })).toBeTruthy();
        expect(screen.getByText(/Germany has no nationwide cat microchipping rule/i)).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Federal cat-protection law' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/tierschg/__13b.html');
        expect(screen.getByRole('link', { name: 'Official Berlin cat rules' }).getAttribute('href'))
            .toBe('https://www.berlin.de/sen/verbraucherschutz/aufgaben/tierschutz/katzenschutzverordnung/artikel.1206331.php');
        expect(screen.getByRole('link', { name: 'Official Hamburg cat rules' }).getAttribute('href'))
            .toBe('https://www.hamburg.de/go/katzenschutzverordnung');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Berlin' }).getAttribute('href'))
            .toBe('/vets/berlin');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Hamburg' }).getAttribute('href'))
            .toBe('/vets/hamburg');

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-05-19');
        expect(schema.dateModified).toBe('2026-07-22');
    });

    it('separates German dog etiquette from federal, state and local dog rules', async () => {
        renderPage(<GermanDogEtiquette />);

        await waitFor(() => {
            expect(document.title).toBe(
                'German Dog Etiquette: Leash Rules & Phrases (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            "Learn how to ask 'Can I pet your dog?' in German, plus current leash, off-leash, certificate, waste and venue rules for dog owners in Germany.",
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'German Dog Etiquette: Leash Rules and Useful Phrases',
        })).toBeTruthy();
        expect(screen.getAllByText('Darf ich Ihren Hund streicheln?')).toHaveLength(2);
        expect(screen.getByText(/Germany does not have one nationwide public-space leash rule/i)).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Federal dog-welfare requirements' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/tierschhuv/__2.html');
        expect(screen.getByRole('link', { name: 'Official Berlin dog-law FAQ' }).getAttribute('href'))
            .toBe('https://www.berlin.de/sen/verbraucherschutz/aufgaben/hundehaltung/artikel.1485419.php');
        expect(screen.getByRole('link', { name: 'Official Hamburg leash guidance' }).getAttribute('href'))
            .toBe('https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/themen/verbraucherschutz/tiere/hundegesetz/anleinpflicht-89206');
        expect(screen.getByRole('link', { name: 'Official Lower Saxony dog-law guidance' }).getAttribute('href'))
            .toBe('https://www.ml.niedersachsen.de/startseite/themen/tiergesundheit_tierschutz/tierschutz_allgemein/informationen-zum-hundegesetz-93854.html');
        expect(screen.getByRole('link', { name: 'Check German breed restrictions' }).getAttribute('href'))
            .toBe('/blog/breed-restrictions-germany');
        expect(screen.getByRole('link', { name: 'Find an English-speaking vet' }).getAttribute('href'))
            .toBe('/');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/check the current rule for the exact place/i);
        expect(articleText).toMatch(/venue decides whether pet dogs may enter/i);
        expect(articleText).not.toMatch(/regardless of the state, leashes are typically mandatory/i);
        expect(articleText).not.toMatch(/Fine for ignoring: €20/i);
        expect(articleText).not.toMatch(/Beer Gardens\\s*ALWAYS/i);
        expect(articleText).not.toMatch(/Expect a bowl of water to arrive before your drink does/i);
        expect(articleText).not.toMatch(/Dogs must be leashed in all public spaces unless/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('aligns the dog-etiquette discovery card with the verified guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', {
            name: /German Dog Etiquette and Useful Phrases/i,
        });
        expect(guideLink.getAttribute('href')).toBe('/blog/german-dog-etiquette-rules');
        expect(screen.getByText(
            'How to greet dogs politely, read local leash signs, compare Berlin, Hamburg and Lower Saxony rules, and ask before entering venues.',
        )).toBeTruthy();
    });

    it('publishes the current MVV dog rules without unsupported local advice', async () => {
        renderPage(<PublicTransportMunich />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Dogs on Munich Public Transport: MVV Rules (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Taking a dog on Munich public transport? Check 2026 MVV ticket, leash and muzzle rules for U-Bahn, S-Bahn, trams, buses and the Deutschlandticket.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Dogs on Munich Public Transport: MVV Rules (2026)',
        })).toBeTruthy();
        expect(screen.getByText(/one dog travels free when you have a valid MVV ticket or Deutschlandticket/i))
            .toBeTruthy();
        expect(screen.getByText(/additional dogs need a child ticket unless they travel in a basket or bag/i))
            .toBeTruthy();
        expect(screen.getByText(/dogs must be kept on a lead/i)).toBeTruthy();
        expect(screen.getByText(/muzzle if there is a risk to passengers/i)).toBeTruthy();
        expect(screen.getByText(/MVV FLEX.*dogs are generally not permitted/i)).toBeTruthy();

        expect(screen.getByRole('link', { name: 'Official MVV dog carriage rules' }).getAttribute('href'))
            .toBe('https://www.mvv-muenchen.de/en/tickets-subscriptions-prices/all-about-tickets/tariff-structure/carry-on-baggage-rules/');
        expect(screen.getByRole('link', { name: 'Official MVV 2026 fare conditions' }).getAttribute('href'))
            .toBe('https://www.mvv-muenchen.de/en/tickets-subscriptions-prices/all-about-tickets/tariff-structure/conditions-of-carriage-and-fare-rules/');
        expect(screen.getByRole('link', { name: 'Official MVV FLEX dog rules' }).getAttribute('href'))
            .toBe('https://www.mvv-muenchen.de/en/vernetzte-mobilitaet/on-demand-services-ods/flex-line-1/');
        expect(screen.getByRole('link', { name: 'Deutsche Bahn dog travel rules' }).getAttribute('href'))
            .toBe('https://www.bahn.de/angebot/zusatzticket/hund');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Munich' }).getAttribute('href'))
            .toBe('/vets/munich');

        expect(screen.queryByText(/large dogs.*generally expected to wear muzzles/i)).toBeNull();
        expect(screen.queryByText(/rush hour.*inspectors may ask/i)).toBeNull();
        expect(screen.queryByText(/IsarCard perk/i)).toBeNull();
        expect(screen.queryByText(/MVV Bergbus allows dogs/i)).toBeNull();

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-23');
    });

    it('keeps the Munich transport discovery card aligned with the verified guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Dogs on Munich Public Transport/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/public-transport-with-dogs-munich');
        expect(screen.getByText(
            'Current MVV rules for dog tickets, leads, muzzles, Deutschlandticket travel and the MVV FLEX exception.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/muzzle gray zone/i);
        expect(guideLink.textContent).not.toMatch(/Germany's financial hub/i);
    });

    it('answers dog-food search intent with evidence-based selection guidance', async () => {
        renderPage(<PetFoodGermany />);

        await waitFor(() => {
            expect(document.title).toBe('Best Dog Food in Germany: How to Choose (2026)');
        });

        expect(getMetaContent('description')).toBe(
            'Compare dog food in Germany using EU label terms, FEDIAF guidance and WSAVA checks. Understand complete food, formats, raw-diet risks and vet diets.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Best Dog Food in Germany: How to Choose (2026)',
        })).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/Alleinfuttermittel.*complete food/i);
        expect(articleText).toMatch(/Ergänzungsfuttermittel.*complementary food/i);
        expect(articleText).toMatch(/ingredient list alone does not determine/i);
        expect(articleText).toMatch(/no single best format/i);
        expect(articleText).toMatch(/no evidence of health benefits/i);
        expect(articleText).toMatch(/not independently laboratory-tested/i);

        expect(screen.getByRole('link', { name: 'EU pet-food labelling regulation' }).getAttribute('href'))
            .toBe('https://eur-lex.europa.eu/eli/reg/2009/767/oj/eng');
        expect(screen.getByRole('link', { name: 'FEDIAF 2025 nutritional guidelines' }).getAttribute('href'))
            .toBe('https://europeanpetfood.org/self-regulation/nutritional-guidelines/');
        expect(screen.getByRole('link', { name: 'WSAVA pet-food selection checklist' }).getAttribute('href'))
            .toBe('https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf');
        expect(screen.getByRole('link', { name: 'WSAVA raw-diet guidance' }).getAttribute('href'))
            .toBe('https://wsava.org/wp-content/uploads/2021/04/Raw-Meat-Based-Diets-for-Pets_WSAVA-Global-Nutrition-Toolkit.pdf');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Germany' }).getAttribute('href'))
            .toBe('/');

        const dinnerForDogs = screen.getByRole('link', { name: 'Dinner for Dogs affiliate link' });
        expect(dinnerForDogs.getAttribute('href')).toBe('https://tidd.ly/4au55tO');
        expect(dinnerForDogs.getAttribute('rel')).toContain('sponsored');
        const zooplus = screen.getByRole('link', { name: 'Zooplus affiliate link' });
        expect(zooplus.getAttribute('href')).toBe('https://tidd.ly/4wdElaw');
        expect(zooplus.getAttribute('rel')).toContain('sponsored');

        expect(articleText).not.toMatch(/good for the teeth/i);
        expect(articleText).not.toMatch(/Germany is a European leader in BARF/i);
        expect(articleText).not.toMatch(/named meat as the first ingredient/i);
        expect(articleText).not.toMatch(/often show visible improvements/i);
        expect(articleText).not.toMatch(/fed more than 2 million dogs/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-23');
    });

    it('keeps the dog-food discovery card aligned with the refreshed guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Best Dog Food in Germany/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/best-dog-food-germany');
        expect(screen.getByText(
            'How to compare complete foods, German label terms, dry and wet formats, raw-diet risks and manufacturer quality checks.',
        )).toBeTruthy();
    });

    it('answers cat-food search intent without unsupported format or ingredient claims', async () => {
        renderPage(<CatFoodGermany />);

        await waitFor(() => {
            expect(document.title).toBe('Best Cat Food in Germany: How to Choose (2026)');
        });

        expect(getMetaContent('description')).toBe(
            'Compare cat food in Germany using EU label terms, wet and dry formats, kitten needs, taurine guidance and manufacturer quality checks.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Best Cat Food in Germany: How to Choose (2026)',
        })).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/Alleinfuttermittel.*complete food/i);
        expect(articleText).toMatch(/Ergänzungsfuttermittel.*complementary food/i);
        expect(articleText).toMatch(/both wet and dry foods can be nutritionally complete/i);
        expect(articleText).toMatch(/complete diets must provide enough taurine/i);
        expect(articleText).toMatch(/ingredient list alone does not determine/i);
        expect(articleText).toMatch(/urethral obstruction is a medical emergency/i);
        expect(articleText).toMatch(/not independently laboratory-tested/i);

        expect(screen.getByRole('link', { name: 'EU pet-food labelling regulation for cats' }).getAttribute('href'))
            .toBe('https://eur-lex.europa.eu/eli/reg/2009/767/oj/eng');
        expect(screen.getByRole('link', { name: 'FEDIAF 2025 cat nutrition guidelines' }).getAttribute('href'))
            .toBe('https://europeanpetfood.org/self-regulation/nutritional-guidelines/');
        expect(screen.getByRole('link', { name: 'WSAVA cat-food selection checklist' }).getAttribute('href'))
            .toBe('https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf');
        expect(screen.getByRole('link', { name: 'Cornell cat-feeding guidance' }).getAttribute('href'))
            .toBe('https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feeding-your-cat');
        expect(screen.getByRole('link', { name: 'Cornell feline urinary guidance' }).getAttribute('href'))
            .toBe('https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-lower-urinary-tract-disease');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Germany for cat nutrition advice' }).getAttribute('href'))
            .toBe('/');

        const zooplus = screen.getByRole('link', { name: 'Zooplus cat-food affiliate link' });
        expect(zooplus.getAttribute('href')).toBe('https://tidd.ly/3R2z5ax');
        expect(zooplus.getAttribute('rel')).toContain('sponsored');

        expect(articleText).not.toMatch(/wet food is generally better/i);
        expect(articleText).not.toMatch(/recommended staple for most cats/i);
        expect(articleText).not.toMatch(/named meat as the first ingredient/i);
        expect(articleText).not.toMatch(/dry-only diet raises the risk/i);
        expect(articleText).not.toMatch(/skip foods that lead with grains/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-06-23');
        expect(schema.dateModified).toBe('2026-07-23');
    });

    it('keeps the cat-food discovery card aligned with the refreshed guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Best Cat Food in Germany/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/best-cat-food-germany');
        expect(screen.getByText(
            'How to compare complete foods, wet and dry formats, taurine needs, kitten nutrition and manufacturer quality checks.',
        )).toBeTruthy();
    });

    it('publishes risk-based tick guidance without unsafe product or timing claims', async () => {
        renderPage(<TickSeasonGermanyPets />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Tick Season in Germany: Protect Dogs & Cats (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Learn when ticks are active in Germany, how to check and remove them safely, choose species-appropriate prevention, and recognize warning signs in pets.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Tick Season in Germany: Protect Dogs & Cats (2026)',
        })).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/no single nationwide tick season/i);
        expect(articleText).toMatch(/risk varies with weather, region, habitat, travel, and the individual animal/i);
        expect(articleText).toMatch(/inspect.*after outdoor exposure/i);
        expect(articleText).toMatch(/remove visible ticks as soon as possible/i);
        expect(articleText).toMatch(/do not use oil, alcohol, or ether/i);
        expect(articleText).toMatch(/only a product authorised for the animal species/i);
        expect(articleText).toMatch(/never combine or layer parasite products unless/i);
        expect(articleText).toMatch(/permethrin.*severe.*poisoning.*cats/i);
        expect(articleText).toMatch(/RKI.*human TBE risk.*not.*pet tick-density map/i);
        expect(articleText).toMatch(/transmission timing varies by pathogen/i);

        expect(screen.getByRole('link', { name: 'ESCCAP Germany ectoparasite guideline' }).getAttribute('href'))
            .toBe('https://www.esccap.de/empfehlung/neue-ektoparasiten/');
        expect(screen.getByRole('link', { name: 'German BVL tick-product safety warning' }).getAttribute('href'))
            .toBe('https://www.bvl.bund.de/SharedDocs/Pressemitteilungen/05_tierarzneimittel/2021/2021_04_09_PI_Auwaldzecke.html?nn=10418114');
        expect(screen.getByRole('link', { name: 'ESCCAP vector-borne disease guideline' }).getAttribute('href'))
            .toBe('https://www.esccap.de/empfehlung/vbds/');
        expect(screen.getByRole('link', { name: 'RKI 2026 human TBE risk areas' }).getAttribute('href'))
            .toBe('https://edoc.rki.de/handle/176904/13432');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Germany for tick prevention' }).getAttribute('href'))
            .toBe('/');

        expect(articleText).not.toMatch(/one of the most tick-intensive countries/i);
        expect(articleText).not.toMatch(/March through November/i);
        expect(articleText).not.toMatch(/7 to 8°C/i);
        expect(articleText).not.toMatch(/year-round prevention is increasingly the standard recommendation/i);
        expect(articleText).not.toMatch(/prescription products.*stronger and safer/i);
        expect(articleText).not.toMatch(/Frontline|Advantix|NexGard|Bravecto|Simparica|Seresto/i);
        expect(articleText).not.toMatch(/best used as a supplement to spot-ons or pills/i);
        expect(articleText).not.toMatch(/Lyme disease transmission typically requires.*24 to 48 hours/i);
        expect(articleText).not.toMatch(/Do not:.*Twist/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-05-26');
        expect(schema.dateModified).toBe('2026-07-23');
    });

    it('keeps the tick-season discovery card aligned with the verified guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Tick Season in Germany/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/tick-season-germany-pets');
        expect(screen.getByText(
            'When ticks are active, how to check and remove them safely, species-specific prevention and urgent warning signs.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/highest tick burdens/i);
    });

    it('publishes the current KVB and VRS dog rules without false ticket or muzzle advice', async () => {
        renderPage(<PublicTransportCologne />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Dogs on Cologne Public Transport: KVB Rules (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Taking a dog on Cologne public transport? Check 2026 KVB and VRS rules for free travel, short leashes, muzzles, seats, carriers and assistance dogs.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Dogs on Cologne Public Transport: KVB Rules (2026)',
        })).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/dogs travel free.*KVB.*VRS/i);
        expect(articleText).toMatch(/no separate dog ticket/i);
        expect(articleText).toMatch(/no automatic right to take an animal/i);
        expect(articleText).toMatch(/short leash.*suitable person/i);
        expect(articleText).toMatch(/muzzle.*dog.*could endanger other passengers/i);
        expect(articleText).toMatch(/size alone does not create a KVB muzzle requirement/i);
        expect(articleText).toMatch(/dangerous dogs and dogs of specified breeds.*official exemption/i);
        expect(articleText).toMatch(/dogs must not occupy seats/i);
        expect(articleText).toMatch(/other animals.*suitable containers/i);
        expect(articleText).toMatch(/assistance dogs.*always admitted/i);
        expect(articleText).toMatch(/outside NRW.*local rules may differ/i);

        expect(screen.getByRole('link', { name: 'Official KVB dog-travel FAQ' }).getAttribute('href'))
            .toBe('https://www.kvb.koeln/abos-und-tickets/faq.html');
        expect(screen.getByRole('link', { name: 'Official NRW transport conditions effective July 2026' }).getAttribute('href'))
            .toBe('https://www.vrs.de/fileadmin/01_Tickets/Downloads_und_Informationen/NRW_Befoerderungsbedingungen_01072026.pdf');
        expect(screen.getByRole('link', { name: 'Official VRS tariff information' }).getAttribute('href'))
            .toBe('https://www.vrs.de/tickets/tarifbestimmungen-rheinlandtarif');
        expect(screen.getByRole('link', { name: 'Official Cologne dog and muzzle rules' }).getAttribute('href'))
            .toBe('https://www.stadt-koeln.de/leben-in-koeln/umwelt-tiere/74472/index.html');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Cologne' }).getAttribute('href'))
            .toBe('/vets/cologne');

        expect(articleText).not.toMatch(/dogs need a Kinderticket or Kurzstrecke ticket/i);
        expect(articleText).not.toMatch(/standard dog ticket/i);
        expect(articleText).not.toMatch(/muzzle required for large and restricted breeds/i);
        expect(articleText).not.toMatch(/inspectors rarely enforce/i);
        expect(articleText).not.toMatch(/inspectors tend to be fussier/i);
        expect(articleText).not.toMatch(/fine for travelling without a valid dog ticket/i);
        expect(articleText).not.toMatch(/Kurzstrecke ticket is €2\.20/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-05-05');
        expect(schema.dateModified).toBe('2026-07-23');
    });

    it('keeps the Cologne transport discovery card aligned with the current rules', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Dogs on Cologne Public Transport/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/public-transport-with-dogs-cologne');
        expect(screen.getByText(
            'Dogs travel free on KVB and VRS services. Check short-leash, muzzle, seat, carrier and assistance-dog rules.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/peak hour tips/i);
    });

    it('publishes a sourced dog and cat insurance comparison without invented prices or rankings', async () => {
        renderPage(<PetInsuranceGermany />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Pet Insurance in Germany: Dog & Cat Guide (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Compare pet insurance in Germany for dogs and cats. Understand liability, health and surgery cover, exclusions, GOT reimbursement and policy limits.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Pet Insurance in Germany: Dog & Cat Guide (2026)',
        })).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/dog liability insurance.*separate.*pet health insurance/i);
        expect(articleText).toMatch(/requirement.*varies by federal state.*dog classification/i);
        expect(articleText).toMatch(/health insurance.*optional/i);
        expect(articleText).toMatch(/cats.*usually covered.*private liability/i);
        expect(articleText).toMatch(/OP-only.*fuller health/i);
        expect(articleText).toMatch(/pre-existing conditions.*waiting periods.*age limits/i);
        expect(articleText).toMatch(/GOT reimbursement.*emergency/i);
        expect(articleText).toMatch(/annual limit.*deductible/i);
        expect(articleText).toMatch(/insurer.*cancel.*after a claim/i);
        expect(articleText).toMatch(/no universal best policy/i);
        expect(articleText).toMatch(/not independently audited.*policy wording.*claim outcomes/i);

        expect(screen.getAllByRole('link', { name: 'German Civil Code section 833' })
            .some((link) => link.getAttribute('href') === 'https://www.gesetze-im-internet.de/bgb/__833.html'))
            .toBe(true);
        expect(screen.getAllByRole('link', { name: 'Verbraucherzentrale pet health insurance guide' })
            .some((link) => link.getAttribute('href') === 'https://www.verbraucherzentrale.de/wissen/geld-versicherungen/weitere-versicherungen/krankenversicherungen-fuer-haustiere-sinnvoll-oder-ueberfluessig-10781'))
            .toBe(true);
        expect(screen.getAllByRole('link', { name: 'Official German veterinary fee regulation' })
            .some((link) => link.getAttribute('href') === 'https://www.gesetze-im-internet.de/got_2022/'))
            .toBe(true);
        expect(screen.getByRole('link', { name: 'Official Berlin dog insurance rules' }).getAttribute('href'))
            .toBe('https://www.berlin.de/sen/verbraucherschutz/aufgaben/hundehaltung/');
        expect(screen.getByRole('link', { name: 'Official Hamburg dog insurance rules' }).getAttribute('href'))
            .toBe('https://www.hamburg.de/politik-und-verwaltung/behoerden/bjv/themen/verbraucherschutz/tiere/hundegesetz/hundegesetz-53038');
        expect(screen.getByRole('link', { name: 'German vet costs and GOT guide' }).getAttribute('href'))
            .toBe('/blog/vet-costs-germany');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Germany' }).getAttribute('href'))
            .toBe('/');

        expect(articleText).not.toMatch(/Yes, you need pet insurance/i);
        expect(articleText).not.toMatch(/100% liable/i);
        expect(articleText).not.toMatch(/mandatory for ALL dogs in/i);
        expect(articleText).not.toMatch(/€40.*€150/i);
        expect(articleText).not.toMatch(/€10.*€25/i);
        expect(articleText).not.toMatch(/€30.*€80/i);
        expect(articleText).not.toMatch(/€50,000\+|€100,000\+|€200,000\+/i);
        expect(articleText).not.toMatch(/premiums are locked in lower/i);
        expect(articleText).not.toMatch(/Best Pet Insurance Providers for Expats/i);
        expect(articleText).not.toMatch(/100% English support/i);
        expect(articleText).not.toMatch(/Extremely reliable coverage/i);
        expect(articleText).not.toMatch(/single emergency vet visit can bankrupt you/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2025-01-01');
        expect(schema.dateModified).toBe('2026-07-23');
    });

    it('keeps the pet-insurance discovery card aligned with the comparison guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Pet Insurance in Germany/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/pet-insurance-germany');
        expect(screen.getByText(
            'Compare dog liability, cat and dog health cover, surgery policies, exclusions, GOT reimbursement and policy limits.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/Do you really need it/i);
    });

    it('explains GOT billing without presenting base fees as typical total prices', async () => {
        renderPage(<VetCostsGermany />);

        await waitFor(() => {
            expect(document.title).toBe(
                'Vet Costs in Germany: GOT Fees Explained (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Understand vet costs in Germany: GOT base fees, 1x-3x rates, emergency 2x-4x billing, invoice items, VAT and how to request an estimate.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Vet Costs in Germany: GOT Fees Explained (2026)',
        })).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/base fees.*not fixed total prices/i);
        expect(articleText).toMatch(/ordinary.*one to three times.*GOT/i);
        expect(articleText).toMatch(/difficulty.*time.*timing.*value of the animal.*local circumstances/i);
        expect(articleText).toMatch(/listed GOT amounts exclude VAT/i);
        expect(articleText).toMatch(/general examination with consultation.*dog, cat, or ferret.*€23\.62 net/i);
        expect(articleText).toMatch(/not a typical or guaranteed total/i);
        expect(articleText).toMatch(/qualifying emergency service.*two to four times.*€50 net/i);
        expect(articleText).toMatch(/regular scheduled consultation.*not.*emergency service/i);
        expect(articleText).toMatch(/medicine.*materials.*laboratory.*travel.*separate/i);
        expect(articleText).toMatch(/date.*species.*diagnosis or reason.*service number.*amount.*VAT/i);
        expect(articleText).toMatch(/request.*itemised invoice/i);
        expect(articleText).toMatch(/below the 1x rate or above the 3x rate.*agreed in text.*before treatment/i);
        expect(articleText).toMatch(/estimate.*not binding/i);
        expect(articleText).toMatch(/no universal average vet bill/i);

        expect(screen.getByRole('link', { name: 'Official German veterinary fee regulation' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/got_2022/');
        expect(screen.getByRole('link', { name: 'Official GOT section 2 on ordinary fees' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/got_2022/__2.html');
        expect(screen.getByRole('link', { name: 'Official GOT section 4 on emergency fees' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/got_2022/__4.html');
        expect(screen.getByRole('link', { name: 'Official GOT section 7 on invoices' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/got_2022/__7.html');
        expect(screen.getByRole('link', { name: 'Bundestierärztekammer GOT guide for pet owners' }).getAttribute('href'))
            .toBe('https://www.bundestieraerztekammer.de/tieraerzte/beruf/got/');
        expect(screen.getByRole('link', { name: 'Pet insurance comparison guide' }).getAttribute('href'))
            .toBe('/blog/pet-insurance-germany');
        expect(screen.getByRole('link', { name: 'Pet emergency guide' }).getAttribute('href'))
            .toBe('/guides/pet-emergency-germany');
        expect(screen.getByRole('link', { name: 'English-speaking vets in Germany' }).getAttribute('href'))
            .toBe('/');

        expect(articleText).not.toMatch(/1x-4x multiplier system/i);
        expect(articleText).not.toMatch(/routine visits at 1x to 2x/i);
        expect(articleText).not.toMatch(/Big-city practices often bill closer to 2x/i);
        expect(articleText).not.toMatch(/Realistic all-in ranges/i);
        expect(articleText).not.toMatch(/Cruciate ligament.*1,500/i);
        expect(articleText).not.toMatch(/Poisoning emergency/i);
        expect(articleText).not.toMatch(/catches the 2,000 EUR problem/i);
        expect(articleText).not.toMatch(/video-vet triage call first can save/i);
        expect(articleText).not.toMatch(/over 1,000 individual services/i);
        expect(articleText).not.toMatch(/Why You Cannot Negotiate/i);
        expect(articleText).not.toMatch(/Reputable practices provide one without fuss/i);
        expect(articleText).not.toMatch(/Premiums lock in lower/i);
        expect(articleText).not.toMatch(/single biggest lever is insurance/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-07-11');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('keeps the vet-cost discovery card aligned with the statutory billing guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /Vet Costs in Germany/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/vet-costs-germany');
        expect(screen.getByText(
            'Understand GOT base fees, ordinary 1x-3x rates, emergency 2x-4x billing, invoice items, VAT and estimates.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/1x-4x/i);
    });

    it('prepares owners for a first German vet appointment without fixed prices or universal practice claims', async () => {
        renderPage(<FirstVetVisitGermany />);

        await waitFor(() => {
            expect(document.title).toBe(
                'First Vet Visit in Germany: What to Bring (2026)',
            );
        });

        expect(getMetaContent('description')).toBe(
            'Prepare for your first vet visit in Germany. Bring records and medicines, confirm language and payment, understand GOT fees, and request an itemised invoice.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'First Vet Visit in Germany: What to Bring and Ask',
        })).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/confirm.*English.*booking/i);
        expect(articleText).toMatch(/listing status.*quality promise/i);
        expect(articleText).toMatch(/vaccination.*medical records.*medicines/i);
        expect(articleText).toMatch(/symptom.*timeline/i);
        expect(articleText).toMatch(/ask before bringing.*sample/i);
        expect(articleText).toMatch(/benefits.*risks.*alternatives/i);
        expect(articleText).toMatch(/expected costs.*not a fixed quote/i);
        expect(articleText).toMatch(/ordinary services.*one to three times.*GOT/i);
        expect(articleText).toMatch(/date.*species.*diagnosis or reason.*service number.*amount.*VAT/i);
        expect(articleText).toMatch(/itemised invoice.*on request/i);
        expect(articleText).toMatch(/authorised veterinarian.*EU resident/i);
        expect(articleText).toMatch(/microchip.*before.*rabies vaccination/i);
        expect(articleText).toMatch(/payment methods.*before the appointment/i);
        expect(articleText).toMatch(/policy.*claim process/i);
        expect(articleText).toMatch(/urgent.*pet emergency guide/i);

        expect(screen.getByRole('link', { name: 'Directory quality promise' }).getAttribute('href'))
            .toBe('/quality-promise');
        expect(screen.getByRole('link', { name: 'German vet costs and GOT guide' }).getAttribute('href'))
            .toBe('/blog/vet-costs-germany');
        expect(screen.getByRole('link', { name: 'Pet emergency guide' }).getAttribute('href'))
            .toBe('/guides/pet-emergency-germany');
        expect(screen.getByRole('link', { name: 'EU pet passport guide' }).getAttribute('href'))
            .toBe('/blog/eu-pet-passport-germany');
        expect(screen.getByRole('link', { name: 'Official GOT guide for pet owners' }).getAttribute('href'))
            .toBe('https://www.bundestieraerztekammer.de/tieraerzte/beruf/got/');
        expect(screen.getByRole('link', { name: 'Official GOT invoice rules' }).getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/got_2022/__7.html');
        expect(screen.getByRole('link', { name: 'European Commission pet passport FAQ' }).getAttribute('href'))
            .toBe('https://food.ec.europa.eu/animals/live-animal-movements/dogs-cats-and-ferrets/faqs_en');
        expect(screen.getByRole('link', { name: 'StIKo Vet vaccination guidance' }).getAttribute('href'))
            .toBe('https://www.openagrar.de/servlets/MCRFileNodeServlet/openagrar_derivate_00063989/Impfleitlinie_Kleintiere_2025-01-06.pdf');

        expect(articleText).not.toMatch(/every practice listed.*community-verified/i);
        expect(articleText).not.toMatch(/German veterinary care is genuinely excellent/i);
        expect(articleText).not.toMatch(/walk-ins are generally only accepted for emergencies/i);
        expect(articleText).not.toMatch(/email in English is almost always fine/i);
        expect(articleText).not.toMatch(/German vets can read English medical records/i);
        expect(articleText).not.toMatch(/waiting room.*usually shared/i);
        expect(articleText).not.toMatch(/more conservative with medication/i);
        expect(articleText).not.toMatch(/no automatic yearly reminders/i);
        expect(articleText).not.toMatch(/€15.?25|€40.?80/i);
        expect(articleText).not.toMatch(/prefer.*cash|surcharge for card/i);
        expect(articleText).not.toMatch(/almost always pay upfront/i);
        expect(articleText).not.toMatch(/reluctant to see animals.*never met/i);

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-04-14');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('keeps the first-visit discovery card aligned with the verified appointment guide', () => {
        renderPage(<Blog />);

        const guideLink = screen.getByRole('link', { name: /First Vet Visit in Germany/i });
        expect(guideLink.getAttribute('href')).toBe('/blog/first-vet-visit-germany');
        expect(screen.getByText(
            'What to bring, what to ask, how GOT billing and invoices work, and when pet-passport rules matter.',
        )).toBeTruthy();
        expect(guideLink.textContent).not.toMatch(/What to Expect/i);
    });
});
