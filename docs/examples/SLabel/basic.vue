<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls, slots } = usePreview({
    mode: 'playground',
    component: 'SLabel',
    props: {
        for: { type: 'input', default: '', label: 'for' },
        srOnly: { type: 'boolean', default: false, label: 'srOnly' },
    },
    slots: {
        default: { default: 'Email address', label: 'Content' },
    },
});
</script>

<template>
    <SLabel :for="controls.for || undefined" :sr-only="controls.srOnly">{{ slots.default }}</SLabel>
</template>
