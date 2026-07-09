<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        pill: { type: 'boolean', default: true, label: 'pill' },
        dot: { type: 'boolean', default: true, label: 'dot' },
        outline: { type: 'boolean', default: true, label: 'outline' },
    },
});
</script>

<template>
    <SBadge color="red" :pill="controls.pill" :dot="controls.dot" :outline="controls.outline">Critical</SBadge>
</template>
