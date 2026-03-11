<script setup lang="ts">
defineProps<{
    last: boolean;
    isComplete: boolean;
}>();
</script>

<template>
    <div
        v-if="!last"
        :class="[
            'absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5',
            isComplete ? 'bg-spartan-primary-500' : 'bg-gray-300 dark:bg-gray-600',
        ]"
        aria-hidden="true"
    />
</template>
