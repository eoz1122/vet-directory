import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import CatFoodGermany from './CatFoodGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav aria-label="Table of Contents" /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <CatFoodGermany />
        </MemoryRouter>
    </HelmetProvider>,
);

describe('CatFoodGermany conversion structure', () => {
    it('shows an immediate cat-food choice summary and comparison table', () => {
        renderPage();

        expect(screen.getByRole('heading', {
            level: 2,
            name: 'Quick answer: how to choose cat food',
        })).toBeTruthy();
        expect(screen.getByText(/Complete food for the correct life stage/i)).toBeTruthy();
        expect(screen.getByRole('table', { name: 'Cat food format comparison' })).toBeTruthy();
        expect(screen.getByRole('columnheader', { name: 'Best for' })).toBeTruthy();
        expect(screen.getByText('Reviewed periodically. Last checked September 15, 2026', { exact: false })).toBeTruthy();
    });

    it('adds a compact internal guide path near the top of the article', () => {
        renderPage();

        const navigation = screen.getByRole('navigation', { name: 'Related cat-care guides' });
        expect(within(navigation).getByRole('link', { name: 'Vet costs' }).getAttribute('href'))
            .toBe('/blog/vet-costs-germany');
        expect(within(navigation).getByRole('link', { name: 'Pet insurance' }).getAttribute('href'))
            .toBe('/blog/pet-insurance-germany');
        expect(within(navigation).getByRole('link', { name: 'First vet visit' }).getAttribute('href'))
            .toBe('/blog/first-vet-visit-germany');
    });

    it('keeps the purchase disclosure visible without making it the main visual block', () => {
        renderPage();

        const disclosure = screen.getByRole('region', { name: 'Commercial disclosure' });
        expect(disclosure.className).toContain('bg-secondary/40');
        expect(within(disclosure).getByText(/not independently laboratory-tested/i)).toBeTruthy();
        expect(within(disclosure).getByRole('link', { name: 'Zooplus cat-food affiliate link' })).toBeTruthy();
    });
});
