<script setup lang="ts">
import { useContext } from './api';
import type { TDColumnProps } from './types';
import { useSlots, watch } from 'vue';

const props = defineProps<TDColumnProps>();

const context = useContext('SDColumn');
const slots = useSlots();

watch(props, () => {
    context.updateCol({
        ...props,
        slots,
    });
}, { immediate: true });
</script>

<template></template>
