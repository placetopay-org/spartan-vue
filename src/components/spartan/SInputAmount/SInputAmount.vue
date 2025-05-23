<script setup lang="ts">
import { SInput, type TInputProps } from '../SInput';
import { computed, ref, watch } from 'vue';
import Big from 'big.js';
import { CurrencyDisplay, useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input';
import { Currencies } from '@/constants';
import type { TInputAmountProps, TInputAmountEmits } from './types';

const emit = defineEmits<TInputAmountEmits>();
const props = defineProps<TInputAmountProps & Partial<TInputProps>>();

const inputProps = computed<Partial<TInputProps>>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currencies, locale, symbol, currency, suffixCurrency, modelValue, minorUnitMode, ...rest } = props;

    return {
        ...rest,
        rightOption: currency,
        rightOptions: currencies?.map((currency) => ({
            label: currency,
            value: currency,
        })),
        prefix: symbol ? (Currencies[currency].symbol ?? '$') : undefined,
        suffix: suffixCurrency ? currency : undefined,
    };
});

const buildOptions = (currency: keyof typeof Currencies) => ({
    currencyDisplay: CurrencyDisplay.hidden,
    precision: Currencies[currency].decimals,
    currency: currency,
    hideNegligibleDecimalDigitsOnFocus: false,
    locale: props.locale,
});

const emitInfo = (currency: keyof typeof Currencies) => {
    if (!numberValue.value) return;
    const minorUnit = Number(Big(numberValue.value).times(10 ** Currencies[currency].decimals));
    emit('info', {
        amount: numberValue.value,
        currency: currency,
        decimals: Currencies[currency].decimals,
        code: Currencies[currency].code,
        symbol: Currencies[currency].symbol,
        minorUnit,
    });
};

const startInNull = ref(!props.modelValue);

const currencyOptions = computed<CurrencyInputOptions>(() => buildOptions(props.currency));
const { inputRef, setOptions, setValue, numberValue, formattedValue } = useCurrencyInput(currencyOptions.value, false);
const setCurrency = (value: keyof typeof Currencies) => setOptions(buildOptions(value));

const updateCurrencyAndInfo = (value: keyof typeof Currencies) => {
    emit('update:currency', value);
    const prevValue = numberValue.value;
    setCurrency(value);

    if (prevValue === numberValue.value) emitInfo(value);
};

watch(numberValue, (value) => {
    let emittedValue = value;
    if (props.minorUnitMode && value) {
        emittedValue = Number(Big(value).times(10 ** Currencies[props.currency].decimals));
    }
    emit('update:modelValue', emittedValue);
});

watch(
    () => props.modelValue,
    (value) => {
        let settableValue = value;

        if (props.minorUnitMode) {
            if (value) settableValue = Number(Big(value).div(10 ** Currencies[props.currency].decimals));
            if (!startInNull.value && settableValue) {
                settableValue = Number(Big(settableValue).div(10 ** Currencies[props.currency].decimals));
                startInNull.value = true;
            }
        }

        setValue(settableValue);
        emitInfo(props.currency);
    },
);

watch(currencyOptions, (options) => {
    setOptions(options);
});
</script>

<template>
    <SInput
        ref="inputRef"
        v-bind="inputProps"
        :model-value="formattedValue"
        @update:right-option="(value) => updateCurrencyAndInfo(value as keyof typeof Currencies)"
    >
        <template #left><slot name="left" /></template>
        <template #right><slot name="right" /></template>
    </SInput>
</template>
