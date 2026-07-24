import { describe, expect, it } from 'vitest';
import {
    assertPrerenderComplete,
    canonicalForRoute,
    extractBlogRoutes,
    removePrerenderFallbackMetadata,
    resolvePrerenderDistDir,
    shouldKeepModulePreload,
} from './prerender-readiness.js';

describe('prerender readiness', () => {
    it('requires the canonical that belongs to the route', () => {
        expect(canonicalForRoute('/')).toBe('https://englishspeakinggermany.online');
        expect(canonicalForRoute('/vets/berlin/tempelhof')).toBe(
            'https://englishspeakinggermany.online/vets/berlin/tempelhof',
        );
        expect(canonicalForRoute('/blog/eu-pet-passport-germany')).toBe(
            'https://englishspeakinggermany.online/blog/eu-pet-passport-germany',
        );
        expect(canonicalForRoute('/404')).toBeNull();
    });

    it('rejects failed or incomplete prerender runs', () => {
        expect(() => assertPrerenderComplete({ rendered: 2, failed: 0, total: 2 })).not.toThrow();
        expect(() => assertPrerenderComplete({ rendered: 1, failed: 1, total: 2 })).toThrow(
            'Pre-render incomplete: 1/2 rendered, 1 failed',
        );
        expect(() => assertPrerenderComplete({ rendered: 1, failed: 0, total: 2 })).toThrow(
            'Pre-render incomplete: 1/2 rendered, 0 failed',
        );
    });

    it('supports an isolated output directory for verification', () => {
        expect(resolvePrerenderDistDir('/project/scripts')).toBe('/project/dist');
        expect(resolvePrerenderDistDir('/project/scripts', '/tmp/vet-prerender')).toBe(
            '/tmp/vet-prerender',
        );
    });

    it('extracts internal guide routes without treating schema URLs as routes', () => {
        const source = `
            const blogPosts = [
                { url: '/blog/one' },
                { url: "/guides/two" },
            ];
            const blogSchema = {
                url: 'https://englishspeakinggermany.online/blog',
            };
        `;

        expect(extractBlogRoutes(source)).toEqual(['/blog/one', '/guides/two']);
    });

    it('does not preload interactive map chunks before they are requested', () => {
        expect(shouldKeepModulePreload('/', '/assets/Map-abc.js')).toBe(false);
        expect(shouldKeepModulePreload('/', '/assets/maps-vendor-abc.js')).toBe(false);
        expect(shouldKeepModulePreload('/', '/assets/GoogleMapsProvider-abc.js')).toBe(false);
        expect(shouldKeepModulePreload('/', '/assets/PlaceAutocomplete-abc.js')).toBe(false);
        expect(shouldKeepModulePreload('/', '/assets/Home-abc.js')).toBe(true);
        expect(shouldKeepModulePreload('/blog/example', '/assets/vets-abc.js')).toBe(false);
        expect(shouldKeepModulePreload('/vets/berlin', '/assets/vets-abc.js')).toBe(true);
    });

    it('removes fallback metadata while preserving route-specific Helmet metadata', () => {
        document.head.innerHTML = `
            <meta name="description" content="Homepage fallback" data-prerender-fallback>
            <meta property="og:title" content="Homepage fallback" data-prerender-fallback>
            <meta name="description" content="Route description" data-rh="true">
            <meta property="og:title" content="Route title" data-rh="true">
        `;

        expect(removePrerenderFallbackMetadata(document)).toBe(2);
        expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
        expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content'))
            .toBe('Route description');
        expect(document.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);
        expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'))
            .toBe('Route title');
    });
});
