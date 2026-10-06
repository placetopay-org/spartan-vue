<script setup lang="ts">
import { selectorStyles } from '../styles';

defineEmits<{
    (event: 'update:modelValue', value: string | undefined): void;
}>();

defineProps<{
    modelValue: string | undefined;
    options: {
        label: string;
        value: string;
    }[];
    /**
     * Accessible name, forwarded from `SInput`'s `leftOptionsLabel` / `rightOptionsLabel`.
     * This `<select>` is built by `slotBuilder`, so a consumer cannot reach it with an
     * `aria-label` of their own. When omitted no attribute is rendered: naming it is the
     * consumer's call, and the library has nothing meaningful to invent.
     */
    ariaLabel?: string;
    /** Forwarded from `SInput`, so a disabled field cannot be changed through its selector. */
    disabled?: boolean;
    /** Forwarded from `SInput`, so the focus tint follows the field's error state. */
    error?: boolean;
}>();
</script>

<template>
    <div class="flex items-center rounded-lg border border-transparent">
        <select
            :value="modelValue"
            :aria-label="ariaLabel"
            :disabled
            :class="selectorStyles({ error })"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>
