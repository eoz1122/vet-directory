import { render, screen, waitFor } from '@testing-library/react';
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

        expect(screen.getAllByText('Official Website')).toHaveLength(3);
        expect(screen.getAllByText('Official Website Confirmed')).toHaveLength(3);
        expect(screen.getByText(/3 are confirmed by their official websites/i)).toBeTruthy();
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

    it('does not label every Hamburg listing as verified', async () => {
        renderCity('/vets/hamburg');

        expect(screen.getByRole('heading', {
            level: 2,
            name: '33 Practices Listed in Hamburg',
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

            expect(answers).toContain('31 are community-confirmed');
            expect(answers).not.toContain('community-Verified');
            expect(answers).not.toContain('Every listed vet has been confirmed');
        });
    });
});
