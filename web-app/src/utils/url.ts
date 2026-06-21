/**
 * Canonical slug generator. SINGLE SOURCE OF TRUTH for turning a city/district
 * name into a URL segment. The build scripts (scripts/generate-sitemap.js and
 * scripts/prerender.js) MUST mirror this exact logic so the sitemap loc, the
 * pre-rendered file path, the internal links, and the <link rel="canonical">
 * all agree. Matching is done as `slugify(candidate) === param`, never by
 * reversing the slug (which loses information for '/', '()', '&', etc.).
 */
export const slugify = (s: string | null | undefined): string =>
    (s ?? '')
        .toLowerCase()
        .replace(/[()&]/g, '')        // drop parentheses and ampersands
        .replace(/[\s/\\,.]+/g, '-')  // spaces, slashes, commas, dots -> hyphen
        .replace(/-+/g, '-')          // collapse repeats
        .replace(/^-+|-+$/g, '');     // trim leading/trailing hyphens

/**
 * Turns a URL slug back into a human display name ("bad-homburg" -> "Bad Homburg").
 * Used only as a fallback; prefer the real name from the data when a record exists.
 */
export const titleCaseSlug = (slug: string): string =>
    (slug || '')
        .split('-')
        .filter(Boolean)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

/**
 * Appends UTM parameters to a URL for outbound tracking.
 */
export const appendUTM = (url: string | null | undefined): string => {
    if (!url) return '';

    // Logic to safely append utm_source
    try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('utm_source', 'englishspeakinggermany.info');
        urlObj.searchParams.set('utm_medium', 'directory_link');
        urlObj.searchParams.set('utm_campaign', 'referral');
        return urlObj.toString();
    } catch {
        // Fallback for relative or malformed URLs
        const connector = url.includes('?') ? '&' : '?';
        return `${url}${connector}utm_source=englishspeakinggermany.info&utm_medium=directory_link&utm_campaign=referral`;
    }
};
