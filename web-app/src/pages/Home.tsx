import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import vetData from '../data/vets.json'
import AppMap from '../components/Map'
import PlaceAutocomplete from '../components/PlaceAutocomplete'
import { calculateDistance } from '../utils/distance'
import { APIProvider } from '@vis.gl/react-google-maps'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'

interface Vet {
    id: string
    practice_name: string
    city: string
    district: string
    address: string
    coordinates: {
        lat: number
        lng: number
    }
    contact: {
        website: string | null
        phone: string | null
    }
    verification: {
        english_signals: string[]
    }
}

export default function Home() {
    const [selectedCity, setSelectedCity] = useState<string>('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [reportingVet, setReportingVet] = useState<Vet | null>(null);
    const [selectedVet, setSelectedVet] = useState<Vet | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const cities = ['All', 'Berlin', 'Frankfurt', 'Hamburg']

    // Reset selected vet and page when city changes
    useEffect(() => {
        setSelectedVet(null);
        setCurrentPage(1);
    }, [selectedCity]);

    // Reset page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Reset page when user location changes
    useEffect(() => {
        setCurrentPage(1);
    }, [userLocation]);

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "EnglishSpeakingVets",
        "url": "https://englishspeakinggermany.online",
        "logo": "https://englishspeakinggermany.online/logo.png",
        "image": "https://englishspeakinggermany.online/logo.png",
        "description": "Find verified English-speaking veterinarians across Germany. A comprehensive directory for expats living in Berlin, Hamburg, Frankfurt, and beyond.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "DE"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://englishspeakinggermany.online/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://englishspeakinggermany.online"
        }]
    };

    // 1. Filter logic
    const filteredVets = useMemo(() => {
        return (vetData as Vet[]).filter(vet => {
            const matchesText = vet.practice_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vet.district.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCity = selectedCity === 'All' || vet.city === selectedCity;
            if (userLocation) return true;
            return matchesCity && matchesText;
        })
    }, [selectedCity, searchTerm, userLocation])

    interface VetWithDistance extends Vet {
        distance?: number;
    }

    // 2. Sort logic (Distance vs Default)
    const sortedVets = useMemo(() => {
        if (!userLocation) return filteredVets as VetWithDistance[];

        return [...filteredVets].map(vet => {
            const dist = vet.coordinates.lat !== 0
                ? calculateDistance(userLocation.lat, userLocation.lng, vet.coordinates.lat, vet.coordinates.lng)
                : 9999;
            return { ...vet, distance: dist } as VetWithDistance;
        }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }, [filteredVets, userLocation]);

    // 3. Pagination logic
    const totalPages = Math.ceil(sortedVets.length / ITEMS_PER_PAGE);
    const paginatedVets = sortedVets.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePlaceSelect = (location: { lat: number; lng: number } | null) => {
        if (location) {
            setUserLocation(location);
            setSelectedCity('All');
        } else {
            setUserLocation(null);
        }
    };

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    if (!apiKey && import.meta.env.PROD) {
        console.error('CRITICAL: Google Maps API Key is missing from the production build!');
    }

    return (
        <APIProvider apiKey={apiKey} language="en">
            <Helmet>
                <title>English-Speaking Vets in Germany | Verify & Find 94+ Clinics</title>
                <meta name="description" content="Moving to Germany with a pet? Find 94+ verified English-speaking veterinarians in Berlin, Hamburg, Frankfurt and more. Essential guides on dog tax and pet registration." />
                <meta name="keywords" content="english speaking veterinarian germany, vet berlin english, english vet frankfurt, english vet hamburg, expat pet germany" />
                <link rel="canonical" href="https://englishspeakinggermany.online" />

                {/* Open Graph / Social */}
                <meta property="og:title" content="English-Speaking Vets in Germany | Verify & Find 94+ Clinics" />
                <meta property="og:description" content="Find verified English-speaking veterinarians across Germany. The ultimate directory for expats." />
                <meta property="og:image" content="https://englishspeakinggermany.online/logo.png" />
                <meta property="og:url" content="https://englishspeakinggermany.online" />
                <meta property="og:type" content="website" />

                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
            </Helmet>

            <div className="min-h-screen flex flex-col md:flex-row">
                <div className="md:w-[40%] flex flex-col h-screen overflow-hidden bg-secondary">
                    <header className="sticky top-0 z-10 bg-secondary/80 backdrop-blur-md border-b border-primary/10 p-4">
                        <div className="flex flex-col gap-3 mb-4">
                            <Link to="/" className="flex items-center gap-3 group">
                                <img src="/logo.png" alt="EnglishSpeakingVets - Find an English Speaking Vet in Germany" className="h-20 w-auto transition-transform group-hover:scale-105" />
                                <div className="flex flex-col leading-none">
                                    <h1 className="text-primary font-bold text-lg uppercase tracking-tight">English Speaking</h1>
                                    <span className="text-accent font-bold text-3xl uppercase tracking-tighter">Vets</span>
                                </div>
                            </Link>

                            <nav className="hidden md:flex gap-4 text-xs font-semibold text-primary/70 border-t border-primary/10 pt-2 w-full">
                                <Link to="/blog" className="hover:text-accent transition-colors">Guides</Link>
                                <Link to="/about" className="hover:text-accent transition-colors">About Our Pack</Link>
                                <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality Promise</Link>
                                <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                            </nav>
                        </div>
                    </header>

                    <div className="space-y-3 px-4">
                        <div className="w-full">
                            <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                        </div>

                        {!userLocation && (
                            <>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {cities.map(city => (
                                        <button
                                            key={city}
                                            onClick={() => setSelectedCity(city)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${selectedCity === city
                                                ? 'bg-primary text-secondary'
                                                : 'bg-white border border-primary/20 text-primary hover:bg-primary/5'
                                                }`}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>

                                <div className="text-xs text-primary/60 px-1">
                                    <p className="mb-2 font-semibold font-sans">Explore by City:</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Link to="/vets/berlin" className="hover:text-accent transition-colors">Berlin →</Link>
                                        <Link to="/vets/hamburg" className="hover:text-accent transition-colors">Hamburg →</Link>
                                        <Link to="/vets/frankfurt" className="hover:text-accent transition-colors">Frankfurt →</Link>
                                    </div>
                                </div>
                            </>
                        )}

                        {!userLocation && (
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Filter by name..."
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg className="w-4 h-4 text-primary/40 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        )}

                        {userLocation && (
                            <div className="flex justify-between items-center text-xs text-primary/60 px-1">
                                <span>Sorted by distance from your search</span>
                                <button onClick={() => setUserLocation(null)} className="text-accent hover:underline">Clear Location</button>
                            </div>
                        )}
                    </div>

                    <main className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="text-xs text-primary/50 font-mono mb-2 uppercase tracking-wide flex justify-between items-end">
                            <span>{sortedVets.length} Verified Practices Found</span>
                            {totalPages > 1 && (
                                <span className="text-[10px]">Page {currentPage} of {totalPages}</span>
                            )}
                        </div>

                        {paginatedVets.map(vet => (
                            <article
                                key={vet.id}
                                onClick={() => setSelectedVet(vet)}
                                className={`rounded-xl p-4 shadow-sm border transition-all duration-200 group relative cursor-pointer ${selectedVet?.id === vet.id
                                    ? 'bg-primary/5 border-primary/40 ring-1 ring-primary/40'
                                    : 'bg-white border-transparent hover:border-accent/20 hover:scale-[1.01]'
                                    }`}
                            >
                                {vet.distance !== undefined && vet.distance < 9000 && (
                                    <div className="absolute top-4 right-4 bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded">
                                        {Math.round(vet.distance)} km
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-2 pr-12">
                                    <div>
                                        <h3 className="text-lg font-bold leading-tight text-primary group-hover:text-accent transition-colors">
                                            {vet.practice_name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-block px-2 py-0.5 bg-secondary text-primary text-[10px] font-bold uppercase tracking-wider rounded">
                                                {vet.city}
                                            </span>
                                            <span className="text-xs text-primary/60 font-medium">
                                                {vet.district}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-primary/80 mb-3 font-light leading-relaxed">
                                    {vet.address}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4 items-center">
                                    {vet.verification.english_signals.map((signal, idx) => (
                                        <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-green-50 text-green-700 border border-green-100">
                                            ✓ {signal}
                                        </span>
                                    ))}
                                    <div className="relative group/tooltip ml-1">
                                        <div className="cursor-help text-primary/30 hover:text-primary transition-colors">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-primary text-secondary text-[11px] rounded-xl shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-50 pointer-events-none ring-1 ring-white/10">
                                            <p className="font-bold mb-1.5 text-accent">Our Verification Standards:</p>
                                            <ul className="list-disc list-inside space-y-1 opacity-90">
                                                <li>AI-Powered Review Analysis</li>
                                                <li>Multi-lingual Signal Detection</li>
                                                <li>Expat Community Feedback</li>
                                                <li>Website Language Verification</li>
                                            </ul>
                                            <div className="absolute top-full left-4 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-primary"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto pt-3 border-t border-gray-50">
                                    {vet.contact.website ? (
                                        <a
                                            href={vet.contact.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 py-2 text-center text-xs font-semibold bg-primary text-secondary rounded hover:bg-primary/90 transition-colors"
                                        >
                                            Visit Practice Website
                                        </a>
                                    ) : (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vet.practice_name + " " + vet.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex-1 py-2 text-center text-xs font-semibold bg-white border border-primary/20 text-primary rounded hover:bg-gray-50 transition-colors"
                                        >
                                            View on Google Maps
                                        </a>
                                    )}
                                </div>

                                <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-50/50">
                                    <span className="text-[10px] text-gray-400">
                                        Data sourced via public signals & community. Updated 2025.
                                    </span>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setReportingVet(vet); }}
                                        className="text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1 group/report"
                                        title="Report Issue / Request Removal"
                                    >
                                        <span className="text-[9px] opacity-0 group-hover/report:opacity-100 transition-opacity">Report Issue</span>
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </button>
                                </div>
                            </article>
                        ))}

                        {totalPages > 1 && (
                            <div className="flex justify-center gap-4 py-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 text-xs font-bold bg-white border border-primary/20 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-primary"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 text-xs font-bold bg-white border border-primary/20 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-primary"
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        <div className="bg-secondary p-6 rounded-2xl border border-primary/10">
                            <h2 className="text-lg font-bold text-primary mb-2">Expat Pet Resource Center</h2>
                            <p className="text-sm text-primary/70 mb-4 leading-relaxed">
                                Moving to Germany? These verified guides will save you hours of bureaucracy.
                            </p>
                            <nav className="space-y-3">
                                <Link to="/blog/pet-friendly-apartments-germany-2025" className="flex items-start gap-2 text-primary hover:text-accent transition-colors group">
                                    <span className="text-lg">🏠</span>
                                    <div>
                                        <p className="font-semibold text-sm group-hover:underline">Finding a Pet-Friendly Apartment</p>
                                        <p className="text-xs text-primary/60">How to tackle German landlords & "Pet Resumes"</p>
                                    </div>
                                </Link>
                                <Link to="/blog/moving-to-germany-with-pet-2025" className="flex items-start gap-2 text-primary hover:text-accent transition-colors group">
                                    <span className="text-lg">🐕</span>
                                    <div>
                                        <p className="font-semibold text-sm group-hover:underline">Moving to Germany with a Pet</p>
                                        <p className="text-xs text-primary/60">2025 Checklist: Rabies, Passport & Entry Rules</p>
                                    </div>
                                </Link>
                                <Link to="/blog/cat-registration-germany-2025" className="flex items-start gap-2 text-primary hover:text-accent transition-colors group">
                                    <span className="text-lg">🐱</span>
                                    <div>
                                        <p className="font-semibold text-sm group-hover:underline">Cat Registration in Germany</p>
                                        <p className="text-xs text-primary/60">TASSO registration and microchip requirements</p>
                                    </div>
                                </Link>
                                <Link to="/blog/eu-pet-passport-germany-2025" className="flex items-start gap-2 text-primary hover:text-accent transition-colors group">
                                    <span className="text-lg">🛂</span>
                                    <div>
                                        <p className="font-semibold text-sm group-hover:underline">EU Pet Passports</p>
                                        <p className="text-xs text-primary/60">Document costs and how to find a local vet</p>
                                    </div>
                                </Link>
                                <Link to="/blog/hundesteuer-dog-tax-germany-2025" className="flex items-start gap-2 text-primary hover:text-accent transition-colors group">
                                    <span className="text-lg">💶</span>
                                    <div>
                                        <p className="font-semibold text-sm group-hover:underline">Hundesteuer (Dog Tax)</p>
                                        <p className="text-xs text-primary/60">Registration, annual costs and exemptions</p>
                                    </div>
                                </Link>
                                <div className="pt-2">
                                    <Link to="/blog" className="block w-full text-center py-3 bg-primary text-secondary rounded-xl font-bold text-sm hover:bg-accent hover:text-primary transition-all shadow-sm">
                                        📚 View All Expat Guides
                                    </Link>
                                </div>
                            </nav>
                        </div>

                        {sortedVets.length === 0 && (
                            <div className="text-center py-20 text-primary/40">
                                <p>No English-speaking vets found for your search.</p>
                                <button onClick={() => { setSearchTerm(''); setSelectedCity('All') }} className="mt-4 text-accent hover:underline text-sm">Reset filters</button>
                            </div>
                        )}

                        <Footer />
                    </main>
                </div>

                <div className="hidden md:block md:w-[60%] bg-[#e5e0d8] relative">
                    <AppMap vets={sortedVets} selectedCity={selectedCity} selectedVet={selectedVet} onSelectVet={setSelectedVet} />
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between z-50 safe-area-bottom">
                    <Link to="/" className="flex flex-col items-center text-primary">
                        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        <span className="text-[10px] font-medium">Directory</span>
                    </Link>
                    <Link to="/blog" className="flex flex-col items-center text-primary/40">
                        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        <span className="text-[10px] font-medium">Guides</span>
                    </Link>
                    <button className="flex flex-col items-center text-primary/40">
                        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7"></path></svg>
                        <span className="text-[10px] font-medium">Map</span>
                    </button>
                    <Link to="/contact?topic=submit_vet" className="flex flex-col items-center text-primary/40">
                        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        <span className="text-[10px] font-medium">Add Vet</span>
                    </Link>
                </nav>

                {reportingVet && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-red-100">
                            <div className="bg-red-50 p-4 border-b border-red-100 flex justify-between items-start">
                                <div>
                                    <h3 className="text-red-800 font-bold flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        Report Issue
                                    </h3>
                                    <p className="text-xs text-red-600 mt-1">Regulatory Notice & Correction Request</p>
                                </div>
                                <button onClick={() => setReportingVet(null)} className="text-red-400 hover:text-red-700" title="Close">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                <p className="text-sm text-gray-600">
                                    Reporting <strong>{reportingVet.practice_name}</strong> ({reportingVet.city}).
                                </p>
                                <div className="space-y-2">
                                    <a href={`mailto:compliance@englishspeakinggermany.online?subject=Report: ${reportingVet.id}&body=Reason: Permanently Closed`} className="block w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-primary transition-colors">
                                        ⚠ Permanently Closed
                                    </a>
                                    <a href={`mailto:compliance@englishspeakinggermany.online?subject=Report: ${reportingVet.id}&body=Reason: Data Error`} className="block w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-primary transition-colors">
                                        ✏ Data Incorrect
                                    </a>
                                    <a href={`mailto:compliance@englishspeakinggermany.online?subject=Removal Request: ${reportingVet.id}`} className="block w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-primary transition-colors">
                                        🛡 Request Removal (Owner)
                                    </a>
                                </div>
                                <p className="text-[10px] text-gray-400 leading-tight">
                                    Compliant with German GDPR & DSA regulations.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </APIProvider>
    )
}
