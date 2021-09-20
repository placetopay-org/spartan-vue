<template>
    <p class="text-sm text-red-600 mt-2" v-show="message">
        {{ message }}
    </p>
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
