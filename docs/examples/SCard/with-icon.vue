<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        icon: { type: 'select', options: ['primary', 'success', 'danger', 'warning', 'info'], default: 'success', label: 'icon' },
    },
})
</script>

<template>
    <SCard :icon="controls.icon" title="Operation Complete">
        <template #description>Everything went as expected.</template>
    </SCard>
</template>
