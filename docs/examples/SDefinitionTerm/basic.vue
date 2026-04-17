<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    mode: 'playground',
    component: 'SDefinitionTerm',
    props: {
        labels: { type: 'text', default: 'Full name', label: 'labels' },
        description: { type: 'text', default: 'John Doe', label: 'description' },
        oneline: { type: 'boolean', default: false, label: 'oneline' },
    },
});
</script>

<template>
    <SDefinitionTerm :labels="controls.labels" :description="controls.description" :oneline="controls.oneline" />
</template>
