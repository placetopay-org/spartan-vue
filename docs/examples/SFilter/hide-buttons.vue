<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'name',
        name: 'Name',
        interfaces: {
            oneInput: {
                operators: ['equal', 'contains'],
            },
        },
        state: {
            operator: 'contains',
            value: 'John',
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" :hideApplyButton="false" :hideClearButton="false" />
</template>
