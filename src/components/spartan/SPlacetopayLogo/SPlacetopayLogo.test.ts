import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import SPlacetopayLogo from './SPlacetopayLogo.vue';

describe('SPlacetopayLogo', () => {
    test('Can be rendered', () => {
        // Act
        const { container } = render(SPlacetopayLogo);

        // Assert
        expect(container.firstElementChild).toHaveClass('aspect-[202/45]');
    });

    test('Can be rendered with "md" size', () => {
        // Act
        const { container } = render(SPlacetopayLogo, { props: { size: 'md' } });

        // Assert
        expect(container.firstElementChild).toHaveClass('aspect-[202/45]');
        expect(container.firstElementChild).toHaveAttribute('width', '202');
    });

    test('Can be rendered with custom size', () => {
        // Act
        const { container } = render(SPlacetopayLogo, { props: { width: 500 } });

        // Assert
        expect(container.firstElementChild).toHaveClass('aspect-[202/45]');
        expect(container.firstElementChild).toHaveAttribute('width', '500');
    });

    test('Can be rendered in base mode', () => {
        // Act
        const { container } = render(SPlacetopayLogo, { props: { mode: 'base' } });

        // Assert
        expect(container.firstElementChild?.firstElementChild).toHaveAttribute('fill', '#6B7280');
    });

    test('Can be rendered in dark mode', () => {
        // Act
        const { container } = render(SPlacetopayLogo, { props: { mode: 'dark' } });

        // Assert
        expect(container.firstElementChild?.firstElementChild).toHaveAttribute('fill', '#fff');
    });

    test('Can be rendered in black and white mode', () => {
        // Act
        const { container } = render(SPlacetopayLogo, { props: { mode: 'blackAndWhite' } });

        // Assert
        expect(container.firstElementChild?.childElementCount).toEqual(1);
        expect(container.firstElementChild?.firstElementChild).not.toHaveAttribute('fill');
    });
});
