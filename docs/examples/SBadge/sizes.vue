<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: 'size' },
    },
})
</script>

<template>
    <SBadge color="primary" :size="controls.size">Badge</SBadge>
</template>
