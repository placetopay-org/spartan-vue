<script setup lang="ts">
import { computed, ref } from 'vue';
import { roundedClass, usePassthrough } from '@/helpers';
import type { TSelectEmits, TSelectProps } from './types';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TSelectEmits>();

const { rounded = 'both', modelValue, placeholderValue } = defineProps<TSelectProps>();

const value = ref(modelValue);
const model = computed({
    get() {
        return modelValue ?? value.value;
    },
    set(newValue) {
        value.value = newValue;
        emit('update:modelValue', newValue);
    },
});


const { pt, extractor } = usePassthrough();

const [placeholderClass] = extractor(pt.value.placeholder);
</script>

<template>
    <select
        :id="id"
        v-model="model"
        :disabled="disabled"
        :name="name"
        :class="twMerge('block border py-2 pl-3 pr-8 text-base text-gray-800',
            error ? 'border-red-500 focus:s-ring-error' : 'border-gray-300 focus:s-ring',
            roundedClass[rounded], $props.class, value === placeholderValue && placeholderClass)"
    >
        <option v-if="placeholder" disabled :value="placeholderValue">
            {{ placeholder }}
        </option>
        <slot />
    </select>
</template>
