import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetBonnGuide from './EmergencyVetBonnGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetBonnGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetBonnGuide', () => {
    it('publishes the current rota, eligibility limits, and separate Cologne fallback', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Bonn: Official Duty Rota and Hours (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Bonn? Find the current rotating practice, official duty hours, patient eligibility, Cologne 24-hour fallback, warning signs, and GOT fees.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-bonn',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Bonn: Official Duty Rota and Hours (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Open the current Bonn veterinary duty rota',
        }).getAttribute('href')).toBe('https://www.bonner-tieraerzte.de/');
        expect(screen.getByRole('link', {
            name: 'Official Nordrhein veterinary emergency guidance',
        }).getAttribute('href')).toBe('https://www.tieraerztekammer-nordrhein.de/informationen-zum-tieraerztlichen-notdienst/');
        expect(screen.getByRole('link', {
            name: 'Call the Cologne 24-hour veterinary clinic',
        }).getAttribute('href')).toBe('tel:+49221474543911');
        expect(screen.getByRole('link', {
            name: 'Official Cologne-South emergency information',
        }).getAttribute('href')).toBe('https://koelner-tierklinik.de/leistungen/notfallmedizin');
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Bonn',
        }).getAttribute('href')).toBe('/vets/bonn');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official and first-party sources on 26 July 2026/i);
        expect(articleText).toMatch(/no central.*phone number/i);
        expect(articleText).toMatch(/only.*patients of member practices/i);
        expect(articleText).toMatch(/always call.*before travelling/i);
        expect(articleText).toMatch(/Wednesday and Friday.*12:00.*next morning at 08:00/i);
        expect(articleText).toMatch(/Saturday and Sunday.*08:00.*next morning at 08:00/i);
        expect(articleText).toMatch(/public holidays.*08:00.*next morning at 08:00/i);
        expect(articleText).toMatch(/Monday, Tuesday, and Thursday.*own regular veterinarian/i);
        expect(articleText).toMatch(/payment.*immediately.*no later invoice/i);
        expect(articleText).toMatch(/Brühler Straße 183.*185.*50968 Köln/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/Bonn duty service is available 24\/7/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-bonn',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
