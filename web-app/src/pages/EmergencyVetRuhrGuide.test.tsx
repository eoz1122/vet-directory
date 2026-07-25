import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetRuhrGuide from './EmergencyVetRuhrGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetRuhrGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetRuhrGuide', () => {
    it('publishes official Essen and Dortmund emergency routes with safe language', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Essen & Ruhr Area: 24/7 Help (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Essen or Dortmund? Call the official local duty service, check a verified 24h Essen clinic, GOT fees, warning signs, and English phrases.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe('https://englishspeakinggermany.online/guides/emergency-vets-ruhr');
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Essen & Ruhr Area: 24/7 Help (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call Essen veterinary duty service',
        }).getAttribute('href')).toBe('tel:+491806451300');
        expect(screen.getByRole('link', {
            name: 'Call Essen 24-hour clinic',
        }).getAttribute('href')).toBe('tel:+49201342604');
        expect(screen.getByRole('link', {
            name: 'Official Nordrhein emergency service information',
        }).getAttribute('href')).toBe(
            'https://www.tieraerztekammer-nordrhein.de/informationen-zum-tieraerztlichen-notdienst/',
        );
        expect(screen.getByRole('link', {
            name: 'Official Essen clinic emergency information',
        }).getAttribute('href')).toBe(
            'https://tieraerztliche-klinik.de/kontakt/',
        );
        expect(screen.getByRole('link', {
            name: 'Official Dortmund duty schedule',
        }).getAttribute('href')).toBe('https://www.tiernotdienst-dortmund.de/');
        expect(screen.getByRole('link', {
            name: 'Westfalen-Lippe veterinary duty finder',
        }).getAttribute('href')).toBe(
            'https://www.tieraerztekammer-wl.de/fuer-tierhalter/notdienst-finder/',
        );
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Essen',
        }).getAttribute('href')).toBe('/vets/essen');
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Dortmund',
        }).getAttribute('href')).toBe('/vets/dortmund');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official sources on 25 July 2026/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/Monday to Friday: 18:00 to 22:00/i);
        expect(articleText).toMatch(/Weekends and public holidays: 10:00 to 18:00/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).toMatch(/call before (you )?travel/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-ruhr',
        );
        expect(schema.datePublished).toBe('2026-07-25');
        expect(schema.dateModified).toBe('2026-07-25');
    });
});
