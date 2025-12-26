import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VETS_DATA_PATH = path.resolve(__dirname, '../src/data/vets.json');

const vets = JSON.parse(fs.readFileSync(VETS_DATA_PATH, 'utf-8'));

function cleanDistrict(vet) {
    let name = vet.practice_name || "";
    let district = vet.district || "";
    let address = vet.address || "";

    // 1. If district looks like a person's name or address part
    const suspiciousPatterns = [
        /^Dr\./i,
        /^(Dr\.|med\.|vet\.|Dipl\.|Psych\.)/i,
        /straße$/i,
        /str\.$/i,
        /^\d+$/,
        /,/,
        /\(/,
        /\)/,
        /\//
    ];

    let isSuspicious = suspiciousPatterns.some(pattern => pattern.test(district));

    // Also check for common names or parts that shouldn't be districts
    if (district.split(' ').length > 3) isSuspicious = true;

    if (isSuspicious) {
        console.log(`Suspicious district found: "${district}" for vet: "${name}"`);

        // Try to infer from practice name
        const commonDistricts = [
            "Sachsenhausen", "Bornheim", "Westend", "Nordend", "St. Pauli", "Altona", "Eppendorf",
            "Eimsbüttel", "Mitte", "Prenzlauer Berg", "Kreuzberg", "Neukölln", "Sülldorf", "Wilmersdorf",
            "Charlottenburg", "Zehlendorf", "Steglitz", "Wedding", "Pankow", "Lichtenberg", "Köpenick"
        ];

        let found = false;
        for (const cd of commonDistricts) {
            if (name.includes(cd) || address.includes(cd)) {
                vet.district = cd;
                console.log(`  -> Fixed to: "${cd}"`);
                found = true;
                break;
            }
        }

        if (!found) {
            // Check if address has something in parentheses at the end
            const parenMatch = address.match(/\(([^)]+)\)$/);
            if (parenMatch) {
                vet.district = parenMatch[1];
                console.log(`  -> Fixed from address: "${vet.district}"`);
            } else {
                vet.district = "Unknown";
                console.log(`  -> Set to Unknown`);
            }
        }
    }

    // Final check for specific user mentions
    if (district.includes("Jan Kullen") || district.includes("Elena Panova")) {
        vet.district = name.includes("Sachsenhausen") ? "Sachsenhausen" : "Unknown";
    }
}

vets.forEach(cleanDistrict);

fs.writeFileSync(VETS_DATA_PATH, JSON.stringify(vets, null, 2));
console.log("Cleanup complete.");
