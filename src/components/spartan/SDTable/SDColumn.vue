<script setup lang="ts">
import { useContext } from './api';
import type { TDColumnProps } from './types';
import { useSlots, watch, onUnmounted, computed } from 'vue';

const props = defineProps<TDColumnProps>();

const context = useContext('SDColumn');
const slots = useSlots();

const field = computed(() => props.field || Symbol());

watch(
    props,
    () => {
        context.updateCol({ ...props, slots, field: field.value });
    },
    { immediate: true, deep: true },
);

onUnmounted(() => {
    context.removeCol(field.value);
});
</script>

<template></template>
