import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetDresdenGuide from './EmergencyVetDresdenGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetDresdenGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetDresdenGuide', () => {
    it('publishes the official Saxony duty pathway without inventing a fixed clinic', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Dresden: Official Duty Service (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Dresden? Find the official Saxony duty number, live practice lookup, current night and weekend hours, warning signs, and GOT fees.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-dresden',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Dresden: Official Duty Service (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call the Saxony veterinary duty service',
        }).getAttribute('href')).toBe('tel:+491805843736');
        expect(screen.getByRole('link', {
            name: 'Find the current Saxony duty practice',
        }).getAttribute('href')).toBe('https://vetnotdienst.de/');
        expect(screen.getByRole('link', {
            name: 'Official Dresden veterinary emergency guidance',
        }).getAttribute('href')).toBe(
            'https://www.dresden.de/de/rathaus/aemter-und-einrichtungen/oe/dborg/stadt_dresden_6360.php?shortcut=gefluegelpest',
        );
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Dresden',
        }).getAttribute('href')).toBe('/vets/dresden');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official sources on 26 July 2026/i);
        expect(articleText).toMatch(/Monday to Friday.*18:00.*08:00/i);
        expect(articleText).toMatch(/Friday 18:00.*Monday 08:00/i);
        expect(articleText).toMatch(/public holidays.*all day/i);
        expect(articleText).toMatch(/listen to the complete recorded announcement/i);
        expect(articleText).toMatch(/call before travelling/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/fixed emergency clinic/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-dresden',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
