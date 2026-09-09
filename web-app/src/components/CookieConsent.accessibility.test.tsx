import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import CookieConsent from './CookieConsent';

describe('CookieConsent accessibility', () => {
    beforeEach(() => {
        localStorage.removeItem('cookie-consent');
        window.gtag = vi.fn();
    });

    it('uses a readable foreground and background for the accept action', () => {
        render(
            <MemoryRouter>
                <CookieConsent />
            </MemoryRouter>,
        );

        const acceptButton = screen.getByRole('button', { name: 'Accept analytics' });
        expect(acceptButton.className).toContain('bg-accent-ink');
        expect(acceptButton.className).toContain('text-white');
        expect(screen.getByRole('region', { name: 'Cookie Settings' })).toBeTruthy();
    });

    it('lets a visitor reopen settings and withdraw analytics consent', () => {
        render(
            <MemoryRouter>
                <CookieConsent />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Accept analytics' }));
        expect(localStorage.getItem('cookie-consent')).toBe('accepted');
        expect(screen.queryByRole('region', { name: 'Cookie Settings' })).toBeNull();

        act(() => window.dispatchEvent(new Event('open-cookie-settings')));
        fireEvent.click(screen.getByRole('button', { name: 'Decline analytics' }));

        expect(localStorage.getItem('cookie-consent')).toBe('declined');
        expect(window.gtag).toHaveBeenLastCalledWith('consent', 'update', {
            analytics_storage: 'denied',
        });
    });
});
