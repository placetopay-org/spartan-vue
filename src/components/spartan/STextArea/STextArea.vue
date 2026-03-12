<script lang="ts">
/**
 * A multi-line text input with error and disabled states.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/STextarea Github}.
 */
export default {
    name: 'STextarea',
};
</script>

<script setup lang="ts">
import { textAreaStyles } from './styles';
import type { TTextAreaProps, TTextAreaEmits } from './types';
import { twMerge } from 'tailwind-merge';

defineEmits<TTextAreaEmits>();

defineProps<TTextAreaProps>();
</script>

<template>
    <textarea
        :value="modelValue"
        v-bind="$attrs"
        :disabled="disabled"
        :class="twMerge(textAreaStyles({ error, disabled }))"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>
