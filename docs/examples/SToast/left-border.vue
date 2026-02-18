<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        leftBorder: { type: 'boolean', default: true, label: 'leftBorder' },
    },
})
</script>

<template>
    <SToast :leftBorder="controls.leftBorder" type="success" title="Changes saved" />
</template>
