<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { cellStyles, tableStyles } from './styles';
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