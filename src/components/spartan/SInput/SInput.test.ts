import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInput from './SInput.vue';
import userEvent from '@testing-library/user-event';

describe('SInput', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 'test';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInput, {
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

    test('Can be rendered with prefix/suffix', async () => {
        // Arrange
        let modelValue = 'test';
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInput, {
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
        const { rerender } = render(SInput, {
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

    test('Can recomend SCheckbox/SRadio', async () => {
        // Arrange
        const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        // Act
        render(SInput, { props: { type: 'checkbox' } });
        render(SInput, { props: { type: 'radio' } });

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
