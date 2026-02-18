<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        variant: { type: 'select', options: ['solid', 'outline', 'soft', 'subtle'], default: 'solid', label: 'variant' },
    },
})
</script>

<template>
    <SAlert :variant="controls.variant" title="Alert title" description="This is an alert description." />
</template>
