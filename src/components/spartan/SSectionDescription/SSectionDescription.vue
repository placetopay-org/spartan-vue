<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TSectionDescriptionProps } from './types';

withDefaults(defineProps<TSectionDescriptionProps>(), {
    as: 'p',
});
</script>

<template>
    <component :is="as" :class="twMerge('text-sm font-normal text-gray-500', $props.class)">
        <slot />
    </component>
</template>
