<script setup lang="ts">
import { computed } from 'vue';
import { SInput, SInputAmount } from '@spartan';
import type { IInputConfig } from './types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string | number;
    config: IInputConfig;
}>();

const { t } = translator('filter');

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const updateCurrency = (currency?: string) => {
    props.config.currency = currency as any;
};
</script>

<template>
    <SInputAmount
        v-if="config.inputType === 'amount'"
        v-model="(value as number)"
        :currency="config.currency ?? config.currencies![0]"
        :currencies="config.currencies"
        :type="config.inputType"
        :placeholder="t('inputSelectorPlaceholder')"
        :minor-unit-mode="config.minorUnitMode"
        @update:currency="updateCurrency"
    />
    <SInput
        v-else
        v-model="value"
        :type="config.inputType"
        :placeholder="t('inputSelectorPlaceholder')"
    />
</template>
