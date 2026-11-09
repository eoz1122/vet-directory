import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('runtime requirements', () => {
    it('isolates the supported runtime to the site deployment service', () => {
        const config = readFileSync(resolve(process.cwd(), '../deploy/esv-node-runtime.conf'), 'utf8');
        expect(config).toContain('[Service]');
        expect(config).toContain('Environment="PATH=/home/englishspeaking/.local/share/esv-node/node-v22.23.4-linux-x64/bin:');
        expect(config).not.toContain('Environment="HOME=');
    });
    it('documents and enforces the Node version required by Puppeteer', () => {
        const appRoot = existsSync(resolve(process.cwd(), 'package.json'))
            ? process.cwd()
            : resolve(process.cwd(), 'web-app');
        const packageJson = JSON.parse(
            readFileSync(resolve(appRoot, 'package.json'), 'utf8'),
        );
        const projectReadme = readFileSync(resolve(appRoot, '../README.md'), 'utf8');

        expect(packageJson.engines?.node).toBe('>=22.12.0');
        expect(projectReadme).toContain('Node.js 22.12+');
        expect(projectReadme).not.toContain('Node.js 18+');
    });
});
