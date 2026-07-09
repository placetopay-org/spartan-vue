<script setup lang="ts">
import type { TTabItemProps } from '../../types';
import ChipTabItem from '../ChipTabItem.vue';

const props = defineProps<TTabItemProps>();
</script>

<template>
    <ChipTabItem
        v-bind="props"
        active-class="bg-spartan-primary-100 text-spartan-primary-700 dark:bg-spartan-primary-400/10 dark:text-spartan-primary-400"
        inactive-class="text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
    >
        <slot />
    </ChipTabItem>
</template>
