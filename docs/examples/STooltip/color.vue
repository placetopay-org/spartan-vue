<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        color: { type: 'select', options: ['auto', 'dark', 'light'], default: 'dark', label: 'color' },
    },
})
</script>

<template>
    <STooltip title="Tooltip text" :color="controls.color">
        <SButton>Hover me</SButton>
    </STooltip>
</template>
