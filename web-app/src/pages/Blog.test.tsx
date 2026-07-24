import { render, screen, waitFor, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Blog from './Blog';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));

const renderBlog = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <Blog />
        </MemoryRouter>
    </HelmetProvider>,
);

const guideUrlsIn = (container: ParentNode) => Array.from(
    container.querySelectorAll<HTMLElement>('[data-guide-url]'),
).map((card) => card.getAttribute('data-guide-url'));

describe('Blog guide discovery', () => {
    beforeEach(() => {
        document.title = '';
    });

    it('preserves the current search metadata while adding task navigation', async () => {
        renderBlog();

        await waitFor(() => {
            expect(document.title).toBe('Expat Dog & Cat Guides Germany | EnglishSpeakingVets');
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Essential guides for pet owners in Germany. Dog tax, public transport rules, finding apartments, and EU pet passports explained for expats.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe('https://englishspeakinggermany.online/blog');

        const topicNavigation = screen.getByRole('navigation', { name: 'Guide topics' });
        expect(
            within(topicNavigation).getAllByRole('link').map((link) => link.getAttribute('href')),
        ).toEqual([
            '#start-here',
            '#emergency-vet-care',
            '#moving-paperwork',
            '#health-safety',
            '#everyday-life',
            '#new-pet-essentials',
        ]);
    });

    it('shows every guide once in the approved task-based hierarchy', () => {
        renderBlog();

        const sectionCounts = {
            'start-here': 3,
            'emergency-vet-care': 5,
            'moving-paperwork': 7,
            'health-safety': 9,
            'everyday-life': 9,
            'new-pet-essentials': 3,
        };
        const allGuideUrls = guideUrlsIn(document);

        expect(allGuideUrls).toHaveLength(36);
        expect(new Set(allGuideUrls).size).toBe(36);

        Object.entries(sectionCounts).forEach(([sectionId, count]) => {
            const section = document.getElementById(sectionId);
            expect(section).toBeTruthy();
            expect(guideUrlsIn(section as HTMLElement)).toHaveLength(count);
        });

        expect(guideUrlsIn(document.getElementById('start-here') as HTMLElement)).toEqual([
            '/guides/pet-emergency-germany',
            '/blog/moving-to-germany-with-pet',
            '/blog/pet-friendly-apartments-germany',
        ]);
    });

    it('places the sponsored offer after editorial guidance and removes stale emergency claims', () => {
        renderBlog();

        const startHere = document.getElementById('start-here');
        const sponsoredOffer = screen.getByTestId('sponsored-partner');

        expect(startHere).toBeTruthy();
        expect(
            (startHere?.compareDocumentPosition(sponsoredOffer) ?? 0)
            & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        expect(within(sponsoredOffer).getByText('Sponsored partner')).toBeTruthy();

        expect(screen.getByText('24-Hour Emergency Vets in Berlin')).toBeTruthy();
        expect(screen.getByText(
            'Five clinics from the current Berlin Veterinary Chamber list, verified phone numbers, warning signs, GOT fees, and English call phrases.',
        )).toBeTruthy();
        expect(screen.getByText('24-Hour Emergency Vet Hamburg: What to Call')).toBeTruthy();
        expect(screen.getByText(
            'Use Hamburg’s rotating veterinary duty service, current call number, published hours, warning signs, and GOT fee rules.',
        )).toBeTruthy();
        expect(document.body.textContent).not.toMatch(/24-hour English-speaking vet services/i);
        expect(document.body.textContent).not.toMatch(/English-speaking staff\. Phone numbers/i);
    });
});
