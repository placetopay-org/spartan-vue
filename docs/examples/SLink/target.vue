<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        target: { type: 'select', options: ['_self', '_blank', '_parent', '_top'], default: '_blank', label: 'target' },
    },
})
</script>

<template>
    <SLink href="https://example.com" :target="controls.target">Open in new tab</SLink>
</template>
