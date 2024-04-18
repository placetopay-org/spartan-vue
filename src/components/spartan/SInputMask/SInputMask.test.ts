import { test, describe } from 'vitest';
import { cleanup, render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputMask from './SInputMask.vue';
import userEvent from '@testing-library/user-event';

describe('SInputMask', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = '';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputMask, {
            props: {
                mask: '00/00/0000',
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const input = screen.getByRole('textbox');

        await user.type(input, '1234567890');

        // Assert
        expect(modelValue).toEqual('12/34/5678');
    });
});
