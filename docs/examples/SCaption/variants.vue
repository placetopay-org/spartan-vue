<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        variant: { type: 'select', options: ['error', 'info'], default: 'error', label: 'variant' },
    },
})
</script>

<template>
    <SCaption :variant="controls.variant">Error message displayed in red</SCaption>
</template>
