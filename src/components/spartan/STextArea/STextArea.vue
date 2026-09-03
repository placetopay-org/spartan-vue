<script lang="ts">
/**
 * A multi-line text input with error and disabled states.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/STextArea Github}.
 */
export default {
    name: 'STextArea',
};
</script>

<script setup lang="ts">
import { mergeClasses } from '@/helpers';
import { textAreaStyles } from './styles';
import type { TTextAreaProps, TTextAreaEmits } from './types';

defineEmits<TTextAreaEmits>();

defineProps<TTextAreaProps>();
</script>

<template>
    <textarea
        :value="modelValue"
        v-bind="$attrs"
        :disabled="disabled"
        :class="mergeClasses(textAreaStyles({ error, disabled }), $props.class)"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>
