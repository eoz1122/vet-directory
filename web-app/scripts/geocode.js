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
    console.log(`Querying: ${query}`);

    // Add &email= param to be nice to Nominatim
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&email=info@example.com`;

    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'VetDirectoryBuildBot/1.0'
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
                    console.error("JSON Parse Error:", e);
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => {
            console.error("Request Error:", e);
            resolve(null)
        });
        req.end();
    });
}

async function runGeocoding() {
    console.log("Starting Geocoding Process...");

    // Read fresh
    let vets = JSON.parse(fs.readFileSync(VETS_DB_PATH, 'utf-8'));
    let updatedCount = 0;

    // Process only first 20 for speed in this demo run, or all if feasible. 
    // Let's do a loop that saves every time.
    for (let i = 0; i < vets.length; i++) {
        const vet = vets[i];

        // Skip if already valid
        if (vet.coordinates.lat !== 0) {
            continue;
        }

        const cleanAddress = vet.address.split('(')[0].replace('*Mobile Service*', '').trim();
        if (cleanAddress.includes("Mobile Service") || cleanAddress.includes("Unknown")) continue;

        const coords = await fetchCoordinates(cleanAddress, vet.city);

        if (coords) {
            console.log(`[${i}/${vets.length}] UPDATED: ${vet.practice_name} -> ${coords.lat}, ${coords.lng}`);
            vet.coordinates = coords;
            updatedCount++;

            // SAVE IMMEDIATELY
            fs.writeFileSync(VETS_DB_PATH, JSON.stringify(vets, null, 2), 'utf-8');
        } else {
            console.log(`[${i}/${vets.length}] FAILED: ${vet.practice_name}`);
        }

        // Polite delay
        await delay(1000);
    }

    console.log("Done.");
}

runGeocoding();
