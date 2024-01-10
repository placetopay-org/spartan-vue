<script setup lang="ts">
import { computed } from 'vue';
import { SInput, SInputAmount } from '@spartan';
import type { TField } from '../types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string | number;
    field: TField;
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

const interfaceData = computed(() => props.field.interfaces.oneInput!);
</script>

<template>
    <SInputAmount
        v-if="interfaceData.type === 'amount'"
        v-model="(value as number)"
        :currency="interfaceData.currency"
        :type="interfaceData.type"
        :placeholder="t('inputSelectorPlaceholder')"
        :minor-unit-mode="interfaceData.minorUnitMode"
    />
    <SInput
        v-else
        v-model="value"
        :type="props.field.interfaces.oneInput?.type"
        :placeholder="t('inputSelectorPlaceholder')"
    />
</template>
