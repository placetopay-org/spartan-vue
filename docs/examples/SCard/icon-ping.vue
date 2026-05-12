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
    },
});
</script>

<template>
    <SCard :icon="controls.icon" iconType="ping" title="Notification">
        <template #description>The ping treatment draws attention with a soft halo.</template>
    </SCard>
</template>
