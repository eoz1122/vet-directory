import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-primary text-secondary py-12 text-center text-sm mt-auto border-t border-primary/10">
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                <nav className="flex justify-center gap-4 md:gap-6 font-semibold flex-wrap">
                    <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1 justify-center"><span>🐾</span> Directory</Link>
                    <Link to="/about" className="hover:text-accent transition-colors">About Our Pack</Link>
                    <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality Promise</Link>
                    <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    <div className="w-full md:w-auto md:hidden"></div> {/* Break on mobile if needed */}
                    <Link to="/impressum" className="hover:text-accent transition-colors opacity-80 font-normal">Impressum</Link>
                    <Link to="/privacy" className="hover:text-accent transition-colors opacity-80 font-normal">Privacy</Link>
                </nav>
                <p className="opacity-60 text-xs md:text-sm">
                    © 2025 EnglishSpeakingVets.online • Made with ❤️ for pets.
                </p>
            </div>
        </footer>
    );
}
