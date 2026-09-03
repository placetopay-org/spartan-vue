<script setup lang="ts">
import { tm } from '@/helpers';
import type { TBreadcrumbsProps } from './types';

defineProps<TBreadcrumbsProps>();
</script>

<template>
    <nav :class="tm('flex', $props.class)" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-3">
            <slot />
        </ol>
    </nav>
</template>
