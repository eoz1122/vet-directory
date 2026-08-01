import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { trackAffiliateClick } from '../utils/analytics';
import AffiliateCallout from './AffiliateCallout';

vi.mock('../utils/analytics', () => ({
    trackAffiliateClick: vi.fn(),
}));

describe('AffiliateCallout', () => {
    beforeEach(() => {
        vi.mocked(trackAffiliateClick).mockClear();
    });

    it('discloses the commercial relationship and tracks the named placement', () => {
        render(
            <AffiliateCallout
                ariaLabel="Sponsored dog-food option"
                description="Compare the exact label and suitability before buying."
                href="https://www.awin1.com/cread.php?awinmid=11330&awinaffid=2707844&clickref=dog_food_mid_article"
                linkLabel="Review Zooplus dog-food options"
                provider="Zooplus"
                title="Ready to compare suitable foods?"
                trackingLocation="DogFood_MidArticle"
            />,
        );

        const callout = screen.getByRole('region', { name: 'Sponsored dog-food option' });
        expect(callout.textContent).toMatch(/advertising link/i);
        expect(callout.textContent).toMatch(/may earn a commission/i);

        const link = screen.getByRole('link', { name: 'Review Zooplus dog-food options' });
        expect(link.getAttribute('rel')).toContain('sponsored');

        fireEvent.click(link);

        expect(trackAffiliateClick).toHaveBeenCalledOnce();
        expect(trackAffiliateClick).toHaveBeenCalledWith('Zooplus', 'DogFood_MidArticle');
    });
});
