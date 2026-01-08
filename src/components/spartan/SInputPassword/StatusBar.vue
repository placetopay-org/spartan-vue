<script setup lang="ts">
import { computed } from 'vue';

const { isValid } = defineProps<{ isValid?: boolean }>();

const color = computed(() => {
    if (isValid) return 'bg-green-500';
    if (isValid === false) return 'bg-red-500';
    return undefined;
});
</script>

<template>
    <div :class="[color, 'absolute bottom-0 left-0 h-[3px] w-full']" />
</template>
