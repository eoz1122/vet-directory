import { describe, expect, it } from 'vitest';

import { shouldIndexDistrict } from './directoryIndexPolicy';

describe('directory index policy', () => {
    it('keeps multi-practice districts indexable', () => {
        expect(shouldIndexDistrict(2)).toBe(true);
        expect(shouldIndexDistrict(8)).toBe(true);
    });

    it('does not index single-practice district doorway pages', () => {
        expect(shouldIndexDistrict(1)).toBe(false);
        expect(shouldIndexDistrict(0)).toBe(false);
    });
});
