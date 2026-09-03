<script setup lang="ts">
import { tm } from '@/helpers';
import type { TSectionTitleProps } from './types';

const { as = 'h3' } = defineProps<TSectionTitleProps>();
</script>

<template>
    <component
        :is="as"
        data-s-section-title
        :class="tm('text-base font-semibold text-gray-900 dark:text-white', $props.class)"
    >
        <slot />
    </component>
</template>
