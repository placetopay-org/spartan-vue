<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import type { TBreadcrumbsProps } from './types';

defineProps<TBreadcrumbsProps>();
</script>

<template>
    <nav :class="twMerge('flex', $props.class)" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-3">
            <slot />
        </ol>
    </nav>
</template>
