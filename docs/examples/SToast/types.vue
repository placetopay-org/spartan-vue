<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        type: { type: 'select', options: ['success', 'error', 'warning'], default: 'success', label: 'type' },
    },
})
</script>

<template>
    <SToast :type="controls.type" title="Notification message" />
</template>
