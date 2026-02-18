<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'amount',
        name: 'Amount',
        interfaces: {
            twoInputs: {
                type: 'amount',
                currency: 'USD',
                operators: ['between', 'notBetween'],
            },
        },
        state: {
            operator: 'between',
            value: ['100', '500'],
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" />
</template>
