import path from 'node:path';

const SITE_ORIGIN = 'https://englishspeakinggermany.online';
export const PRERENDER_FALLBACK_SELECTOR = 'meta[data-prerender-fallback]';

export function resolvePrerenderDistDir(scriptDirectory, overrideDirectory) {
    return path.resolve(overrideDirectory || path.join(scriptDirectory, '../dist'));
}

export function resolveGuideCatalogPath(scriptDirectory) {
    return path.resolve(scriptDirectory, '../src/content/guideCatalog.ts');
}

export function extractBlogRoutes(source) {
    const internalRoutePattern = /url:\s*["'](\/(?!\/)[^"']+)["']/g;
    return Array.from(source.matchAll(internalRoutePattern), (match) => match[1]);
}

export function canonicalForRoute(route) {
    if (route === '/404') return null;
    if (route === '/') return SITE_ORIGIN;

    const normalizedRoute = `/${route.replace(/^\/+|\/+$/g, '')}`;
    return `${SITE_ORIGIN}${normalizedRoute}`;
}

export function assertPrerenderComplete({ rendered, failed, total }) {
    if (failed > 0 || rendered !== total) {
        throw new Error(`Pre-render incomplete: ${rendered}/${total} rendered, ${failed} failed`);
    }
}

export function shouldKeepModulePreload(route, href) {
    if (/\/(Map|maps-vendor|GoogleMapsProvider|PlaceAutocomplete)-/.test(href)) return false;

    const isDirectoryRoute = route === '/' || route.startsWith('/vets/');
    if (!isDirectoryRoute && /\/(vets|Home|ConfirmEnglish)-/.test(href)) return false;

    return true;
}

export function removePrerenderFallbackMetadata(root) {
    const fallbackMetadata = Array.from(root.querySelectorAll(PRERENDER_FALLBACK_SELECTOR));
    fallbackMetadata.forEach((element) => element.remove());
    return fallbackMetadata.length;
}
