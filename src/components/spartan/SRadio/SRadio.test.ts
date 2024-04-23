import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SRadio from './SRadio.vue';
import userEvent from '@testing-library/user-event'

describe('SRadio', () => {
    test('Throw warning for required v-model and value', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SRadio);

        // Assert
        expect(warn).toHaveBeenCalledTimes(2);
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
        expect(warn.mock.calls[1][0]).contains('[Vue warn]: Missing required prop: "value"');
    });

    test('Can be rendered', () => {

        // Act
        render(SRadio);
        
        // Assert
        screen.getByRole('radio');
    });

    test('Can be checked', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(SRadio);
        const checkbox = screen.getByRole('radio');

        await user.click(checkbox);
        
        // Assert
        expect(checkbox).toBeChecked();
    });

    test('Can be checked with group', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        render(SRadio, { slots: { default: 'first' }, props: { value: 'first', modelValue: [] } });
        render(SRadio, { slots: { default: 'second' }, props: { value: 'second', modelValue: [] } });
        

        const firstCheckbox = screen.getByRole('radio', { name: 'first' });
        const secondCheckbox = screen.getByRole('radio', { name: 'second' });

        await user.click(firstCheckbox);
        await user.click(secondCheckbox);
        
        // Assert
        expect(firstCheckbox).toBeChecked();
        expect(secondCheckbox).toBeChecked();
    });
});
