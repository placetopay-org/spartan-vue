import { test, describe, expect, afterEach } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputDate from './SInputDate.vue';
import PrimeVue, { defaultOptions } from 'primevue/config';
import userEvent from '@testing-library/user-event';
import { nextTick } from 'vue';
import * as spartanLocales from '@/locales';

// Overrides the global vue-i18n mock so a test can opt into real Spartan messages (`messages`)
// or into an app without vue-i18n (`unavailable`). `keys` mirrors the global mock.
const i18n = vi.hoisted(() => ({
    mode: 'keys' as 'keys' | 'messages' | 'unavailable',
    locale: undefined as unknown as import('vue').Ref<string>,
}));

vi.mock('vue-i18n', async () => {
    const { ref } = await import('vue');
    const locales = (await import('@/locales')) as Record<string, any>;
    i18n.locale = ref('en');
    const lookup = (key: string) => key.split('.').reduce((node, part) => node?.[part], locales[i18n.locale.value]);

    return {
        useI18n: () => {
            if (i18n.mode === 'unavailable') throw new Error('vue-i18n is not installed');
            return { locale: i18n.locale, t: (key: string) => (i18n.mode === 'messages' ? lookup(key) : key) };
        },
    };
});

// SInputDate copies its translations into PrimeVue's locale, which PrimeVue shares with its
// module-level defaults, so every app created afterwards would inherit them.
const primeVueDefaultLocale = structuredClone(defaultOptions.locale);

afterEach(() => {
    Object.assign(defaultOptions.locale!, structuredClone(primeVueDefaultLocale));
    i18n.mode = 'keys';
    i18n.locale.value = 'en';
});

const globalConfig = {
    plugins: [[PrimeVue, { unstyled: true }]],
};

const openButtonBar = async (props: Record<string, unknown> = {}) => {
    const user = userEvent.setup();
    render(SInputDate, {
        props: { modelValue: null, showButtonBar: true, ...props },
        global: globalConfig,
    });
    await user.click(screen.getByRole('combobox'));
    return user;
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

    describe('Button bar labels', () => {
        test.each(['unavailable', 'keys'] as const)(
            'Falls back to PrimeVue labels when Spartan messages cannot be resolved (%s)',
            async (mode) => {
                i18n.mode = mode;

                await openButtonBar();

                expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
                expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
            },
        );

        test.each(['en', 'es', 'pt', 'it', 'fr'] as const)('Uses the %s translations', async (locale) => {
            i18n.mode = 'messages';
            i18n.locale.value = locale;
            const { today, clear } = spartanLocales[locale].$spartan.inputDate;

            await openButtonBar();

            expect(screen.getByRole('button', { name: today })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: clear })).toBeInTheDocument();
        });

        test('Follows locale changes while the panel is open', async () => {
            i18n.mode = 'messages';

            await openButtonBar();
            expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();

            i18n.locale.value = 'es';
            await nextTick();

            expect(screen.getByRole('button', { name: 'Hoy' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Limpiar' })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Today' })).not.toBeInTheDocument();
        });

        test('Translated buttons keep their actions', async () => {
            i18n.mode = 'messages';
            i18n.locale.value = 'es';
            const onUpdate = vi.fn();

            const user = await openButtonBar({ modelValue: new Date(2000, 0, 15), 'onUpdate:modelValue': onUpdate });
            await user.click(screen.getByRole('button', { name: 'Hoy' }));

            const today = new Date();
            const emitted = onUpdate.mock.calls[0][0] as Date;
            expect(emitted.toDateString()).toBe(today.toDateString());

            await user.click(screen.getByRole('combobox'));
            await user.click(screen.getByRole('button', { name: 'Limpiar' }));

            expect(onUpdate).toHaveBeenLastCalledWith(null);
        });
    });
});
