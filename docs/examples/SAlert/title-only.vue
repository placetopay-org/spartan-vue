<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        title: { type: 'text', default: 'Warning! Please check your input.', label: 'title', required: true },
    },
})
</script>

<template>
    <SAlert :title="controls.title" />
</template>
