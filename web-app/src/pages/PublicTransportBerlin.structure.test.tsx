import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import PublicTransportBerlin from './PublicTransportBerlin';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

describe('PublicTransportBerlin guide structure', () => {
    it('uses the shared guide header and periodic review marker', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <PublicTransportBerlin />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(screen.getByRole('heading', { level: 1, name: /Public Transport with Dogs in Berlin/i })).toBeTruthy();
        expect(screen.getByText('Reviewed periodically. Last checked September 15, 2026', { exact: false })).toBeTruthy();
    });

    it('adds a disclosed Hund unterwegs travel-supplies option', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <PublicTransportBerlin />
                </MemoryRouter>
            </HelmetProvider>,
        );

        const callout = screen.getByRole('region', {
            name: 'Sponsored Hund unterwegs transport option',
        });
        const link = screen.getByRole('link', { name: 'Browse dog travel supplies' });
        const url = new URL(link.getAttribute('href') || '');

        expect(url.hostname).toBe('www.awin1.com');
        expect(url.searchParams.get('awinmid')).toBe('22115');
        expect(url.searchParams.get('awinaffid')).toBe('2707844');
        expect(url.searchParams.get('clickref')).toBe('hund_unterwegs_transport_guide');
        expect(url.searchParams.get('ued')).toBe('https://hund-unterwegs.de/');
        expect(link.getAttribute('rel')).toContain('sponsored');
        expect(callout.textContent).toMatch(/advertising link/i);
    });
});
