<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SSectionDescription',
    props: {
        as: { type: 'select', options: ['p', 'span', 'div'], default: 'p', label: 'as' },
    },
    slots: {
        default: { default: 'This is a section description that provides additional context about the content.', label: 'Content' },
    },
})
</script>

<template>
    <SSectionDescription :as="controls.as">{{ slots.default }}</SSectionDescription>
</template>
