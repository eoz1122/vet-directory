import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('global keyboard focus visibility', () => {
    it('uses a dual-ring focus indicator that remains visible on light and dark surfaces', () => {
        const css = fs.readFileSync(path.resolve(process.cwd(), 'src/index.css'), 'utf8');

        expect(css).toContain(':focus-visible');
        expect(css).toContain('outline: 3px solid #fff');
        expect(css).toContain('box-shadow: 0 0 0 6px var(--color-primary)');
    });
});
