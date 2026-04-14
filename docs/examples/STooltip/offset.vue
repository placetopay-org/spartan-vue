<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        offset: { type: 'select', options: ['4', '8', '16', '24'], default: '8', label: 'offset' },
    },
});
</script>

<template>
    <STooltip title="Custom offset tooltip" :offset="Number(controls.offset)">
        <SButton>Hover me</SButton>
    </STooltip>
</template>
