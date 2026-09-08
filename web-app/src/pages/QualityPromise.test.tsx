import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { describe, expect, it } from 'vitest';
import QualityPromise from './QualityPromise';

describe('QualityPromise freshness language', () => {
    it('describes periodic reviews without promising a monthly cadence', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <QualityPromise />
                </MemoryRouter>
            </HelmetProvider>,
        );

        expect(screen.getByText(/periodic freshness checks/i)).toBeTruthy();
        expect(screen.getByText(/review listings periodically/i)).toBeTruthy();
        expect(screen.queryByText(/monthly freshness check/i)).toBeNull();
        expect(screen.queryByText(/every 30 days/i)).toBeNull();
    });
});
