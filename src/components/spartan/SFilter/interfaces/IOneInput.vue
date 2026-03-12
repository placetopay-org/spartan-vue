<script setup lang="ts">
import { computed } from 'vue';
import { SInputAmountBlock, SInputBlock } from '@spartan';
import type { IInputConfig } from './types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue', 'update:currency']);

const props = defineProps<{
    modelValue?: string | number;
    config: IInputConfig;
    errorText?: string;
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
    emit('update:currency', currency);
};

const amountCurrency = computed(() => props.config.currency ?? props.config.currencies?.[0]);
</script>

<template>
    <SInputAmountBlock
        v-if="config.type === 'amount'"
        v-model="value as number"
        :currency="amountCurrency!"
        :currencies="config.currencies"
        :type="config.type"
        :placeholder="t('inputSelectorPlaceholder')"
        :minor-unit-mode="config.minorUnitMode"
        :error-text="errorText"
        @update:currency="updateCurrency"
    />
    <SInputBlock
        v-else
        v-model="value"
        :type="config.type"
        :placeholder="t('inputSelectorPlaceholder')"
        :error-text="errorText"
    />
</template>
