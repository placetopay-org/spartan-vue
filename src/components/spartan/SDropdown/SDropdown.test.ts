import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDropdown from './SDropdown.vue';
import SDropdownItem from './SDropdownItem.vue';
import userEvent from '@testing-library/user-event';
import { table } from '@/data';
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
        screen.debug();
    });
});
