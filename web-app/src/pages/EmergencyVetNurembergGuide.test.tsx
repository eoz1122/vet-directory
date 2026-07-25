import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetNurembergGuide from './EmergencyVetNurembergGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetNurembergGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetNurembergGuide', () => {
    it('publishes the clinic pathway with its life-threatening-case limits', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Nuremberg: 24/7 Critical Care (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Nuremberg? Find the Hafen clinic address, 24/7 pathway for life-threatening cases, call limits, warning signs, and GOT fees.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-nuremberg',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Nuremberg: 24/7 Critical Care (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call Tierklinik Nürnberg Hafen during regular opening hours',
        }).getAttribute('href')).toBe('tel:+49911643110');
        expect(screen.getByRole('link', {
            name: 'Official Tierklinik Nürnberg Hafen emergency guidance',
        }).getAttribute('href')).toBe('https://www.tierklinik-nbg.de/');
        expect(screen.getByRole('link', {
            name: 'Official Tierklinik Nürnberg Hafen contact details',
        }).getAttribute('href')).toBe('https://www.tierklinik-nbg.de/kontakt/');
        expect(screen.getByRole('link', {
            name: 'Directions to Tierklinik Nürnberg Hafen',
        }).getAttribute('href')).toContain('Wertachstra%C3%9Fe+1');
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Nuremberg',
        }).getAttribute('href')).toBe('/vets/nuremberg');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against first-party sources on 26 July 2026/i);
        expect(articleText).toMatch(/Wertachstraße 1.*90451 Nürnberg/i);
        expect(articleText).toMatch(/Monday to Friday.*08:00.*13:00.*14:00.*19:00/i);
        expect(articleText).toMatch(/outside regular opening hours.*acutely life-threatening/i);
        expect(articleText).toMatch(/go directly to the clinic/i);
        expect(articleText).toMatch(/telephone advice is not available.*recorded announcement/i);
        expect(articleText).toMatch(/duty veterinarian decides.*admission/i);
        expect(articleText).toMatch(/longer waiting times/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/all cases.*24\/7/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-nuremberg',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
