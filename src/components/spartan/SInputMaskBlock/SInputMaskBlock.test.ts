import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputMaskBlock from './SInputMaskBlock.vue';
import userEvent from '@testing-library/user-event';

describe('SInputMaskBlock', () => {
    test('Applies mask to typed value', async () => {
        let modelValue = '';
        const user = userEvent.setup();

        const { rerender } = render(SInputMaskBlock, {
            props: {
                mask: '00/00/0000',
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue, mask: '00/00/0000' });
                },
            },
        });

        const input = screen.getByRole('textbox');
        await user.type(input, '1234567890');

        expect(modelValue).toEqual('12/34/5678');
    });

    test('Emits complete when mask is fully filled', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SInputMaskBlock, {
            props: { mask: '000', modelValue: '' },
        });

        const input = screen.getByRole('textbox');
        await user.type(input, '123');

        expect(emitted()['complete']).toBeTruthy();
    });

    test('Renders with left slot', () => {
        render(SInputMaskBlock, {
            props: { mask: '000' },
            slots: { left: '<span>$</span>' },
        });

        expect(screen.getByText('$')).toBeInTheDocument();
    });

    test('Renders with right slot', () => {
        render(SInputMaskBlock, {
            props: { mask: '000' },
            slots: { right: '<span>USD</span>' },
        });

        expect(screen.getByText('USD')).toBeInTheDocument();
    });

    test('Can be rendered with label', () => {
        // Act
        render(SInputMaskBlock, { props: { label: 'Test label', mask: '00/00/0000' } });
        const label = screen.getByText('Test label');

        // Assert
        expect(label).toHaveAttribute('for');
        expect(label).toHaveClass('mb-1 block text-sm font-medium text-gray-700');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputMaskBlock, { props: { errorText: 'Error text', mask: '00/00/0000' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputMaskBlock, { props: { helpText: 'Help text', mask: '00/00/0000' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });
});
