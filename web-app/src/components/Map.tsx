import { useState, useCallback, useEffect } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

interface Vet {
    id: string;
    practice_name: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface MapProps {
    vets: Vet[];
    selectedCity: string;
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
    'Berlin': { lat: 52.5200, lng: 13.4050 },
    'Frankfurt': { lat: 50.1109, lng: 8.6821 },
    'Hamburg': { lat: 53.5511, lng: 9.9937 },
    'All': { lat: 51.1657, lng: 10.4515 }, // Center of Germany
};

export default function AppMap({ vets, selectedCity }: MapProps) {
    // IMPORTANT: This requires a Google Maps API Key in .env file
    // VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
    const center = CITY_COORDS[selectedCity] || CITY_COORDS['All'];
    const zoom = selectedCity === 'All' ? 6 : 12;

    // Filter valid vets
    const validVets = vets.filter(v => v.coordinates.lat !== 0 && v.coordinates.lng !== 0);

    if (!apiKey) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-100 p-8 text-center text-gray-500">
                <div>
                    <p className="font-bold mb-2">Google Maps API Key Missing</p>
                    <p className="text-sm">Please add <code className="bg-gray-200 px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> to your .env file.</p>
                    <br />
                    <p className="text-xs italic">Falling back to basic list view for now.</p>
                </div>
            </div>
        );
    }

    return (
        <APIProvider apiKey={apiKey}>
            <div className="h-full w-full">
                <GoogleMap
                    mapId={'bf9e34e7'} // Example Map ID (Vector style) - can be replaced with real one or left as default
                    defaultCenter={center}
                    defaultZoom={zoom}
                    center={center}
                    zoom={zoom}
                    gestureHandling={'greedy'}
                    disableDefaultUI={false}
                    className="h-full w-full"
                >
                    {validVets.map(vet => (
                        <AdvancedMarker
                            key={vet.id}
                            position={vet.coordinates}
                            onClick={() => setSelectedVet(vet)}
                        >
                            <Pin background={'#FB8500'} glyphColor={'#FFF'} borderColor={'#1B4332'} />
                        </AdvancedMarker>
                    ))}

                    {selectedVet && (
                        <InfoWindow
                            position={selectedVet.coordinates}
                            onCloseClick={() => setSelectedVet(null)}
                        >
                            <div className="p-1">
                                <strong className="text-primary block mb-1">{selectedVet.practice_name}</strong>
                                <p className="text-xs text-gray-600 font-sans">{selectedVet.address}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </APIProvider>
    );
}
