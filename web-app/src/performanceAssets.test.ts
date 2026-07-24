import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const fontStylesheet = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;600;700;800&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap';

describe('performance assets', () => {
    it('discovers Google Fonts in the document head instead of through a CSS import waterfall', () => {
        const indexHtml = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
        const indexCss = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8');

        expect(indexCss).not.toContain('fonts.googleapis.com');
        expect(indexHtml).toContain('<link rel="preconnect" href="https://fonts.googleapis.com" />');
        expect(indexHtml).toContain('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />');
        expect(indexHtml).toContain(`<link rel="stylesheet" href="${fontStylesheet}" />`);

        const preconnectPosition = indexHtml.indexOf('rel="preconnect"');
        const stylesheetPosition = indexHtml.indexOf(fontStylesheet);
        expect(preconnectPosition).toBeGreaterThan(-1);
        expect(stylesheetPosition).toBeGreaterThan(preconnectPosition);
    });
});
