<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';
import { cellStyles, tableStyles } from './styles';
import type { TDTableProps } from './types';

const props = defineProps<{
    field: string;
    header: string;
}>();

const context = useContext('SDColumn');

context.updateCol(props.field, {
    header: props.header,
});
</script>

<template></template>