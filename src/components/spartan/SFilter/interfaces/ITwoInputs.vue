<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { SInputAmount, SInput, SInputDate } from '@spartan';
import { BlockWrapper } from '@internal';
import { translator } from '@/helpers';
import type { SFilterAmountField, SFilterDateRangeField, SFilterNumberField } from '../types';

type TwoInputsField = SFilterDateRangeField | SFilterNumberField | SFilterAmountField;

const { t } = translator('filter');

const emit = defineEmits(['update:modelValue', 'update:currency']);

const props = defineProps<{
    modelValue?: string[] | number[];
    field: TwoInputsField;
    errorText?: string;
}>();

// For date range, use a single value that contains both dates
const dateRangeValue = computed({
    get: (): Date[] | null => {
        if (!props.modelValue) return null;
        return (props.modelValue as (string | Date)[]).map((v) => (v instanceof Date ? v : new Date(v as string)));
    },
    set: (newValue: Date | Date[] | null) => {
        if (Array.isArray(newValue)) {
            emit(
                'update:modelValue',
                newValue.map((d) => d.toISOString().split('T')[0]),
            );
        }
    },
});

// For non-date types, use separate values
const value1 = ref(props.modelValue?.[0]);
const value2 = ref(props.modelValue?.[1]);

watch([value1, value2], () => {
    emit('update:modelValue', [value1.value, value2.value]);
});

const updateCurrency = (currency?: string) => {
    emit('update:currency', currency);
};

// Only evaluated under `v-else-if="field.type === 'amount'"`, so we can read amount-specific fields safely.
const amountCurrency = computed(() => {
    const amountField = props.field as Extract<TwoInputsField, { type: 'amount' }>;
    return amountField.currency ?? amountField.currencies?.[0];
});
</script>

<template>
    <BlockWrapper :error-text="errorText">
        <!-- Date range picker -->
        <SInputDate
            v-if="field.type === 'dateRange'"
            v-model="dateRangeValue"
            selection-mode="range"
            :placeholder="t('dateRangePlaceholder')"
            :error="!!errorText"
            class="w-full"
        />

        <!-- Amount inputs -->
        <div v-else-if="field.type === 'amount'" class="flex gap-4">
            <SInputAmount
                v-model="value1 as number"
                :currency="amountCurrency!"
                :currencies="field.currencies"
                :placeholder="t('inputSelectorPlaceholder')"
                :minor-unit-mode="field.minorUnitMode"
                :error="!!errorText"
                @update:currency="updateCurrency"
            />
            <SInputAmount
                v-model="value2 as number"
                :currency="amountCurrency!"
                :currencies="field.currencies"
                :placeholder="t('inputSelectorPlaceholder')"
                :minor-unit-mode="field.minorUnitMode"
                :error="!!errorText"
                @update:currency="updateCurrency"
            />
        </div>

        <!-- Generic number inputs -->
        <div v-else class="flex gap-4">
            <SInput
                v-model="value1"
                class="w-48"
                type="number"
                :placeholder="t('inputSelectorPlaceholder')"
                :error="!!errorText"
            />
            <SInput
                v-model="value2"
                class="w-48"
                type="number"
                :placeholder="t('inputSelectorPlaceholder')"
                :error="!!errorText"
            />
        </div>
    </BlockWrapper>
</template>
