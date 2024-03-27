<script setup lang="ts">
import type { TSidebarSeparatorProps } from './types';

defineProps<TSidebarSeparatorProps>();
</script>

<template>
    <hr class="!my-6" />
    <h3 class="text-xs font-medium text-gray-500 mb-0.5">{{ title }}</h3>
</template>
