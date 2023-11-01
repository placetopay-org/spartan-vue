<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    class?: string;
    borderless: boolean;
}>();
</script>

<template>
    <table
        :class="
            twMerge(
                'min-w-full divide-y divide-gray-300',
                !borderless && 'overflow-hidden rounded-2xl shadow',
                $props.class,
            )
        "
    >
        <slot />
    </table>
</template>
