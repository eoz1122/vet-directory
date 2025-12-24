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

    return (
        <div className="relative w-full">
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter your location to find vets near you..."
                className="w-full pl-10 pr-10 py-2 bg-white border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm shadow-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <svg className="w-4 h-4 text-primary/40 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {inputValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            )}
        </div>
    );
}
