<script setup lang="ts">
import { computed, ref } from 'vue';
import { SInputTag } from '@spartan';
import type { TSelectionInterface } from '../types';
import { translator } from '@/helpers';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string[];
    config: TSelectionInterface;
}>();

const { t } = translator('filter');

const value = computed({
    get() {
        return props.modelValue || [];
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});
</script>

<template>
    <SInputTag
        v-model="value"
        :placeholder="t('inputSelectorPlaceholder')"
    />
</template>
