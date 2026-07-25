import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetKarlsruheGuide from './EmergencyVetKarlsruheGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetKarlsruheGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetKarlsruheGuide', () => {
    it('publishes the official rotating duty pathway without overstating fixed-clinic coverage', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Karlsruhe: Official 24-Hour Duty Line (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Karlsruhe? Find the official 24-hour duty number, rotating-practice instructions, Durlach centre hours, warning signs, and GOT fees.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-karlsruhe',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Karlsruhe: Official 24-Hour Duty Line (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call the official Karlsruhe veterinary duty service',
        }).getAttribute('href')).toBe('tel:+49721495566');
        expect(screen.getByRole('link', {
            name: 'Official City of Karlsruhe veterinary emergency number',
        }).getAttribute('href')).toBe('https://www.karlsruhe.de/stadt-rathaus/service-buergerinformation/notrufnummern');
        expect(screen.getByRole('link', {
            name: 'Official Karlsruhe veterinary duty service',
        }).getAttribute('href')).toBe('https://www.tierarzt-notdienst-karlsruhe.de/');
        expect(screen.getByRole('link', {
            name: 'Official Karlsruhe-Durlach emergency information',
        }).getAttribute('href')).toBe('https://tierarzt-karlsruhe-durlach.de/tierarzt-notdienst-karlsruhe/');
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Karlsruhe',
        }).getAttribute('href')).toBe('/vets/karlsruhe');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official and first-party sources on 26 July 2026/i);
        expect(articleText).toMatch(/24 hours.*365 days/i);
        expect(articleText).toMatch(/recorded announcement.*current duty veterinarian/i);
        expect(articleText).toMatch(/call.*before travelling/i);
        expect(articleText).toMatch(/07:00.*22:00/i);
        expect(articleText).toMatch(/Bergwaldstraße 30.*76227 Karlsruhe/i);
        expect(articleText).toMatch(/no fixed 24-hour clinic in Karlsruhe/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/Durlach.*24\/7/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-karlsruhe',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
