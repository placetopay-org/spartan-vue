<script lang="ts">
/**
 * A one-time password input that renders individual digit cells with validation states.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SInputOtp Github}.
 */
export default {
    name: 'SInputOtp',
};
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { inputOtpStyles } from './styles';
import { createContext } from './api';
import type { TInputOtpProps, TInputOtpEmits } from './types';

const emit = defineEmits<TInputOtpEmits>();
const props = defineProps<TInputOtpProps>();
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

// Interaction model: the caret stays pinned to the end of the hidden input, so
// typing always appends and Backspace always deletes the last digit. Moving the
// caret with the arrow keys (editing a middle digit in place) is deliberately
// unsupported — it would require caret-to-cell highlighting and insert/overwrite
// semantics that no OTP flow in the design system needs.
const avoidMoveCaret = (e: Event) => {
    (e.target as HTMLInputElement).setSelectionRange(-1, -1);
};
</script>

<template>
    <div :class="twMerge(inputOtpStyles({ disabled }), $props.class)">
        <input
            :value="context.value"
            type="text"
            class="absolute h-full w-full p-0 text-[1px] -tracking-[.6em] opacity-0"
            :maxlength="context.items.length"
            :disabled="disabled"
            v-bind="$attrs"
            @input="updateValue"
            @focus="context.focusInput"
            @focusout="context.focusoutInput"
            @dblclick="context.selectAll"
            @keyup.up="avoidMoveCaret"
            @keyup.left="avoidMoveCaret"
        />
        <slot />
    </div>
</template>
