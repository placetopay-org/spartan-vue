<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'tenant',
        name: 'Tenant',
        permanent: true,
        interfaces: {
            options: {
                options: [
                    { id: '1', label: 'Main Tenant' },
                    { id: '2', label: 'Secondary' },
                ],
                operators: ['equal'],
            },
        },
        state: {
            operator: 'equal',
            value: '1',
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
                ],
                operators: ['equal', 'notEqual'],
            },
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" />
</template>
