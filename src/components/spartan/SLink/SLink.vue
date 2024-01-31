<script setup lang="ts">
import type { TLinkProps } from './types';

defineProps<TLinkProps>();
</script>

<template>
    <a
        :href="href"
        :target="target"
        v-bind="$attrs"
        class="cursor-pointer font-medium hover:text-gray-700 hover:underline"
    >
        <slot />
    </a>
</template>
