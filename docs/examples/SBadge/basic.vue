<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SBadge',
    props: {
        color: { type: 'select', options: ['gray', 'white', 'primary', 'red', 'blue', 'green', 'yellow', 'indigo', 'purple', 'neutral'], default: 'gray', label: 'color' },
        size: { type: 'select', options: ['sm', 'md', 'lg'], default: 'md', label: 'size' },
        dot: { type: 'boolean', default: false, label: 'dot' },
        outline: { type: 'boolean', default: false, label: 'outline' },
        pill: { type: 'boolean', default: false, label: 'pill' },
        removable: { type: 'boolean', default: false, label: 'removable' },
        reverse: { type: 'boolean', default: false, label: 'reverse' },
    },
    slots: {
        default: { default: 'Badge', label: 'Content' },
    },
})
</script>

<template>
    <SBadge
        :color="controls.color"
        :size="controls.size"
        :dot="controls.dot"
        :outline="controls.outline"
        :pill="controls.pill"
        :removable="controls.removable"
        :reverse="controls.reverse"
    >
        {{ slots.default }}
    </SBadge>
</template>
