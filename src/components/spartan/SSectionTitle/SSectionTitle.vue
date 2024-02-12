<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TSectionTitleProps } from './types';

withDefaults(defineProps<TSectionTitleProps>(), {
    as: 'h3',
});
</script>

<template>
    <component :is="as" :class="twMerge('text-base font-semibold text-gray-900', $props.class)">
        <slot />
    </component>
</template>
