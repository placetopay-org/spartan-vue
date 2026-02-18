<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SCopy',
    props: {
        value: { type: 'text', default: 'Hello World', label: 'value', required: true },
    },
    slots: {
        default: { default: 'Hello World', label: 'Content' },
    },
})
</script>

<template>
    <SCopy :value="controls.value">{{ slots.default }}</SCopy>
</template>
