<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    mode: 'playground',
    component: 'SAlert',
    props: {
        color: { type: 'select', options: ['neutral', 'primary', 'secondary', 'success', 'info', 'warning', 'error'], default: 'info', label: 'color' },
        variant: { type: 'select', options: ['solid', 'outline', 'soft', 'subtle'], default: 'soft', label: 'variant' },
        title: { type: 'text', default: 'Heads up!', label: 'title', required: true },
        description: { type: 'text', default: 'This is an informational alert message.', label: 'description', required: true },
        closeable: { type: 'boolean', default: false, label: 'closeable' },
    },
})
</script>

<template>
    <SAlert
        :color="controls.color"
        :variant="controls.variant"
        :title="controls.title"
        :description="controls.description"
        :closeable="controls.closeable"
    />
</template>
