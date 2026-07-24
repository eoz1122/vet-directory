import React, { lazy, Suspense, useState } from 'react';
import { MoreCitiesDropdown } from './MoreCitiesDropdown';
import type { Vet } from '../../types/vet';

const PlaceAutocomplete = lazy(() => import('../PlaceAutocomplete'));

interface VetFiltersProps {
    vets: Vet[];
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    showVerifiedOnly: boolean;
    setShowVerifiedOnly: (show: boolean) => void;
    showMobileOnly: boolean;
    setShowMobileOnly: (show: boolean) => void;
    showEmergencyOnly: boolean;
    setShowEmergencyOnly: (show: boolean) => void;
    userLocation: { lat: number; lng: number } | null;
    setUserLocation: (loc: { lat: number; lng: number } | null) => void;
    searchRadius: number | null;
    setSearchRadius: (radius: number | null) => void;
    onPlaceSelect: (location: { lat: number; lng: number } | null) => void;
    onResetPagination: () => void;
    mapApiError?: boolean;
    mapsEnabled?: boolean;
    onEnableMaps?: () => void;
}

export const VetFilters: React.FC<VetFiltersProps> = ({
    vets,
    selectedCity, setSelectedCity,
    searchTerm, setSearchTerm,
    showVerifiedOnly, setShowVerifiedOnly,
    showMobileOnly, setShowMobileOnly,
    showEmergencyOnly, setShowEmergencyOnly,
    userLocation, setUserLocation,
    searchRadius, setSearchRadius,
    onPlaceSelect,
    onResetPagination,
    mapApiError = false,
    mapsEnabled = true,
    onEnableMaps = () => {},
}) => {
    const [showRefine, setShowRefine] = useState(false);
    // Dynamic city list derived from data
    const allCities = Array.from(new Set(vets.map(v => v.city || 'Unknown'))).sort();

    // Priority cities to show as immediate buttons
    const priorityCities = ['Berlin', 'Hamburg', 'Frankfurt', 'Munich', 'Stuttgart', 'Cologne', 'Leipzig', 'Nuremberg', 'Dresden'];

    // Split into priority and others
    const mainCities = priorityCities.filter(c => allCities.includes(c));
    const otherCities = allCities.filter(c => !priorityCities.includes(c) && c !== 'Unknown');

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        onResetPagination();
    };

    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        onResetPagination();
    };

    return (
        <div className="space-y-6">
            {/* Location Section */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-primary/80 uppercase tracking-widest px-1">
                    Where to look?
                </label>
                <div className="group/search relative z-50">
                    {mapsEnabled ? (
                        <Suspense fallback={<div className="w-full rounded-xl bg-white border border-primary/10 px-4 py-3 text-sm font-medium text-primary/70">Loading location search...</div>}>
                            <PlaceAutocomplete onPlaceSelect={(loc) => { onPlaceSelect(loc); onResetPagination(); }} apiError={mapApiError} />
                        </Suspense>
                    ) : (
                        <button
                            type="button"
                            aria-label="Activate location search"
                            onClick={onEnableMaps}
                            className="relative w-full rounded-xl bg-white border border-primary/10 px-4 py-3 text-left text-sm font-medium text-primary/70 shadow-sm hover:border-primary/20 hover:shadow-md transition-all"
                        >
                            <span className="pl-7">Search by city, zip, or street...</span>
                            <svg className="w-4 h-4 text-primary/70 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    )}
                </div>

                {!userLocation && (
                    <div className="space-y-3">
                        <div className="flex flex-nowrap md:flex-wrap gap-2 pb-2 overflow-x-auto md:overflow-x-hidden no-scrollbar">
                            {/* "All" Button */}
                            <button
                                onClick={() => handleCityChange('All')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm inline-block text-center active:scale-90 ${selectedCity === 'All'
                                    ? 'bg-primary text-secondary border-primary shadow-primary/20 scale-105'
                                    : 'bg-white border-primary/5 text-primary/80 hover:border-primary/20 hover:text-primary hover:bg-white/80'
                                    }`}
                            >
                                All
                            </button>

                            {/* Priority Cities */}
                            {mainCities.map(city => (
                                <button
                                    key={city}
                                    onClick={() => handleCityChange(city)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm inline-block text-center active:scale-90 ${selectedCity === city
                                        ? 'bg-primary text-secondary border-primary shadow-primary/20 scale-105'
                                        : 'bg-white border-primary/5 text-primary/80 hover:border-primary/20 hover:text-primary hover:bg-white/80'
                                        }`}
                                >
                                    {city}
                                </button>
                            ))}

                            {/* Other Cities — portal dropdown escapes the panel's overflow clipping */}
                            {otherCities.length > 0 && (
                                <MoreCitiesDropdown
                                    cities={otherCities}
                                    selectedCity={selectedCity}
                                    onSelect={handleCityChange}
                                />
                            )}
                        </div>
                    </div>
                )}
                {userLocation && (
                    <div className="flex flex-col gap-3 p-4 bg-white/50 backdrop-blur rounded-2xl border border-primary/5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                                    {searchRadius ? `Within ${searchRadius}km` : 'Sorted by Proximity'}
                                </span>
                            </div>
                            <button onClick={() => { setUserLocation(null); onResetPagination(); }} className="text-[10px] font-black uppercase tracking-widest text-accent-ink hover:opacity-70 transition-opacity">Change Location</button>
                        </div>
                        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest overflow-x-auto pb-1 no-scrollbar">
                            {[1, 3, 5, 10, 25, 50].map(km => (
                                <button
                                    key={km}
                                    onClick={() => { setSearchRadius(km); onResetPagination(); }}
                                    className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${searchRadius === km
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white border-primary/10 text-primary/80 hover:border-primary/30 hover:bg-white/80'
                                        }`}
                                >
                                    {km} km
                                </button>
                            ))}
                            <button
                                onClick={() => { setSearchRadius(null); onResetPagination(); }}
                                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${searchRadius === null
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white border-primary/10 text-primary/80 hover:border-primary/30 hover:bg-white/80'
                                    }`}
                            >
                                Any Distance
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <hr className="border-primary/5" />

            {/* Refine Section: collapsed by default on mobile so listings surface sooner */}
            <button
                onClick={() => setShowRefine(!showRefine)}
                className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-primary/5 rounded-2xl text-xs font-bold text-primary/80 shadow-sm"
                aria-expanded={showRefine}
            >
                <span>🔍 Refine results</span>
                <span className={`transition-transform ${showRefine ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div className={`space-y-3 ${showRefine ? '' : 'hidden md:block'}`}>
                <label className="text-[10px] font-bold text-primary/80 uppercase tracking-widest px-1">
                    Refine Results
                </label>
                <div className="relative w-full group/filter z-0">
                    <input
                        type="text"
                        placeholder="Filter by practice name..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-primary/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent/20 text-sm font-medium transition-all shadow-sm hover:border-primary/20"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <svg className="w-4.5 h-4.5 text-primary/20 absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within/filter:text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap overflow-x-hidden pb-1 no-scrollbar">
                    <button
                        onClick={() => { setShowVerifiedOnly(!showVerifiedOnly); onResetPagination(); }}
                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 border shadow-sm flex items-center justify-center gap-2 active:scale-95 ${showVerifiedOnly
                            ? 'bg-green-500 text-white border-green-500 shadow-green-500/20'
                            : 'bg-white border-primary/5 text-primary/80 hover:border-green-500/30 hover:text-green-600 hover:bg-green-50/50'
                            }`}
                    >
                        <span>✅</span> Verified
                    </button>
                    <button
                        onClick={() => { setShowEmergencyOnly(!showEmergencyOnly); onResetPagination(); }}
                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 border shadow-sm flex items-center justify-center gap-2 active:scale-95 ${showEmergencyOnly
                            ? 'bg-red-500 text-white border-red-500 shadow-red-500/20'
                            : 'bg-white border-primary/5 text-primary/80 hover:border-red-500/30 hover:text-red-600 hover:bg-red-50/50'
                            }`}
                    >
                        <span>🚑</span> 24h Emergency
                    </button>
                    <button
                        onClick={() => { setShowMobileOnly(!showMobileOnly); onResetPagination(); }}
                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 border shadow-sm flex items-center justify-center gap-2 active:scale-95 ${showMobileOnly
                            ? 'bg-amber-400 text-white border-amber-400 shadow-amber-400/20'
                            : 'bg-white border-primary/5 text-primary/80 hover:border-amber-400/30 hover:text-amber-500 hover:bg-amber-50/50'
                            }`}
                    >
                        <span>🚐</span> Mobile
                    </button>
                </div>
            </div>
        </div>
    );
};
