<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { SInputAmount, SInput, SInputDate } from '@spartan';
import { BlockWrapper } from '@internal';
import type { IInputConfig } from './types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue', 'update:currency']);

const props = defineProps<{
    modelValue?: string[] | number[];
    config: IInputConfig;
    errorText?: string;
}>();

const { t } = translator('filter');

// For date range, use a single value that contains both dates
const dateRangeValue = computed({
    get: (): string[] | null => {
        if (props.config.type !== 'date' || !props.modelValue) return null;
        return props.modelValue as string[];
    },
    set: (newValue: string | string[] | null) => {
        if (Array.isArray(newValue)) {
            emit('update:modelValue', newValue);
        }
    },
});

// For non-date types, use separate values
const value1 = ref(props.modelValue?.[0]);
const value2 = ref(props.modelValue?.[1]);

watch([value1, value2], () => {
    if (props.config.type !== 'date') {
        emit('update:modelValue', [value1.value, value2.value]);
    }
});

const updateCurrency = (currency?: string) => {
    emit('update:currency', currency);
};
</script>

<template>
    <BlockWrapper :error-text="errorText">
        <!-- Date range picker -->
        <SInputDate
            v-if="config.type === 'date'"
            v-model="dateRangeValue"
            range
            model-type="yyyy-MM-dd"
            :enable-time-picker="false"
            :placeholder="t('dateRangePlaceholder')"
            :error="!!errorText"
            class="w-full"
        />

        <!-- Amount inputs -->
        <div v-else-if="config.type === 'amount'" class="flex gap-4">
            <SInputAmount
                v-model="value1 as number"
                :currency="config.currency ?? config.currencies![0]"
                :currencies="config.currencies"
                :placeholder="t('inputSelectorPlaceholder')"
                :minor-unit-mode="config.minorUnitMode"
                :error="!!errorText"
                @update:currency="updateCurrency"
            />
            <SInputAmount
                v-model="value2 as number"
                :currency="config.currency ?? config.currencies![0]"
                :currencies="config.currencies"
                :placeholder="t('inputSelectorPlaceholder')"
                :minor-unit-mode="config.minorUnitMode"
                :error="!!errorText"
                @update:currency="updateCurrency"
            />
        </div>

        <!-- Generic number inputs -->
        <div v-else class="flex gap-4">
            <SInput
                v-model="value1"
                class="w-48"
                :type="config.type"
                :placeholder="t('inputSelectorPlaceholder')"
                :error="!!errorText"
            />
            <SInput
                v-model="value2"
                class="w-48"
                :type="config.type"
                :placeholder="t('inputSelectorPlaceholder')"
                :error="!!errorText"
            />
        </div>
    </BlockWrapper>
</template>
