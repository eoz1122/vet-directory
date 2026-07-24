import { fireEvent, render, screen } from '@testing-library/react';
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
        expect(screen.getByText('"English-speaking staff"').className).toContain('text-primary/80');
        expect(screen.getByText('Verified: Jul 2026').className).toContain('text-gray-600');
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
