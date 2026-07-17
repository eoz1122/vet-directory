/**
 * Card "Last Verified" label. Recent scans show month + year; older ones soften
 * to year-only so cards do not advertise their own staleness to visitors.
 */
const SIX_MONTHS_MS = 183 * 24 * 60 * 60 * 1000;

export function formatVerifiedLabel(lastScanned: string | undefined, now: Date = new Date()): string {
    const d = lastScanned ? new Date(lastScanned) : null;
    if (!d || isNaN(d.getTime())) return '2025';
    if (now.getTime() - d.getTime() > SIX_MONTHS_MS) return String(d.getFullYear());
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
