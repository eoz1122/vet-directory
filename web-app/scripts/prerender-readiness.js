import path from 'node:path';

const SITE_ORIGIN = 'https://englishspeakinggermany.online';
export const PRERENDER_FALLBACK_SELECTOR = 'meta[data-prerender-fallback]';

export function resolvePrerenderDistDir(scriptDirectory, overrideDirectory) {
    return path.resolve(overrideDirectory || path.join(scriptDirectory, '../dist'));
}

export function resolveGuideCatalogPath(scriptDirectory) {
    return path.resolve(scriptDirectory, '../src/content/guideCatalog.ts');
}

export function resolvePrerenderConcurrency(value) {
    if (value === undefined || value === '') return 5;

    const concurrency = Number(value);
    if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 10) {
        throw new RangeError(
            'PRERENDER_CONCURRENCY must be an integer from 1 to 10',
        );
    }

    return concurrency;
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

export async function renderPrerenderRoutes(
    routes,
    renderRoute,
    {
        concurrency = 5,
        onAttemptFailure,
        onRetryQueue,
        onSuccess,
    } = {},
) {
    if (!Number.isInteger(concurrency) || concurrency < 1) {
        throw new RangeError('concurrency must be a positive integer');
    }

    let rendered = 0;
    const attemptRoute = async (route, attempt) => {
        try {
            await renderRoute(route, { attempt });
            rendered++;
            if (onSuccess) {
                await onSuccess({ attempt, rendered, route });
            }
            return null;
        } catch (error) {
            if (onAttemptFailure) {
                await onAttemptFailure({
                    attempt,
                    error,
                    route,
                    willRetry: attempt === 1,
                });
            }
            return { error, route };
        }
    };

    const retryQueue = [];
    for (let index = 0; index < routes.length; index += concurrency) {
        const batch = routes.slice(index, index + concurrency);
        const results = await Promise.all(batch.map(route => attemptRoute(route, 1)));
        retryQueue.push(...results.filter(Boolean));
    }

    if (retryQueue.length > 0 && onRetryQueue) {
        await onRetryQueue({ routes: retryQueue.map(({ route }) => route) });
    }

    const failedRoutes = [];
    for (const { route } of retryQueue) {
        const result = await attemptRoute(route, 2);
        if (result) failedRoutes.push(result);
    }

    return {
        failed: failedRoutes.length,
        failedRoutes,
        rendered,
    };
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
