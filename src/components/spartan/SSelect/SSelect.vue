<script lang="ts">
/**
 * A native HTML select element with consistent styling and dark mode support.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SSelect Github}.
 */
export default {
    name: 'SSelect',
};
</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { usePassthrough } from '@/helpers';
import type { TSelectEmits, TSelectProps } from './types';
import { twMerge } from 'tailwind-merge';
import { selectStyles } from './styles';

defineEmits<TSelectEmits>();
const { rounded = 'both', modelValue } = defineProps<TSelectProps>();

const { pt, extractor } = usePassthrough();
const [phClass] = extractor(pt.value.placeholder);

const refSelect = useTemplateRef<HTMLSelectElement>('ref_select');

const placeholderClass = computed(() => (modelValue ? '' : phClass || 'text-gray-400 dark:text-gray-500'));

defineExpose({ refSelect });
</script>

<template>
    <select
        :id
        ref="ref_select"
        :value="modelValue"
        :disabled
        :name
        :class="twMerge(selectStyles({ rounded, error, disabled }), $props.class, placeholderClass)"
        style="
            background-image: url(&quot;data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e&quot;);
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.5em 1.5em;
        "
        @change="$emit('update:modelValue', ($event.target as any).value)"
    >
        <option v-if="placeholder" disabled value selected>
            {{ placeholder }}
        </option>
        <slot />
    </select>
</template>

<style>
.dark select option {
    background-color: #111827;
    color: #f9fafb;
}
</style>
