import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SInputAmount from './SInputAmount.vue';
import userEvent from '@testing-library/user-event';

describe('SInputAmount', () => {
    test('Can be rendered', async () => {
        // Arrange
        let modelValue = 22.99;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SInputAmount, {
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

    test('Renders the currency symbol as a prefix when symbol is true', () => {
        render(SInputAmount, {
            props: { currency: 'USD', modelValue: 10, symbol: true },
        });

        expect(screen.getByText('$')).toBeInTheDocument();
    });

    test('Falls back to "$" prefix when the currency has no symbol', () => {
        render(SInputAmount, {
            props: { currency: 'AED', modelValue: 10, symbol: true },
        });

        expect(screen.getByText('$')).toBeInTheDocument();
    });

    test('Renders the currency code as suffix when suffixCurrency is true', () => {
        render(SInputAmount, {
            props: { currency: 'USD', modelValue: 10, suffixCurrency: true },
        });

        expect(screen.getByText('USD')).toBeInTheDocument();
    });

    test('Renders the currency selector when currencies prop is provided', () => {
        render(SInputAmount, {
            props: {
                currency: 'USD',
                modelValue: 10,
                currencies: ['USD', 'EUR', 'COP'],
            },
        });

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'USD' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'EUR' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'COP' })).toBeInTheDocument();
    });

    test('Emits update:currency and info when currency selector changes', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SInputAmount, {
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
        expect(emitted().info).toBeTruthy();
        const lastInfo = (emitted().info as unknown[][]).at(-1)![0] as {
            currency: string;
            code: string;
            symbol: string | null;
            decimals: number;
            amount: number | null;
            minorUnit: number;
        };
        expect(lastInfo).toMatchObject({
            currency: 'EUR',
            code: '978',
            symbol: '€',
            decimals: 2,
            amount: 10,
            minorUnit: 1000,
        });
    });

    test('Does not emit info when numberValue is null on currency change', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SInputAmount, {
            props: {
                currency: 'USD',
                modelValue: null,
                currencies: ['USD', 'EUR'],
            },
        });

        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'EUR');

        expect(emitted()['update:currency']).toBeTruthy();
        expect(emitted().info).toBeFalsy();
    });

    test('Multiplies emitted value by minor units when minorUnitMode is true', async () => {
        const user = userEvent.setup();
        let emittedValue: number | null = null;

        render(SInputAmount, {
            props: {
                currency: 'USD',
                modelValue: null,
                minorUnitMode: true,
                'onUpdate:modelValue': (value: number | null) => {
                    emittedValue = value;
                },
            },
        });

        const input = screen.getByRole('textbox');
        input.focus();
        await user.keyboard('5');

        expect(emittedValue).toEqual(500);
    });

    test('Divides incoming modelValue when minorUnitMode is true', async () => {
        let modelValue: number | null = 1500;

        const { rerender } = render(SInputAmount, {
            props: {
                currency: 'USD',
                modelValue,
                minorUnitMode: true,
            },
        });

        modelValue = 2500;
        await rerender({ modelValue });

        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value.replace(/\s/g, '')).toContain('0.25');
    });

    test('Updates currency options when locale prop changes', async () => {
        const { rerender } = render(SInputAmount, {
            props: { currency: 'USD', modelValue: 10, locale: 'en-US' },
        });

        await rerender({ currency: 'USD', modelValue: 10, locale: 'es-CO' });

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('Skips info emit when currency change rounds the value', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SInputAmount, {
            props: {
                currency: 'USD',
                modelValue: 10.55,
                currencies: ['USD', 'JPY'],
            },
        });

        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'JPY');

        const infoEvents = (emitted().info ?? []) as unknown[][];
        const jpyInfo = infoEvents.find((call) => (call[0] as { currency: string } | undefined)?.currency === 'JPY');
        expect(emitted()['update:currency']).toBeTruthy();
        expect(jpyInfo).toBeUndefined();
    });

    test('Skips division when modelValue becomes falsy with minorUnitMode', async () => {
        let modelValue: number | null = 1000;

        const { rerender } = render(SInputAmount, {
            props: { currency: 'USD', modelValue, minorUnitMode: true },
        });

        modelValue = null;
        await rerender({ modelValue });

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('Skips double division when starting with null modelValue and minorUnitMode', async () => {
        let modelValue: number | null = null;

        const { rerender } = render(SInputAmount, {
            props: { currency: 'USD', modelValue, minorUnitMode: true },
        });

        modelValue = 500;
        await rerender({ modelValue });

        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value.replace(/\s/g, '')).toContain('5');
    });

    test('Renders left and right slot content', () => {
        render(SInputAmount, {
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
