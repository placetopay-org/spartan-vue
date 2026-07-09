<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        name: { type: 'text', default: 'Sarah Adams', label: 'name' },
    },
});
</script>

<template>
    <SAvatar :name="controls.name" size="lg" />
</template>
