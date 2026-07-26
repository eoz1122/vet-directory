import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import Header from './Header';

describe('Header', () => {
    it('provides 44 pixel navigation targets without bright-orange text', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        const navigation = screen.getByRole('navigation');
        for (const link of within(navigation).getAllByRole('link')) {
            expect(link.className).toContain('min-h-11');
        }
        expect(within(navigation).getByRole('link', { name: /Directory/ }).className)
            .toContain('text-accent-ink');
    });
});
