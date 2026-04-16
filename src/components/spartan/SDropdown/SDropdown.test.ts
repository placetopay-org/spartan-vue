import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDropdown from './SDropdown.vue';
import SDropdownItem from './SDropdownItem.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SDropdown', () => {
    test('Can be rendered', async () => {
        // Arrange
        const user = userEvent.setup();

        const Item1 = h(SDropdownItem, null, { default: () => 'Title', description: () => 'Description' });
        const Item2 = h(SDropdownItem, null, { default: () => 'Option', description: () => 'Device' });
        const Item3 = h(SDropdownItem, null, { default: () => 'Profile', description: () => 'Edit' });

        // Act
        render(SDropdown, {
            slots: {
                default: [Item1, Item2, Item3],
                reference: () => 'Dropdown Button',
            },
        });

        await user.click(screen.getByRole('button', { name: 'Dropdown Button' }));

        // Assert
        screen.getByText('Title');
        screen.getByText('Description');

        screen.getByText('Option');
        screen.getByText('Device');

        screen.getByText('Option');
        screen.getByText('Edit');
    });

    test('Does not toggle when manual is true', async () => {
        const user = userEvent.setup();

        const Item1 = h(SDropdownItem, null, { default: () => 'Item' });

        render(SDropdown, {
            props: { manual: true },
            slots: {
                default: [Item1],
                reference: () => 'Manual Dropdown',
            },
        });

        await user.click(screen.getByRole('button', { name: 'Manual Dropdown' }));

        expect(screen.queryByText('Item')).not.toBeInTheDocument();
    });

    test('Renders with compact variant', async () => {
        const user = userEvent.setup();

        const Item1 = h(SDropdownItem, null, { default: () => 'Compact Item' });

        render(SDropdown, {
            props: { variant: 'compact' },
            slots: {
                default: [Item1],
                reference: () => 'Compact',
            },
        });

        await user.click(screen.getByRole('button', { name: 'Compact' }));

        expect(screen.getByText('Compact Item')).toBeInTheDocument();
    });

    test('Closes dropdown when clicking an item', async () => {
        const user = userEvent.setup();

        const Item1 = h(SDropdownItem, null, { default: () => 'Click me' });

        render(SDropdown, {
            slots: {
                default: [Item1],
                reference: () => 'Open',
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByText('Click me')).toBeInTheDocument();

        await user.click(screen.getByText('Click me'));
    });

    test('Renders disabled dropdown item', async () => {
        const user = userEvent.setup();

        const Item = h(SDropdownItem, { disabled: true }, { default: () => 'Disabled' });

        render(SDropdown, {
            slots: {
                default: [Item],
                reference: () => 'Open',
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open' }));

        const item = screen.getByText('Disabled');
        expect(item.closest('[data-headlessui-state]')).toBeTruthy();
    });
});
