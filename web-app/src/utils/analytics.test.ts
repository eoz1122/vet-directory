import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackVetWebsiteClick } from './analytics';

describe('trackVetWebsiteClick', () => {
    beforeEach(() => {
        (window as unknown as { gtag: unknown }).gtag = vi.fn();
    });

    it('sends a vet_website_click event with vet id, city, and location', () => {
        trackVetWebsiteClick('Berlin-5', 'Berlin', 'CityVets_Page');
        const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;
        expect(gtag).toHaveBeenCalledWith('event', 'vet_website_click', {
            vet_id: 'Berlin-5',
            city: 'Berlin',
            location: 'CityVets_Page',
            event_category: 'outbound',
            event_label: 'Berlin-5',
        });
    });

    it('does not throw when gtag is missing', () => {
        (window as unknown as { gtag: unknown }).gtag = undefined;
        expect(() => trackVetWebsiteClick('x', 'y', 'z')).not.toThrow();
    });
});
