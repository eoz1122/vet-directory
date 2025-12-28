import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { APIProvider } from '@vis.gl/react-google-maps';
// import AppMap from '../components/Map'; // Removed direct import
import PlaceAutocomplete from '../components/PlaceAutocomplete';
import Footer from '../components/Footer';
import type { Vet, VetWithDistance } from '../types/vet';
import vetsData from '../data/vets.json';
import { calculateDistance } from '../utils/distance';
import { appendUTM } from '../utils/url';
import { generateListingSchema } from '../utils/schema';

// Lazy load the Map component to reduce initial bundle size causing TBT
const AppMap = lazy(() => import('../components/Map'));

// Cast the JSON data to our Vet type
const vets = vetsData as Vet[];
const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(true);
    const [showMobileOnly, setShowMobileOnly] = useState(false);
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportingVet, setReportingVet] = useState<Vet | null>(null);

    const [searchRadius, setSearchRadius] = useState<number | null>(null);

    // Dynamic city list derived from data
    const allCities = Array.from(new Set(vets.map(v => v.city || 'Unknown'))).sort();

    // Priority cities to show as immediate buttons
    const priorityCities = ['Berlin', 'Hamburg', 'Frankfurt', 'Munich', 'Stuttgart', 'Cologne', 'Leipzig', 'Nuremberg', 'Dresden'];

    // Split into priority and others
    const mainCities = priorityCities.filter(c => allCities.includes(c));
    const otherCities = allCities.filter(c => !priorityCities.includes(c) && c !== 'Unknown');

    // Filter logic
    const filteredVets = vets.filter(vet => {
        const matchesCity = selectedCity === 'All' || vet.city === selectedCity;
        const matchesText = (vet.practice_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (vet.address || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (vet.district || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesVerification = !showVerifiedOnly || (vet.community_status === 'Verified');
        const matchesMobile = !showMobileOnly || (vet.address && (vet.address.includes("Mobile Service") || vet.address.includes("Home Visits") || vet.address === 'Unknown'));
        const matchesEmergency = !showEmergencyOnly || (vet.verification?.emergency_services === '24/7');

        // Distance filter
        let matchesDistance = true;
        if (userLocation && searchRadius) {
            if (vet.coordinates && vet.coordinates.lat !== 0) {
                const dist = calculateDistance(userLocation.lat, userLocation.lng, vet.coordinates.lat, vet.coordinates.lng);
                if (dist > searchRadius) matchesDistance = false;
            } else {
                matchesDistance = false; // Filter out if no coords and radius constraint active
            }
        }

        return matchesCity && matchesText && matchesVerification && matchesDistance && matchesMobile && matchesEmergency;
    });

    // Sort logic
    const sortedVets: VetWithDistance[] = (() => {
        if (!userLocation) return filteredVets as VetWithDistance[];

        return [...filteredVets].map(vet => {
            const dist = (vet.coordinates && vet.coordinates.lat !== 0)
                ? calculateDistance(userLocation.lat, userLocation.lng, vet.coordinates.lat, vet.coordinates.lng)
                : 9999;
            return { ...vet, distance: dist };
        }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    })();

    // Pagination logic
    const totalPages = Math.ceil(sortedVets.length / ITEMS_PER_PAGE);
    const paginatedVets = sortedVets.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Event Handlers
    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        setSelectedVet(null);
        setCurrentPage(1);
    };

    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        setCurrentPage(1);
    };

    const handlePlaceSelect = (location: { lat: number; lng: number } | null) => {
        if (location) {
            setUserLocation(location);
            setSelectedCity('All');
            setCurrentPage(1);
            setSearchRadius(null); // Reset radius to "All" initially
        } else {
            setUserLocation(null);
            setCurrentPage(1);
            setSearchRadius(null);
        }
    };

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "The Pack: English-Speaking Vets",
        "url": "https://englishspeakinggermany.online",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://englishspeakinggermany.online/?s={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const listingSchema = generateListingSchema(
        paginatedVets,
        "Verified English-Speaking Vets in Germany",
        "A directory of verified English-speaking veterinarians in Berlin, Hamburg, Frankfurt, Munich, and Stuttgart."
    );

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to top on page change
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage, selectedCity, searchTerm, searchRadius, userLocation, showMobileOnly]);

    return (
        <APIProvider apiKey={apiKey} language="en">
            <Helmet>
                <title>The Pack | 170+ Verified English-Speaking Vets in Germany</title>
                <meta name="description" content="Find verified English-speaking veterinarians in Berlin, Hamburg, Frankfurt and more. Germany's most comprehensive community-sourced vet directory." />
                <script type="application/ld+json">
                    {JSON.stringify([jsonLd, listingSchema])}
                </script>
            </Helmet>

            <div className="min-h-screen flex flex-col md:flex-row bg-secondary">
                <div className="md:w-[42%] lg:w-[40%] flex flex-col h-screen overflow-hidden border-r border-primary/5">
                    <header className="sticky top-0 z-10 bg-secondary backdrop-blur-xl border-b border-primary/5 p-6 space-y-5">
                        <Link to="/" className="flex items-center gap-5 group">
                            <div className="relative">
                                <img src="/logo.png" alt="Logo" width="232" height="80" className="h-16 md:h-20 w-auto drop-shadow-sm transition-transform group-hover:scale-105" />
                                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-white animate-pulse"></div>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-primary font-black text-xl md:text-2xl uppercase tracking-tight">English Speaking</span>
                                <span className="text-accent font-black text-3xl md:text-4xl uppercase tracking-tighter">Vets</span>
                            </div>
                        </Link>

                        <p className="text-sm md:text-base text-primary/80 font-medium leading-relaxed max-w-[95%]">
                            Providing peace of mind for you and your companion. <span className="text-primary font-bold italic">"For the love of our little friends."</span>
                        </p>

                        <nav className="flex gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-primary pt-2">
                            <Link to="/blog" className="hover:text-accent transition-colors">Guides</Link>
                            <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                            <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality</Link>
                            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                        </nav>
                    </header>

                    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar bg-secondary/30">
                        <div className="space-y-6">
                            {/* Location Section */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest px-1">
                                    Where to look?
                                </label>
                                <div className="group/search relative z-50">
                                    <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                                </div>

                                {!userLocation && (
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap gap-2 pb-2">
                                            {/* "All" Button */}
                                            <button
                                                onClick={() => handleCityChange('All')}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border shadow-sm ${selectedCity === 'All'
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
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border shadow-sm ${selectedCity === city
                                                        ? 'bg-primary text-secondary border-primary shadow-primary/20 scale-105'
                                                        : 'bg-white border-primary/5 text-primary/60 hover:border-primary/20 hover:text-primary hover:bg-white/80'
                                                        }`}
                                                >
                                                    {city}
                                                </button>
                                            ))}

                                            {/* Dropdown for Other Cities */}
                                            {otherCities.length > 0 && (
                                                <div className="relative group">
                                                    <select
                                                        aria-label="Filter vets by other cities"
                                                        value={otherCities.includes(selectedCity) ? selectedCity : ""}
                                                        onChange={(e) => handleCityChange(e.target.value)}
                                                        className={`appearance-none px-4 py-2 pr-8 rounded-xl text-xs font-bold transition-all duration-300 border shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${otherCities.includes(selectedCity)
                                                            ? 'bg-primary text-secondary border-primary shadow-primary/20'
                                                            : 'bg-white border-primary/5 text-primary/60 hover:border-primary/20 hover:text-primary hover:bg-white/80'
                                                            }`}
                                                    >
                                                        <option value="" disabled>More Cities...</option>
                                                        {otherCities.map(city => (
                                                            <option key={city} value={city} className="text-primary bg-white">
                                                                {city}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${otherCities.includes(selectedCity) ? 'text-secondary' : 'text-primary/40'}`}>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
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
                                            <button onClick={() => setUserLocation(null)} className="text-[10px] font-black uppercase tracking-widest text-accent hover:opacity-70 transition-opacity">Change Location</button>
                                        </div>
                                        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest overflow-x-auto pb-1 no-scrollbar">
                                            {[1, 3, 5, 10, 25, 50].map(km => (
                                                <button
                                                    key={km}
                                                    onClick={() => setSearchRadius(km)}
                                                    className={`px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${searchRadius === km
                                                        ? 'bg-primary text-white border-primary'
                                                        : 'bg-white border-primary/10 text-primary/60 hover:border-primary/30 hover:bg-white/80'
                                                        }`}
                                                >
                                                    {km} km
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setSearchRadius(null)}
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
                                        onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 border shadow-sm flex items-center justify-center gap-2 ${showVerifiedOnly
                                            ? 'bg-green-500 text-white border-green-500 shadow-green-500/20'
                                            : 'bg-white border-primary/5 text-primary/60 hover:border-green-500/30 hover:text-green-600 hover:bg-green-50/50'
                                            }`}
                                    >
                                        <span>✅</span> Verified
                                    </button>
                                    <button
                                        onClick={() => setShowEmergencyOnly(!showEmergencyOnly)}
                                        className={`flex-1 md:flex-none px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 border shadow-sm flex items-center justify-center gap-2 ${showEmergencyOnly
                                            ? 'bg-red-500 text-white border-red-500 shadow-red-500/20'
                                            : 'bg-white border-primary/5 text-primary/60 hover:border-red-500/30 hover:text-red-600 hover:bg-red-50/50'
                                            }`}
                                    >
                                        <span>🚑</span> 24h Emergency
                                    </button>
                                    <button
                                        onClick={() => setShowMobileOnly(!showMobileOnly)}
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

                        <div className="flex justify-between items-end px-2 pt-4">
                            <div className="flex flex-col">
                                <span className="text-[24px] font-black text-primary leading-none">{sortedVets.length}</span>
                                <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Practices available</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest leading-none mb-1">Page</span>
                                <span className="text-[14px] font-black text-primary/80">{currentPage} <span className="text-[10px] text-primary/40 font-bold uppercase mx-1">of</span> {totalPages}</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2">
                            {paginatedVets.map((vet: VetWithDistance) => (
                                <article
                                    key={vet.id}
                                    onClick={() => setSelectedVet(vet)}
                                    className={`group/card relative bg-white p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${selectedVet?.id === vet.id ? 'border-accent ring-1 ring-accent shadow-lg shadow-accent/5' : 'border-primary/5 hover:border-accent/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-full">
                                                    {vet.city}
                                                </span>
                                                {vet.district && vet.district !== "Unknown" && (
                                                    <span className="px-2 py-0.5 bg-accent/5 text-accent text-[9px] font-black uppercase tracking-widest rounded-full">
                                                        {vet.district}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-lg font-black text-primary group-hover/card:text-accent transition-colors leading-tight">
                                                {vet.practice_name}
                                            </h2>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="relative group/tooltip z-20">
                                                <div className="px-3 py-1 bg-accent/20 text-primary text-[10px] font-black uppercase tracking-tighter rounded-xl border border-accent/20 flex items-center gap-1.5 shadow-sm cursor-help">
                                                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                                                    Verified
                                                </div>
                                                <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-primary text-secondary border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 transform translate-y-1 group-hover/tooltip:translate-y-0 pointer-events-none">
                                                    <p className="text-[11px] leading-relaxed font-medium text-secondary/90 normal-case tracking-normal">
                                                        <span className="font-bold text-accent block mb-1 uppercase tracking-widest text-[9px]">Community Verified</span>
                                                        We analyze thousands of patient reviews to identify "English signals"—confirming that other international pet owners successfully communicated in English.
                                                    </p>
                                                    <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-primary border-b border-r border-white/10 rotate-45"></div>
                                                </div>
                                            </div>
                                            {vet.distance !== undefined && vet.distance !== 9999 && (
                                                <span className="text-[10px] font-bold text-primary/40 bg-secondary/50 px-2 py-0.5 rounded-lg border border-primary/5">
                                                    📍 {vet.distance.toFixed(1)} km
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address Display - Mobile vs Fixed */}
                                    {vet.address && (vet.address.includes("Mobile Service") || vet.address.includes("Home Visits") || vet.address === 'Unknown') ? (
                                        <div className="text-[12px] text-primary/60 mb-5 font-bold leading-relaxed bg-accent/10 p-4 rounded-xl border border-accent/20 flex items-center gap-2">
                                            <span>🚐</span> Mobile Service - {vet.city}
                                        </div>
                                    ) : (
                                        <a
                                            href={`https://www.google.com/search?q=${encodeURIComponent(vet.practice_name + " " + (vet.address || ""))}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="block text-[12px] text-primary/60 mb-5 font-medium leading-relaxed bg-secondary/30 p-4 rounded-xl border border-primary/5 group-hover/card:bg-secondary/40 transition-colors hover:text-accent hover:border-accent/30"
                                        >
                                            {vet.address}
                                        </a>
                                    )}

                                    <div className="space-y-2 mb-6">
                                        {vet.verification.english_signals && vet.verification.english_signals.slice(0, 1).map((signal, idx) => (
                                            <div key={idx} className="flex gap-3 items-start group/signal">
                                                <div className="mt-1 flex-shrink-0 w-4 h-4 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                                                    <svg className="w-2.5 h-2.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                                                </div>
                                                <p className="text-[11px] text-primary/60 italic leading-snug group-hover/signal:text-primary/80 transition-colors line-clamp-2">
                                                    "{signal}"
                                                </p>
                                            </div>
                                        ))}
                                        {vet.verification?.emergency_services === '24/7' && (
                                            <div className="flex gap-3 items-start group/signal">
                                                <div className="mt-1 flex-shrink-0 w-4 h-4 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                                                    <span className="text-[10px]">🚑</span>
                                                </div>
                                                <p className="text-[11px] text-red-600 font-bold leading-snug">
                                                    24h Emergency Service
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        {(vet.contact && vet.contact.website) ? (
                                            <a
                                                href={appendUTM(vet.contact.website)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-primary text-secondary rounded-xl hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                <span>🌐</span> Visit Website
                                            </a>
                                        ) : (
                                            <a
                                                href={vet.contact?.phone ? `tel:${vet.contact.phone}` : '#'}
                                                onClick={(e) => e.stopPropagation()}
                                                className={`flex-1 py-3 text-center text-[11px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 ${vet.contact?.phone ? 'bg-primary text-secondary hover:bg-primary/95 shadow-primary/10' : 'bg-gray-100 text-gray-400 cursor-not-allowed hidden'}`}
                                            >
                                                <span>📞</span> Call Practice
                                            </a>
                                        )}

                                        {/* Hide Map button for Mobile Services */}
                                        {!(vet.address && (vet.address.includes("Mobile Service") || vet.address.includes("Home Visits") || vet.address === 'Unknown')) && (
                                            <a
                                                href={vet.contact?.google_maps || `https://www.google.com/search?q=${encodeURIComponent(vet.practice_name + " " + (vet.address || ""))}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-widest bg-white border border-primary/10 text-primary rounded-xl hover:bg-gray-50 transition-all hover:border-primary/30 flex items-center justify-center"
                                                title="View on Maps"
                                            >
                                                📍
                                            </a>
                                        )}
                                    </div>

                                    <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-50/50">
                                        <span className="text-[10px] text-gray-400">
                                            Last Verified: {vet.verification?.last_scanned ? new Date(vet.verification.last_scanned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2025'}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setReportingVet(vet); }}
                                            className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1 group/report"
                                        >
                                            <span className="text-[9px] opacity-0 group-hover/report:opacity-100 transition-opacity">Report Issue</span>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        </button>
                                    </div>
                                </article>
                            ))}

                            {totalPages > 1 && (
                                <div className="flex justify-center gap-3 py-4">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-5 py-2 text-xs font-bold bg-white border border-primary/10 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-primary"
                                    >
                                        ← Prev
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-5 py-2 text-xs font-bold bg-white border border-primary/10 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-primary"
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}

                            <div className="bg-secondary p-6 rounded-[2rem] border border-primary/10">
                                <h2 className="text-lg font-bold text-primary mb-2">Resource Center</h2>
                                <p className="text-xs text-primary/60 mb-4 leading-relaxed">
                                    Helping our companions settle in Germany.
                                </p>
                                <nav className="space-y-4">
                                    {[
                                        { emoji: '🏠', title: 'Pet-Friendly Housing', link: '/blog/pet-friendly-apartments-germany-2025' },
                                        { emoji: '🐕', title: 'Moving to Germany Guide', link: '/blog/moving-to-germany-with-pet-2025' },
                                        { emoji: '🐱', title: 'Cat Registration', link: '/blog/cat-registration-germany-2025' },
                                        { emoji: '🛂', title: 'EU Pet Passports', link: '/blog/eu-pet-passport-germany-2025' },
                                        { emoji: '💊', title: 'Pet Medication Guide', link: '/blog/pet-medication-germany-guide' },
                                        { emoji: '💶', title: 'Dog Tax (Hundesteuer)', link: '/blog/hundesteuer-dog-tax-germany-2025' },
                                        { emoji: '💰', title: 'Pet Insurance Guide', link: '/blog/pet-insurance-germany-2025' }
                                    ].map(item => (

                                        <Link key={item.link} to={item.link} className="flex items-center gap-3 text-primary group">
                                            <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{item.emoji}</span>
                                            <p className="font-semibold text-xs group-hover:text-accent transition-colors">{item.title}</p>
                                        </Link>
                                    ))}
                                    <div className="pt-2">
                                        <Link to="/contact?topic=submit_vet" className="block w-full text-center py-3 bg-accent text-white rounded-xl font-bold text-sm hover:translate-y-[-2px] hover:shadow-lg transition-all">
                                            ⊕ Add to the Directory
                                        </Link>
                                    </div>
                                </nav>
                            </div>

                            {sortedVets.length === 0 && (
                                <div className="text-center py-20 text-primary/40">
                                    <p className="text-sm font-medium">No results found.</p>
                                    <button onClick={() => { setSearchTerm(''); setSelectedCity('All') }} className="mt-4 text-accent font-bold hover:underline text-xs uppercase tracking-widest">Reset filters</button>
                                </div>
                            )}
                            <Footer />
                        </div>
                    </div>
                </div>

                <div className="hidden md:block md:w-[58%] lg:w-[60%] h-screen relative bg-secondary/10">
                    <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-primary/40 font-bold uppercase tracking-widest text-sm">Loading Map...</div>}>
                        <AppMap vets={sortedVets} selectedCity={selectedCity} selectedVet={selectedVet} onSelectVet={setSelectedVet} />
                    </Suspense>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary/95 backdrop-blur-xl border border-white/10 px-8 py-3 flex gap-8 rounded-full z-50 shadow-2xl safe-area-bottom text-secondary/60">
                    <Link to="/" className="flex flex-col items-center hover:text-white transition-colors">
                        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </Link>
                    <Link to="/blog" className="flex flex-col items-center hover:text-white transition-colors">
                        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </Link>
                    <Link to="/contact?topic=submit_vet" className="flex flex-col items-center hover:text-white transition-colors">
                        <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </Link>
                </nav>

                {reportingVet && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden border border-red-50">
                            <div className="bg-red-50/50 p-6 border-b border-red-100/50 flex justify-between items-start">
                                <div>
                                    <h3 className="text-red-800 font-black flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        Report Issue
                                    </h3>
                                    <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider mt-1 opacity-60">Correction Request</p>
                                </div>
                                <button onClick={() => setReportingVet(null)} className="text-red-300 hover:text-red-700 transition-colors" title="Close">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="text-sm text-primary/70 font-medium">
                                    Reporting <span className="font-bold text-primary">{reportingVet.practice_name}</span>.
                                </p>
                                <div className="space-y-2">
                                    {[
                                        { label: '⚠ Permanently Closed', reason: 'Permanently Closed' },
                                        { label: '✏ Data Incorrect', reason: 'Data Error' },
                                        { label: '🛡 Request Removal (Owner)', reason: 'Owner Request Removal' }
                                    ].map(item => (
                                        <Link
                                            key={item.label}
                                            to={`/contact?topic=report_issue&vetId=${reportingVet.id}&vetName=${encodeURIComponent(reportingVet.practice_name)}&reason=${encodeURIComponent(item.reason)}`}
                                            className="block w-full text-left px-5 py-4 rounded-2xl border border-gray-100 hover:bg-red-50/30 hover:border-red-100 text-sm font-bold text-primary transition-all"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium text-center">
                                    Privacy protected as per German GDPR regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </APIProvider>
    );
};

export default Home;
