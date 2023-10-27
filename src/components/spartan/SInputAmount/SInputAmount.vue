<script setup lang="ts">
import { SInput, type TInputProps } from '../SInput';
import { computed, watch } from 'vue';
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
        prefix: symbol ? Currencies[currency].symbol ?? '' : undefined,
        suffix: suffixCurrency ? currency : undefined,
    };
});

const currencyOptions = computed<CurrencyInputOptions>(() => ({
    currencyDisplay: CurrencyDisplay.hidden,
    precision: Currencies[props.currency].minorUnit,
    currency: props.currency,
    hideNegligibleDecimalDigitsOnFocus: false,
    locale: props.locale,
}));

const { inputRef, setOptions, setValue, numberValue, formattedValue } = useCurrencyInput(currencyOptions.value);

watch(numberValue, (value) => {
    emit('update:modelValue', value);
});

watch(
    () => props.modelValue,
    (value) => {
        setValue(value);
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
        v-model="formattedValue"
        @update:right-option="$emit('update:currency', $event)"
    >
        <template #left><slot name="left" /></template>
        <template #right><slot name="right" /></template>
    </SInput>
</template>
