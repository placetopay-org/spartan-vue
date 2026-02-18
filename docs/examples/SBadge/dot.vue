<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        dot: { type: 'boolean', default: true, label: 'dot' },
    },
})
</script>

<template>
    <SBadge color="green" :dot="controls.dot">Active</SBadge>
</template>
