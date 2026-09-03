<script setup lang="ts">
import { mergeClasses } from '@/helpers';
import type { TBreadcrumbsProps } from './types';

defineProps<TBreadcrumbsProps>();
</script>

<template>
    <nav :class="mergeClasses('flex', $props.class)" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-3">
            <slot />
        </ol>
    </nav>
</template>
