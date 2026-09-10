import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import ArticleHeader from './ArticleHeader';

describe('ArticleHeader', () => {
    it('renders a consistent eyebrow, title and review metadata hierarchy', () => {
        render(
            <MemoryRouter>
                <ArticleHeader eyebrow="Evidence-based guide" title="Example title" review="Reviewed periodically" />
            </MemoryRouter>,
        );

        expect(screen.getByText('Evidence-based guide').className).toContain('uppercase');
        expect(screen.getByRole('heading', { level: 1, name: 'Example title' }).className).toContain('text-4xl');
        expect(screen.getByText('Reviewed periodically').className).toContain('text-sm');
    });
});
