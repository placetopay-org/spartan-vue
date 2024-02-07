<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { TInputDateProps, TInputDateEmits } from './types';
import { computed } from 'vue';

const props = defineProps<TInputDateProps>();
const emit = defineEmits<TInputDateEmits>();

const value = computed({
    get: () => props.modelValue ?? null,
    set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
    <VueDatePicker v-model="value"></VueDatePicker>
</template>

<style>
:root {
    --dp-font-family: 'Nunito Sans';
}

input[aria-label="Datepicker input"] {
    @apply focus:s-ring;
}

.dp__theme_light {
    --dp-primary-color: rgb(var(--color-primary-500));
    --dp-border-color: #d1d5db;
    --dp-border-color-hover: #d1d5db;
}
</style>
