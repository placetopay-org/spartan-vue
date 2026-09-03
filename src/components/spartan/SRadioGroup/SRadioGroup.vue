<script setup lang="ts">
import { tm } from '@/helpers';
import { computed, provide } from 'vue';
import { RadioGroup } from '@headlessui/vue';
import { radioGroupStyles } from './styles';
import type { TRadioGroupEmits, TRadioGroupProps } from './types';

const emit = defineEmits<TRadioGroupEmits>();
const { disabled, modelValue } = defineProps<TRadioGroupProps>();

provide(
    'SRadioGroupDisabled',
    computed(() => disabled),
);

const model = computed({
    get() {
        return modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
</script>

<template>
    <RadioGroup v-model="model" :class="tm(radioGroupStyles(), $props.class)" :disabled>
        <slot />
    </RadioGroup>
</template>
