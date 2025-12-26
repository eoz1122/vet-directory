import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import QualityPromise from './pages/QualityPromise';
import About from './pages/About';
import Contact from './pages/Contact';
import MovingWithPetChecklist from './pages/MovingWithPetChecklist';
import CatRegistrationGermany from './pages/CatRegistrationGermany';
import EUPetPassport from './pages/EUPetPassport';
import DogTaxGermany from './pages/DogTaxGermany';
import CityVets from './pages/CityVets';
import DistrictVets from './pages/DistrictVets';
import Impressum from './pages/Impressum';
import Privacy from './pages/Privacy';
import CookieConsent from './components/CookieConsent';
import PetFriendlyApartments from './pages/PetFriendlyApartments';

import PublicTransportBerlin from './pages/PublicTransportBerlin';
import PublicTransportHamburg from './pages/PublicTransportHamburg';
import PublicTransportFrankfurt from './pages/PublicTransportFrankfurt';
import PublicTransportMunich from './pages/PublicTransportMunich';
import PublicTransportStuttgart from './pages/PublicTransportStuttgart';
import PetSittingGermany from './pages/PetSittingGermany';
import Blog from './pages/Blog';
import GermanVetPhrases from './pages/GermanVetPhrases';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
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
          <Route path="/vets/:city" element={<CityVets />} />
          <Route path="/vets/:city/:district" element={<DistrictVets />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
