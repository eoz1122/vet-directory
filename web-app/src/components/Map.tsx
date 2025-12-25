import { useEffect } from 'react';
import { Map as GoogleMap, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
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
    'Mainz': { lat: 49.9929, lng: 8.2473 },
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
        } else {
            // Reset to Germany view when "All" is selected
            map.moveCamera({ center: CITY_COORDS['All'], zoom: 6 });
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
                        onClick={() => {
                            onSelectVet(vet);
                        }}
                    >
                        <div className={`relative transition-all duration-300 ${selectedVet?.id === vet.id ? 'scale-125 z-50' : 'scale-100 opacity-90 hover:scale-110 hover:opacity-100 hover:z-40'}`}>
                            {/* Selected Indicator Ring */}
                            {selectedVet?.id === vet.id && (
                                <div className="absolute -inset-2 bg-accent/20 rounded-full animate-ping"></div>
                            )}

                            {/* Paw Icon Marker */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transform transition-colors ${selectedVet?.id === vet.id
                                ? 'bg-accent border-white text-white shadow-accent/40'
                                : 'bg-white border-accent text-accent shadow-black/20'
                                }`}>
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-1.36c.64-.11 1.05-.73.91-1.38-.13-.64-.72-1.04-1.37-.93L12 14.28 10.96 8.54c-.11-.65-.73-1.05-1.38-.91-.64.13-1.04.72-.93 1.37l1.37 7.51-5.75-.41c-.65-.05-1.22.44-1.27 1.09-.05.65.44 1.22 1.09 1.27l5.41.39z M17.34 14.86l1.23-.97c.51-.4.59-1.15.19-1.65-.4-.51-1.15-.59-1.65-.19l-1.23.97-1.42-3.88c-.23-.61-.91-.91-1.52-.68-.61.23-.91.91-.68 1.52l2.08 5.68 2.02 2.02c.46.46 1.21.46 1.67 0 .46-.47.46-1.22-.01-1.67l-1.32-1.32.64.17z" />
                                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M17,13.5c-0.28,0-0.5-0.22-0.5-0.5v-2 c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v2C17.5,13.28,17.28,13.5,17,13.5z M13,13.5c-0.28,0-0.5-0.22-0.5-0.5v-2 c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v2C13.5,13.28,13.28,13.5,13,13.5z M9,13.5c-0.28,0-0.5-0.22-0.5-0.5v-2 c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v2C9.5,13.28,9.28,13.5,9,13.5z M13.5,9.5c0,0.83-0.67,1.5-1.5,1.5 s-1.5-0.67-1.5-1.5S11.17,8,12,8S13.5,8.67,13.5,9.5z M17.5,9.5c0,0.83-0.67,1.5-1.5,1.5S14.5,10.33,14.5,9.5S15.17,8,16,8 S17.5,8.67,17.5,9.5z M8.5,9.5c0,0.83-0.67,1.5-1.5,1.5S5.5,10.33,5.5,9.5S6.17,8,7,8S8.5,8.67,8.5,9.5z" opacity="0" />
                                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M15.5,8c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5 S14,10.33,14,9.5S14.67,8,15.5,8z M11.5,8c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5S10,10.33,10,9.5S10.67,8,11.5,8z M7.5,8 C8.33,8,9,8.67,9,9.5S8.33,11,7.5,11S6,10.33,6,9.5S6.67,8,7.5,8z M13.5,15c-0.28,0-0.5-0.22-0.5-0.5v-1c0-0.28,0.22-0.5,0.5-0.5 s0.5,0.22,0.5,0.5v1C14,14.78,13.78,15,13.5,15z M11.5,15c-0.28,0-0.5-0.22-0.5-0.5v-1c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v1 C12,14.78,11.78,15,11.5,15z M9.5,15c-0.28,0-0.5-0.22-0.5-0.5v-1c0-0.28,0.22-0.5,0.5-0.5s0.5,0.22,0.5,0.5v1 C10,14.78,9.78,15,9.5,15z M11.5,16c-1.3,0-2.4-0.84-2.82-2H8.5v4h6v-4h-0.18C13.9,15.16,12.8,16,11.5,16z" />
                                </svg>
                            </div>
                        </div>
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
