<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    class?: string;
}>();
</script>

<template>
    <tbody :class="twMerge('divide-y divide-gray-200 bg-white', $props.class)">
        <slot />
    </tbody>
</template>
