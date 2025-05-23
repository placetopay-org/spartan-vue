<script setup lang="ts">
import { computed } from 'vue';
import { SInputTag } from '@spartan';
import type { ISelectionConfig } from './types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string[] | string;
    config: ISelectionConfig;
}>();

const { t } = translator('filter');

const value = computed({
    get() {
        if (Array.isArray(props.modelValue)) return props.modelValue;
        if (typeof props.modelValue === 'string') return props.modelValue.split(',');
        return [];
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});
</script>

<template>
    <SInputTag v-model="value" :placeholder="t('inputSelectorPlaceholder')" />
</template>
