<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        borderless: { type: 'boolean', default: true, label: 'borderless' },
    },
})
</script>

<template>
    <SAvatar name="John Doe" size="lg" :borderless="controls.borderless" />
</template>
