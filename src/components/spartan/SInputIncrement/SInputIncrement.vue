<script setup lang="ts">
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import { inputStyles, iconStyles } from './styles';
import type { TInputIncrementProps, TInputIncrementEmits } from './types';

const emit = defineEmits<TInputIncrementEmits>();
const props = defineProps<TInputIncrementProps>();

const value = computed({
    get: () => props.modelValue ?? 0,
    set: (newValue) => emit('update:modelValue', newValue),
});

const updateValue = (event: Event) => {
    const $input = event.target as HTMLInputElement;

    if (!$input.value) {
        value.value = 0;
        $input.value = '0';
        return;
    }

    if (isNaN(Number($input.value))) {
        $input.value = String(value.value);
        return;
    }

    value.value = Number($input.value);
};
</script>

<template>
    <div :class="twMerge(inputStyles({ error, disabled }))">
        <button type="button" :disabled="disabled" class="group p-2 pr-3 focus-visible:outline-none" @click="value--">
            <MinusCircleIcon :class="twMerge(iconStyles({ disabled }))" />
        </button>
        <input :disabled="disabled" :value="value" @input="updateValue" class="border-none text-center focus:ring-0" />
        <button type="button" :disabled="disabled" class="group p-2 pl-3 focus-visible:outline-none" @click="value++">
            <PlusCircleIcon :class="twMerge(iconStyles({ disabled }))" />
        </button>
    </div>
</template>
