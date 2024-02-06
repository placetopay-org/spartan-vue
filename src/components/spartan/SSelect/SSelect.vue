<script setup lang="ts">
import { computed, ref } from 'vue';
import { roundedClass } from '@/helpers';
import type { TSelectEmits, TSelectProps } from './types';
import { twMerge } from 'tailwind-merge';

const emit = defineEmits<TSelectEmits>();

const props = withDefaults(defineProps<Partial<TSelectProps>>(), {
    disabled: false,
    error: false,
    id: undefined,
    name: undefined,
    modelValue: undefined,
    placeholder: undefined,
    rounded: 'both',
});

const value = ref(props.modelValue);
const model = computed({
    get() {
        return props.modelValue ?? value.value;
    },
    set(newValue) {
        value.value = newValue;
        emit('update:modelValue', newValue);
    },
});
</script>

<template>
    <select
        :id="id"
        v-model="model"
        :disabled="disabled"
        :name="name"
        :class="twMerge('block border py-2 pl-3 pr-8 text-base text-gray-800',
            error ? 'border-red-500 focus:s-ring-error' : 'border-gray-300 focus:s-ring',
            roundedClass[rounded], props.class)"
    >
        <option v-if="placeholder" disabled :value="undefined">
            {{ placeholder }}
        </option>
        <slot />
    </select>
</template>
