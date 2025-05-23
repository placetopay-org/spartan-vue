<script setup lang="ts">
import { twMerge, type ClassNameValue } from 'tailwind-merge';
import { useContext } from './api';

defineProps<{
    class?: ClassNameValue;
}>();

const context = useContext('STableHeadCell');
context.register('row');
</script>

<template>
    <tr :class="twMerge($props.class)">
        <slot />
    </tr>
</template>
