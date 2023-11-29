<script setup lang="ts">
import { SInput, type TInputProps } from '../SInput';
import { computed, watch } from 'vue';
import Big from 'big.js';
import { CurrencyDisplay, useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input';
import { Currencies } from '@/constants';
import type { TInputAmountProps, TInputAmountEmits } from './types';

const emit = defineEmits<TInputAmountEmits>();
const props = defineProps<TInputAmountProps & Partial<TInputProps>>();

const inputProps = computed<Partial<TInputProps>>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currencies, locale, symbol, currency, suffixCurrency, modelValue, ...rest } = props;

    return {
        ...rest,
        rightOption: currency,
        rightOptions: currencies?.map((currency) => ({
            label: currency,
            value: currency,
        })),
        prefix: symbol ? Currencies[currency].symbol ?? '$' : undefined,
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
    emit('info', {
        amount: numberValue.value,
        currency: currency,
        decimals: Currencies[currency].decimals,
        code: Currencies[currency].code,
        symbol: Currencies[currency].symbol,
        minorUnit: Number(Big(numberValue.value).times(10 ** Currencies[currency].decimals)),
    });
};

const currencyOptions = computed<CurrencyInputOptions>(() => buildOptions(props.currency));
const { inputRef, setOptions, setValue, numberValue, formattedValue } = useCurrencyInput(currencyOptions.value);
const setCurrency = (value: keyof typeof Currencies) => setOptions(buildOptions(value));

const updateCurrencyAndInfo = (value: keyof typeof Currencies) => {
    emit('update:currency', value);
    const prevValue = numberValue.value;
    setCurrency(value);

    if (prevValue === numberValue.value) emitInfo(value);
};

watch(
    () => props.modelValue,
    (value) => {
        console.log('watch modelValue', value);
        setValue(value);
        emitInfo(props.currency);
    },
);

watch(currencyOptions, (options) => {
    setOptions(options);
});
</script>

<template>
    <!-- update:modelValue automatic from vue-currency-input -->
    <SInput
        ref="inputRef"
        v-bind="inputProps"
        :modelValue="formattedValue"
        @update:right-option="(value) => updateCurrencyAndInfo(value as keyof typeof Currencies)"
    >
        <template #left><slot name="left" /></template>
        <template #right><slot name="right" /></template>
    </SInput>
</template>
