<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    name: {
        type: 'text',
        label: 'Name',
        operators: ['equal', 'contains', 'startsWith'],
    },
    status: {
        type: 'options',
        label: 'Status',
        choices: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
            { id: 'pending', label: 'Pending' },
        ],
        operators: ['equal', 'notEqual'],
    },
} as const;

const value = ref({});

const { controls } = usePreview({
    mode: 'playground',
    component: 'SFilter',
    props: {
        hideApplyButton: { type: 'boolean', default: false, label: 'hideApplyButton' },
        hideClearButton: { type: 'boolean', default: false, label: 'hideClearButton' },
        immediateApply: { type: 'boolean', default: false, label: 'immediateApply' },
        responsive: { type: 'boolean', default: true, label: 'responsive' },
    },
    imports: { ref: 'vue' },
    data: {
        filters,
        value: { expression: 'ref({})' },
    },
    staticAttrs: {
        'v-model': 'value',
        ':filters': 'filters',
    },
});
</script>

<template>
    <SFilter
        v-model="value"
        :filters="filters"
        :hide-apply-button="controls.hideApplyButton"
        :hide-clear-button="controls.hideClearButton"
        :immediate-apply="controls.immediateApply"
        :responsive="controls.responsive"
    />
</template>
