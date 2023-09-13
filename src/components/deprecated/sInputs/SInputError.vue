<template>
    <p v-show="message" class="text-sm text-red-600">
        {{ message }}
    </p>
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
