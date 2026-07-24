import { useEffect, useId, useRef, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';

import type { Vet } from '../../types/vet';
import ReportIssueLink from './ReportIssueLink';

interface ReportIssueDialogProps {
    vet: Vet;
    onClose: () => void;
    returnFocusTo: HTMLElement | null;
}

const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function ReportIssueDialog({ vet, onClose, returnFocusTo }: ReportIssueDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        const appRoot = document.getElementById('root');
        const previousOverflow = document.body.style.overflow;
        const previousAriaHidden = appRoot?.getAttribute('aria-hidden');
        const rootWasInert = appRoot?.hasAttribute('inert') ?? false;

        document.body.style.overflow = 'hidden';
        appRoot?.setAttribute('aria-hidden', 'true');
        appRoot?.setAttribute('inert', '');
        closeButtonRef.current?.focus();

        return () => {
            document.body.style.overflow = previousOverflow;
            if (previousAriaHidden === null) appRoot?.removeAttribute('aria-hidden');
            else if (previousAriaHidden !== undefined) appRoot?.setAttribute('aria-hidden', previousAriaHidden);
            if (!rootWasInert) appRoot?.removeAttribute('inert');
            returnFocusTo?.focus();
        };
    }, [returnFocusTo]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            onClose();
            return;
        }

        if (event.key !== 'Tab') return;

        const focusableElements = Array.from(
            dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    const options = [
        {
            label: '⚠ Permanently Closed',
            reason: 'Permanently Closed',
            accessibleName: 'Report this practice as permanently closed',
        },
        {
            label: '✏ Data Incorrect',
            reason: 'Data Error',
            accessibleName: 'Report incorrect practice data',
        },
        {
            label: '🛡 Request Removal (Owner)',
            reason: 'Owner Request Removal',
            accessibleName: 'Request removal as the practice owner',
        },
    ];

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                onKeyDown={handleKeyDown}
                className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden border border-red-50"
            >
                <div className="bg-red-50/50 p-6 border-b border-red-100/50 flex justify-between items-start">
                    <div>
                        <h2 id={titleId} className="text-red-800 font-black flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            Report issue for {vet.practice_name}
                        </h2>
                        <p className="text-[10px] text-red-700 font-bold uppercase tracking-wider mt-1">Correction Request</p>
                    </div>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close report issue dialog"
                        className="min-h-11 min-w-11 p-2 inline-flex items-center justify-center text-red-700 hover:bg-red-100 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <p id={descriptionId} className="text-sm text-primary/80 font-medium">
                        Choose the correction you want to report for <span className="font-bold text-primary">{vet.practice_name}</span>.
                    </p>
                    <div className="space-y-2">
                        {options.map((option) => (
                            <ReportIssueLink
                                key={option.reason}
                                vetId={vet.id}
                                vetName={vet.practice_name}
                                reason={option.reason}
                                aria-label={option.accessibleName}
                                className="block w-full min-h-11 text-left px-5 py-4 rounded-2xl border border-gray-200 hover:bg-red-50/30 hover:border-red-200 text-sm font-bold text-primary transition-all"
                            >
                                {option.label}
                            </ReportIssueLink>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-600 font-medium text-center">
                        Privacy protected under German GDPR requirements.
                    </p>
                </div>
            </div>
        </div>,
        document.body,
    );
}
