import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCardBrand from './SCardBrand.vue';
import * as assets from './assets';
import { brandName } from './constants';

const brandNames = Object.keys(assets);

describe('SCardBrand', () => {
    test('Can be rendered', () => {
        render(SCardBrand, { props: { name: 'visa' } });

        const brand = screen.getByRole('img');
        expect(brand).toHaveAttribute('viewBox');
        expect(brand).toHaveAttribute('xmlns');
    });

    test('Renders with custom size', () => {
        render(SCardBrand, { props: { name: 'master', size: 48 } });

        const brand = screen.getByRole('img');
        expect(brand).toHaveAttribute('height', '48');
        expect(brand).toHaveAttribute('width', '48');
    });

    test('Renders with custom class', () => {
        const { container } = render(SCardBrand, { props: { name: 'visa', class: 'custom-class' } });

        expect(container.querySelector('.custom-class')).toBeTruthy();
    });

    describe('All brands render correctly', () => {
        test.each(brandNames)('%s renders as SVG', (name) => {
            const { container } = render(SCardBrand, { props: { name } });

            const svg = container.querySelector('svg');
            expect(svg).toBeTruthy();
        });
    });

    test('Constants brandName matches assets exports', () => {
        expect(brandName.length).toBe(brandNames.length);
        brandName.forEach((name) => {
            expect(brandNames).toContain(name);
        });
    });
});
