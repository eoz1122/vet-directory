import { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface Props {
    onPlaceSelect: (location: { lat: number; lng: number } | null, address: string) => void;
    apiError?: boolean;
}

interface PlaceAutocompleteWidget extends HTMLElement {
    description: string;
    placeholder: string;
    value: string;
}

interface PlacesLibraryWithAutocompleteWidget {
    PlaceAutocompleteElement: new (options: {
        includedRegionCodes: string[];
    }) => PlaceAutocompleteWidget;
}

interface PlaceSelectionEvent extends Event {
    placePrediction: {
        toPlace: () => {
            formattedAddress?: string;
            location?: {
                lat: () => number;
                lng: () => number;
            };
            fetchFields: (options: { fields: string[] }) => Promise<void>;
        };
    };
}

function PlaceAutocompleteFallback() {
    return (
        <div className="relative w-full rounded-xl">
            <input
                type="text"
                disabled
                aria-label="Search by location"
                placeholder="Location search unavailable"
                className="w-full pl-11 pr-4 py-3 bg-primary/5 border border-primary/5 rounded-xl text-sm font-medium text-primary/30 placeholder:text-primary/30 cursor-not-allowed"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-primary/40">
                Use city filters below
            </span>
        </div>
    );
}

function SearchIcon() {
    return (
        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function PlaceAutocompleteSDK({ onPlaceSelect }: Pick<Props, 'onPlaceSelect'>) {
    const places = useMapsLibrary('places');
    const geocodingLib = useMapsLibrary('geocoding');
    const widgetHostRef = useRef<HTMLDivElement>(null);
    const loadingInputRef = useRef<HTMLInputElement>(null);
    const widgetRef = useRef<PlaceAutocompleteWidget | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    useEffect(() => {
        if (!places || !widgetHostRef.current) return;

        let widget: PlaceAutocompleteWidget;
        try {
            const widgetLibrary = places as PlacesLibraryWithAutocompleteWidget;
            widget = new widgetLibrary.PlaceAutocompleteElement({
                includedRegionCodes: ['de'],
            });
        } catch (error) {
            console.error('Unable to initialise location search:', error);
            const message = document.createElement('p');
            message.setAttribute('role', 'alert');
            message.className = 'p-3 text-xs font-bold text-red-700';
            message.textContent = 'Location suggestions are temporarily unavailable.';
            widgetHostRef.current.replaceChildren(message);
            return;
        }

        widget.description = 'Search by location';
        widget.placeholder = 'Search by city, zip, or street...';
        widget.setAttribute('aria-label', 'Search by location');
        widget.className = 'w-full';
        widgetHostRef.current.replaceChildren(widget);
        widgetRef.current = widget;

        const handleInput = () => {
            const nextValue = widget.value ?? '';
            setInputValue(nextValue);
            if (!nextValue) onPlaceSelect(null, '');
        };
        const handleSelection = async (event: Event) => {
            setLocationError(null);
            try {
                const selectionEvent = event as PlaceSelectionEvent;
                const place = selectionEvent.placePrediction.toPlace();
                await place.fetchFields({
                    fields: ['formattedAddress', 'location'],
                });

                if (!place.location) {
                    setLocationError('That location has no map coordinates. Try another result.');
                    return;
                }

                const address = place.formattedAddress || widget.value || '';
                widget.value = address;
                setInputValue(address);
                onPlaceSelect(
                    { lat: place.location.lat(), lng: place.location.lng() },
                    address,
                );
            } catch (error) {
                console.error('Unable to load the selected place:', error);
                setLocationError('Unable to load that location. Please try another result.');
            }
        };

        widget.addEventListener('input', handleInput);
        widget.addEventListener('gmp-select', handleSelection);

        return () => {
            widget.removeEventListener('input', handleInput);
            widget.removeEventListener('gmp-select', handleSelection);
            widget.remove();
            widgetRef.current = null;
        };
    }, [onPlaceSelect, places]);

    const handleClear = () => {
        setInputValue('');
        onPlaceSelect(null, '');
        if (widgetRef.current) {
            widgetRef.current.value = '';
            widgetRef.current.focus();
        } else {
            loadingInputRef.current?.focus();
        }
    };

    const setSearchValue = (value: string) => {
        setInputValue(value);
        if (widgetRef.current) widgetRef.current.value = value;
    };

    const handleCurrentLocation = () => {
        if (isLoadingLocation) return;
        setLocationError(null);
        if (!navigator.geolocation) {
            setLocationError('Location is not supported by this browser.');
            return;
        }

        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const applyCurrentLocation = (address: string) => {
                    setSearchValue(address);
                    onPlaceSelect({ lat, lng }, address);
                    setIsLoadingLocation(false);
                };

                if (!geocodingLib) {
                    applyCurrentLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                    return;
                }

                const geocoder = new geocodingLib.Geocoder();
                geocoder.geocode(
                    { location: { lat, lng } },
                    (results: Array<{ formatted_address: string }> | null, status: string) => {
                        const address = status === 'OK' && results?.[0]
                            ? results[0].formatted_address
                            : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                        applyCurrentLocation(address);
                    },
                );
            },
            (error) => {
                console.error('Error getting location:', error);
                setLocationError('Unable to retrieve your location. Check your browser permissions and try again.');
                setIsLoadingLocation(false);
            },
        );
    };

    return (
        <div className="w-full">
            <div className="flex w-full items-center gap-2">
                <div className="relative min-h-12 min-w-0 flex-1 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                    {!places ? (
                        <>
                            <input
                                ref={loadingInputRef}
                                type="text"
                                aria-label="Search by location"
                                placeholder="Search by city, zip, or street..."
                                className="w-full pl-11 pr-12 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/5 focus:border-primary/20 text-sm font-medium text-primary placeholder:text-primary/30 transition-all"
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                            />
                            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">
                                <SearchIcon />
                            </div>
                        </>
                    ) : (
                        <div ref={widgetHostRef} className="w-full min-h-12" />
                    )}

                    {inputValue && (
                        <button
                            type="button"
                            onClick={handleClear}
                            aria-label="Clear location search"
                            className="absolute right-1 top-1/2 min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-primary/70 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                            style={{ display: places ? 'none' : 'inline-flex' }}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleCurrentLocation}
                    aria-label="Use my current location"
                    aria-disabled={isLoadingLocation}
                    aria-busy={isLoadingLocation}
                    className="min-h-11 min-w-11 shrink-0 inline-flex items-center justify-center rounded-xl bg-white text-primary/80 shadow-sm hover:bg-accent-ink hover:text-white transition-all"
                >
                    <span aria-hidden="true">{isLoadingLocation ? '…' : '◎'}</span>
                </button>
            </div>
            {locationError && (
                <p role="alert" className="mt-2 text-xs font-bold text-red-700">
                    {locationError}
                </p>
            )}
        </div>
    );
}

export default function PlaceAutocomplete({ onPlaceSelect, apiError = false }: Props) {
    if (apiError) return <PlaceAutocompleteFallback />;
    return <PlaceAutocompleteSDK onPlaceSelect={onPlaceSelect} />;
}
