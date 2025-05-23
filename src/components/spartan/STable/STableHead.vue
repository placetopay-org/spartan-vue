<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    class?: string;
}>();
</script>

<template>
    <thead :class="twMerge('border-b border-gray-300 bg-gray-50', $props.class)">
        <slot />
    </thead>
</template>
