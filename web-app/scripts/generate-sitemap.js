import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractBlogRoutes, resolveGuideCatalogPath } from './prerender-readiness.js';
import {
    extractPageLastModified,
    renderSitemap,
    resolveSitemapOutputPaths,
} from './sitemap.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const OUTPUT_FILES = resolveSitemapOutputPaths(__dirname);
const VETS_DATA_PATH = path.resolve(__dirname, '../src/data/vets.json');
const BLOG_FILE_PATH = resolveGuideCatalogPath(__dirname);
const DIST_DIRECTORY = path.resolve(__dirname, '../dist');

// Helper to sanitize slugs.
// MIRRORS slugify() in src/utils/url.ts — keep identical (see src/utils/url.test.ts).
function sanitizeSlug(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/[()&]/g, '')        // drop parentheses and ampersands
        .replace(/[\s/\\,.]+/g, '-')  // spaces, slashes, commas, dots -> hyphen
        .replace(/-+/g, '-')          // collapse repeats
        .replace(/^-+|-+$/g, '');     // trim leading/trailing hyphens
}

// 1. Static Routes (with proper priority tiering)
const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.6 },
    { url: '/quality-promise', changefreq: 'monthly', priority: 0.5 },
    { url: '/contact', changefreq: 'monthly', priority: 0.5 },
    { url: '/blog', changefreq: 'weekly', priority: 0.8 },
    { url: '/impressum', changefreq: 'yearly', priority: 0.3 },
    { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
];

function getBlogRoutes() {
    try {
        if (!fs.existsSync(BLOG_FILE_PATH)) {
            console.warn(`Blog file not found at ${BLOG_FILE_PATH}`);
            return [];
        }
        const content = fs.readFileSync(BLOG_FILE_PATH, 'utf-8');
        const routes = extractBlogRoutes(content).map((route) => {
            const prerenderedPath = path.join(DIST_DIRECTORY, route, 'index.html');
            if (!fs.existsSync(prerenderedPath)) {
                throw new Error(`Prerendered guide is missing: ${prerenderedPath}`);
            }

            const html = fs.readFileSync(prerenderedPath, 'utf8');
            const lastmod = extractPageLastModified(html);
            if (!lastmod) {
                throw new Error(`Guide has no dateModified value: ${route}`);
            }

            return {
                url: route,
                changefreq: 'monthly',
                priority: 0.8, // Blog posts - good priority
                lastmod,
            };
        });
        console.log(`Found ${routes.length} blog posts.`);
        return routes;
    } catch (error) {
        throw new Error('Unable to build guide sitemap routes', { cause: error });
    }
}

function getVetRoutes() {
    try {
        if (!fs.existsSync(VETS_DATA_PATH)) {
            console.warn(`Vets data not found at ${VETS_DATA_PATH}`);
            return [];
        }
        const allVets = JSON.parse(fs.readFileSync(VETS_DATA_PATH, 'utf-8'));
        // Mirror the app's display filter (src/utils/activeVets.ts): closed
        // practices and canonical aliases must not create or sustain routes.
        const vets = allVets.filter(v =>
            v.verification?.status !== 'Permanently Closed' && !v.canonical_listing_id
        );

        // Cities
        const cities = [...new Set(vets.map(v => v.city))];
        const cityRoutes = cities.map(city => {
            // Find most recent last_scanned for this city
            const cityVets = vets.filter(v => v.city === city);
            const latestScan = cityVets.reduce((latest, v) => {
                return (v.verification.last_scanned > latest) ? v.verification.last_scanned : latest;
            }, '2024-01-01');

            return {
                url: `/vets/${sanitizeSlug(city)}`,
                changefreq: 'weekly',
                priority: 0.9, // City landing pages - high priority
                lastmod: latestScan
            };
        });

        // Districts
        const districtRoutes = [];
        const seenDistricts = new Set();

        vets.forEach(vet => {
            if (vet.city && vet.district && vet.district !== 'Unknown') {
                const citySlug = sanitizeSlug(vet.city);
                const districtSlug = sanitizeSlug(vet.district);

                // Remove /city/city redundancy
                if (citySlug === districtSlug) return;

                const key = `${citySlug}/${districtSlug}`;

                if (!seenDistricts.has(key)) {
                    seenDistricts.add(key);

                    // Find latest update for this specific district
                    const districtVets = vets.filter(v =>
                        sanitizeSlug(v.city) === citySlug &&
                        sanitizeSlug(v.district) === districtSlug
                    );
                    const latestScan = districtVets.reduce((latest, v) => {
                        return (v.verification.last_scanned > latest) ? v.verification.last_scanned : latest;
                    }, '2024-01-01');

                    districtRoutes.push({
                        url: `/vets/${key}`,
                        changefreq: 'weekly',
                        priority: 0.7, // District pages - medium priority
                        lastmod: latestScan
                    });
                }
            }
        });

        console.log(`Found ${cities.length} cities and ${districtRoutes.length} districts.`);
        return [...cityRoutes, ...districtRoutes];

    } catch (error) {
        throw new Error('Unable to build directory sitemap routes', { cause: error });
    }
}

function latestLastModified(routes) {
    const dates = routes.map((route) => route.lastmod).filter(Boolean).sort();
    return dates.at(-1);
}

function generateSitemap() {
    console.log('Generating sitemap...');

    const blogRoutes = getBlogRoutes();
    const vetRoutes = getVetRoutes();

    const dynamicStaticRoutes = staticRoutes.map((route) => {
        if (route.url === '/') return { ...route, lastmod: latestLastModified(vetRoutes) };
        if (route.url === '/blog') return { ...route, lastmod: latestLastModified(blogRoutes) };
        return route;
    });

    const allRoutes = [
        ...dynamicStaticRoutes,
        ...vetRoutes,
        ...blogRoutes
    ];
    const sitemapContent = renderSitemap(allRoutes);

    for (const outputFile of OUTPUT_FILES) {
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, sitemapContent);
        console.log(`Sitemap generated with ${allRoutes.length} URLs at ${outputFile}`);
    }
}

generateSitemap();
