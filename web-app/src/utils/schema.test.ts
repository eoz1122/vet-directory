import { describe, expect, it } from 'vitest';

import { generateArticleSchema } from './schema';

describe('generateArticleSchema', () => {
    const title = 'A useful guide';
    const description = 'A useful description';
    const url = 'https://englishspeakinggermany.online/blog/useful-guide';

    it('uses the publication date as the stable modification date by default', () => {
        const schema = generateArticleSchema(title, description, url, '2020-01-02');

        expect(schema.datePublished).toBe('2020-01-02');
        expect(schema.dateModified).toBe('2020-01-02');
    });

    it('accepts an explicit verified modification date', () => {
        const schema = generateArticleSchema(
            title,
            description,
            url,
            '2020-01-02',
            '2025-02-03',
        );

        expect(schema.datePublished).toBe('2020-01-02');
        expect(schema.dateModified).toBe('2025-02-03');
    });
});
