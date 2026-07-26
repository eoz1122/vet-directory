import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import PlaceAutocomplete from './PlaceAutocomplete';

const mapsLibraryMock = vi.hoisted(() => vi.fn());

vi.mock('@vis.gl/react-google-maps', () => ({
    useMapsLibrary: mapsLibraryMock,
}));

describe('PlaceAutocomplete accessibility', () => {
    beforeEach(() => {
        mapsLibraryMock.mockReset();
        mapsLibraryMock.mockReturnValue(null);
    });

    it('labels both active and unavailable location fields', () => {
        const { rerender } = render(<PlaceAutocomplete onPlaceSelect={vi.fn()} />);
        expect(screen.getByRole('textbox', { name: 'Search by location' })).toBeTruthy();

        rerender(<PlaceAutocomplete onPlaceSelect={vi.fn()} apiError />);
        expect(screen.getByRole('textbox', { name: 'Search by location' })).toBeTruthy();
    });

    it('uses named 44 pixel controls and an inline geolocation error', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
        render(<PlaceAutocomplete onPlaceSelect={vi.fn()} />);

        const input = screen.getByRole('textbox', { name: 'Search by location' });
        fireEvent.change(input, { target: { value: 'Berlin' } });

        const clearButton = screen.getByRole('button', { name: 'Clear location search' });
        const gpsButton = screen.getByRole('button', { name: 'Use my current location' });
        expect(clearButton.className).toContain('min-h-11');
        expect(gpsButton.className).toContain('min-h-11');

        fireEvent.click(gpsButton);
        expect(screen.getByRole('alert').textContent).toContain(
            'Location is not supported by this browser.',
        );
        expect(alertSpy).not.toHaveBeenCalled();
    });

    it('uses the new accessible Places widget restricted to Germany', async () => {
        const widget = document.createElement('div') as HTMLDivElement & {
            description?: string;
            includedRegionCodes?: string[];
            placeholder?: string;
            value?: string;
        };
        const PlaceAutocompleteElement = vi.fn(function placeAutocompleteElement() {
            return widget;
        });
        mapsLibraryMock.mockImplementation((name: string) => (
            name === 'places' ? { PlaceAutocompleteElement } : null
        ));

        render(<PlaceAutocomplete onPlaceSelect={vi.fn()} />);

        await waitFor(() => {
            expect(PlaceAutocompleteElement).toHaveBeenCalledTimes(1);
        });
        expect(PlaceAutocompleteElement).toHaveBeenCalledWith({
            includedRegionCodes: ['de'],
        });
        expect(widget.description).toBe('Search by location');
        expect(widget.placeholder).toBe('Search by city, zip, or street...');
        expect(widget.getAttribute('aria-label')).toBe('Search by location');
    });
});
