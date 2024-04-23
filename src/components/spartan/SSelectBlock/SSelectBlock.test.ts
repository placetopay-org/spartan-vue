import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSelectBlock from './SSelectBlock.vue';
import { h } from 'vue';
import userEvent from '@testing-library/user-event';

describe('SSelectBlock', () => {
    test('Can be rendered', () => {
        // Act
        render(SSelectBlock);

        // Assert
        screen.getByRole('combobox');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SSelectBlock, { props: { label: 'Test label' } });
        const button = screen.getByRole('combobox', { name: 'Test label' });

        // Assert
        expect(button).toHaveAttribute('id');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SSelectBlock, { props: { errorText: 'Error text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SSelectBlock, { props: { helpText: 'Help text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Can be rendered with options', async () => {
        // Arrange
        let modelValue = '1';
        const option1 = h('option', { value: '1' }, 'Option 1');
        const option2 = h('option', { value: '2' }, 'Option 2');
        const option3 = h('option', { value: '3' }, 'Option 3');

        const user = userEvent.setup();

        // Act
        const { rerender } = render(SSelectBlock, {
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
        render(SSelectBlock, {
            slots: { default: [option1, option2, option3] },
            props: { placeholder: 'Select an option' },
        });

        const placeholder = screen.getByRole('option', { name: 'Select an option' });

        // Assert
        expect(placeholder).toHaveAttribute('disabled');
    });
});
