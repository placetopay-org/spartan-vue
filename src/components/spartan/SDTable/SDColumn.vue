<script setup lang="ts">
import { useContext } from './api';
import type { TDColumnProps } from './types';
import { useSlots } from 'vue';

const props = defineProps<TDColumnProps>();

const context = useContext('SDColumn');
const slots = useSlots();

context.updateCol({
    ...props,
    slots,
});
</script>

<template></template>