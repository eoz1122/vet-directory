import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const scriptsRoot = path.resolve(process.cwd(), 'scripts');
const retiredScripts = [
    'audit_frankfurt.py',
    'audit_urls.py',
    'cleanup-vets.js',
    'cleanup_vets_v2.py',
    'fix_db.py',
    'geocode.js',
    'maintenance.js',
    'sync_vets_data.py',
];

function operationalScripts() {
    return fs.readdirSync(scriptsRoot)
        .filter((name) => /\.(?:js|mjs|py|sh)$/.test(name))
        .filter((name) => !/\.test\.[^.]+$/.test(name))
        .map((name) => ({
            name,
            source: fs.readFileSync(path.join(scriptsRoot, name), 'utf8'),
        }));
}

describe('maintenance script safety', () => {
    it('does not retain superseded one-off database scripts', () => {
        const existing = retiredScripts.filter((name) => fs.existsSync(path.join(scriptsRoot, name)));
        expect(existing).toEqual([]);
    });

    it('does not depend on developer-specific paths or simulated health results', () => {
        const violations = operationalScripts().flatMap(({ name, source }) => {
            const reasons = [];
            if (/[A-Z]:\\Users\\/i.test(source)) reasons.push('hard-coded Windows user path');
            if (/Math\.random\(|mock (?:check|diff|OSM)|Integrity: 99%/i.test(source)) {
                reasons.push('simulated maintenance result');
            }
            return reasons.map((reason) => `${name}: ${reason}`);
        });

        expect(violations).toEqual([]);
    });
});
