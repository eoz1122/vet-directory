import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import GuideDisclaimer from './GuideDisclaimer';

describe('GuideDisclaimer', () => {
    it('keeps safety guidance clear without making drafting tools the focus', () => {
        render(
            <MemoryRouter>
                <GuideDisclaimer />
            </MemoryRouter>,
        );

        expect(screen.getByText(/review source links and clinic details periodically/i)).toBeTruthy();
        expect(screen.getByRole('link', { name: 'report an outdated detail' }).getAttribute('href'))
            .toBe('/contact?topic=report_issue');
        expect(screen.queryByText(/created with AI assistance/i)).toBeNull();
    });
});
