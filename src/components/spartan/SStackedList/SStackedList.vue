<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TStackedListProps } from './types';

defineProps<TStackedListProps>();
defineOptions({ inheritAttrs: false });
</script>

<template>
    <ul role="list" :class="twMerge('divide-y divide-gray-100 bg-white shadow', $props.class)">
        <slot />
    </ul>
</template>
