<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    class?: string;
}>();
</script>

<template>
    <thead :class="twMerge('bg-gray-50', $props.class)">
        <slot />
    </thead>
</template>
