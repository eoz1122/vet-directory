import packageJson from '../package.json';
import { describe, expect, it } from 'vitest';

describe('React metadata compatibility', () => {
    it('uses the React 19 compatible react-helmet-async release line', () => {
        expect(packageJson.dependencies['react-helmet-async']).toMatch(/^\^3\./);
    });
});
