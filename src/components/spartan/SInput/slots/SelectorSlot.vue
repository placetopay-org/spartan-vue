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
    <div class="flex items-center rounded-lg border border-transparent focus-within:s-ring">
        <select
            :value="modelValue"
            class="rounded-lg border-none pr-8 py-1.5 text-sm text-gray-500 focus:ring-0"
            @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>
