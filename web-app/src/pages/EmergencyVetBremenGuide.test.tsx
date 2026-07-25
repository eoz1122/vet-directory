import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetBremenGuide from './EmergencyVetBremenGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetBremenGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetBremenGuide', () => {
    it('publishes the official Bremen duty service and its current limits', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Bremen: Official Duty Number & Hours (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Bremen? Find the official veterinary duty number and hours, required call-ahead steps, fallback clinics, warning signs, and GOT fees.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-bremen',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Bremen: Official Duty Number & Hours (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call the official Bremen veterinary duty service',
        }).getAttribute('href')).toBe('tel:+49421438167');
        expect(screen.getByRole('link', {
            name: 'Official Bremen veterinary duty service',
        }).getAttribute('href')).toBe(
            'https://tieraerztekammer-bremen.org/notdienst/',
        );
        expect(screen.getByRole('link', {
            name: 'Official Bremen animal-emergency guidance',
        }).getAttribute('href')).toBe(
            'https://www.gesundheit.bremen.de/das-ressort/stabsbereich-landesbeauftragte-fuer-den-tierschutz/tiernotfall-46575',
        );
        expect(screen.getByRole('link', {
            name: 'Official German veterinary emergency warning signs',
        }).getAttribute('href')).toBe(
            'https://www.bundestieraerztekammer.de/d.php?id=8659',
        );
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Bremen',
        }).getAttribute('href')).toBe('/vets/bremen');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official sources on 26 July 2026/i);
        expect(articleText).toMatch(/Monday to Friday.*18:00.*22:00/i);
        expect(articleText).toMatch(/Saturday, Sunday, and public holidays.*08:00.*22:00/i);
        expect(articleText).toMatch(/telephone registration is mandatory/i);
        expect(articleText).toMatch(/Tierklinik Posthausen.*04297 168990/i);
        expect(articleText).toMatch(/Klinik für Kleintiere Sottrum.*04264 2240/i);
        expect(articleText).toMatch(/TiHo Hannover.*0511 953-6200/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/24-hour vet in Bremen/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-bremen',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
