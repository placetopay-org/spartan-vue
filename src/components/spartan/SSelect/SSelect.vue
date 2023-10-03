<script setup lang="ts">
import { computed, ref } from 'vue';
import { roundedClass } from '@/helpers';
import type { TSelectProps } from './types';

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void;
}>();

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
        :class="[
            'block border py-2 pl-3 pr-8 text-base text-gray-800 focus:z-10',
            error ? 'border-red-500 focus:s-ring-error' : 'border-gray-300 focus:s-ring',
            roundedClass[rounded],
        ]"
    >
        <option v-if="placeholder" disabled :value="undefined">
            {{ placeholder }}
        </option>
        <slot />
    </select>
</template>
