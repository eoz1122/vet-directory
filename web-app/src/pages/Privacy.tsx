import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#F5EBE0] font-sans text-primary">
            {/* Header */}
            {/* Header */}
            <Header />

            <main className="max-w-3xl mx-auto p-6 md:p-12">
                <h1 className="text-4xl font-bold text-primary mb-8">Datenschutzerklärung / Privacy Policy</h1>

                <div className="prose prose-stone max-w-none text-primary/90 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">1. Datenschutz auf einen Blick</h2>
                        <h3 className="text-lg font-bold mb-2">Allgemeine Hinweise</h3>
                        <p className="text-sm">
                            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert,
                            wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">2. Datenerfassung auf dieser Website</h2>

                        <h3 className="text-lg font-bold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                        <p className="text-sm mb-4">
                            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
                            „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
                        </p>

                        <h3 className="text-lg font-bold mb-2">Wie erfassen wir Ihre Daten?</h3>
                        <p className="text-sm mb-4">
                            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln,
                            die Sie in ein Kontaktformular eingeben.
                        </p>
                        <p className="text-sm mb-4">
                            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.
                            Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                            Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                        </p>

                        <h3 className="text-lg font-bold mb-2">Wofür nutzen wir Ihre Daten?</h3>
                        <p className="text-sm mb-4">
                            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                            Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                        </p>

                        <h3 className="text-lg font-bold mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                        <p className="text-sm">
                            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.
                            Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                            Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">3. Hosting</h2>
                        <p className="text-sm">
                            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                        </p>
                        <p className="text-sm mt-4">
                            <strong>Hostinger International Ltd.</strong><br />
                            61 Lordou Vironos Street<br />
                            6023 Larnaca<br />
                            Cyprus
                        </p>
                        <p className="text-sm mt-4">
                            Wenn Sie unsere Website besuchen, erfasst der Hoster automatisch verschiedene Logfiles inklusive Ihrer IP-Adressen.
                            Die Verwendung des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO)
                            und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
                        </p>
                        <p className="text-sm mt-4">
                            Weitere Informationen finden Sie in der Datenschutzerklärung von Hostinger:
                            <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                                https://www.hostinger.com/privacy-policy
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">4. Allgemeine Hinweise und Pflichtinformationen</h2>

                        <h3 className="text-lg font-bold mb-2">Datenschutz</h3>
                        <p className="text-sm mb-4">
                            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich
                            und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                        </p>

                        <h3 className="text-lg font-bold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                        <p className="text-sm mb-4">
                            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                        </p>
                        <p className="text-sm mb-4">
                            <strong>Ali Emre Ozen</strong><br />
                            Fritz-Reuter-Str. 27A<br />
                            13156 Berlin<br />
                            Germany
                        </p>
                        <p className="text-sm mb-4">
                            E-Mail: <a href="mailto:contact@englishspeakinggermany.online" className="text-accent hover:underline">contact@englishspeakinggermany.online</a><br />
                            Telefon: +49 163 0291901
                        </p>
                        <p className="text-sm">
                            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel
                            der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">5. Datenerfassung auf dieser Website</h2>

                        <h3 className="text-lg font-bold mb-2">Server-Log-Dateien</h3>
                        <p className="text-sm mb-4">
                            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                            die Ihr Browser automatisch an uns übermittelt. Dies sind:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                            <li>Browsertyp und Browserversion</li>
                            <li>verwendetes Betriebssystem</li>
                            <li>Referrer URL</li>
                            <li>Hostname des zugreifenden Rechners</li>
                            <li>Uhrzeit der Serveranfrage</li>
                            <li>IP-Adresse</li>
                        </ul>
                        <p className="text-sm">
                            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                            Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                        </p>

                        <h3 className="text-lg font-bold mb-2 mt-6">Kontaktformular</h3>
                        <p className="text-sm mb-4">
                            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten
                            zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                        </p>
                        <p className="text-sm">
                            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt
                            oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse
                            an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">6. Ihre Rechte</h2>
                        <p className="text-sm mb-4">Sie haben folgende Rechte:</p>
                        <ul className="list-disc pl-5 text-sm space-y-2">
                            <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
                            <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.</li>
                            <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten verlangen.</li>
                            <li><strong>Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.</li>
                            <li><strong>Datenübertragbarkeit:</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
                            <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer personenbezogenen Daten jederzeit widersprechen.</li>
                            <li><strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">7. Google Analytics</h2>
                        <p className="text-sm mb-4">
                            Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
                        </p>
                        <p className="text-sm mb-4">
                            Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z.B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten werden von Google ggf. in einem Profil zusammengefasst, das dem jeweiligen Nutzer bzw. dessen Endgerät zugeordnet ist.
                        </p>
                        <p className="text-sm mb-4">
                            Die Nutzung von Google Analytics erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Analyse des Nutzerverhaltens, um sowohl sein Webangebot als auch seine Werbung zu optimieren.
                        </p>
                        <p className="text-sm mb-4">
                            <strong>IP-Anonymisierung:</strong> Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt.
                        </p>
                        <p className="text-sm">
                            Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google:
                            <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                                https://support.google.com/analytics/answer/6004245
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">8. Google Maps</h2>
                        <p className="text-sm mb-4">
                            Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
                        </p>
                        <p className="text-sm mb-4">
                            Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google
                            in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.
                        </p>
                        <p className="text-sm">
                            Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns
                            auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
                        </p>
                        <p className="text-sm mt-4">
                            Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                                https://policies.google.com/privacy
                            </a>
                        </p>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}
