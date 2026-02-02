import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT_FILE = path.resolve(__dirname, '../src/data/vets.json');
const OUTPUT_FILE = path.resolve(__dirname, '../vets-database-internal.csv');

try {
    const data = fs.readFileSync(INPUT_FILE, 'utf8');
    const vets = JSON.parse(data);

    if (!Array.isArray(vets) || vets.length === 0) {
        console.error('No vets data found.');
        process.exit(1);
    }

    // CSV Headers
    const headers = [
        'ID',
        'Practice Name',
        'City',
        'District',
        'Address',
        'Latitude',
        'Longitude',
        'Phone',
        'Website',
        'Verification Status',
        'Last Verified',
        'English Signals'
    ];

    // Convert to CSV lines
    const csvContent = [
        headers.join(','), // Header row
        ...vets.map(vet => {
            // Helper to escape CSV values (quotes, commas)
            const escape = (val) => {
                if (val === null || val === undefined) return '';
                const str = String(val);
                if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            };

            return [
                escape(vet.id),
                escape(vet.practice_name),
                escape(vet.city),
                escape(vet.district),
                escape(vet.address),
                escape(vet.coordinates?.lat),
                escape(vet.coordinates?.lng),
                escape(vet.contact?.phone),
                escape(vet.contact?.website),
                escape(vet.community_status || 'Unverified'),
                escape(vet.verification?.last_scanned),
                escape(vet.verification?.english_signals?.join('; '))
            ].join(',');
        })
    ].join('\n');

    fs.writeFileSync(OUTPUT_FILE, csvContent);
    console.log(`✅ Database exported to ${OUTPUT_FILE} (${vets.length} records)`);

} catch (err) {
    console.error('Error generating CSV database:', err);
    process.exit(1);
}
