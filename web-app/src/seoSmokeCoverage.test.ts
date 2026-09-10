import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('production SEO smoke coverage', () => {
    it('checks the restricted-dog relocation guide as a canonical route', () => {
        const scriptPath = resolve(process.cwd(), 'scripts/seo-smoke-test.sh');
        const script = readFileSync(scriptPath, 'utf8');

        expect(script).toContain('"/blog/moving-to-germany-with-restricted-dog"');
    });
});
