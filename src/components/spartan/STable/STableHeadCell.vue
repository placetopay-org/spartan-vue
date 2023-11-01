<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    class?: string;
}>();
</script>

<template>
    <th
        scope="col"
        :class="twMerge('p-3.5 text-left text-sm font-semibold text-gray-900 first:pl-5 last:pr-5', $props.class)"
    >
        <slot />
    </th>
</template>
