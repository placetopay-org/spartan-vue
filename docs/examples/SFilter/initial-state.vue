<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

// The `filters` map is the read-only configuration.
const filters = {
    status: {
        type: 'options',
        label: 'Status',
        choices: ['active', 'paused', 'archived'],
        operators: ['equal'],
    },
    createdAt: {
        type: 'dateRange',
        label: 'Created at',
        operators: ['between', 'lastWeek', 'lastMonth'],
    },
} as const;

// Initial state — pre-applied filters. Works for query params, presets,
// localStorage rehydration, or values loaded from a backend.
const value = ref({
    status: { operator: 'equal', value: 'active' },
    createdAt: { operator: 'between', value: ['2026-01-01', '2026-12-31'] },
});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
