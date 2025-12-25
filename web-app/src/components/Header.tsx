import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="sticky top-0 z-10 bg-[#F5EBE0]/90 backdrop-blur-md border-b border-primary/10 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
                    <img src="/logo.png" alt="EnglishSpeakingVets - Find an English Speaking Vet in Germany" className="h-14 md:h-16 w-auto transition-transform group-hover:scale-105" />
                    <div className="flex flex-col leading-none">
                        <span className="hidden sm:inline text-primary font-bold text-lg uppercase tracking-tight">English Speaking</span>
                        <span className="hidden sm:inline text-accent font-bold text-2xl uppercase tracking-tighter">Vets</span>
                        {/* Mobile Logo Text Optimization */}
                        <span className="sm:hidden text-primary font-bold text-lg">ES<span className="text-accent">Vets</span></span>
                    </div>
                </Link>

                <nav className="flex gap-3 md:gap-6 text-xs md:text-sm font-semibold text-primary/80 items-center">
                    <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1 text-accent">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12,2C10.89,2 10,2.89 10,4C10,5.11 10.89,6 12,6C13.11,6 14,5.11 14,4C14,2.89 13.11,2 12,2M7,7C5.89,7 5,7.89 5,9C5,10.11 5.89,11 7,11C8.11,11 9,10.11 9,9C9,7.89 8.11,7 7,7M17,7C15.89,7 15,7.89 15,9C15,10.11 15.89,11 17,11C18.11,11 19,10.11 19,9C19,7.89 18.11,7 17,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9M12,17C9.24,17 7,19.24 7,22H17C17,19.24 14.76,17 12,17Z" />
                        </svg>
                        <span className="text-primary/80 hover:text-accent">Directory</span>
                    </Link>
                    <Link to="/blog" className="hover:text-accent transition-colors">Guides</Link>
                    <Link to="/about" className="hover:text-accent transition-colors hidden md:block">About</Link>
                    <Link to="/quality-promise" className="hover:text-accent transition-colors hidden md:block">Quality</Link>
                    <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                </nav>
            </div>
        </header>
    );
}
