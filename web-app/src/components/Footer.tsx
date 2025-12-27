import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-primary text-secondary py-12 text-center text-sm mt-auto border-t border-primary/10">
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                <nav className="flex justify-center gap-6 md:gap-10 font-bold flex-wrap uppercase tracking-wide text-sm md:text-base">
                    <Link to="/" className="hover:text-accent transition-colors flex items-center gap-2 justify-center">
                        <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,2C10.89,2 10,2.89 10,4C10,5.11 10.89,6 12,6C13.11,6 14,5.11 14,4C14,2.89 13.11,2 12,2M7,7C5.89,7 5,7.89 5,9C5,10.11 5.89,11 7,11C8.11,11 9,10.11 9,9C9,7.89 8.11,7 7,7M17,7C15.89,7 15,7.89 15,9C15,10.11 15.89,11 17,11C18.11,11 19,10.11 19,9C19,7.89 18.11,7 17,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9M12,17C9.24,17 7,19.24 7,22H17C17,19.24 14.76,17 12,17Z" />
                        </svg>
                        Directory
                    </Link>
                    <Link to="/blog" className="hover:text-accent transition-colors">Guides</Link>
                    <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                    <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality</Link>
                    <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                    <div className="w-full md:w-auto md:hidden"></div> {/* Break on mobile if needed */}
                    <Link to="/impressum" className="hover:text-accent transition-colors opacity-80 font-normal">Impressum</Link>
                    <Link to="/privacy" className="hover:text-accent transition-colors opacity-80 font-normal">Privacy</Link>
                </nav>
                <p className="opacity-60 text-[10px] md:text-xs leading-relaxed max-w-2xl mx-auto italic">
                    <strong>Affiliate Disclosure:</strong> Some of the links on this website are affiliate links, meaning, at no additional cost to you, we may earn a commission if you click through and make a purchase. This helps us keep the directory free for everyone.
                </p>
                <p className="opacity-60 text-xs md:text-sm">
                    © 2025 EnglishSpeakingVets Germany • Made with ❤️ for pets.
                </p>
            </div>
        </footer>
    );
}
