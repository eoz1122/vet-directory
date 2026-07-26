import type { ReactNode } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import vetsData from '../data/vets.json';
import type { Vet } from '../types/vet';
import { filterDisplayableVets } from '../utils/activeVets';
import { slugify } from '../utils/url';
import Home from './Home';

vi.mock('@vis.gl/react-google-maps', () => ({
    APIProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock('../components/Map', () => ({ default: () => null }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/vet/VetCard', () => ({ VetCard: () => null }));
vi.mock('../components/vet/VetFilters', () => ({ VetFilters: () => null }));
vi.mock('../components/ui/Pagination', () => ({ Pagination: () => null }));

describe('Home WebSite structured data', () => {
    beforeEach(() => {
        HTMLElement.prototype.scrollTo = vi.fn();
    });

    it('keeps site identity without advertising the retired sitelinks search box', async () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Home />
                </MemoryRouter>
            </HelmetProvider>,
        );

        await waitFor(() => {
            expect(document.head.querySelector('script[type="application/ld+json"]')).toBeTruthy();
        });

        const schemas = Array.from(
            document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
        ).flatMap((script) => {
            const parsed = JSON.parse(script.textContent || 'null');
            return Array.isArray(parsed) ? parsed : [parsed];
        });
        const websiteSchema = schemas.find((schema) => schema?.['@type'] === 'WebSite');

        expect(websiteSchema).toEqual({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'The Pack: English-Speaking Vets',
            url: 'https://englishspeakinggermany.online',
        });
    });

    it('exposes the directory as the main landmark with readable small-text styles', async () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Home />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(await screen.findByRole('main')).toBeTruthy();
        expect(screen.getByText('Vets').className).toContain('text-accent-ink');
        expect(screen.getByText('Practices available').className).toContain('text-primary/80');
        expect(screen.getByText('of').className).toContain('text-primary/70');
        const mobileHomeLink = screen.getByRole('link', { name: 'Directory home' });
        expect(mobileHomeLink.closest('nav')?.className).toContain('text-secondary');
        expect(mobileHomeLink.className).toContain('min-h-11');
    });

    it('targets English-speaking vet searches with city paths and transparent trust copy', async () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Home />
                </MemoryRouter>
            </HelmetProvider>,
        );

        await waitFor(() => {
            expect(document.title).toBe(
                'English-Speaking Vets in Germany | Find Local Care',
            );
            expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
                'Find community-verified English-speaking vets in Germany. Browse local practices in Berlin, Hamburg, Munich, Frankfurt, Cologne and 30+ cities.',
            );
        });

        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Find an English-Speaking Vet in Germany',
        })).toBeTruthy();
        expect(screen.getByText(/confirm English availability when booking/i)).toBeTruthy();
        expect(screen.getByRole('link', { name: 'How we verify listings' }).getAttribute('href'))
            .toBe('/quality-promise');

        const cityPaths = [
            ['English-speaking vets in Berlin', '/vets/berlin'],
            ['English-speaking vets in Hamburg', '/vets/hamburg'],
            ['English-speaking vets in Munich', '/vets/munich'],
            ['English-speaking vets in Frankfurt', '/vets/frankfurt'],
            ['English-speaking vets in Cologne', '/vets/cologne'],
        ];
        const popularCitiesNav = screen.getByRole('navigation', {
            name: 'Popular city directories',
        });
        for (const [name, href] of cityPaths) {
            expect(within(popularCitiesNav).getByRole('link', { name }).getAttribute('href'))
                .toBe(href);
        }
    });

    it('uses a descriptive Berlin housing anchor for the apartments guide', () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Home />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(screen.getByRole('link', {
            name: 'Pet-Friendly Apartments Berlin',
        }).getAttribute('href')).toBe('/blog/pet-friendly-apartments-germany');
    });

    it('exposes every verified city as a crawlable, alphabetized directory link', () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Home />
                </MemoryRouter>
            </HelmetProvider>,
        );

        const expectedCities = Array.from(new Set(
            filterDisplayableVets(vetsData as Vet[])
                .filter((vet) => vet.community_status === 'Verified')
                .map((vet) => vet.city),
        )).sort((left, right) => left.localeCompare(right, 'en'));
        const allCitiesNav = screen.getByRole('navigation', {
            name: 'All city directories',
        });
        const cityLinks = within(allCitiesNav).getAllByRole('link');

        expect(cityLinks).toHaveLength(expectedCities.length);
        expect(cityLinks.map((link) => link.textContent)).toEqual(expectedCities);

        for (const city of expectedCities) {
            expect(within(allCitiesNav).getByRole('link', {
                name: `English-speaking vets in ${city}`,
            }).getAttribute('href')).toBe(`/vets/${slugify(city)}`);
        }
    });

    it('routes homepage authority to the practical vet cost guide', () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Home />
                </MemoryRouter>
            </HelmetProvider>,
        );

        const vetCostLink = screen.getByRole('link', { name: /Vet Costs & GOT Fees/ });

        expect(vetCostLink.getAttribute('href')).toBe('/blog/vet-costs-germany');
        expect(vetCostLink.className).toContain('min-h-11');
    });
});
