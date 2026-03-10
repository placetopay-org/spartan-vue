<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const value = ref(null);

const { controls } = usePreview({
    mode: 'playground',
    component: 'SInputDate',
    props: {
        placeholder: { type: 'text', default: 'Select a date', label: 'placeholder' },
        modelType: {
            type: 'select',
            options: ['none', 'dd-MM-yyyy', 'yyyy-MM-dd', 'MM/dd/yyyy'],
            default: 'none',
            label: 'modelType',
        },
        hideInputIcon: { type: 'boolean', default: false, label: 'hideInputIcon' },
        error: { type: 'boolean', default: false, label: 'error' },
    },
});
</script>

<template>
    <SInputDate
        v-model="value"
        :placeholder="controls.placeholder"
        :model-type="controls.modelType === 'none' ? undefined : controls.modelType"
        :hide-input-icon="controls.hideInputIcon"
        :error="controls.error"
    />
</template>
