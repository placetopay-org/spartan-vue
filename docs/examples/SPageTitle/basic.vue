<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { slots } = usePreview({
    mode: 'playground',
    component: 'SPageTitle',
    slots: {
        default: { default: 'Dashboard Overview', label: 'Content' },
    },
})
</script>

<template>
    <SPageTitle>{{ slots.default }}</SPageTitle>
</template>
