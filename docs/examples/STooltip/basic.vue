<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    mode: 'playground',
    component: 'STooltip',
    props: {
        color: { type: 'select', options: ['auto', 'dark', 'light'], default: 'auto', label: 'color' },
        placement: { type: 'select', options: ['top', 'bottom', 'left', 'right'], default: 'bottom', label: 'placement' },
        arrow: { type: 'boolean', default: true, label: 'arrow' },
    },
    staticAttrs: {
        title: 'Tooltip text',
    },
})
</script>

<template>
    <STooltip title="Tooltip text" :color="controls.color" :placement="controls.placement" :arrow="controls.arrow">
        <SButton>Hover me</SButton>
    </STooltip>
</template>
