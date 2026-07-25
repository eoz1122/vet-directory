import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import App from './App';

vi.mock('./components/CookieConsent', () => ({ default: () => null }));
vi.mock('./components/GoogleAnalyticsTracker', () => ({ default: () => null }));
vi.mock('./components/ScrollToTop', () => ({ default: () => null }));
vi.mock('./components/Header', () => ({ default: () => <header /> }));
vi.mock('./components/Footer', () => ({ default: () => <footer /> }));
vi.mock('./components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('./components/TableOfContents', () => ({ default: () => <nav /> }));
vi.mock('./components/RelatedPosts', () => ({ default: () => null }));

describe('guide routes', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/blog/dog-liability-insurance-germany');
    });

    it('routes the dog liability guide', async () => {
        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Dog Liability Insurance in Germany: Rules and Checklist (2026)',
        })).toBeTruthy();
    });

    it('routes the Cologne emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-cologne');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Cologne: Official Numbers and 24/7 Help (2026)',
        })).toBeTruthy();
    });

    it('routes the Ruhr emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-ruhr');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Essen & Ruhr Area: 24/7 Help (2026)',
        })).toBeTruthy();
    });

    it('routes the Düsseldorf emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-duesseldorf');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Düsseldorf: 24/7 Clinic Help (2026)',
        })).toBeTruthy();
    });

    it('routes the Stuttgart emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-stuttgart');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Stuttgart: Official Numbers & 24/7 Help (2026)',
        })).toBeTruthy();
    });

    it('routes the Hannover emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-hannover');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Hannover: TiHo 24-Hour Help (2026)',
        })).toBeTruthy();
    });

    it('routes the Bremen emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-bremen');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Bremen: Official Duty Number & Hours (2026)',
        })).toBeTruthy();
    });

    it('routes the Leipzig emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-leipzig');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Leipzig: Night & Weekend Help (2026)',
        })).toBeTruthy();
    });

    it('routes the Dresden emergency guide', async () => {
        window.history.pushState({}, '', '/guides/emergency-vets-dresden');

        render(<App />);

        expect(await screen.findByRole('heading', {
            level: 1,
            name: 'Emergency Vet Dresden: Official Duty Service (2026)',
        })).toBeTruthy();
    });
});
