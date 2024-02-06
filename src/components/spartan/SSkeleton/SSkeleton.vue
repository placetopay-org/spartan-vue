<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
defineProps<{
    class?: string;
}>();
</script>

<template>
    <div :class="twMerge('skeleton h-6 w-full rounded-md', $props.class)" />
</template>

<style>
.skeleton {
    overflow: hidden;
    position: relative;
    background-color: rgba(130, 130, 130, 0.2);
}
.skeleton::after {
    content: '';
    animation: skeleton-animation 1s infinite;
    background: rgb(255, 255, 255);
    background: linear-gradient(
        90deg,
        rgba(130, 130, 130, 0) 0%,
        rgba(130, 130, 130, 0.2) 40%,
        rgba(130, 130, 130, 0.3) 50%,
        rgba(130, 130, 130, 0.2) 60%,
        rgba(130, 130, 130, 0) 100%
    );
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
}

@keyframes skeleton-animation {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(100%);
    }
}
</style>
