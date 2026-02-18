<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'], default: 'md', label: 'size' },
    },
})
</script>

<template>
    <SAvatar name="John Doe" :size="controls.size" />
</template>
