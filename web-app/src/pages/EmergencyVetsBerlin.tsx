import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function EmergencyVetsBerlin() {
    return (
        <>
            <Helmet>
                <title>24/7 Emergency Vets in Berlin | English-Speaking Emergency Care</title>
                <meta name="description" content="Complete guide to 24/7 emergency veterinary clinics in Berlin with English-speaking staff. Verified addresses, phone numbers, and what to expect." />
                <meta name="keywords" content="emergency vet Berlin, 24/7 veterinary Berlin, pet emergency Zehlendorf, Tiernotdienst Berlin, English vet emergency" />
            </Helmet>

            <div className="min-h-screen bg-cream-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <nav className="text-sm text-gray-600 mb-6">
                        <Link to="/guides/pet-emergency-germany" className="hover:text-forest-600">← Back to Main Emergency Guide</Link>
                    </nav>

                    <article className="prose prose-lg max-w-none">
                        <h1 className="text-4xl font-bold text-forest-800 mb-6">🚨 Emergency Vets in Berlin: 24/7 Care When You Need It</h1>

                        <p className="text-xl text-gray-700 mb-8">
                            When your pet needs emergency care in Berlin, every second counts. This guide lists all verified 24/7 emergency veterinary clinics in Berlin with English-speaking staff.
                        </p>

                        <h2 className="text-3xl font-bold text-forest-700 mt-12 mb-8">🏥 24/7 Emergency Veterinary Clinics in Berlin</h2>

                        {/* Valera */}
                        <div className="bg-white border-2 border-forest-300 rounded-lg p-8 mb-8 shadow-md">
                            <h3 className="text-2xl font-bold text-forest-800 mb-4">Valera Veterinary Clinic</h3>
                            <div className="space-y-3 mb-6">
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📍</span>
                                    <span className="text-lg"><strong>Potsdamer Str. 23/24, 14163 Berlin (Zehlendorf)</strong></span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📞</span>
                                    <a href="tel:+493020180575" className="text-lg text-blue-600 hover:underline font-bold">030 20 1805 750</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">🌐</span>
                                    <a href="https://www.valeratierklinikberlin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.valeratierklinikberlin.com</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-green-600 mr-3 text-xl">🕒</span>
                                    <span className="text-lg font-bold text-green-700">24/7 emergency care</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-blue-600 mr-3 text-xl">✅</span>
                                    <span className="text-lg text-blue-700 font-semibold">Verified English-speaking staff</span>
                                </p>
                            </div>
                            <div className="bg-forest-50 p-4 rounded">
                                <h4 className="font-bold text-forest-800 mb-2">Services:</h4>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    <li>Emergency surgery</li>
                                    <li>Intensive care</li>
                                    <li>Advanced diagnostics</li>
                                    <li>24/7 availability</li>
                                </ul>
                            </div>
                        </div>

                        {/* Bärenwiese */}
                        <div className="bg-white border-2 border-forest-300 rounded-lg p-8 mb-8 shadow-md">
                            <h3 className="text-2xl font-bold text-forest-800 mb-4">Tierarzt Bärenwiese (Emergency)</h3>
                            <div className="space-y-3 mb-6">
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📍</span>
                                    <span className="text-lg"><strong>Uhlandstraße 151, 10719 Berlin (Wilmersdorf)</strong></span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📞</span>
                                    <a href="tel:+491741601606" className="text-lg text-blue-600 hover:underline font-bold">0174 160 160 6</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">🌐</span>
                                    <a href="https://tierarzt-baerenwiese.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">tierarzt-baerenwiese.de</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-green-600 mr-3 text-xl">🕒</span>
                                    <span className="text-lg font-bold text-green-700">24/7 emergency service</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-blue-600 mr-3 text-xl">✅</span>
                                    <span className="text-lg text-blue-700 font-semibold">Verified English-speaking staff</span>
                                </p>
                            </div>
                            <div className="bg-forest-50 p-4 rounded">
                                <h4 className="font-bold text-forest-800 mb-2">Services:</h4>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    <li>Emergency consultations</li>
                                    <li>Urgent care</li>
                                    <li>After-hours service</li>
                                    <li>English-speaking veterinarians</li>
                                </ul>
                            </div>
                        </div>

                        {/* Rödiger */}
                        <div className="bg-white border-2 border-forest-300 rounded-lg p-8 mb-8 shadow-md">
                            <h3 className="text-2xl font-bold text-forest-800 mb-4">The Berlin Veterinary Center (Tierarztpraxis Rödiger)</h3>
                            <div className="space-y-3 mb-6">
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📍</span>
                                    <span className="text-lg"><strong>Scharnweberstraße 136, 13405 Berlin (Reinickendorf)</strong></span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📞</span>
                                    <a href="tel:+493040939990" className="text-lg text-blue-600 hover:underline font-bold">030 409 399 90</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">🌐</span>
                                    <a href="https://www.vetzentrum-berlin.de/en/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.vetzentrum-berlin.de/en</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-green-600 mr-3 text-xl">🕒</span>
                                    <span className="text-lg font-bold text-green-700">24/7 emergency care</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-blue-600 mr-3 text-xl">✅</span>
                                    <span className="text-lg text-blue-700 font-semibold">Verified English-speaking staff</span>
                                </p>
                            </div>
                            <div className="bg-forest-50 p-4 rounded">
                                <h4 className="font-bold text-forest-800 mb-2">Services:</h4>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    <li>Full emergency services</li>
                                    <li>Surgical capabilities</li>
                                    <li>Internal medicine</li>
                                    <li>24/7 emergency hotline</li>
                                </ul>
                            </div>
                        </div>

                        {/* FU Berlin */}
                        <div className="bg-white border-2 border-forest-300 rounded-lg p-8 mb-8 shadow-md">
                            <h3 className="text-2xl font-bold text-forest-800 mb-4">Freie Universität Berlin – Small Animal Clinic</h3>
                            <div className="space-y-3 mb-6">
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📍</span>
                                    <span className="text-lg"><strong>Oertzenweg 19b, 14163 Berlin (Düppel/Zehlendorf)</strong></span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📞</span>
                                    <a href="tel:+493083862356" className="text-lg text-blue-600 hover:underline font-bold">030 83 86 23 56</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">🌐</span>
                                    <a href="https://www.vetmed.fu-berlin.de/einrichtungen/kliniken/we20/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.vetmed.fu-berlin.de</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-green-600 mr-3 text-xl">🕒</span>
                                    <span className="text-lg font-bold text-green-700">24/7 emergency service</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-blue-600 mr-3 text-xl">✅</span>
                                    <span className="text-lg text-blue-700 font-semibold">Verified English-speaking staff</span>
                                </p>
                            </div>
                            <div className="bg-forest-50 p-4 rounded">
                                <h4 className="font-bold text-forest-800 mb-2">Services:</h4>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    <li>University veterinary hospital</li>
                                    <li>Advanced emergency care</li>
                                    <li>Specialist consultations</li>
                                    <li>Teaching hospital with experienced staff</li>
                                </ul>
                            </div>
                        </div>

                        {/* AniCura Biesdorf */}
                        <div className="bg-white border-2 border-forest-300 rounded-lg p-8 mb-8 shadow-md">
                            <h3 className="text-2xl font-bold text-forest-800 mb-4">AniCura Tierklinik Berlin-Biesdorf</h3>
                            <div className="space-y-3 mb-6">
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📍</span>
                                    <span className="text-lg"><strong>Alt-Biesdorf 22, 12683 Berlin (Biesdorf)</strong></span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">📞</span>
                                    <span className="text-lg">Contact via website</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-forest-600 mr-3 text-xl">🌐</span>
                                    <a href="https://www.anicura.de/standorte/tierklinik-berlin-biesdorf/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.anicura.de/standorte/tierklinik-berlin-biesdorf</a>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-green-600 mr-3 text-xl">🕒</span>
                                    <span className="text-lg font-bold text-green-700">24/7 emergency care</span>
                                </p>
                                <p className="flex items-start">
                                    <span className="text-blue-600 mr-3 text-xl">✅</span>
                                    <span className="text-lg text-blue-700 font-semibold">Verified English-speaking staff</span>
                                </p>
                            </div>
                            <div className="bg-forest-50 p-4 rounded">
                                <h4 className="font-bold text-forest-800 mb-2">Services:</h4>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    <li>Part of AniCura network</li>
                                    <li>Modern facilities</li>
                                    <li>Emergency and specialty care</li>
                                    <li>English-speaking team</li>
                                </ul>
                            </div>
                        </div>

                        <hr className="my-12" />

                        <h2 className="text-3xl font-bold text-forest-700 mt-12 mb-6">💰 What to Expect: Costs</h2>

                        <p className="text-lg text-gray-700 mb-6">
                            All emergency visits in Berlin follow the German GOT fee schedule:
                        </p>

                        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6">
                            <ul className="space-y-2 text-gray-800">
                                <li><strong>Mandatory Emergency Fee:</strong> €50 (applies to all after-hours visits)</li>
                                <li><strong>Consultation Fee:</strong> €46–€92 (2×–4× standard rate)</li>
                                <li className="text-xl font-bold text-amber-900">Total Minimum: €96–€142 just to walk in the door</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg my-6">
                            <h3 className="font-bold text-lg text-blue-900 mb-3">Emergency hours:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-blue-900">
                                <li>Weeknights: 6pm–8am (Monday–Friday)</li>
                                <li>Weekends: 6pm Friday–8am Monday</li>
                                <li>Public holidays: All day</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg my-6">
                            <h3 className="font-bold text-lg text-green-900 mb-3">Bring:</h3>
                            <ul className="list-disc pl-6 space-y-1 text-green-900">
                                <li>Credit/debit card (many don't accept cash)</li>
                                <li>Pet insurance details (if applicable)</li>
                                <li>Your passport/ID</li>
                            </ul>
                        </div>

                        <hr className="my-12" />

                        <h2 className="text-3xl font-bold text-forest-700 mt-12 mb-6">📞 Before You Go</h2>

                        <p className="text-lg text-gray-700 mb-6">
                            <strong>ALWAYS call ahead</strong> to:
                        </p>

                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-8">
                            <li>Confirm they're accepting emergencies</li>
                            <li>Get transport instructions</li>
                            <li>Allow them to prepare for your arrival</li>
                        </ol>

                        <div className="bg-gray-100 p-6 rounded-lg my-6">
                            <h3 className="font-bold text-lg mb-3">What to Say:</h3>
                            <p className="mb-4"><strong>English:</strong><br />"Hello, I have an emergency. My [dog/cat] is [describe symptoms]. Can I bring them in now?"</p>
                            <p><strong>German:</strong><br />"Hallo, ich habe einen Notfall. Mein [Hund/Katze] [symptoms]. Kann ich sofort vorbeikommen?"</p>
                        </div>

                        <hr className="my-12" />

                        <h2 className="text-3xl font-bold text-forest-700 mt-12 mb-6">🚨 Is It Really an Emergency?</h2>

                        <h3 className="text-2xl font-bold text-red-600 mb-4">Go to Emergency Vet NOW if:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-6">
                            <li>Difficulty breathing</li>
                            <li>Severe bleeding (won't stop after 5 minutes)</li>
                            <li>Unconsciousness or collapse</li>
                            <li>Suspected poisoning</li>
                            <li>Seizures</li>
                            <li>Hit by car or major trauma</li>
                            <li>Bloat (swollen, hard abdomen)</li>
                        </ul>

                        <h3 className="text-2xl font-bold text-amber-600 mb-4">Can Wait Until Morning:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-6">
                            <li>Mild vomiting (1-2 episodes)</li>
                            <li>Minor limping</li>
                            <li>Ear infections</li>
                            <li>Skin rashes</li>
                        </ul>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
                            <p className="text-lg text-yellow-900">
                                <strong>When in doubt, CALL first.</strong>
                            </p>
                        </div>

                        <hr className="my-12" />

                        <h2 className="text-3xl font-bold text-forest-700 mt-12 mb-6">🐾 Other Emergency Resources</h2>

                        <div className="space-y-4">
                            <div className="bg-white border-2 border-red-300 p-6 rounded-lg">
                                <h3 className="font-bold text-xl text-red-800 mb-2">Veterinary Poison Control Hotline</h3>
                                <p className="text-2xl font-bold text-red-600">📞 0551 / 19 240</p>
                                <p className="text-gray-700 mt-2">(University of Göttingen, 24/7)</p>
                            </div>

                            <div className="bg-white border-2 border-blue-300 p-6 rounded-lg">
                                <h3 className="font-bold text-xl text-blue-800 mb-2">National Emergency Vet Finder</h3>
                                <p className="text-lg">🌐 <a href="http://www.tierarzt-notdienst.de" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.tierarzt-notdienst.de</a></p>
                            </div>
                        </div>

                        <hr className="my-12" />

                        <h2 className="text-3xl font-bold text-forest-700 mt-12 mb-6">🗺️ Find These Clinics</h2>

                        <p className="text-lg text-gray-700 mb-6">
                            All emergency vets listed are verified on our <Link to="/" className="text-blue-600 hover:underline">Emergency Vet Directory</Link>. Use the "Emergency (24h)" filter to find them on the map.
                        </p>

                        <div className="bg-orange-100 border-2 border-orange-400 p-8 rounded-lg my-12">
                            <p className="text-xl font-bold text-orange-900 mb-4">
                                Save this page. Print it. Screenshot the phone numbers. Don't wait until 2am to figure out where to go.
                            </p>
                            <p className="text-2xl font-bold text-forest-700 text-center mt-6">
                                🐾 Your pet is counting on you.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
}
