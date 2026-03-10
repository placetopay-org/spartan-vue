<script lang="ts">
/**
 * A date picker input built on VueDatePicker with locale support and error styling.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SInputDate Github}.
 */
export default {
    name: 'SInputDate',
};
</script>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { TInputDateProps, TInputDateEmits } from './types';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import type { RootProps } from '@vuepic/vue-datepicker';
import { useI18n } from 'vue-i18n';
import { translator } from '@/helpers';

const { locale } = useI18n();
const { t } = translator('inputDate');

const props = defineProps<TInputDateProps & RootProps>();
const emit = defineEmits<TInputDateEmits>();

const value = computed({
    get: () => props.modelValue ?? null,
    set: (newValue: string | string[] | null) => emit('update:modelValue', newValue),
});
</script>

<template>
    <VueDatePicker
        v-bind="{ ...$props, modelValue: undefined }"
        v-model="value"
        :locale="locale as any"
        :select-text="t('select')"
        :cancel-text="t('cancel')"
        :now-button-label="t('now')"
        :week-num-name="t('week')"
        :uid="id"
        :class="
            twMerge(
                error
                    ? 'focus:[&>div>div>input]:s-ring-error [&>div>div>input]:border-red-500 hover:[&>div>div>input]:border-red-500'
                    : 'focus:[&>div>div>input]:s-ring [&>div>div>input]:border-gray-300 dark:[&>div>div>input]:border-white/10 hover:[&>div>div>input]:border-gray-300 dark:hover:[&>div>div>input]:border-white/10',
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
    border-radius: 0.5rem;
}
input[aria-label='Datepicker input']::placeholder {
    color: rgb(156 163 175);
    opacity: 1;
}

.dp__theme_light {
    --dp-primary-color: var(--color-spartan-primary-500);
    --dp-border-color: #d1d5db;
    --dp-border-color-hover: #d1d5db;
    --dp-border-color-focus: var(--color-spartan-primary-300);
    --dp-icon-color: #9ca3af;
    --dp-danger-color: transparent;
}

.dp__theme_dark {
    --dp-background-color: rgba(255, 255, 255, 0.05);
    --dp-text-color: #f9fafb;
    --dp-hover-color: rgba(255, 255, 255, 0.1);
    --dp-hover-text-color: #f9fafb;
    --dp-hover-icon-color: #d1d5db;
    --dp-primary-color: var(--color-spartan-primary-500);
    --dp-primary-disabled-color: var(--color-spartan-primary-800);
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #6b7280;
    --dp-border-color: rgba(255, 255, 255, 0.1);
    --dp-border-color-hover: rgba(255, 255, 255, 0.1);
    --dp-border-color-focus: var(--color-spartan-primary-300);
    --dp-disabled-color: #374151;
    --dp-disabled-color-text: #6b7280;
    --dp-scroll-bar-background: #1f2937;
    --dp-scroll-bar-color: #4b5563;
    --dp-success-color: #10b981;
    --dp-success-color-disabled: #065f46;
    --dp-icon-color: #9ca3af;
    --dp-danger-color: transparent;
    --dp-marker-color: var(--color-spartan-primary-500);
    --dp-tooltip-color: #1f2937;
    --dp-highlight-color: rgba(255, 255, 255, 0.1);
    --dp-range-between-dates-background-color: rgba(255, 255, 255, 0.05);
    --dp-range-between-dates-text-color: #f9fafb;
    --dp-range-between-border-color: rgba(255, 255, 255, 0.1);
}

/* Keep focus border color even on hover */
.dp__input_focus.dp__input_focus {
    border-color: var(--dp-border-color-focus);
}
</style>
