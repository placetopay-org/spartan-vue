<script setup lang="ts">
import type { TTabItemProps } from '../../types';
import ChipTabItem from '../ChipTabItem.vue';

const props = defineProps<TTabItemProps>();
</script>

<template>
    <ChipTabItem
        v-bind="props"
        active-class="text-spartan-primary-600 dark:text-spartan-primary-400 bg-white shadow dark:bg-gray-900"
        inactive-class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
        <slot />
    </ChipTabItem>
</template>
