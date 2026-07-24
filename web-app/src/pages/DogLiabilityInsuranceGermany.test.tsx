import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import DogLiabilityInsuranceGermany from './DogLiabilityInsuranceGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderPage = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <DogLiabilityInsuranceGermany />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('Dog liability insurance guide', () => {
    it('publishes search-focused metadata and current article dates', async () => {
        renderPage();

        await waitFor(() => {
            expect(document.title).toBe(
                'Dog Liability Insurance Germany: Rules & Checklist (2026)',
            );
        });

        expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content'))
            .toBe(
                'Understand dog liability insurance in Germany, where it is mandatory, what Hundehaftpflicht covers, and which policy terms expat dog owners should check.',
            );
        expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'))
            .toBe('https://englishspeakinggermany.online/blog/dog-liability-insurance-germany');

        const schema = getArticleSchema();
        expect(schema.datePublished).toBe('2026-07-24');
        expect(schema.dateModified).toBe('2026-07-24');
    });

    it('uses primary legal sources and distinguishes state requirements', () => {
        renderPage();

        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Dog Liability Insurance in Germany: Rules and Checklist (2026)',
        })).toBeTruthy();
        expect(screen.getAllByRole('link', { name: 'German Civil Code section 833' })[0].getAttribute('href'))
            .toBe('https://www.gesetze-im-internet.de/bgb/__833.html');
        expect(screen.getByRole('link', { name: 'Official Berlin dog rules' })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Official Hamburg dog rules' })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Official Lower Saxony dog-law guidance' })).toBeTruthy();
        expect(screen.getAllByRole('link', { name: 'North Rhine-Westphalia dog law' })[0]).toBeTruthy();
        expect(screen.getAllByRole('link', { name: 'Bavarian dangerous-dog law' })[0]).toBeTruthy();

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/Berlin, Hamburg and Lower Saxony require liability cover/i);
        expect(articleText).toMatch(/North Rhine-Westphalia requires it for large dogs/i);
        expect(articleText).toMatch(/Bavaria does not impose one general statewide insurance rule for every dog/i);
        expect(articleText).toMatch(/not individualized legal or insurance advice/i);
        expect(articleText).not.toMatch(/best insurer|cheapest insurer|guaranteed approval/i);
    });

    it('connects readers to the insurance, dog-tax and new-pet pillars', () => {
        renderPage();

        expect(screen.getByRole('link', { name: 'Compare health and surgery insurance' }).getAttribute('href'))
            .toBe('/blog/pet-insurance-germany');
        expect(screen.getByRole('link', { name: 'Register for dog tax' }).getAttribute('href'))
            .toBe('/blog/hundesteuer-dog-tax-germany');
        expect(screen.getByRole('link', { name: 'Use the first-30-days checklist' }).getAttribute('href'))
            .toBe('/blog/new-pet-checklist-germany');
    });
});
