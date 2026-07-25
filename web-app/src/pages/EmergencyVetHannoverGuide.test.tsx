import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetHannoverGuide from './EmergencyVetHannoverGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetHannoverGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetHannoverGuide', () => {
    it('publishes TiHo emergency access for dogs, cats, and exotic pets', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Hannover: TiHo 24-Hour Help (2026)',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            "Need an emergency vet in Hannover? Find TiHo's 24-hour dog-and-cat service, exotic-pet emergency access, warning signs, GOT fees, and call phrases.",
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-hannover',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Hannover: TiHo 24-Hour Help (2026)',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Call TiHo Hannover Small Animal Clinic',
        }).getAttribute('href')).toBe('tel:+495119536200');
        expect(screen.getByRole('link', {
            name: 'Call TiHo Hannover exotic-pet clinic',
        }).getAttribute('href')).toBe('tel:+495119536800');
        expect(screen.getByRole('link', {
            name: 'Official TiHo Hannover emergency information',
        }).getAttribute('href')).toBe(
            'https://www.tiho-hannover.de/kliniken-institute/kliniken/klinik-fuer-kleintiere/notdienst-information',
        );
        expect(screen.getByRole('link', {
            name: 'Official TiHo exotic-pet emergency information',
        }).getAttribute('href')).toBe(
            'https://www.tiho-hannover.de/kliniken-institute/kliniken/klinik-fuer-heimtiere-reptilien-und-voegel/kontakt',
        );
        expect(screen.getByRole('link', {
            name: 'Official Lower Saxony veterinary emergency rules',
        }).getAttribute('href')).toBe(
            'https://www.tknds.de/tieraerzte/gesetze-verordnungen/notfalldienstordnung/',
        );
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Hannover',
        }).getAttribute('href')).toBe('/vets/hannover');
        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Hamburg',
        }).getAttribute('href')).toBe('/blog/emergency-vet-hamburg-english');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official sources on 25 July 2026/i);
        expect(articleText).toMatch(/24-hour emergency service/i);
        expect(articleText).toMatch(/critical and acutely life-threatening emergencies.*around the clock/i);
        expect(articleText).toMatch(/triage/i);
        expect(articleText).toMatch(/not time-critical.*another suitable provider/i);
        expect(articleText).toMatch(/rabbits, small mammals, birds, reptiles, and amphibians/i);
        expect(articleText).toMatch(/cannot reach the exotic-pet clinic by phone.*come directly/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-hannover',
        );
        expect(schema.datePublished).toBe('2026-07-25');
        expect(schema.dateModified).toBe('2026-07-25');
    });
});
