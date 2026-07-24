import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { MoreCitiesDropdown } from './MoreCitiesDropdown';

describe('MoreCitiesDropdown keyboard behavior', () => {
    it('announces popup state and supports arrow and Escape navigation', async () => {
        const onSelect = vi.fn();
        render(
            <MoreCitiesDropdown
                cities={['Aachen', 'Bonn']}
                selectedCity="All"
                onSelect={onSelect}
            />,
        );

        const trigger = screen.getByRole('button', { name: 'More Cities...' });
        expect(trigger.className).toContain('min-h-11');
        expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
        expect(trigger.getAttribute('aria-expanded')).toBe('false');

        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        expect(trigger.getAttribute('aria-expanded')).toBe('true');

        const firstOption = await screen.findByRole('option', { name: 'Aachen' });
        const secondOption = screen.getByRole('option', { name: 'Bonn' });
        await waitFor(() => expect(document.activeElement).toBe(firstOption));

        fireEvent.keyDown(firstOption, { key: 'ArrowDown' });
        expect(document.activeElement).toBe(secondOption);

        fireEvent.keyDown(secondOption, { key: 'Escape' });
        expect(screen.queryByRole('listbox')).toBeNull();
        expect(document.activeElement).toBe(trigger);
    });
});
