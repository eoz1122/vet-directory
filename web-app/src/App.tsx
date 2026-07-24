import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';

// Critical routes - load immediately
const Home = lazy(() => import('./pages/Home'));

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
const NotFound = lazy(() => import('./pages/NotFound'));
const VetCostsGermany = lazy(() => import('./pages/VetCostsGermany'));
const NeuteringCostsGermany = lazy(() => import('./pages/NeuteringCostsGermany'));
const VaccinationCostsGermany = lazy(() => import('./pages/VaccinationCostsGermany'));
const TierheimAdoptionGermany = lazy(() => import('./pages/TierheimAdoptionGermany'));
const PuppyFirstYearGermany = lazy(() => import('./pages/PuppyFirstYearGermany'));
const NewPetChecklistGermany = lazy(() => import('./pages/NewPetChecklistGermany'));
const PetGpsTrackerGermany = lazy(() => import('./pages/PetGpsTrackerGermany'));
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
const PetEmergencyMunich = lazy(() => import('./pages/PetEmergencyMunich'));
const PetEmergencyFrankfurt = lazy(() => import('./pages/PetEmergencyFrankfurt'));
const PetMedicationGermany = lazy(() => import('./pages/PetMedicationGermany'));
const PetFoodGermany = lazy(() => import('./pages/PetFoodGermany'));
const CatFoodGermany = lazy(() => import('./pages/CatFoodGermany'));
const VetAccessReport = lazy(() => import('./pages/VetAccessReport'));
const Admin = lazy(() => import('./pages/Admin'));
const FirstVetVisitGermany = lazy(() => import('./pages/FirstVetVisitGermany'));
const EmergencyVetBerlinGuide = lazy(() => import('./pages/EmergencyVetBerlinGuide'));
const BreedRestrictionsGermany = lazy(() => import('./pages/BreedRestrictionsGermany'));
const PublicTransportCologne = lazy(() => import('./pages/PublicTransportCologne'));
const CatMicrochippingGermany = lazy(() => import('./pages/CatMicrochippingGermany'));
const TickSeasonGermanyPets = lazy(() => import('./pages/TickSeasonGermanyPets'));
const EmergencyVetHamburgGuide = lazy(() => import('./pages/EmergencyVetHamburgGuide'));
const BestDogParksBerlin = lazy(() => import('./pages/BestDogParksBerlin'));

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
        <GoogleAnalyticsTracker />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/german-vet-survival-kit-phrases" element={<GermanVetPhrases />} />
            <Route path="/quality-promise" element={<QualityPromise />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/moving-to-germany-with-pet" element={<MovingWithPetChecklist />} />
            <Route path="/blog/cat-registration-germany" element={<CatRegistrationGermany />} />
            <Route path="/blog/eu-pet-passport-germany" element={<EUPetPassport />} />
            <Route path="/blog/hundesteuer-dog-tax-germany" element={<DogTaxGermany />} />
            <Route path="/blog/pet-friendly-apartments-germany" element={<PetFriendlyApartments />} />
            <Route path="/blog/public-transport-with-dogs-berlin" element={<PublicTransportBerlin />} />
            <Route path="/blog/public-transport-with-dogs-hamburg" element={<PublicTransportHamburg />} />
            <Route path="/blog/public-transport-with-dogs-frankfurt" element={<PublicTransportFrankfurt />} />
            <Route path="/blog/public-transport-with-dogs-munich" element={<PublicTransportMunich />} />
            <Route path="/blog/public-transport-with-dogs-stuttgart" element={<PublicTransportStuttgart />} />
            <Route path="/blog/pet-sitting-germany" element={<PetSittingGermany />} />
            <Route path="/blog/pet-insurance-germany" element={<PetInsuranceGermany />} />
            <Route path="/blog/german-dog-etiquette-rules" element={<GermanDogEtiquette />} />
            <Route path="/guides/pet-emergency-germany" element={<PetEmergencyGermany />} />
            <Route path="/guides/emergency-vets-berlin" element={<EmergencyVetBerlinGuide />} />
            <Route path="/guides/emergency-vets-munich" element={<PetEmergencyMunich />} />
            <Route path="/guides/emergency-vets-hamburg" element={<Navigate replace to="/blog/emergency-vet-hamburg-english" />} />
            <Route path="/guides/emergency-vets-frankfurt" element={<PetEmergencyFrankfurt />} />
            <Route path="/blog/pet-medication-germany-guide" element={<PetMedicationGermany />} />
            <Route path="/blog/best-dog-food-germany" element={<PetFoodGermany />} />
            <Route path="/blog/best-cat-food-germany" element={<CatFoodGermany />} />
            <Route path="/english-speaking-vet-access-germany" element={<VetAccessReport />} />
            <Route path="/blog/first-vet-visit-germany" element={<FirstVetVisitGermany />} />
            <Route path="/blog/emergency-vet-berlin-english" element={<Navigate replace to="/guides/emergency-vets-berlin" />} />
            <Route path="/blog/breed-restrictions-germany" element={<BreedRestrictionsGermany />} />
            <Route path="/blog/public-transport-with-dogs-cologne" element={<PublicTransportCologne />} />
            <Route path="/blog/cat-microchipping-germany" element={<CatMicrochippingGermany />} />
            <Route path="/blog/tick-season-germany-pets" element={<TickSeasonGermanyPets />} />
            <Route path="/blog/emergency-vet-hamburg-english" element={<EmergencyVetHamburgGuide />} />
            <Route path="/blog/best-dog-parks-berlin" element={<BestDogParksBerlin />} />
            <Route path="/blog/vet-costs-germany" element={<VetCostsGermany />} />
            <Route path="/blog/neutering-cost-germany" element={<NeuteringCostsGermany />} />
            <Route path="/blog/pet-vaccination-costs-germany" element={<VaccinationCostsGermany />} />
            <Route path="/blog/adopting-pet-tierheim-germany" element={<TierheimAdoptionGermany />} />
            <Route path="/blog/puppy-first-year-germany" element={<PuppyFirstYearGermany />} />
            <Route path="/blog/new-pet-checklist-germany" element={<NewPetChecklistGermany />} />
            <Route path="/blog/pet-gps-tracker-germany" element={<PetGpsTrackerGermany />} />

            <Route path="/vets/:city" element={<CityVets />} />
            <Route path="/vets/:city/:district" element={<DistrictVets />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
