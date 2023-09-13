<script setup>
import { computed } from 'vue';
import LitepieDatepicker from 'litepie-datepicker-tw3';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: [String, Array],
        required: true,
    },
});

const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});
</script>

<template>
    <LitepieDatepicker v-model="model" />
</template>
