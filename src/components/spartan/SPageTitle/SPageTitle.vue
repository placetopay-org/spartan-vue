<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TPageTitleProps } from './types';

defineProps<TPageTitleProps>();
</script>

<template>
    <h1 :class="twMerge('text-2xl font-semibold text-gray-900', $props.class)">
        <slot />
    </h1>
</template>
