<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { useContext } from './api';

defineProps<{
    class?: string;
}>();

const context = useContext('STableHeadCell');
context.register('row');
</script>

<template>
    <tr :class="twMerge($props.class)">
        <slot />
    </tr>
</template>
