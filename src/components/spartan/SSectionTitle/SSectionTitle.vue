<script setup lang="ts">
import { mergeClasses } from '@/helpers';
import type { TSectionTitleProps } from './types';

const { as = 'h3' } = defineProps<TSectionTitleProps>();
</script>

<template>
    <component
        :is="as"
        data-s-section-title
        :class="mergeClasses('text-base font-semibold text-gray-900 dark:text-white', $props.class)"
    >
        <slot />
    </component>
</template>
