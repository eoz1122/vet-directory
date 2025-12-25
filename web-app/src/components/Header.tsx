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
                    <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
                        <span>🐾</span>
                        <span>Directory</span>
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
