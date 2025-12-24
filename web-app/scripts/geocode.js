// Geocoding Script using OpenStreetMap Nominatim (Free, No Key)
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VETS_DB_PATH = path.join(__dirname, '../src/data/vets.json');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchCoordinates(address, city) {
    const query = `${address}, ${city}, Germany`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;

    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'EnglishSpeakingGermanyBot/1.0 (contact@example.com)' // Required by Nominatim
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json && json.length > 0) {
                        resolve({ lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) });
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null); // Fail gracefully
                }
            });
        });

        req.on('error', (e) => resolve(null));
        req.end();
    });
}

async function runGeocoding() {
    console.log("Starting Geocoding Process (Nominatim)...");
    let vets = JSON.parse(fs.readFileSync(VETS_DB_PATH, 'utf-8'));
    let updatedCount = 0;

    for (let i = 0; i < vets.length; i++) {
        const vet = vets[i];

        // Skip if already has coordinates
        if (vet.coordinates.lat !== 0 && vet.coordinates.lng !== 0) {
            continue;
        }

        console.log(`[${i + 1}/${vets.length}] Geocoding: ${vet.practice_name}...`);

        // Clean address for better search results (remove district parens)
        const cleanAddress = vet.address.split('(')[0].replace('*Mobile Service*', '').trim();

        if (cleanAddress.includes("Mobile Service") || cleanAddress.includes("Unknown")) {
            console.log(" -> Skipped (Mobile/Unknown)");
            continue;
        }

        const coords = await fetchCoordinates(cleanAddress, vet.city);

        if (coords) {
            console.log(` -> Found: ${coords.lat}, ${coords.lng}`);
            vet.coordinates = coords;
            updatedCount++;
        } else {
            console.log(" -> Not Found.");
        }

        // Polite delay for API
        await delay(1100);
    }

    if (updatedCount > 0) {
        fs.writeFileSync(VETS_DB_PATH, JSON.stringify(vets, null, 2), 'utf-8');
        console.log(`\nSuccess! Updated coordinates for ${updatedCount} practices.`);
    } else {
        console.log("\nNo new coordinates found or required.");
    }
}

runGeocoding();
