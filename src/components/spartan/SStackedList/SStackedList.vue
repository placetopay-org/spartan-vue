<script lang="ts">
/**
 * A vertical list layout with dividers for displaying structured content like contacts or records.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SStackedList Github}.
 */
export default {
    name: 'SStackedList',
};
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TStackedListProps } from './types';

defineProps<TStackedListProps>();
defineOptions({ inheritAttrs: false });
</script>

<template>
    <ul role="list" :class="twMerge('divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow', $props.class)">
        <slot />
    </ul>
</template>
