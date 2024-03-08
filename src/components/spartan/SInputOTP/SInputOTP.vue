<script setup lang="ts">
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';
import { computed, ref, watch } from 'vue';
import { twMerge } from 'tailwind-merge';
import { inputOTPStyles } from './styles';
import { createContext } from './api';
import type { TInputOTPProps, TInputOTPEmits } from './types';

const emit = defineEmits<TInputOTPEmits>();
const props = defineProps<TInputOTPProps>();
defineOptions({ inheritAttrs: false });

const context = createContext(props, emit);

const updateValue = (event: Event) => {
    const $input = event.target as HTMLInputElement;

    if (!$input.value || Number.isInteger(Number($input.value))) {
        const newValue = $input.value.trim();
        context.updateValue(newValue);
    }

    $input.value = context.value;
};

// TODO: Implement arrow keys navigation
const showCaret = (event: Event) => {
    // const $input = event.target as HTMLInputElement;

    // console.log('selectionStart', $input.selectionStart);
    // console.log('selectionEnd', $input.selectionEnd);

    // context.updateSelection($input.selectionStart, $input.selectionEnd);
};

const avoidMoveCaret = (e: Event) => {
    (e.target as HTMLInputElement).setSelectionRange(-1, -1);
};
</script>

<template>
    <div :class="twMerge(inputOTPStyles({ disabled }), $props.class)">
        <input
            :value="context.value"
            @input="updateValue"
            type="text"
            class="absolute h-full w-full opacity-0 -tracking-[.6em] p-0 text-[1px]"
            @focus="context.focusInput"
            @focusout="context.focusoutInput"
            :maxlength="context.items.length"
            @dblclick="context.selectAll"
            @click="showCaret"
            @keyup="showCaret"
            @keyup.up="avoidMoveCaret"
            @keyup.left="avoidMoveCaret"
            :disabled="disabled"
            v-bind="$attrs"
        />
        <slot />
    </div>
</template>
