<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { usePassthrough } from '@/helpers';
import type { TSelectEmits, TSelectProps } from './types';
import { twMerge } from 'tailwind-merge';
import { selectStyles } from './styles';

defineEmits<TSelectEmits>();
const { rounded = 'both', modelValue } = defineProps<TSelectProps>();

const { pt, extractor } = usePassthrough();
const [phClass] = extractor(pt.value.placeholder);

const select = ref<HTMLSelectElement | null>(null);

const placeholderClass = ref(phClass);

watchEffect(() => {
    placeholderClass.value = modelValue ? '' : (phClass || 'text-gray-400');
})
</script>

<template>
    <select
        ref="select"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as any).value)"
        :disabled="disabled"
        :class="twMerge(selectStyles({ rounded, error, disabled }), $props.class, placeholderClass)"
    >
        <option v-if="placeholder" disabled value selected>
            {{ placeholder }}
        </option>
        <slot />
    </select>
</template>

<style>
select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
}
</style>
