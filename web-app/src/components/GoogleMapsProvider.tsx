import type { ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

interface GoogleMapsProviderProps {
    apiKey: string;
    onError: () => void;
    children: ReactNode;
}

export default function GoogleMapsProvider({ apiKey, onError, children }: GoogleMapsProviderProps) {
    return (
        <APIProvider apiKey={apiKey} language="en" onError={onError}>
            {children}
        </APIProvider>
    );
}
