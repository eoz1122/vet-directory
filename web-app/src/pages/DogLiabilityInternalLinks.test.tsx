import type { ReactNode } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

import DogTaxGermany from './DogTaxGermany';
import NewPetChecklistGermany from './NewPetChecklistGermany';
import PetInsuranceGermany from './PetInsuranceGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = (page: ReactNode) => render(
    <HelmetProvider>
        <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>,
);

describe('dog liability topic cluster', () => {
    afterEach(cleanup);

    it.each([
        ['pet insurance guide', <PetInsuranceGermany />],
        ['dog tax guide', <DogTaxGermany />],
        ['new-pet checklist', <NewPetChecklistGermany />],
    ])('links to the dedicated liability guide from the %s', (_label, page) => {
        renderPage(page);

        expect(
            screen.getByRole('link', { name: 'Dog liability insurance guide' }).getAttribute('href'),
        ).toBe('/blog/dog-liability-insurance-germany');
    });
});
