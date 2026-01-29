<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { TInputDateProps, TInputDateEmits } from './types';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import type { VueDatePickerProps } from '@vuepic/vue-datepicker';
import { useI18n } from 'vue-i18n';
import { translator } from '@/helpers';

const { locale } = useI18n();
const { t } = translator('inputDate');

const props = defineProps<TInputDateProps & VueDatePickerProps>();
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
        :locale="locale"
        :select-text="t('select')"
        :cancel-text="t('cancel')"
        :now-button-label="t('now')"
        :week-num-name="t('week')"
        :uid="id"
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
@reference '../../../../.storybook/styles.css';

:root {
    --dp-font-family: inherit;
    --dp-input-padding: 8px 12px;
}

input[aria-label='Datepicker input'] {
    @apply rounded-lg placeholder:text-gray-400 placeholder:opacity-100;
}

.dp__theme_light {
    --dp-primary-color: var(--color-spartan-primary-500);
    --dp-border-color: #d1d5db;
    --dp-border-color-hover: #d1d5db;
    --dp-border-color-focus: var(--color-spartan-primary-300);
    --dp-icon-color: #9ca3af;
    --dp-danger-color: transparent;
}

/* Keep focus border color even on hover */
.dp__input_focus.dp__input_focus {
    border-color: var(--dp-border-color-focus);
}
</style>
