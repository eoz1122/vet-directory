import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';

// Critical routes - load immediately
import Home from './pages/Home';

// Lazy load all other routes for better performance
const QualityPromise = lazy(() => import('./pages/QualityPromise'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MovingWithPetChecklist = lazy(() => import('./pages/MovingWithPetChecklist'));
const CatRegistrationGermany = lazy(() => import('./pages/CatRegistrationGermany'));
const EUPetPassport = lazy(() => import('./pages/EUPetPassport'));
const DogTaxGermany = lazy(() => import('./pages/DogTaxGermany'));
const CityVets = lazy(() => import('./pages/CityVets'));
const DistrictVets = lazy(() => import('./pages/DistrictVets'));
const Impressum = lazy(() => import('./pages/Impressum'));
const Privacy = lazy(() => import('./pages/Privacy'));
const PetFriendlyApartments = lazy(() => import('./pages/PetFriendlyApartments'));
const PublicTransportBerlin = lazy(() => import('./pages/PublicTransportBerlin'));
const PublicTransportHamburg = lazy(() => import('./pages/PublicTransportHamburg'));
const PublicTransportFrankfurt = lazy(() => import('./pages/PublicTransportFrankfurt'));
const PublicTransportMunich = lazy(() => import('./pages/PublicTransportMunich'));
const PublicTransportStuttgart = lazy(() => import('./pages/PublicTransportStuttgart'));
const PetSittingGermany = lazy(() => import('./pages/PetSittingGermany'));
const Blog = lazy(() => import('./pages/Blog'));
const GermanVetPhrases = lazy(() => import('./pages/GermanVetPhrases'));
const PetInsuranceGermany = lazy(() => import('./pages/PetInsuranceGermany'));
const GermanDogEtiquette = lazy(() => import('./pages/GermanDogEtiquette'));
const PetEmergencyGermany = lazy(() => import('./pages/PetEmergencyGermany'));
const EmergencyVetsBerlin = lazy(() => import('./pages/EmergencyVetsBerlin'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-cream-50 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      <p className="mt-4 text-forest-700">Loading...</p>
    </div>
  </div>
);


function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/german-vet-survival-kit-phrases" element={<GermanVetPhrases />} />
            <Route path="/quality-promise" element={<QualityPromise />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/moving-to-germany-with-pet-2025" element={<MovingWithPetChecklist />} />
            <Route path="/blog/cat-registration-germany-2025" element={<CatRegistrationGermany />} />
            <Route path="/blog/eu-pet-passport-germany-2025" element={<EUPetPassport />} />
            <Route path="/blog/hundesteuer-dog-tax-germany-2025" element={<DogTaxGermany />} />
            <Route path="/blog/pet-friendly-apartments-germany-2025" element={<PetFriendlyApartments />} />
            <Route path="/blog/public-transport-with-dogs-berlin-2025" element={<PublicTransportBerlin />} />
            <Route path="/blog/public-transport-with-dogs-hamburg-2025" element={<PublicTransportHamburg />} />
            <Route path="/blog/public-transport-with-dogs-frankfurt-2025" element={<PublicTransportFrankfurt />} />
            <Route path="/blog/public-transport-with-dogs-munich-2025" element={<PublicTransportMunich />} />
            <Route path="/blog/public-transport-with-dogs-stuttgart-2025" element={<PublicTransportStuttgart />} />
            <Route path="/blog/pet-sitting-germany-2025" element={<PetSittingGermany />} />
            <Route path="/blog/pet-insurance-germany-2025" element={<PetInsuranceGermany />} />
            <Route path="/blog/german-dog-etiquette-rules" element={<GermanDogEtiquette />} />
            <Route path="/guides/pet-emergency-germany" element={<PetEmergencyGermany />} />
            <Route path="/guides/emergency-vets-berlin" element={<EmergencyVetsBerlin />} />

            <Route path="/vets/:city" element={<CityVets />} />
            <Route path="/vets/:city/:district" element={<DistrictVets />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
