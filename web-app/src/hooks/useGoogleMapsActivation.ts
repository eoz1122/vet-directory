import { useCallback, useEffect, useState } from 'react';

const DESKTOP_MAP_QUERY = '(min-width: 768px)';

function shouldEnableMapsInitially() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return true;
    }

    return window.matchMedia(DESKTOP_MAP_QUERY).matches;
}

export function useGoogleMapsActivation() {
    const [desktopMapVisible, setDesktopMapVisible] = useState(shouldEnableMapsInitially);
    const [mapsEnabled, setMapsEnabled] = useState(shouldEnableMapsInitially);

    useEffect(() => {
        if (typeof window.matchMedia !== 'function') return;

        const desktopQuery = window.matchMedia(DESKTOP_MAP_QUERY);
        const enableOnDesktop = (event: MediaQueryListEvent) => {
            setDesktopMapVisible(event.matches);
            if (event.matches) setMapsEnabled(true);
        };

        desktopQuery.addEventListener('change', enableOnDesktop);
        return () => desktopQuery.removeEventListener('change', enableOnDesktop);
    }, []);

    const enableMaps = useCallback(() => setMapsEnabled(true), []);

    return { mapsEnabled, desktopMapVisible, enableMaps };
}
