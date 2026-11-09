import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EnglishSpeakingVetHamburg from './EnglishSpeakingVetHamburg';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav aria-label="Table of Contents" /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

describe('EnglishSpeakingVetHamburg', () => {
    it('publishes a focused Hamburg vet guide with official emergency links', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <EnglishSpeakingVetHamburg />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(document.title).toBe(
            'English-Speaking Vets in Hamburg (2026): How to Find and Book',
        );
        expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
            'Looking for an English-speaking vet in Hamburg? Compare current listings, confirm new-patient and English availability, and keep Hamburg\'s official emergency number ready.',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'English-Speaking Vets in Hamburg: How to Find and Book',
        })).toBeTruthy();
        expect(screen.getByText(/Our directory currently lists/i)).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Browse all Hamburg listings' }).getAttribute('href'))
            .toBe('/vets/hamburg');
        expect(screen.getByRole('link', { name: 'Hamburg veterinary emergency service' }).getAttribute('href'))
            .toBe('https://tieraerztekammer-hamburg.de/was-ist-ein-notfall');
        expect(screen.getByRole('link', { name: 'Hamburg current duty rota' }).getAttribute('href'))
            .toBe('https://tieraerztekammer-hamburg.de/aktueller-notdienstplan');
        expect(screen.getByRole('link', { name: 'Submit an English-speaking vet' }).getAttribute('href'))
            .toBe('/contact?topic=submit_vet');
        expect(screen.getByText(/community confirmation is evidence, not a guarantee/i)).toBeTruthy();

        const articleSchema = Array.from(
            document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
        )
            .map((script) => JSON.parse(script.textContent || 'null'))
            .find((schema) => schema?.['@type'] === 'Article');

        expect(articleSchema.datePublished).toBe('2026-11-09');
        expect(articleSchema.dateModified).toBe('2026-11-09');
    });
});
