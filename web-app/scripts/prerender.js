/**
 * Post-Build Pre-Render Script
 * 
 * Generates static HTML for all routes so Google can index them.
 * Uses Puppeteer to render each page and save the output.
 * 
 * Usage: node scripts/prerender.js
 * Runs after `vite build` completes.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const VETS_DATA_PATH = path.resolve(__dirname, '../src/data/vets.json');
const BLOG_FILE_PATH = path.resolve(__dirname, '../src/pages/Blog.tsx');

// Port for the local preview server
const PREVIEW_PORT = 4174;

// Concurrency limit (pages rendered simultaneously)
const CONCURRENCY = 5;

// ─── Slug Helper (mirrors generate-sitemap.js) ───

function sanitizeSlug(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()&]/g, '')
        .replace(/-+/g, '-')
        .trim();
}

// ─── Route Collection ───

function getStaticRoutes() {
    return [
        '/',
        '/about',
        '/quality-promise',
        '/contact',
        '/blog',
        '/impressum',
        '/privacy',
    ];
}

function getBlogRoutes() {
    try {
        if (!fs.existsSync(BLOG_FILE_PATH)) return [];
        const content = fs.readFileSync(BLOG_FILE_PATH, 'utf-8');
        const regex = /url:\s*["']([^"']+)["']/g;
        const routes = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            routes.push(match[1]);
        }
        console.log(`  📝 Found ${routes.length} blog routes`);
        return routes;
    } catch (e) {
        console.error('Error parsing blog routes:', e);
        return [];
    }
}

function getVetRoutes() {
    try {
        if (!fs.existsSync(VETS_DATA_PATH)) return [];
        const vets = JSON.parse(fs.readFileSync(VETS_DATA_PATH, 'utf-8'));

        const cities = [...new Set(vets.map(v => v.city))];
        const cityRoutes = cities.map(city => `/vets/${sanitizeSlug(city)}`);

        const districtRoutes = [];
        const seenDistricts = new Set();

        vets.forEach(vet => {
            if (vet.city && vet.district && vet.district !== 'Unknown') {
                const citySlug = sanitizeSlug(vet.city);
                const districtSlug = sanitizeSlug(vet.district);
                if (citySlug === districtSlug) return;
                const key = `${citySlug}/${districtSlug}`;
                if (!seenDistricts.has(key)) {
                    seenDistricts.add(key);
                    districtRoutes.push(`/vets/${key}`);
                }
            }
        });

        console.log(`  🏙️  Found ${cityRoutes.length} city routes and ${districtRoutes.length} district routes`);
        return [...cityRoutes, ...districtRoutes];
    } catch (e) {
        console.error('Error parsing vet routes:', e);
        return [];
    }
}

function getAllRoutes() {
    const routes = [
        ...getStaticRoutes(),
        ...getVetRoutes(),
        ...getBlogRoutes(),
    ];
    // Deduplicate
    return [...new Set(routes)];
}

// ─── Pre-Render Engine ───

async function prerender() {
    console.log('\n🔨 Pre-Render: Starting...\n');

    const routes = getAllRoutes();
    console.log(`\n  📊 Total routes to pre-render: ${routes.length}\n`);

    // Dynamic import puppeteer (it's a devDependency)
    const puppeteer = await import('puppeteer');

    // Start a local static server to serve the built app
    const { createServer } = await import('http');
    const { readFileSync, existsSync } = await import('fs');

    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.woff2': 'font/woff2',
        '.woff': 'font/woff',
        '.ttf': 'font/ttf',
    };

    const server = createServer((req, res) => {
        let filePath = path.join(DIST_DIR, req.url === '/' ? '/index.html' : req.url);

        // SPA fallback: if file doesn't exist, serve index.html
        if (!existsSync(filePath)) {
            // Try adding index.html for directory paths
            const withIndex = path.join(filePath, 'index.html');
            if (existsSync(withIndex)) {
                filePath = withIndex;
            } else {
                filePath = path.join(DIST_DIR, 'index.html');
            }
        }

        try {
            const content = readFileSync(filePath);
            const ext = path.extname(filePath);
            const mime = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': mime });
            res.end(content);
        } catch {
            res.writeHead(404);
            res.end('Not found');
        }
    });

    await new Promise(resolve => server.listen(PREVIEW_PORT, resolve));
    console.log(`  🌐 Preview server running on http://localhost:${PREVIEW_PORT}\n`);

    const browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    let rendered = 0;
    let failed = 0;

    // Process routes in batches
    async function renderRoute(route) {
        const page = await browser.newPage();
        try {
            const url = `http://localhost:${PREVIEW_PORT}${route}`;
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

            // Wait for React to mount (the root div should have children)
            await page.waitForFunction(
                () => document.getElementById('root')?.children.length > 0,
                { timeout: 10000 }
            );

            // Small delay for any final renders
            await new Promise(r => setTimeout(r, 200));

            // Clean up dynamic elements that break React hydration
            await page.evaluate(() => {
                // 1. Clear Google Maps containers — the static snapshot breaks the live map
                document.querySelectorAll('[data-testid="map"], .gm-style, [class*="map"]').forEach(el => {
                    if (el.closest('[data-testid="map"]') || el.getAttribute('data-testid') === 'map') {
                        el.innerHTML = '';
                    }
                });

                // 2. Remove Google Maps injected styles from <head>
                document.querySelectorAll('style').forEach(style => {
                    if (style.textContent && (
                        style.textContent.includes('.pac-container') ||
                        style.textContent.includes('.gm-') ||
                        style.textContent.includes('yNHHyP') ||
                        style.textContent.includes('IPAZAH')
                    )) {
                        style.remove();
                    }
                });

                // 3. Remove Google Maps scripts injected at runtime
                document.querySelectorAll('script[src*="maps.googleapis.com"]').forEach(s => s.remove());

                // 4. Remove cookie consent overlay (should mount fresh)
                document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
                    // Only remove the fixed overlay, not inline mentions
                    if (el.classList.contains('fixed') || getComputedStyle(el).position === 'fixed') {
                        el.remove();
                    }
                });
            });

            const html = await page.content();

            // Determine output path
            const outputPath = route === '/'
                ? path.join(DIST_DIR, 'index.html')
                : path.join(DIST_DIR, route, 'index.html');

            const outputDir = path.dirname(outputPath);
            fs.mkdirSync(outputDir, { recursive: true });
            fs.writeFileSync(outputPath, html);

            rendered++;
            if (rendered % 20 === 0 || rendered === routes.length) {
                console.log(`  ✅ Progress: ${rendered}/${routes.length} rendered`);
            }
        } catch (err) {
            failed++;
            console.error(`  ❌ Failed: ${route} — ${err.message}`);
        } finally {
            await page.close();
        }
    }

    // Process in batches of CONCURRENCY
    for (let i = 0; i < routes.length; i += CONCURRENCY) {
        const batch = routes.slice(i, i + CONCURRENCY);
        await Promise.all(batch.map(renderRoute));
    }

    await browser.close();
    server.close();

    console.log(`\n🎉 Pre-Render Complete!`);
    console.log(`   ✅ ${rendered} pages rendered`);
    if (failed > 0) console.log(`   ❌ ${failed} pages failed`);
    console.log('');
}

prerender().catch(err => {
    console.error('Pre-render failed:', err);
    process.exit(1);
});
