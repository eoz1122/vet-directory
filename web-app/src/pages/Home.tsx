import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { APIProvider } from '@vis.gl/react-google-maps';
// import AppMap from '../components/Map'; // Removed direct import
import Footer from '../components/Footer';
import type { Vet, VetWithDistance } from '../types/vet';
import vetsData from '../data/vets.json';
import { calculateDistance } from '../utils/distance';
import { generateListingSchema } from '../utils/schema';
import { VetCard } from '../components/vet/VetCard';
import { VetFilters } from '../components/vet/VetFilters';
import { Pagination } from '../components/ui/Pagination';

// Lazy load the Map component to reduce initial bundle size causing TBT
const AppMap = lazy(() => import('../components/Map'));

// Cast the JSON data to our Vet type
const vets = vetsData as Vet[];
const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
    const [mapApiError, setMapApiError] = useState(false);
    // Parse query params for initial city filtering
    const [searchParams] = useSearchParams();

    // Initialize state with URL params
    const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('s') || searchParams.get('q') || '');
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(true);
    const [showMobileOnly, setShowMobileOnly] = useState(false);
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportingVet, setReportingVet] = useState<Vet | null>(null);

    const [searchRadius, setSearchRadius] = useState<number | null>(null);

    // Sync state with URL param during render to avoid cascading updates
    const cityParam = searchParams.get('city');
    const queryParam = searchParams.get('s') || searchParams.get('q');

    if (cityParam && cityParam !== selectedCity) {
        setSelectedCity(cityParam);
    }

    if (queryParam && queryParam !== searchTerm) {
        setSearchTerm(queryParam);
    }

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

    // Google Maps fires window.gm_authFailure for RefererNotAllowedMapError -
    // the APIProvider.onError prop does NOT catch this specific error type.
    useEffect(() => {
        (window as Window & { gm_authFailure?: () => void }).gm_authFailure = () => {
            setMapApiError(true);
        };
        return () => {
            delete (window as Window & { gm_authFailure?: () => void }).gm_authFailure;
        };
    }, []);

    return (
        <APIProvider apiKey={apiKey} language="en" onError={() => setMapApiError(true)}>
            <Helmet>
                <title>English-Speaking Vets in Germany | Verified Expat Directory</title>
                <meta name="description" content="The trusted directory for expat pet owners in Germany. Find verified English-speaking veterinarians in Berlin, Hamburg, Munich, Frankfurt and 30+ cities." />
                <link rel="canonical" href="https://englishspeakinggermany.online" />
                <meta property="og:title" content="English-Speaking Vets in Germany | Verified Expat Directory" />
                <meta property="og:description" content="The trusted directory for expat pet owners in Germany. Find verified English-speaking veterinarians in Berlin, Hamburg, Munich, Frankfurt and 30+ cities." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://englishspeakinggermany.online" />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="English-Speaking Vets in Germany | Verified Expat Directory" />
                <meta name="twitter:description" content="The trusted directory for expat pet owners in Germany. Find verified English-speaking veterinarians in Berlin, Hamburg, Munich, Frankfurt and 30+ cities." />
                <script type="application/ld+json">
                    {JSON.stringify([jsonLd, listingSchema])}
                </script>
            </Helmet>

            <div className="min-h-screen flex flex-col md:flex-row bg-secondary">
                <div className="md:w-[42%] lg:w-[40%] flex flex-col h-screen overflow-hidden border-r border-primary/5">
                <h1 className="sr-only">Find English-Speaking Vets in Germany</h1>
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
                        <VetFilters
                            vets={vets}
                            selectedCity={selectedCity}
                            setSelectedCity={(city) => { setSelectedCity(city); setSelectedVet(null); }}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            showVerifiedOnly={showVerifiedOnly}
                            setShowVerifiedOnly={setShowVerifiedOnly}
                            showMobileOnly={showMobileOnly}
                            setShowMobileOnly={setShowMobileOnly}
                            showEmergencyOnly={showEmergencyOnly}
                            setShowEmergencyOnly={setShowEmergencyOnly}
                            userLocation={userLocation}
                            setUserLocation={setUserLocation}
                            searchRadius={searchRadius}
                            setSearchRadius={setSearchRadius}
                            onPlaceSelect={handlePlaceSelect}
                            onResetPagination={() => setCurrentPage(1)}
                            mapApiError={mapApiError}
                        />

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
                                <VetCard
                                    key={vet.id}
                                    vet={vet}
                                    isSelected={selectedVet?.id === vet.id}
                                    onSelect={setSelectedVet}
                                    onReportIssue={setReportingVet}
                                />
                            ))}

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />


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
                                        <Link to="/contact?topic=submit_vet" className="block w-full text-center py-3 bg-accent text-white rounded-xl font-bold text-sm hover:translate-y-[-2px] hover:shadow-lg transition-all active:scale-95">
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
                    {mapApiError ? (
                        <div className="h-full w-full flex flex-col items-center justify-center gap-6 bg-secondary/30 p-12">
                            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                                <svg className="w-10 h-10 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <div className="text-center max-w-xs">
                                <h3 className="font-black text-primary text-lg mb-2">Map unavailable</h3>
                                <p className="text-sm text-primary/50 leading-relaxed">
                                    The interactive map couldn't load. Use the list on the left to browse all {vets.length} verified vets - it has everything you need.
                                </p>
                            </div>
                            <a
                                href="https://www.google.com/maps/search/english+speaking+vet+germany"
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 bg-accent text-white text-sm font-bold rounded-xl hover:bg-accent/90 transition-all shadow-sm hover:shadow-md"
                            >
                                Open Google Maps instead
                            </a>
                        </div>
                    ) : (
                        <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-primary/40 font-bold uppercase tracking-widest text-sm">Loading Map...</div>}>
                            <AppMap vets={sortedVets} selectedCity={selectedCity} selectedVet={selectedVet} onSelectVet={setSelectedVet} />
                        </Suspense>
                    )}
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
