import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

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
});
