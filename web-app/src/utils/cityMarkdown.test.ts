import { describe, it, expect } from 'vitest';
import { parseCityContent } from './cityMarkdown';

const SAMPLE = `Living in Berlin with a dog is a dream.

**Why Berlin Pet Owners Choose Us:**
- **District-Specific Search**: Find vets near you in Kreuzberg
- **Emergency-Ready**: Many practices offer 24/7 services

Whether you've just moved or not, we can help.`;

describe('parseCityContent', () => {
    it('splits paragraphs and detects list blocks', () => {
        const blocks = parseCityContent(SAMPLE);
        expect(blocks[0]).toEqual({ type: 'p', segments: [{ bold: false, text: 'Living in Berlin with a dog is a dream.' }] });
        expect(blocks[1].type).toBe('p');
        expect(blocks[1].segments![0]).toEqual({ bold: true, text: 'Why Berlin Pet Owners Choose Us:' });
        expect(blocks[2].type).toBe('list');
        expect(blocks[2].items).toHaveLength(2);
        expect(blocks[3].type).toBe('p');
    });

    it('parses bold segments inside list items', () => {
        const blocks = parseCityContent(SAMPLE);
        const first = blocks[2].items![0];
        expect(first[0]).toEqual({ bold: true, text: 'District-Specific Search' });
        expect(first[1].text).toContain(': Find vets near you');
        expect(first[1].bold).toBe(false);
    });

    it('never leaks literal ** markers', () => {
        const blocks = parseCityContent(SAMPLE);
        const all = JSON.stringify(blocks);
        expect(all).not.toContain('**');
    });

    it('handles a block that mixes a bold heading line with list lines', () => {
        const blocks = parseCityContent('**Heading:**\n- item one\n- item two');
        expect(blocks[0].type).toBe('p');
        expect(blocks[1].type).toBe('list');
        expect(blocks[1].items).toHaveLength(2);
    });

    it('plain text passes through unchanged', () => {
        const blocks = parseCityContent('Just a sentence.');
        expect(blocks).toEqual([{ type: 'p', segments: [{ bold: false, text: 'Just a sentence.' }] }]);
    });
});
