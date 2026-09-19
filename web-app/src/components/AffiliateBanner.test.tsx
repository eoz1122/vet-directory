import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { trackAffiliateClick } from '../utils/analytics';
import AffiliateBanner from './AffiliateBanner';

vi.mock('../utils/analytics', () => ({
    trackAffiliateClick: vi.fn(),
}));

describe('AffiliateBanner', () => {
    beforeEach(() => {
        vi.mocked(trackAffiliateClick).mockClear();
    });

    it('renders an accessible HTML5-style banner with disclosure and tracking', () => {
        render(
            <AffiliateBanner
                ariaLabel="Sponsored Hund unterwegs moving option"
                description="Check practical dog supplies before your move."
                eyebrow="Move with confidence"
                href="https://www.awin1.com/cread.php?awinmid=22115&awinaffid=2707844&clickref=hund_unterwegs_moving_banner"
                linkLabel="Browse dog supplies"
                provider="Hund unterwegs"
                title="Ready for the journey?"
                trackingLocation="HundUnterwegs_MovingBanner"
            />,
        );

        const region = screen.getByRole('region', { name: 'Sponsored Hund unterwegs moving option' });
        const link = screen.getByRole('link', { name: 'Browse dog supplies' });

        expect(region.getAttribute('data-testid')).toBe('affiliate-banner');
        expect(region.textContent).toMatch(/advertising link/i);
        expect(region.textContent).toMatch(/may earn a commission/i);
        expect(link.getAttribute('rel')).toContain('sponsored');
        expect(link.getAttribute('target')).toBe('_blank');

        fireEvent.click(link);

        expect(trackAffiliateClick).toHaveBeenCalledWith('Hund unterwegs', 'HundUnterwegs_MovingBanner');
    });
});
