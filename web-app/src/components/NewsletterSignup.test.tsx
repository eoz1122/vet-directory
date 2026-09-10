import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import NewsletterSignup from './NewsletterSignup';

describe('NewsletterSignup', () => {
    beforeEach(() => {
        localStorage.setItem('cookie-consent', 'accepted');
        window.gtag = vi.fn();
        vi.stubGlobal('fetch', vi.fn());
    });

    it('submits an explicit opt-in and tracks a privacy-safe success event', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({ message: 'Thanks for joining.' }),
        } as Response);

        render(<MemoryRouter><NewsletterSignup source="dog_food_guide" /></MemoryRouter>);
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'jane@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Get periodic updates' }));

        expect((await screen.findByRole('status')).textContent).toContain('You are subscribed.');
        expect(fetch).toHaveBeenCalledWith('/api/newsletter', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                email: 'jane@example.com',
                source: 'dog_food_guide',
                consent: true,
                company: '',
            }),
        }));
        expect(window.gtag).toHaveBeenCalledWith('event', 'newsletter_signup_success', {
            form_name: 'newsletter_signup',
            source: 'dog_food_guide',
            event_category: 'engagement',
        });
    });

    it('shows a recoverable error without exposing the email to analytics', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Please try again.' }),
        } as Response);

        render(<MemoryRouter><NewsletterSignup source="site_footer" /></MemoryRouter>);
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'jane@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Get periodic updates' }));

        expect((await screen.findByRole('alert')).textContent).toContain('Please try again.');
        await waitFor(() => expect(window.gtag).toHaveBeenCalledWith('event', 'newsletter_signup_error', {
            form_name: 'newsletter_signup',
            source: 'site_footer',
            event_category: 'engagement',
        }));
        const analyticsCalls = vi.mocked(window.gtag).mock.calls;
        expect(analyticsCalls.some((call) => JSON.stringify(call).includes('jane@example.com'))).toBe(false);
    });

    it('uses readable light text on the dark footer surface', () => {
        render(<MemoryRouter><NewsletterSignup source="site_footer" tone="dark" /></MemoryRouter>);

        expect(screen.getByRole('heading', { name: 'Practical pet updates for Germany' }).className)
            .toContain('text-secondary');
        expect(screen.getByText(/occasional English-language updates/i).className)
            .toContain('text-secondary');
    });
});
