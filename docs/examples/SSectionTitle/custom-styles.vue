<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        class: {
            type: 'select',
            options: ['none', 'text-lg font-bold', 'text-sm text-blue-600', 'text-xl text-red-500'],
            default: 'none',
            label: 'class',
        },
    },
});
</script>

<template>
    <SSectionTitle :class="controls.class === 'none' ? undefined : controls.class">Custom styled title</SSectionTitle>
</template>
