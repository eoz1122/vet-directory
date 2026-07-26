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
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-cologne',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'cologne', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-ruhr',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'essen', 'dortmund', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-duesseldorf',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'düsseldorf', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-stuttgart',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'stuttgart', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-hannover',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'hannover', 'vet-care', 'exotic-pets']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-bremen',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'bremen', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-leipzig',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'leipzig', 'vet-care', 'exotic-pets']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-dresden',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'dresden', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-nuremberg',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'nuremberg', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-karlsruhe',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'karlsruhe', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-bonn',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'bonn', 'vet-care']),
        }));
        expect(GUIDE_CATALOG).toContainEqual(expect.objectContaining({
            url: '/guides/emergency-vets-muenster',
            category: 'Emergency',
            topics: expect.arrayContaining(['emergency', 'münster', 'vet-care']),
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
