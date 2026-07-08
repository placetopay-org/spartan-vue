<script setup lang="ts">
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
}>();
</script>

<template>
    <div
        class="focus-within:s-outline flex items-center rounded-lg border border-transparent outline-2 outline-offset-0 outline-transparent transition-[outline-offset,outline-color] duration-150"
    >
        <select
            :value="modelValue"
            :aria-label="ariaLabel"
            class="rounded-lg border-none bg-transparent py-1.5 pr-8 text-sm text-gray-500 focus:ring-0 dark:text-gray-400"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>
