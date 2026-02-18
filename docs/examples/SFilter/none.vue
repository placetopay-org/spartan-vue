<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({ component: 'SFilter' })

const fields = [
    {
        id: 'avatar',
        name: 'Has Avatar',
        interfaces: {
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
