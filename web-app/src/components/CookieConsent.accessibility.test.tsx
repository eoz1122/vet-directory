import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import CookieConsent from './CookieConsent';

describe('CookieConsent accessibility', () => {
    beforeEach(() => {
        localStorage.removeItem('cookie-consent');
    });

    it('uses a readable foreground and background for the accept action', () => {
        render(
            <MemoryRouter>
                <CookieConsent />
            </MemoryRouter>,
        );

        const acceptButton = screen.getByRole('button', { name: 'Accept All' });
        expect(acceptButton.className).toContain('bg-accent-ink');
        expect(acceptButton.className).toContain('text-white');
        expect(screen.getByRole('region', { name: 'Cookie Settings' })).toBeTruthy();
    });
});
