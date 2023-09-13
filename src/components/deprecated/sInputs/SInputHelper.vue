<template>
    <span class="text-xs text-gray-400">
        {{ message }}
    </span>
</template>

<script setup>
const props = defineProps({
    message: {
        type: String,
        required: false,
        default: undefined,
    },
});
</script>
