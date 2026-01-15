import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCheckbox from './SCheckbox.vue';
import userEvent from '@testing-library/user-event';

describe('SCheckbox', () => {
    test('Can be rendered', () => {
        // Act
        render(SCheckbox);

        // Assert
        screen.getByRole('checkbox');
    });

    test('Can be checked', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(SCheckbox);
        const checkbox = screen.getByRole('checkbox');

        await user.click(checkbox);

        // Assert
        expect(checkbox).toBeChecked();
    });

    test('Can be checked with group', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(SCheckbox, {
            slots: { default: 'first' },
            props: { value: 'first', modelValue: [] },
        });
        render(SCheckbox, { slots: { default: 'second' }, props: { value: 'second', modelValue: [] } });

        const firstCheckbox = screen.getByRole('checkbox', { name: 'first' });
        const secondCheckbox = screen.getByRole('checkbox', { name: 'second' });

        await user.click(firstCheckbox);
        await user.click(secondCheckbox);

        // Assert
        expect(firstCheckbox).toBeChecked();
        expect(secondCheckbox).toBeChecked();
    });
});
