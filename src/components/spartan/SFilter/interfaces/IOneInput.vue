<script setup lang="ts">
import { computed } from 'vue';
import { SInputAmountBlock, SInputBlock } from '@spartan';
import { translator } from '@/helpers';
import type {
    SFilterAmountField,
    SFilterDateField,
    SFilterNumberField,
    SFilterTextField,
} from '../types';

type SingleInputField = SFilterTextField | SFilterNumberField | SFilterAmountField | SFilterDateField;

const { t } = translator('filter');

const emit = defineEmits(['update:modelValue', 'update:currency']);

const props = defineProps<{
    modelValue?: string | number;
    field: SingleInputField;
    errorText?: string;
}>();

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const updateCurrency = (currency?: string) => {
    emit('update:currency', currency);
};

// Only evaluated under `v-if="field.type === 'amount'"`, so we can read amount-specific fields safely.
const amountCurrency = computed(() => {
    const amountField = props.field as Extract<SingleInputField, { type: 'amount' }>;
    return amountField.currency ?? amountField.currencies?.[0];
});
</script>

<template>
    <SInputAmountBlock
        v-if="field.type === 'amount'"
        v-model="value as number"
        :currency="amountCurrency!"
        :currencies="field.currencies"
        type="amount"
        :placeholder="t('inputSelectorPlaceholder')"
        :minor-unit-mode="field.minorUnitMode"
        :error-text="errorText"
        @update:currency="updateCurrency"
    />
    <SInputBlock
        v-else
        v-model="value"
        :type="field.type"
        :placeholder="t('inputSelectorPlaceholder')"
        :error-text="errorText"
    />
</template>
