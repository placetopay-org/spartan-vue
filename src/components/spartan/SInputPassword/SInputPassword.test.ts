import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SInputPassword from './SInputPassword.vue';
import SInputPasswordPanel from './SInputPasswordPanel.vue';

describe('SInputPassword', () => {
    test('Can be rendered', () => {
        const { container } = render(SInputPassword);

        const input = container.querySelector('input');
        expect(input).toBeTruthy();
    });

    test('Renders as password type by default', () => {
        const { container } = render(SInputPassword);

        const input = container.querySelector('input');
        expect(input?.type).toBe('password');
    });

    test('Toggles password visibility on eye icon click', async () => {
        const user = userEvent.setup();
        const { container } = render(SInputPassword);

        const input = container.querySelector('input')!;
        const toggleButton = screen.getByRole('button');

        expect(input.type).toBe('password');

        await user.click(toggleButton);
        expect(input.type).toBe('text');

        await user.click(toggleButton);
        expect(input.type).toBe('password');
    });

    test('Emits update:modelValue on input', async () => {
        const user = userEvent.setup();
        const { container, emitted } = render(SInputPassword);

        const input = container.querySelector('input')!;
        await user.type(input, 'abc');

        expect(emitted()['update:modelValue']).toBeTruthy();
        expect(emitted()['update:modelValue'].length).toBe(3);
    });

    test('Emits isValid and state when rules are provided', async () => {
        const user = userEvent.setup();
        const { container, emitted } = render(SInputPassword, {
            props: {
                modelValue: '',
                rules: { min: 8, uppercase: true, digit: true },
            },
        });

        const input = container.querySelector('input')!;
        await user.type(input, 'A');

        expect(emitted()['state']).toBeTruthy();
        expect(emitted()['isValid']).toBeTruthy();
    });

    test('Validates min length rule', () => {
        const { emitted } = render(SInputPassword, {
            props: {
                modelValue: 'Abcdefgh1',
                rules: { min: 8 },
            },
        });

        const stateEvents = emitted()['state'];
        const lastState = stateEvents?.[stateEvents.length - 1]?.[0] as any;
        expect(lastState?.min?.isValid).toBe(true);
    });

    test('Validates uppercase rule', () => {
        const { emitted } = render(SInputPassword, {
            props: {
                modelValue: 'Abcdefgh',
                rules: { uppercase: true },
            },
        });

        const stateEvents = emitted()['state'];
        const lastState = stateEvents?.[stateEvents.length - 1]?.[0] as any;
        expect(lastState?.uppercase?.isValid).toBe(true);
    });

    test('Validates digit rule', () => {
        const { emitted } = render(SInputPassword, {
            props: {
                modelValue: 'abc123',
                rules: { digit: true },
            },
        });

        const stateEvents = emitted()['state'];
        const lastState = stateEvents?.[stateEvents.length - 1]?.[0] as any;
        expect(lastState?.digit?.isValid).toBe(true);
    });

    test('Validates special character rule', () => {
        const { emitted } = render(SInputPassword, {
            props: {
                modelValue: 'abc@123',
                rules: { special: true },
            },
        });

        const stateEvents = emitted()['state'];
        const lastState = stateEvents?.[stateEvents.length - 1]?.[0] as any;
        expect(lastState?.special?.isValid).toBe(true);
    });

    test('Validates lowercase rule', () => {
        const { emitted } = render(SInputPassword, {
            props: {
                modelValue: 'ABCd',
                rules: { lowercase: true },
            },
        });

        const stateEvents = emitted()['state'];
        const lastState = stateEvents?.[stateEvents.length - 1]?.[0] as any;
        expect(lastState?.lowercase?.isValid).toBe(true);
    });

    test('Renders with meter prop', () => {
        const { container } = render(SInputPassword, {
            props: { meter: true, modelValue: 'Test1!' },
        });

        expect(container.querySelector('input')).toBeTruthy();
    });

    test('Validates max length rule', () => {
        const { emitted } = render(SInputPassword, {
            props: {
                modelValue: 'abc',
                rules: { max: 5 },
            },
        });

        const stateEvents = emitted()['state'];
        const lastState = stateEvents?.[stateEvents.length - 1]?.[0] as any;
        expect(lastState?.max?.isValid).toBe(true);
    });

    test('Marks max length rule invalid when value exceeds limit', () => {
        const { emitted } = render(SInputPassword, {
            props: {
                modelValue: 'abcdefgh',
                rules: { max: 5 },
            },
        });

        const stateEvents = emitted()['state'];
        const lastState = stateEvents?.[stateEvents.length - 1]?.[0] as any;
        expect(lastState?.max?.isValid).toBe(false);
    });

    test('Meter shows green when password matches all rules', () => {
        const { container } = render(SInputPassword, {
            props: {
                meter: true,
                modelValue: 'Abcdefg1',
                rules: { min: 8, uppercase: true, digit: true },
            },
        });

        const bar = container.querySelector('.bg-green-500');
        expect(bar).toBeTruthy();
    });

    test('Meter shows red when password fails rules', () => {
        const { container } = render(SInputPassword, {
            props: {
                meter: true,
                modelValue: 'a',
                rules: { min: 8, uppercase: true, digit: true },
            },
        });

        const bar = container.querySelector('.bg-red-500');
        expect(bar).toBeTruthy();
    });

    test('Meter has no color when modelValue is empty', () => {
        const { container } = render(SInputPassword, {
            props: { meter: true },
        });

        expect(container.querySelector('.bg-green-500')).toBeNull();
        expect(container.querySelector('.bg-red-500')).toBeNull();
    });
});

describe('SInputPasswordPanel', () => {
    test('Can be rendered with state', () => {
        const { container } = render(SInputPasswordPanel, {
            props: {
                state: {
                    min: { isValid: true, value: 8 },
                    uppercase: { isValid: false, value: true },
                },
            },
        });

        expect(container.querySelector('span')).toBeTruthy();
    });

    test('Renders an item for each rule in state', () => {
        const { container } = render(SInputPasswordPanel, {
            props: {
                state: {
                    min: { isValid: true, value: 8 },
                    uppercase: { isValid: false, value: true },
                    digit: { isValid: true, value: true },
                },
            },
        });

        const items = container.querySelectorAll('.flex.items-center.gap-2');
        expect(items.length).toBe(3);
    });

    test('Applies valid color when rule passes', () => {
        const { container } = render(SInputPasswordPanel, {
            props: {
                state: {
                    min: { isValid: true, value: 8 },
                },
            },
        });

        expect(container.querySelector('.text-emerald-400')).toBeTruthy();
    });

    test('Applies invalid color when rule fails', () => {
        const { container } = render(SInputPasswordPanel, {
            props: {
                state: {
                    min: { isValid: false, value: 8 },
                },
            },
        });

        expect(container.querySelector('.text-gray-300')).toBeTruthy();
    });

    test('Accepts custom class prop', () => {
        const { container } = render(SInputPasswordPanel, {
            props: {
                class: 'custom-panel-class',
                state: {
                    min: { isValid: true, value: 8 },
                },
            },
        });

        expect(container.querySelector('.custom-panel-class')).toBeTruthy();
    });

    test('Respects open=false prop', () => {
        const { container } = render(SInputPasswordPanel, {
            props: {
                open: false,
                state: {
                    min: { isValid: true, value: 8 },
                },
            },
        });

        expect(container.querySelector('span')).toBeTruthy();
    });
});
