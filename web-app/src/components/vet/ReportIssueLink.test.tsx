import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import ReportIssueLink from './ReportIssueLink';

function LocationStateProbe() {
    const location = useLocation();
    return <output>{JSON.stringify(location.state)}</output>;
}

describe('ReportIssueLink', () => {
    it('keeps report details out of the URL and passes them as navigation state', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={(
                            <ReportIssueLink
                                vetId="Berlin-17"
                                vetName="Tierarztpraxis Bartels & Wende"
                                reason="Data Incorrect"
                            >
                                Report Issue
                            </ReportIssueLink>
                        )}
                    />
                    <Route path="/contact" element={<LocationStateProbe />} />
                </Routes>
            </MemoryRouter>,
        );

        const link = screen.getByRole('link', { name: 'Report Issue' });
        expect(link.getAttribute('href')).toBe('/contact');

        fireEvent.click(link);

        expect(screen.getByText(JSON.stringify({
            topic: 'report_issue',
            vetId: 'Berlin-17',
            vetName: 'Tierarztpraxis Bartels & Wende',
            reason: 'Data Incorrect',
        }))).toBeTruthy();
    });
});
