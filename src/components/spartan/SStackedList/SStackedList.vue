<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TStackedListProps } from './types';

defineProps<TStackedListProps>();
defineOptions({ inheritAttrs: false });
</script>

<template>
    <ul role="list" :class="twMerge('divide-y divide-gray-100 shadow bg-white', $props.class)">
        <slot />
    </ul>
</template>
