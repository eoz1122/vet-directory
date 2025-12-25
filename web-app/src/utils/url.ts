/**
 * Appends UTM parameters to a URL for outbound tracking.
 */
export const appendUTM = (url: string | null | undefined): string => {
    if (!url) return '';

    // Logic to safely append utm_source
    try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('utm_source', 'englishspeakingvets.online');
        urlObj.searchParams.set('utm_medium', 'directory_link');
        urlObj.searchParams.set('utm_campaign', 'referral');
        return urlObj.toString();
    } catch {
        // Fallback for relative or malformed URLs
        const connector = url.includes('?') ? '&' : '?';
        return `${url}${connector}utm_source=englishspeakingvets.online&utm_medium=directory_link&utm_campaign=referral`;
    }
};
