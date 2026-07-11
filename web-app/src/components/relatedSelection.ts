/**
 * Deterministic related-post picker. Seeded by the current path (NOT random)
 * so prerendered HTML is stable across builds, while different pages surface
 * different related posts, spreading internal links across the whole blog.
 */
export function pickRelated<T extends { url: string }>(posts: T[], currentPath: string, count: number): T[] {
    const pool = posts.filter((p) => p.url !== currentPath);
    if (pool.length <= count) return pool;

    // Tiny stable string hash (djb2)
    let hash = 5381;
    for (let i = 0; i < currentPath.length; i++) {
        hash = ((hash << 5) + hash + currentPath.charCodeAt(i)) >>> 0;
    }

    const start = hash % pool.length;
    return Array.from({ length: count }, (_, i) => pool[(start + i) % pool.length]);
}
