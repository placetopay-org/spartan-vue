import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
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

    test('Emits complete when mask is fully filled', async () => {
        let modelValue = '';
        const user = userEvent.setup();

        const { emitted, rerender } = render(SInputMask, {
            props: {
                mask: '000',
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue, mask: '000' });
                },
            },
        });

        const input = screen.getByRole('textbox');
        await user.type(input, '123');

        expect(emitted()['complete']).toBeTruthy();
    });

    test('Renders with left slot', () => {
        render(SInputMask, {
            props: { mask: '000', modelValue: '' },
            slots: { left: '<span>$</span>' },
        });

        expect(screen.getByText('$')).toBeInTheDocument();
    });

    test('Renders with right slot', () => {
        render(SInputMask, {
            props: { mask: '000', modelValue: '' },
            slots: { right: '<span>USD</span>' },
        });

        expect(screen.getByText('USD')).toBeInTheDocument();
    });

    test('Renders with placeholder', () => {
        render(SInputMask, {
            props: { mask: '00/00/0000', modelValue: '', placeholder: 'DD/MM/YYYY' },
        });

        expect(screen.getByPlaceholderText('DD/MM/YYYY')).toBeInTheDocument();
    });
});
