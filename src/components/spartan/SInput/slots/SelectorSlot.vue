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
}>();
</script>

<template>
    <div class="outline-2 outline-offset-0 outline-transparent transition-[outline-offset,outline-color] duration-150 focus-within:s-outline flex items-center rounded-lg border border-transparent">
        <select
            :value="modelValue"
            class="rounded-lg border-none bg-transparent py-1.5 pr-8 text-sm text-gray-500 focus:ring-0 dark:text-gray-400"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>
