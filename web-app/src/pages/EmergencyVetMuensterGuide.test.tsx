import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import EmergencyVetMuensterGuide from './EmergencyVetMuensterGuide';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

const renderGuide = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <EmergencyVetMuensterGuide />
        </MemoryRouter>
    </HelmetProvider>,
);

const getArticleSchema = () => Array.from(
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
)
    .map((script) => JSON.parse(script.textContent || 'null'))
    .find((schema) => schema?.['@type'] === 'Article');

describe('EmergencyVetMuensterGuide', () => {
    it('publishes the chamber calendar workflow without freezing a daily practice into the guide', async () => {
        renderGuide();

        await waitFor(() => {
            expect(document.title).toBe(
                'Emergency Vet Münster: Official 2026 Duty Rota',
            );
        });

        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toBe(
            'Need an emergency vet in Münster? Use the official 2026 rota and participating-practice list, call-ahead steps, 08:00 handover time, warning signs, and GOT fees.',
        );
        expect(
            document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-muenster',
        );
        expect(screen.getByRole('heading', {
            level: 1,
            name: 'Emergency Vet Münster: Official 2026 Duty Rota',
        })).toBeTruthy();

        expect(screen.getByRole('link', {
            name: 'Open the official Münster 2026 veterinary duty calendar',
        }).getAttribute('href')).toBe('https://www.tieraerztekammer-wl.de/fileadmin/user_upload/tak/04_Fuer_Tierhalter/04.3_Notdienst-Finder/NotdienstMuenster2026_040626.pdf');
        expect(screen.getByRole('link', {
            name: 'Official Westfalen-Lippe veterinary emergency finder',
        }).getAttribute('href')).toBe('https://www.tieraerztekammer-wl.de/fuer-tierhalter/notdienst-finder/');
        expect(screen.getByRole('link', {
            name: 'Official Münster participating-practice list',
        }).getAttribute('href')).toBe('https://www.tieraerztekammer-wl.de/fileadmin/user_upload/tak/04_Fuer_Tierhalter/04.3_Notdienst-Finder/NamenslisteKollegenNotdienstMuenster2025Neu.pdf');
        expect(screen.getByRole('link', {
            name: 'Official Münster veterinary emergency instructions',
        }).getAttribute('href')).toBe('https://www.tieraerztekammer-wl.de/fileadmin/user_upload/tak/04_Fuer_Tierhalter/04.3_Notdienst-Finder/Was_tun_im_Notfall.pdf');
        expect(screen.getByRole('link', {
            name: 'Browse English-speaking vets in Münster',
        }).getAttribute('href')).toBe('/vets/münster');

        const articleText = document.body.textContent || '';
        expect(articleText).toMatch(/checked against official chamber sources on 26 July 2026/i);
        expect(articleText).toMatch(/2026 calendar.*updated on 4 June 2026/i);
        expect(articleText).toMatch(/does not publish a central.*number/i);
        expect(articleText).toMatch(/08:00.*following day at 08:00/i);
        expect(articleText).toMatch(/call.*before travelling/i);
        expect(articleText).toMatch(/regular veterinarian.*voicemail.*duty practice/i);
        expect(articleText).toMatch(/house visits are not available/i);
        expect(articleText).toMatch(/organise.*transport/i);
        expect(articleText).toMatch(/payment.*usually.*immediately.*cash/i);
        expect(articleText).toMatch(/English availability is not guaranteed/i);
        expect(articleText).toMatch(/€59\.50 gross emergency-service fee/i);
        expect(articleText).toMatch(/two to four times the GOT rate/i);
        expect(articleText).not.toMatch(/fixed 24-hour clinic in Münster/i);
        expect(articleText).not.toMatch(/English-speaking staff/i);
        expect(articleText).not.toMatch(/can wait.*morning/i);

        const schema = getArticleSchema();
        expect(schema.url).toBe(
            'https://englishspeakinggermany.online/guides/emergency-vets-muenster',
        );
        expect(schema.datePublished).toBe('2026-07-26');
        expect(schema.dateModified).toBe('2026-07-26');
    });
});
