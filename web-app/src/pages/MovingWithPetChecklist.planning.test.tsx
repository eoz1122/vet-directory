import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import MovingWithPetChecklist from './MovingWithPetChecklist';

vi.mock('../components/Header', () => ({ default: () => <header /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/BlogSidebar', () => ({ default: () => <aside /> }));
vi.mock('../components/TableOfContents', () => ({ default: () => <nav aria-label="Table of Contents" /> }));
vi.mock('../components/RelatedPosts', () => ({ default: () => null }));

describe('Moving guide planning workflow', () => {
    it('gives owners a sequenced plan and separates arrival tasks from entry clearance', () => {
        render(<HelmetProvider><MemoryRouter><MovingWithPetChecklist /></MemoryRouter></HelmetProvider>);
        const plan = screen.getByRole('region', { name: 'Plan your move in the right order' });
        expect(within(plan).getAllByRole('listitem')).toHaveLength(4);
        expect(plan.textContent).toMatch(/before booking transport/i);
        expect(plan.textContent).toMatch(/90 days before certificate issue/i);
        expect(plan.textContent).toMatch(/10-day entry window/i);
        expect(plan.compareDocumentPosition(screen.getByRole('navigation', { name: 'Table of Contents' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        const arrival = screen.getByRole('region', { name: 'After arrival: organise everyday care' });
        expect(within(arrival).getByRole('link', { name: 'Find a vet in Stuttgart' }).getAttribute('href')).toBe('/vets/stuttgart');
        expect(within(arrival).getByRole('link', { name: 'Find a vet in Leipzig' }).getAttribute('href')).toBe('/vets/leipzig');
        expect(arrival.textContent).toMatch(/do not replace border-entry requirements/i);
        expect(screen.queryByText(/There is a live certificate transition/i)).toBeNull();
        expect(screen.getByText(/For a certificate issued now, use the current model/i)).toBeTruthy();
        expect(document.querySelector('main article')?.className).toContain('min-w-0');
    });
});
