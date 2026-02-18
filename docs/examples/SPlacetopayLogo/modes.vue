<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        mode: { type: 'select', options: ['base', 'dark', 'blackAndWhite'], default: 'base', label: 'mode' },
    },
})
</script>

<template>
    <SPlacetopayLogo :mode="controls.mode" />
</template>
