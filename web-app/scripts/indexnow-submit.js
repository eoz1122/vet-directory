// Notify IndexNow (Bing, Yandex, Seznam, ...) of the site's current URL set.
// Google does not use IndexNow, but Bing/Yandex recrawl quickly from it, for free.
//
// Reads public/sitemap.xml and the IndexNow key file (public/<key>.txt), then POSTs
// the URL list to the shared IndexNow endpoint. Run manually or from deploy.sh.
// Never throws in a way that should fail a deploy: exits 0 even on API errors.
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '../public');
const HOST = 'englishspeakinggermany.online';

function main() {
    const keyFile = fs.readdirSync(PUBLIC).find((f) => /^[a-f0-9]{16,64}\.txt$/.test(f));
    if (!keyFile) {
        console.error('IndexNow: no key file (public/<hex>.txt) found — skipping.');
        return;
    }
    const key = keyFile.replace(/\.txt$/, '');

    const sitemap = fs.readFileSync(path.resolve(PUBLIC, 'sitemap.xml'), 'utf-8');
    const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (urlList.length === 0) {
        console.error('IndexNow: sitemap had no URLs — skipping.');
        return;
    }

    const payload = JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/${keyFile}`,
        urlList,
    });

    const req = https.request(
        {
            hostname: 'api.indexnow.org',
            path: '/indexnow',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(payload),
            },
        },
        (res) => {
            let body = '';
            res.on('data', (d) => (body += d));
            res.on('end', () => {
                console.log(`IndexNow: HTTP ${res.statusCode} for ${urlList.length} URLs. ${body.trim()}`);
            });
        },
    );
    req.on('error', (e) => console.error('IndexNow request error:', e.message));
    req.write(payload);
    req.end();
}

main();
