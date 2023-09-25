<script setup lang="ts">
defineProps<{
    options: {
        label: string;
        value: string;
    }[];
}>();
</script>

<template>
    <div class="flex items-center rounded-lg border border-transparent focus-within:s-ring">
        <select class="rounded-lg border-0 pr-8 text-sm text-gray-500 focus:ring-0">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>
