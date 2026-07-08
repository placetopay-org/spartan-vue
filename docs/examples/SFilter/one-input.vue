<script setup lang="ts">
import { ref } from 'vue';
import { usePreview } from '~/composables/usePreview';

const filters = {
    name: {
        type: 'text',
        label: 'Name',
        operators: ['contains'],
    },
    age: {
        type: 'number',
        label: 'Age',
        operators: ['equal', 'greaterThan', 'lessThan'],
    },
    price: {
        type: 'amount',
        label: 'Price',
        currency: 'USD',
        currencies: ['USD', 'EUR', 'GBP'],
        operators: ['equal', 'greaterThan', 'lessThan'],
    },
    createdAt: {
        type: 'date',
        label: 'Created at',
        operators: ['equal', 'before', 'after'],
    },
} as const;

const value = ref({
    price: { operator: 'greaterThan', value: 100 },
});

usePreview({ component: 'SFilter' });
</script>

<template>
    <SFilter v-model="value" :filters="filters" />
</template>
