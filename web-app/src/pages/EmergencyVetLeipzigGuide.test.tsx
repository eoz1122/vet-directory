import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetLeipzigGuide from './EmergencyVetLeipzigGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetLeipzigGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetLeipzigGuide', () => {
    it('publishes current Leipzig emergency pathways without overstating access', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Leipzig: Night & Weekend Help (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            "Need an emergency vet in Leipzig? Find current night and weekend care, the University clinic's critical-patient service, local duty number, exotic-pet help, and GOT fees.",
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-leipzig',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Leipzig: Night & Weekend Help (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call Leipzig-Stötteritz veterinary emergency clinic',
        }).getAttribute('href')).toBe('tel:+4934199991740');
        expect(screen.getByRole('link', {
            name: 'Official Leipzig-Stötteritz emergency information',
        }).getAttribute('href')).toBe('https://notfalltierarzt-leipzig.de/');
        expect(screen.getByRole('link', {
            name: 'Call Leipzig local veterinary duty ring',
        }).getAttribute('href')).toBe('tel:+4934194679466');
        expect(screen.getByRole('link', {
            name: 'Official Leipzig University small-animal emergency guidance',
        }).getAttribute('href')).toBe(
            'https://kleintierklinik.uni-leipzig.de/tierhalter/faq',
        );
        expect(screen.getByRole('link', {
            name: 'Call Leipzig University bird and reptile emergency service',
        }).getAttribute('href')).toBe('tel:+491751956835');
        expect(screen.getByRole('link', {
            name: 'Official Leipzig University bird and reptile emergency guidance',
        }).getAttribute('href')).toBe(
            'https://www.vetmed.uni-leipzig.de/klinik-fuer-voegel-und-reptilien/klinik/dienstleistungen/notdienst',
        );
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Leipzig',
        }).getAttribute('href')).toBe('/vets/leipzig');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official sources on 26 July 2026/i);
        expect(articleText).toMatch(/Monday to Thursday.*19:00.*08:00/i);
        expect(articleText).toMatch(/Friday 19:00.*Monday 08:00/i);
        expect(articleText).toMatch(/telephone registration is required/i);
        expect(articleText).toMatch(/24-hour emergency service.*critically ill/i);
        expect(articleText).toMatch(/current emergency number.*0341 9738711/i);
        expect(articleText).toMatch(/less severe emergencies.*0341 94679466/i);
        expect(articleText).toMatch(/Saturday, Sunday, and public holidays.*09:30.*13:00.*14:00.*17:30/i);
        expect(articleText).toMatch(/only birds and reptiles with life-threatening conditions/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);
        expect(articleText).not.toMatch(/general 24-hour clinic/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-leipzig',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
