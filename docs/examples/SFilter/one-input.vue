<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'price',
        name: 'Price',
        interfaces: {
            oneInput: {
                type: 'amount',
                currency: 'USD',
                currencies: ['USD', 'EUR', 'GBP'],
                operators: ['equal', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
            },
        },
        state: {
            operator: 'greaterThan',
            value: '100',
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" />
</template>
