import React from 'react';
import PlaceAutocomplete from '../PlaceAutocomplete';
import type { Vet } from '../../types/vet';

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
}) => {
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
                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest px-1">
                    Where to look?
                </label>
                <div className="group/search relative z-50">
                    <PlaceAutocomplete onPlaceSelect={(loc) => { onPlaceSelect(loc); onResetPagination(); }} apiError={mapApiError} />
                </div>

                {!userLocation && (
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 pb-2">
                            {/* "All" Button */}
                            <button
                                onClick={() => handleCityChange('All')}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border shadow-sm inline-block text-center ${selectedCity === 'All'
                                    ? 'bg-primary text-secondary border-primary shadow-primary/20 scale-105'
                                    : 'bg-white border-primary/5 text-primary/60 hover:border-primary/20 hover:text-primary hover:bg-white/80'
                                    }`}
                            >
                                All
                            </button>

                            {/* Priority Cities */}
                            {mainCities.map(city => (
                                <button
                                    key={city}
                                    onClick={() => handleCityChange(city)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border shadow-sm inline-block text-center ${selectedCity === city
                                        ? 'bg-primary text-secondary border-primary shadow-primary/20 scale-105'
                                        : 'bg-white border-primary/5 text-primary/60 hover:border-primary/20 hover:text-primary hover:bg-white/80'
                                        }`}
                                >
                                    {city}
                                </button>
                            ))}

                            {/* Custom Dropdown for Other Cities */}
                            {otherCities.length > 0 && (
                                <div className="relative group inline-block">
                                    <button
                                        className={`appearance-none px-4 py-2 pr-8 rounded-xl text-xs font-bold transition-all duration-300 border shadow-sm cursor-pointer focus:outline-none bg-white border-primary/5 text-primary/60 hover:border-primary/20 hover:text-primary hover:bg-white/80 flex items-center`}
                                    >
                                        More Cities...
                                        <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-primary/10 overflow-hidden z-[100] hidden group-hover:block max-h-64 overflow-y-auto custom-scrollbar">
                                        {otherCities.map(city => (
                                            <button
                                                key={city}
                                                onClick={() => handleCityChange(city)}
                                                className={`w-full block px-4 py-2 text-xs font-bold text-left transition-colors ${selectedCity === city
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'text-primary/70 hover:bg-primary/5 hover:text-primary'
                                                    }`}
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {userLocation && (
                    <div className="flex flex-col gap-3 p-4 bg-white/50 backdrop-blur rounded-2xl border border-primary/5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                                    {searchRadius ? `Within ${searchRadius}km` : 'Sorted by Proximity'}
                                </span>
                            </div>
                            <button onClick={() => { setUserLocation(null); onResetPagination(); }} className="text-[10px] font-black uppercase tracking-widest text-accent hover:opacity-70 transition-opacity">Change Location</button>
                        </div>
                        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest overflow-x-auto pb-1 no-scrollbar">
                            {[1, 3, 5, 10, 25, 50].map(km => (
                                <button
                                    key={km}
                                    onClick={() => { setSearchRadius(km); onResetPagination(); }}
                                    className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${searchRadius === km
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white border-primary/10 text-primary/60 hover:border-primary/30 hover:bg-white/80'
                                        }`}
                                >
                                    {km} km
                                </button>
                            ))}
                            <button
                                onClick={() => { setSearchRadius(null); onResetPagination(); }}
                                className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${searchRadius === null
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white border-primary/10 text-primary/60 hover:border-primary/30 hover:bg-white/80'
                                    }`}
                            >
                                Any Distance
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <hr className="border-primary/5" />

            {/* Refine Section */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest px-1">
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
                <div className="flex gap-2 flex-wrap md:flex-nowrap overflow-x-auto pb-1 no-scrollbar">
                    <button
                        onClick={() => { setShowVerifiedOnly(!showVerifiedOnly); onResetPagination(); }}
                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 border shadow-sm flex items-center justify-center gap-2 ${showVerifiedOnly
                            ? 'bg-green-500 text-white border-green-500 shadow-green-500/20'
                            : 'bg-white border-primary/5 text-primary/60 hover:border-green-500/30 hover:text-green-600 hover:bg-green-50/50'
                            }`}
                    >
                        <span>✅</span> Verified
                    </button>
                    <button
                        onClick={() => { setShowEmergencyOnly(!showEmergencyOnly); onResetPagination(); }}
                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 border shadow-sm flex items-center justify-center gap-2 ${showEmergencyOnly
                            ? 'bg-red-500 text-white border-red-500 shadow-red-500/20'
                            : 'bg-white border-primary/5 text-primary/60 hover:border-red-500/30 hover:text-red-600 hover:bg-red-50/50'
                            }`}
                    >
                        <span>🚑</span> 24h Emergency
                    </button>
                    <button
                        onClick={() => { setShowMobileOnly(!showMobileOnly); onResetPagination(); }}
                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 border shadow-sm flex items-center justify-center gap-2 ${showMobileOnly
                            ? 'bg-amber-400 text-white border-amber-400 shadow-amber-400/20'
                            : 'bg-white border-primary/5 text-primary/60 hover:border-amber-400/30 hover:text-amber-500 hover:bg-amber-50/50'
                            }`}
                    >
                        <span>🚐</span> Mobile
                    </button>
                </div>
            </div>
        </div>
    );
};
