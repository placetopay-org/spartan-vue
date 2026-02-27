<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
    <div class="flex items-center">
        <span class="text-gray-500 dark:text-gray-400">{{ text }}</span>
    </div>
</template>
