import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputAmount from './SInputAmount.vue';
import userEvent from '@testing-library/user-event';

describe('SInputAmount', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 22.99;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputAmount, {
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
});
