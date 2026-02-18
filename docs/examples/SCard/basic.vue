<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SCard',
    props: {
        title: { type: 'text', default: 'Card Title', label: 'title' },
        size: { type: 'select', options: ['sm', 'md'], default: 'md', label: 'size' },
        closable: { type: 'boolean', default: false, label: 'closable' },
    },
    slots: {
        default: { default: 'This is the card content. You can place any content here.', label: 'Content' },
    },
})
</script>

<template>
    <SCard :title="controls.title" :size="controls.size" :closable="controls.closable">
        {{ slots.default }}
    </SCard>
</template>
