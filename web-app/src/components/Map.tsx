import { useEffect } from 'react';
import { Map as GoogleMap, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { appendUTM } from '../utils/url';
import type { Vet } from '../types/vet';

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
    'Stuttgart': { lat: 48.7758, lng: 9.1829 },
    'Munich': { lat: 48.1351, lng: 11.5820 },
    'All': { lat: 51.1657, lng: 10.4515 }, // Center of Germany
};

// Component to handle camera updates
function CameraUpdater({ selectedCity, vets, selectedVet }: { selectedCity: string, vets: Vet[], selectedVet: Vet | null }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Priority 1: Selected Vet
        if (selectedVet && selectedVet.coordinates.lat !== 0) {
            map.panTo(selectedVet.coordinates);
            map.setZoom(15);
            return;
        }

        // Priority 2: City Selection
        if (selectedCity !== 'All') {
            const target = CITY_COORDS[selectedCity];
            if (target) {
                map.moveCamera({ center: target, zoom: 12 });
            }
        } else if (vets.length > 0 && vets.length < 90) {
            // Priority 3: Filtered List
            map.moveCamera({ center: vets[0].coordinates, zoom: 13 });
        }

    }, [selectedCity, map, vets, selectedVet]);

    return null;
}

export default function AppMap({ vets, selectedCity, selectedVet, onSelectVet }: MapProps) {
    const defaultCenter = CITY_COORDS['All'];
    const defaultZoom = 6;

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
                onClick={() => onSelectVet(null)}
            >
                <CameraUpdater selectedCity={selectedCity} vets={validVets} selectedVet={selectedVet} />

                {validVets.map(vet => (
                    <AdvancedMarker
                        key={vet.id}
                        position={vet.coordinates}
                        onClick={(e) => {
                            e.stop();
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
                        <div className="p-2 min-w-[200px] max-w-[280px] font-sans">
                            <h3 className="text-primary font-bold text-sm mb-1 leading-tight border-b border-gray-100 pb-1.5">
                                {selectedVet.practice_name}
                            </h3>

                            <div className="flex flex-wrap gap-1.5 my-2">
                                <span className="px-1.5 py-0.5 bg-secondary text-primary text-[9px] font-bold uppercase tracking-wider rounded">
                                    {selectedVet.city}
                                </span>
                                {selectedVet.verification.english_signals.length > 0 && (
                                    <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[9px] font-bold rounded border border-green-100 flex items-center gap-1">
                                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        English Verified
                                    </span>
                                )}
                            </div>

                            <p className="text-[11px] text-gray-500 mb-2 leading-snug">
                                {selectedVet.address}
                            </p>

                            {selectedVet.contact.phone && (
                                <p className="text-[11px] text-primary/70 mb-3 flex items-center gap-1">
                                    <span className="opacity-50">📞</span> {selectedVet.contact.phone}
                                </p>
                            )}

                            <div className="flex gap-2 pt-1">
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedVet.coordinates.lat},${selectedVet.coordinates.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 text-center py-2 bg-accent text-white text-[10px] font-bold rounded-lg hover:bg-accent/90 transition-all shadow-sm"
                                >
                                    GET DIRECTIONS
                                </a>
                                {selectedVet.contact.website && (
                                    <a
                                        href={appendUTM(selectedVet.contact.website)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 text-center py-2 bg-primary text-secondary text-[10px] font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm"
                                    >
                                        WEBSITE
                                    </a>
                                )}
                            </div>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
}
