<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    mode: 'playground',
    component: 'SToast',
    props: {
        type: { type: 'select', options: ['success', 'error', 'warning'], default: 'success', label: 'type' },
        title: { type: 'text', default: 'Operation completed', label: 'title' },
        description: { type: 'text', default: 'Your changes have been saved successfully', label: 'description' },
        closeable: { type: 'boolean', default: false, label: 'closeable' },
        leftBorder: { type: 'boolean', default: false, label: 'leftBorder' },
    },
})
</script>

<template>
    <SToast
        :type="controls.type"
        :title="controls.title"
        :description="controls.description"
        :closeable="controls.closeable"
        :leftBorder="controls.leftBorder"
    />
</template>
