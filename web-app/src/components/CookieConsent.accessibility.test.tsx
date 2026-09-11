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
        const region = screen.getByRole('region', { name: 'Cookie Settings' });
        expect(region).toBeTruthy();
        expect(region.className).toContain('max-h-[45vh]');
        expect(region.className).toContain('overflow-y-auto');
        expect(acceptButton.className).toContain('min-h-11');
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

    it('only announces a new analytics opt-in when consent changes to accepted', () => {
        const consentGrantedListener = vi.fn();
        window.addEventListener('analytics-consent-granted', consentGrantedListener);

        const { unmount } = render(
            <MemoryRouter>
                <CookieConsent />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Accept analytics' }));
        expect(consentGrantedListener).toHaveBeenCalledTimes(1);

        act(() => window.dispatchEvent(new Event('open-cookie-settings')));
        fireEvent.click(screen.getByRole('button', { name: 'Accept analytics' }));
        expect(consentGrantedListener).toHaveBeenCalledTimes(1);

        unmount();
        window.removeEventListener('analytics-consent-granted', consentGrantedListener);
    });
});
