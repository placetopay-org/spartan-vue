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

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
