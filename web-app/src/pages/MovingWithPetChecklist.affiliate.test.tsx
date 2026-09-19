import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import MovingWithPetChecklist from './MovingWithPetChecklist';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

describe('Moving with pets affiliate placement', () => {
    it('adds a disclosed Hund unterwegs option after the practical moving checklist', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <MovingWithPetChecklist />
                </MemoryRouter>
            </HelmetProvider>,
        );

        const callout = screen.getByRole('region', {
            name: 'Sponsored Hund unterwegs dog-supplies option',
        });
        expect(within(callout).getByText(/not a ranking or endorsement/i)).toBeTruthy();

        const link = within(callout).getByRole('link', {
            name: 'Browse Hund unterwegs dog supplies',
        });
        const url = new URL(link.getAttribute('href') || '');
        expect(url.hostname).toBe('www.awin1.com');
        expect(url.searchParams.get('awinmid')).toBe('22115');
        expect(url.searchParams.get('awinaffid')).toBe('2707844');
        expect(url.searchParams.get('clickref')).toBe('hund_unterwegs_moving_guide');
        expect(url.searchParams.get('ued')).toBe('https://hund-unterwegs.de/');
        expect(link.getAttribute('rel')).toContain('sponsored');
    });
});
