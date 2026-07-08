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
        iconColor: {
            type: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            default: 'primary',
            label: 'iconColor',
        },
    },
});
</script>

<template>
    <SCard :icon="controls.icon" :icon-color="controls.iconColor" title="Custom Icon Color">
        <template #description>The status glyph keeps its shape while the color palette is overridden.</template>
    </SCard>
</template>
