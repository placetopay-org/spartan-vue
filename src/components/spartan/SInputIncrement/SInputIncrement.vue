<script setup lang="ts">
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';
import { inputStyles, iconStyles } from './styles';
import type { TInputIncrementProps, TInputIncrementEmits } from './types';

const emit = defineEmits<TInputIncrementEmits>();
const props = defineProps<TInputIncrementProps>();
defineOptions({ inheritAttrs: false });

const value = computed({
    get: () => props.modelValue || props.min || 0,
    set: (newValue) => emit('update:modelValue', newValue),
});

const updateValue = (event: Event) => {
    const $input = event.target as HTMLInputElement;

    if (!$input.value) {
        if (props.min) {
            value.value = props.min;
            $input.value = String(props.min);
        } else {
            value.value = 0;
            $input.value = '0';
        }
        return;
    }

    if (isNaN(Number($input.value))) {
        $input.value = String(value.value);
        return;
    }

    if (props.min && Number($input.value) < props.min) {
        $input.value = String(props.min);
        return;
    }

    if (props.max && Number($input.value) > props.max) {
        $input.value = String(props.max);
        return;
    }

    value.value = Number($input.value);
};

const decrementDisabled = computed(() => props.disabled || Boolean(props.min && value.value <= props.min));
const incrementDisabled = computed(() => props.disabled || Boolean(props.max && value.value >= props.max));
</script>

<template>
    <div :class="twMerge(inputStyles({ error, disabled }), containerClass)">
        <button
            aria-label="decrement"
            type="button"
            :disabled="decrementDisabled"
            class="group p-2 pr-3 focus-visible:outline-none"
            @click="value--"
        >
            <MinusCircleIcon :class="twMerge(iconStyles({ disabled: decrementDisabled }))" />
        </button>
        <input
            v-bind="$attrs"
            type="number"
            :min
            :max
            :disabled
            :value
            class="border-none text-center focus:ring-0"
            @input="updateValue"
        />
        <button
            aria-label="increment"
            type="button"
            :disabled="incrementDisabled"
            class="group p-2 pl-3 focus-visible:outline-none"
            @click="value++"
        >
            <PlusCircleIcon :class="twMerge(iconStyles({ disabled: incrementDisabled }))" />
        </button>
    </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
