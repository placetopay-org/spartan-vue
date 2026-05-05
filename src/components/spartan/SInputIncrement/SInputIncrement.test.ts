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

    test('Resets input to current value when typed value is not a number', async () => {
        let modelValue = 10;

        const { rerender } = render(SInputIncrement, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: number) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const input = screen.getByRole('button', { name: 'increment' }).parentElement?.querySelector('input');
        expect(input).toBeTruthy();

        // jsdom strips non-numeric values from type="number" inputs, so we
        // override the value descriptor to force the handler to read 'abc'
        // and exercise the isNaN branch.
        let assignedValue: string | undefined;
        Object.defineProperty(input!, 'value', {
            configurable: true,
            get: () => 'abc',
            set: (v: string) => {
                assignedValue = v;
            },
        });
        input!.dispatchEvent(new Event('input', { bubbles: true }));

        expect(assignedValue).toBe('10');
        expect(modelValue).toBe(10);
    });

    test('Clamps input to min when typed value is below min', async () => {
        let modelValue = 10;

        const { rerender } = render(SInputIncrement, {
            props: {
                modelValue,
                min: 5,
                'onUpdate:modelValue': (e: number) => {
                    modelValue = e;
                    rerender({ modelValue, min: 5 });
                },
            },
        });

        const input = screen.getByRole('button', { name: 'increment' }).parentElement?.querySelector('input');
        expect(input).toBeTruthy();

        input!.value = '2';
        input!.dispatchEvent(new Event('input', { bubbles: true }));

        expect(input!.value).toBe('5');
        expect(modelValue).toBe(10);
    });

    test('Clamps input to max when typed value is above max', async () => {
        let modelValue = 5;

        const { rerender } = render(SInputIncrement, {
            props: {
                modelValue,
                max: 10,
                'onUpdate:modelValue': (e: number) => {
                    modelValue = e;
                    rerender({ modelValue, max: 10 });
                },
            },
        });

        const input = screen.getByRole('button', { name: 'increment' }).parentElement?.querySelector('input');
        expect(input).toBeTruthy();

        input!.value = '99';
        input!.dispatchEvent(new Event('input', { bubbles: true }));

        expect(input!.value).toBe('10');
        expect(modelValue).toBe(5);
    });
});
