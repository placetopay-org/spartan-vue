<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        description: { type: 'text', default: '+57 300 123 4567', label: 'description' },
    },
});
</script>

<template>
    <SDefinitionTerm :labels="['Phone', 'Mobile']" :description="controls.description" />
</template>
