import { beforeEach, describe, expect, it } from 'vitest';

import { removePrerenderedHeadMetadata } from './prerenderMetadata';

describe('prerendered head metadata bootstrap cleanup', () => {
    beforeEach(() => {
        document.head.innerHTML = `
            <title data-prerender-route>Route title</title>
            <meta name="description" content="Route description" data-prerender-route>
            <link rel="canonical" href="https://example.com/route" data-prerender-route>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/assets/index.css">
        `;
    });

    it('removes only marked route metadata before React takes ownership', () => {
        expect(removePrerenderedHeadMetadata(document)).toBe(3);
        expect(document.head.querySelectorAll('[data-prerender-route]')).toHaveLength(0);
        expect(document.head.querySelector('meta[name="viewport"]')).not.toBeNull();
        expect(document.head.querySelector('link[rel="stylesheet"]')).not.toBeNull();
    });

    it('is safe when a non-prerendered document has no marked metadata', () => {
        document.head.querySelectorAll('[data-prerender-route]').forEach((node) => node.remove());

        expect(removePrerenderedHeadMetadata(document)).toBe(0);
        expect(document.head.querySelector('meta[name="viewport"]')).not.toBeNull();
    });
});
