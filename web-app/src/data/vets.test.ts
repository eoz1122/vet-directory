import { describe, expect, it } from 'vitest';
import vetsData from './vets.json';

const expectedLeipzigPractices = [
    {
        id: 'leipzig-tierarztpraxis-leutzsch',
        website: 'https://tierarztpraxis-leutzsch.de/',
        sourceUrl: 'https://tierarztpraxis-leutzsch.de/pages/team.php',
    },
    {
        id: 'leipzig-tierarztpraxis-am-kirschberg',
        website: 'https://tierarztpraxis-am-kirschberg.de/',
        sourceUrl: 'https://tierarztpraxis-am-kirschberg.de/sprechzeiten/',
    },
    {
        id: 'leipzig-tierarztpraxis-goepner-schroth',
        website: 'https://hund-katze-maus.net/',
        sourceUrl: 'https://hund-katze-maus.net/',
    },
] as const;

describe('verified Leipzig English-speaking practices', () => {
    it.each(expectedLeipzigPractices)(
        'keeps $id backed by first-party language evidence',
        ({ id, website, sourceUrl }) => {
            const practice = vetsData.find((vet) => vet.id === id);

            expect(practice).toBeDefined();
            expect(practice?.city).toBe('Leipzig');
            expect(practice?.community_status).toBe('Verified');
            expect(practice?.contact.website).toBe(website);
            expect(practice?.verification.english_signals.length).toBeGreaterThan(0);
            expect(practice?.verification.source_urls).toContain(sourceUrl);
        },
    );
});
