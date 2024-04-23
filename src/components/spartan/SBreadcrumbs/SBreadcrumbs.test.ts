import { expect, test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import { h } from 'vue';
import SBreadcrumbs from './SBreadcrumbs.vue';
import SBreadcrumbsItem from './SBreadcrumbsItem.vue';
import { HomeIcon } from '@placetopay/iconsax-vue/linear';

describe('SBreadcrumbs', () => {
    test('No throw warning for required props', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SBreadcrumbs);

        // Assert
        expect(warn).not.toHaveBeenCalled();
    });

    test('Can be rendered', () => {
        // Act
        render(SBreadcrumbs);

        // Assert
        screen.getByRole('navigation', { name: 'Breadcrumb' });
    });

    describe('With SBreadcrumbsItem', () => {
        test('Can be rendered with content', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: 'my-test-link' }, { default: () => 'Test Content' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const link = screen.getByRole('link', { name: 'Test Content' });
            expect(link).not.toHaveClass('text-gray-800');
            expect(link).toHaveAttribute('href', 'my-test-link');
            expect(link.parentElement?.childElementCount).toEqual(2);
        });

        test('Can be render in active state', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: 'my-test-link', active: true }, { default: () => 'Test Content' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const link = screen.getByRole('link', { name: 'Test Content' });
            expect(link).toHaveClass('text-gray-800');
        });

        test('Can be render with icon', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: 'my-test-link', icon: HomeIcon }, { default: () => 'Test Content' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const link = screen.getByRole('link', { name: 'Test Content' });
            expect(link.firstChild).toHaveClass('h-5 w-5 flex-shrink-0');
        });

        test('Can be render as first item', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: 'my-test-link', first: true }, { default: () => 'Test Content' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const link = screen.getByRole('link', { name: 'Test Content' });
            expect(link.parentElement?.childElementCount).toEqual(1);
        });
    });
});
