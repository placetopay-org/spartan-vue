import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCardBrand from './SCardBrand.vue';

describe('SCardBrand', () => {
    test('Can be rendered', () => {
        // Act
        render(SCardBrand, { props: { name: 'visa' }});
        
        // Assert
        const brand = screen.getByRole('img');
        expect(brand).toHaveAttribute('viewBox');
        expect(brand).toHaveAttribute('xmlns');
    });
});
