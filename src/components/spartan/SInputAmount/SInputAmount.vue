<script setup lang="ts">
import { SInput, type TInputProps } from '../SInput';
import { computed, watchEffect, watch } from 'vue';
import { CurrencyDisplay, useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input';
import { Currencies } from '@/constants';

const emit = defineEmits<{
    (event: 'update:currency', value: string | undefined): void;
    (event: 'update:modelValue', value: number | null): void;
    (event: 'change', value: number | null): void;
}>();

const props = defineProps<
    Partial<TInputProps> & {
        modelValue: number | null;
        currency: keyof typeof Currencies;
        locale?: string;
        symbol?: boolean;
        suffixCurrency?: boolean;
        currencies?: Array<keyof typeof Currencies>;
    }
>();

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

watchEffect(() => setValue(props.modelValue));
watchEffect(() => setOptions(currencyOptions.value));
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
