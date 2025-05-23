import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputDate from './SInputDate.vue';
import userEvent from '@testing-library/user-event';

describe('SInputDate', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = '29-01-2000';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputDate, {
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

        await user.click(screen.getByText('$spartan.inputDate.select'));

        // Assert
        expect(datePicker).toBeInTheDocument();
        expect(modelValue).toBe('08-01-2000');
    });
});
