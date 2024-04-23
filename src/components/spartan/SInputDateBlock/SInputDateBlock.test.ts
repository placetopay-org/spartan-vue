import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputDateBlock from './SInputDateBlock.vue';
import userEvent from '@testing-library/user-event';

describe('SInputDateBlock', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = '29-01-2000';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputDateBlock, {
            props: {
                modelValue,
                modelType: 'dd-MM-yyyy',
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
        });
        const datePicker = screen.getByRole('textbox', { name: 'Datepicker input' });

        await user.click(datePicker);

        await user.click(screen.getByText('8'));

        await user.click(screen.getByText('Select'));
        
        // Assert
        expect(datePicker).toBeInTheDocument();
        expect(modelValue).toBe('08-01-2000');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SInputDateBlock, { props: { label: 'Test label' } });
        const label = screen.getByText('Test label');

        // Assert
        expect(label).toHaveAttribute('for');
        expect(label).toHaveClass('mb-1 block text-sm font-medium text-gray-700');
    });

    test('Can be rendered with error text', () => {
        // Act
        render(SInputDateBlock, { props: { errorText: 'Error text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        // Act
        render(SInputDateBlock, { props: { helpText: 'Help text' } });
        const caption = screen.getByRole('caption');

        // Assert
        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });
});
