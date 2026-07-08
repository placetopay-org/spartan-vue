<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    tenant: {
        type: 'options',
        label: 'Tenant',
        permanent: true,
        choices: [
            { id: '1', label: 'Main Tenant' },
            { id: '2', label: 'Secondary' },
        ],
        operators: ['equal'],
    },
    status: {
        type: 'options',
        label: 'Status',
        choices: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
        ],
        operators: ['equal', 'notEqual'],
    },
} as const;

const value = ref({
    tenant: { operator: 'equal', value: '1' },
});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
