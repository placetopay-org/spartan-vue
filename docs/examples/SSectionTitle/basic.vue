<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SSectionTitle',
    props: {
        as: { type: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], default: 'h3', label: 'as' },
    },
    slots: {
        default: { default: 'Section Title', label: 'Content' },
    },
})
</script>

<template>
    <SSectionTitle :as="controls.as">{{ slots.default }}</SSectionTitle>
</template>
