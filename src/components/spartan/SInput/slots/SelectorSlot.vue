<script setup lang="ts">
defineProps<{
    rounded: boolean;
    options: {
        label: string;
        value: string;
    }[];
}>();
</script>

<template>
    <div :class="['-m-px flex items-center border border-transparent focus-within:s-ring', rounded && 'rounded-r-lg']">
        <select class="rounded-lg border-none pr-8 text-sm text-gray-500 focus:ring-0">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>
