<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        indicatorPosition: { type: 'select', options: ['right-top', 'right-bottom', 'left-top', 'left-bottom'], default: 'right-top', label: 'indicatorPosition' },
    },
})
</script>

<template>
    <SAvatar name="John Doe" size="lg" :indicator="true" :indicator-position="controls.indicatorPosition" />
</template>
