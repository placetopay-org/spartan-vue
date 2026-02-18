<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        color: { type: 'select', options: ['neutral', 'primary', 'secondary', 'success', 'info', 'warning', 'error'], default: 'primary', label: 'color' },
    },
})
</script>

<template>
    <SAlert :color="controls.color" title="Alert title" description="This is an alert description." />
</template>
