import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Contact from './Contact';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));

function renderContact() {
    return render(
        <HelmetProvider>
            <MemoryRouter initialEntries={['/contact']}>
                <Contact />
            </MemoryRouter>
        </HelmetProvider>,
    );
}

function completeRequiredFields() {
    fireEvent.change(screen.getByLabelText('Your Name'), {
        target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText('Your Email'), {
        target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
        target: { value: 'Please help with a directory question.' },
    });
}

describe('Contact analytics', () => {
    beforeEach(() => {
        window.gtag = vi.fn();
        vi.stubGlobal('fetch', vi.fn());
    });

    it('tracks one distinct conversion after a successful API response', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => ({ message: 'sent' }),
        } as Response);
        renderContact();
        completeRequiredFields();

        fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

        const successStatus = await screen.findByRole('status');
        expect(successStatus.textContent).toContain('Message Sent!');
        await waitFor(() => expect(document.activeElement).toBe(successStatus));
        expect(window.gtag).toHaveBeenCalledTimes(1);
        expect(window.gtag).toHaveBeenCalledWith('event', 'contact_form_success', {
            form_name: 'contact_form',
            form_topic: 'general',
            event_category: 'engagement',
            event_label: 'Contact Form - general',
        });
    });

    it('does not record a conversion when the API rejects the submission', async () => {
        vi.mocked(fetch).mockResolvedValue({
            ok: false,
            json: async () => ({ error: 'Please try again.' }),
        } as Response);
        renderContact();
        completeRequiredFields();

        fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

        const errorAlert = await screen.findByRole('alert');
        expect(errorAlert.textContent).toContain('Please try again.');
        expect(document.activeElement).toBe(errorAlert);
        expect(window.gtag).not.toHaveBeenCalled();
    });

    it('prefills a report from navigation state without requiring query parameters', async () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={[{
                    pathname: '/contact',
                    state: {
                        topic: 'report_issue',
                        vetId: 'Berlin-17',
                        vetName: 'Tierarztpraxis Bartels & Wende',
                        reason: 'Data Incorrect',
                    },
                }]}>
                    <Contact />
                </MemoryRouter>
            </HelmetProvider>,
        );

        await waitFor(() => {
            const message = screen.getByLabelText('Message') as HTMLTextAreaElement;
            expect(message.value).toContain('Practice: Tierarztpraxis Bartels & Wende');
            expect(message.value).toContain('ID: Berlin-17');
        });
    });

    it('continues to prefill reports from legacy query parameters', async () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={[
                    '/contact?topic=report_issue&vetId=Berlin-16&vetName=Tierarztpraxis%20Lorenz&reason=Data%20Incorrect',
                ]}>
                    <Contact />
                </MemoryRouter>
            </HelmetProvider>,
        );

        await waitFor(() => {
            const message = screen.getByLabelText('Message') as HTMLTextAreaElement;
            expect(message.value).toContain('Practice: Tierarztpraxis Lorenz');
            expect(message.value).toContain('ID: Berlin-16');
        });
    });
});
