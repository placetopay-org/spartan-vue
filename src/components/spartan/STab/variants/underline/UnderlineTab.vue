<script setup lang="ts">
import { usePassthrough } from '@/helpers';
import { twMerge } from 'tailwind-merge';
defineProps<{ class?: string }>();

const { pt, extractor } = usePassthrough();

const [tabContainerClass, tabContainerProps] = extractor(pt.value.tabContainer);
const [tabClass, tabProps] = extractor(pt.value.tab);
</script>

<template>
    <nav data-s-tabContainer v-bind="tabContainerProps" :class="twMerge('border-b border-gray-200', tabContainerClass, $props.class)" aria-label="Tabs">
        <ul data-s-tab v-bind="tabProps" :class="twMerge('flex', tabClass)">
            <slot />
        </ul>
    </nav>
</template>
