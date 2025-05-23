import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputAmountBlock from './SInputAmountBlock.vue';
import userEvent from '@testing-library/user-event';

describe('SInputAmountBlock', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 22.99;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputAmountBlock, {
            props: {
                currency: 'USD',
                modelValue,
                'onUpdate:modelValue': (e: number) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const input = screen.getByRole('textbox');

        input.focus();
        await user.keyboard('{backspace}');
        await user.keyboard('test');

        // Assert
        expect(modelValue).toEqual(22.9);
    });

    test('Can be rendered with label', () => {
        // Act
        render(SInputAmountBlock, { props: { label: 'Test label', currency: 'USD' } });
        const button = screen.getByRole('textbox', { name: 'Test label' });

        // Assert
        expect(button).toHaveAttribute('id');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputAmountBlock, { props: { errorText: 'Error text', currency: 'USD' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputAmountBlock, { props: { helpText: 'Help text', currency: 'USD' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });
});
