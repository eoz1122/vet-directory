import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from './Pagination';

describe('Pagination accessibility', () => {
    it('keeps the small page separator readable', () => {
        render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />);

        expect(screen.getByText('of').className).toContain('text-primary/70');
    });
});
