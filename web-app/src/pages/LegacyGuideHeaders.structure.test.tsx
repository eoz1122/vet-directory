import { render, screen, cleanup } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import MovingWithPetChecklist from './MovingWithPetChecklist';
import PetFriendlyApartments from './PetFriendlyApartments';
import PetGpsTrackerGermany from './PetGpsTrackerGermany';
import RestrictedDogLawsByCountry from './RestrictedDogLawsByCountry';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

afterEach(() => cleanup());

describe('legacy guide headers', () => {
    it.each([
        [MovingWithPetChecklist, /Moving to Germany With a Dog or Cat/i, 'Reviewed periodically. Planning sequence and certificate guidance checked 9 November 2026'],
        [PetFriendlyApartments, /Pet-Friendly Apartments in Berlin/i, 'Reviewed periodically. Last checked September 15, 2026'],
        [PetGpsTrackerGermany, /GPS Trackers for Pets in Germany/i, 'Reviewed periodically. Last checked September 15, 2026'],
        [RestrictedDogLawsByCountry, /Restricted Dog Laws by Country/i, 'Reviewed periodically. Last checked September 15, 2026'],
    ])('uses the shared review marker for %s', (Page, title, review) => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <Page />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(screen.getByRole('heading', { level: 1, name: title })).toBeTruthy();
        expect(screen.getByText(review, { exact: false })).toBeTruthy();
    });
});
