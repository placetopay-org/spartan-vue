<script setup lang="ts">
import { hasSlotContent } from '@/helpers';
import type { TCaptionProps } from './types';

withDefaults(defineProps<Partial<TCaptionProps>>(), {
    variant: 'error',
    text: undefined,
});

const captionClass = {
    info: 'text-gray-500',
    error: 'text-red-500',
};
</script>

<template>
    <p :class="['text-xs font-normal', captionClass[variant]]" role="caption">
        <slot v-if="hasSlotContent($slots.default)" />
        <template v-else>{{ text }}</template>
    </p>
</template>
