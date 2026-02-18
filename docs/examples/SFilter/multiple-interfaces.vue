<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'price',
        name: 'Price',
        interfaces: {
            oneInput: {
                type: 'number',
                operators: ['equal', 'greaterThan', 'lessThan'],
            },
            twoInputs: {
                type: 'number',
                operators: ['between', 'notBetween'],
            },
            none: {
                operators: ['exist', 'notExist'],
            },
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" />
</template>
