import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SInputDateBlock from './SInputDateBlock.vue';
import PrimeVue from 'primevue/config';

const globalConfig = {
    plugins: [[PrimeVue, { unstyled: true }]],
};

describe('SInputDateBlock', () => {
    test('Can be rendered with a date value', () => {
        const modelValue = new Date(2000, 0, 29);

        render(SInputDateBlock, {
            props: { modelValue },
            global: globalConfig,
        });

        const input = screen.getByRole('combobox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('value', '01/29/2000');
    });

    test('Can be rendered with label', () => {
        render(SInputDateBlock, {
            props: { label: 'Test label', modelValue: null },
            global: globalConfig,
        });
        const label = screen.getByText('Test label');

        expect(label).toHaveAttribute('for');
        expect(label).toHaveClass('mb-1 block text-sm font-medium text-gray-700');
    });

    test('Can be rendered with error text', () => {
        render(SInputDateBlock, {
            props: { errorText: 'Error text', modelValue: null },
            global: globalConfig,
        });
        const caption = screen.getByRole('caption');

        expect(caption).toHaveTextContent('Error text');
        expect(caption).toHaveClass('text-xs font-normal text-red-500 mt-1');
    });

    test('Can be rendered with help text', () => {
        render(SInputDateBlock, {
            props: { helpText: 'Help text', modelValue: null },
            global: globalConfig,
        });
        const caption = screen.getByRole('caption');

        expect(caption).toHaveTextContent('Help text');
        expect(caption).toHaveClass('text-xs font-normal text-gray-500 mt-1');
    });

    test('Re-emits update:modelValue when a date is selected from the calendar', async () => {
        const user = userEvent.setup();
        const onUpdate = vi.fn();

        render(SInputDateBlock, {
            props: {
                modelValue: new Date(2000, 0, 15),
                showIcon: true,
                'onUpdate:modelValue': onUpdate,
            },
            global: globalConfig,
        });

        await user.click(screen.getByRole('button', { name: 'Choose Date' }));
        await user.click(screen.getByText('20'));

        expect(onUpdate).toHaveBeenCalledTimes(1);
        const emitted = onUpdate.mock.calls[0][0] as Date;
        expect(emitted).toBeInstanceOf(Date);
        expect(emitted.getDate()).toBe(20);
        expect(emitted.getMonth()).toBe(0);
        expect(emitted.getFullYear()).toBe(2000);
    });
});
