<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        class: {
            type: 'select',
            options: ['none', 'text-lg font-bold', 'text-xs text-red-500', 'text-base text-blue-600'],
            default: 'none',
            label: 'class',
        },
    },
});
</script>

<template>
    <SLabel :class="controls.class === 'none' ? undefined : controls.class">Custom styled label</SLabel>
</template>
