<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroup } from '@headlessui/vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue: string;
}>();

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
</script>

<template>
    <RadioGroup v-model="model">
        <slot />
    </RadioGroup>
</template>
