import { test, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputOtp from './SInputOtp.vue';
import SInputOtpItem from './SInputOtpItem.vue';
import { createContext } from './api';
import userEvent from '@testing-library/user-event';
import { defineComponent, h } from 'vue';

describe('SInputOtp', () => {
    test('Can be rendered', () => {
        // Arrange
        const item1 = h(SInputOtpItem);
        const item2 = h(SInputOtpItem);
        const item3 = h(SInputOtpItem);
        const item4 = h(SInputOtpItem);

        // Act
        render(SInputOtp, { slots: { default: [item1, item2, item3, item4] } });

        const items = screen.getAllByText('-');

        // Assert
        screen.getByRole('textbox');
        expect(items).toHaveLength(4);

        const itemClass = 'text-xl font-semibold text-gray-300';
        expect(items[0]).toHaveClass(itemClass);
        expect(items[1]).toHaveClass(itemClass);
        expect(items[2]).toHaveClass(itemClass);
        expect(items[3]).toHaveClass(itemClass);
    });

    test('Can be typed', async () => {
        // Arrange
        let modelValue = '';
        const item1 = h(SInputOtpItem);
        const item2 = h(SInputOtpItem);
        const item3 = h(SInputOtpItem);
        const item4 = h(SInputOtpItem);
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputOtp, {
            slots: { default: [item1, item2, item3, item4] },
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const input = screen.getByRole('textbox');
        const items = screen.getAllByText('-');

        // Assert
        await user.click(input);
        await user.type(input, '1234');
        await user.type(input, 'x');
        input.blur();
        await user.type(input, 'zzz');
        expect(items[0]).toHaveTextContent('1');
        expect(items[1]).toHaveTextContent('2');
        expect(items[2]).toHaveTextContent('3');
        expect(items[3]).toHaveTextContent('4');

        await user.keyboard('{Backspace}');
        await user.keyboard('{Backspace}');
        await user.type(input, '90');

        expect(items[2]).toHaveTextContent('9');
        expect(items[3]).toHaveTextContent('0');

        await user.dblClick(input);
        await user.keyboard('{Backspace}');
        await user.type(input, '2901');

        expect(items[0]).toHaveTextContent('2');
        expect(items[1]).toHaveTextContent('9');
        expect(items[2]).toHaveTextContent('0');
        expect(items[3]).toHaveTextContent('1');
    });

    test('Handles input events whose trimmed value matches the current length', async () => {
        // Arrange
        const item1 = h(SInputOtpItem);
        const item2 = h(SInputOtpItem);
        const item3 = h(SInputOtpItem);
        const item4 = h(SInputOtpItem);
        const user = userEvent.setup();

        // Act
        render(SInputOtp, { slots: { default: [item1, item2, item3, item4] } });

        const input = screen.getByRole('textbox');

        await user.click(input);
        // Typing a space yields a numeric Number(' ')===0 but trims to '',
        // so updateValue is called with the same length as the empty state value.
        await user.type(input, ' ');

        // Assert — value remains empty and items are still placeholders.
        const items = screen.getAllByText('-');
        expect(items).toHaveLength(4);
        expect((input as HTMLInputElement).value).toBe('');
    });

    test('Ignores non-numeric typed characters', async () => {
        // Arrange
        const item1 = h(SInputOtpItem);
        const item2 = h(SInputOtpItem);
        const item3 = h(SInputOtpItem);
        const item4 = h(SInputOtpItem);
        const user = userEvent.setup();

        // Act
        render(SInputOtp, { slots: { default: [item1, item2, item3, item4] } });

        const input = screen.getByRole('textbox') as HTMLInputElement;

        await user.click(input);
        // 'a' is not a number, so the SInputOtp guard skips updateValue and
        // resets the input value back to the empty context value.
        await user.type(input, 'a');

        // Assert
        expect(input.value).toBe('');
        expect(screen.getAllByText('-')).toHaveLength(4);
    });

    test('Skips emit when the value passes the numeric guard but is not all digits', async () => {
        // Arrange — values like '1e2' satisfy Number.isInteger(Number(v)) yet
        // fail the /^[0-9]+$/ check inside the context, exercising the false
        // branch of the regex emit guard.
        let emitted: string[] = [];
        const item1 = h(SInputOtpItem);
        const item2 = h(SInputOtpItem);
        const item3 = h(SInputOtpItem);
        const item4 = h(SInputOtpItem);

        render(SInputOtp, {
            slots: { default: [item1, item2, item3, item4] },
            props: {
                modelValue: '',
                'onUpdate:modelValue': (e: string) => emitted.push(e),
            },
        });

        const input = screen.getByRole('textbox') as HTMLInputElement;
        await fireEvent.update(input, '1e2');

        // Assert — no emit happened and the input was reset to the empty value.
        expect(emitted).toEqual([]);
        expect(input.value).toBe('');
    });

    test('Prevents the caret from moving on ArrowUp and ArrowLeft', async () => {
        // Arrange
        const item1 = h(SInputOtpItem);
        const item2 = h(SInputOtpItem);
        const item3 = h(SInputOtpItem);
        const item4 = h(SInputOtpItem);
        const user = userEvent.setup();

        // Act
        render(SInputOtp, {
            slots: { default: [item1, item2, item3, item4] },
            props: { modelValue: '12' },
        });

        const input = screen.getByRole('textbox') as HTMLInputElement;

        await user.click(input);
        input.setSelectionRange(0, 0);

        await user.keyboard('{ArrowUp}');
        expect(input.selectionStart).toBe(input.value.length);

        input.setSelectionRange(0, 0);
        await user.keyboard('{ArrowLeft}');

        // Assert — both handlers ran without throwing and reset the caret.
        expect(input.selectionStart).toBe(input.value.length);
        expect(input.selectionEnd).toBe(input.value.length);
    });

    test('Throws when SInputOtpItem is used without a parent SInputOtp', () => {
        expect(() => render(SInputOtpItem)).toThrow('<SInputOtpItem /> is missing parent <SInputOtp /> component');
    });

    test('Exposes a no-op updateSelection on the context', () => {
        // The selection stub is a TODO placeholder for arrow-key navigation;
        // invoke it through createContext so the function body is exercised.
        const Wrapper = defineComponent({
            setup() {
                const ctx = createContext({}, (() => {}) as never);
                ctx.updateSelection(0, 1);
                return () => null;
            },
        });

        expect(() => render(Wrapper)).not.toThrow();
    });
});
