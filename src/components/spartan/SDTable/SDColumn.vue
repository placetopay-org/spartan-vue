<script setup lang="ts">
import { useContext } from './api';
import type { TDColumnProps } from './types';
import { useSlots, watch, onUnmounted } from 'vue';

const props = defineProps<TDColumnProps>();

const context = useContext('SDColumn');
const slots = useSlots();

watch(props, () => {
    context.updateCol({
        ...props,
        slots,
    });
}, { immediate: true, deep: true });

onUnmounted(() => {
    if (props.field) {
        context.removeCol(props.field);
    }
});
</script>

<template></template>
