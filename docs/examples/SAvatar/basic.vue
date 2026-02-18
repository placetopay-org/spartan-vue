<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    mode: 'playground',
    component: 'SAvatar',
    props: {
        name: { type: 'text', default: 'John Doe', label: 'name' },
        size: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'], default: 'md', label: 'size' },
        borderless: { type: 'boolean', default: false, label: 'borderless' },
        indicator: { type: 'boolean', default: false, label: 'indicator' },
        indicatorPosition: { type: 'select', options: ['right-top', 'right-bottom', 'left-top', 'left-bottom'], default: 'right-top', label: 'indicatorPosition' },
    },
})
</script>

<template>
    <SAvatar
        :name="controls.name"
        :size="controls.size"
        :borderless="controls.borderless"
        :indicator="controls.indicator"
        :indicator-position="controls.indicatorPosition"
    />
</template>
