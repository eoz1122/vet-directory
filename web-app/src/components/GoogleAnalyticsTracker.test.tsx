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
    beforeEach(() => {
        vi.useFakeTimers();
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
            page_title: document.title,
        });

        fireEvent.click(document.querySelector('button') as HTMLButtonElement);

        act(() => vi.runOnlyPendingTimers());

        expect(window.gtag).toHaveBeenCalledTimes(2);
        expect(window.gtag).toHaveBeenLastCalledWith('event', 'page_view', {
            page_path: '/contact?from=test',
            page_title: document.title,
        });
    });
});
