import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import PetFoodGermany from './PetFoodGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <PetFoodGermany />
        </MemoryRouter>
    </HelmetProvider>,
);

const getMetaContent = (name: string) =>
    document.querySelector(`meta[name="${name}"]`)?.getAttribute('content');

describe('PetFoodGermany conversion structure', () => {
    it('presents a stronger search promise and a scannable comparison path', () => {
        renderPage();

        expect(document.title).toBe('Best Dog Food in Germany (2026): How to Choose, Labels & Prices');
        expect(getMetaContent('description')).toBe(
            'Find the best dog food in Germany for your dog: compare complete-food labels, dry and wet formats, prices, manufacturer checks and raw-diet risks.',
        );
        expect(screen.getByText('Reviewed periodically. Last checked September 12, 2026', { exact: false })).toBeTruthy();
        expect(screen.getByRole('table', { name: 'Dog food format comparison' })).toBeTruthy();
        expect(screen.getByRole('columnheader', { name: 'Best for' })).toBeTruthy();
    });

    it('adds a compact internal guide path near the top of the article', () => {
        renderPage();

        expect(screen.getByRole('navigation', { name: 'Related dog-care guides' })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Vet costs' }).getAttribute('href')).toBe('/blog/vet-costs-germany');
        expect(screen.getByRole('link', { name: 'Pet insurance' }).getAttribute('href')).toBe('/blog/pet-insurance-germany');
        expect(screen.getByRole('link', { name: 'First vet visit' }).getAttribute('href')).toBe('/blog/first-vet-visit-germany');
    });
});
