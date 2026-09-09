import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Footer from './Footer';

describe('Footer', () => {
    it('uses the current year and mobile-sized navigation targets', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeTruthy();

        const navigation = screen.getByRole('navigation');
        for (const link of within(navigation).getAllByRole('link')) {
            expect(link.className).toContain('min-h-11');
        }
    });

    it('provides a persistent control for reopening cookie settings', () => {
        const listener = vi.fn();
        window.addEventListener('open-cookie-settings', listener);

        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'Cookie settings' }));
        expect(listener).toHaveBeenCalledTimes(1);

        window.removeEventListener('open-cookie-settings', listener);
    });
});
