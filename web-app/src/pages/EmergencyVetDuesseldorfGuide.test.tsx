import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetDuesseldorfGuide from './EmergencyVetDuesseldorfGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetDuesseldorfGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetDuesseldorfGuide', () => {
    it('publishes the current 24-hour clinic and the chamber hotline limitation', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Düsseldorf: 24/7 Clinic Help (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            "Need an emergency vet in Düsseldorf? Call a current 24/7 clinic, see the chamber's hotline status, GOT fees, warning signs, and English phrases.",
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-duesseldorf',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Düsseldorf: 24/7 Clinic Help (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call Düsseldorf 24-hour clinic',
        }).getAttribute('href')).toBe('tel:+49211626868');
        expect(screen.getByRole('link', {
            name: 'Official Düsseldorf clinic emergency information',
        }).getAttribute('href')).toBe(
            'https://www.anicura.de/standorte/tierklinik-duesseldorf/kontakt/',
        );
        expect(screen.getByRole('link', {
            name: 'Official English clinic page',
        }).getAttribute('href')).toBe(
            'https://www.anicura.de/en/our-clinics/tierklinik-duesseldorf/',
        );
        expect(screen.getByRole('link', {
            name: 'Official Nordrhein emergency service information',
        }).getAttribute('href')).toBe(
            'https://www.tieraerztekammer-nordrhein.de/informationen-zum-tieraerztlichen-notdienst/',
        );
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Düsseldorf',
        }).getAttribute('href')).toBe('/vets/düsseldorf');
        expect(screen.getByRole('link', {
            name: 'Emergency help in Essen and the Ruhr area',
        }).getAttribute('href')).toBe('/guides/emergency-vets-ruhr');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official sources on 25 July 2026/i);
        expect(articleText).toMatch(/does not currently publish a central Düsseldorf emergency phone number/i);
        expect(articleText).toMatch(/every day, 00:00 to 24:00/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).toMatch(/call before (you )?travel/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-duesseldorf',
        );
        expect(schema.datePublished).toBe('2026-07-25');
        expect(schema.dateModified).toBe('2026-07-25');
    });
});
