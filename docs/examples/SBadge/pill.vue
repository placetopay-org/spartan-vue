<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        pill: { type: 'boolean', default: true, label: 'pill' },
    },
})
</script>

<template>
    <SBadge color="primary" :pill="controls.pill">Badge</SBadge>
</template>
