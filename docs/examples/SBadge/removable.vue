<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        removable: { type: 'boolean', default: true, label: 'removable' },
    },
})
</script>

<template>
    <SBadge color="primary" :removable="controls.removable">Removable</SBadge>
</template>
