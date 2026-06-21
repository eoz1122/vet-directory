import { describe, it, expect } from 'vitest';
import { slugify, titleCaseSlug } from './url';

describe('titleCaseSlug', () => {
    it('title-cases a hyphenated slug into words (fixes "Bad-homburg")', () => {
        expect(titleCaseSlug('bad-homburg')).toBe('Bad Homburg');
        expect(titleCaseSlug('neustadt-near-hamburg')).toBe('Neustadt Near Hamburg');
        expect(titleCaseSlug('prenzlauer-berg')).toBe('Prenzlauer Berg');
    });
    it('is empty-safe', () => {
        expect(titleCaseSlug('')).toBe('');
    });
});

describe('slugify', () => {
    it('lowercases and hyphenates spaces (multi-word cities/districts)', () => {
        expect(slugify('Prenzlauer Berg')).toBe('prenzlauer-berg');
        expect(slugify('Bad Homburg')).toBe('bad-homburg');           // P2: was "City Not Found"
        expect(slugify('Neustadt near Hamburg')).toBe('neustadt-near-hamburg');
    });

    it('converts slashes to hyphens (P1: districts that broke the route)', () => {
        expect(slugify('Friedrichshain / Others')).toBe('friedrichshain-others');
        expect(slugify('Düppel/Zehlendorf')).toBe('düppel-zehlendorf');
        expect(slugify('Gallus / City West')).toBe('gallus-city-west');
    });

    it('drops parentheses and ampersands', () => {
        expect(slugify('Mitte (Center)')).toBe('mitte-center');
        expect(slugify('Winterhude & Ottensen')).toBe('winterhude-ottensen');
    });

    it('handles commas and dots from malformed district data', () => {
        expect(slugify('Dr. Jan Kullen / Dr. Elena Panova')).toBe('dr-jan-kullen-dr-elena-panova');
        expect(slugify('am Nordpark 10, 60437 Frankfurt am Main')).toBe('am-nordpark-10-60437-frankfurt-am-main');
    });

    it('preserves unicode letters (umlauts/ß stay as-is)', () => {
        expect(slugify('Schöneberg')).toBe('schöneberg');
        expect(slugify('Königstein')).toBe('königstein');
    });

    it('never emits a slash or leading/trailing/duplicate hyphen', () => {
        for (const s of ['a/b', 'x\\y', 'p / q / r', '  Mitte  ', 'A -- B']) {
            const out = slugify(s);
            expect(out).not.toMatch(/[/\\]/);
            expect(out).not.toMatch(/^-|-$|--/);
        }
    });

    it('is null/undefined safe', () => {
        expect(slugify(undefined)).toBe('');
        expect(slugify(null)).toBe('');
        expect(slugify('')).toBe('');
    });
});
