<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { slots } = usePreview({
    slots: {
        default: { default: 'Your changes have been saved successfully.', label: 'default' },
    },
})
</script>

<template>
    <SAlert>{{ slots.default }}</SAlert>
</template>
