<script setup lang="ts">
import { computed } from 'vue';
import { SInputTag } from '@spartan';
import { translator } from '@/helpers';
import type { SFilterSelectionField } from '../types';

const emit = defineEmits(['update:modelValue']);

const { t } = translator('filter');

const props = defineProps<{
    modelValue?: string[] | string;
    // `field` is reserved for symmetry with the other interface components; the
    // selection input itself does not need any field-specific config today.
    field?: SFilterSelectionField;
}>();

void props;

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
