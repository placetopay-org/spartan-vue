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
