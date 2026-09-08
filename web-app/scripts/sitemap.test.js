import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
    extractPageLastModified,
    renderSitemap,
    resolveSitemapOutputPaths,
} from './sitemap.js';

describe('sitemap metadata', () => {
    it('reads a guide modification date from prerendered Article JSON-LD', () => {
        const html = `
            <script type="application/ld+json">
                {"@type":"Article","datePublished":"2026-07-01","dateModified":"2026-08-02"}
            </script>
        `;

        expect(extractPageLastModified(html)).toBe('2026-08-02');
    });

    it('omits lastmod when a route has no trustworthy modification date', () => {
        const xml = renderSitemap([
            { url: '/about', changefreq: 'monthly', priority: 0.6 },
            { url: '/blog/example', changefreq: 'monthly', priority: 0.8, lastmod: '2026-08-02' },
        ]);

        expect(xml).toContain('<loc>https://englishspeakinggermany.online/about</loc>');
        expect(xml).toContain('<lastmod>2026-08-02</lastmod>');
        expect(xml).not.toMatch(/<loc>https:\/\/englishspeakinggermany\.online\/about<\/loc>\s*<lastmod>/);
    });

    it('publishes the same sitemap into public and deployable dist output', () => {
        expect(resolveSitemapOutputPaths('/project/scripts')).toEqual([
            path.resolve('/project/public/sitemap.xml'),
            path.resolve('/project/dist/sitemap.xml'),
        ]);
    });

    it('runs sitemap generation after prerendering', () => {
        const packageJson = JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'),
        );

        expect(packageJson.scripts.postbuild).toBe(
            'npm run export-db && npm run prerender && npm run generate-sitemap',
        );
    });
});
