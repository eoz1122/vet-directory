import { describe, expect, it } from 'vitest';
import {
    assertPrerenderComplete,
    canonicalForRoute,
    extractBlogRoutes,
    isRouteMetadataReady,
    removePrerenderFallbackMetadata,
    renderPrerenderRoutes,
    resolvePrerenderConcurrency,
    resolvePrerenderDistDir,
    resolveGuideCatalogPath,
    resolveStaticRequestPath,
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

    it('recognizes React 19 metadata without relying on legacy data attributes', () => {
        document.head.innerHTML = `
            <title>Route title</title>
            <link rel="canonical" href="https://englishspeakinggermany.online/vets/berlin">
        `;

        expect(isRouteMetadataReady(
            'https://englishspeakinggermany.online/vets/berlin',
            'Fallback title',
        )).toBe(true);
        expect(isRouteMetadataReady(
            'https://englishspeakinggermany.online/vets/hamburg',
            'Fallback title',
        )).toBe(false);

        document.title = 'Fallback title';
        expect(isRouteMetadataReady(
            'https://englishspeakinggermany.online/vets/berlin',
            'Fallback title',
            true,
        )).toBe(false);
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

    it('queues failed routes until the initial pass completes, then retries them sequentially', async () => {
        const events = [];
        const renderRoute = vi.fn(async (route, { attempt }) => {
            events.push(`${route}:${attempt}`);
            if (attempt === 1 && route !== '/healthy') {
                throw new Error(`${route} readiness timeout`);
            }
        });

        const result = await renderPrerenderRoutes(
            ['/first-failure', '/second-failure', '/healthy'],
            renderRoute,
            { concurrency: 2 },
        );

        expect(events).toEqual([
            '/first-failure:1',
            '/second-failure:1',
            '/healthy:1',
            '/first-failure:2',
            '/second-failure:2',
        ]);
        expect(result).toEqual({ failed: 0, failedRoutes: [], rendered: 3 });
    });

    it('reports a route that still fails during the sequential retry', async () => {
        const renderRoute = vi.fn(async (route) => {
            if (route === '/persistent-failure') {
                throw new Error('route readiness timeout');
            }
        });

        const result = await renderPrerenderRoutes(
            ['/healthy', '/persistent-failure'],
            renderRoute,
            { concurrency: 2 },
        );

        expect(result.rendered).toBe(1);
        expect(result.failed).toBe(1);
        expect(result.failedRoutes).toEqual([
            {
                error: expect.objectContaining({ message: 'route readiness timeout' }),
                route: '/persistent-failure',
            },
        ]);
        expect(renderRoute).toHaveBeenCalledTimes(3);
    });

    it('supports an isolated output directory for verification', () => {
        expect(resolvePrerenderDistDir('/project/scripts')).toBe('/project/dist');
        expect(resolvePrerenderDistDir('/project/scripts', '/tmp/vet-prerender')).toBe(
            '/tmp/vet-prerender',
        );
    });

    it('keeps five workers by default and accepts a bounded concurrency override', () => {
        expect(resolvePrerenderConcurrency()).toBe(5);
        expect(resolvePrerenderConcurrency('')).toBe(5);
        expect(resolvePrerenderConcurrency('1')).toBe(1);
        expect(resolvePrerenderConcurrency('10')).toBe(10);
        expect(() => resolvePrerenderConcurrency('0')).toThrow(
            'PRERENDER_CONCURRENCY must be an integer from 1 to 10',
        );
        expect(() => resolvePrerenderConcurrency('2.5')).toThrow(
            'PRERENDER_CONCURRENCY must be an integer from 1 to 10',
        );
        expect(() => resolvePrerenderConcurrency('not-a-number')).toThrow(
            'PRERENDER_CONCURRENCY must be an integer from 1 to 10',
        );
    });

    it('uses the shared guide catalogue as the build route source', () => {
        expect(resolveGuideCatalogPath('/project/scripts')).toBe(
            '/project/src/content/guideCatalog.ts',
        );
    });

    it('uses the immutable SPA shell for routes that are not rendered yet', () => {
        const existingPaths = new Set([
            '/project/dist/assets/app.js',
            '/project/dist/blog/rendered/index.html',
        ]);
        const exists = (candidate) => existingPaths.has(candidate);

        expect(resolveStaticRequestPath('/project/dist', '/assets/app.js', exists)).toBe(
            '/project/dist/assets/app.js',
        );
        expect(resolveStaticRequestPath('/project/dist', '/blog/rendered', exists)).toBe(
            '/project/dist/blog/rendered/index.html',
        );
        expect(resolveStaticRequestPath('/project/dist', '/blog/not-rendered', exists)).toBeNull();
    });

    it('does not resolve requests outside the production output directory', () => {
        const exists = () => true;

        expect(resolveStaticRequestPath('/project/dist', '/../secret.txt', exists)).toBeNull();
        expect(resolveStaticRequestPath('/project/dist', '/%2e%2e/secret.txt', exists)).toBeNull();
        expect(resolveStaticRequestPath('/project/dist', '/%E0%A4%A', exists)).toBeNull();
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
            <title data-prerender-fallback>Homepage fallback title</title>
            <title data-rh="true">Route title</title>
            <meta name="description" content="Homepage fallback" data-prerender-fallback>
            <meta property="og:title" content="Homepage fallback" data-prerender-fallback>
            <meta name="description" content="Route description" data-rh="true">
            <meta property="og:title" content="Route title" data-rh="true">
        `;

        expect(removePrerenderFallbackMetadata(document)).toBe(3);
        expect(document.head.querySelectorAll('title')).toHaveLength(1);
        expect(document.head.querySelector('title')?.textContent).toBe('Route title');
        expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
        expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content'))
            .toBe('Route description');
        expect(document.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);
        expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute('content'))
            .toBe('Route title');
    });
});
