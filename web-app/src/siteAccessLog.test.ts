import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const config = readFileSync(resolve(process.cwd(), 'nginx_site.conf'), 'utf8');

describe('site-specific security access log', () => {
    it('uses a dedicated log for both HTTP and HTTPS hostnames', () => {
        expect(config.match(/access_log \/var\/log\/nginx\/englishspeaking\.access\.log esv_security;/g)).toHaveLength(2);
    });

    it('preserves the original requested path without its query string', () => {
        expect(config).toContain('map $request_uri $esv_log_path {');
        expect(config).toContain('~^(?<esv_log_path_capture>[^?]+) $esv_log_path_capture;');
    });

    it('escapes JSON and records attribution without query strings or extra client data', () => {
        const format = config.match(/log_format esv_security escape=json([\s\S]*?);/)?.[1];
        expect(format).toBeDefined();
        for (const variable of ['$time_iso8601', '$server_name', '$host', '$remote_addr', '$request_method', '$esv_log_path', '$status']) {
            expect(format).toContain(variable);
        }
        for (const variable of ['$request_uri', '$args', '$request_body', '$http_referer', '$http_user_agent', '$uri']) {
            expect(format).not.toContain(variable);
        }
    });
});
