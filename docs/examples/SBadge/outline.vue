<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        outline: { type: 'boolean', default: true, label: 'outline' },
    },
})
</script>

<template>
    <SBadge color="primary" :outline="controls.outline">Badge</SBadge>
</template>
