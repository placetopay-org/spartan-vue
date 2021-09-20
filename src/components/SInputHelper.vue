<template>
    <span class="text-gray-400 text-xs">
        {{ message }}
    </span>
</template>

<script setup>
const props = defineProps({
    message: {
        type: String,
        required: false,
        default: undefined
    }
});
</script>
