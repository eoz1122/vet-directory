import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import DistrictVets from './DistrictVets';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/vet/ConfirmEnglish', () => ({ ConfirmEnglish: () => null }));
vi.mock('../components/vet/ReportIssueLink', () => ({ default: () => null }));

function renderDistrict(path: string) {
    return render(
        <HelmetProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/vets/:city/:district" element={<DistrictVets />} />
                </Routes>
            </MemoryRouter>
        </HelmetProvider>,
    );
}

function getStructuredData(type: string) {
    return Array.from(
        document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    )
        .map((script) => JSON.parse(script.textContent || 'null'))
        .find((schema) => schema?.['@type'] === type);
}

describe('DistrictVets search and trust contract', () => {
    it('uses the first-party evidence label for the Leutzsch practice', () => {
        renderDistrict('/vets/leipzig/leutzsch');

        expect(screen.getByText('Official Website')).toBeTruthy();
        expect(screen.getByText('Official Website Confirmed')).toBeTruthy();
        expect(screen.queryByText('Community Verified')).toBeNull();
    });

    it('uses count, district, and city in the title with listing-derived copy', async () => {
        renderDistrict('/vets/berlin/prenzlauer-berg');

        await waitFor(() => {
            expect(document.title).toBe(
                '3 English-Speaking Vets in Prenzlauer Berg, Berlin',
            );
        });

        expect(screen.getByRole('heading', {
            level: 1,
            name: '3 English-Speaking Vets in Prenzlauer Berg, Berlin',
        })).toBeTruthy();
        expect(screen.getAllByText(/3 are community-confirmed/i).length).toBeGreaterThan(0);
        expect(screen.queryByText(/community-Verified/i)).toBeNull();
        expect(screen.queryByText(/without any language barriers/i)).toBeNull();
        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toContain('Prenzlauer Berg, Berlin');
    });

    it('does not describe every listed practice as verified', () => {
        renderDistrict('/vets/hamburg/bramfeld');

        expect(screen.getByRole('heading', {
            level: 2,
            name: '2 Practices Listed in Bramfeld',
        })).toBeTruthy();
        expect(screen.getByText('Community Listed')).toBeTruthy();
        expect(screen.getByText('English availability: confirm when booking')).toBeTruthy();
    });

    it('describes every visible Plagwitz practice as a positioned collection item', async () => {
        renderDistrict('/vets/leipzig/plagwitz');

        await waitFor(() => {
            expect(getStructuredData('CollectionPage')).toBeTruthy();
        });

        const collection = getStructuredData('CollectionPage');
        expect(collection.name).toBe('1 English-Speaking Vet in Plagwitz, Leipzig');
        expect(collection.url).toBe(
            'https://englishspeakinggermany.online/vets/leipzig/plagwitz',
        );
        expect(collection.mainEntity['@type']).toBe('ItemList');
        expect(collection.mainEntity.numberOfItems).toBe(1);
        expect(collection.mainEntity.itemListElement).toEqual([
            {
                '@type': 'ListItem',
                position: 1,
                item: {
                    '@type': 'VeterinaryCare',
                    name: 'Tierarztpraxis Plagwitz',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'Zschochersche Str. 82, 04229 Leipzig',
                        addressLocality: 'Leipzig',
                        addressCountry: 'DE',
                    },
                    url: 'https://www.tierarztpraxis-plagwitz.de',
                },
            },
        ]);
    });

    it('does not publish a practice collection for an empty district', async () => {
        renderDistrict('/vets/leipzig/not-listed');

        await waitFor(() => {
            expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content'))
                .toBe('noindex');
        });

        expect(getStructuredData('CollectionPage')).toBeUndefined();
    });
});
