import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputIncrementBlock from './SInputIncrementBlock.vue';
import userEvent from '@testing-library/user-event';

describe('SInputIncrementBlock', () => {
    test('Throw warning for required "model-value"', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SInputIncrementBlock);

        // Assert
        expect(warn).toHaveBeenCalledTimes(2);
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SInputIncrementBlock, { props: { label: 'Test label' } });
        const label = screen.getByText('Test label');

        // Assert
        expect(label).toHaveAttribute('for');
        expect(label).toHaveClass('mb-1 block text-sm font-medium text-gray-700');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputIncrementBlock, { props: { errorText: 'Error text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputIncrementBlock, { props: { helpText: 'Help text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 29;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputIncrementBlock, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: number) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const decrementButton = screen.getByRole('button', { name: 'decrement' });
        const incrementButton = screen.getByRole('button', { name: 'increment' });
        
        const input = incrementButton.parentElement?.querySelector('input')!;

        // Assert
        await user.click(incrementButton);
        expect(modelValue).toEqual(30);

        await user.click(incrementButton);
        expect(modelValue).toEqual(31);

        await user.click(incrementButton);
        expect(modelValue).toEqual(32);

        await user.click(decrementButton);
        expect(modelValue).toEqual(31);

        await user.click(decrementButton);
        expect(modelValue).toEqual(30);

        await user.click(decrementButton);
        expect(modelValue).toEqual(29);

        await user.type(input, '01');
        expect(modelValue).toEqual(2901);

        await user.type(input, 'z');
        expect(modelValue).toEqual(2901);

        await user.type(input, '7', { initialSelectionStart: 2 });
        expect(modelValue).toEqual(29701);

        await user.clear(input);
        expect(modelValue).toEqual(0);
    });
});
