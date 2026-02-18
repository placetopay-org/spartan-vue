<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        color: { type: 'select', options: ['gray', 'white', 'primary', 'red', 'blue', 'green', 'yellow', 'indigo', 'purple', 'neutral'], default: 'primary', label: 'color' },
    },
})
</script>

<template>
    <SBadge :color="controls.color">Badge</SBadge>
</template>
