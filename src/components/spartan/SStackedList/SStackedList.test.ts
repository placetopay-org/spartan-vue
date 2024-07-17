import { test, describe } from 'vitest';
import SStackedList from './SStackedList.vue';
import SStackedListItem from './SStackedListItem.vue';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SStackedList', () => {
    test('Can be rendered', async () => {
        // Arrange
        const user = userEvent.setup();

        const Item1 = h(
            SStackedListItem,
            null,
            { default: () => 'Item 1' },
        );
        const Item2 = h(
            SStackedListItem,
            null,
            { default: () => 'Item 2' },
        );
        const Item3 = h(
            SStackedListItem,
            null,
            { default: () => 'Item 3' },
        );

        // Act
        render(SStackedList, {
            slots: {
                default: [Item1, Item2, Item3],
            },
        });

        // Assert
        screen.getByRole('list');
        expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });
});
