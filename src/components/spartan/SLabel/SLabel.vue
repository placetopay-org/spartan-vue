<script setup lang="ts">
import { mergeClasses } from '@/helpers';
import type { TLabelProps } from './types';

const { srOnly = false } = defineProps<TLabelProps>();
</script>

<template>
    <label
        data-s-label
        :for
        :class="
            mergeClasses(
                'mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200',
                srOnly && 'sr-only',
                $props.class,
            )
        "
    >
        <slot />
    </label>
</template>
