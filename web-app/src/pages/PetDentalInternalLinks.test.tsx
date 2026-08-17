import type { ReactNode } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import FirstVetVisitGermany from './FirstVetVisitGermany';
import PetInsuranceGermany from './PetInsuranceGermany';
import VetCostsGermany from './VetCostsGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));
vi.mock('../components/AffiliateCallout', () => ({ default: () => null }));

const renderPage = (page: ReactNode) => render(
    <HelmetProvider>
        <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>,
);

describe('pet dental care topic cluster', () => {
    afterEach(cleanup);

    it.each([
        ['vet costs guide', <VetCostsGermany />, 'Dental cost and GOT fee guide'],
        ['first vet visit guide', <FirstVetVisitGermany />, 'Dental care costs and appointment guide'],
        ['pet insurance guide', <PetInsuranceGermany />, 'Dental costs and insurance exclusions guide'],
    ])('links to the dental guide from the %s', (_label, page, linkName) => {
        renderPage(page);

        expect(screen.getByRole('link', { name: linkName }).getAttribute('href')).toBe(
            '/blog/pet-dental-care-germany',
        );
    });
});
