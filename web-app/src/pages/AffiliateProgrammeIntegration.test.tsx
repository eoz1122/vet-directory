import type { ReactNode } from 'react';
import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { AFFILIATE_LINKS } from '../utils/affiliateLinks';
import { trackAffiliateClick } from '../utils/analytics';
import DogLiabilityInsuranceGermany from './DogLiabilityInsuranceGermany';
import PetGpsTrackerGermany from './PetGpsTrackerGermany';
import PetInsuranceGermany from './PetInsuranceGermany';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));
vi.mock('../utils/analytics', () => ({
    trackAffiliateClick: vi.fn(),
}));

const renderPage = (page: ReactNode) => render(
    <HelmetProvider>
        <MemoryRouter>{page}</MemoryRouter>
    </HelmetProvider>,
);

function getArticleSchema() {
    return Array.from(
        document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    )
        .map((script) => JSON.parse(script.textContent || 'null'))
        .find((schema) => schema?.['@type'] === 'Article');
}

function expectAwinLink(link: HTMLElement, merchantId: string, clickref: string) {
    const url = new URL(link.getAttribute('href') || '');

    expect(url.hostname).toBe('www.awin1.com');
    expect(url.searchParams.get('awinmid')).toBe(merchantId);
    expect(url.searchParams.get('awinaffid')).toBe('2707844');
    expect(url.searchParams.get('clickref')).toBe(clickref);
    expect(link.getAttribute('rel')).toContain('sponsored');
}

describe('newly approved Awin programmes', () => {
    it('uses unique placement identifiers for Kippy and AGILA', () => {
        const placementUrls = [
            AFFILIATE_LINKS.kippy.gpsGuide,
            AFFILIATE_LINKS.agila.insuranceCommercialLinks,
            AFFILIATE_LINKS.agila.liabilityGuide,
        ];
        const clickrefs = placementUrls.map((href) => new URL(href).searchParams.get('clickref'));

        expect(new Set(clickrefs).size).toBe(placementUrls.length);
    });

    it('replaces the direct Kippy destination with a disclosed Awin placement', () => {
        renderPage(<PetGpsTrackerGermany />);

        const callout = screen.getByRole('region', {
            name: 'Sponsored Kippy GPS tracker option',
        });
        expect(within(callout).getByText(/not a ranking or endorsement/i)).toBeTruthy();
        expectAwinLink(
            within(callout).getByRole('link', { name: 'Check the current Kippy offer' }),
            '29093',
            'pet_gps_kippy_offer',
        );
        expect(document.querySelector('a[href^="https://www.kippy.eu"]')).toBeNull();
        expect(screen.getByText(/affiliate links updated 10 September 2026/i)).toBeTruthy();
        expect(getArticleSchema().dateModified).toBe('2026-09-10');
    });

    it('adds AGILA as a disclosed comparison destination on the insurance guide', () => {
        renderPage(<PetInsuranceGermany />);

        const commercialLinks = screen.getByRole('region', {
            name: 'Commercial insurance links',
        });
        expect(within(commercialLinks).getByText(/not provider rankings/i)).toBeTruthy();
        expectAwinLink(
            within(commercialLinks).getByRole('link', {
                name: 'AGILA commercial pet insurance link',
            }),
            '9295',
            'pet_insurance_agila_commercial_links',
        );
        for (const [name, merchantId, clickref] of [
            ['Helden commercial dog liability link', '14361', null],
            ['Feather commercial pet health link', null, null],
            ['Figo commercial pet health link', '13775', 'pet_insurance_commercial_links'],
            ['AGILA commercial pet insurance link', '9295', 'pet_insurance_agila_commercial_links'],
        ] as const) {
            const link = within(commercialLinks).getByRole('link', { name });
            expect(link.getAttribute('rel')).toContain('sponsored');
            if (merchantId) expect(new URL(link.getAttribute('href') || '').searchParams.get('awinmid')).toBe(merchantId);
            if (clickref) expect(new URL(link.getAttribute('href') || '').searchParams.get('clickref')).toBe(clickref);
            link.click();
        }
        expect(trackAffiliateClick).toHaveBeenCalledWith('Helden', 'PetInsurance_CommercialLinks');
        expect(trackAffiliateClick).toHaveBeenCalledWith('Feather', 'PetInsurance_CommercialLinks');
        expect(trackAffiliateClick).toHaveBeenCalledWith('Figo', 'PetInsurance_CommercialLinks');
        expect(trackAffiliateClick).toHaveBeenCalledWith('AGILA', 'PetInsurance_CommercialLinks');
        expect(screen.getByText(/affiliate links updated 10 September 2026/i)).toBeTruthy();
        expect(getArticleSchema().dateModified).toBe('2026-09-10');
    });

    it('adds one disclosed AGILA option after the liability comparison checklist', () => {
        renderPage(<DogLiabilityInsuranceGermany />);

        const callout = screen.getByRole('region', {
            name: 'Sponsored AGILA dog-liability option',
        });
        expect(within(callout).getByText(/not a ranking or endorsement/i)).toBeTruthy();
        expectAwinLink(
            within(callout).getByRole('link', { name: 'Review AGILA dog-liability cover' }),
            '9295',
            'dog_liability_agila',
        );
        expect(new URL(
            within(callout)
                .getByRole('link', { name: 'Review AGILA dog-liability cover' })
                .getAttribute('href') || '',
        ).searchParams.get('ued')).toBe(
            'https://www.agila.de/versicherungen/hundeversicherung/hundehaftpflicht/haftpflicht',
        );
        expect(
            (screen.getByRole('heading', { name: 'What to compare in a policy' })
                .compareDocumentPosition(callout)) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
        expect(screen.getByText(/affiliate links updated 10 September 2026/i)).toBeTruthy();
        expect(getArticleSchema().dateModified).toBe('2026-09-10');
    });
});
