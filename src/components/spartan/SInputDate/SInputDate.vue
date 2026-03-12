<script lang="ts">
/**
 * A date picker input built on PrimeVue DatePicker with error styling support.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SInputDate Github}.
 */
export default {
    name: 'SInputDate',
};
</script>

<script setup lang="ts">
import type { TInputDateProps, TInputDateEmits, TDateValue } from './types';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import { inputDateStyles } from './styles';
import VoltDatePicker from '../../internal/VoltDatePicker/DatePicker.vue';

const {
    modelValue,
    id,
    dateFormat,
    selectionMode,
    showTime,
    hourFormat,
    showButtonBar,
    showIcon,
    minDate,
    maxDate,
    disabled,
    readonly,
    manualInput,
    disabledDates,
    numberOfMonths,
    showWeek,
    placeholder,
    error,
    class: propClass,
} = defineProps<TInputDateProps>();
const emit = defineEmits<TInputDateEmits>();

const value = computed({
    get: () => modelValue ?? null,
    set: (newValue: TDateValue) => emit('update:modelValue', newValue),
});
</script>

<template>
    <VoltDatePicker
        v-bind="$attrs"
        v-model="value"
        :input-id="id"
        :date-format
        :selection-mode="selectionMode"
        :show-time="showTime"
        :hour-format="hourFormat"
        :show-button-bar="showButtonBar"
        :show-icon="showIcon"
        :min-date="minDate"
        :max-date="maxDate"
        :disabled
        :readonly
        :manual-input="manualInput"
        :disabled-dates="disabledDates"
        :number-of-months="numberOfMonths"
        :show-week="showWeek"
        :placeholder
        append-to="body"
        :class="twMerge(inputDateStyles({ error: !!error }), propClass)"
    />
</template>
