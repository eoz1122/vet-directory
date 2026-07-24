import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BrandLogo from './BrandLogo';

describe('BrandLogo', () => {
    it('uses a right-sized modern image for priority placement', () => {
        render(<BrandLogo alt="Directory logo" priority className="h-16 w-auto" />);

        const image = screen.getByRole('img', { name: 'Directory logo' });
        expect(image.getAttribute('src')).toBe('/logo-256.webp');
        expect(image.getAttribute('width')).toBe('256');
        expect(image.getAttribute('height')).toBe('256');
        expect(image.getAttribute('loading')).toBe('eager');
        expect(image.getAttribute('fetchpriority')).toBe('high');
        expect(image.getAttribute('decoding')).toBe('async');
    });

    it('lazy-loads decorative placements', () => {
        const { container } = render(<BrandLogo alt="" className="h-5 w-auto" />);

        const image = container.querySelector('img');
        expect(image?.getAttribute('loading')).toBe('lazy');
        expect(image?.getAttribute('fetchpriority')).toBe('auto');
    });
});
