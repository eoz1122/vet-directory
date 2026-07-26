import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MapLoadingState from './MapLoadingState';

describe('MapLoadingState', () => {
    it('communicates that the directory map is loading', () => {
        render(<MapLoadingState />);

        expect(screen.getByRole('status').textContent).toContain('Loading directory map');
        expect(screen.getByRole('status').getAttribute('aria-live')).toBe('polite');
    });
});
