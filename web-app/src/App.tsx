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
import Impressum from './pages/Impressum';
import Privacy from './pages/Privacy';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quality-promise" element={<QualityPromise />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/moving-to-germany-with-pet-2025" element={<MovingWithPetChecklist />} />
          <Route path="/blog/cat-registration-germany-2025" element={<CatRegistrationGermany />} />
          <Route path="/blog/eu-pet-passport-germany-2025" element={<EUPetPassport />} />
          <Route path="/blog/hundesteuer-dog-tax-germany-2025" element={<DogTaxGermany />} />
          <Route path="/vets/:city" element={<CityVets />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
