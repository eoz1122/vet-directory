import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import VetCostsGermany from './VetCostsGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav aria-label="Table of Contents" /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <VetCostsGermany />
        </MemoryRouter>
    </HelmetProvider>,
);

describe('VetCostsGermany conversion structure', () => {
    it('shows a direct cost summary and periodic review marker', () => {
        renderPage();

        expect(screen.getByRole('heading', {
            level: 2,
            name: '1. Quick answer: what changes the final bill',
        })).toBeTruthy();
        expect(screen.getByText(/GOT 1x base fee of €23\.62 net/i)).toBeTruthy();
        expect(screen.getByText('Published 11 July 2026 · Last verified periodically 15 September 2026')).toBeTruthy();
    });

    it('puts practical cost guides near the top of the page', () => {
        renderPage();

        const navigation = screen.getByRole('navigation', { name: 'Related vet-cost guides' });
        expect(within(navigation).getByRole('link', {
            name: 'Compare pet insurance',
        }).getAttribute('href')).toBe('/blog/pet-insurance-germany');
        expect(within(navigation).getByRole('link', {
            name: 'Prepare for your first vet visit',
        }).getAttribute('href')).toBe('/blog/first-vet-visit-germany');
    });
});
