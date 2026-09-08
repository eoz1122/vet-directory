import path from 'node:path';

const BASE_URL = 'https://englishspeakinggermany.online';

function escapeXml(value) {
    return value.replace(/[<>&'"]/g, (character) => {
        switch (character) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return character;
        }
    });
}

export function extractPageLastModified(html) {
    const match = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/);
    return match?.[1] ?? null;
}

export function resolveSitemapOutputPaths(scriptDirectory) {
    return [
        path.resolve(scriptDirectory, '../public/sitemap.xml'),
        path.resolve(scriptDirectory, '../dist/sitemap.xml'),
    ];
}

export function renderSitemap(routes) {
    const entries = routes.map((route) => {
        const formattedUrl = route.url.startsWith('/') ? route.url : `/${route.url}`;
        const lastModified = route.lastmod
            ? `\n    <lastmod>${escapeXml(route.lastmod)}</lastmod>`
            : '';

        return `  <url>
    <loc>${escapeXml(`${BASE_URL}${formattedUrl}`)}</loc>${lastModified}
    <changefreq>${escapeXml(route.changefreq)}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;
}
