import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Vet } from '../../types/vet';
import { ConfirmEnglish } from './ConfirmEnglish';

const vet: Vet = {
    id: 'test-vet',
    practice_name: 'Test Veterinary Clinic',
    city: 'Berlin',
    district: 'Mitte',
    address: 'Example Street 1',
    coordinates: { lat: 52.52, lng: 13.405 },
    contact: { website: null, phone: null },
    verification: {
        status: 'Verified',
        last_scanned: '2026-07-01',
        english_signals: [],
    },
};

describe('ConfirmEnglish accessibility', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    it('keeps focus during submission and announces an API failure', async () => {
        let resolveRequest: ((response: Response) => void) | undefined;
        vi.mocked(fetch).mockReturnValue(new Promise((resolve) => {
            resolveRequest = resolve;
        }));

        render(<ConfirmEnglish vet={vet} />);
        const button = screen.getByRole('button', {
            name: 'Confirm Test Veterinary Clinic speaks English',
        });
        button.focus();
        fireEvent.click(button);

        expect(button.getAttribute('aria-disabled')).toBe('true');
        expect(button.getAttribute('aria-busy')).toBe('true');
        expect(button.hasAttribute('disabled')).toBe(false);
        expect(document.activeElement).toBe(button);

        resolveRequest?.({ ok: false } as Response);

        const alert = await screen.findByRole('alert');
        expect(alert.textContent).toContain('Confirmation failed. Try again.');
        expect(document.activeElement).toBe(button);
    });

    it('announces success and moves focus to the completed status', async () => {
        vi.mocked(fetch).mockResolvedValue({ ok: true } as Response);
        render(<ConfirmEnglish vet={vet} />);

        fireEvent.click(screen.getByRole('button', {
            name: 'Confirm Test Veterinary Clinic speaks English',
        }));

        const status = await screen.findByRole('status');
        await waitFor(() => expect(document.activeElement).toBe(status));
        expect(status.textContent).toContain("Thanks! We'll review your confirmation.");
    });
});
