import { render, screen, waitFor, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import CityVets from './CityVets';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/vet/ConfirmEnglish', () => ({ ConfirmEnglish: () => null }));
vi.mock('../components/vet/ReportIssueLink', () => ({ default: () => null }));

function renderCity(path: string) {
    return render(
        <HelmetProvider>
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="/vets/:city" element={<CityVets />} />
                </Routes>
            </MemoryRouter>
        </HelmetProvider>,
    );
}

describe('CityVets search and trust contract', () => {
    it('distinguishes official website evidence on the Leipzig page', () => {
        renderCity('/vets/leipzig');

        expect(screen.getAllByText('Official Website')).toHaveLength(4);
        expect(screen.getAllByText('Official Website Confirmed')).toHaveLength(4);
        expect(screen.getByText(/4 are confirmed by their official websites/i)).toBeTruthy();
    });

    it('uses a live listing count and leads with evidence-derived Berlin copy', async () => {
        renderCity('/vets/berlin');

        await waitFor(() => {
            expect(document.title).toBe(
                '63 English-Speaking Vets in Berlin | EnglishSpeakingVets',
            );
        });

        expect(screen.getByRole('heading', {
            level: 1,
            name: '63 English-Speaking Vets in Berlin',
        })).toBeTruthy();
        expect(screen.getByText(/We currently list 63 English-speaking veterinary practices in Berlin/i))
            .toBeTruthy();
        expect(screen.queryByText(/Each listing has been carefully vetted/i)).toBeNull();
        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toContain('63 verified English-speaking veterinary practices in Berlin');
    });

    it('labels the Bremen exotics listing as a specialist practice', () => {
        renderCity('/vets/bremen');

        expect(screen.getByText('Specialist practice')).toBeTruthy();
        expect(screen.getByText('Exotic pets, zoo animals and wildlife')).toBeTruthy();
    });

    it('shows verified 24-hour emergency service on the Mönchengladbach listing', () => {
        renderCity('/vets/mönchengladbach');

        expect(screen.getByText('24h Emergency Service')).toBeTruthy();
    });

    it('does not label every Hamburg listing as verified', async () => {
        renderCity('/vets/hamburg');

        expect(screen.getByRole('heading', {
            level: 2,
            name: '34 Practices Listed in Hamburg',
        })).toBeTruthy();
        expect(screen.getAllByText('Community Listed')).toHaveLength(2);
        expect(screen.getAllByText('English availability: confirm when booking')).toHaveLength(2);

        await waitFor(() => {
            const faqSchema = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
                .map((script) => JSON.parse(script.textContent || '{}'))
                .find((schema) => schema['@type'] === 'FAQPage');
            const answers = faqSchema?.mainEntity
                .map((entry: { acceptedAnswer: { text: string } }) => entry.acceptedAnswer.text)
                .join(' ');

            expect(answers).toContain('2 have official website confirmation');
            expect(answers).toContain('30 are community-confirmed');
            expect(answers).not.toContain('community-Verified');
            expect(answers).not.toContain('Every listed vet has been confirmed');
        });
    });

    it('links Berlin to its four nearest verified city directories', () => {
        renderCity('/vets/berlin');

        const nearbyNav = screen.getByRole('navigation', {
            name: 'Nearby English-speaking vets',
        });
        const links = within(nearbyNav).getAllByRole('link');

        expect(links).toHaveLength(4);
        expect(links.map((link) => link.getAttribute('href'))).toEqual([
            '/vets/hoppegarten',
            '/vets/potsdam',
            '/vets/magdeburg',
            '/vets/leipzig',
        ]);
        expect(within(nearbyNav).getByRole('link', {
            name: 'English-speaking vets in Hoppegarten, about 19 km away',
        })).toBeTruthy();
        expect(within(nearbyNav).getByRole('link', {
            name: 'English-speaking vets in Potsdam, about 26 km away',
        })).toBeTruthy();
    });

    it('links Cologne readers to both local practical guides', () => {
        renderCity('/vets/cologne');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Cologne',
        }).getAttribute('href')).toBe('/guides/emergency-vets-cologne');
        expect(screen.getByRole('link', {
            name: 'Public transport with dogs in Cologne',
        }).getAttribute('href')).toBe('/blog/public-transport-with-dogs-cologne');
    });

    it('links Essen readers to the Ruhr emergency guide', () => {
        renderCity('/vets/essen');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Essen and the Ruhr area',
        }).getAttribute('href')).toBe('/guides/emergency-vets-ruhr');
    });

    it('links Dortmund readers to the Ruhr emergency guide', () => {
        renderCity('/vets/dortmund');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Dortmund and the Ruhr area',
        }).getAttribute('href')).toBe('/guides/emergency-vets-ruhr');
    });

    it('links Düsseldorf readers to the Düsseldorf emergency guide', () => {
        renderCity('/vets/düsseldorf');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Düsseldorf',
        }).getAttribute('href')).toBe('/guides/emergency-vets-duesseldorf');
    });

    it('links Stuttgart readers to emergency and public transport guides', () => {
        renderCity('/vets/stuttgart');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Stuttgart',
        }).getAttribute('href')).toBe('/guides/emergency-vets-stuttgart');
        expect(screen.getByRole('link', {
            name: 'Public transport with dogs in Stuttgart',
        }).getAttribute('href')).toBe('/blog/public-transport-with-dogs-stuttgart');
    });

    it('links Hannover readers to the local emergency guide', () => {
        renderCity('/vets/hannover');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Hannover',
        }).getAttribute('href')).toBe('/guides/emergency-vets-hannover');
    });

    it('links Bremen readers to the local emergency guide', () => {
        renderCity('/vets/bremen');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Bremen',
        }).getAttribute('href')).toBe('/guides/emergency-vets-bremen');
    });

    it('links Leipzig readers to the local emergency guide', () => {
        renderCity('/vets/leipzig');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Leipzig',
        }).getAttribute('href')).toBe('/guides/emergency-vets-leipzig');
    });

    it('links Dresden readers to the local emergency guide', () => {
        renderCity('/vets/dresden');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Dresden',
        }).getAttribute('href')).toBe('/guides/emergency-vets-dresden');
    });
});
