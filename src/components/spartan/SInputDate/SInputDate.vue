<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { TInputDateProps, TInputDateEmits } from './types';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';

const props = defineProps<TInputDateProps>();
const emit = defineEmits<TInputDateEmits>();

const value = computed({
    get: () => props.modelValue ?? null,
    set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
    <VueDatePicker
        :uid="id"
        v-model="value"
        :hide-input-icon="hideInputIcon"
        :placeholder="placeholder"
        :class="
            twMerge(
                error
                    ? '[&>div>div>input]:border-red-500 hover:[&>div>div>input]:border-red-500 focus:[&>div>div>input]:s-ring-error'
                    : '[&>div>div>input]:border-gray-300 hover:[&>div>div>input]:border-gray-300 focus:[&>div>div>input]:s-ring',
                $props.class,
            )
        "
    ></VueDatePicker>
</template>

<style>
:root {
    --dp-font-family: inherit;
    --dp-input-padding: 8px 12px;
}

input[aria-label='Datepicker input'] {
    @apply rounded-lg placeholder:text-gray-400 placeholder:opacity-100;
}

.dp__theme_light {
    --dp-primary-color: rgb(var(--color-primary-500));
    --dp-border-color: #d1d5db;
    --dp-border-color-hover: #d1d5db;
    --dp-icon-color: #9ca3af;
}
</style>
