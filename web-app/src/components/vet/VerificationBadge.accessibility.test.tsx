import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Vet } from '../../types/vet';
import { VerificationBadge } from './VerificationBadge';

const vet: Vet = {
    id: 'badge-test',
    practice_name: 'Badge Test Clinic',
    city: 'Berlin',
    district: 'Mitte',
    address: 'Example Street 1, Berlin',
    coordinates: { lat: 52.52, lng: 13.405 },
    contact: { website: null, phone: null, google_maps: null },
    verification: {
        status: 'Verified',
        last_scanned: '2026-07-01',
        english_signals: ['Community confirmation'],
    },
    community_status: 'Verified',
};

describe('VerificationBadge accessibility', () => {
    it('exposes its explanation through a keyboard and touch operable button', () => {
        render(<VerificationBadge vet={vet} />);

        const trigger = screen.getByRole('button', {
            name: 'Verification evidence: Community Confirmed',
        });
        expect(trigger.getAttribute('aria-expanded')).toBe('false');
        expect(trigger.className).toContain('min-h-11');

        fireEvent.click(trigger);

        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        expect(screen.getByRole('tooltip').textContent).toContain(
            'Community members have confirmed English availability.',
        );
    });
});
