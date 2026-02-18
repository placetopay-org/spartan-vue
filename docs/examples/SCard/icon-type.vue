<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

const { controls } = usePreview({
    props: {
        icon: { type: 'select', options: ['primary', 'success', 'danger', 'warning', 'info'], default: 'primary', label: 'icon' },
        iconType: { type: 'select', options: ['solid', 'ping'], default: 'solid', label: 'iconType' },
    },
})
</script>

<template>
    <SCard :icon="controls.icon" :iconType="controls.iconType" title="Notification">
        <template #description>You have a new message.</template>
    </SCard>
</template>
