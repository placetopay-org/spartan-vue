<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'brand',
        name: 'Brand',
        interfaces: {
            options: {
                options: [{ id: '1', label: 'Nike' }, 'Adidas', 'Puma', 'Reebok'],
                multiple: true,
                operators: ['equal', 'notEqual', 'contains'],
            },
        },
        state: {
            operator: 'equal',
            value: ['Adidas'],
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" />
</template>
