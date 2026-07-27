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
    it.each([
        ['berlin', 'Berlin', 6, 57, 0],
        ['hamburg', 'Hamburg', 4, 29, 2],
        ['munich', 'Munich', 5, 21, 0],
        ['cologne', 'Cologne', 1, 5, 0],
        ['frankfurt', 'Frankfurt', 5, 24, 0],
    ])(
        'shows a scannable evidence and booking guide for %s',
        (slug, city, officialCount, communityCount, pendingCount) => {
            renderCity(`/vets/${slug}`);

            const evidence = screen.getByRole('region', {
                name: `How we verify ${city} listings`,
            });
            expect(within(evidence).getByText('Official website')).toBeTruthy();
            expect(within(evidence).getByText(`${officialCount} ${officialCount === 1 ? 'listing' : 'listings'}`))
                .toBeTruthy();
            expect(within(evidence).getByText('Community confirmed')).toBeTruthy();
            expect(within(evidence).getByText(`${communityCount} listings`)).toBeTruthy();

            if (pendingCount) {
                expect(within(evidence).getByText('Confirmation needed')).toBeTruthy();
                expect(within(evidence).getByText(`${pendingCount} listings`)).toBeTruthy();
            } else {
                expect(within(evidence).queryByText('Confirmation needed')).toBeNull();
            }

            expect(within(evidence).getByRole('link', {
                name: 'Read our Quality Promise',
            }).getAttribute('href')).toBe('/quality-promise');

            const booking = screen.getByRole('region', {
                name: `Before booking a vet in ${city}`,
            });
            expect(within(booking).getByText('Check the evidence source')).toBeTruthy();
            expect(within(booking).getByText('Confirm English for your appointment')).toBeTruthy();
            expect(within(booking).getByText('Confirm services, hours and likely fees')).toBeTruthy();
            expect(booking.textContent).not.toMatch(/accepting new patients/i);
        },
    );

    it('distinguishes official website evidence on the Leipzig page', () => {
        renderCity('/vets/leipzig');

        expect(screen.getAllByText('Official Website')).toHaveLength(4);
        expect(screen.getAllByText('Official Website Confirmed')).toHaveLength(4);
        expect(screen.getByText(/4 are confirmed by their official websites/i)).toBeTruthy();
        expect(screen.queryByRole('region', {
            name: 'How we verify Leipzig listings',
        })).toBeNull();
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
        expect(screen.getByText(/6 are confirmed by their official websites/i)).toBeTruthy();
        expect(screen.queryByText(/Each listing has been carefully vetted/i)).toBeNull();
        expect(
            document.head.querySelector('meta[name="description"]')?.getAttribute('content'),
        ).toContain('63 verified English-speaking veterinary practices in Berlin');

        await waitFor(() => {
            const collectionSchema = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
                .map((script) => JSON.parse(script.textContent || '{}'))
                .find((schema) => schema['@type'] === 'CollectionPage');

            expect(collectionSchema?.inLanguage).toBe('en');
            expect(collectionSchema?.mainEntity.numberOfItems).toBe(63);
            expect(collectionSchema?.mainEntity.itemListOrder)
                .toBe('https://schema.org/ItemListUnordered');
        });
    });

    it('labels the Bremen exotics listing as a specialist practice', () => {
        renderCity('/vets/bremen');

        expect(screen.getByText('Specialist practice')).toBeTruthy();
        expect(screen.getByText('Exotic pets, zoo animals and wildlife')).toBeTruthy();
    });

    it('keeps Wiesbaden government evidence visibly distinct', async () => {
        renderCity('/vets/wiesbaden');

        expect(screen.getByText('Government Listed')).toBeTruthy();
        expect(screen.getByText('Government Source Confirmed')).toBeTruthy();

        await waitFor(() => {
            const faqSchema = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
                .map((script) => JSON.parse(script.textContent || '{}'))
                .find((schema) => schema['@type'] === 'FAQPage');
            const answers = faqSchema?.mainEntity
                .map((entry: { acceptedAnswer: { text: string } }) => entry.acceptedAnswer.text)
                .join(' ');

            expect(answers).toContain('1 is confirmed by a government veterinary source');
            expect(answers).toContain(
                'Government Listed means a government veterinary source identifies the practice as English-speaking',
            );
        });
    });

    it('shows verified 24-hour emergency service on the Mönchengladbach listing', () => {
        renderCity('/vets/mönchengladbach');

        expect(screen.getByText('24h Emergency Service')).toBeTruthy();
    });

    it('does not label every Hamburg listing as verified', async () => {
        renderCity('/vets/hamburg');

        expect(screen.getByRole('heading', {
            level: 2,
            name: '35 Practices Listed in Hamburg',
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

            expect(answers).toContain('4 have official website confirmation');
            expect(answers).toContain('29 are community-confirmed');
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

    it('links Nuremberg readers to the local emergency guide', () => {
        renderCity('/vets/nuremberg');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Nuremberg',
        }).getAttribute('href')).toBe('/guides/emergency-vets-nuremberg');
    });

    it('links Karlsruhe readers to the local emergency guide', () => {
        renderCity('/vets/karlsruhe');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Karlsruhe',
        }).getAttribute('href')).toBe('/guides/emergency-vets-karlsruhe');
    });

    it('links Bonn readers to the local emergency guide', () => {
        renderCity('/vets/bonn');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Bonn',
        }).getAttribute('href')).toBe('/guides/emergency-vets-bonn');
    });

    it('links Münster readers to the local emergency guide', () => {
        renderCity('/vets/münster');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Münster',
        }).getAttribute('href')).toBe('/guides/emergency-vets-muenster');
    });

    it('links Mainz readers to the local emergency guide', () => {
        renderCity('/vets/mainz');

        expect(screen.getByRole('link', {
            name: 'Emergency vet help in Mainz',
        }).getAttribute('href')).toBe('/guides/emergency-vets-mainz');
    });
});
