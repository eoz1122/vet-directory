import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import ArticleLayout from './ArticleLayout';

vi.mock('./Header', () => ({ default: () => <header data-testid="site-header" /> }));
vi.mock('./Footer', () => ({ default: () => <footer data-testid="site-footer" /> }));
vi.mock('./BlogSidebar', () => ({ default: () => <aside data-testid="guide-sidebar" /> }));

const renderLayout = (children: ReactNode) => render(
    <MemoryRouter>
        <ArticleLayout>{children}</ArticleLayout>
    </MemoryRouter>,
);

describe('ArticleLayout', () => {
    it('provides one consistent responsive article frame', () => {
        renderLayout(<h1>Example guide</h1>);

        expect(screen.getByTestId('site-header')).toBeTruthy();
        expect(screen.getByTestId('site-footer')).toBeTruthy();
        expect(screen.getByTestId('guide-sidebar')).toBeTruthy();
        expect(screen.getByRole('main').className).toContain('max-w-7xl');
        expect(screen.getByRole('article').className).toContain('max-w-4xl');
        expect(screen.getByRole('heading', { name: 'Example guide' })).toBeTruthy();
    });
});
