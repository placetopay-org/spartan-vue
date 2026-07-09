<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

const { controls } = usePreview({
    props: {
        size: { type: 'select', options: [24, 48, 64, 96], default: 64, label: 'size' },
    },
});
</script>

<template>
    <SCardBrand name="visa" :size="controls.size" />
</template>
