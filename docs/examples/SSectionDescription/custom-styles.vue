<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        class: {
            type: 'select',
            options: ['none', 'text-base font-medium', 'text-xs text-red-500', 'text-sm text-blue-600'],
            default: 'none',
            label: 'class',
        },
    },
});
</script>

<template>
    <SSectionDescription :class="controls.class === 'none' ? undefined : controls.class">Custom styled description text.</SSectionDescription>
</template>
