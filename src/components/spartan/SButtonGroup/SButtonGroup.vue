<script lang="ts">
/**
 * A container that groups multiple buttons together with shared borders and consistent styling.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SButtonGroup Github}.
 */
export default {
    name: 'SButtonGroup',
};
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TClassProp } from '@/constants';

defineProps<{ class?: TClassProp }>();
</script>

<template>
    <div :class="twMerge('isolate inline-flex -space-x-px', $props.class)">
        <slot />
    </div>
</template>
