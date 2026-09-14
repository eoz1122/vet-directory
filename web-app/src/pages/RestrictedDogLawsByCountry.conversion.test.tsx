import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import RestrictedDogLawsByCountry from './RestrictedDogLawsByCountry';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav aria-label="Table of Contents" /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <RestrictedDogLawsByCountry />
        </MemoryRouter>
    </HelmetProvider>,
);

describe('RestrictedDogLawsByCountry conversion structure', () => {
    it('shows a clear direct answer and periodic review marker', () => {
        renderPage();

        expect(screen.getByRole('heading', {
            level: 2,
            name: '1. Quick answer: country rules are not interchangeable',
        })).toBeTruthy();
        expect(screen.getByText(/There is no single global banned-breed list/i)).toBeTruthy();
        expect(screen.getByText('Last verified periodically: 14 September 2026')).toBeTruthy();
        expect(screen.getByRole('heading', {
            level: 2,
            name: '2. Start with the destination and every transit country',
        })).toBeTruthy();
    });

    it('puts related restricted-dog guides near the top of the page', () => {
        renderPage();

        const navigation = screen.getByRole('navigation', { name: 'Related restricted-dog guides' });
        expect(within(navigation).getByRole('link', {
            name: 'Banned dog breeds in Germany',
        }).getAttribute('href')).toBe('/blog/breed-restrictions-germany');
        expect(within(navigation).getByRole('link', {
            name: 'Moving to Germany with a restricted dog',
        }).getAttribute('href')).toBe('/blog/moving-to-germany-with-restricted-dog');
    });
});
