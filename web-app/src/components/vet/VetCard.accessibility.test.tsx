import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import type { VetWithDistance } from '../../types/vet';
import { VetCard } from './VetCard';

vi.mock('./ConfirmEnglish', () => ({ ConfirmEnglish: () => null }));

const vet: VetWithDistance = {
    id: 'test-vet',
    practice_name: 'Test Veterinary Clinic',
    city: 'Berlin',
    district: 'Mitte',
    address: 'Example Street 1, Berlin',
    coordinates: { lat: 52.52, lng: 13.405 },
    contact: {
        website: 'https://example.test',
        phone: '+49 30 123456',
        google_maps: 'https://maps.example.test',
    },
    verification: {
        status: 'Verified',
        last_scanned: '2026-07-01',
        english_signals: ['English-speaking staff'],
    },
    community_status: 'Verified',
};

describe('VetCard accessibility', () => {
    it('shows first-party website evidence without describing it as community confirmation', () => {
        const officialVet = {
            ...vet,
            verification: {
                ...vet.verification,
                evidence_type: 'official_website',
            },
        } as VetWithDistance;

        render(
            <VetCard
                vet={officialVet}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByText('Official Website')).toBeTruthy();
        expect(screen.getByText('Official Website Confirmed')).toBeTruthy();
        expect(screen.queryByText('Community Verified')).toBeNull();
    });

    it('gives each practice website link a unique accessible purpose', () => {
        render(
            <VetCard
                vet={vet}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByRole('link', { name: 'Visit Test Veterinary Clinic website' })).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Call Test Veterinary Clinic' })).toBeTruthy();
    });

    it('tracks the practice identity when a visitor starts a phone call', () => {
        const gtag = vi.fn();
        (window as unknown as { gtag: unknown }).gtag = gtag;

        render(
            <VetCard
                vet={vet}
                analyticsLocation="CityVets_Page"
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        const callLink = screen.getByRole('link', { name: 'Call Test Veterinary Clinic' });
        expect(callLink.getAttribute('href')).toBe('tel:+49 30 123456');
        callLink.addEventListener('click', (event) => event.preventDefault());
        fireEvent.click(callLink);

        expect(gtag).toHaveBeenCalledWith('event', 'vet_phone_click', {
            vet_id: 'test-vet',
            city: 'Berlin',
            location: 'CityVets_Page',
            event_category: 'contact',
            event_label: 'test-vet',
        });
    });

    it('places a 24-hour emergency call before the website and makes it prominent', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    verification: {
                        ...vet.verification,
                        emergency_services: '24/7',
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        const callLink = screen.getByRole('link', { name: 'Call Test Veterinary Clinic' });
        const websiteLink = screen.getByRole('link', {
            name: 'Visit Test Veterinary Clinic website',
        });
        const links = [...callLink.parentElement!.querySelectorAll('a')];

        expect(links.indexOf(callLink)).toBeLessThan(links.indexOf(websiteLink));
        expect(callLink.className).toContain('bg-red-600');
        expect(callLink.className).toContain('w-full');
    });

    it('keeps the direct call action when a practice has no website', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    contact: {
                        ...vet.contact,
                        website: null,
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByRole('link', { name: 'Call Test Veterinary Clinic' })).toBeTruthy();
        expect(screen.queryByRole('link', {
            name: 'Visit Test Veterinary Clinic website',
        })).toBeNull();
    });

    it('gives a linked district chip a full touch target', () => {
        render(
            <MemoryRouter>
                <VetCard
                    vet={vet}
                    isSelected={false}
                    onSelect={vi.fn()}
                    onReportIssue={vi.fn()}
                    linkDistrict
                />
            </MemoryRouter>,
        );

        const districtLink = screen.getByRole('link', { name: 'Mitte' });
        expect(districtLink.className).toContain('min-h-11');
        expect(districtLink.className).toContain('min-w-11');
    });

    it('uses readable text colors for small card metadata', () => {
        render(
            <VetCard
                vet={vet}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByText('Mitte').className).toContain('text-accent-ink');
        expect(screen.getByText('Example Street 1, Berlin').className).toContain('text-primary/80');
        const evidence = screen.getByText('English-speaking staff');
        expect(evidence.className).toContain('text-primary/80');
        expect(evidence.className).not.toContain('line-clamp');
        expect(screen.getByText('Verified: Jul 2026').className).toContain('text-gray-600');
    });

    it('does not add a second pair of quotation marks around review evidence', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    verification: {
                        ...vet.verification,
                        english_signals: ['Confirmed via Google Review: "speaks English"'],
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByText('Confirmed via Google Review: "speaks English"')).toBeTruthy();
        expect(screen.queryByText('"Confirmed via Google Review: "speaks English""')).toBeNull();
    });

    it('prefers the complete English evidence when a legacy signal contains fragments', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    verification: {
                        ...vet.verification,
                        english_signals: [
                            'Confirmed via Google Review: "and nurses."; Confirmed via Google Review: "English speaking vets and nurses."',
                        ],
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(
            screen.getByText('Confirmed via Google Review: "English speaking vets and nurses."'),
        ).toBeTruthy();
        expect(screen.queryByText(/"and nurses\."/)).toBeNull();
    });

    it('chooses the strongest English evidence across every stored signal', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    verification: {
                        ...vet.verification,
                        english_signals: [
                            'Confirmed via Google Review: "and nurses."',
                            'Confirmed via Google Review: "English speaking vets and nurses."',
                        ],
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(
            screen.getByText('Confirmed via Google Review: "English speaking vets and nurses."'),
        ).toBeTruthy();
        expect(screen.queryByText(/"and nurses\."/)).toBeNull();
    });

    it('replaces a review fragment that does not substantiate English support', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    verification: {
                        ...vet.verification,
                        english_signals: ['Confirmed via Google Review: "was super kind and spoke"'],
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(
            screen.getByText('Community confirmation recorded; confirm English availability when booking.'),
        ).toBeTruthy();
        expect(screen.queryByText(/was super kind and spoke/)).toBeNull();
    });

    it('cleans a truncated trailing hyphen from review evidence', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    verification: {
                        ...vet.verification,
                        english_signals: ['Confirmed via Google Review: "English and German-"'],
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByText('Confirmed via Google Review: "English and German."')).toBeTruthy();
        expect(screen.queryByText(/German-/)).toBeNull();
    });

    it('shows a clear map action and contact explanation when no direct contact is listed', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    contact: {
                        website: null,
                        phone: null,
                        google_maps: null,
                    },
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByText('No direct website or phone listed')).toBeTruthy();
        expect(
            screen.getByRole('link', { name: 'Search for Test Veterinary Clinic on Google Maps' })
                .textContent,
        ).toContain('Search on Google Maps');
    });

    it('clearly labels a specialist-only practice focus', () => {
        render(
            <VetCard
                vet={{
                    ...vet,
                    practice_focus: 'Exotic pets, zoo animals and wildlife',
                }}
                isSelected={false}
                onSelect={vi.fn()}
                onReportIssue={vi.fn()}
            />,
        );

        expect(screen.getByText('Specialist practice')).toBeTruthy();
        expect(screen.getByText('Exotic pets, zoo animals and wildlife')).toBeTruthy();
    });

    it('provides named keyboard controls for map selection and issue reporting', () => {
        const onSelect = vi.fn();
        const onReportIssue = vi.fn();
        render(
            <VetCard
                vet={vet}
                isSelected={false}
                onSelect={onSelect}
                onReportIssue={onReportIssue}
            />,
        );

        expect(screen.getByRole('link', { name: 'View Test Veterinary Clinic on Google Maps' })).toBeTruthy();

        const directoryMapButton = screen.getByRole('button', { name: 'Show Test Veterinary Clinic on the directory map' });
        fireEvent.click(directoryMapButton);
        expect(onSelect).toHaveBeenCalledWith(vet);

        const reportButton = screen.getByRole('button', { name: 'Report issue for Test Veterinary Clinic' });
        expect(reportButton.className).toContain('min-h-11');
        fireEvent.click(reportButton);
        expect(onReportIssue).toHaveBeenCalledWith(vet, reportButton);
    });
});
