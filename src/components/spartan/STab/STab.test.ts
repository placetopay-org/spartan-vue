import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import STab from './STab.vue';
import STabItem from './STabItem.vue';
import { h } from 'vue';
import userEvent from '@testing-library/user-event';

describe('STab', () => {
    test('Throw warning for required "model-value"', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(STab);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', () => {
        // Act
        render(STab);

        // Assert
        screen.getByRole('navigation', { name: 'Tabs' });
    });

    test('Can be rendered with items', () => {
        // Arrange
        const item1 = h(STabItem, null, { default: () => 'Item 1' });
        const item2 = h(STabItem, null, { default: () => 'Item 2' });
        const item3 = h(STabItem, null, { default: () => 'Item 3' });
        const item4 = h(STabItem, null, { default: () => 'Item 4' });

        // Act
        render(STab, { slots: { default: [item1, item2, item3, item4] } });

        const items = screen.getAllByRole('button');

        // Assert
        screen.getByRole('navigation', { name: 'Tabs' });
        expect(items).toHaveLength(4);
        expect(items[0]).toHaveTextContent('Item 1');
        expect(items[1]).toHaveTextContent('Item 2');
        expect(items[2]).toHaveTextContent('Item 3');
        expect(items[3]).toHaveTextContent('Item 4');
    });

    test('Can be rendered with full width', () => {
        // Arrange
        const item1 = h(STabItem, null, { default: () => 'Item 1' });
        const item2 = h(STabItem, null, { default: () => 'Item 2' });
        const item3 = h(STabItem, null, { default: () => 'Item 3' });
        const item4 = h(STabItem, null, { default: () => 'Item 4' });

        // Act
        render(STab, { props: { full: true }, slots: { default: [item1, item2, item3, item4] } });

        const items = screen.getAllByRole('button');

        // Assert
        screen.getByRole('navigation', { name: 'Tabs' });
        expect(items[0]).toHaveClass('w-full');
        expect(items[1]).toHaveClass('w-full');
        expect(items[2]).toHaveClass('w-full');
        expect(items[3]).toHaveClass('w-full');
    });

    test('Can be rendered with pills variant', () => {
        // Arrange
        const pillItemClass =
            'text-gray-500 hover:text-gray-700 hover:bg-gray-100 group inline-flex items-center rounded-md px-3 py-2 text-sm font-medium w-full inline-flex justify-center';
        const item1 = h(STabItem, null, { default: () => 'Item 1' });
        const item2 = h(STabItem, null, { default: () => 'Item 2' });
        const item3 = h(STabItem, null, { default: () => 'Item 3' });
        const item4 = h(STabItem, null, { default: () => 'Item 4' });

        // Act
        render(STab, { props: { variant: 'pills' }, slots: { default: [item1, item2, item3, item4] } });

        const items = screen.getAllByRole('button');

        // Assert
        screen.getByRole('navigation', { name: 'Tabs' });
        expect(items[0]).toHaveClass(pillItemClass);
        expect(items[1]).toHaveClass(pillItemClass);
        expect(items[2]).toHaveClass(pillItemClass);
        expect(items[3]).toHaveClass(pillItemClass);
    });

    test('Can be rendered with vetches variant', () => {
        // Arrange
        const pillItemClass =
            'text-gray-500 hover:text-gray-700 group inline-flex items-center rounded-md px-3 py-2 text-sm font-medium w-full inline-flex justify-center';
        const item1 = h(STabItem, null, { default: () => 'Item 1' });
        const item2 = h(STabItem, null, { default: () => 'Item 2' });
        const item3 = h(STabItem, null, { default: () => 'Item 3' });
        const item4 = h(STabItem, null, { default: () => 'Item 4' });

        // Act
        render(STab, { props: { variant: 'vetches' }, slots: { default: [item1, item2, item3, item4] } });

        const items = screen.getAllByRole('button');

        // Assert
        screen.getByRole('navigation', { name: 'Tabs' });
        expect(items[0]).toHaveClass(pillItemClass);
        expect(items[1]).toHaveClass(pillItemClass);
        expect(items[2]).toHaveClass(pillItemClass);
        expect(items[3]).toHaveClass(pillItemClass);
    });
});
