<script setup lang="ts">
import { tm } from '@/helpers';
import type { TSectionDescriptionProps } from './types';

const { as = 'p' } = defineProps<TSectionDescriptionProps>();
</script>

<template>
    <component
        :is="as"
        data-s-section-description
        :class="tm('text-sm font-normal text-gray-500 dark:text-gray-400', $props.class)"
    >
        <slot />
    </component>
</template>
