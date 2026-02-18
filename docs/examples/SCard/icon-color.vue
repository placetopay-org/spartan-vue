<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        icon: { type: 'select', options: ['primary', 'success', 'danger', 'warning', 'info'], default: 'primary', label: 'icon' },
        iconColor: { type: 'select', options: ['primary', 'success', 'danger', 'warning', 'info'], default: 'danger', label: 'iconColor' },
    },
})
</script>

<template>
    <SCard :icon="controls.icon" :iconColor="controls.iconColor" title="Custom Icon Color">
        <template #description>The icon shape is primary but colored as danger.</template>
    </SCard>
</template>
