<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { slots } = usePreview({
    component: 'SCaption',
    slots: {
        default: { default: 'Additional information can be provided here', label: 'default' },
    },
})
</script>

<template>
    <SCaption variant="info">{{ slots.default }}</SCaption>
</template>
