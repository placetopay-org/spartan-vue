<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    class?: string;
    highlight?: boolean;
    colspan?: number;
}>();
</script>

<template>
    <td
        :class="
            twMerge(
                'p-3.5 text-sm text-gray-500 first:pl-5 last:pr-5',
                highlight && 'font-medium text-gray-900',
                $props.class,
            )
        "
        :colspan="colspan"
    >
        <slot />
    </td>
</template>
