import { describe, expect, it } from 'vitest';

import { GUIDE_CATALOG } from './guideCatalog';
import { pickRelated } from '../components/relatedSelection';

describe('guide catalogue', () => {
    it('contains unique routes and the dog liability guide', () => {
        const urls = GUIDE_CATALOG.map((guide) => guide.url);

        expect(new Set(urls).size).toBe(urls.length);
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/blog/dog-liability-insurance-germany',
            category: 'Bureaucracy',
            topics: expect.arrayContaining(['insurance', 'dog', 'legal']),
        }));
    });

    it('prioritizes topical links before deterministic fallback links', () => {
        const related = pickRelated(
            GUIDE_CATALOG,
            '/blog/dog-liability-insurance-germany',
            4,
        );
        const urls = related.map((guide) => guide.url);

        expect(urls).not.toContain('/blog/dog-liability-insurance-germany');
        expect(urls.slice(0, 3)).toEqual(expect.arrayContaining([
            '/blog/pet-insurance-germany',
            '/blog/hundesteuer-dog-tax-germany',
        ]));
    });
});
