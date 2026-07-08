<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        icon: {
            type: 'select',
            options: ['success', 'danger', 'warning', 'info'],
            default: 'success',
            label: 'icon',
        },
        iconType: { type: 'select', options: ['solid', 'ping'], default: 'solid', label: 'iconType' },
        size: { type: 'select', options: ['sm', 'md'], default: 'md', label: 'size' },
    },
});
</script>

<template>
    <SCard :icon="controls.icon" :icon-type="controls.iconType" :size="controls.size" title="Notification">
        <template #description>You have a new message.</template>
    </SCard>
</template>
