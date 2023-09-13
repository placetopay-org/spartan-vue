<script setup lang="ts">
const props = defineProps<{
    for?: string;
    srOnly?: boolean;
}>();
</script>

<template>
    <label :for="props.for" :class="['mb-1 block text-sm font-medium text-gray-700', srOnly && 'sr-only']">
        <slot />
    </label>
</template>
