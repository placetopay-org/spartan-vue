<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

defineProps<{
    class?: string;
}>();
</script>

<template>
    <tr :class="twMerge($props.class)">
        <slot />
    </tr>
</template>
