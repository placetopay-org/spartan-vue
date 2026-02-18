<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        description: { type: 'text', default: 'Your changes have been saved successfully.', label: 'description', required: true },
    },
})
</script>

<template>
    <SAlert :description="controls.description" />
</template>
