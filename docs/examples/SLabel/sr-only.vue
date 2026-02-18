<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        srOnly: { type: 'boolean', default: false, label: 'srOnly' },
    },
})
</script>

<template>
    <SLabel :sr-only="controls.srOnly">Screen Reader Label</SLabel>
</template>
