<script setup lang="ts">
import { usePassthrough } from '@/helpers';
import { twMerge } from 'tailwind-merge';
import type { TTabProps } from '../../types';

defineProps<TTabProps>();

const { pt, extractor } = usePassthrough();

const [tabContainerClass, tabContainerProps] = extractor(pt.value.tabContainer);
const [tabClass, tabProps] = extractor(pt.value.tab);
</script>

<template>
    <nav data-s-tabContainer v-bind="tabContainerProps" :class="twMerge(tabContainerClass, $props.class)" aria-label="Tabs">
        <ul data-s-tab v-bind="tabProps" :class="twMerge('flex space-x-4', tabClass)">
            <slot />
        </ul>
    </nav>
</template>
