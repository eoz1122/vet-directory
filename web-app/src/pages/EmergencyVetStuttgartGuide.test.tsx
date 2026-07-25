import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetStuttgartGuide from './EmergencyVetStuttgartGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetStuttgartGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetStuttgartGuide', () => {
    it('publishes the official city duty line and a current 24-hour clinic', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Stuttgart: Official Numbers & 24/7 Help (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Stuttgart? Call the official city duty line or a current 24h clinic, plus GOT fees, warning signs, and English phrases.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-stuttgart',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Stuttgart: Official Numbers & 24/7 Help (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call Stuttgart veterinary duty service',
        }).getAttribute('href')).toBe('tel:+497117657477');
        expect(screen.getByRole('link', {
            name: 'Call Stuttgart 24-hour clinic',
        }).getAttribute('href')).toBe('tel:+49711637380');
        expect(screen.getByRole('link', {
            name: 'Official Stuttgart emergency services information',
        }).getAttribute('href')).toBe('https://www.stuttgart.de/service/notdienste/');
        expect(screen.getByRole('link', {
            name: 'Official English Stuttgart emergency services information',
        }).getAttribute('href')).toBe('https://www.stuttgart.de/en/service/notdienste/');
        expect(screen.getByRole('link', {
            name: 'Official Stuttgart clinic emergency information',
        }).getAttribute('href')).toBe('https://www.tierklinik-stuttgart.de/');
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Stuttgart',
        }).getAttribute('href')).toBe('/vets/stuttgart');
        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Munich',
        }).getAttribute('href')).toBe('/guides/emergency-vets-munich');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official sources on 25 July 2026/i);
        expect(articleText).toMatch(/returns the phone number of the veterinarian currently on duty/i);
        expect(articleText).toMatch(/Monday to Sunday, 24-hour emergency service/i);
        expect(articleText).toMatch(/municipal animal emergency service is a separate service/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).toMatch(/call before (you )?travel/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-stuttgart',
        );
        expect(schema.datePublished).toBe('2026-07-25');
        expect(schema.dateModified).toBe('2026-07-25');
    });
});
