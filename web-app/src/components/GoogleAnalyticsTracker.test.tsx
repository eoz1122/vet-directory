import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import GoogleAnalyticsTracker from './GoogleAnalyticsTracker';

function NavigationHarness() {
    const navigate = useNavigate();

    return (
        <>
            <GoogleAnalyticsTracker />
            <button type="button" onClick={() => navigate('/contact?from=test')}>
                Contact
            </button>
        </>
    );
}

describe('GoogleAnalyticsTracker', () => {
    it('does not load the live Google tag unconditionally in local previews', () => {
        const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
        expect(html).not.toContain('<script async src="https://www.googletagmanager.com');
        expect(html).toContain("['englishspeakinggermany.online', 'www.englishspeakinggermany.online'].includes(window.location.hostname)");
    });
    it('does not send query-string personal data in page views', () => {
        render(<MemoryRouter initialEntries={['/contact?email=private@example.test&message=private']}><GoogleAnalyticsTracker /></MemoryRouter>);
        act(() => vi.runOnlyPendingTimers());
        const calls = JSON.stringify(vi.mocked(window.gtag).mock.calls);
        expect(calls).not.toContain('private');
        expect(calls).toContain('page_location');
    });
    beforeEach(() => {
        vi.useFakeTimers();
        localStorage.setItem('cookie-consent', 'accepted');
        window.gtag = vi.fn();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('disables the automatic page view in the initial Google tag configuration', () => {
        const indexHtml = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

        expect(indexHtml).toContain("'send_page_view': false");
        expect(indexHtml).not.toContain("'send_page_view': true");
    });

    it('sends exactly one explicit page view for each SPA route', () => {
        render(
            <MemoryRouter initialEntries={['/vets/berlin']}>
                <NavigationHarness />
            </MemoryRouter>,
        );

        expect(window.gtag).not.toHaveBeenCalled();
        act(() => vi.runOnlyPendingTimers());

        expect(window.gtag).toHaveBeenCalledTimes(1);
        expect(window.gtag).toHaveBeenLastCalledWith('event', 'page_view', {
            page_path: '/vets/berlin',
            page_location: window.location.origin + '/vets/berlin',
            page_title: document.title,
        });

        fireEvent.click(document.querySelector('button') as HTMLButtonElement);

        act(() => vi.runOnlyPendingTimers());

        expect(window.gtag).toHaveBeenCalledTimes(2);
        expect(window.gtag).toHaveBeenLastCalledWith('event', 'page_view', {
            page_path: '/contact',
            page_location: window.location.origin + '/contact',
            page_title: document.title,
        });
    });

    it('starts on consent and stops after consent is withdrawn', () => {
        localStorage.setItem('cookie-consent', 'declined');

        render(
            <MemoryRouter initialEntries={['/vets/berlin']}>
                <NavigationHarness />
            </MemoryRouter>,
        );

        act(() => vi.runOnlyPendingTimers());
        expect(window.gtag).not.toHaveBeenCalled();

        localStorage.setItem('cookie-consent', 'accepted');
        act(() => window.dispatchEvent(new Event('analytics-consent-granted')));
        act(() => vi.runOnlyPendingTimers());

        expect(window.gtag).toHaveBeenCalledTimes(1);
        expect(window.gtag).toHaveBeenLastCalledWith('event', 'page_view', {
            page_path: '/vets/berlin',
            page_location: window.location.origin + '/vets/berlin',
            page_title: document.title,
        });

        localStorage.setItem('cookie-consent', 'declined');
        fireEvent.click(document.querySelector('button') as HTMLButtonElement);
        act(() => vi.runOnlyPendingTimers());

        expect(window.gtag).toHaveBeenCalledTimes(1);
    });
});
