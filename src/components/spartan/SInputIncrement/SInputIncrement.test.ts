import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputIncrement from './SInputIncrement.vue';
import userEvent from '@testing-library/user-event';

describe('SInputIncrement', () => {
    test('Throw warning for required "model-value"', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SInputIncrement);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 29;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputIncrement, {
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

        const input = incrementButton.parentElement?.querySelector('input');
        expect(input).toBeTruthy();

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

    test('Sets min value when input is cleared and min is set', async () => {
        let modelValue = 5;
        const user = userEvent.setup();

        const { rerender } = render(SInputIncrement, {
            props: {
                modelValue,
                min: 1,
                'onUpdate:modelValue': (e: number) => {
                    modelValue = e;
                    rerender({ modelValue, min: 1 });
                },
            },
        });

        const input = screen.getByRole('button', { name: 'increment' }).parentElement?.querySelector('input');

        await user.clear(input);
        expect(modelValue).toBe(1);
    });

    test('Disables decrement button when at min', () => {
        render(SInputIncrement, {
            props: { modelValue: 5, min: 5 },
        });

        expect(screen.getByRole('button', { name: 'decrement' })).toBeDisabled();
    });

    test('Disables increment button when at max', () => {
        render(SInputIncrement, {
            props: { modelValue: 10, max: 10 },
        });

        expect(screen.getByRole('button', { name: 'increment' })).toBeDisabled();
    });

    test('Renders disabled state', () => {
        render(SInputIncrement, {
            props: { modelValue: 5, disabled: true },
        });

        expect(screen.getByRole('button', { name: 'decrement' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'increment' })).toBeDisabled();
    });
});
