<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SCaption',
    props: {
        variant: { type: 'select', options: ['error', 'info'], default: 'error', label: 'variant' },
    },
    slots: {
        default: { default: 'This field is required', label: 'Content' },
    },
})
</script>

<template>
    <SCaption :variant="controls.variant">{{ slots.default }}</SCaption>
</template>
