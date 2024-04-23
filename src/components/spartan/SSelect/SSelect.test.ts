import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSelect from './SSelect.vue';
import { h } from 'vue';
import userEvent from '@testing-library/user-event';

describe('SSelect', () => {
    test('Can be rendered', () => {
        // Act
        render(SSelect);

        // Assert
        screen.getByRole('combobox');
    });

    test('Can be rendered with options', async () => {
        // Arrange
        let modelValue = '1';
        const option1 = h('option', { value: '1' }, 'Option 1');
        const option2 = h('option', { value: '2' }, 'Option 2');
        const option3 = h('option', { value: '3' }, 'Option 3');

        const user = userEvent.setup();

        // Act
        const { rerender } = render(SSelect, {
            slots: { default: [option1, option2, option3] },
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const combobox = screen.getByRole('combobox');

        await user.selectOptions(combobox, '2');

        // Assert
        expect(modelValue).toBe('2');
    });

    test('Can be rendered with placeholder', async () => {
        // Arrange
        const option1 = h('option', { value: '1' }, 'Option 1');
        const option2 = h('option', { value: '2' }, 'Option 2');
        const option3 = h('option', { value: '3' }, 'Option 3');

        // Act
        render(SSelect, {
            slots: { default: [option1, option2, option3] },
            props: { placeholder: 'Select an option' },
        });

        const placeholder = screen.getByRole('option', { name: 'Select an option' });

        // Assert
        expect(placeholder).toHaveAttribute('disabled');
    });
});
