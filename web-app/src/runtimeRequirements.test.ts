import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('runtime requirements', () => {
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
