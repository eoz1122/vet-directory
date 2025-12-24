import { useState, useMemo } from 'react'
import vetData from './data/vets.json'
import LeafletMap from './components/Map'

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

function App() {
  const [selectedCity, setSelectedCity] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const cities = ['All', 'Berlin', 'Frankfurt', 'Hamburg']

  const filteredVets = useMemo(() => {
    return (vetData as Vet[]).filter(vet => {
      const matchesCity = selectedCity === 'All' || vet.city === selectedCity
      const matchesSearch = vet.practice_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vet.district.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCity && matchesSearch
    })
  }, [selectedCity, searchTerm])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sticky Header (Mobile) / Sidebar Header (Desktop) */}
      <div className="md:w-[40%] flex flex-col h-screen overflow-hidden bg-secondary">
        <header className="sticky top-0 z-10 bg-secondary/80 backdrop-blur-md border-b border-primary/10 p-4">
          <h1 className="text-2xl text-primary mb-2">EnglishSpeakingGermany<span className="text-accent">.online</span></h1>

          <div className="space-y-3">
            {/* City Filter */}
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

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or district..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-4 h-4 text-primary/40 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
        </header>

        {/* Scrollable List */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-xs text-primary/50 font-mono mb-2 uppercase tracking-wide">
            {filteredVets.length} Verified Practices Found
          </div>

          {filteredVets.map(vet => (
            <article key={vet.id} className="bg-white rounded-xl p-4 shadow-sm border border-transparent hover:border-accent/20 hover:scale-[1.01] transition-all duration-200 group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg leading-tight text-primary group-hover:text-accent transition-colors">
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

              <div className="flex flex-wrap gap-2 mb-4">
                {vet.verification.english_signals.map((signal, idx) => (
                  <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-green-50 text-green-700 border border-green-100">
                    ✓ {signal}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto pt-3 border-t border-gray-50">
                {vet.contact.website ? (
                  <a
                    href={vet.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-xs font-semibold bg-primary text-secondary rounded hover:bg-primary/90 transition-colors"
                  >
                    Visit Website
                  </a>
                ) : (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vet.practice_name + " " + vet.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 text-center text-xs font-semibold bg-white border border-primary/20 text-primary rounded hover:bg-gray-50 transition-colors"
                  >
                    View on Google Maps
                  </a>
                )}
                <button className="px-3 py-2 text-primary/40 hover:text-red-500 transition-colors" title="Report Issue">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </button>
              </div>

              <div className="mt-2 text-[9px] text-gray-300 text-center">
                User-submitted/AI-verified. Non-binding info.
              </div>
            </article>
          ))}

          {filteredVets.length === 0 && (
            <div className="text-center py-20 text-primary/40">
              <p>No results found for your search.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCity('All') }} className="mt-4 text-accent hover:underline text-sm">Clear filters</button>
            </div>
          )}

          <footer className="mt-8 pt-8 border-t border-primary/10 text-center text-[10px] text-primary/40 pb-20 md:pb-8">
            <p className="mb-2">© 2025 EnglishSpeakingGermany.online</p>
            <div className="flex justify-center gap-4">
              <a href="#" className="hover:text-primary">Impressum</a>
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Opt-out</a>
            </div>
          </footer>
        </main>
      </div>

      {/* Map Section */}
      <div className="hidden md:block md:w-[60%] bg-[#e5e0d8] relative">
        <LeafletMap vets={filteredVets} selectedCity={selectedCity} />
      </div>

      {/* Mobile Sticky Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between z-50 safe-area-bottom">
        <button className="flex flex-col items-center text-primary">
          <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="text-[10px] font-medium">Directory</span>
        </button>
        <button className="flex flex-col items-center text-primary/40 hover:text-primary">
          <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7"></path></svg>
          <span className="text-[10px] font-medium">Map</span>
        </button>
        <button className="flex flex-col items-center text-primary/40 hover:text-primary">
          <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span className="text-[10px] font-medium">Add Vet</span>
        </button>
      </nav>
    </div>
  )
}

export default App
