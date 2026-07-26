import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import vetsData from '../data/vets.json';
import type { Vet } from '../types/vet';
import { filterDisplayableVets } from '../utils/activeVets';
import VetAccessReport from './VetAccessReport';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));

describe('VetAccessReport', () => {
    it('explains mapped and community-verified totals together', () => {
        const displayable = filterDisplayableVets(vetsData as Vet[]);
        const verified = displayable.filter((vet) => vet.community_status === 'Verified');

        render(
            <HelmetProvider>
                <MemoryRouter>
                    <VetAccessReport />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(screen.getByText(new RegExp(
            `${displayable.length} mapped practices, including ${verified.length} community-verified listings`,
            'i',
        ))).toBeTruthy();
        expect(screen.getByText('Community verified')).toBeTruthy();
    });
});
