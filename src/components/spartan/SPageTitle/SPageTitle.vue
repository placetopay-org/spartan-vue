<script setup lang="ts">
import { mergeClasses } from '@/helpers';
import type { TPageTitleProps } from './types';

defineProps<TPageTitleProps>();
</script>

<template>
    <h1 data-s-page-title :class="mergeClasses('text-2xl font-semibold text-gray-900 dark:text-white', $props.class)">
        <slot />
    </h1>
</template>
