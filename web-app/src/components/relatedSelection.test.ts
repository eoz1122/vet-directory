import { describe, it, expect } from 'vitest';
import { pickRelated } from './relatedSelection';

const posts = Array.from({ length: 10 }, (_, i) => ({ url: `/blog/post-${i}` }));

describe('pickRelated', () => {
    it('never includes the current page', () => {
        const picked = pickRelated(posts, '/blog/post-3', 4);
        expect(picked.some((p) => p.url === '/blog/post-3')).toBe(false);
    });

    it('returns the requested count', () => {
        expect(pickRelated(posts, '/blog/post-1', 4)).toHaveLength(4);
    });

    it('is deterministic for the same path (prerender-safe)', () => {
        const a = pickRelated(posts, '/blog/post-2', 4);
        const b = pickRelated(posts, '/blog/post-2', 4);
        expect(a).toEqual(b);
    });

    it('varies the selection across different paths', () => {
        const seen = new Set(
            ['/blog/x', '/blog/y', '/blog/z', '/blog/w'].map((p) =>
                pickRelated(posts, p, 4).map((r) => r.url).join(','),
            ),
        );
        expect(seen.size).toBeGreaterThan(1);
    });

    it('handles a list smaller than the requested count', () => {
        expect(pickRelated(posts.slice(0, 3), '/blog/post-0', 4)).toHaveLength(2);
    });
});
