<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TPageTitleProps } from './types';

defineProps<TPageTitleProps>();
</script>

<template>
    <h1 data-s-page-title :class="twMerge('text-2xl font-semibold text-gray-900 dark:text-white', $props.class)">
        <slot />
    </h1>
</template>
