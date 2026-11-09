import { afterEach, describe, expect, it, vi } from 'vitest';
import { postJson } from './postJson';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('bounded form requests', () => {
    it('aborts a stalled request and provides a recoverable message', async () => {
        vi.useFakeTimers();
        vi.stubGlobal('fetch', vi.fn((_url, options) => new Promise((_resolve, reject) => {
            options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        })));
        const result = expect(postJson('/api/contact', {})).rejects.toThrow('timed out');
        await vi.advanceTimersByTimeAsync(15000);
        await result;
        expect(vi.getTimerCount()).toBe(0);
    });
});
