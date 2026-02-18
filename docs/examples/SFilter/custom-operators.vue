<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'reference',
        name: 'Reference',
        interfaces: {
            oneInput: {
                operators: [
                    'equal',
                    { id: 'customSearch', label: 'Search by ref', tag: 'Ref: ' },
                ],
            },
        },
        state: {
            operator: { id: 'customSearch', label: 'Search by ref', tag: 'Ref: ' },
            value: 'ABC-123',
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" />
</template>
