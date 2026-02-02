import { useRef, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface Props {
    onPlaceSelect: (location: { lat: number; lng: number } | null, address: string) => void;
}

export default function PlaceAutocomplete({ onPlaceSelect }: Props) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const geocodingLib = useMapsLibrary('geocoding');
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['geometry', 'name', 'formatted_address'],
            componentRestrictions: { country: 'de' }, // Restrict to Germany
        };

        setAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!autocomplete) return;

        const listener = autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const position = place.geometry?.location;

            if (position) {
                onPlaceSelect(
                    { lat: position.lat(), lng: position.lng() },
                    inputRef.current?.value || ''
                );
            }
        });

        return () => {
            google.maps.event.removeListener(listener);
        };
    }, [autocomplete, onPlaceSelect]);

    const handleClear = () => {
        setInputValue('');
        onPlaceSelect(null, '');
        if (inputRef.current) inputRef.current.focus();
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Reverse geocode to get address text
                if (geocodingLib) {
                    const geocoder = new geocodingLib.Geocoder();
                    geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
                        if (status === 'OK' && results && results[0]) {
                            const address = results[0].formatted_address;
                            setInputValue(address);
                            onPlaceSelect({ lat, lng }, address);
                        } else {
                            // Fallback if geocoding fails
                            const fallbackText = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                            setInputValue(fallbackText);
                            onPlaceSelect({ lat, lng }, fallbackText);
                        }
                        setIsLoadingLocation(false);
                    });
                } else {
                    // Fallback if google maps not ready
                    const fallbackText = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    setInputValue(fallbackText);
                    onPlaceSelect({ lat, lng }, fallbackText);
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to retrieve your location. Please check your permissions.');
                setIsLoadingLocation(false);
            }
        );
    };

    return (
        <div className="relative w-full shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search by city, zip, or street..."
                className="w-full pl-11 pr-24 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary/20 text-sm font-medium text-primary placeholder:text-primary/30 transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            </div>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
                {inputValue && (
                    <button
                        onClick={handleClear}
                        className="p-1.5 text-primary/30 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all"
                        title="Clear search"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                )}

                {inputValue && <div className="w-px h-3 bg-primary/10 mx-0.5"></div>}

                <button
                    onClick={handleCurrentLocation}
                    disabled={isLoadingLocation}
                    className={`group flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all text-[10px] font-black uppercase tracking-wider ${isLoadingLocation
                            ? 'bg-primary/5 text-primary'
                            : 'hover:bg-accent hover:text-white text-primary/40'
                        }`}
                    title="Use my current location"
                >
                    {isLoadingLocation ? (
                        <>
                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Locating...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span className="hidden group-hover:inline">Use GPS</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
