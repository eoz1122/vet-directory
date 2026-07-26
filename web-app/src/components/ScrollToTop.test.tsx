import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
    beforeEach(() => {
        vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
            callback(0);
            return 1;
        });
        vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
        Object.defineProperty(window, 'scrollY', {
            configurable: true,
            value: 200,
        });
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('scrolls ordinary route changes to the top', async () => {
        render(
            <MemoryRouter initialEntries={['/guide']}>
                <ScrollToTop />
            </MemoryRouter>,
        );

        await waitFor(() => {
            expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
        });
    });

    it('scrolls an initial hash visit to the matching section with the header offset', async () => {
        render(
            <MemoryRouter initialEntries={['/guide#how-to-choose']}>
                <ScrollToTop />
                <div
                    id="how-to-choose"
                    ref={(element) => {
                        if (element) {
                            element.getBoundingClientRect = () => ({
                                bottom: 500,
                                height: 80,
                                left: 0,
                                right: 300,
                                top: 420,
                                width: 300,
                                x: 0,
                                y: 420,
                                toJSON: () => ({}),
                            });
                        }
                    }}
                />
            </MemoryRouter>,
        );

        await waitFor(() => {
            expect(window.scrollTo).toHaveBeenCalledWith({
                behavior: 'auto',
                top: 520,
            });
        });
    });

    it('waits for a lazy route to render the hash target', async () => {
        render(
            <MemoryRouter initialEntries={['/guide#labels']}>
                <ScrollToTop />
            </MemoryRouter>,
        );

        const target = document.createElement('span');
        target.id = 'labels';
        target.getBoundingClientRect = () => ({
            bottom: 700,
            height: 0,
            left: 0,
            right: 300,
            top: 700,
            width: 300,
            x: 0,
            y: 700,
            toJSON: () => ({}),
        });
        document.body.appendChild(target);

        await waitFor(() => {
            expect(window.scrollTo).toHaveBeenCalledWith({
                behavior: 'auto',
                top: 800,
            });
        });
    });
});
