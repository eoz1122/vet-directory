import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Vet } from '../../types/vet';

// Nginx routes /api/* to the Flask app in production; localhost in dev.
const API_URL = import.meta.env.DEV
    ? 'http://localhost:5000/api/confirm-vet'
    : '/api/confirm-vet';

type State = 'idle' | 'sending' | 'done' | 'error';

/**
 * One-click community confirmation that a practice speaks English.
 * Posts pending evidence to the backend for human review.
 */
export function ConfirmEnglish({ vet }: { vet: Vet }) {
    const [state, setState] = useState<State>('idle');
    const successRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (state === 'done') successRef.current?.focus();
    }, [state]);

    const confirm = async (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (state === 'sending' || state === 'done') return;
        setState('sending');
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vetId: vet.id,
                    vetName: vet.practice_name,
                    vetCity: vet.city,
                }),
            });
            setState(res.ok ? 'done' : 'error');
        } catch {
            setState('error');
        }
    };

    if (state === 'done') {
        return (
            <div
                ref={successRef}
                role="status"
                aria-live="polite"
                tabIndex={-1}
                className="mt-3 min-h-11 text-[11px] font-bold text-green-700 flex items-center justify-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-2"
            >
                <span>✓</span> Thanks! We'll review your confirmation.
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={confirm}
            aria-label={state === 'error'
                ? `Confirmation failed for ${vet.practice_name}. Try again`
                : state === 'sending'
                    ? `Confirming ${vet.practice_name} speaks English`
                    : `Confirm ${vet.practice_name} speaks English`}
            aria-disabled={state === 'sending'}
            aria-busy={state === 'sending'}
            className="mt-3 min-h-11 w-full text-[11px] font-bold text-primary/80 border border-primary/10 rounded-lg px-3 py-2 flex items-center justify-center gap-1.5 transition-colors hover:text-green-700 hover:border-green-300 hover:bg-green-50 aria-disabled:opacity-50"
        >
            {state === 'sending'
                ? 'Sending...'
                : state === 'error'
                    ? 'Confirmation failed. Try again.'
                    : '🐾 Confirm they speak English'}
            {state === 'error' && (
                <span role="alert" className="sr-only">
                    Confirmation failed. Try again.
                </span>
            )}
        </button>
    );
}
