<script setup lang="ts">
import { computed } from 'vue';

const { isValid } = defineProps<{ isValid?: boolean }>();

const color = computed(() => {
    if (isValid) return 'bg-green-500';
    if (isValid === false) return 'bg-red-500';
    return;
})
</script>

<template>
    <div :class="[color, 'absolute left-0 bottom-0 w-full h-[3px]']" />
</template>
