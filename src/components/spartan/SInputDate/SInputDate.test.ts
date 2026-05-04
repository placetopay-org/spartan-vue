import { test, describe, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputDate from './SInputDate.vue';
import PrimeVue from 'primevue/config';
import userEvent from '@testing-library/user-event';

const globalConfig = {
    plugins: [[PrimeVue, { unstyled: true }]],
};

describe('SInputDate', () => {
    test('Renders without explicit PrimeVue plugin setup', () => {
        render(SInputDate, {
            props: { modelValue: new Date(2000, 0, 29) },
        });
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('Can be rendered with a date value', () => {
        const modelValue = new Date(2000, 0, 29);

        render(SInputDate, {
            props: { modelValue },
            global: globalConfig,
        });

        const input = screen.getByRole('combobox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('value', '01/29/2000');
    });

    test('Does not render icon by default', () => {
        render(SInputDate, {
            props: { modelValue: null },
            global: globalConfig,
        });

        const button = screen.queryByRole('button', { name: 'Choose Date' });
        expect(button).not.toBeInTheDocument();
    });

    test('Opens calendar on button click when showIcon is true', async () => {
        const user = userEvent.setup();

        render(SInputDate, {
            props: { modelValue: null, showIcon: true },
            global: globalConfig,
        });

        const button = screen.getByRole('button', { name: 'Choose Date' });
        await user.click(button);

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
    });

    test('Applies error styling when error prop is true', () => {
        const { container } = render(SInputDate, {
            props: { modelValue: null, error: true },
            global: globalConfig,
        });

        const wrapper = container.firstElementChild;
        expect(wrapper?.className).toContain('border-red-500');
    });

    test('Emits update:modelValue when a date is selected from the calendar', async () => {
        const user = userEvent.setup();
        const onUpdate = vi.fn();

        render(SInputDate, {
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
