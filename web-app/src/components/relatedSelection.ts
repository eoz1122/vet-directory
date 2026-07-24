interface LinkablePost {
    url: string;
    topics?: string[];
}

function stablePathHash(value: string): number {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
        hash = ((hash << 5) + hash + value.charCodeAt(i)) >>> 0;
    }
    return hash;
}

/**
 * Topic-first, deterministic related-post picker. Shared topics create useful
 * content clusters, while the stable path hash spreads equally relevant
 * fallback links without making prerendered HTML vary between builds.
 */
export function pickRelated<T extends LinkablePost>(
    posts: T[],
    currentPath: string,
    count: number,
): T[] {
    const pool = posts.filter((p) => p.url !== currentPath);
    if (pool.length <= count) return pool;

    const currentTopics = new Set(
        posts.find((post) => post.url === currentPath)?.topics ?? [],
    );

    if (currentTopics.size === 0) {
        const start = stablePathHash(currentPath) % pool.length;
        return Array.from(
            { length: count },
            (_, index) => pool[(start + index) % pool.length],
        );
    }

    return pool
        .map((post) => ({
            post,
            score: (post.topics ?? []).reduce(
                (total, topic) => total + (currentTopics.has(topic) ? 1 : 0),
                0,
            ),
            tieBreaker: stablePathHash(`${currentPath}:${post.url}`),
        }))
        .sort((left, right) => (
            right.score - left.score
            || left.tieBreaker - right.tieBreaker
        ))
        .slice(0, count)
        .map(({ post }) => post);
}
