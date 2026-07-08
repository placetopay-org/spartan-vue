<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    amount: {
        type: 'amount',
        label: 'Amount',
        currency: 'USD',
        operators: ['between', 'notBetween'],
    },
    createdAt: {
        type: 'dateRange',
        label: 'Created at',
        operators: ['between', 'lastWeek', 'lastMonth'],
    },
    quantity: {
        type: 'number',
        label: 'Quantity',
        operators: ['between', 'notBetween'],
    },
} as const;

const value = ref({
    amount: { operator: 'between', value: ['100', '500'] },
});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
