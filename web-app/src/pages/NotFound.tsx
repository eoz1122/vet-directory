import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-secondary font-sans text-primary flex flex-col">
            <Helmet>
                <title>Page Not Found | EnglishSpeakingVets</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <Header />

            <main className="max-w-2xl mx-auto p-6 md:p-12 text-center flex-1 flex flex-col justify-center">
                <p className="text-7xl mb-6" aria-hidden="true">🐾</p>
                <h1 className="text-4xl md:text-5xl font-black text-primary mb-4">Page not found</h1>
                <p className="text-lg text-primary/70 mb-10 leading-relaxed">
                    This page doesn't exist or has moved. The vets are all still here, though.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Link to="/" className="inline-block bg-primary text-secondary font-bold py-3 px-8 rounded-2xl hover:bg-black transition-all">
                        Browse the directory
                    </Link>
                    <Link to="/blog" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-2xl border border-primary/10 hover:border-accent/40 transition-all">
                        Read the guides
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
