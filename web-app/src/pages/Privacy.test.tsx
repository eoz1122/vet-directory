import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import Privacy from './Privacy';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));

const renderPrivacy = () => render(
    <HelmetProvider>
        <MemoryRouter>
            <Privacy />
        </MemoryRouter>
    </HelmetProvider>,
);

describe('Privacy affiliate disclosure', () => {
    it('accurately identifies Awin and its pseudonymous affiliate tracking', () => {
        renderPrivacy();

        expect(screen.getByRole('heading', {
            level: 2,
            name: '9. Affiliate-Programme (Awin)',
        })).toBeTruthy();

        const policyLink = screen.getByRole('link', { name: 'Awin-Datenschutzerklärung' });
        expect(policyLink.getAttribute('href')).toBe('https://www.awin.com/gb/privacy');

        const optOutLink = screen.getByRole('link', { name: 'Awin Tracking-Opt-out' });
        expect(optOutLink.getAttribute('href')).toBe('https://www.awin.com/gb/legal/optout');

        const policyText = document.body.textContent || '';
        expect(policyText).toMatch(/pseudonyme Klick- und Transaktionsdaten/i);
        expect(policyText).toMatch(/Tracking-Cookies und weitere Zuordnungsverfahren/i);
        expect(policyText).toMatch(/Provision/i);
        expect(policyText).not.toMatch(/Admitad/i);
    });

    it('allows long legal terms and policy URLs to wrap on mobile', () => {
        renderPrivacy();

        expect(screen.getByRole('main').classList.contains('break-words')).toBe(true);
    });
});
