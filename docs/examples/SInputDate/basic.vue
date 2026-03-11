<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const value = ref(null);

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputDate',
    props: {
        placeholder: { type: 'text', default: 'Select a date', label: 'placeholder' },
        dateFormat: {
            type: 'select',
            options: ['mm/dd/yy', 'dd/mm/yy', 'yy-mm-dd'],
            default: 'mm/dd/yy',
            label: 'dateFormat',
        },
        selectionMode: {
            type: 'select',
            options: ['single', 'multiple', 'range'],
            default: 'single',
            label: 'selectionMode',
        },
        showIcon: { type: 'boolean', default: true, label: 'showIcon' },
        showButtonBar: { type: 'boolean', default: false, label: 'showButtonBar' },
        showTime: { type: 'boolean', default: false, label: 'showTime' },
        disabled: { type: 'boolean', default: false, label: 'disabled' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
});
</script>

<template>
    <SInputDate
        v-model="value"
        :placeholder="controls.placeholder"
        :date-format="controls.dateFormat"
        :selection-mode="controls.selectionMode"
        :show-icon="controls.showIcon"
        :show-button-bar="controls.showButtonBar"
        :show-time="controls.showTime"
        :disabled="controls.disabled"
        :error="controls.error"
    />
</template>
