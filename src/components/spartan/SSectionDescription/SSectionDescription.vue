<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TSectionDescriptionProps } from './types';

const { as = 'p' } = defineProps<TSectionDescriptionProps>();
</script>

<template>
    <component
        :is="as"
        data-s-section-description
        :class="twMerge('text-sm font-normal text-gray-500 dark:text-gray-400', $props.class)"
    >
        <slot />
    </component>
</template>
