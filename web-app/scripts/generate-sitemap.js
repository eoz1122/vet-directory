import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const BASE_URL = 'https://englishspeakinggermany.online';
const OUTPUT_FILE = path.resolve(__dirname, '../public/sitemap.xml');
const VETS_DATA_PATH = path.resolve(__dirname, '../src/data/vets.json');
const BLOG_FILE_PATH = path.resolve(__dirname, '../src/pages/Blog.tsx');

// 1. Static Routes
const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/quality-promise', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/blog', changefreq: 'weekly', priority: 0.9 },
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
        // Look for url: "/blog/..." patterns in the blogPosts array
        const regex = /url:\s*"(.*?)"/g;
        const routes = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            routes.push({ url: match[1], changefreq: 'monthly', priority: 0.9 });
        }
        console.log(`Found ${routes.length} blog posts.`);
        return routes;
    } catch (e) {
        console.error("Error parsing blog posts:", e);
        return [];
    }
}

function getVetRoutes() {
    try {
        if (!fs.existsSync(VETS_DATA_PATH)) {
            console.warn(`Vets data not found at ${VETS_DATA_PATH}`);
            return [];
        }
        const vets = JSON.parse(fs.readFileSync(VETS_DATA_PATH, 'utf-8'));

        // Cities
        const cities = [...new Set(vets.map(v => v.city))];
        const cityRoutes = cities.map(city => ({
            url: `/vets/${city.toLowerCase()}`,
            changefreq: 'weekly',
            priority: 0.9
        }));

        // Districts
        const districtRoutes = [];
        const seenDistricts = new Set();
        // Only include districts with at least 1 verified vet
        // Filter by major cities usually, but let's include all non-empty districts 
        // that are actually in use.

        vets.forEach(vet => {
            if (vet.city && vet.district && vet.district !== 'Unknown') {
                const citySlug = vet.city.toLowerCase();
                const districtSlug = vet.district.toLowerCase().replace(/\s+/g, '-');
                const key = `${citySlug}/${districtSlug}`;

                if (!seenDistricts.has(key)) {
                    seenDistricts.add(key);
                    districtRoutes.push({
                        url: `/vets/${key}`,
                        changefreq: 'weekly',
                        priority: 0.8
                    });
                }
            }
        });

        console.log(`Found ${cities.length} cities and ${districtRoutes.length} districts.`);
        return [...cityRoutes, ...districtRoutes];

    } catch (e) {
        console.error("Error parsing vet data:", e);
        return [];
    }
}

function generateSitemap() {
    console.log('Generating sitemap...');

    const blogRoutes = getBlogRoutes();
    const vetRoutes = getVetRoutes();

    const allRoutes = [
        ...staticRoutes,
        ...vetRoutes,
        ...blogRoutes
    ];

    const escapeXml = (unsafe) => {
        return unsafe.replace(/[<>&'"]/g, (c) => {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    };

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => {
        const fullUrl = `${BASE_URL}${route.url.startsWith('/') ? '' : '/'}${route.url}`;
        return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }).join('\n')}
</urlset>`;


    fs.writeFileSync(OUTPUT_FILE, sitemapContent);
    console.log(`Sitemap generated with ${allRoutes.length} URLs at ${OUTPUT_FILE}`);
}

generateSitemap();
