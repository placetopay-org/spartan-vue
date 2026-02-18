<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        value: { type: 'text', default: 'Custom text to copy', label: 'value', required: true },
    },
})
</script>

<template>
    <SCopy :value="controls.value">Click to copy custom text</SCopy>
</template>
