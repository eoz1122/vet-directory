import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import BlogSidebar from './BlogSidebar';

describe('BlogSidebar', () => {
    it('uses the shared catalogue for current high-priority guides', () => {
        render(
            <MemoryRouter initialEntries={['/blog/dog-liability-insurance-germany']}>
                <BlogSidebar />
            </MemoryRouter>,
        );

        const currentGuide = screen.getByRole('link', {
            name: /Dog Liability Insurance in Germany/i,
        });
        expect(currentGuide.getAttribute('href')).toBe(
            '/blog/dog-liability-insurance-germany',
        );
        expect(currentGuide.className).toMatch(/bg-accent/);
        expect(screen.queryByText('Live Sync')).toBeNull();
    });
});
