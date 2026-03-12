<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        class: {
            type: 'select',
            options: ['text-3xl font-bold', 'text-xl font-medium text-blue-600', 'text-lg italic'],
            default: 'text-3xl font-bold',
            label: 'class',
        },
    },
});
</script>

<template>
    <SPageTitle :class="controls.class">Dashboard Overview</SPageTitle>
</template>
