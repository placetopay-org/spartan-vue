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

    test('Renders with semantic HTML structure', () => {
        // Act
        render(SBreadcrumbs);

        // Assert
        const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
        expect(nav.querySelector('ol')).toBeTruthy();
        expect(nav.querySelector('ol')).toHaveAttribute('role', 'list');
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
            expect(link).toHaveAttribute('aria-current', 'page');
        });

        test('Non-active item does not have aria-current', () => {
            // Arrange
            const Item = h(
                SBreadcrumbsItem,
                { href: 'my-test-link', active: false },
                { default: () => 'Test Content' },
            );

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const link = screen.getByRole('link', { name: 'Test Content' });
            expect(link).not.toHaveAttribute('aria-current');
        });

        test('Can be render with icon', () => {
            // Arrange
            const Item = h(
                SBreadcrumbsItem,
                { href: 'my-test-link', icon: HomeIcon },
                { default: () => 'Test Content' },
            );

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

        test('Renders custom separator slot', () => {
            // Arrange
            const Item = h(
                SBreadcrumbsItem,
                { href: '/test' },
                {
                    default: () => 'Page',
                    separator: () => h('span', { class: 'custom-sep' }, '/'),
                },
            );

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            expect(document.querySelector('.custom-sep')).toBeTruthy();
            expect(document.querySelector('.custom-sep')?.textContent).toBe('/');
        });

        test('Renders with custom element via as prop', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: '/test', as: 'span' }, { default: () => 'Test' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            expect(screen.queryByRole('link')).toBeNull();
            expect(screen.getByText('Test').tagName).toBe('SPAN');
        });

        test('Has dark mode classes on separator', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: '/test' }, { default: () => 'Test' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const svg = document.querySelector('svg');
            expect(svg).toHaveClass('dark:text-gray-400');
        });

        test('Has dark mode classes on link', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: '/test' }, { default: () => 'Test' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const link = screen.getByRole('link', { name: 'Test' });
            expect(link).toHaveClass('dark:text-gray-50');
            expect(link).toHaveClass('dark:hover:text-white');
        });

        test('Active item has dark mode active classes', () => {
            // Arrange
            const Item = h(SBreadcrumbsItem, { href: '/test', active: true }, { default: () => 'Test' });

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Item,
                },
            });

            // Assert
            const link = screen.getByRole('link', { name: 'Test' });
            expect(link).toHaveClass('dark:text-gray-50');
        });

        test('Renders multiple items in correct order', () => {
            // Arrange
            const Items = [
                h(SBreadcrumbsItem, { href: '/', first: true }, { default: () => 'Home' }),
                h(SBreadcrumbsItem, { href: '/products' }, { default: () => 'Products' }),
                h(SBreadcrumbsItem, { href: '/products/laptops', active: true }, { default: () => 'Laptops' }),
            ];

            // Act
            render(SBreadcrumbs, {
                slots: {
                    default: Items,
                },
            });

            // Assert
            const links = screen.getAllByRole('link');
            expect(links).toHaveLength(3);
            expect(links[0]).toHaveTextContent('Home');
            expect(links[1]).toHaveTextContent('Products');
            expect(links[2]).toHaveTextContent('Laptops');
            expect(links[2]).toHaveAttribute('aria-current', 'page');
        });
    });
});
