import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import BreedRestrictionsGermany from './BreedRestrictionsGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav aria-label="Table of Contents" /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <BreedRestrictionsGermany />
        </MemoryRouter>
    </HelmetProvider>,
);

const getMetaContent = (name: string) =>
    document.querySelector(`meta[name="${name}"]`)?.getAttribute('content');

describe('BreedRestrictionsGermany conversion structure', () => {
    it('matches high-intent banned-breed searches with clear metadata and a direct answer', () => {
        renderPage();

        expect(document.title).toBe(
            'Banned Dog Breeds in Germany (2026): Pit Bull, Rottweiler & State Rules',
        );
        expect(getMetaContent('description')).toBe(
            'Which dog breeds are banned in Germany? Check Pit Bull and Rottweiler rules, federal import restrictions, state permits, exceptions and official sources.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Banned Dog Breeds in Germany: Pit Bull, Rottweiler and State Rules',
        })).toBeTruthy();
        expect(screen.getByText('Last verified periodically: 12 September 2026')).toBeTruthy();
        expect(screen.getByRole('heading', {
            level: 2,
            name: '1. Quick answer: import vs keeping',
        })).toBeTruthy();
        expect(screen.getByText(/Rottweiler.*not one of the four federal import breeds/i)).toBeTruthy();
    });

    it('puts the two next restricted-dog guides near the top of the page', () => {
        renderPage();

        const navigation = screen.getByRole('navigation', { name: 'Related restricted-dog guides' });
        expect(navigation).toBeTruthy();
        expect(navigation.querySelector('a[href="/blog/moving-to-germany-with-restricted-dog"]'))
            .toBeTruthy();
        expect(navigation.querySelector('a[href="/blog/restricted-dog-laws-by-country"]'))
            .toBeTruthy();
        expect(within(navigation).getByRole('link', {
            name: 'Moving to Germany with a restricted dog',
        }).getAttribute('href')).toBe('/blog/moving-to-germany-with-restricted-dog');
        expect(within(navigation).getByRole('link', {
            name: 'Compare restricted-dog laws by country',
        }).getAttribute('href')).toBe('/blog/restricted-dog-laws-by-country');
    });
});
