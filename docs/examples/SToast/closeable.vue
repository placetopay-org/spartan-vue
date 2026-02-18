<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        closeable: { type: 'boolean', default: true, label: 'closeable' },
    },
})
</script>

<template>
    <SToast
        :closeable="controls.closeable"
        type="success"
        title="Dismissible notification"
        description="Click the X button to close this toast"
    />
</template>
