<script setup lang="ts">
import { textAreaStyles } from './styles';
import type { TTextAreaProps } from './types';
import { twMerge } from 'tailwind-merge';

defineProps<TTextAreaProps>();
</script>

<template>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs"
        :disabled="disabled"
        :class="twMerge(textAreaStyles({ error, disabled }))"
    />
</template>
