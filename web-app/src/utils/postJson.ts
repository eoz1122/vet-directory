/** A bounded request for public forms. No form values are written to logs. */
export async function postJson(url: string, payload: unknown): Promise<Record<string, unknown>> {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(typeof data?.error === 'string' ? data.error : 'Please try again later.');
        return data;
    } catch (error) {
        if (controller.signal.aborted) throw new Error('The request timed out. Please try again.');
        throw error;
    } finally {
        window.clearTimeout(timeout);
    }
}
