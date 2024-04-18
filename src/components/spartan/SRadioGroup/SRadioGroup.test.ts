import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SRadioGroup from './SRadioGroup.vue';
import SRadioGroupItem from './SRadioGroupItem.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SRadioGroup', () => {
    test('Throw warning for required v-model and value', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SRadioGroup);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', () => {
        // Arrange
        const option1 = h(
            SRadioGroupItem,
            { value: 'first' },
            { title: () => 'first', description: () => 'first description', footer: () => 'first footer' },
        );
        const option2 = h(
            SRadioGroupItem,
            { value: 'second' },
            { title: () => 'second', description: () => 'first description', footer: () => 'first footer' },
        );
        const option3 = h(
            SRadioGroupItem,
            { value: 'third' },
            { title: () => 'third', description: () => 'first description', footer: () => 'first footer' },
        );

        // Act
        render(SRadioGroup, { slots: { default: [option1, option2, option3] } });

        // Assert
        screen.getByRole('radiogroup');
    });

    test('Can be checked', async () => {
        // Arrange
        let modelValue = 'first';
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second' }, { title: () => 'second' });
        const option3 = h(SRadioGroupItem, { value: 'third' }, { title: () => 'third' });

        const user = userEvent.setup();

        // Act
        const { rerender } = render(SRadioGroup, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: { default: [option1, option2, option3] },
        });
        const op1 = screen.getByText('first');
        const op2 = screen.getByText('second');
        const op3 = screen.getByText('third');

        await user.click(op2);

        // Assert
        expect(modelValue).toEqual('second');
        expect(op1.parentElement?.parentElement?.parentElement?.parentElement).toHaveAttribute('aria-checked', 'false');
        expect(op2.parentElement?.parentElement?.parentElement?.parentElement).toHaveAttribute('aria-checked', 'true');
        expect(op3.parentElement?.parentElement?.parentElement?.parentElement).toHaveAttribute('aria-checked', 'false');
    });
});
