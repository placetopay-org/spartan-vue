<script setup lang="ts">
import { mergeClasses } from '@/helpers';
import type { TSectionDescriptionProps } from './types';

const { as = 'p' } = defineProps<TSectionDescriptionProps>();
</script>

<template>
    <component
        :is="as"
        data-s-section-description
        :class="mergeClasses('text-sm font-normal text-gray-500 dark:text-gray-400', $props.class)"
    >
        <slot />
    </component>
</template>
