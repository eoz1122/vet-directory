import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('semantic accent colors', () => {
    it('uses the accessible accent for links on light page surfaces', () => {
        const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8');

        expect(css).toContain(':where(main, header) a.text-accent');
        expect(css).toContain('color: var(--color-accent-ink)');
        expect(css).toContain('a.hover\\:text-accent:hover');
    });
});
