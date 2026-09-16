import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import GermanVetPhrases from './GermanVetPhrases';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

describe('GermanVetPhrases guide structure', () => {
    it('uses the shared guide header and periodic review marker', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <GermanVetPhrases />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(screen.getByRole('heading', { level: 1, name: /German Vet Survival Kit/i })).toBeTruthy();
        expect(screen.getByText('Reviewed periodically. Last checked September 15, 2026', { exact: false })).toBeTruthy();
    });
});
