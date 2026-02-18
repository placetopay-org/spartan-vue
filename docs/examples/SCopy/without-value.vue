<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { slots } = usePreview({
    slots: {
        default: { default: 'This text will be copied', label: 'Content' },
    },
})
</script>

<template>
    <SCopy>{{ slots.default }}</SCopy>
</template>
