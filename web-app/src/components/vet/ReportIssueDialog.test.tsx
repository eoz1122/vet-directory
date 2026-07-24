import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import type { Vet } from '../../types/vet';
import ReportIssueDialog from './ReportIssueDialog';

const vet: Vet = {
    id: 'dialog-vet',
    practice_name: 'Accessible Vet Berlin',
    city: 'Berlin',
    district: 'Mitte',
    address: 'Example Street 1',
    coordinates: { lat: 52.52, lng: 13.405 },
    contact: { website: 'https://example.test', phone: null },
    verification: {
        status: 'Verified',
        last_scanned: '2026-07-01',
        english_signals: ['English-speaking staff'],
    },
};

function renderDialog(onClose = vi.fn(), returnFocusTo: HTMLElement | null = null) {
    return render(
        <MemoryRouter>
            <ReportIssueDialog vet={vet} onClose={onClose} returnFocusTo={returnFocusTo} />
        </MemoryRouter>,
    );
}

describe('ReportIssueDialog', () => {
    it('announces a modal dialog, moves focus inside, and closes with Escape', () => {
        const onClose = vi.fn();
        renderDialog(onClose);

        const dialog = screen.getByRole('dialog', { name: 'Report issue for Accessible Vet Berlin' });
        const closeButton = screen.getByRole('button', { name: 'Close report issue dialog' });

        expect(dialog.getAttribute('aria-modal')).toBe('true');
        expect(document.activeElement).toBe(closeButton);
        fireEvent.keyDown(dialog, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('keeps Tab focus inside the dialog and restores the trigger on unmount', () => {
        const trigger = document.createElement('button');
        document.body.appendChild(trigger);
        trigger.focus();

        const { unmount } = renderDialog(vi.fn(), trigger);
        const dialog = screen.getByRole('dialog');
        const closeButton = screen.getByRole('button', { name: 'Close report issue dialog' });
        const lastAction = screen.getByRole('link', { name: 'Request removal as the practice owner' });

        lastAction.focus();
        fireEvent.keyDown(dialog, { key: 'Tab' });
        expect(document.activeElement).toBe(closeButton);

        closeButton.focus();
        fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
        expect(document.activeElement).toBe(lastAction);

        unmount();
        expect(document.activeElement).toBe(trigger);
        trigger.remove();
    });
});
