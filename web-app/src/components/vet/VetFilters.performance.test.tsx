import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { VetFilters } from './VetFilters';

vi.mock('../PlaceAutocomplete', () => ({
    default: () => <div>SDK location search</div>,
}));

const baseProps = {
    vets: [],
    selectedCity: 'All',
    setSelectedCity: vi.fn(),
    searchTerm: '',
    setSearchTerm: vi.fn(),
    showVerifiedOnly: true,
    setShowVerifiedOnly: vi.fn(),
    showMobileOnly: false,
    setShowMobileOnly: vi.fn(),
    showEmergencyOnly: false,
    setShowEmergencyOnly: vi.fn(),
    userLocation: null,
    setUserLocation: vi.fn(),
    searchRadius: null,
    setSearchRadius: vi.fn(),
    onPlaceSelect: vi.fn(),
    onResetPagination: vi.fn(),
    mapApiError: false,
};

describe('VetFilters map loading', () => {
    it('uses an activation control instead of mounting the Maps SDK on mobile', () => {
        const onEnableMaps = vi.fn();

        render(
            <VetFilters
                {...baseProps}
                mapsEnabled={false}
                onEnableMaps={onEnableMaps}
            />,
        );

        expect(screen.queryByText('SDK location search')).toBeNull();
        fireEvent.click(screen.getByRole('button', { name: 'Activate location search' }));
        expect(onEnableMaps).toHaveBeenCalledOnce();
    });

    it('mounts the Maps-backed location search after activation', async () => {
        render(
            <VetFilters
                {...baseProps}
                mapsEnabled
                onEnableMaps={vi.fn()}
            />,
        );

        expect(await screen.findByText('SDK location search')).toBeTruthy();
    });

    it('uses readable contrast for mobile filter labels', () => {
        render(
            <VetFilters
                {...baseProps}
                mapsEnabled={false}
                onEnableMaps={vi.fn()}
            />,
        );

        expect(screen.getByText('Where to look?').className).toContain('text-primary/80');
        expect(screen.getByText('🔍 Refine results').parentElement?.className).toContain('text-primary/80');
        expect(screen.getByRole('button', { name: 'Activate location search' }).className).toContain('text-primary/70');
    });
});
