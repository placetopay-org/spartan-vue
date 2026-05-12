import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDropdown from './SDropdown.vue';
import SDropdownItem from './SDropdownItem.vue';
import userEvent from '@testing-library/user-event';
import { defineComponent, h, ref } from 'vue';

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

    test('Renders item as anchor when link prop is provided', async () => {
        const user = userEvent.setup();

        const Item = h(SDropdownItem, { link: 'https://example.com' }, { default: () => 'Go to site' });

        render(SDropdown, {
            slots: {
                default: [Item],
                reference: () => 'Open',
            },
        });

        await user.click(screen.getByRole('button', { name: 'Open' }));

        const anchor = screen.getByText('Go to site').closest('a');
        expect(anchor).not.toBeNull();
        expect(anchor).toHaveAttribute('href', 'https://example.com');
    });

    test('Does not close when clicking an item with manual prop', async () => {
        const user = userEvent.setup();

        const Wrapper = defineComponent({
            components: { SDropdown, SDropdownItem },
            setup() {
                const dropdown = ref<InstanceType<typeof SDropdown>>();
                const openDropdown = () => dropdown.value?.open();
                return { dropdown, openDropdown };
            },
            template: `
                <button data-testid="external" @click="openDropdown">External open</button>
                <SDropdown ref="dropdown" manual>
                    <template #reference>Manual</template>
                    <SDropdownItem>Persistent item</SDropdownItem>
                </SDropdown>
            `,
        });

        render(Wrapper);

        await user.click(screen.getByTestId('external'));
        const item = await screen.findByText('Persistent item');
        await user.click(item);

        expect(screen.getByText('Persistent item')).toBeInTheDocument();
    });

    test('Exposes isOpen, close and focus methods via ref', async () => {
        const user = userEvent.setup();

        const Wrapper = defineComponent({
            components: { SDropdown, SDropdownItem },
            setup() {
                const dropdown = ref<InstanceType<typeof SDropdown>>();
                const status = ref('closed');
                const openDropdown = () => dropdown.value?.open();
                const closeDropdown = () => {
                    dropdown.value?.focus();
                    dropdown.value?.close();
                    status.value = dropdown.value?.isOpen ? 'open' : 'closed';
                };
                return { dropdown, status, openDropdown, closeDropdown };
            },
            template: `
                <button data-testid="open" @click="openDropdown">Open</button>
                <button data-testid="close" @click="closeDropdown">Close</button>
                <span data-testid="status">{{ status }}</span>
                <SDropdown ref="dropdown">
                    <template #reference>Trigger</template>
                    <SDropdownItem>Exposed item</SDropdownItem>
                </SDropdown>
            `,
        });

        render(Wrapper);

        await user.click(screen.getByTestId('open'));
        expect(await screen.findByText('Exposed item')).toBeInTheDocument();

        await user.click(screen.getByTestId('close'));
        expect(screen.getByTestId('status')).toHaveTextContent('closed');
    });
});
