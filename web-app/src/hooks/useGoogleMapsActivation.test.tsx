import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useGoogleMapsActivation } from './useGoogleMapsActivation';

function mockMatchMedia(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: vi.fn().mockReturnValue({
            matches,
            media: '(min-width: 768px)',
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }),
    });
}

describe('useGoogleMapsActivation', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('does not load Google Maps initially on mobile, but allows explicit activation', () => {
        mockMatchMedia(false);

        const { result } = renderHook(() => useGoogleMapsActivation());

        expect(result.current.mapsEnabled).toBe(false);
        expect(result.current.desktopMapVisible).toBe(false);
        act(() => result.current.enableMaps());
        expect(result.current.mapsEnabled).toBe(true);
        expect(result.current.desktopMapVisible).toBe(false);
    });

    it('loads Google Maps immediately when the desktop map is visible', () => {
        mockMatchMedia(true);

        const { result } = renderHook(() => useGoogleMapsActivation());

        expect(result.current.mapsEnabled).toBe(true);
        expect(result.current.desktopMapVisible).toBe(true);
    });
});
