import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import PetDentalCareGermany from './PetDentalCareGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <PetDentalCareGermany />
        </MemoryRouter>
    </HelmetProvider>,
);

const getSchema = (type: string) => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === type);

describe('PetDentalCareGermany', () => {
    it('publishes evergreen search metadata', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Dog & Cat Dental Care in Germany: Costs | EnglishSpeakingVets',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'What dental care costs for dogs and cats in Germany: verified GOT fees for scaling, extractions and anaesthesia, worked bill examples, and insurance traps.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe('https://englishspeakinggermany.online/blog/pet-dental-care-germany');
        expect(
            document.head.querySelector('meta[property="og:type"]')?.getAttribute('content'),
        ).toBe('article');
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Dog and Cat Dental Care in Germany: Costs and GOT Fees (2026)',
        })).toBeTruthy();
    });

    it('quotes the verified GOT Stomatologie fees', async () => {
        renderGuide();
        await waitFor(() => expect(getSchema('Article')).toBeTruthy());

        const articleText = document.body.textContent || '';

        expect(articleText).toMatch(/14\. Stomatologie/);
        expect(articleText).toMatch(/931/);
        expect(articleText).toMatch(/€20\.54/);
        expect(articleText).toMatch(/932/);
        expect(articleText).toMatch(/€61\.97/);
        expect(articleText).toMatch(/933/);
        expect(articleText).toMatch(/€108\.82/);
        expect(articleText).toMatch(/951/);
        expect(articleText).toMatch(/€10\.26/);
        expect(articleText).toMatch(/955/);
        expect(articleText).toMatch(/€41\.04/);
        expect(articleText).toMatch(/€61\.57/);
        expect(articleText).toMatch(/€23\.62/);
    });

    it('shows worked bill examples and names what is billed separately', async () => {
        renderGuide();
        await waitFor(() => expect(getSchema('Article')).toBeTruthy());

        const articleText = document.body.textContent || '';

        expect(articleText).toMatch(/€350\.24/);
        expect(articleText).toMatch(/€1,027\.02/);
        expect(articleText).toMatch(/no separate dental radiograph item/i);
        expect(articleText).toMatch(/not a quote/i);
    });

    it('states the anaesthesia position and the cat-specific risk', async () => {
        renderGuide();
        await waitFor(() => expect(getSchema('Article')).toBeTruthy());

        const articleText = document.body.textContent || '';

        expect(articleText).toMatch(/anaesthesia-free/i);
        expect(articleText).toMatch(/below the gumline/i);
        expect(articleText).toMatch(/0\.05%/);
        expect(articleText).toMatch(/0\.11%/);
        expect(articleText).toMatch(/FORL/);
        expect(articleText).toMatch(/tooth resorption/i);
    });

    it('links readers into the directory and the related money guides', async () => {
        renderGuide();
        await waitFor(() => expect(getSchema('Article')).toBeTruthy());

        const hrefs = Array.from(
            document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]'),
        ).map((link) => link.getAttribute('href'));

        expect(hrefs).toContain('/blog/vet-costs-germany');
        expect(hrefs).toContain('/blog/pet-insurance-germany');
        expect(hrefs).toContain('/blog/first-vet-visit-germany');
        expect(hrefs).toContain('/blog/german-vet-survival-kit-phrases');
        expect(hrefs).toContain('/vets/berlin');
        expect(hrefs).toContain('/vets/munich');
        expect(hrefs).toContain('/');
    });

    it('emits article and FAQ structured data and avoids em dashes', async () => {
        renderGuide();
        await waitFor(() => expect(getSchema('Article')).toBeTruthy());

        const article = getSchema('Article');
        expect(article.mainEntityOfPage['@id']).toBe(
            'https://englishspeakinggermany.online/blog/pet-dental-care-germany',
        );
        expect(article.datePublished).toBe('2026-08-02');
        expect(article.headline).toBe(
            'Dog and Cat Dental Care in Germany: Costs and GOT Fees (2026)',
        );

        const faq = getSchema('FAQPage');
        expect(faq.mainEntity.length).toBeGreaterThanOrEqual(4);
        expect(faq.mainEntity.length).toBeLessThanOrEqual(5);

        expect(document.body.textContent || '').not.toContain('—');
        expect(document.head.textContent || '').not.toContain('—');
    });
});
