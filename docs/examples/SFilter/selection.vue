<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'tags',
        name: 'Tags',
        interfaces: {
            selection: {
                operators: ['equal', 'notEqual'],
            },
        },
    },
]
</script>

<template>
    <SFilter :fields="fields" />
</template>
