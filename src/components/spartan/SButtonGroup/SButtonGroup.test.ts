import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { HomeIcon } from '@placetopay/iconsax-vue/linear';
import SButtonGroup from './SButtonGroup.vue';
import SButtonGroupItem from './SButtonGroupItem.vue';
import { h } from 'vue';

describe('SButtonGroup', () => {
    test('Can be rendered', async () => {
        // Act
        const { container } = render(SButtonGroup);

        // Assert
        expect(container.firstChild).toHaveClass('isolate inline-flex -space-x-px');
    });

    describe('With SButtonGroupItem', () => {
        test('Can be rendered with content', () => {
            // Arrange
            const Item = h(SButtonGroupItem, null, { default: () => 'Test Content' });

            // Act
            render(SButtonGroup, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const button = screen.getByRole('button', { name: 'Test Content' });
            expect(button).toHaveClass('px-3 py-2 text-sm font-medium text-gray-900');
        });

        test('Can be rendered with only icon', () => {
            // Arrange
            const Item = h(SButtonGroupItem, { icon: HomeIcon });

            // Act
            render(SButtonGroup, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const button = screen.getByRole('button');
            expect(button.firstElementChild).toHaveClass('w-5 h-5 text-gray-900');
        });

        test('Can be rendered in active mode', () => {
            // Arrange
            const Item = h(SButtonGroupItem, { icon: HomeIcon, active: true });

            // Act
            render(SButtonGroup, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const button = screen.getByRole('button');
            expect(button.firstElementChild).toHaveClass('w-5 h-5 text-gray-900 text-spartan-primary-600');
        });

        test('Can be rendered with icon', () => {
            // Arrange
            const Item = h(SButtonGroupItem, { icon: HomeIcon }, { default: () => 'Test Content' });

            // Act
            render(SButtonGroup, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const button = screen.getByRole('button', { name: 'Test Content' });
            expect(button.firstElementChild).toHaveClass('w-5 h-5 text-gray-900 -ml-0.5');
        });

        test('Can be rendered with end icon', () => {
            // Arrange
            const Item = h(SButtonGroupItem, { icon: HomeIcon, endIcon: true }, { default: () => 'Test Content' });

            // Act
            render(SButtonGroup, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const button = screen.getByRole('button', { name: 'Test Content' });
            expect(button.firstElementChild).toHaveClass('w-5 h-5 text-gray-900 -mr-0.5');
        });

        test('Can be rendered with prev/next mode', () => {
            // Arrange
            const ItemPrev = h(SButtonGroupItem, { prev: true });
            const ItemNext = h(SButtonGroupItem, { next: true });

            // Act
            render(SButtonGroup, {
                slots: {
                    default: h('div', null, [ItemPrev, ItemNext]),
                },
            });

            // Assert
            const prevButton = screen.getByRole('button', { name: 'Prev' });
            const nextButton = screen.getByRole('button', { name: 'Next' });
            expect(prevButton.children[1]).toHaveClass(' w-5 h-5 text-gray-900');
            expect(nextButton.children[1]).toHaveClass(' w-5 h-5 text-gray-900');
        });
    });
});
