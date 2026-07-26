import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { Vet } from '../../types/vet';
import { CityVetFinder } from './CityVetFinder';

vi.mock('./VetCard', () => ({
    VetCard: ({ vet }: { vet: Vet }) => (
        <article>
            <h3>{vet.practice_name}</h3>
        </article>
    ),
}));

const berlinVets: Vet[] = [
    {
        id: 'official-mitte',
        practice_name: 'Alexanderplatz Animal Clinic',
        city: 'Berlin',
        district: 'Mitte',
        address: 'Alexanderplatz 1, 10178 Berlin',
        coordinates: { lat: 52.5219, lng: 13.4132 },
        contact: {
            website: 'https://official.example',
            phone: '+49 30 111111',
            google_maps: null,
        },
        verification: {
            status: 'Verified',
            last_scanned: '2026-07-20',
            english_signals: ['English is spoken by the veterinary team'],
            evidence_type: 'official_website',
            emergency_services: '',
        },
        community_status: 'Verified',
    },
    {
        id: 'community-kreuzberg',
        practice_name: 'Kreuzberg Emergency Vets',
        city: 'Berlin',
        district: 'Kreuzberg',
        address: 'Mehringdamm 20, 10961 Berlin',
        coordinates: { lat: 52.4934, lng: 13.3882 },
        contact: {
            website: 'https://community.example',
            phone: '+49 30 222222',
            google_maps: null,
        },
        verification: {
            status: 'Verified',
            last_scanned: '2026-07-21',
            english_signals: ['Confirmed via community review: English-speaking vet'],
            evidence_type: 'community',
            emergency_services: '24/7',
        },
        community_status: 'Verified',
    },
    {
        id: 'government-pankow',
        practice_name: 'Pankow Pet Practice',
        city: 'Berlin',
        district: 'Pankow',
        address: 'Breite Straße 10, 13187 Berlin',
        coordinates: { lat: 52.5694, lng: 13.4026 },
        contact: {
            website: 'https://government.example',
            phone: '+49 30 333333',
            google_maps: null,
        },
        verification: {
            status: 'Verified',
            last_scanned: '2026-07-22',
            english_signals: ['English listed by a government veterinary source'],
            evidence_type: 'government_source',
            emergency_services: '',
        },
        community_status: 'Verified',
    },
];

function getResults() {
    return screen.getByRole('region', { name: 'Berlin vet results' });
}

describe('CityVetFinder', () => {
    it('shows every city listing initially and exposes an accessible result count', () => {
        render(<CityVetFinder city="Berlin" vets={berlinVets} />);

        expect(within(getResults()).getAllByRole('article')).toHaveLength(3);
        expect(screen.getByText('3 practices shown')).toBeTruthy();
        expect(screen.getByRole('searchbox', { name: 'Search Berlin vets' })).toBeTruthy();
    });

    it('searches practice names, addresses and districts without case sensitivity', () => {
        render(<CityVetFinder city="Berlin" vets={berlinVets} />);

        const search = screen.getByRole('searchbox', { name: 'Search Berlin vets' });

        fireEvent.change(search, { target: { value: 'ALEXANDERPLATZ' } });
        expect(within(getResults()).getAllByRole('article')).toHaveLength(1);
        expect(screen.getByText('Alexanderplatz Animal Clinic')).toBeTruthy();

        fireEvent.change(search, { target: { value: 'mehringdamm' } });
        expect(screen.getByText('Kreuzberg Emergency Vets')).toBeTruthy();

        fireEvent.change(search, { target: { value: 'pankow' } });
        expect(screen.getByText('Pankow Pet Practice')).toBeTruthy();
    });

    it('filters by district, 24-hour emergency service and evidence source', () => {
        render(<CityVetFinder city="Berlin" vets={berlinVets} />);

        fireEvent.change(screen.getByRole('combobox', { name: 'Filter by district' }), {
            target: { value: 'Kreuzberg' },
        });
        expect(within(getResults()).getAllByRole('article')).toHaveLength(1);
        expect(screen.getByText('Kreuzberg Emergency Vets')).toBeTruthy();

        fireEvent.click(screen.getByRole('button', {
            name: 'Show only 24-hour emergency practices',
        }));
        expect(screen.getByRole('button', {
            name: 'Show all emergency availability',
        }).getAttribute('aria-pressed')).toBe('true');

        fireEvent.change(screen.getByRole('combobox', { name: 'Filter by evidence source' }), {
            target: { value: 'official_website' },
        });
        expect(within(getResults()).queryAllByRole('article')).toHaveLength(0);
        expect(screen.getByText('No practices match these filters.')).toBeTruthy();
    });

    it('resets every active filter in one action', () => {
        render(<CityVetFinder city="Berlin" vets={berlinVets} />);

        fireEvent.change(screen.getByRole('searchbox', { name: 'Search Berlin vets' }), {
            target: { value: 'emergency' },
        });
        fireEvent.change(screen.getByRole('combobox', { name: 'Filter by district' }), {
            target: { value: 'Kreuzberg' },
        });
        fireEvent.click(screen.getByRole('button', {
            name: 'Show only 24-hour emergency practices',
        }));

        fireEvent.click(screen.getByRole('button', { name: 'Reset vet filters' }));

        expect(
            (screen.getByRole('searchbox', { name: 'Search Berlin vets' }) as HTMLInputElement).value,
        ).toBe('');
        expect(
            (screen.getByRole('combobox', { name: 'Filter by district' }) as HTMLSelectElement).value,
        ).toBe('all');
        expect(
            (screen.getByRole('combobox', { name: 'Filter by evidence source' }) as HTMLSelectElement).value,
        ).toBe('all');
        expect(within(getResults()).getAllByRole('article')).toHaveLength(3);
        expect(screen.getByText('3 practices shown')).toBeTruthy();
    });
});
