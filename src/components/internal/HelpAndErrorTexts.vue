<script setup lang="ts">
defineProps<{
    error?: string;
    help?: string;
}>();
</script>

<template>
    <div v-if="help || error" class="flex flex-col">
        <span v-if="help" class="mt-1 text-xs font-normal text-gray-500">{{ help }}</span>
        <span v-if="error" class="mt-1 text-xs font-normal text-red-500">{{ error }}</span>
    </div>
</template>
