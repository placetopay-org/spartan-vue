import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputAmountBlock from './SInputAmountBlock.vue';
import userEvent from '@testing-library/user-event';

describe('SInputAmountBlock', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 22.99;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputAmountBlock, {
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

    test('Can be rendered with label', () => {
        // Act
        render(SInputAmountBlock, { props: { label: 'Test label', currency: 'USD' } });
        const button = screen.getByRole('textbox', { name: 'Test label' });

        // Assert
        expect(button).toHaveAttribute('id');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputAmountBlock, { props: { errorText: 'Error text', currency: 'USD' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputAmountBlock, { props: { helpText: 'Help text', currency: 'USD' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Re-emits update:currency when the currency selector changes', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SInputAmountBlock, {
            props: {
                currency: 'USD',
                modelValue: 10,
                currencies: ['USD', 'EUR'],
            },
        });

        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'EUR');

        expect(emitted()['update:currency']).toBeTruthy();
        expect(emitted()['update:currency'][0]).toEqual(['EUR']);
    });

    test('Renders left and right slot content', () => {
        render(SInputAmountBlock, {
            props: { currency: 'USD', modelValue: 10 },
            slots: {
                left: '<span data-testid="left-content">L</span>',
                right: '<span data-testid="right-content">R</span>',
            },
        });

        expect(screen.getByTestId('left-content')).toBeInTheDocument();
        expect(screen.getByTestId('right-content')).toBeInTheDocument();
    });
});
