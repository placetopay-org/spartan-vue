<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const fields = [
    {
        id: 'name',
        name: 'Name',
        interfaces: {
            oneInput: {
                operators: ['equal', 'contains', 'startsWith'],
            },
        },
    },
    {
        id: 'status',
        name: 'Status',
        interfaces: {
            options: {
                options: [
                    { id: 'active', label: 'Active' },
                    { id: 'inactive', label: 'Inactive' },
                    { id: 'pending', label: 'Pending' },
                ],
                operators: ['equal', 'notEqual'],
            },
        },
    },
]

usePreview({ component: 'SFilter' })
</script>

<template>
    <SFilter :fields="fields" />
</template>
