import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('canonical www redirect', () => {
    const config = readFileSync(resolve(process.cwd(), 'nginx_site.conf'), 'utf8');

    it('redirects the TLS alias to the fixed canonical host with the full request URI', () => {
        expect(config).toContain('if ($host = www.englishspeakinggermany.online) {\n        return 301 https://englishspeakinggermany.online$request_uri;\n    }');
    });

    it('redirects both HTTP hostnames directly to canonical HTTPS', () => {
        expect(config).toContain('listen 80;\n    server_name englishspeakinggermany.online www.englishspeakinggermany.online;\n    return 301 https://englishspeakinggermany.online$request_uri;');
        expect(config).not.toContain('https://$host$request_uri');
    });
});
