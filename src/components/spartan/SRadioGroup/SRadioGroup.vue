<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroup } from '@headlessui/vue';
import type { TRadioGroupEmits, TRadioGroupProps } from './types';

const emit = defineEmits<TRadioGroupEmits>();
const props = defineProps<TRadioGroupProps>();

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
