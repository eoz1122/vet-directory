import { describe, expect, it } from 'vitest';

import {
    normalizeContactFormTopic,
    normalizeDirectoryCity,
} from './analyticsDimensions';

describe('analytics dimensions', () => {
    it('keeps known directory cities and buckets unknown URL values', () => {
        const allowedCities = ['Berlin', 'Hamburg'];

        expect(normalizeDirectoryCity('Berlin', allowedCities)).toBe('Berlin');
        expect(normalizeDirectoryCity('attacker-controlled', allowedCities)).toBe('All');
        expect(normalizeDirectoryCity(null, allowedCities)).toBe('All');
    });

    it('keeps only supported contact topics', () => {
        expect(normalizeContactFormTopic('report_issue')).toBe('report_issue');
        expect(normalizeContactFormTopic('private-query-value')).toBe('general');
        expect(normalizeContactFormTopic(null)).toBe('general');
    });
});
