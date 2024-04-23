import { test, describe } from 'vitest';
import { render, waitFor } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputOTP from './SInputOTP.vue';
import SInputOTPItem from './SInputOTPItem.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SInputOTP', () => {
    test('Throw warning for required "model-value"', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SInputOTP);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', () => {
        // Arrange
        const item1 = h(SInputOTPItem);
        const item2 = h(SInputOTPItem);
        const item3 = h(SInputOTPItem);
        const item4 = h(SInputOTPItem);

        // Act
        render(SInputOTP, { slots: { default: [item1, item2, item3, item4] } });

        const items = screen.getAllByText('-');

        // Assert
        screen.getByRole('textbox');
        expect(items).toHaveLength(4);

        const itemClass = "text-xl font-semibold text-gray-300"
        expect(items[0]).toHaveClass(itemClass);
        expect(items[1]).toHaveClass(itemClass);
        expect(items[2]).toHaveClass(itemClass);
        expect(items[3]).toHaveClass(itemClass);
    });

    test('Can be typed', async () => {
        // Arrange
        let modelValue = '';
        const item1 = h(SInputOTPItem);
        const item2 = h(SInputOTPItem);
        const item3 = h(SInputOTPItem);
        const item4 = h(SInputOTPItem);
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputOTP, {
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
});
