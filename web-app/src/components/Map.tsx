import { useEffect } from 'react';
import { Map as GoogleMap, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';

interface Vet {
    id: string;
    practice_name: string;
    city: string;
    district: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    contact: {
        website: string | null;
        phone: string | null;
    };
    verification: {
        english_signals: string[];
    };
}

interface MapProps {
    vets: Vet[];
    selectedCity: string;
    selectedVet: Vet | null;
    onSelectVet: (vet: Vet | null) => void;
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
    'Berlin': { lat: 52.5200, lng: 13.4050 },
    'Frankfurt': { lat: 50.1109, lng: 8.6821 },
    'Hamburg': { lat: 53.5511, lng: 9.9937 },
    'All': { lat: 51.1657, lng: 10.4515 }, // Center of Germany
};

// Component to handle camera updates
function CameraUpdater({ selectedCity, vets, selectedVet }: { selectedCity: string, vets: Vet[], selectedVet: Vet | null }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Priority 1: Selected Vet (from list click or map click)
        if (selectedVet && selectedVet.coordinates.lat !== 0) {
            map.panTo(selectedVet.coordinates);
            map.setZoom(15);
            return;
        }

        // Priority 2: City Selection
        if (selectedCity !== 'All') {
            const target = CITY_COORDS[selectedCity];
            map.moveCamera({ center: target, zoom: 12 });
        } else if (vets.length > 0 && vets.length < 90) {
            // Priority 3: Filtered List (Search results)
            map.moveCamera({ center: vets[0].coordinates, zoom: 13 });
        }

    }, [selectedCity, map, vets, selectedVet]); // Add selectedVet to dependency

    return null;
}

export default function AppMap({ vets, selectedCity, selectedVet, onSelectVet }: MapProps) {
    // Initial default (only used on first load)
    const defaultCenter = CITY_COORDS['All'];
    const defaultZoom = 6;

    // Filter valid vets
    const validVets = vets.filter(v => v.coordinates.lat !== 0 && v.coordinates.lng !== 0);

    return (
        <div className="h-full w-full">
            <GoogleMap
                mapId={'bf9e34e7'}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                className="h-full w-full"
                onClick={() => onSelectVet(null)} // Click map to deselect
            >
                <CameraUpdater selectedCity={selectedCity} vets={validVets} selectedVet={selectedVet} />

                {validVets.map(vet => (
                    <AdvancedMarker
                        key={vet.id}
                        position={vet.coordinates}
                        onClick={(e) => {
                            e.stop(); // Prevent map click
                            onSelectVet(vet);
                        }}
                    >
                        <Pin
                            background={selectedVet?.id === vet.id ? '#FB8500' : '#1B4332'}
                            glyphColor={'#FFF'}
                            borderColor={'#FFFFFF'}
                            scale={selectedVet?.id === vet.id ? 1.2 : 1}
                        />
                    </AdvancedMarker>
                ))}

                {selectedVet && selectedVet.coordinates.lat !== 0 && (
                    <InfoWindow
                        position={selectedVet.coordinates}
                        onCloseClick={() => onSelectVet(null)}
                    >
                        <div className="p-1">
                            <strong className="text-primary block mb-1 text-sm">{selectedVet.practice_name}</strong>
                            <p className="text-xs text-gray-600 font-sans mb-2 leading-tight">{selectedVet.address}</p>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedVet.coordinates.lat},${selectedVet.coordinates.lng}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full text-center px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-md hover:bg-accent/90 transition-colors shadow-sm"
                            >
                                Get Directions
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}
