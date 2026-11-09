import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AppMap from './Map';
import type { Vet } from '../types/vet';

vi.mock('@vis.gl/react-google-maps', () => ({
    Map: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    AdvancedMarker: ({ title }: { title?: string }) => <button aria-label={title} />,
    InfoWindow: () => null,
    useMap: () => null,
}));

describe('map marker accessibility', () => {
    it('names each practice marker for keyboard and screen-reader users', () => {
        const vet = { id: 'test', practice_name: 'Example Practice', city: 'Berlin', coordinates: { lat: 52, lng: 13 } } as Vet;
        render(<AppMap vets={[vet]} selectedCity="Berlin" selectedVet={null} onSelectVet={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Example Practice, Berlin' })).toBeTruthy();
    });
});
