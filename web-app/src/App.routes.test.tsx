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
});
