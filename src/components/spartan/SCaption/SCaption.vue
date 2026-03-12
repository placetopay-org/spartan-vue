<script setup lang="ts">
import { hasSlotContent } from '@/helpers';
import type { TCaptionProps } from './types';

const { variant = 'error', text } = defineProps<TCaptionProps>();

const captionClass = {
    info: 'text-gray-500 dark:text-gray-400',
    error: 'text-red-500 dark:text-red-400',
};
</script>

<template>
    <p data-s-caption :class="['text-xs font-normal', captionClass[variant]]" role="caption">
        <slot v-if="hasSlotContent($slots.default)" />
        <template v-else>{{ text }}</template>
    </p>
</template>
