const CONTACT_FORM_TOPICS = new Set([
    'general',
    'submit_vet',
    'report_issue',
    'vet_owner',
]);

export function normalizeContactFormTopic(value: string | null | undefined) {
    return value && CONTACT_FORM_TOPICS.has(value) ? value : 'general';
}

export function normalizeDirectoryCity(
    value: string | null | undefined,
    allowedCities: readonly string[],
) {
    if (!value || value === 'All') return 'All';
    return allowedCities.includes(value) ? value : 'All';
}
