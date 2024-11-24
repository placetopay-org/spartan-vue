<script setup lang="ts">
import { usePassthrough } from '@/helpers';
import { twMerge } from 'tailwind-merge';

defineProps<{ class?: string }>();

const { pt, extractor } = usePassthrough();

const [tabContainerClass, tabContainerProps] = extractor(pt.value.tabContainer);
const [tabClass, tabProps] = extractor(pt.value.tab);
</script>

<template>
    <nav data-s-tabContainer v-bind="tabContainerProps" :class="twMerge(tabContainerClass, $props.class)" aria-label="Tabs">
        <ul data-s-tab v-bind="tabProps" :class="twMerge('flex space-x-2 rounded-xl border border-gray-300 bg-gray-100 p-2 w-fit', tabClass)">
            <slot />
        </ul>
    </nav>
</template>
