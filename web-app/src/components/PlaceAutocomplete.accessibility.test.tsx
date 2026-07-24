import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PlaceAutocomplete from './PlaceAutocomplete';

vi.mock('@vis.gl/react-google-maps', () => ({
    useMapsLibrary: () => null,
}));

describe('PlaceAutocomplete accessibility', () => {
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
});
