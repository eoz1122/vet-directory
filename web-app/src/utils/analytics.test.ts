import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    trackDirectoryFilterChange,
    trackDirectoryNoResults,
    trackGuideDiscoveryClick,
    trackVetPhoneClick,
    trackVetWebsiteClick,
} from './analytics';

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

describe('trackMapPinClick', () => {
    beforeEach(() => {
        (window as unknown as { gtag: unknown }).gtag = vi.fn();
    });

    it('sends a map_pin_click event with the vet id and city', async () => {
        const { trackMapPinClick } = await import('./analytics');
        trackMapPinClick('Berlin-5', 'Berlin');
        const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;
        expect(gtag).toHaveBeenCalledWith('event', 'map_pin_click', {
            vet_id: 'Berlin-5',
            city: 'Berlin',
            event_category: 'map',
            event_label: 'Berlin-5',
        });
    });
});

describe('trackVetPhoneClick', () => {
    beforeEach(() => {
        (window as unknown as { gtag: unknown }).gtag = vi.fn();
    });

    it('sends a vet_phone_click event without exposing the telephone number', () => {
        trackVetPhoneClick('Berlin-5', 'Berlin', 'CityVets_Page');
        const gtag = (window as unknown as { gtag: ReturnType<typeof vi.fn> }).gtag;

        expect(gtag).toHaveBeenCalledWith('event', 'vet_phone_click', {
            vet_id: 'Berlin-5',
            city: 'Berlin',
            location: 'CityVets_Page',
            event_category: 'contact',
            event_label: 'Berlin-5',
        });
    });

    it('does not throw when gtag is missing', () => {
        (window as unknown as { gtag: unknown }).gtag = undefined;
        expect(() => trackVetPhoneClick('x', 'y', 'z')).not.toThrow();
    });
});

describe('directory discovery analytics', () => {
    beforeEach(() => {
        (window as unknown as { gtag: unknown }).gtag = vi.fn();
    });

    it('tracks filters without accepting free-form search text', () => {
        trackDirectoryFilterChange('city', 'Berlin');

        expect(window.gtag).toHaveBeenCalledWith('event', 'directory_filter_change', {
            filter_name: 'city',
            filter_value: 'Berlin',
            event_category: 'directory',
        });
    });

    it('reports no results with a search-length bucket instead of the query', () => {
        trackDirectoryNoResults({
            city: 'Berlin',
            searchLength: 12,
            verifiedOnly: true,
            emergencyOnly: false,
            mobileOnly: false,
            radius: null,
        });

        expect(window.gtag).toHaveBeenCalledWith('event', 'directory_no_results', {
            city: 'Berlin',
            search_length_bucket: '8_plus',
            verified_only: true,
            emergency_only: false,
            mobile_only: false,
            radius_km: 'any',
            event_category: 'directory',
        });
    });

    it('tracks which essential guide receives a homepage click', () => {
        trackGuideDiscoveryClick('/blog/puppy-first-year-germany', 'Homepage_Essential_Guides');

        expect(window.gtag).toHaveBeenCalledWith('event', 'guide_discovery_click', {
            guide_path: '/blog/puppy-first-year-germany',
            location: 'Homepage_Essential_Guides',
            event_category: 'content',
        });
    });
});
