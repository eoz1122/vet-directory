import { Link } from 'react-router-dom';

export default function Impressum() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#F5EBE0]/90 backdrop-blur-md border-b border-primary/10 p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <img src="/logo.png" alt="EnglishSpeakingVets Logo" className="h-16 w-auto" />
                        <span>EnglishSpeaking<span className="text-accent">Vets</span></span>
                    </Link>
                    <Link to="/" className="text-sm font-semibold hover:text-accent transition-colors">
                        ← Back to Directory
                    </Link>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6 md:p-12">
                <h1 className="text-4xl font-bold text-primary mb-8">Impressum</h1>

                <div className="prose prose-stone max-w-none text-primary/90 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Angaben gemäß § 5 TMG</h2>
                        <p className="mb-2">
                            <strong>Ali Emre Ozen</strong><br />
                            Fritz-Reuter-Str. 27A<br />
                            13156 Berlin<br />
                            Germany
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Kontakt</h2>
                        <p className="mb-2">
                            <strong>E-Mail:</strong> <a href="mailto:contact@englishspeakinggermany.online" className="text-accent hover:underline">contact@englishspeakinggermany.online</a><br />
                            <strong>Telefon:</strong> +49 163 0291901
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                        <p className="mb-2">
                            Ali Emre Ozen<br />
                            Fritz-Reuter-Str. 27A<br />
                            13156 Berlin
                        </p>
                    </section>

                    {/* Uncomment if you have a VAT ID */}
                    {/* 
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Umsatzsteuer-ID</h2>
                        <p className="mb-2">
                            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                            <strong>DE [Your VAT ID]</strong>
                        </p>
                    </section>
                    */}

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">EU-Streitschlichtung</h2>
                        <p className="text-sm">
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                                https://ec.europa.eu/consumers/odr/
                            </a>.<br />
                            Unsere E-Mail-Adresse finden Sie oben im Impressum.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
                        <p className="text-sm">
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Haftung für Inhalte</h2>
                        <p className="text-sm">
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                            oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </p>
                        <p className="text-sm mt-4">
                            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Haftung für Links</h2>
                        <p className="text-sm">
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        </p>
                        <p className="text-sm mt-4">
                            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Urheberrecht</h2>
                        <p className="text-sm">
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                    </section>

                </div>
            </main>

            <footer className="bg-primary text-secondary py-12 text-center text-sm mt-12">
                <div className="max-w-4xl mx-auto px-4 space-y-6">
                    <div className="flex justify-center gap-6 font-semibold flex-wrap">
                        <Link to="/about" className="hover:text-accent transition-colors">About</Link>
                        <Link to="/quality-promise" className="hover:text-accent transition-colors">Quality Promise</Link>
                        <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                        <Link to="/impressum" className="hover:text-accent transition-colors">Impressum</Link>
                        <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                    </div>
                    <p className="opacity-60">© 2025 EnglishSpeakingVets.online • Made with ❤️ for pets.</p>
                </div>
            </footer>
        </div>
    );
}
