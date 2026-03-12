<script lang="ts">
/**
 * A styled anchor element for navigation links with hover effects.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SLink Github}.
 */
export default {
    name: 'SLink',
};
</script>

<script setup lang="ts">
import type { TLinkProps } from './types';

defineProps<TLinkProps>();
</script>

<template>
    <a
        :href="href"
        :target="target"
        v-bind="$attrs"
        class="cursor-pointer font-medium hover:text-gray-700 hover:underline dark:hover:text-gray-300"
    >
        <slot />
    </a>
</template>
