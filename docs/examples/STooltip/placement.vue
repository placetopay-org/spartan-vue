<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        placement: { type: 'select', options: ['top', 'bottom', 'left', 'right'], default: 'top', label: 'placement' },
    },
})
</script>

<template>
    <STooltip title="Tooltip text" :placement="controls.placement">
        <SButton>Hover me</SButton>
    </STooltip>
</template>
