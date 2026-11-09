import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('shared guide framing', () => {
    it('does not let individual guides maintain duplicate sidebar/layout frames', () => {
        const legacy = readdirSync('src/pages').filter(name => name.endsWith('.tsx') && !name.includes('.test.'))
            .filter(name => readFileSync(`src/pages/${name}`, 'utf8').includes('<BlogSidebar'));
        expect(legacy).toEqual([]);
    });
});
