<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        closeable: { type: 'boolean', default: true, label: 'closeable' },
    },
})
</script>

<template>
    <SAlert :closeable="controls.closeable" title="Error" description="Something went wrong. Please try again." />
</template>
