import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetMainzGuide from './EmergencyVetMainzGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetMainzGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetMainzGuide', () => {
    it('publishes the live rota workflow and keeps Hofheim clearly separated as the fallback', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Mainz: Live Daily Rota and 24/7 Fallback',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Mainz? Use the city-linked daily rota, call-ahead steps, Tierklinik Hofheim 24/7 fallback, warning signs, and GOT fees.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-mainz',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Mainz: Live Daily Rota and 24/7 Fallback',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Open the Mainz city-linked veterinary emergency rota',
        }).getAttribute('href')).toBe('https://www.mainzer-marktplatz.de/notdienste/tieraerzte.htm');
        expect(screen.getByRole('link', {
            name: 'City of Mainz emergency-service source',
        }).getAttribute('href')).toBe('https://www.mainz.de/vv/produkte/z_haeufig-gesuchte-nichtstaedtische-dienstleistungen/tier-im-tierheim-abgeben');
        expect(screen.getByRole('link', {
            name: 'Mainz practice call-ahead guidance',
        }).getAttribute('href')).toBe('https://www.tierarzt-mainz.de/wordpress/sprechzeiten/');
        expect(screen.getByRole('link', {
            name: 'Tierklinik Hofheim live emergency information and capacity',
        }).getAttribute('href')).toBe('https://www.tierklinik-hofheim.de/die-klinik/notfallambulanz.html');
        expect(screen.getByRole('link', {
            name: 'Call Tierklinik Hofheim during weekday phone hours',
        }).getAttribute('href')).toBe('tel:+496192290290');
        expect(screen.getByRole('link', {
            name: 'Get directions to Tierklinik Hofheim',
        }).getAttribute('href')).toContain('Katharina-Kemmler-Stra%C3%9Fe+7');
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Mainz',
        }).getAttribute('href')).toBe('/vets/mainz');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked.*26 July 2026/i);
        expect(articleText).toMatch(/City of Mainz links.*daily rota/i);
        expect(articleText).toMatch(/last changed on 23 July 2026/i);
        expect(articleText).toMatch(/does not publish one universal set of local duty hours/i);
        expect(articleText).toMatch(/call.*before travelling/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/24 hours a day.*all year/i);
        expect(articleText).toMatch(/Monday to Friday.*08:00.*19:00.*call/i);
        expect(articleText).toMatch(/nights and weekends.*phone is not staffed.*arrive directly/i);
        expect(articleText).toMatch(/live capacity light.*red/i);
        expect(articleText).toMatch(/life-threatening.*patients/i);
        expect(articleText).toMatch(/does not treat birds or reptiles/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/Ralph M\. Schuh/i);
        expect(articleText).not.toMatch(/fixed 24-hour clinic in Mainz/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-mainz',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
