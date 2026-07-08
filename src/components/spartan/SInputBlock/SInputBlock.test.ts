import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputBlock from './SInputBlock.vue';
import userEvent from '@testing-library/user-event';

describe('SInputBlock', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 'test';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputBlock, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const input = screen.getByRole('textbox');

        await user.type(input, ' value');

        // Assert
        expect(modelValue).toEqual('test value');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SInputBlock, { props: { label: 'Test label' } });
        const button = screen.getByRole('textbox', { name: 'Test label' });

        // Assert
        expect(button).toHaveAttribute('id');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputBlock, { props: { errorText: 'Error text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputBlock, { props: { helpText: 'Help text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Can be rendered with prefix/suffix', async () => {
        // Arrange
        let modelValue = 'test';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputBlock, {
            props: {
                prefix: 'https://',
                suffix: '.com',
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const input = screen.getByRole('textbox');

        await user.type(input, ' value');

        // Assert
        expect(modelValue).toEqual('test value');
    });

    test('Can be rendered with select', async () => {
        // Arrange
        let modelValue = 'test';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputBlock, {
            props: {
                rightOption: 'Test 1',
                rightOptions: [
                    { value: '1', label: 'Test 1' },
                    { value: '2', label: 'Test 2' },
                ],
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });

        const input = screen.getByRole('textbox');
        const selector = screen.getByRole('combobox');

        await user.type(input, ' value');
        await user.selectOptions(selector, '2');

        // Assert
        expect(modelValue).toEqual('test value');
    });

    test('Forwards the left and right slots to the inner input', () => {
        // The wrapper only renders these templates when the slot is provided, so an
        // unconditional pass-through would not be caught by the other tests.
        render(SInputBlock, {
            props: { label: 'Amount' },
            slots: {
                left: '<span data-testid="left">$</span>',
                right: '<span data-testid="right">USD</span>',
            },
        });

        // Assert
        expect(screen.getByTestId('left')).toHaveTextContent('$');
        expect(screen.getByTestId('right')).toHaveTextContent('USD');
    });

    test('Omits the left and right slots when none are provided', () => {
        // Act
        render(SInputBlock, { props: { label: 'Amount' } });

        // Assert
        expect(screen.queryByTestId('left')).toBeNull();
        expect(screen.queryByTestId('right')).toBeNull();
        expect(screen.getByRole('textbox', { name: 'Amount' })).toBeInTheDocument();
    });

    test('Can recomend SCheckbox/SRadio', async () => {
        // Arrange
        const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        // Act
        render(SInputBlock, { props: { type: 'checkbox' } });
        render(SInputBlock, { props: { type: 'radio' } });

        // Assert
        expect(error).toHaveBeenCalledTimes(2);
        expect(error.mock.calls[0][0]).contains(
            'The <SCheckbox /> component should be used instead of the <SInput type="checkbox"/>',
        );
        expect(error.mock.calls[1][0]).contains(
            'The <SRadio /> component should be used instead of the <SInput type="radio"/>',
        );
    });
});
