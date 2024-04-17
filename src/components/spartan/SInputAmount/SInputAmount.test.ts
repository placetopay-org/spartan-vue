import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputAmount from './SInputAmount.vue';
import userEvent from '@testing-library/user-event';

// TODO: complete the test
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
        await user.keyboard('{backspace}{backspace}');
        await user.type(input, 'test 123');

        // Assert
        console.log('modelValue', modelValue);
        expect(input).toBeInTheDocument();
        screen.debug();
    });
});
